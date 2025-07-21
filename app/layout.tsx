import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";


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
    <html className="!bg-white dark:!bg-white dark:text-black">
      <body
        className="antialiased bg-[#fdfaf5] text-[#2e2e2e] bg-gradient-to-b from-white to-[#f8f4f0] min-h-screen text-[#2e2e2e]" >
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
