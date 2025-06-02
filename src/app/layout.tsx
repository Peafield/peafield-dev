import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Navbar from "@/components/Navbar";
import { StoreInit } from "@/components/store-init";

export const metadata: Metadata = {
  metadataBase: new URL('https://peafield.dev'),
  title: "Peter John Coles",
  description: "Papa, junior frontend developer, and writer.",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body className="flex flex-col min-h-svh flex-nowrap relative antialiased">
        <StoreInit />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          <main className="flex-1 flex flex-col items-center justify-center">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
