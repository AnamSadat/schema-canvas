import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SchemaCanvas - Generate ERD from MySQL/PostgreSQL",
  description:
    "Generate beautiful ERD diagrams from your MySQL and PostgreSQL databases with a modern UI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: "oklch(0.17 0.02 260)",
              color: "oklch(0.95 0.01 260)",
              border: "1px solid oklch(0.28 0.02 260)",
            },
            success: {
              iconTheme: {
                primary: "oklch(0.75 0.15 190)",
                secondary: "oklch(0.13 0.02 260)",
              },
            },
            error: {
              iconTheme: {
                primary: "oklch(0.65 0.2 25)",
                secondary: "oklch(0.13 0.02 260)",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
