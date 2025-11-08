import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gemini Saju - AI 사주 분석",
  description: "AI가 분석하는 당신의 운명",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="dark">{children}</body>
    </html>
  );
}

