"use client";

import React, { useState } from 'react';
import { 
  ArrowLeft, Building2, CheckCircle2, Clock, Phone,
  UserPlus, Briefcase, Send, X, User, Mail, MessageSquare,
  FileText, Users, Handshake, Headphones, Shield
} from 'lucide-react';
import { createApplication } from '@/lib/api';

export default function HizmetDetayClient({ hizmet, ilgiliIlanlar }: { hizmet: any; ilgiliIlanlar: any[] }) {
  const [basvuruModalAcik, setBasvuruModalAcik] = useState(false);
  const [seciliIlanId, setSeciliIlanId] = useState<number | null>(null);
  const [basvuruForm, setBasvuruForm] = useState({
    adSoyad: '',
    email: '',
    telefon: '',
    mesaj: '',
    kvkkOnay: false,
  });
  const [basvuruYukleniyor, setBasvuruYukleniyor] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Üst Kısım - Geri Dön Butonu */}
      <div className="bg-ustablue text-white py-6">
        <div className="max-w-7xl mx-auto px-6">
          <a 
            href="/hizmetlerimiz"
            className="flex items-center gap-2 text-white hover:text-ustaorange transition"
          >
            <ArrowLeft size={20} /> Tüm Hizmetlere Dön
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
              <h1 className="text-4xl md:text-5xl font-bold">{hizmet.baslik}</h1>
              <p className="text-gray-300 mt-2">Profesyonel personel çözümleri</p>
            </div>
          </div>
        </div>
      </section>

      {/* Ana İçerik */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Sol: Hizmet Detayları */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Hizmet Açıklaması */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-ustablue mb-4 flex items-center gap-2">
                <FileText size={24} className="text-ustaorange" /> Hizmet Hakkında
              </h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                {hizmet.aciklama}
              </p>
            </div>

            {/* Hizmet Süreci */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-ustablue mb-6 flex items-center gap-2">
                <Clock size={24} className="text-ustaorange" /> Hizmet Sürecimiz
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {[
                  { icon: FileText, title: 'Talep', desc: 'İhtiyacınızı alıyoruz' },
                  { icon: Users, title: 'Tarama', desc: 'Aday havuzunu tarıyoruz' },
                  { icon: UserPlus, title: 'Paylaşım', desc: 'Adayları sunuyoruz' },
                  { icon: Handshake, title: 'Yerleştirme', desc: 'Personeli yerleştiriyoruz' },
                  { icon: Headphones, title: 'Destek', desc: 'Sürekli destek veriyoruz' },
                ].map((step, i) => (
                  <div key={i} className="text-center">
                    <div className="w-12 h-12 mx-auto mb-2 bg-ustablue rounded-full flex items-center justify-center text-white relative">
                      <step.icon size={20} />
                      <div className="absolute -bottom-1 -right-1 bg-ustaorange text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                        {i + 1}
                      </div>
                    </div>
                    <h4 className="font-bold text-ustablue text-xs mb-1">{step.title}</h4>
                    <p className="text-xs text-gray-600">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Neden Biz? */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-ustablue mb-4 flex items-center gap-2">
                <Shield size={24} className="text-ustaorange" /> Neden Usta Jobs?
              </h2>
              <div className="space-y-3">
                {[
                  'Geniş ve nitelikli aday havuzu',
                  'Hızlı, güvenilir ve esnek çözümler',
                  'Tüm yasal süreçlerde tam uyum',
                  'Sektörel uzman danışman desteği',
                  'Yerleştirme sonrası destek ve takip',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="text-ustaorange flex-shrink-0 mt-0.5" size={18} />
                    <span className="text-gray-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* İlgili İş İlanları */}
            {ilgiliIlanlar.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                <h2 className="text-2xl font-bold text-ustablue mb-6 flex items-center gap-2">
                  <Briefcase size={24} className="text-ustaorange" /> 
                  Bu Hizmetle İlgili İş İlanları
                </h2>
                <div className="space-y-4">
                  {ilgiliIlanlar.map((ilan) => (
                    <div key={ilan.id} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-bold text-lg text-ustablue">{ilan.baslik}</h3>
                          <p className="text-sm text-ustaorange font-medium">{ilan.firma?.ad}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <a 
                          href={`/is-arayanlar/${ilan.slug}`}
                          className="flex-1 border border-ustablue text-ustablue px-4 py-2 rounded font-bold text-xs hover:bg-ustablue hover:text-white transition text-center"
                        >
                          Detayları İncele
                        </a>
                        <button 
                          onClick={() => {
                            setSeciliIlanId(ilan.id);
                            setBasvuruModalAcik(true);
                          }}
                          className="bg-ustaorange text-white px-4 py-2 rounded font-bold text-xs hover:bg-orange-600 transition"
                        >
                          Hızlı Başvur
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sağ: Teklif Kartı */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 sticky top-24">
              <h3 className="text-xl font-bold text-ustablue mb-4">Bu Hizmet İçin Teklif Alın</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <CheckCircle2 size={18} className="text-ustaorange" />
                  <span>Ücretsiz danışmanlık</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <CheckCircle2 size={18} className="text-ustaorange" />
                  <span>Hızlı geri dönüş</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <CheckCircle2 size={18} className="text-ustaorange" />
                  <span>Özel çözümler</span>
                </div>
              </div>

              <a 
                href="/isverenler/detayli-talep"
                className="w-full bg-ustaorange text-white px-6 py-4 rounded-lg font-bold hover:bg-orange-600 transition flex items-center justify-center gap-2 shadow-lg"
              >
                <Send size={18} /> Teklif Alın
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
            <p className="text-sm text-gray-500 mb-6">İlan için başvurunuzu yapın.</p>

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
                setBasvuruForm({ adSoyad: '', email: '', telefon: '', mesaj: '', kvkkOnay: false });
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

              {/* KVKK Onayı */}
              <div className="flex items-start gap-2">
                <input 
                  type="checkbox" 
                  id="kvkk"
                  required
                  checked={basvuruForm.kvkkOnay}
                  onChange={(e) => setBasvuruForm({...basvuruForm, kvkkOnay: e.target.checked})}
                  className="mt-1"
                />
                <label htmlFor="kvkk" className="text-xs text-gray-600">
                  <a href="/kvkk" className="text-ustaorange hover:underline">KVKK Aydınlatma Metni</a>'ni okudum ve kişisel verilerimin işlenmesini kabul ediyorum.
                </label>
              </div>

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