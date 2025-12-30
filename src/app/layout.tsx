import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"], // Wide range for versatility
});

export const metadata: Metadata = {
  title: {
    default: "Code with Risqi | Jasa Pembuatan Website & Aplikasi Terbaik",
    template: "%s | Code with Risqi",
  },
  description: "Jasa pembuatan website, aplikasi mobile, dan sistem ERP perusahaan terpercaya di Indonesia. Solusi digital profesional dengan teknologi modern (Next.js, React) untuk pertumbuhan bisnis Anda.",
  keywords: [
    "Jasa Pembuatan Website",
    "Jasa Pembuatan Aplikasi",
    "Web Developer Indonesia",
    "Software House Terpercaya",
    "Jasa Landing Page",
    "Sistem ERP Perusahaan",
    "Jasa Pembuatan HRIS",
    "Code with Risqi",
    "Risqi Ahmad",
    "Full Stack Developer"
  ],
  authors: [{ name: "Risqi Ahmad", url: "https://codewithrisqi.com" }],
  creator: "Risqi Ahmad",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://codewithrisqi.com",
    title: "Code with Risqi | Solusi Digital & Software House",
    description: "Partner teknologi terbaik untuk bisnis Anda. Melayani pembuatan website, aplikasi Android/iOS, dan sistem manajemen perusahaan.",
    siteName: "Code with Risqi",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Code with Risqi - Professional Web Development",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Code with Risqi - Jasa Pembuatan Website & Aplikasi",
    description: "Jasa pembuatan website dan desain UI/UX profesional.",
    creator: "@risqiahmad", // Replace with actual handle if available
  },
  metadataBase: new URL("https://codewithrisqi.com"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning className="scroll-smooth scroll-pt-24">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=block"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "Code with Risqi",
              "image": "https://codewithrisqi.com/images/og-image.jpg",
              "url": "https://codewithrisqi.com",
              "telephone": "+6285159120300",
              "priceRange": "$$",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "ID"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": -6.2088,
                "longitude": 106.8456
              },
              "sameAs": [
                "https://github.com/risqiahmad",
                "https://linkedin.com/in/risqiahmad",
                "https://twitter.com/risqiahmad"
              ],
              "description": "Jasa profesional pembuatan website, aplikasi mobile (Android/iOS), dan sistem informasi perusahaan (ERP, HRIS).",
              "founder": {
                "@type": "Person",
                "name": "Risqi Ahmad"
              },
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday"
                ],
                "opens": "09:00",
                "closes": "17:00"
              },
              "makesOffer": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Jasa Pembuatan Landing Page"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Jasa Pembuatan Toko Online (Ecommerce)"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Sistem ERP & HRIS Perusahaan"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Pengembangan Mobile Apps"
                  }
                }
              ]
            }),
          }}
        />
      </head>
      <body
        className={`${manrope.variable} antialiased transition-colors duration-300 bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
