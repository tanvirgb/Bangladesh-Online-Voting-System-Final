import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./utilities/header";
import Footer from "./utilities/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bangladesh Online Voting System",
  description: "Generated by Shakib",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <Header/>
          <main className="flex-grow bg-gray-200 text-gray-700">
            {children}
          </main>
          <Footer/>
        </div>
      </body>
    </html>
  );
}