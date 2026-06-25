// Strapi API Base URL
export const STRAPI_URL = (process.env.NEXT_PUBLIC_STRAPI_URL || "https://usta-jobs-backend.onrender.com").replace(/\/$/, '');


// Generic fetch fonksiyonu
async function fetchAPI(endpoint: string, options?: RequestInit) {
  try {
    const res = await fetch(`${STRAPI_URL}/api/${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    });

    if (!res.ok) {
      throw new Error(`API Error: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

// Rich Text parser (Strapi Blocks format)
export function parseRichText(richText: any[]): string {
  if (!richText || !Array.isArray(richText)) return '';
  
  return richText
    .map((block) => {
      if (block.type === 'paragraph') {
        return block.children.map((child: any) => child.text || '').join('');
      }
      return '';
    })
    .join('\n\n');
}

// TÜM İŞ İLANLARINI GETİR (Filtreleme ve Populate ile)
export async function getJobs(filters?: any) {
  const params = new URLSearchParams();
  
  // Populate - ilişkili alanları getir
  params.append('populate[0]', 'company');
  params.append('populate[1]', 'sector');
  params.append('populate[2]', 'applications');
  
  // Filtreler
  if (filters) {
    if (filters.baslik) {
      params.append('filters[title][$containsi]', filters.baslik);
    }
    if (filters.sektor) {
      params.append('filters[sector][title][$eq]', filters.sektor);
    }
    if (filters.konum) {
      params.append('filters[city][$eq]', filters.konum);
    }
    if (filters.isActive !== undefined) {
      params.append('filters[isActive][$eq]', filters.isActive.toString());
    }
  }

  const url = `${STRAPI_URL}/api/jobs?${params.toString()}`;
  console.log('API URL:', url); // Debug için
  
  const res = await fetch(url, {
    cache: 'no-store',
  });
  
  if (!res.ok) {
    throw new Error('İlanlar yüklenemedi');
  }
  
  const data = await res.json();
  console.log('API Response:', data); // Debug için
  
  // Veriyi frontend formatına dönüştür
  return (data.data || []).map((job: any) => ({
    id: job.id,
    documentId: job.documentId,
    baslik: job.title,
    slug: job.slug,
    aciklama: parseRichText(job.description),
    gereksinimler: parseRichText(job.requirements),
    konum: job.city,
    tur: job.positionType,
    maas: job.salary,
    sonBasvuru: job.applicationDeadline,
    createdAt: job.createdAt,
    updatedAt: job.updatedAt,
    isActive: job.isActive,
    firma: job.company ? {
      id: job.company.id,
      ad: job.company.name,
      slug: job.company.slug,
      dogrulanmis: job.company.isVerified,
    } : null,
    sektor: job.sector ? {
      id: job.sector.id,
      baslik: job.sector.title,
      slug: job.sector.slug,
    } : null,
  }));
}

// TEK İŞ İLANI GETİR (Slug ile - Detay sayfası için)
export async function getJobBySlug(slug: string) {
  const params = new URLSearchParams();
  params.append('filters[slug][$eq]', slug);
  params.append('populate[0]', 'company');
  params.append('populate[1]', 'sector');
  params.append('status', 'published'); // ✅ SADECE YAYINDAKİ İLANLARI GETİR
  
  const url = `${STRAPI_URL}/api/jobs?${params.toString()}`;
  console.log('getJobBySlug URL:', url); // Debug için
  
  const res = await fetch(url, {
    cache: 'no-store',
  });
  
  if (!res.ok) {
    console.error('İlan yüklenemedi:', res.status);
    throw new Error('İlan yüklenemedi');
  }
  
  const data = await res.json();
  console.log('getJobBySlug Response:', data); // Debug için
  
  if (!data.data || data.data.length === 0) {
    console.log('İlan bulunamadı, slug:', slug);
    return null;
  }
  
  const job = data.data[0];
  
  return {
    id: job.id,
    documentId: job.documentId,
    baslik: job.title,
    slug: job.slug,
    aciklama: parseRichText(job.description),
    gereksinimler: parseRichText(job.requirements),
    konum: job.city,
    tur: job.positionType,
    maas: job.salary,
    sonBasvuru: job.applicationDeadline,
    createdAt: job.createdAt,
    updatedAt: job.updatedAt,
    isActive: job.isActive,
    firma: job.company ? {
      id: job.company.id,
      ad: job.company.name,
      slug: job.company.slug,
      dogrulanmis: job.company.isVerified,
    } : null,
    sektor: job.sector ? {
      id: job.sector.id,
      baslik: job.sector.title,
      slug: job.sector.slug,
    } : null,
  };
}

// TÜM SEKTÖRLERİ GETİR
export async function getSectors() {
  const data = await fetchAPI('sectors?populate=*');
  return data.data.map((sector: any) => ({
    id: sector.id,
    documentId: sector.documentId,
    baslik: sector.title,
    slug: sector.slug,
    aciklama: parseRichText(sector.description),
    image: sector.image?.url 
      ? `${STRAPI_URL}${sector.image.url}` 
      : null,
  }));
}

// TEK SEKTÖR GETİR (Slug ile)
export async function getSectorBySlug(slug: string) {
  try {
    const sectors = await getSectors();
    const sector = sectors.find((s: any) => s.slug === slug);
    
    if (!sector) return null;
    
    const jobs = await getJobs();
    const sectorJobs = jobs.filter((j: any) => j.sektor?.slug === slug);
    
    return {
      ...sector,
      ilanlar: sectorJobs,
    };
  } catch (error) {
    console.error('getSectorBySlug error:', error);
    return null;
  }
}

// TÜM ŞİRKETLERİ GETİR
export async function getCompanies() {
  const data = await fetchAPI('companies?populate=*');
  return data.data.map((company: any) => ({
    id: company.id,
    documentId: company.documentId,
    ad: company.name,
    slug: company.slug,
    aciklama: parseRichText(company.description),
    website: company.website,
    email: company.contactEmail,
    telefon: company.contactPhone,
    dogrulanmis: company.isVerified,
    logo: company.logo,
  }));
}

// BAŞVURU OLUŞTUR (İş Arayanlar için)
export async function createApplication(data: {
  adSoyad: string;
  email: string;
  telefon: string;
  mesaj: string;
  jobId: number;
}) {
  try {
    console.log('Başvuru gönderiliyor:', data);
    
    const res = await fetch(`${STRAPI_URL}/api/applications`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          adSoyad: data.adSoyad,
          email: data.email,
          telefon: data.telefon,
          mesaj: data.mesaj,
          job: data.jobId,
          durum: 'pending',
        },
      }),
    });

    const responseData = await res.json();
    console.log('Başvuru yanıtı:', responseData);

    if (!res.ok) {
      throw new Error('Başvuru yapılamadı');
    }

    return responseData;
  } catch (error) {
    console.error('Application error:', error);
    throw error;
  }
}

// İLETİŞİM FORMU GÖNDER (Email ile)
export async function sendContactMessage(data: {
  adSoyad: string;
  email: string;
  telefon: string;
  konu: string;
  mesaj: string;
}) {
  try {
    console.log('İletişim mesajı gönderiliyor:', data);
    
    const res = await fetch(`${STRAPI_URL}/api/contact-messages/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    console.log('Response status:', res.status);
    const responseData = await res.json();
    console.log('Response data:', responseData);

    if (!res.ok) {
      throw new Error(`Mesaj gönderilemedi: ${res.status}`);
    }

    return responseData;
  } catch (error) {
    console.error('Contact error:', error);
    throw error;
  }
}

// PERSONEL TALEBİ OLUŞTUR (İşverenler için - Tüm alanlar)
export async function createPersonelTalebi(data: {
  pozisyon: string;
  sektor: string;
  calismaSekli: string;
  sehir: string;
  personelSayisi: string;
  firmaAdi?: string;
  yetkiliAd?: string;
  email?: string;
  telefon?: string;
  maasAraligi?: string;
  baslangicTarihi?: string;
  aciklama?: string;
}) {
  try {
    console.log('Personel talebi gönderiliyor:', data);
    
    const res = await fetch(`${STRAPI_URL}/api/personel-talebis`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          pozisyon: data.pozisyon,
          sektor: data.sektor,
          calismaSekli: data.calismaSekli,
          sehir: data.sehir,
          personelSayisi: data.personelSayisi,
          firmaAdi: data.firmaAdi || '',
          yetkiliAd: data.yetkiliAd || '',
          email: data.email || '',
          telefon: data.telefon || '',
          maasAraligi: data.maasAraligi || '',
          baslangicTarihi: data.baslangicTarihi || '',
          aciklama: data.aciklama || '',
        },
      }),
    });

    console.log('Response status:', res.status);
    const responseData = await res.json();
    console.log('Response data:', responseData);

    if (!res.ok) {
      throw new Error(`Talep oluşturulamadı: ${res.status}`);
    }

    return responseData;
  } catch (error) {
    console.error('Personel talebi error:', error);
    throw error;
  }
}

// TÜM HİZMETLERİ GETİR
export async function getHizmetler() {
  const data = await fetchAPI('hizmets?populate=*&sort=sira:asc');
  return data.data.map((hizmet: any) => ({
    id: hizmet.id,
    baslik: hizmet.baslik,
    slug: hizmet.slug,
    aciklama: parseRichText(hizmet.aciklama),
    icon: hizmet.icon,
    image: hizmet.image?.url 
      ? `${STRAPI_URL}${hizmet.image.url}` 
      : null,
    sira: hizmet.sira,
    isActive: hizmet.isActive,
  }));
}

// TEK HİZMET GETİR (Slug ile)
export async function getHizmetBySlug(slug: string) {
  try {
    const hizmetler = await getHizmetler();
    const hizmet = hizmetler.find((h: any) => h.slug === slug);
    return hizmet || null;
  } catch (error) {
    console.error('getHizmetBySlug error:', error);
    return null;
  }
}

// ============================================
// AUTH FONKSİYONLARI (Giriş/Kayıt)
// ============================================

// KAYIT OL (Register)
export async function registerUser(data: {
  username: string;
  email: string;
  password: string;
  userType: 'is-arayan' | 'is-veren';
}) {
  try {
    console.log('Kayıt gönderiliyor:', data);
    
    // 1. Kullanıcıyı kaydet
    const registerRes = await fetch(`${STRAPI_URL}/api/auth/local/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: data.username,
        email: data.email,
        password: data.password,
      }),
    });

    const registerData = await registerRes.json();
    console.log('Kayıt yanıtı:', registerData);

    if (!registerRes.ok) {
      throw new Error(registerData.error?.message || 'Kayıt yapılamadı');
    }

    // 2. userType alanını güncelle
    const userId = registerData.user.id;
    const jwt = registerData.jwt;

    const updateRes = await fetch(`${STRAPI_URL}/api/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        userType: data.userType,
      }),
    });

    if (!updateRes.ok) {
      console.error('userType güncellenemedi:', await updateRes.json());
    }

    return registerData;
  } catch (error) {
    console.error('Register error:', error);
    throw error;
  }
}

// GİRİŞ YAP (Login)
export async function loginUser(data: {
  identifier: string; // email veya username
  password: string;
}) {
  try {
    console.log('Giriş yapılıyor:', data);
    
    const res = await fetch(`${STRAPI_URL}/api/auth/local`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        identifier: data.identifier,
        password: data.password,
      }),
    });

    const responseData = await res.json();
    console.log('Giriş yanıtı:', responseData);

    if (!res.ok) {
      throw new Error(responseData.error?.message || 'Giriş yapılamadı');
    }

    return responseData;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}

// PROFİL BİLGİSİ AL
export async function getUserProfile(jwt: string) {
  try {
    const res = await fetch(`${STRAPI_URL}/api/users/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error('Profil alınamadı');
    }

    return await res.json();
  } catch (error) {
    console.error('Profile error:', error);
    throw error;
  }
}

// KULLANICININ BAŞVURULARINI GETİR (email ile)
export async function getUserApplications(userEmail: string) {
  try {
    const params = new URLSearchParams();
    params.append('filters[email][$eq]', userEmail);
    params.append('populate[job][populate]', 'company');
    params.append('sort', 'createdAt:desc');

    const url = `${STRAPI_URL}/api/applications?${params.toString()}`;
    console.log('Başvurular çekiliyor:', url);

    const res = await fetch(url, {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Başvurular yüklenemedi');
    }

    const data = await res.json();
    console.log('Başvurular:', data);

    // Veriyi frontend formatına dönüştür
    const applications = (data.data || []).map((app: any) => ({
      id: app.id,
      documentId: app.documentId,
      adSoyad: app.adSoyad,
      email: app.email,
      telefon: app.telefon,
      mesaj: app.mesaj,
      durum: app.durum,
      createdAt: app.createdAt,
      job: app.job ? {
        id: app.job.id,
        documentId: app.job.documentId,
        baslik: app.job.title,
        slug: app.job.slug,
        konum: app.job.city,
        tur: app.job.positionType,
        firma: app.job.company ? {
          id: app.job.company.id,
          ad: app.job.company.name,
          slug: app.job.company.slug,
        } : null,
      } : null,
    }));

    return applications;
  } catch (error) {
    console.error('getUserApplications error:', error);
    return [];
  }
}

// İŞ VEREN DASHBOARD VERİLERİ (sadece published)
export async function getEmployerDashboardData(userEmail: string) {
  try {
    // 1. Firma bul
    const companyRes = await fetch(`${STRAPI_URL}/api/companies?filters[contactEmail][$eq]=${userEmail}`, { 
      cache: 'no-store' 
    });
    
    if (!companyRes.ok) throw new Error('Firma bulunamadı');
    const companyData = await companyRes.json();
    const company = companyData.data?.[0] || null;

    if (!company) {
      return { company: null, jobs: [], stats: { totalJobs: 0, activeJobs: 0, draftJobs: 0, totalApplications: 0, pendingApplications: 0, approvedApplications: 0 } };
    }

    const companyId = company.id;

    // 2. Sadece PUBLISHED ilanları çek (isActive filtresi YOK)
    const publishedRes = await fetch(
      `${STRAPI_URL}/api/jobs?filters[company][id]=${companyId}&filters[publishedAt][$notNull]=true&sort=createdAt:desc&populate=applications`, 
      { cache: 'no-store' }
    );
    const publishedData = publishedRes.ok ? await publishedRes.json() : { data: [] };
    const publishedJobs = publishedData.data || [];

    console.log('Published ilanlar:', publishedJobs.length);
    console.log('İlan detayları:', publishedJobs);

    // 3. İstatistikler
    let totalApplications = 0;
    let pendingApplications = 0;
    let approvedApplications = 0;

    publishedJobs.forEach((job: any) => {
      if (job.applications?.length > 0) {
        totalApplications += job.applications.length;
        pendingApplications += job.applications.filter((app: any) => app.durum === 'pending').length;
        approvedApplications += job.applications.filter((app: any) => app.durum === 'approved').length;
      }
    });

    return {
      company,
      jobs: publishedJobs, // Tüm ilanları döndür (filtreleme YOK)
      stats: {
        totalJobs: publishedJobs.length,
        activeJobs: publishedJobs.length,
        draftJobs: 0,
        totalApplications,
        pendingApplications,
        approvedApplications,
      },
    };
  } catch (error) {
    console.error('Dashboard error:', error);
    return { company: null, jobs: [], stats: { totalJobs: 0, activeJobs: 0, draftJobs: 0, totalApplications: 0, pendingApplications: 0, approvedApplications: 0 } };
  }
}

// FİRMA OLUŞTUR (Company) - JWT ile
export async function createCompany(data: {
  name: string;
  contactEmail: string;
  contactPhone?: string;
  website?: string;
  description?: string;
  jwt?: string;
}) {
  try {
    console.log('Firma oluşturuluyor:', data);
    
    const headers: any = {
      'Content-Type': 'application/json',
    };

    // JWT varsa ekle (authenticated istek)
    if (data.jwt) {
      headers['Authorization'] = `Bearer ${data.jwt}`;
    }

    const res = await fetch(`${STRAPI_URL}/api/companies`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        data: {
          name: data.name,
          contactEmail: data.contactEmail,
          contactPhone: data.contactPhone || '',
          website: data.website || '',
          description: data.description || '',
          isVerified: false,
        },
      }),
    });

    const responseData = await res.json();
    console.log('Firma yanıtı:', responseData);

    if (!res.ok) {
      throw new Error(responseData.error?.message || 'Firma oluşturulamadı');
    }

    return responseData.data;
  } catch (error) {
    console.error('Create company error:', error);
    throw error;
  }
}

// BAŞVURU DURUMUNU GÜNCELLE (Kabul/Red) - Strapi v5 documentId ile
export async function updateApplicationStatus(applicationDocumentId: string, durum: 'approved' | 'rejected', jwt: string) {
  try {
    console.log('Başvuru güncelleniyor:', { applicationDocumentId, durum });
    
    const res = await fetch(`${STRAPI_URL}/api/applications/${applicationDocumentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        data: { durum },
      }),
    });

    console.log('Response status:', res.status);

    if (!res.ok) {
      const errData = await res.json();
      console.error('API Error:', errData);
      throw new Error(errData.error?.message || `Durum güncellenemedi: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error('updateApplicationStatus error:', error);
    throw error;
  }
}

// İLANI SİL (DELETE) - Strapi v5 compatible
export async function deleteJob(jobIdentifier: string | number, jwt: string) {
  try {
    console.log('İlan siliniyor:', { jobIdentifier, type: typeof jobIdentifier });
    
    const url = `${STRAPI_URL}/api/jobs/${jobIdentifier}`;
    console.log('Request URL:', url);
    
    const res = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${jwt}`,
      },
    });

    console.log('Response status:', res.status);

    if (!res.ok) {
      const errData = await res.json();
      console.error('API Error:', errData);
      throw new Error(errData.error?.message || `İlan silinemedi: ${res.status}`);
    }

    return true;
  } catch (error) {
    console.error('deleteJob error:', error);
    throw error;
  }
}

// BAŞVURUYU GERİ ÇEK (Sil) - Strapi v5 documentId ile
export async function withdrawApplication(applicationDocumentId: string, jwt: string) {
  try {
    console.log('Başvuru geri çekiliyor:', { applicationDocumentId });
    
    const res = await fetch(`${STRAPI_URL}/api/applications/${applicationDocumentId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${jwt}`,
      },
    });

    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.error?.message || 'Başvuru geri çekilemedi');
    }

    return true;
  } catch (error) {
    console.error('withdrawApplication error:', error);
    throw error;
  }
}