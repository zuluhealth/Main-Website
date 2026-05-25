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
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-1KKG8Q204F"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-1KKG8Q204F');`,
          }}
        />
        {/* Meta Pixel Code */}
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '3029934710549653');
fbq('track', 'PageView');`,
          }}
        />
        {/* End Meta Pixel Code */}
        {/* Microsoft Clarity */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "wv2irajiqv");`,
          }}
        />
        <link rel="icon" href="/zulu-icon.svg" type="image/svg+xml" />
      </head>
      <body>
        {/* Meta Pixel Code (noscript fallback) */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=3029934710549653&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
