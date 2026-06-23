import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { InstallPrompt } from "@/components/install-prompt";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VAST Smart Extension Directory",
  description: "Find extension numbers of departments, offices, laboratories and staff instantly.",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAF8F5" },
    { media: "(prefers-color-scheme: dark)", color: "#1A1512" },
  ],
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          {/* Background Image */}
          <div className="fixed inset-0 z-[-2] pointer-events-none">
            {/* The user will upload their image as campus-bg.jpg in the public folder */}
            <img src="/campus-bg.jpg" alt="Background" className="w-full h-full object-cover" />
          </div>
          
          {/* Overlay to ensure text readability */}
          <div className="fixed inset-0 z-[-1] bg-white/20 dark:bg-black/60 backdrop-blur-md pointer-events-none transition-colors duration-300"></div>

          <Navbar />
          <main className="flex-grow flex flex-col">
            {children}
          </main>
          <Footer />
          <InstallPrompt />
        </ThemeProvider>
      </body>
    </html>
  );
}
