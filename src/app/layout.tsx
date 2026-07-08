import type { Metadata } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "MAAJ Furniture Mart | Luxury Furniture in Narol, Ahmedabad",
    template: "%s | MAAJ Furniture Mart",
  },
  description:
    "MAAJ Furniture Mart - Premium quality sofas, beds, dining sets, wardrobes aur office furniture. Narol, Sarkhej Narol Highway pe visit karein.",
  keywords: [
    "furniture Ahmedabad",
    "sofa Narol",
    "MAAJ Furniture Mart",
    "wooden furniture",
    "luxury furniture showroom",
  ],
  openGraph: {
    title: "MAAJ Furniture Mart | Luxury Furniture",
    description: "Premium quality furniture showroom in Narol, Ahmedabad",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "MAAJ Furniture Mart",
    description: "Premium quality furniture showroom in Narol, Ahmedabad",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${poppins.variable}`}>
      <body className="antialiased bg-background text-white">
        {children}
        <Toaster theme="dark" position="top-center" richColors />
      </body>
    </html>
  );
}
