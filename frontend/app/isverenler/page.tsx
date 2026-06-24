"use client";

import { createPersonelTalebi } from '@/lib/api';
import React, { useState } from 'react';
import { 
  Users, Clock, Shield, Headphones, UserPlus, Briefcase, 
  FileCheck, BookOpen, Scale, Building2, CheckCircle2, 
  Phone, MessageCircle, ArrowRight, Send, ClipboardList, 
  UserSearch, Handshake, FileText, Zap, ChevronDown, 
  Award, TrendingUp, BadgeCheck, MapPin, User
} from 'lucide-react';

export default function IsverenlerPage() {
  const [formData, setFormData] = useState({
    pozisyon: '',
    sektor: '',
    calismaSekli: '',
    sehir: '',
    personelSayisi: '',
    kvkkOnay: false,
  });

  const sektorler = ['Et İşleme', 'Fabrika', 'Temizlik', 'İnşaat', 'Sera ve Tarım'];
  const calismaSekilleri = ['Tam Zamanlı', 'Yarı Zamanlı', 'Vardiyalı', 'Mevsimlik', 'Proje Bazlı'];
  const sehirler = ['İstanbul', 'Kocaeli', 'Bursa', 'Ankara', 'İzmir', 'Adana', 'Antalya'];

  const hizmetler = [
    { 
      icon: Users, 
      title: 'Personel Temini', 
      desc: 'İhtiyacınıza uygun geçici veya sürekli personel desteği sağlıyoruz.',
      color: 'bg-ustaorange'
    },
    { 
      icon: UserPlus, 
      title: 'Toplu İşe Alım', 
      desc: 'Yüksek adetli personel ihtiyaçlarınızda hızlı ve planlı çözümler sunuyoruz.',
      color: 'bg-ustablue'
    },
    { 
      icon: FileCheck, 
      title: 'İK Danışmanlığı', 
      desc: 'İşe alım süreçlerinizi yönetir, İK operasyonlarınızı profesyonelce destekliyoruz.',
      color: 'bg-ustaorange'
    },
    { 
      icon: BookOpen, 
      title: 'Eğitim ve Yönlendirme', 
      desc: 'Adayların işe adaptasyonu için eğitim ve yönlendirme hizmetleri sunuyoruz.',
      color: 'bg-ustablue'
    },
    { 
      icon: Scale, 
      title: 'Yasal ve İdari Destek', 
      desc: 'Tüm yasal yükümlülüklerde ve süreç yönetiminde yanınızdayız.',
      color: 'bg-ustaorange'
    },
  ];

  const istatistikler = [
    { icon: Users, value: '50.000+', label: 'Aday Havuzu', sub: 'Geniş ve sürekli güncellenen aday ağı.' },
    { icon: Building2, value: '200+', label: 'Kurumsal Firma', sub: 'Farklı sektörlerden çözüm ortağı firmalar.' },
    { icon: Clock, value: '24 Saat', label: 'Hızlı Geri Dönüş', sub: 'Taleplerinize en kısa sürede dönüş sağlarız.' },
    { icon: Award, value: '%98', label: 'Müşteri Memnuniyeti', sub: 'Uzun vadeli iş birlikleri ile güven oluşturuyoruz.' },
  ];

  const surecAdimlari = [
    { num: '01', icon: ClipboardList, title: 'Talebinizi Oluşturun', desc: 'Personel ihtiyacınızı form üzerinden iletin.' },
    { num: '02', icon: UserSearch, title: 'Adayları Belirleyelim', desc: 'İhtiyacınıza uygun adayları hızla belirleyelim.' },
    { num: '03', icon: Users, title: 'Sizinle Paylaşalım', desc: 'Uygun adayları size sunalım.' },
    { num: '04', icon: Handshake, title: 'Değerlendirme', desc: 'Görüşme ve değerlendirme sürecini birlikte yürütelim.' },
    { num: '05', icon: CheckCircle2, title: 'İşe Başlangıç', desc: 'Uygun aday işe başlasın, siz işinize odaklanın.' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.kvkkOnay) {
      alert('Lütfen KVKK açık rıza metnini onaylayın.');
      return;
    }
    
    try {
      await createPersonelTalebi(formData);
      alert('Personel talebiniz alınmıştır! En kısa sürede size dönüş yapacağız.');
      setFormData({
        pozisyon: '',
        sektor: '',
        calismaSekli: '',
        sehir: '',
        personelSayisi: '',
        kvkkOnay: false,
      });
    } catch (error) {
      alert('Talep oluşturulamadı. Lütfen tekrar deneyin.');
    }
  };

  return (
    <div>
      {/* HERO BÖLÜMÜ */}
      <section className="relative bg-ustablue text-white overflow-hidden pb-16 md:pb-0">
        <div className="flex flex-col md:flex-row min-h-[500px] md:min-h-[600px]">
          
          {/* SOL %30 */}
          <div className="md:w-[30%] bg-ustablue px-8 md:px-12 py-16 md:py-24 flex flex-col justify-center relative z-10">
            <div className="space-y-6">
              <span className="text-ustaorange font-bold text-sm tracking-wider">İŞVERENLER İÇİN</span>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Doğru İnsan, <br />
                <span className="text-ustaorange">Güçlü İşletme!</span>
              </h1>
              <p className="text-base md:text-lg text-gray-200 leading-relaxed">
                İhtiyacınız olan nitelikli iş gücüne hızlı ve güvenilir şekilde ulaşın. Usta Jobs, işe alım süreçlerinizi kolaylaştırır, siz işinize odaklanın.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a 
                  href="/isverenler/detayli-talep"
                  className="bg-ustaorange px-6 py-3 rounded font-bold hover:bg-orange-600 transition flex items-center justify-center gap-2 shadow-lg text-sm"
                >
                  <UserPlus size={18} /> Detaylı Talep Oluştur
                </a>
                                <a 
                  href="/hizmetlerimiz"
                  className="border-2 border-white px-6 py-3 rounded font-bold hover:bg-white hover:text-ustablue transition flex items-center justify-center gap-2 text-sm"
                >
                  <FileText size={18} /> Hizmetlerimizi İncele
                </a>
              </div>
            </div>
          </div>

          {/* SAĞ %70 */}
          <div className="md:w-[70%] relative">
            <img 
              src="/images/isverenler-hero.jpg" 
              alt="İşverenler İçin Çözümler" 
              className="w-full h-full min-h-[400px] md:min-h-[600px] object-cover"
            />
            <div className="absolute top-0 left-0 w-2/5 h-full bg-gradient-to-r from-ustablue/100 to-transparent"></div>
          </div>
        </div>

        {/* FLOATING HIZLI TALEP FORMU */}
        <div className="absolute top-8 right-8 hidden lg:block w-80 z-20">
          <div className="bg-white text-gray-800 rounded-lg shadow-2xl p-6">
            <h3 className="font-bold text-ustablue text-lg mb-1">Hızlı Talep Formu</h3>
            <p className="text-xs text-gray-500 mb-4">İhtiyacınız olan personel için bize hızlıca ulaşın.</p>
            
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input 
                  type="text" 
                  placeholder="Pozisyon / Meslek"
                  value={formData.pozisyon}
                  onChange={(e) => setFormData({...formData, pozisyon: e.target.value})}
                  className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded text-sm focus:outline-none focus:border-ustaorange"
                />
              </div>

              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <select 
                  value={formData.sektor}
                  onChange={(e) => setFormData({...formData, sektor: e.target.value})}
                  className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded text-sm focus:outline-none focus:border-ustaorange appearance-none bg-white"
                >
                  <option value="">Sektör Seçiniz</option>
                  {sektorler.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={14} />
              </div>

              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <select 
                  value={formData.calismaSekli}
                  onChange={(e) => setFormData({...formData, calismaSekli: e.target.value})}
                  className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded text-sm focus:outline-none focus:border-ustaorange appearance-none bg-white"
                >
                  <option value="">Çalışma Şekli</option>
                  {calismaSekilleri.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={14} />
              </div>

              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <select 
                  value={formData.sehir}
                  onChange={(e) => setFormData({...formData, sehir: e.target.value})}
                  className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded text-sm focus:outline-none focus:border-ustaorange appearance-none bg-white"
                >
                  <option value="">Şehir Seçiniz</option>
                  {sehirler.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={14} />
              </div>

              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input 
                  type="text" 
                  placeholder="Personel Sayısı"
                  value={formData.personelSayisi}
                  onChange={(e) => setFormData({...formData, personelSayisi: e.target.value})}
                  className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded text-sm focus:outline-none focus:border-ustaorange"
                />
              </div>

              {/* KVKK Onayı */}
              <div className="flex items-start gap-2">
                <input 
                  type="checkbox" 
                  id="kvkk-isveren"
                  required
                  checked={formData.kvkkOnay}
                  onChange={(e) => setFormData({...formData, kvkkOnay: e.target.checked})}
                  className="mt-0.5 w-4 h-4 accent-ustaorange"
                />
                <label htmlFor="kvkk-isveren" className="text-xs text-gray-600 leading-relaxed cursor-pointer">
                  <a href="/kvkk" target="_blank" className="text-ustaorange hover:underline font-bold">
                    KVKK Aydınlatma Metni
                  </a>
                  'ni okudum ve kişisel verilerimin işlenmesini kabul ediyorum.
                </label>
              </div>

              <button 
                type="submit"
                className="w-full bg-ustaorange text-white py-3 rounded font-bold hover:bg-orange-600 transition flex items-center justify-center gap-2 shadow-lg text-sm"
              >
                Talebimi Gönder <ArrowRight size={16} />
              </button>

              <a 
                href="/isverenler/detayli-talep"
                className="w-full block text-center border-2 border-ustablue text-ustablue py-2 rounded font-bold hover:bg-ustablue hover:text-white transition text-sm"
              >
                Detaylı Talep Oluştur
              </a>
            </form>
          </div>
        </div>
      </section>

      {/* MOBİLDE STICKY CTA */}
      <div className="lg:hidden sticky bottom-0 z-40 bg-white border-t border-gray-200 p-4 shadow-lg">
        <a 
          href="https://wa.me/905321234567" 
          className="w-full bg-ustaorange text-white py-3 rounded font-bold flex items-center justify-center gap-2"
        >
          <MessageCircle size={18} /> WhatsApp ile Hızlı Teklif Al
        </a>
      </div>

      {/* DETAYLI TALEP BUTONU */}
      <section className="py-12 px-6 md:px-12 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-ustablue mb-3">Detaylı Personel Talebi</h2>
          <p className="text-gray-600 mb-6">İhtiyacınızı detaylı paylaşın, size özel çözüm sunalım.</p>
          <a 
            href="/isverenler/detayli-talep"
            className="inline-flex items-center gap-2 bg-ustaorange text-white px-8 py-4 rounded-lg font-bold hover:bg-orange-600 transition shadow-lg"
          >
            <FileText size={20} /> Detaylı Talep Formuna Git <ArrowRight size={18} />
          </a>
        </div>
      </section>

      {/* 4 ÖZELLİK KARTI */}
      <section className="py-12 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { icon: Users, title: 'Nitelikli Aday Havuzu', desc: 'Geniş ve sürekli güncellenen aday havuzumuzdan hızlıca destek sağlarız.' },
            { icon: Clock, title: 'Hızlı ve Doğru Eşleşme', desc: 'İhtiyacınıza uygun adayları kısa sürede belirler, zaman kazandırırız.' },
            { icon: Shield, title: 'Güvenli ve Yasal Süreç', desc: 'Tüm süreçlerimiz yasal mevzuata uygun ve şeffaf şekilde yürütülür.' },
            { icon: Headphones, title: 'Sürekli Destek', desc: 'İşe alım öncesi ve sonrası tüm süreçlerde yanınızda olmaya devam ederiz.' },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-full bg-ustablue flex items-center justify-center text-white flex-shrink-0">
                <item.icon size={24} />
              </div>
              <div>
                <h3 className="font-bold text-ustablue mb-1 text-sm">{item.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* HİZMETLERİMİZ */}
      <section className="py-16 px-6 md:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-ustablue mb-3">Hizmetlerimiz</h2>
            <div className="w-16 h-1 bg-ustaorange mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {hizmetler.map((h, i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-lg transition group">
                <div className={`w-12 h-12 ${h.color} rounded-full flex items-center justify-center text-white mb-4`}>
                  <h.icon size={22} />
                </div>
                        <h3 className="font-bold text-ustablue mb-2 text-sm">{h.title}</h3>
                        <p className="text-xs text-gray-600 leading-relaxed">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEDEN USTA JOBS? */}
      <section className="py-16 px-6 md:px-12 bg-ustablue text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/4 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold mb-3">Neden Usta Jobs?</h2>
              <div className="w-16 h-1 bg-ustaorange mx-auto md:mx-0"></div>
            </div>

            <div className="md:w-3/4 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {istatistikler.map((item, i) => (
                <div key={i} className="text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                    <div className="w-10 h-10 border-2 border-ustaorange rounded-full flex items-center justify-center text-ustaorange">
                      <item.icon size={20} />
                    </div>
                    <span className="text-3xl md:text-4xl font-bold text-ustaorange">{item.value}</span>
                  </div>
                  <h3 className="font-bold text-sm mb-1">{item.label}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">{item.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SÜREÇ NASIL İŞLER? */}
      <section className="py-16 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-ustablue mb-3">Süreç Nasıl İşler?</h2>
            <div className="w-16 h-1 bg-ustaorange mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
            <div className="hidden md:block absolute top-8 left-[10%] right-[10%] h-0.5 bg-gray-200 z-0"></div>

            {surecAdimlari.map((adim, i) => (
              <div key={i} className="relative text-center z-10">
                <div className="w-16 h-16 mx-auto mb-4 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center text-ustablue relative">
                  <adim.icon size={24} />
                  <div className="absolute -top-2 -right-2 w-7 h-7 bg-ustaorange text-white rounded-full flex items-center justify-center text-xs font-bold">
                    {adim.num}
                  </div>
                </div>
                <h3 className="font-bold text-ustablue mb-1 text-sm">{adim.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{adim.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BÖLÜMÜ */}
      <section className="py-12 px-6 md:px-12 bg-ustablue text-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-2xl md:text-3xl font-bold mb-2">Doğru insanı bulmak için <br />hızlıca bizimle iletişime geçin.</h3>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <a 
              href="/isverenler/detayli-talep"
              className="bg-ustaorange px-8 py-4 rounded font-bold hover:bg-orange-600 transition flex items-center justify-center gap-2 shadow-lg whitespace-nowrap"
            >
              <UserPlus size={18} /> Detaylı Talep Oluştur
            </a>
            <a 
              href="https://wa.me/905321234567"
              className="border-2 border-white px-8 py-4 rounded font-bold hover:bg-white hover:text-ustablue transition flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <Phone size={18} /> İletişime Geç
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}