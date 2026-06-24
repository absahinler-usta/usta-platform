"use client";

import React from 'react';
import { 
  Users, Shield, Zap, TrendingUp, Eye, Target,
  Award, Handshake, Scale, Heart, Leaf,
  Briefcase, UserPlus, ArrowRight
} from 'lucide-react';

export default function HakkimizdaPage() {
  const degerler = [
    { icon: Award, title: 'Profesyonellik', desc: 'Her işimizi profesyonel standartlarda yürütürüz.' },
    { icon: Handshake, title: 'Güven', desc: 'Güvene dayalı ilişkiler kurarız.' },
    { icon: Scale, title: 'Şeffaflık', desc: 'Açık ve dürüst iletişim benimseriz.' },
    { icon: Users, title: 'İnsan Odaklılık', desc: 'İnsan değerine her zaman öncelik veririz.' },
    { icon: Leaf, title: 'Sürdürülebilirlik', desc: 'Uzun vadeli değer yaratmayı hedefleriz.' },
  ];

  const istatistikler = [
    { icon: Users, value: '50.000+', label: 'Aday Havuzu', desc: 'Geniş ve güncel aday ağı.' },
    { icon: Briefcase, value: '200+', label: 'Kurumsal Firma', desc: 'Farklı sektörlerden çözüm ortağımız.' },
    { icon: Zap, value: '24 Saat', label: 'Hızlı Geri Dönüş', desc: 'Taleplerinize en kısa sürede dönüş sağlarız.' },
    { icon: Award, value: '%98', label: 'Müşteri Memnuniyeti', desc: 'Uzun vadeli iş birlikleri ile güven oluşturuyoruz.' },
    { icon: Users, value: '7/24', label: 'Destek', desc: 'İşlemlerinizde her zaman yanınızdayız.' },
  ];

  return (
    <div>
      {/* HERO BÖLÜMÜ - Sol %30 Lacivert + Sağ %70 Görsel */}
      <section className="relative bg-ustablue text-white overflow-hidden pb-0">
        <div className="flex flex-col md:flex-row min-h-[500px] md:min-h-[600px]">
          
          {/* SOL %30 - Lacivert Arka Plan + Yazılar */}
          <div className="md:w-[30%] bg-ustablue px-8 md:px-12 py-16 md:py-24 flex flex-col justify-center relative z-10">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Doğru İş, <br />
                <span className="text-ustaorange">Doğru İnsan</span>
              </h1>
              <p className="text-base md:text-lg text-gray-200">
                İşletmeler ile doğru iş gücünü buluşturarak, iş süreçlerini kolaylaştırıyor; güven, kalite ve sürdürülebilirlik odaklı çözümler sunuyoruz.
              </p>
                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a 
                  href="/is-arayanlar"
                  className="bg-ustaorange px-6 py-3 rounded font-bold hover:bg-orange-600 transition flex items-center justify-center gap-2 shadow-lg text-sm"
                >
                  <UserPlus size={18} /> İş Arayanlar İçin
                </a>
                <a 
                  href="/isverenler"
                  className="border-2 border-white px-6 py-3 rounded font-bold hover:bg-white hover:text-ustablue transition flex items-center justify-center gap-2 text-sm"
                >
                  <Briefcase size={18} /> İşverenler İçin
                </a>
              </div>
            </div>
          </div>

          {/* SAĞ %70 - Görsel + Hafif Gradient */}
          <div className="md:w-[70%] relative">
            <img 
              src="/images/hakkimizda-hero.jpg" 
              alt="Hakkımızda - Usta Jobs Ekibi" 
              className="w-full h-full min-h-[400px] md:min-h-[600px] object-cover"
            />
            <div className="absolute top-0 left-0 w-2/5 h-full bg-gradient-to-r from-ustablue/100 to-transparent"></div>
          </div>

        </div>
      </section>

      {/* HAKKIMIZDA + 4 ÖZELLİK */}
      <section className="py-16 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            
            {/* Sol: Hakkımızda Metni */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-ustaorange rounded-full flex items-center justify-center text-white">
                  <Users size={24} />
                </div>
                <h2 className="text-3xl font-bold text-ustablue">HAKKIMIZDA</h2>
              </div>
              <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
                <p>
                  Usta Jobs, işletmeler ile doğru iş gücünü buluşturan profesyonel bir insan kaynakları ve iş gücü yönetimi markasıdır.
                </p>
                <p>
                  Fabrika, üretim, lojistik, depo, horeca ve farklı sektörlerde faaliyet gösteren işletmelere hızlı, güvenilir ve sürdürülebilir personel çözümleri sunarak iş süreçlerini kolaylaştırmayı hedeflemekteyiz.
                </p>
                <p>
                  İşverenlerin ihtiyaç duyduğu uygun adayları doğru analiz ve planlama ile yönlendiren Usta Jobs; zaman kaybını azaltan, verimliliği artıran ve operasyonel süreçleri güçlendiren bir sistemle çalışmaktadır.
                </p>
                <p>
                  İş arayan bireyler için ise yeteneklerine ve deneyimlerine uygun iş fırsatlarına ulaşabilecekleri güvenilir bir platform sunmaktayız.
                </p>
                <p>
                  Profesyonellik, şeffaflık ve sürdürülebilir hizmet anlayışını merkezine alan Usta Jobs, hem çalışanlar hem işverenler için uzun vadeli ve güvene dayalı iş ilişkileri oluşturmayı amaçlamaktadır.
                </p>
              </div>
            </div>

            {/* Sağ: 4 Özellik */}
            <div className="space-y-6">
              {[
                { icon: Users, title: 'İnsan Odaklı Yaklaşım', desc: 'Her bireyin potansiyeline değer verir, doğru işi doğru insanla buluştururuz.' },
                { icon: Shield, title: 'Güven ve Şeffaflık', desc: 'Tüm süreçlerimizde açık iletişim ve güvene dayalı çalışma ilkesi benimseriz.' },
                { icon: Zap, title: 'Hızlı ve Etkin Çözümler', desc: 'İhtiyacınıza en kısa sürede, en doğru çözümleri sunmak için çalışıyoruz.' },
                { icon: TrendingUp, title: 'Sürdürülebilirlik', desc: 'Uzun vadeli iş birlikleri kurarak sürdürülebilir değer yaratıyoruz.' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-ustaorange rounded-full flex items-center justify-center text-white flex-shrink-0">
                    <item.icon size={22} />
                  </div>
                  <div>
                    <h3 className="font-bold text-ustablue mb-1">{item.title}</h3>
                    <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* VİZYON & MİSYON */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            
            {/* Vizyon */}
            <div className="bg-ustablue text-white rounded-lg p-8 relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 border-2 border-ustaorange rounded-full flex items-center justify-center text-ustaorange">
                    <Eye size={24} />
                  </div>
                  <h3 className="text-2xl font-bold">VİZYONUMUZ</h3>
                </div>
                <div className="space-y-3 text-sm text-gray-300 leading-relaxed">
                  <p>
                    Usta Jobs olarak vizyonumuz; iş gücü yönetimi ve personel çözümleri alanında güvenilir, yenilikçi ve sürdürülebilir hizmet anlayışıyla Avrupa'nın önde gelen markalarından biri olmaktır.
                  </p>
                  <p>
                    Teknolojiyi etkin kullanan, hızlı çözümler üreten ve işveren ile çalışan arasında güçlü bir köprü kuran yapımızla sektörde standartları belirleyen bir marka olmayı hedefliyoruz.
                  </p>
                </div>
              </div>
              {/* Arka Plan Deseni */}
              <div className="absolute bottom-0 left-0 right-0 h-24 opacity-10">
                <div className="w-full h-full bg-gradient-to-t from-white to-transparent"></div>
              </div>
            </div>

            {/* Misyon */}
            <div className="bg-gray-50 rounded-lg p-8 border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-ustaorange rounded-full flex items-center justify-center text-white">
                  <Target size={24} />
                </div>
                <h3 className="text-2xl font-bold text-ustablue">MİSYONUMUZ</h3>
              </div>
              <div className="space-y-3 text-sm text-gray-600 leading-relaxed">
                <p>
                  Usta Jobs'un misyonu; işletmelerin ihtiyaç duyduğu doğru iş gücünü hızlı, profesyonel ve güvenilir şekilde sağlayarak operasyonel süreçlerine değer katmaktır.
                </p>
                <p>
                  İş arayan bireylerin yeteneklerine uygun iş fırsatlarına erişmesini sağlarken; şeffaf, sürdürülebilir ve insan odaklı hizmet anlayışıyla hem çalışanlar hem işverenler için güçlü iş birlikleri oluşturmayı amaçlıyoruz.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* İSTATİSTİKLER BAR */}
      <section className="py-12 px-6 md:px-12 bg-ustablue text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {istatistikler.map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 border-2 border-ustaorange rounded-full flex items-center justify-center text-ustaorange">
                  <item.icon size={22} />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-ustaorange mb-1">{item.value}</div>
                <div className="text-sm font-bold mb-1">{item.label}</div>
                <p className="text-[10px] text-gray-400 leading-tight">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEĞERLERİMİZ */}
      <section className="py-16 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-ustablue mb-3">DEĞERLERİMİZ</h2>
            <div className="w-16 h-1 bg-ustaorange mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {degerler.map((deger, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-50 rounded-full flex items-center justify-center text-ustablue border-2 border-gray-200">
                  <deger.icon size={28} />
                </div>
                <h3 className="font-bold text-ustablue mb-2 text-sm">{deger.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{deger.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}