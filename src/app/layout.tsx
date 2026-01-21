import type { Metadata } from "next";
import "../styles/globals.scss";

export const metadata: Metadata = {
  metadataBase: new URL("https://zulu.health"),
  title: "Zulu - Connected Healthcare Platform",
  description: "Your complete health data in one secure place. Book appointments, view lab results, manage medical records, and take control of your family's health with Zulu.",
  keywords: [
    "healthcare platform",
    "medical records",
    "health data management",
    "electronic health records",
    "telemedicine",
    "lab results",
    "patient portal",
    "family health management",
    "HIPAA compliant",
    "Lebanon healthcare",
    "Middle East healthcare",
    "digital health",
    "medical appointments"
  ],
  authors: [{ name: "Zulu Health" }],
  creator: "Zulu Health",
  publisher: "Zulu Health",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://zulu.health",
    title: "Zulu - Connected Healthcare Platform",
    description: "Your complete health data in one secure place. Book appointments, view lab results, manage medical records, and take control of your family's health.",
    siteName: "Zulu",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zulu - Connected Healthcare Platform",
    description: "Your complete health data in one secure place. Book appointments, view lab results, manage medical records.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/zulu-icon.svg',
    shortcut: '/zulu-icon.svg',
    apple: '/zulu-icon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/zulu-icon.svg" type="image/svg+xml" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
