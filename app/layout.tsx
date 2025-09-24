import type { Metadata } from "next";
import "./globals.css";
import { AppConfig } from "@/config/app.config";
import Footer from "@/components/Shared/Footer";
import Header from "@/components/Shared/Navbar";

export const metadata: Metadata = {
  title: AppConfig().app.name,
  description: AppConfig().app.slogan,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
