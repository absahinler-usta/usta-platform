import type { Metadata } from "next";
import { getHizmetBySlug, getJobs } from "@/lib/api";
import HizmetDetayClient from "./HizmetDetayClient";

// Dinamik metadata oluştur
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const hizmet = await getHizmetBySlug(slug);

  if (!hizmet) {
    return {
      title: "Hizmet Bulunamadı - Usta Jobs",
      description: "Aradığınız hizmet bulunamadı.",
    };
  }

  const title = `${hizmet.baslik} Hizmeti | Usta Jobs Personel Çözümleri`;
  const description = `${hizmet.baslik} hizmeti ile profesyonel personel çözümleri. ${hizmet.aciklama.substring(0, 120)}... Hızlı, güvenilir, yasal personel temini.`;

  return {
    title,
    description,
    keywords: [
      hizmet.baslik,
      `${hizmet.baslik} hizmeti`,
      `${hizmet.baslik} personel temini`,
      "insan kaynakları hizmetleri",
      "personel çözümleri",
      "iş gücü yönetimi",
    ],
    openGraph: {
      title,
      description,
      type: "article",
      images: hizmet.image 
        ? [{ url: hizmet.image, width: 1200, height: 630, alt: hizmet.baslik }]
        : [{ url: "/images/hizmet-og-image.png", width: 1200, height: 630, alt: hizmet.baslik }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function HizmetDetayPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const hizmet = await getHizmetBySlug(slug);

  if (!hizmet) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-ustablue mb-2">Hizmet Bulunamadı</h2>
          <p className="text-gray-600 mb-4">Aradığınız hizmet bulunamadı.</p>
          <a 
            href="/hizmetlerimiz"
            className="bg-ustaorange text-white px-6 py-3 rounded font-bold hover:bg-orange-600 transition inline-block"
          >
            Tüm Hizmetlere Dön
          </a>
        </div>
      </div>
    );
  }

  // İlgili iş ilanlarını çek
  const jobs = await getJobs();
    const ilgiliIlanlar = jobs.filter((j: any) => 
    j.sektor?.slug?.includes(slug) || 
    j.baslik?.toLowerCase().includes(hizmet.baslik.toLowerCase().split(' ')[0] || '')
  ).slice(0, 3);

  // Service Schema
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: hizmet.baslik,
    name: `${hizmet.baslik} - Usta Jobs`,
    description: hizmet.aciklama,
    provider: {
      "@type": "Organization",
      name: "Usta Jobs",
      url: "https://ustajobs.be",
      logo: "https://ustajobs.be/images/usta-jobs-logo.png",
    },
    areaServed: {
      "@type": "Country",
      name: "TR",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${hizmet.baslik} Hizmetleri`,
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: hizmet.baslik,
            description: hizmet.aciklama,
          },
        },
      ],
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
        name: "Hizmetlerimiz",
        item: "https://ustajobs.be/hizmetlerimiz",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: hizmet.baslik,
        item: `https://ustajobs.be/hizmetlerimiz/${hizmet.slug}`,
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
      <HizmetDetayClient hizmet={hizmet} ilgiliIlanlar={ilgiliIlanlar} />
    </>
  );
}