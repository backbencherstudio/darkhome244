import "./globals.css";
import type { Metadata } from "next";
import { AppConfig } from "@/config/app.config";
import Footer from "@/components/Shared/Footer";
import Header from "@/components/Shared/Navbar";
import { Suspense } from "react";
import Loading from "./loading";
import { LocationProvider } from "@/components/Provider/LocationProvider";
import { Toaster } from 'sonner'

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
      <head>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Geist:wght@100..900&family=Mulish:ital,wght@0,200..1000;1,200..1000&display=swap');
        </style>
      </head>
      <body className="bg-[#F4F4F4]">
        <Suspense fallback={<Loading />}>
          <LocationProvider>
            <Header />
            {children}
            <Footer />
            <Toaster duration={10000} richColors position="top-right" />
          </LocationProvider>
        </Suspense>
      </body>
    </html>
  );
}
