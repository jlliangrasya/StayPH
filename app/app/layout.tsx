import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "StayPH — Find your home away from home",
  description:
    "The Philippines' first verified boarding house and bedspace platform. Find safe, affordable long-term housing near your university or workplace.",
  keywords: ["boarding house", "bedspace", "Philippines", "student housing", "Cebu", "verified listings"],
  openGraph: {
    title: "StayPH — Find your home away from home",
    description: "Verified boarding houses and bedspaces near top Philippine universities.",
    siteName: "StayPH",
    locale: "en_PH",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${plusJakartaSans.variable} ${playfairDisplay.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-warm-white">{children}</body>
    </html>
  );
}
