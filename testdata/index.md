# Hyperledger Fabric에서의 MVCC Read Conflict

## MVCC: Multi-Version Concurrency Control

> MVCC는 DBMS에서 동시성 문제를 해결하기 위해 나온 기법으로, Hyperledger Fabric에 국한된 용어는 아니다. 일반적으로 동시성 문제는 읽기, 또는 쓰기에 락(Lock)을 걸어서 해결한다. 하지만 이럴 경우 심각한 성능 저하가 일어날 수 있다. MVCC는 이를 해결하기 위해 제안된 기법으로, 락을 걸지 않고, 저장되는 값에 대해 버저닝(Versioning)을 한다. 사용자가 값을 읽을 때는 최신 스냅샷(snapshot)으로부터 값을 읽고, 쓸 때는 기존 값을 덮어씌우는 대신 변경 내역을 기반으로 새로운 버전을 만든다. 이를 통해 매우 빠른 처리 속도를 구현하지만, 데이터 버전 충돌을 어플리케이션 영역에서 해결해주어야 하고, 쌓이는 버전을 적절한 순간에 정리해주어야 하는 등의 오버헤드가 생긴다. (출처: [MVCC(다중 버전 동시성 제어)란?](https://mangkyu.tistory.com/53))

여기까지만 봐도 Hyperledger Fabric의 시스템이 정확히 MVCC 방식을 따름을 알 수 있다. Hyperledger Fabric도 State DB를 관리함에 있어 키의 밸류 값들에 대해 버저닝을 수행하고, 읽기 쓰기 시 락을 걸지 않는다(사실 분산환경이라 락을 거는 것이 현실적으로 불가능하다).

## Hyperledger Fabric 에서의 MVCC Read Conflict 원인
Hyperledger Fabric도 기본적으로 MVCC 기법을 사용하여 State DB를 관리하기 때문에, 다음 두가지 특징이 동일하게 적용된다.

1. 사용하지 않는 데이터 버전에 대한 정리
2. 데이터 버전 충돌을 어플리케이션 영역에서 해결

- 사용하지 않는 데이터 버전에 대한 정리
- 데이터 버전 충돌을 어플리케이션 영역에서 해결

이 중 MVCC Read Conflict 는 2번, “데이터 버전 충돌”로 인해 발생하는 오류다. Hyperledger Fabric에서 MVCC Read Conflict는 블록을 Peer에 최종적으로 커밋하기 전에 블록 내의 트랜잭션들을 검증하는 단계에서 발생한다. 트랜잭션 검증은 아래 `validateAndPrepaerBatch` 함수에서 수행된다. (v1.4.x와 v2.x가 코드 위치 등이 조금씩 다르지만 큰 맥락은 같다. 아래는 v2.x 기준이다.)

```go
// core/ledger/kvledger/txmgmt/validation/validator.go (v2.x)
// core/ledger/kvledger/txmgmt/validator/statebasedval/state_based_validator.go (v1.4.x)
...
// validateAndPrepareBatch performs validation and prepares the batch for final writes
func (v *validator) validateAndPrepareBatch(blk *block, doMVCCValidation bool) (*publicAndHashUpdates, error) {
	...

	updates := newPubAndHashUpdates()
	for _, tx := range blk.txs {
		var validationCode peer.TxValidationCode
		var err error
		if validationCode, err = v.validateEndorserTX(tx.rwset, doMVCCValidation, updates); err != nil {
			return nil, err
		}

		tx.validationCode = validationCode
		if validationCode == peer.TxValidationCode_VALID {
			...

			committingTxHeight := version.NewHeight(blk.num, uint64(tx.indexInBlock))
			updates.applyWriteSet(tx.rwset, committingTxHeight, v.db, tx.containsPostOrderWrites)
		} else {
			...
		}
	}
	return updates, nil
}
```

코드에서 보듯이, 블록 내의 트랜잭션들을 for-loop를 통해 하나하나 검증을 하며, 이를 위해 `validateEndorserTx` 함수를 호출한다. 결과가 valid 할 경우, `version.NewHeight` 을 통해 새 버전을 생성한 후 이를 `updates` 객체에 적용한다. `updates` 객체에는 State DB에 새롭게 쓰여질 키, 밸류, 버전이 저장되어 있다. 그래서 다음 트랜잭션들의 `ReadSet`에 있는 키가 `updates` 객체 내에 존재한다면, 이 트랜잭션들은 해당 키의 구형 버전 밸류를 읽은게 된다. 그리고 바로 이 지점에서 MVCC Read Conflict가 발생한다. 이를 체크하기 위해 `updates` 객체는 다음 루프에서 `validateEndorserTx`의 입력값으로 들어가고 `validateEndorserTx` 함수는 아래 `validateTx` 함수를 호출한다.

```go
// core/ledger/kvledger/txmgmt/validation/validator.go (v2.x)
// core/ledger/kvledger/txmgmt/validator/statebasedval/state_based_validator.go (v1.4.x)

func (v *validator) validateTx(txRWSet *rwsetutil.TxRwSet, updates *publicAndHashUpdates) (peer.TxValidationCode, error) {
	...

	for _, nsRWSet := range txRWSet.NsRwSets {
		ns := nsRWSet.NameSpace
		// Validate public reads
		if valid, err := v.validateReadSet(ns, nsRWSet.KvRwSet.Reads, updates.publicUpdates); !valid || err != nil {
			if err != nil {
				return peer.TxValidationCode(-1), err
			}
			return peer.TxValidationCode_MVCC_READ_CONFLICT, nil
		}
		...
	}
	return peer.TxValidationCode_VALID, nil
}
```

위의 `validateTx` 코드에서 `validateReadSet`을 호출하고, `validateReadSet`은 아래 `validateKVRead`을 호출한다. 여기서, 만약 `updates` 객체 내에 이 트랜잭션 `ReadSet`의 키가 이미 존재하면, `validateKVRead`는 즉시 `false` 를 바로 반환한다 (아래 `updates.Exists()`를 참고). 그리고 최종적으로 `validateTx` 함수가 `MVCC_READ_CONFLICT` 값을 반환한다.

```go
func (v *validator) validateKVRead(ns string, kvRead *kvrwset.KVRead, updates *privacyenabledstate.PubUpdateBatch) (bool, error) {
	
	if updates.Exists(ns, kvRead.Key) {
		return false, nil
	}
	...
	return true, nil
}
```

블록체인의 관점에서 본다면, Hyperledger Fabric에서 MVCC는 Double Spending 문제를 방지하는데 사용된다. Double Spending 의 문제가, 이미 적용된 트랜잭션이 분산 환경이라는 제약 때문에 미처 전파되지 못한 상태에서 다른 트랜잭션이 수행되면서 발생하는 문제이다. 그래서 이를 방지하기 위한 MVCC가 Double Spending 문제를 해결하기 위한 핵심 기법이 되는 것이다.

## MVCC Read Conflict의 해결책은?
MVCC Read Conflict에 대한 해결책을 한문장으로 설명하면 “**동일한 키에 대해 서로 다른 값을 업데이트 하는 트랜잭션들을 한 블록에 담지 않도록 하는 어떠한 기법, 기술, 또는 아키텍처**” 이다. 이를 영구적으로 해결하는 방법도 있겠고, 단순히 그럴 확률을 낮추는 방법도 있겠다.

가장 쉽고 원시적인(?) 방법은 `BatchTimeout` 시간을 조절해서 트랜잭션들이 한 블록에 담길 확률 자체를 낮추는 것이다. 기본값은 2초로 되어 있는데, 이는 생각보다 꽤 긴 시간이다. 이를 0.5초 정도로 낮추면 MVCC Read Conflict를 유발시킬 트랜잭션들이 한 블록에 담길 확률을 꽤 낮출 수 있다. 만약 코드 분석 및 업데이트에 시간이 걸리는데, 문제 자체는 시급하다면, 일단 `BatchTimeout` 시간을 조절하는 것을 생각해볼 수 있다. 실제로 이를 진지하게 해결책으로 제시하는 StackOverflow의 답변도 있다.(출처: [MVCC\_READ\_CONFLICT when submitting multiple transactions concurrently](https://stackoverflow.com/questions/45347439/mvcc-read-conflict-when-submitting-multiple-transactions-concurrently))

그리고 MVCC Read Conflict 에러를 캐치하여 해당 트랜잭션에 대해서 재전송하는 후처리 방식도 있을 수 있다. 이 방법 역시 논리적으로 이해가 쉽고 개발도 간편하다. 하지만, MVCC Read Conflict 에러가 빈번하는 환경에서는 에러 발생 횟수만 늘릴 뿐, 근본적인 해결책이 되지 못할 가능성이 높다. 쌓여가는 에러에 재전송 되는 트랜잭션들이 늘어나고, 이에 따라 트랜잭션 처리 오버헤드가 심하게 걸려 시스템의 전체적인 성능을 저하시키는 바틀낵(bottleneck) 지점이 될 가능성도 있다.

이 외에 “[How to prevent key collisions in Hyperledger Fabric chaincode](https://medium.com/@gatakka/how-to-prevent-key-collisions-in-hyperledger-fabric-chaincode-303700716733)” 글에서 몇가지 전략을 아래와 같이 소개하고 있다.

### 1. No Duplicated Keys(x) -\> Avoid Duplicated Keys As Possible

위 글에서는 아애 중복 키를 만들지 않는 전략으로 소개되었지만, 이는 특수한 몇몇 상황을 제외하면, 현실적으로는 거의 불가능하다. 그보다는 “최대한 중복 키를 피하는 설계”가 중요하다. 블록체인 기반 시스템의 설계에서 중요한 부분 중 하나는 DB 설계일텐데, 블록체인에 저장될 데이터, 특히 그 데이터의 ‘키’ 구조를 설계하는 것이 핵심 중의 핵심이라고 할 수 있다. 

Hyperledger Fabric은 기본적으로 키-밸류 DB이기 때문에, 키-밸류 DB 설계 방법과 동일하다. 어떤 데이터를 쿼리 해 올 것인지를 명확히 정의한 후, 이에 맞춰 키 구조를 설계해야 한다 쿼리에 따른 키 구조 설계는 Hyperledger Fabric에서 특히 중요한데, 이는 State DB로 사용되는 LevelDB의 특성 때문이다. LevelDB는 별도의 인덱스 대신 키를 정렬해서 사용한다. 그렇기 때문에 Chaincode SDK의 Range Query를 활용하기 위해선 키 구조 자체를 섬세하게 설계해둬야 한다.. 이때 MVCC Read Conflict를 염두에 둔 설계가 필수적이다. 되도록 데이터는 새로운 키에 쌓도록 하며, 읽어드릴 때 Range Query를 이용하여 값을 읽도록 하는 것이 좋다. 예를 들어, 토큰 내역을 저장한다고 하면, 기존 밸런스 업데이트 모델(사용자 ID를 키로, 밸런스 값을 밸류로)보다는 비트코인 같은 UTXO 모델이 더 좋다.

### 2. Put Requests in Queue

Fabric SDK를 사용하는 Client Server 단에서 큐를 통해 한 트랜잭션 씩 보내는 방법이다. 일단 모든 트랜잭션을 하나의 큐로 관리한다면, 이는 매우 극단적인 방법이고 적절한 성능을 확보하긴 어려워보인다. 하지만, 원 출처에서도 말했듯이, 만약 어떤 키를 업데이트할 지 Client Server가 알 수 있다면, 해당 키에 동시에 업데이트 하는 트랜잭션들만 큐로 보내는 식으로 최적화하는 것은 상당히 현실적인 방법으로 보인다. 하지만 이 경우, Client Server 코드와 체인코드 사이의 의존관계가 발생하는 문제가 있다.

### 3. Running Total

일단 트랜잭션들을 처리하고, 주기적으로 이를 정리해주는 절차/기능을 별도로 수행하는 방법이다. 한마디로 “정산”을 주기적으로 해주는 방법이라고 할 수 있다. 구현도 쉽고, 이해도 쉬운 기법이지만, 금융거래처럼 실시간성이 중요한 사례에서의 적용은 다소 부적합하다고 볼 수 있다.

### 4. Batching

Batching은 좀 재밌는 기법이다. 이 기법에서는 Client Server가 블록 커밋 되기 전까지 여러 요청들을 모아놓고 있는다. 앞선 블록이 커밋되면, 모아둔 요청들을 한번에 하나의 트랜잭션으로 묶어서 (예: 요청들의 리스트를 트랜잭션 argument로 삽입) 체인코드를 호출한다. 체인코드는 미리 요청의 리스트를 처리하도록 코딩되어 있어야 한다. 체인코드의 실행 및 블록 커밋이 완료되기 전까지 Client Server는 다음에 들어오는 요청들을 모으고 있는다.

Batching은 일단 체인코드가 들어오는 요청들의 리스트를 처리할 수 있도록 짜여져 있어야 한다. General하게 코딩되어야 하기 때문에, 코드 내에서 요청의 종류 별로 if-else 분기가 수차례 있을 수 있다. 그리고 `batchTimeout`, `batchSize`와 같은 블록 설정이 섬세하게 튜닝되어야 하는 문제도 있다. 개인적인 생각으로는, Fabric SDK을 사용하는 Client Server가 중앙화되어 있는 시스템이면서 성능이 아주 실시간성일 필요는 없을 때(결국 `batchTimeout`  또는 `batchSize` 주기로 업데이트가 될 것이므로), 제한적으로 섬세하게 튜닝하여 적용할 수 있는 기법이 아닌가 싶다.

개인적인 생각으로는 1번은 설계 때부터 항상 고려해야 하는 사항이다. 키 충돌을 최대한 피하도록 섬세하게 데이터 모델을 설계하는것이 가장 기본이다. 그래서 Hyperledger Fabric 시스템 설계에서 도메인 모델 설계와 ER 다이어그램 도출은 (일반적인 RDBMS 설계와는 다르게) DB 설계의 끝이 아니라 시작이다. 이 설계를 바탕으로 시스템에서 사용할 쿼리들을 도출하고, 쿼리에 맞춰 키 구성을 설계해야 한다. 필요하다면 중복 저장도 충분히 고려해야 한다. 이때, Range Query 시 발생할 수 있는 오류인 Phantom Read Conflict도 고려해야 한다.

이 외에 2, 3, 4번은 저장되는 데이터의 종류와 쿼리의 성격을 고려하여 적절히 선택해야 한다. 필요하다면 여러 기법을 중복해서 쓸 수도 있다. 예를 들면, 사후 정산이 가능한 토큰 시스템이라면 3번 방법을 고려해볼 수 있다. 하지만 실시간으로 정산이 되어야 한다면 2번 방법을 최적화하 하거나 4번을 생각해볼 수 있다.

소프트웨어 설계 및 개발은 언제나 그렇듯이 하나의 Silver Bullet은 없다. 제일 중요한건 설계 단계에서부터 MVCC Read Conflict를 심각하게 고려하고, 위의 여러 방법들을 적절히 조합, 서비스에 최적화된 설계와 코드를 만들어내는 것이다.

![](signature.png)
