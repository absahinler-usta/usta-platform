import { MetadataRoute } from 'next';
import { getJobs } from '@/lib/api';
import { getSectors } from '@/lib/api';
import { getHizmetler } from '@/lib/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://ustajobs.be';
  
  // Statik sayfalar
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/hakkimizda`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/iletisim`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/isverenler`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/isverenler/detayli-talep`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/is-arayanlar`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/sektorler`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/hizmetlerimiz`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  // Dinamik sayfaları çek
  const jobs = await getJobs();
  const sectors = await getSectors();
  const hizmetler = await getHizmetler();

  // İş ilanları
  const jobPages: MetadataRoute.Sitemap = jobs.map((job: any) => ({
    url: `${baseUrl}/is-arayanlar/${job.slug}`,
    lastModified: new Date(job.updatedAt || job.createdAt),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Sektörler
  const sectorPages: MetadataRoute.Sitemap = sectors.map((sector: any) => ({
    url: `${baseUrl}/sektorler/${sector.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Hizmetler
  const hizmetPages: MetadataRoute.Sitemap = hizmetler.map((hizmet: any) => ({
    url: `${baseUrl}/hizmetlerimiz/${hizmet.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...jobPages, ...sectorPages, ...hizmetPages];
}