"use client";

import React, { useState, useEffect } from 'react';
import { getSectors } from '@/lib/api';
import { 
  Building2, Factory, SprayCan, HardHat, Leaf, MoreHorizontal,
  Users, Clock, Shield, CheckCircle2, ArrowRight, MessageCircle,
  Phone, UserPlus, Briefcase, Send, ChevronDown, Search
} from 'lucide-react';

export default function SektorlerPage() {
  const [sektorler, setSektorler] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSektor, setActiveSektor] = useState('');
  const [gorunenSektor, setGorunenSektor] = useState(6);

  // Strapi'den sektörleri çek
  useEffect(() => {
    async function fetchSectors() {
      try {
        const sectors = await getSectors();
        setSektorler(sectors);
      } catch (error) {
        console.error('Sektörler yüklenemedi:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchSectors();
  }, []);

  // Filtreleme (baslik alanına göre)
  const filtrelenmisSektorler = activeSektor 
    ? sektorler.filter(s => s.baslik.toLowerCase().includes(activeSektor.toLowerCase()))
    : sektorler;

  // İlk 6 sektörü göster (butona tıklayınca hepsi)
  const gosterilecekSektorler = filtrelenmisSektorler.slice(0, gorunenSektor);

  // Varsayılan görsel (eğer Strapi'de görsel yoksa)
  const defaultImage = '/images/hero-team.jpg';

  return (
    <div>
      {/* HERO BÖLÜMÜ - Sol %30 Lacivert + Sağ %70 Görsel */}
      <section className="relative bg-ustablue text-white overflow-hidden pb-0">
        <div className="flex flex-col md:flex-row min-h-[500px] md:min-h-[600px]">
          
          {/* SOL %30 - Lacivert Arka Plan + Yazılar */}
          <div className="md:w-[30%] bg-ustablue px-8 md:px-12 py-16 md:py-24 flex flex-col justify-center relative z-10">
            <div className="space-y-6">
              <span className="text-ustaorange font-bold text-sm tracking-wider">SEKTÖRLER</span>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Sektörlere Özel <br />
                <span className="text-ustaorange">İnsan Kaynağı Çözümleri</span>
              </h1>
              <p className="text-base md:text-lg text-gray-200">
                Farklı sektörlerin dinamiklerini biliyor, ihtiyaçlarınıza uygun İK çözümleriyle iş gücünüzü güçlendiriyoruz.
              </p>
                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a 
                  href="/isverenler/detayli-talep"
                  className="bg-ustaorange px-6 py-3 rounded font-bold hover:bg-orange-600 transition flex items-center justify-center gap-2 shadow-lg text-sm"
                >
                  <UserPlus size={18} /> Teklif Alın
                </a>
                <a 
                  href="/hizmetlerimiz"
                  className="border-2 border-white px-6 py-3 rounded font-bold hover:bg-white hover:text-ustablue transition flex items-center justify-center gap-2 text-sm"
                >
                  <Briefcase size={18} /> Hizmetlerimizi İncele
                </a>
              </div>
            </div>
          </div>

          {/* SAĞ %70 - Görsel + Hafif Gradient */}
          <div className="md:w-[70%] relative">
            <img 
              src="/images/hero-team.jpg" 
              alt="Sektörlere Özel Çözümler" 
              className="w-full h-full min-h-[400px] md:min-h-[600px] object-cover"
            />
            <div className="absolute top-0 left-0 w-2/5 h-full bg-gradient-to-r from-ustablue/100 to-transparent"></div>
          </div>

        </div>
      </section>

      {/* SEKTÖRLERİMİZ */}
      <section className="py-16 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-ustablue mb-3">Sektörlerimiz</h2>
            <div className="w-16 h-1 bg-ustaorange mx-auto mb-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Uzmanlaştığımız sektörlerde, deneyimli ve nitelikli personel desteği sağlıyoruz.
            </p>
          </div>

          {/* Arama ve Filtreleme */}
          <div className="max-w-xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="text"
                placeholder="Sektör ara..."
                value={activeSektor}
                onChange={(e) => setActiveSektor(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-ustaorange"
              />
            </div>
          </div>

          {/* Sektör Kartları */}
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Sektörler yükleniyor...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gosterilecekSektorler.map((sektor) => (
                <div key={sektor.id} className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden hover:shadow-2xl transition group">
                  
                  {/* Görsel */}
                  <div className="relative h-48 overflow-hidden bg-gray-100">
                    <img 
                      src={sektor.image || defaultImage} 
                      alt={sektor.baslik} 
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-ustaorange text-white p-2 rounded-full">
                      <Building2 size={20} />
                    </div>
                  </div>

                  {/* İçerik */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-ustablue mb-3">{sektor.baslik}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed mb-4">
                      {sektor.aciklama}
                    </p>

                    {/* Butonlar */}
                    <div className="flex gap-2">
                      <a 
                        href={`/sektorler/${sektor.slug}`}
                        className="flex-1 border border-ustablue text-ustablue px-4 py-2 rounded font-bold text-xs hover:bg-ustablue hover:text-white transition flex items-center justify-center gap-1"
                      >
                        Detayları İncele <ArrowRight size={12} />
                      </a>

                      <a 
                        href="/isverenler"
                        className="bg-ustaorange text-white px-4 py-2 rounded font-bold text-xs hover:bg-orange-600 transition flex items-center justify-center gap-1"
                      >
                        Talep Oluştur <Send size={12} />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tüm Sektörleri Gör Butonu */}
          {filtrelenmisSektorler.length > 6 && (
            <div className="text-center mt-10">
              {gorunenSektor === 6 ? (
                <button 
                  onClick={() => setGorunenSektor(filtrelenmisSektorler.length)}
                  className="border-2 border-ustablue text-ustablue px-8 py-3 rounded font-bold hover:bg-ustablue hover:text-white transition inline-flex items-center gap-2"
                >
                  Tüm Sektörleri Gör <ChevronDown size={16} />
                </button>
              ) : (
                <button 
                  onClick={() => setGorunenSektor(6)}
                  className="border-2 border-ustablue text-ustablue px-8 py-3 rounded font-bold hover:bg-ustablue hover:text-white transition inline-flex items-center gap-2"
                >
                  Daha Az Göster <ChevronDown size={16} className="rotate-180" />
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* 5 ÖZELLİK KARTI */}
      <section className="py-12 px-6 md:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-6">
          {[
            { icon: Shield, title: 'Güvenilir Personel', desc: 'Referanslı ve deneyimli personellerle çalışıyoruz.' },
            { icon: Clock, title: 'Hızlı Temin', desc: 'İhtiyacınıza uygun personeli en kısa sürede sağlıyoruz.' },
            { icon: Users, title: 'Esnek Çözümler', desc: 'Kısa ve uzun dönemli esnek çalışma modelleri sunuyoruz.' },
            { icon: CheckCircle2, title: 'Yasal ve Güvenli', desc: 'Tüm süreçlerimiz yasal mevzuata uygundur.' },
            { icon: MessageCircle, title: 'Sürekli Destek', desc: 'İşe alım öncesi ve sonrası destek ekibimizle yanınızdayız.' },
          ].map((item, i) => (
            <div key={i} className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-ustablue rounded-full flex items-center justify-center text-white">
                <item.icon size={28} />
              </div>
              <h3 className="font-bold text-ustablue mb-2 text-sm">{item.title}</h3>
              <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
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
              href="/isverenler/detayli-talep"
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