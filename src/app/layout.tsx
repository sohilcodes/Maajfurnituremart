import type { Metadata } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import AnalyticsTracker from "@/components/analytics-tracker";
import StructuredData from "@/components/structured-data";

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
    default: "MAAJ Furniture Mart | Best Furniture Shop Near Narol, Ahmedabad",
    template: "%s | MAAJ Furniture Mart",
  },
  description:
    "Ahmedabad ka trusted furniture showroom - Narol, Sarkhej Narol Highway. Sofa, bed, dining, wardrobe, office furniture best price mein. Furniture shop near me, furniture Ahmedabad, sofa Narol.",
  keywords: [
    "furniture near me",
    "furniture shop Ahmedabad",
    "sofa shop Narol",
    "furniture store Sarkhej Narol Highway",
    "MAAJ Furniture Mart",
    "wooden furniture Ahmedabad",
    "luxury furniture showroom Ahmedabad",
    "bed dining furniture Ahmedabad",
  ],
  openGraph: {
    title: "MAAJ Furniture Mart | Furniture Shop Near Narol, Ahmedabad",
    description: "Ahmedabad ka trusted furniture showroom - best price guarantee ke saath",
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    siteName: "MAAJ Furniture Mart",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "MAAJ Furniture Mart - Premium Wooden Furniture Showroom",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MAAJ Furniture Mart",
    description: "Furniture shop near Narol, Ahmedabad",
    images: ["/og-image.jpg"],
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
        <StructuredData />
        <AnalyticsTracker />
        {children}
        <Toaster theme="dark" position="top-center" richColors />
      </body>
    </html>
  );
}
