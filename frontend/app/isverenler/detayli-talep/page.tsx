"use client";

import { createPersonelTalebi } from '@/lib/api';
import React, { useState } from 'react';
import { 
  ArrowLeft, ArrowRight, Building2, User, Mail, Phone,
  Briefcase, MapPin, Users, CheckCircle2, FileText
} from 'lucide-react';

export default function DetayliTalepPage() {
  const [formData, setFormData] = useState({
    firmaAdi: '',
    yetkiliAd: '',
    email: '',
    telefon: '',
    pozisyon: '',
    sektor: '',
    calismaSekli: '',
    sehir: '',
    personelSayisi: '',
    maasAraligi: '',
    baslangicTarihi: '',
    aciklama: '',
    kvkkOnay: false,
  });

  const [gonderildi, setGonderildi] = useState(false);

  const sektorler = ['Et İşleme', 'Fabrika', 'Temizlik', 'İnşaat', 'Sera ve Tarım'];
  const calismaSekilleri = ['Tam Zamanlı', 'Yarı Zamanlı', 'Vardiyalı', 'Mevsimlik', 'Proje Bazlı'];
  const sehirler = ['İstanbul', 'Kocaeli', 'Bursa', 'Ankara', 'İzmir', 'Adana', 'Antalya'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.kvkkOnay) {
      alert('Lütfen KVKK açık rıza metnini onaylayın.');
      return;
    }
    
    try {
      await createPersonelTalebi(formData);
      setGonderildi(true);
      setTimeout(() => {
        window.location.href = '/isverenler';
      }, 3000);
    } catch (error) {
      alert('Talep oluşturulamadı. Lütfen tekrar deneyin.');
    }
  };

  if (gonderildi) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
        <div className="max-w-md bg-white rounded-xl shadow-lg p-8 text-center">
          <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-ustablue mb-2">Talebiniz Alındı!</h2>
          <p className="text-gray-600 mb-6">Detaylı talebiniz başarıyla iletildi. En kısa sürede size dönüş yapacağız.</p>
          <a 
            href="/isverenler"
            className="inline-flex items-center gap-2 bg-ustaorange text-white px-6 py-3 rounded font-bold hover:bg-orange-600 transition"
          >
            <ArrowLeft size={18} /> İşverenler Sayfasına Dön
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Üst Kısım */}
      <div className="bg-ustablue text-white py-6">
        <div className="max-w-4xl mx-auto px-6">
          <a 
            href="/isverenler"
            className="flex items-center gap-2 text-white hover:text-ustaorange transition"
          >
            <ArrowLeft size={20} /> İşverenler Sayfasına Dön
          </a>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-ustablue text-white py-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Detaylı Personel Talebi</h1>
          <p className="text-gray-300">İhtiyacınızı detaylı paylaşın, size özel çözüm sunalım.</p>
        </div>
      </section>

      {/* Form */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Firma Bilgileri */}
            <div>
              <h3 className="text-lg font-bold text-ustablue mb-4 flex items-center gap-2">
                <Building2 size={20} className="text-ustaorange" /> Firma Bilgileri
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input 
                    type="text" 
                    placeholder="Firma Adı *"
                    value={formData.firmaAdi}
                    onChange={(e) => setFormData({...formData, firmaAdi: e.target.value})}
                    className="w-full pl-9 pr-3 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-ustaorange"
                    required
                  />
                </div>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input 
                    type="text" 
                    placeholder="Yetkili Adı Soyadı *"
                    value={formData.yetkiliAd}
                    onChange={(e) => setFormData({...formData, yetkiliAd: e.target.value})}
                    className="w-full pl-9 pr-3 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-ustaorange"
                    required
                  />
                </div>
              </div>
            </div>

            {/* İletişim Bilgileri */}
            <div>
              <h3 className="text-lg font-bold text-ustablue mb-4 flex items-center gap-2">
                <Mail size={20} className="text-ustaorange" /> İletişim Bilgileri
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input 
                    type="email" 
                    placeholder="E-posta Adresi *"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full pl-9 pr-3 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-ustaorange"
                    required
                  />
                </div>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input 
                    type="tel" 
                    placeholder="Telefon Numarası *"
                    value={formData.telefon}
                    onChange={(e) => setFormData({...formData, telefon: e.target.value})}
                    className="w-full pl-9 pr-3 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-ustaorange"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Pozisyon Bilgileri */}
            <div>
              <h3 className="text-lg font-bold text-ustablue mb-4 flex items-center gap-2">
                <Briefcase size={20} className="text-ustaorange" /> Pozisyon Bilgileri
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input 
                    type="text" 
                    placeholder="Pozisyon / Meslek *"
                    value={formData.pozisyon}
                    onChange={(e) => setFormData({...formData, pozisyon: e.target.value})}
                    className="w-full pl-9 pr-3 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-ustaorange"
                    required
                  />
                </div>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <select 
                    value={formData.sektor}
                    onChange={(e) => setFormData({...formData, sektor: e.target.value})}
                    className="w-full pl-9 pr-3 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-ustaorange appearance-none bg-white"
                    required
                  >
                    <option value="">Sektör Seçiniz *</option>
                    {sektorler.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <select 
                    value={formData.calismaSekli}
                    onChange={(e) => setFormData({...formData, calismaSekli: e.target.value})}
                    className="w-full pl-9 pr-3 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-ustaorange appearance-none bg-white"
                    required
                  >
                    <option value="">Çalışma Şekli *</option>
                    {calismaSekilleri.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <select 
                    value={formData.sehir}
                    onChange={(e) => setFormData({...formData, sehir: e.target.value})}
                    className="w-full pl-9 pr-3 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-ustaorange appearance-none bg-white"
                    required
                  >
                    <option value="">Şehir Seçiniz *</option>
                    {sehirler.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input 
                    type="text" 
                    placeholder="Personel Sayısı *"
                    value={formData.personelSayisi}
                    onChange={(e) => setFormData({...formData, personelSayisi: e.target.value})}
                    className="w-full pl-9 pr-3 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-ustaorange"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Ek Bilgiler */}
            <div>
              <h3 className="text-lg font-bold text-ustablue mb-4 flex items-center gap-2">
                <FileText size={20} className="text-ustaorange" /> Ek Bilgiler (Opsiyonel)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  placeholder="Maaş Aralığı"
                  value={formData.maasAraligi}
                  onChange={(e) => setFormData({...formData, maasAraligi: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-ustaorange"
                />
                <input 
                  type="text" 
                  placeholder="İşe Başlangıç Tarihi"
                  value={formData.baslangicTarihi}
                  onChange={(e) => setFormData({...formData, baslangicTarihi: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-ustaorange"
                />
              </div>

              <textarea 
                placeholder="Detaylı Açıklama (İş tanımı, aranan özellikler vb.)"
                value={formData.aciklama}
                onChange={(e) => setFormData({...formData, aciklama: e.target.value})}
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-ustaorange resize-none mt-4"
              ></textarea>
            </div>

            {/* KVKK */}
            <div className="flex items-start gap-2">
              <input 
                type="checkbox" 
                id="kvkk-detayli"
                required
                checked={formData.kvkkOnay}
                onChange={(e) => setFormData({...formData, kvkkOnay: e.target.checked})}
                className="mt-1 w-4 h-4 accent-ustaorange"
              />
              <label htmlFor="kvkk-detayli" className="text-xs text-gray-600 leading-relaxed cursor-pointer">
                <a href="/kvkk" target="_blank" className="text-ustaorange hover:underline font-bold">KVKK Aydınlatma Metni</a>'ni okudum ve kişisel verilerimin işlenmesini kabul ediyorum.
              </label>
            </div>

            <button 
              type="submit"
              className="w-full bg-ustaorange text-white py-4 rounded-lg font-bold hover:bg-orange-600 transition flex items-center justify-center gap-2 shadow-lg"
            >
              Detaylı Talebi Gönder <ArrowRight size={18} />
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}