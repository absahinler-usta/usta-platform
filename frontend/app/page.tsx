import type { Metadata } from "next";
import React from 'react';
import { 
  Shield, Zap, Users, Clock, Handshake, 
  Eye, Target, CheckCircle2, Briefcase, 
  Building2, Factory, SprayCan, HardHat, Leaf,
  ArrowRight, UserPlus, TrendingUp
} from 'lucide-react';

export const metadata: Metadata = {
  title: "Usta Jobs - Profesyonel İş Gücü ve Personel Temini | İş İlanları",
  description: "Usta Jobs ile doğru iş gücünü bulun. Et işleme, fabrika, temizlik, inşaat, sera ve tarım sektörlerinde binlerce iş ilanı ve personel temini çözümleri. Hızlı, güvenilir, yasal.",
  keywords: [
    "iş ilanları",
    "personel temini",
    "insan kaynakları",
    "iş gücü yönetimi",
    "et işleme iş ilanları",
    "fabrika iş ilanları",
    "temizlik personeli",
    "inşaat işçileri",
    "sera iş ilanları",
    "tarım işçileri",
    "İstanbul iş ilanları",
    "Kocaeli iş ilanları",
    "Bursa iş ilanları",
    "Ankara iş ilanları",
    "İzmir iş ilanları",
  ],
  openGraph: {
    title: "Usta Jobs - Profesyonel İş Gücü ve Personel Temini",
    description: "Et işleme, fabrika, temizlik, inşaat, sera ve tarım sektörlerinde binlerce iş ilanı ve personel temini çözümleri.",
    images: [
      {
        url: "/images/usta-jobs-og-image.png",
        width: 1200,
        height: 630,
        alt: "Usta Jobs - Profesyonel İş Gücü ve Personel Temini",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Usta Jobs - Profesyonel İş Gücü ve Personel Temini",
    description: "Et işleme, fabrika, temizlik, inşaat, sera ve tarım sektörlerinde binlerce iş ilanı ve personel temini çözümleri.",
  },
};

export default function Home() {
  const sectors = [
    { icon: Building2, title: 'Et İşleme ve Üretim', desc: 'Et işleme, parçalama, üretim ve paketleme süreçlerinde deneyimli personel çözümleri.', img: '/images/sector-et.jpg', color: 'bg-ustaorange', slug: 'et-isleme-ve-uretim' },
    { icon: Factory, title: 'Fabrikalarda Bantta Paketleme ve Üretim', desc: 'Üretim hattı, paketleme, kalite kontrol ve montaj alanlarında yetkin iş gücü.', img: '/images/sector-fabrika.jpg', color: 'bg-ustablue', slug: 'fabrikalarda-bantta-paketleme-ve-uretim' },
    { icon: SprayCan, title: 'Temizlik', desc: 'Fabrika, ofis, AVM, hastane ve tüm yaşam alanları için profesyonel temizlik personeli.', img: '/images/sector-temizlik.jpg', color: 'bg-ustaorange', slug: 'temizlik' },
    { icon: HardHat, title: 'Her Türlü İnşaat', desc: 'İnşaat projelerinizde ihtiyaç duyulan kalifiye ve vasıfsız personel desteği.', img: '/images/sector-insaat.jpg', color: 'bg-ustablue', slug: 'her-turlu-insaat' },
    { icon: Leaf, title: 'Sera ve Tarım İşleri', desc: 'Sera, bahçe, hasat ve tarımsal üretim süreçlerinde deneyimli iş gücü sağlıyoruz.', img: '/images/sector-sera.jpg', color: 'bg-ustaorange', slug: 'sera-ve-tarim-isleri' },
  ];

  const whyUs = [
    { icon: Shield, title: 'Güvenilirlik', desc: 'Doğru analiz ve titiz aday değerlendirme süreci.' },
    { icon: Zap, title: 'Hızlı Çözümler', desc: 'İhtiyacınıza en uygun personeli en kısa sürede sunarız.' },
    { icon: Users, title: 'Uzman Ekip', desc: 'Alanında uzman ekibimiz her zaman yanınızda.' },
    { icon: CheckCircle2, title: 'Yasal ve Şeffaf', desc: 'Tüm süreçlerimiz yasal mevzuata uygun ve şeffaftır.' },
    { icon: TrendingUp, title: 'Verimlilik Artışı', desc: 'İş süreçlerinizi güçlendirir, verimliliğinizi artırırız.' },
    { icon: Handshake, title: 'Uzun Vadeli İş Birliği', desc: 'Sürdürülebilir ve güvene dayalı iş ortaklıkları kurarız.' },
  ];

  // WebSite Schema (JSON-LD)
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Usta Jobs",
    url: "https://ustajobs.be",
    description: "İşletmeler ile doğru iş gücünü buluşturan profesyonel insan kaynakları ve iş gücü yönetimi platformu.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://ustajobs.be/is-arayanlar?search={search_term_string}",
      },
      "query-input": "required name=search_term_string",
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
    ],
  };

  return (
    <div>
      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* HERO - Sol %30 Lacivert + Sağ %70 Görsel */}
      <section className="relative bg-ustablue text-white overflow-hidden">
        <div className="flex flex-col md:flex-row min-h-[500px] md:min-h-[600px]">
          
          {/* SOL %30 - Lacivert Arka Plan + Yazılar */}
          <div className="md:w-[30%] bg-ustablue px-8 md:px-12 py-16 md:py-24 flex flex-col justify-center relative z-10">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Doğru İnsan, <br />
                <span className="text-ustaorange">Doğru İşte!</span>
              </h1>
              <p className="text-base md:text-lg text-gray-200">
                Usta Jobs, işletmeler ile doğru iş gücünü buluşturan profesyonel insan kaynakları ve iş gücü yönetimi markasıdır.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a href="/isverenler/detayli-talep" className="bg-ustaorange px-6 py-3 rounded font-bold hover:bg-orange-600 transition flex items-center justify-center gap-2 shadow-lg text-sm">
                  <UserPlus size={18} /> İş Gücü Talebi Oluştur
                </a>
                <a href="/is-arayanlar" className="border-2 border-white px-6 py-3 rounded font-bold hover:bg-white hover:text-ustablue transition flex items-center justify-center gap-2 text-sm">
                  <Briefcase size={18} /> İş İlanlarına Göz At
                </a>
              </div>
            </div>
          </div>

          {/* SAĞ %70 - Görsel + Hafif Gradient */}
          <div className="md:w-[70%] relative">
            <img 
              src="/images/hero-team.jpg" 
              alt="Usta Jobs Profesyonel İnsan Kaynakları Ekibi - İş Gücü Yönetimi" 
              className="w-full h-full min-h-[400px] md:min-h-[600px] object-cover"
            />
            {/* Çok Hafif Gradient - Sadece sol kenarda lacivertle birleşsin */}
            <div className="absolute top-0 left-0 w-1/5 h-full bg-gradient-to-r from-ustablue/100 to-transparent"></div>
          </div>

        </div>
      </section>

      {/* BAR - Hero'dan Aşağı Taşan, Negatif Margin ile */}
      <section className="relative z-30 -mt-20">
        <div className="max-w-[95%] mx-auto bg-[#0a0f1e] rounded-lg py-10 px-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Shield, title: 'Hızlı ve Güvenilir', sub: 'Personel Çözümleri' },
            { icon: Users, title: 'Doğru Aday', sub: 'Doğru İşe Yönlendirme' },
            { icon: Clock, title: 'Zaman ve Maliyet', sub: 'Avantajı' },
            { icon: Handshake, title: 'Sürdürülebilir', sub: 'Uzun Vadeli İş Birlikleri' },
          ].map((item, i) => (
            <div key={i} className={`flex items-center gap-2 ${i < 3 ? 'md:border-r md:border-gray-700 md:pr-4' : ''}`}>
              <div className="w-10 h-10 rounded-full border-2 border-ustaorange flex items-center justify-center text-ustaorange flex-shrink-0">
                <item.icon size={16} />
              </div>
              <div>
                <h3 className="font-bold text-xs text-white leading-tight">{item.title}</h3>
                <p className="text-[16px] text-gray-400 leading-tight">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* USTA GROUP - Daha Fazla Üst Padding */}
      <section className="py-6 pt-10 px-6 md:px-12 bg-white border-b"></section>

      {/* USTA GROUP BAĞLANTISI */}
      <section className="py-6 px-6 md:px-12 bg-white border-b">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-4 text-center">
          <p className="text-gray-600 text-sm">Usta Jobs, <strong>Usta Group</strong>'un bir dalı ve parçasıdır.</p>
          <a 
            href="https://ustagroup.be/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:opacity-80 transition"
          >
            <img 
              src="/images/usta-group-logo.png" 
              alt="Usta Group - Usta Jobs Ana Şirketi" 
              className="h-30 w-auto"
            />
          </a>
        </div>
      </section>

      {/* HİZMET VERDİĞİMİZ ALANLAR */}
      <section className="py-16 px-6 md:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-ustablue mb-3">Hizmet Verdiğimiz Sektörler</h2>
            <div className="w-16 h-1 bg-ustaorange mx-auto"></div>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Et işleme, fabrika, temizlik, inşaat, sera ve tarım başta olmak üzere birçok sektörde profesyonel personel temini çözümleri sunuyoruz.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {sectors.map((s, i) => (
              <a key={i} href={`/sektorler/${s.slug}`} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition group block">
                <div className="relative h-48 overflow-hidden">
                  <img src={s.img} alt={`${s.title} İş İlanları - Usta Jobs Personel Temini`} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                  <div className={`absolute bottom-4 left-1/2 -translate-x-1/2 ${s.color} text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg`}>
                    <s.icon size={24} />
                  </div>
                </div>
                <div className="p-5 pt-8 text-center">
                  <h3 className="font-bold text-ustablue mb-2 text-sm leading-snug">{s.title}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">{s.desc}</p>
                </div>
              </a>
            ))}
          </div>

          <div className="text-center mt-10">
            <a href="/sektorler" className="border-2 border-ustablue text-ustablue px-8 py-3 rounded font-bold hover:bg-ustablue hover:text-white transition inline-flex items-center gap-2">
              Tüm Sektörleri İncele <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* NEDEN USTA JOBS */}
      <section className="py-16 px-6 md:px-12 bg-ustablue text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Neden Usta Jobs?</h2>
            <div className="w-16 h-1 bg-ustaorange mx-auto"></div>
            <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
              Profesyonel insan kaynakları çözümlerimizle işletmenizi bir adım öne taşıyoruz.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {whyUs.map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 border-2 border-gray-600 rounded-full flex items-center justify-center text-ustaorange">
                  <item.icon size={28} />
                </div>
                <h3 className="font-bold mb-2 text-sm">{item.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* İŞVERENLER / İŞ ARAYANLAR */}
      <section className="py-16 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* İşverenler */}
          <div className="bg-ustablue text-white rounded-lg overflow-hidden flex flex-col md:flex-row">
            <div className="md:w-1/2 p-8 flex flex-col justify-center">
              <h3 className="text-2xl font-bold mb-3">İşverenler İçin</h3>
              <p className="text-sm text-gray-300 mb-4">İhtiyacınız olan nitelikli iş gücüne hızlıca ulaşın. Operasyonel süreçlerinizi güçlendirin.</p>
              <ul className="space-y-2 mb-6 text-sm">
                {['İhtiyaca özel personel çözümleri', 'Hızlı aday yönlendirme', 'Esnek ve sürdürülebilir hizmet modelleri', 'Zaman ve maliyet avantajı'].map((t, i) => (
                  <li key={i} className="flex items-center gap-2"><CheckCircle2 size={16} className="text-ustaorange flex-shrink-0" /> {t}</li>
                ))}
              </ul>
              <a href="/isverenler/detayli-talep" className="bg-ustaorange px-6 py-3 rounded font-bold hover:bg-orange-600 transition inline-flex items-center gap-2 w-fit">
                <UserPlus size={16} /> Personel Talebi Oluştur
              </a>
            </div>
            <div className="md:w-1/2">
              <img src="/images/employer.jpg" alt="İşverenler İçin Personel Temini Çözümleri - Usta Jobs" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* İş Arayanlar */}
          <div className="bg-gray-50 rounded-lg overflow-hidden flex flex-col md:flex-row">
            <div className="md:w-1/2 p-8 flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-ustablue mb-3">İş Arayanlar İçin</h3>
              <p className="text-sm text-gray-600 mb-4">Yeteneklerinize uygun iş fırsatlarına ulaşın, geleceğinizi birlikte şekillendirelim.</p>
              <ul className="space-y-2 mb-6 text-sm text-gray-700">
                {['Binlerce güncel iş ilanı', 'Kolay ve hızlı başvuru', 'Doğru işe doğru adım', 'Kariyerinizde bir adım önde ol'].map((t, i) => (
                  <li key={i} className="flex items-center gap-2"><CheckCircle2 size={16} className="text-ustaorange flex-shrink-0" /> {t}</li>
                ))}
              </ul>
              <a href="/is-arayanlar" className="border-2 border-ustaorange text-ustaorange px-6 py-3 rounded font-bold hover:bg-ustaorange hover:text-white transition inline-flex items-center gap-2 w-fit">
                <Briefcase size={16} /> İlanlara Göz At
              </a>
            </div>
            <div className="md:w-1/2">
              <img src="/images/job-seeker.jpg" alt="İş Arayanlar İçin Kariyer Fırsatları - Usta Jobs İş İlanları" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* HAKKIMIZDA */}
      <section className="py-16 px-6 md:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-ustablue mb-3">Hakkımızda</h2>
            <div className="w-16 h-1 bg-ustaorange mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="w-14 h-14 bg-ustaorange rounded-full flex items-center justify-center text-white mb-4">
                <Users size={24} />
              </div>
              <h3 className="text-lg font-bold text-ustablue mb-3">HAKKIMIZDA</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Usta Jobs, işletmeler ile doğru iş gücünü buluşturan profesyonel bir insan kaynakları ve personel yönetimi markasıdır. Hızlı, güvenilir ve sürdürülebilir çözümlerle işverenlere ve çalışanlara değer katmaktadır.
              </p>
            </div>

            <div className="bg-ustablue text-white rounded-lg p-6 shadow-sm">
              <div className="w-14 h-14 border-2 border-ustaorange rounded-full flex items-center justify-center text-ustaorange mb-4">
                <Eye size={24} />
              </div>
              <h3 className="text-lg font-bold mb-3">VİZYONUMUZ</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                İş gücü yönetimi ve personel çözümleri alanında güvenilir, yenilikçi ve sürdürülebilir hizmet anlayışıyla Avrupa'nın önde gelen markalarından biri olmak.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="w-14 h-14 bg-ustaorange rounded-full flex items-center justify-center text-white mb-4">
                <Target size={24} />
              </div>
              <h3 className="text-lg font-bold text-ustablue mb-3">MİSYONUMUZ</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                İşletmelerin ihtiyaç duyduğu doğru iş gücünü hızlı, profesyonel ve güvenilir şekilde sağlayarak operasyonel süreçlerine değer katmak.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* REFERANSLAR */}
      <section className="py-12 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-xl font-bold text-ustablue mb-8">Güvenen Markalar, Büyüyen İş Ortaklıkları</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 items-center">
            {['USTA GROUP', 'USTA LOJİSTİK', 'USTA TARIM', 'USTA İNŞAAT', 'USTA GIDA'].map((m, i) => (
              <div key={i} className="flex items-center justify-center gap-2 opacity-70 hover:opacity-100 transition">
                <div className="bg-ustaorange text-white font-black text-xs w-6 h-6 flex items-center justify-center rounded">U</div>
                <span className="font-bold text-ustablue text-xs">{m}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}