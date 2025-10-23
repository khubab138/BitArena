import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "../components/context/theme-provider";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { ClerkProvider } from "@clerk/nextjs";
import StoreProvider from "@/Store/StoreProvider";
import AuthProvider from "@/components/context/Auth-Provider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
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
      <StoreProvider>
        <AuthProvider>
          <html lang="en">
            <ThemeProvider>
              <body
                className={`${inter.variable} ${robotoMono.variable} antialiased`}
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
        </AuthProvider>
      </StoreProvider>
    </ClerkProvider>
  );
}
