"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, Building2, Users, CheckCircle2, Briefcase,
  MapPin, Clock, Banknote, Zap, Send, X, User, Mail, Phone,
  MessageSquare, Target, TrendingUp, Award
} from 'lucide-react';
import { createApplication } from '@/lib/api';

export default function SectorDetailClient({ sector }: { sector: any }) {
  const router = useRouter();
  const [basvuruModalAcik, setBasvuruModalAcik] = useState(false);
  const [seciliIlanId, setSeciliIlanId] = useState<number | null>(null);
  const [basvuruForm, setBasvuruForm] = useState({
    adSoyad: '',
    email: '',
    telefon: '',
    mesaj: '',
  });
  const [basvuruYukleniyor, setBasvuruYukleniyor] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Üst Kısım - Geri Dön Butonu */}
      <div className="bg-ustablue text-white py-6">
        <div className="max-w-7xl mx-auto px-6">
          <a 
            href="/sektorler"
            className="flex items-center gap-2 text-white hover:text-ustaorange transition"
          >
            <ArrowLeft size={20} /> Tüm Sektörlere Dön
          </a>
        </div>
      </div>

      {/* Hero Bölümü */}
      <section className="bg-ustablue text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-ustaorange rounded-full flex items-center justify-center">
              <Building2 size={32} className="text-white" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold">{sector.baslik}</h1>
              <p className="text-gray-300 mt-2">Profesyonel personel çözümleri</p>
            </div>
          </div>
        </div>
      </section>

      {/* Ana İçerik */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Sol: Sektör Detayları */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Açıklama */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-ustablue mb-4 flex items-center gap-2">
                <Target size={24} className="text-ustaorange" /> Sektör Hakkında
              </h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                {sector.aciklama}
              </p>
            </div>

            {/* Bu Sektördeki İlanlar */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-ustablue mb-6 flex items-center gap-2">
                <Briefcase size={24} className="text-ustaorange" /> 
                Güncel İş İlanları ({sector.ilanlar?.length || 0})
              </h2>

              {sector.ilanlar && sector.ilanlar.length > 0 ? (
                <div className="space-y-4">
                  {sector.ilanlar.map((ilan: any) => (
                    <div key={ilan.id} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-bold text-lg text-ustablue">{ilan.baslik}</h3>
                          <p className="text-sm text-ustaorange font-medium">{ilan.firma?.ad}</p>
                        </div>
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Building2 size={20} className="text-ustablue" />
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3 mb-4 text-xs text-gray-600">
                        <span className="flex items-center gap-1">
                          <MapPin size={12} /> {ilan.konum}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={12} /> {ilan.tur}
                        </span>
                        {ilan.maas && (
                          <span className="flex items-center gap-1">
                            <Banknote size={12} /> {ilan.maas}
                          </span>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <a 
                          href={`/is-arayanlar/${ilan.slug}`}
                          className="flex-1 border border-ustablue text-ustablue px-4 py-2 rounded font-bold text-xs hover:bg-ustablue hover:text-white transition flex items-center justify-center gap-1"
                        >
                          Detayları İncele
                        </a>
                        <button 
                          onClick={() => {
                            setSeciliIlanId(ilan.id);
                            setBasvuruModalAcik(true);
                          }}
                          className="bg-ustaorange text-white px-4 py-2 rounded font-bold text-xs hover:bg-orange-600 transition flex items-center gap-1"
                        >
                          <Zap size={12} /> Hızlı Başvur
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">Bu sektörde henüz aktif ilan bulunmuyor.</p>
                  <a 
                    href="/is-arayanlar"
                    className="text-ustaorange font-bold hover:underline"
                  >
                    Tüm İlanları Gör →
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Sağ: Talep Kartı */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 sticky top-24">
              <h3 className="text-xl font-bold text-ustablue mb-4">Bu Sektörde Personel mi Arıyorsunuz?</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <CheckCircle2 size={18} className="text-ustaorange" />
                  <span>Sektöre özel çözümler</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <CheckCircle2 size={18} className="text-ustaorange" />
                  <span>Deneyimli personel havuzu</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <CheckCircle2 size={18} className="text-ustaorange" />
                  <span>Hızlı ve güvenilir hizmet</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <CheckCircle2 size={18} className="text-ustaorange" />
                  <span>Rekabetçi fiyatlar</span>
                </div>
              </div>

              <a 
                href="/isverenler/detayli-talep"
                className="w-full bg-ustaorange text-white px-6 py-4 rounded-lg font-bold hover:bg-orange-600 transition flex items-center justify-center gap-2 shadow-lg"
              >
                <Send size={18} /> Personel Talebi Oluştur
              </a>

              <a 
                href="https://wa.me/905321234567"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full mt-3 border-2 border-green-500 text-green-600 px-6 py-3 rounded-lg font-bold hover:bg-green-50 transition flex items-center justify-center gap-2"
              >
                <MessageSquare size={18} /> WhatsApp ile Sor
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* BAŞVURU MODAL */}
      {basvuruModalAcik && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-8 relative">
            
            <button 
              onClick={() => setBasvuruModalAcik(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
            >
              <X size={24} />
            </button>

            <h3 className="text-2xl font-bold text-ustablue mb-2">Hızlı Başvuru</h3>
            <p className="text-sm text-gray-500 mb-6">{sector.baslik} sektöründeki ilan için başvurun.</p>

            <form onSubmit={async (e) => {
              e.preventDefault();
              if (!seciliIlanId) return;
              setBasvuruYukleniyor(true);
              try {
                await createApplication({
                  ...basvuruForm,
                  jobId: seciliIlanId,
                });
                alert('Başvurun başarıyla alındı!');
                setBasvuruModalAcik(false);
                setBasvuruForm({ adSoyad: '', email: '', telefon: '', mesaj: '' });
              } catch (error) {
                alert('Başvuru sırasında bir hata oluştu.');
              } finally {
                setBasvuruYukleniyor(false);
              }
            }} className="space-y-4">
              
              <input 
                type="text" 
                placeholder="Adınız Soyadınız" 
                required
                value={basvuruForm.adSoyad}
                onChange={(e) => setBasvuruForm({...basvuruForm, adSoyad: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-ustaorange" 
              />
              <input 
                type="email" 
                placeholder="E-posta Adresiniz" 
                required
                value={basvuruForm.email}
                onChange={(e) => setBasvuruForm({...basvuruForm, email: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-ustaorange" 
              />
              <input 
                type="tel" 
                placeholder="Telefon Numaranız" 
                required
                value={basvuruForm.telefon}
                onChange={(e) => setBasvuruForm({...basvuruForm, telefon: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-ustaorange" 
              />
              <textarea 
                placeholder="Kendini kısaca tanıt (Opsiyonel)" 
                rows={3}
                value={basvuruForm.mesaj}
                onChange={(e) => setBasvuruForm({...basvuruForm, mesaj: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-ustaorange resize-none" 
              ></textarea>

              <button 
                type="submit" 
                disabled={basvuruYukleniyor}
                className="w-full bg-ustaorange text-white px-6 py-4 rounded-lg font-bold hover:bg-orange-600 transition flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
              >
                {basvuruYukleniyor ? 'Gönderiliyor...' : 'Başvuruyu Gönder'} <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}