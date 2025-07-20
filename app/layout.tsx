import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Inter, Playfair_Display } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

// Fonts
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "Lisa & Thibault",
  description: "Faire-part de mariage – 6/6/2026 à Cusset",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`
          ${geistSans.variable}
          ${geistMono.variable}
          ${inter.variable}
          ${playfair.variable}
          font-sans antialiased bg-[#fdfaf5] text-[#2e2e2e]
        `}
      >
        {/* Fond papier */}
        <div
          className="fixed inset-0 -z-10 bg-[url('/bg/paper.jpg')] bg-repeat bg-center opacity-20"
          aria-hidden="true"
        />

        {/* Contenu principal */}
        {children}

        {/* Notifications */}
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
