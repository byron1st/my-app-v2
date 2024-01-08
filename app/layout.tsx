import type { Metadata } from "next";
import localFont from "next/font/local";
import { JetBrains_Mono } from "next/font/google";
import classNames from "classnames";
import { Container } from "@radix-ui/themes";
import Toolbar from "@/lib/components/common/Toolbar";
import Footer from "@/lib/components/common/Footer";
import Providers from "@/app/Providers";
import "@/app/theme-config.css";
import "@/app/global.css";
import { Analytics } from "@vercel/analytics/react";

const pretendard = localFont({
  src: "../public/PretendardVariable.woff2",
  display: "swap",
  variable: "--font-pretendard",
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrainsmono",
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
      className={classNames(pretendard.variable, jetbrainsMono.variable)}
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
      </body>
    </html>
  );
}
