import type { Metadata } from "next";

import "./globals.css";

import { Inter, Playfair_Display } from "next/font/google";

import SmoothScroll from "@/components/animations/smooth-scroll";
import InquiryModal from "@/components/forms/inquiry-modal";

import { seoConfig } from "@/config/seo";

import WhatsappButton from "@/components/ui/whatsapp-button";

import GoogleAnalytics from "@/components/analytics/google-analytics";

import Footer from "@/components/layout/footer";

import Topbar from "@/components/layout/topbar";

import FloatingSocials from "@/components/ui/floating-socials";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: {
  default: seoConfig.title,

  template:
    "%s | JustTheRoutes",
},

  description: seoConfig.description,

  keywords: seoConfig.keywords,

  metadataBase: new URL(seoConfig.url),

  applicationName:
  "JustTheRoutes",

robots: {
  index: true,
  follow: true,

  googleBot: {
    index: true,
    follow: true,

    "max-video-preview": -1,

    "max-image-preview":
      "large",

    "max-snippet": -1,
  },
},

 icons: {
    icon: "/icon.png",
  },

  openGraph: {
    title: {
  default: seoConfig.title,

  template:
    "%s | JustTheRoutes",
},

    description: seoConfig.description,

    url: seoConfig.url,

    siteName: "JustTheRoutes",

    images: [
      {
        url: seoConfig.ogImage,
        width: 1200,
        height: 630,
      },
    ],

    locale: "en_IN",

    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title: {
  default: seoConfig.title,

  template:
    "%s | JustTheRoutes",
},

    description: seoConfig.description,

    images: [seoConfig.ogImage],
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
      data-scroll-behavior="smooth"
    >
      <body
        className={`${inter.variable} ${playfair.variable} antialiased`}
      >
        <GoogleAnalytics />
        <SmoothScroll>
          <Topbar />

          {children}

          <InquiryModal />
          <FloatingSocials />
          <Footer />

        </SmoothScroll>
      </body>
    </html>
  );
}