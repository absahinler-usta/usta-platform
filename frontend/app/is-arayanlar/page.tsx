import type { Metadata } from "next";
import IsArayanlarClient from "./IsArayanlarClient";

export const metadata: Metadata = {
  title: "Güncel İş İlanları - Usta Jobs | İş Arayanlar İçin Fırsatlar",
  description: "Et işleme, fabrika, temizlik, inşaat, sera ve tarım sektörlerinde güncel iş ilanları. İstanbul, Kocaeli, Bursa, Ankara, İzmir'de binlerce iş fırsatı. Hızlı başvuru, güvenilir işverenler.",
  keywords: [
    "iş ilanları",
    "güncel iş ilanları",
    "iş arayanlar",
    "et işleme iş ilanları",
    "fabrika iş ilanları",
    "temizlik iş ilanları",
    "inşaat iş ilanları",
    "sera iş ilanları",
    "tarım iş ilanları",
    "İstanbul iş ilanları",
    "Kocaeli iş ilanları",
    "Bursa iş ilanları",
    "Ankara iş ilanları",
    "İzmir iş ilanları",
    "personel alımı",
    "eleman arayanlar",
    "kariyer fırsatları",
  ],
  openGraph: {
    title: "Güncel İş İlanları - Usta Jobs",
    description: "Et işleme, fabrika, temizlik, inşaat, sera ve tarım sektörlerinde güncel iş ilanları. Hızlı başvuru, güvenilir işverenler.",
    images: [
      {
        url: "/images/is-arayanlar-og-image.png",
        width: 1200,
        height: 630,
        alt: "Usta Jobs İş İlanları",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Güncel İş İlanları - Usta Jobs",
    description: "Binlerce iş fırsatı arasından sana en uygun olanı bul. Hızlı başvuru, güvenilir işverenler.",
  },
};

export default function IsArayanlarPage() {
  // BreadcrumbList Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Anasayfa",
        item: "https://ustajobs.be",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "İş Arayanlar",
        item: "https://ustajobs.be/is-arayanlar",
      },
    ],
  };

  // JobPosting Schema (Dinamik olarak client component'ten gelecek)
  const jobSearchSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Güncel İş İlanları - Usta Jobs",
    description: "Et işleme, fabrika, temizlik, inşaat, sera ve tarım sektörlerinde güncel iş ilanları.",
    url: "https://ustajobs.be/is-arayanlar",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Tüm İş İlanları",
          url: "https://ustajobs.be/is-arayanlar",
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobSearchSchema) }}
      />
      <IsArayanlarClient />
    </>
  );
}