import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KUSHAL NAIK | International Fashion Model Portfolio",
  description: "Official modeling portfolio of Kushal Naik. Representing premium editorial, commercial advertising, and TVC campaigns.",
  keywords: ["Kushal Naik", "Fashion Model", "Editorial Modeling", "Commercial Model", "TVC Model", "Indian Model", "Bengaluru Model"],
  authors: [{ name: "Kushal Naik" }],
  openGraph: {
    title: "KUSHAL NAIK | Fashion Model Portfolio",
    description: "Official modeling portfolio of Kushal Naik.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-background text-foreground antialiased selection:bg-white selection:text-black">
        {children}
      </body>
    </html>
  );
}
