import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "../components/context/theme-provider";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { ClerkProvider } from "@clerk/nextjs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "bitarena",
  description: "Created by Khubab",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <ThemeProvider>
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            <div className="bg-gradient-to-br from-background to-muted">
              <Header />
              <main className="min-h-screen  container mx-auto px-4 py-8">
                {children}
              </main>
              <footer className="border-t backdrop-blur py-8 supports-[backdrop-filter]:bg-background/60">
                <div className="container mx-auto px-4 text-center">
                  <Footer />
                </div>
              </footer>
            </div>
          </body>
        </ThemeProvider>
      </html>
    </ClerkProvider>
  );
}
