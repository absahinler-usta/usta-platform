"use client";

import React, { useState, useEffect } from 'react';
import { getHizmetler } from '@/lib/api';
import { 
  Building2, Users, CheckCircle2, ArrowRight, Phone,
  UserPlus, Briefcase, MessageCircle, Shield, Clock,
  TrendingUp, MapPin, Smile, FileText, Handshake,
  Headphones, ChevronRight
} from 'lucide-react';

export default function HizmetlerimizPage() {
  const [gorunenHizmet, setGorunenHizmet] = useState(6);
  const [hizmetler, setHizmetler] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHizmetler() {
      try {
        const data: any[] = await getHizmetler();
        setHizmetler(data.filter(h => h.isActive));
      } catch (error) {
        console.error('Hizmetler yüklenemedi:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchHizmetler();
  }, []);

  // İlk 6 hizmeti göster
  const gosterilecekHizmetler = hizmetler.slice(0, gorunenHizmet);

  // Slug'a göre özel görsel döndür
  const getHizmetImage = (slug: string) => {
    switch (slug) {
      case 'et-isleme-ve-ueretim':
        return '/images/hizmet-et-isleme.jpg';
      case 'fabrika-ve-bant-paketleme':
        return '/images/hizmet-fabrika.jpg';
      case 'temizlik':
        return '/images/hizmet-temizlik.jpg';
      case 'insaat':
        return '/images/hizmet-insaat.jpg';
      case 'sera-ve-tarim-isleri':
        return '/images/hizmet-sera.jpg';
      case 'diger-hizmetler':
        return '/images/hizmet-lojistik.jpg';
      default:
        return '/images/hizmetler-hero.jpg';
    }
  };

  return (
    <div>
      {/* HERO BÖLÜMÜ - Sol %30 Lacivert + Sağ %70 Görsel */}
<section className="relative bg-ustablue text-white overflow-hidden pb-0">
  <div className="flex flex-col md:flex-row min-h-[500px] md:min-h-[600px]">
    
    {/* SOL %30 - Lacivert Arka Plan + Yazılar */}
    <div className="md:w-[30%] bg-ustablue px-8 md:px-12 py-16 md:py-24 flex flex-col justify-center relative z-10">
      <div className="space-y-6">
        <span className="text-ustaorange font-bold text-sm tracking-wider">HİZMETLERİMİZ</span>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          İhtiyacınız olan personeli, en doğru şekilde <span className="text-ustaorange">sizlerle buluşturuyoruz.</span>
        </h1>
        <p className="text-base md:text-lg text-gray-200">
          Usta Jobs, iş süreçlerinizi kolaylaştıran insan kaynakları çözümleri ile fark yaratır. Doğru insanı, doğru zamanda, doğru yerde bulmanızı sağlar.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <a 
            href="/isverenler"
            className="bg-ustaorange px-6 py-3 rounded font-bold hover:bg-orange-600 transition flex items-center justify-center gap-2 shadow-lg text-sm"
          >
            <UserPlus size={18} /> Personel Talebi Oluştur
          </a>
          <a 
            href="https://wa.me/905321234567"
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-white px-6 py-3 rounded font-bold hover:bg-white hover:text-ustablue transition flex items-center justify-center gap-2 text-sm"
          >
            <Phone size={18} /> Hemen İletişime Geç
          </a>
        </div>
      </div>
    </div>

    {/* SAĞ %70 - Görsel + Hafif Gradient */}
    <div className="md:w-[70%] relative">
      <img 
        src="/images/hizmetler-hero.jpg" 
        alt="Usta Jobs Hizmetler" 
        className="w-full h-full min-h-[400px] md:min-h-[600px] object-cover"
      />
      <div className="absolute top-0 left-0 w-2/5 h-full bg-gradient-to-r from-ustablue/100 to-transparent"></div>
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-ustablue/100 to-transparent"></div>
      
      {/* Özellikler - Dokunmadık! */}
      <div className="absolute top-1/2 right-4 md:right-8 -translate-y-1/2 space-y-2 md:space-y-4 z-20 max-w-[260px] md:max-w-none">
        {[
          { icon: Clock, title: 'Hızlı Erişim', desc: 'İhtiyacınıza uygun personeli en kısa sürede buluruz.' },
          { icon: UserPlus, title: 'Doğru Aday', desc: 'Nitelikli ve deneyimli adaylarla tanışmanızı sağlarız.' },
          { icon: Shield, title: 'Güvenilir Süreç', desc: 'Yasal ve güvenilir süreç yönetimi sunarız.' },
          { icon: Headphones, title: 'Tam Destek', desc: 'Sürecin her adımında yanınızdayız.' },
        ].map((item, i) => (
          <div key={i} className="flex items-start gap-3 bg-white/10 backdrop-blur-sm p-4 rounded-lg">
            <item.icon className="text-ustaorange flex-shrink-0" size={24} />
            <div>
              <h3 className="font-bold text-sm">{item.title}</h3>
              <p className="text-xs text-gray-200">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>

  </div>
</section>

      {/* HİZMET ALANLARIMIZ */}
      <section className="py-16 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-ustablue mb-3">Hizmet Alanlarımız</h2>
            <div className="w-16 h-1 bg-ustaorange mx-auto mb-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Farklı sektörlerin ihtiyaçlarına özel insan kaynağı çözümleri sunuyoruz.
            </p>
          </div>

          {/* Hizmet Kartları */}
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Hizmetler yükleniyor...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {gosterilecekHizmetler.map((hizmet) => (
                <div key={hizmet.id} className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden hover:shadow-2xl transition group">
                  {/* Görsel */}
                  <div className="relative h-48 overflow-hidden bg-gray-100">
  <img 
    src={hizmet.image} 
    alt={hizmet.baslik} 
    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
  />
                    <div className="absolute top-4 right-4 bg-ustaorange text-white p-2 rounded-full">
                      <Building2 size={20} />
                    </div>
                  </div>

                  {/* İçerik */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-ustablue mb-3">{hizmet.baslik}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed mb-4">
                      {hizmet.aciklama}
                    </p>
                    <a 
  href={`/hizmetlerimiz/${hizmet.slug}`}
  className="inline-flex items-center gap-1 text-ustablue font-bold text-sm hover:text-ustaorange transition"
>
  Detaylı Bilgi <ArrowRight size={16} />
</a>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tüm Hizmetleri İncele Butonu - Dinamik */}
          {hizmetler.length > 6 && (
            <div className="text-center mt-10">
              {gorunenHizmet === 6 ? (
                <button 
                  onClick={() => setGorunenHizmet(hizmetler.length)}
                  className="border-2 border-ustablue text-ustablue px-8 py-3 rounded font-bold hover:bg-ustablue hover:text-white transition inline-flex items-center gap-2"
                >
                  Tüm Hizmetleri İncele <ArrowRight size={16} />
                </button>
              ) : (
                <button 
                  onClick={() => setGorunenHizmet(6)}
                  className="border-2 border-ustablue text-ustablue px-8 py-3 rounded font-bold hover:bg-ustablue hover:text-white transition inline-flex items-center gap-2"
                >
                  Daha Az Göster <ArrowRight size={16} className="rotate-180" />
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* İSTATİSTİKLER */}
      <section className="py-12 px-6 md:px-12 bg-ustablue text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[
              { icon: Briefcase, value: '10.000+', label: 'Aktif İşveren' },
              { icon: Users, value: '50.000+', label: 'Yerleştirilen Personel' },
              { icon: CheckCircle2, value: '200+', label: 'Uzman Danışman' },
              { icon: MapPin, value: '81', label: 'İl ve İlçede Hizmet' },
              { icon: Smile, value: '%97', label: 'Müşteri Memnuniyeti' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <stat.icon className="text-ustaorange mx-auto mb-3" size={32} />
                <div className="text-3xl md:text-4xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HİZMET SÜRECİMİZ */}
      <section className="py-16 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-ustablue mb-3">Hizmet Sürecimiz</h2>
            <div className="w-16 h-1 bg-ustaorange mx-auto mb-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              İhtiyacınızı en iyi şekilde anlamak ve en doğru adayı bulmak için izlediğimiz adımlar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {[
              { icon: FileText, title: 'Talebinizi Alıyoruz', desc: 'İhtiyacınızı ve pozisyon detaylarını bizimle paylaşıyorsunuz.' },
              { icon: Users, title: 'Aday Havuzunu Tarıyoruz', desc: 'Geniş aday havuzumuzdan size uygun adayları belirliyoruz.' },
              { icon: UserPlus, title: 'Adayları Sizinle Paylaşıyoruz', desc: 'Uygun adayları değerlendirmeniz için sizinle paylaşıyoruz.' },
              { icon: Handshake, title: 'Yerleştirme Yapıyoruz', desc: 'Onayınız sonrası hızlı ve güvenilir yerleştirme gerçekleştiriyoruz.' },
              { icon: Headphones, title: 'Destek Sunmaya Devam Ediyoruz', desc: 'Yerleştirme sonrası süreçte yanınızda olmaya devam ediyoruz.' },
            ].map((step, i) => (
              <div key={i} className="text-center relative">
                {/* Ok (son adım hariç) */}
                {i < 4 && (
                  <div className="hidden md:block absolute top-1/4 -right-3 z-10">
                    <ChevronRight className="text-ustaorange" size={24} />
                  </div>
                )}
                <div className="w-16 h-16 mx-auto mb-4 bg-ustablue rounded-full flex items-center justify-center text-white relative">
                  <step.icon size={28} />
                  <div className="absolute -bottom-1 -right-1 bg-ustaorange text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                    {i + 1}
                  </div>
                </div>
                <h3 className="font-bold text-ustablue mb-2 text-sm">{step.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEDEN USTA JOBS? */}
      <section className="py-16 px-6 md:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Sol: Avantajlar */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-ustablue mb-6">Neden Usta Jobs?</h2>
              <div className="space-y-4">
                {[
                  'Geniş ve nitelikli aday havuzu',
                  'Hızlı, güvenilir ve esnek çözümler',
                  'Tüm yasal süreçlerde tam uyum',
                  'Sektörel uzman danışman desteği',
                  'Yerleştirme sonrası destek ve takip',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="text-ustaorange flex-shrink-0 mt-0.5" size={20} />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sağ: CTA Kart */}
            <div className="bg-ustablue text-white rounded-2xl p-8 md:p-12 relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">İhtiyacınız olan personeli hemen bulalım!</h3>
                <p className="text-gray-300 mb-6">Size özel çözümlerimiz hakkında bilgi almak için bizimle iletişime geçin.</p>
                <a 
                  href="/isverenler"
                  className="bg-ustaorange px-6 py-3 rounded font-bold hover:bg-orange-600 transition inline-flex items-center gap-2 shadow-lg"
                >
                  <UserPlus size={18} /> Personel Talebi Oluştur
                </a>
              </div>
              
              {/* Görsel */}
              <div className="absolute bottom-0 right-0 w-1/2 h-1/2 opacity-10">
                <Users size={200} className="text-white" />
              </div>

              {/* Özellikler */}
              <div className="relative z-10 mt-8 space-y-3">
                {[
                  { icon: Headphones, title: '7/24 Destek', desc: 'Her zaman yanınızdayız.' },
                  { icon: Clock, title: 'Hızlı Geri Dönüş', desc: 'Talebinize en kısa sürede dönüş yapıyoruz.' },
                  { icon: Briefcase, title: 'Ücretsiz Danışmanlık', desc: 'İhtiyacınıza uygun çözümü birlikte belirliyoruz.' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <item.icon className="text-ustaorange flex-shrink-0" size={20} />
                    <div>
                      <h4 className="font-bold text-sm">{item.title}</h4>
                      <p className="text-xs text-gray-300">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* REFERANSLAR */}
      <section className="py-12 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-ustablue mb-2">Bizi Tercih Eden Markalar</h3>
            <div className="w-16 h-1 bg-ustaorange mx-auto"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6 items-center opacity-60">
            {['ÜLKER', 'Arçelik', 'FLO', 'Migros', 'LC Waikiki', 'B/S/H/', 'Doğuş', 'Yıldız Holding'].map((brand, i) => (
              <div key={i} className="flex items-center justify-center">
                <div className="text-ustablue font-bold text-lg">{brand}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BÖLÜMÜ */}
      <section className="py-12 px-6 md:px-12 bg-ustablue text-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 border-2 border-ustaorange rounded-full flex items-center justify-center text-ustaorange flex-shrink-0">
              <Users size={28} />
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-1">Sektörünüze Özel Çözümler için Hemen İletişime Geçin!</h3>
              <p className="text-gray-300 text-sm">İhtiyacınıza uygun insan kaynağı çözümlerimizle yanınızdayız.</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <a 
              href="/isverenler"
              className="bg-ustaorange px-6 py-3 rounded font-bold hover:bg-orange-600 transition flex items-center gap-2 shadow-lg whitespace-nowrap"
            >
              <UserPlus size={18} /> Teklif Alın
            </a>
            <a 
              href="https://wa.me/905321234567"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white px-6 py-3 rounded font-bold hover:bg-white hover:text-ustablue transition flex items-center gap-2 whitespace-nowrap"
            >
              <Phone size={18} /> İletişime Geç
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}