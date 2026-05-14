import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  DM_Sans,
  Space_Mono,
} from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-sans",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kawiarnia U Rełkowej — Wyszków",
  description:
    "Najlepsza kawa i desery w Wyszkowie. Świętojańska 80, 07-200 Wyszków.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body
        className={`${cormorant.variable} ${dmSans.variable} ${spaceMono.variable} grain`}
      >
        {children}
      </body>
    </html>
  );
}
