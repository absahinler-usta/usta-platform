import type { Metadata } from "next";
import { getJobBySlug } from "@/lib/api";
import JobDetailClient from "./JobDetailClient";

// Dinamik metadata oluştur
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; // ✅ AWAIT İLE BEKLE
  const job = await getJobBySlug(slug);

  if (!job) {
    return {
      title: "İlan Bulunamadı - Usta Jobs",
      description: "Aradığınız iş ilanı bulunamadı veya yayınlanmamış.",
    };
  }

  const title = `${job.baslik} - ${job.firma?.ad || 'Usta Jobs'} | İş İlanı`;
  const description = `${job.konum} şehrinde ${job.firma?.ad} firmasında ${job.baslik} pozisyonu. ${job.tur} çalışma şekli. ${job.aciklama.substring(0, 150)}...`;

  return {
    title,
    description,
    keywords: [
      job.baslik,
      `${job.konum} iş ilanları`,
      `${job.firma?.ad} iş ilanları`,
      `${job.sektor?.baslik} iş ilanları`,
      job.tur,
      "iş başvurusu",
      "kariyer fırsatları",
    ],
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: job.createdAt,
      modifiedTime: job.createdAt,
      images: [
        {
          url: "/images/is-ilani-og-image.png",
          width: 1200,
          height: 630,
          alt: `${job.baslik} - ${job.firma?.ad}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function JobDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; // ✅ AWAIT İLE BEKLE
  const job = await getJobBySlug(slug);

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-ustablue mb-2">İlan Bulunamadı</h2>
          <p className="text-gray-600 mb-4">Aradığınız iş ilanı bulunamadı veya yayınlanmamış.</p>
          <a 
            href="/is-arayanlar"
            className="bg-ustaorange text-white px-6 py-3 rounded font-bold hover:bg-orange-600 transition inline-block"
          >
            Tüm İlanlara Dön
          </a>
        </div>
      </div>
    );
  }

  // Employment type mapping
  const employmentTypeMap: { [key: string]: string } = {
    'Tam Zamanlı': 'FULL_TIME',
    'Yarı Zamanlı': 'PART_TIME',
    'Vardiyalı': 'FULL_TIME',
    'Mevsimlik': 'TEMPORARY',
    'Proje Bazlı': 'CONTRACTOR',
  };

  const employmentType = employmentTypeMap[job.tur] || 'FULL_TIME';

  // Valid through: sonBasvuru varsa onu, yoksa createdAt + 30 gün
  const validThrough = job.sonBasvuru 
    ? job.sonBasvuru 
    : new Date(new Date(job.createdAt).getTime() + 30 * 24 * 60 * 60 * 1000).toISOString();

  // JobPosting Schema (Google Jobs için)
  const jobPostingSchema = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.baslik,
    description: job.aciklama,
    datePosted: job.createdAt,
    validThrough: validThrough,
    employmentType: employmentType,
    hiringOrganization: {
      "@type": "Organization",
      name: job.firma?.ad || "Usta Jobs",
      sameAs: "https://ustajobs.be",
      logo: "https://ustajobs.be/images/usta-jobs-logo.png",
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: job.konum,
        addressCountry: "TR",
      },
    },
    ...(job.maas && {
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: "TRY",
        value: {
          "@type": "QuantitativeValue",
          value: job.maas,
          unitText: "MONTH",
        },
      },
    }),
    applicantLocationRequirements: {
      "@type": "Country",
      name: "TR",
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
        name: "İş Arayanlar",
        item: "https://ustajobs.be/is-arayanlar",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: job.baslik,
        item: `https://ustajobs.be/is-arayanlar/${job.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <JobDetailClient job={job} />
    </>
  );
}