import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import type { ReactNode } from "react"
import AnimatedLayout from "@/components/root/AnimatedLayout"
import { Metadata } from "next"
import Link from "next/link"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "The Tiny App",
  description: "A collection of tiny apps for productivity and fun.",
  openGraph: {
    title: "The Tiny App",
    description: "A collection of tiny apps for productivity and fun.",
    url: "https://tiny-app.vercel.app",
    siteName: "The Tiny App",
  },
}


export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AnimatedLayout>
          <div className="min-h-screen flex flex-col">
            <header className="fixed top-0 left-0 w-full bg-card shadow-md z-50">
              <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <Link href="/">
                  <h1 className="text-xl font-bold">The Tiny App</h1>
                </Link>
                <nav>
                  <ul className="flex gap-4">
                    <li><a href="/" className="hover:underline">Home</a></li>
                    <li><a href="/about" className="hover:underline">About</a></li>
                    <li><a href="/contact" className="hover:underline">Contact</a></li>
                  </ul>
                </nav>
              </div>
            </header>
            <main className="container mx-auto px-4 pt-16 pb-8">
              {children}
            </main>
            <footer className="bg-secondary text-secondary-foreground py-4 mt-auto">
              <div className="container mx-auto text-center">
                <p>© 2025 The Tiny App. All rights reserved.</p>
              </div>
            </footer>
          </div>
        </AnimatedLayout>
      </body>
    </html>
  )
}