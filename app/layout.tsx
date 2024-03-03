import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import classNames from "classnames";
import { Container } from "@radix-ui/themes";
import Toolbar from "@/lib/components/common/Toolbar";
import Footer from "@/lib/components/common/Footer";
import Providers from "@/lib/components/home/Providers";
import "@/app/theme-config.css";
import "@/app/global.css";

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-notosanskr",
});

export const metadata: Metadata = {
  title: "Hwi's Website",
  description: "Personal website for Hwi Ahn",
  manifest: "./manifest.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={classNames(notoSansKR.variable)}
      suppressHydrationWarning
    >
      <body>
        <Providers>
          <Toolbar />
          <Container size="2" p="4">
            {children}
          </Container>
          <Footer />
        </Providers>

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
