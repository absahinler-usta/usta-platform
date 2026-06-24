import type { Metadata } from "next";
import { getSectorBySlug } from "@/lib/api";
import SectorDetailClient from "./SectorDetailClient";

// Dinamik metadata oluştur
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const sector = await getSectorBySlug(slug);

  if (!sector) {
    return {
      title: "Sektör Bulunamadı - Usta Jobs",
      description: "Aradığınız sektör bulunamadı.",
    };
  }

  const title = `${sector.baslik} İş İlanları ve Personel Temini | Usta Jobs`;
  const description = `${sector.baslik} sektöründe profesyonel personel temini çözümleri. ${sector.ilanlar?.length || 0}+ güncel iş ilanı. Hızlı başvuru, güvenilir işverenler. ${sector.aciklama.substring(0, 100)}...`;

  return {
    title,
    description,
    keywords: [
      `${sector.baslik} iş ilanları`,
      `${sector.baslik} personel temini`,
      `${sector.baslik} eleman arayanlar`,
      `${sector.baslik} sektörü iş fırsatları`,
      "iş ilanları",
      "personel temini",
      "insan kaynakları",
    ],
    openGraph: {
      title,
      description,
      type: "article",
      images: sector.image 
        ? [{ url: sector.image, width: 1200, height: 630, alt: `${sector.baslik} Sektörü` }]
        : [{ url: "/images/sector-og-image.png", width: 1200, height: 630, alt: sector.baslik }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function SectorDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const sector = await getSectorBySlug(slug);

  if (!sector) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-ustablue mb-2">Sektör Bulunamadı</h2>
          <p className="text-gray-600 mb-4">Aradığınız sektör bulunamadı.</p>
          <a 
            href="/sektorler"
            className="bg-ustaorange text-white px-6 py-3 rounded font-bold hover:bg-orange-600 transition inline-block"
          >
            Tüm Sektörlere Dön
          </a>
        </div>
      </div>
    );
  }

  // Service/Industry Schema
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: `${sector.baslik} Personel Temini`,
    name: `${sector.baslik} İş İlanları ve Personel Temini`,
    description: sector.aciklama,
    provider: {
      "@type": "Organization",
      name: "Usta Jobs",
      url: "https://ustajobs.be",
    },
    areaServed: {
      "@type": "Country",
      name: "TR",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${sector.baslik} İş İlanları`,
      itemListElement: sector.ilanlar?.map((ilan: any, index: number) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "JobPosting",
          title: ilan.baslik,
          description: ilan.aciklama,
          hiringOrganization: {
            "@type": "Organization",
            name: ilan.firma?.ad || "Usta Jobs",
          },
          jobLocation: {
            "@type": "Place",
            address: {
              "@type": "PostalAddress",
              addressLocality: ilan.konum,
              addressCountry: "TR",
            },
          },
        },
      })) || [],
    },
  };

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
        name: "Sektörler",
        item: "https://ustajobs.be/sektorler",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: sector.baslik,
        item: `https://ustajobs.be/sektorler/${sector.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <SectorDetailClient sector={sector} />
    </>
  );
}