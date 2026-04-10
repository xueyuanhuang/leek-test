import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "韭菜人格测试 | 看看你是哪棵韭菜",
  description: "30道币圈灵魂拷问，测测你是钻石手、梭哈战神还是纯血Degen？27种韭菜人格等你解锁。",
  openGraph: {
    title: "韭菜人格测试",
    description: "30道币圈灵魂拷问，看看你是哪棵韭菜？",
    type: "website",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    title: "韭菜测试",
    statusBarStyle: "black-translucent",
  },
  icons: {
    icon: "/icon-192.png",
    apple: "/apple-touch-icon.png",
  },
  other: {
    "mobile-web-app-capable": "yes",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
