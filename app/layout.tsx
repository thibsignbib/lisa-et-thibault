import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";


export const metadata = {
  title: "Lisa & Thibault – Mariage 2026",
  description: "Lisa & Thibault vous invitent à leur mariage le 6 juin 2026.",
  openGraph: {
    title: "Lisa & Thibault – Mariage 2026",
    description: "Lisa & Thibault vous invitent à leur mariage le 6 juin 2026.",
    images: [
      {
        url: "/lisathibaultOG.png",
        width: 1200,
        height: 630,
        alt: "Lisa & Thibault",
      },
    ],
  },
  icons: {
    icon: "/lisathibaultOG.png",
    shortcut: "/lisathibaultOG.png",
    apple: "/lisathibaultOG.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lisa & Thibault – Mariage 2026",
    description: "Lisa & Thibault vous invitent à leur mariage le 6 juin 2026.",
    images: ["/lisathibaultOG.png"],
  },
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="bg-white text-black">
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
