import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "Usta Jobs - Doğru İnsan, Doğru İş! | İş İlanları ve Personel Temini",
    template: "%s | Usta Jobs",
  },
  description: "İşletmeler ile doğru iş gücünü buluşturan profesyonel insan kaynakları ve iş gücü yönetimi platformu. İş ilanı yayınla, personel bul, kariyer fırsatlarını keşfet.",
  keywords: [
    "iş ilanları",
    "personel temini",
    "insan kaynakları",
    "iş arayanlar",
    "işverenler",
    "kariyer fırsatları",
    "et işleme iş ilanları",
    "fabrika iş ilanları",
    "temizlik iş ilanları",
    "inşaat iş ilanları",
    "sera iş ilanları",
    "tarım iş ilanları",
    "İstanbul iş ilanları",
    "Kocaeli iş ilanları",
    "Bursa iş ilanları",
  ],
  authors: [{ name: "Usta Jobs", url: "https://ustajobs.be" }],
  creator: "Usta Jobs",
  publisher: "Usta Jobs",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://ustajobs.be"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://ustajobs.be",
    siteName: "Usta Jobs",
    title: "Usta Jobs - Doğru İnsan, Doğru İş!",
    description: "İşletmeler ile doğru iş gücünü buluşturan profesyonel insan kaynakları ve iş gücü yönetimi platformu.",
    images: [
      {
        url: "/images/usta-jobs-og-image.png",
        width: 1200,
        height: 630,
        alt: "Usta Jobs - Doğru İnsan, Doğru İş!",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Usta Jobs - Doğru İnsan, Doğru İş!",
    description: "İşletmeler ile doğru iş gücünü buluşturan profesyonel insan kaynakları platformu.",
    images: ["/images/usta-jobs-og-image.png"],
    creator: "@ustajobs",
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
    icon: [
      { url: "/usta-jobs-favicon.png" },
      { url: "/usta-jobs-favicon.png", type: "image/png", sizes: "32x32" },
    ],
    shortcut: "/usta-jobs-favicon.png",
    apple: "/usta-jobs-favicon.png",
  },
  verification: {
    google: "google-site-verification-kodunu-buraya-ekle",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Organization Schema (JSON-LD)
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Usta Jobs",
    url: "https://ustajobs.be",
    logo: "https://ustajobs.be/images/usta-jobs-logo.png",
    description: "İşletmeler ile doğru iş gücünü buluşturan profesyonel insan kaynakları ve iş gücü yönetimi platformu.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "İkitelli OSB, Mah. Atatürk Bulvarı No: 20K",
      addressLocality: "Başakşehir",
      addressRegion: "İstanbul",
      addressCountry: "TR",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+90-212-123-45-67",
      contactType: "customer service",
      email: "sales@ustajobs.be",
      availableLanguage: ["Turkish", "English"],
    },
    sameAs: [
      "https://www.facebook.com/ustajobs",
      "https://www.instagram.com/ustajobs",
      "https://www.linkedin.com/company/ustajobs",
      "https://www.youtube.com/ustajobs",
    ],
  };

  return (
    <html lang="tr">
      <head>
        <link rel="icon" href="/usta-jobs-favicon.png" sizes="any" />
        <meta name="theme-color" content="#1e3a5f" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
            <body 
        className="bg-white text-gray-800 font-sans antialiased"
        suppressHydrationWarning
      >
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}