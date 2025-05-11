import Footer from "@/components/footer";
import type { Metadata } from "next";
import { Anton, DM_Sans } from "next/font/google";
import "./globals.css";

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
});

const DMSans = DM_Sans({
  subsets: ["latin"],
  weight: "600",
  variable: "--font-dmsans",
});

export const metadata: Metadata = {
  title: "Wordle",
  description:
    "Get 6 chances to guess a 5-letter word. A Wordle clone by Marc Bensan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${anton.variable} ${DMSans.variable} font-caption bg-wordle-primary antialiased`}
      >
        {children}
        <footer>
          <Footer />
        </footer>
      </body>
    </html>
  );
}
