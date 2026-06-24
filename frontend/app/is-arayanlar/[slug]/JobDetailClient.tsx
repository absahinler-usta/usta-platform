"use client";

import React, { useState } from 'react';
import { 
  MapPin, Clock, Building2, Banknote, Briefcase,
  ArrowLeft, CheckCircle2, Send, X, Zap,
  User, Mail, Phone, MessageSquare, FileText
} from 'lucide-react';
import { createApplication, STRAPI_URL } from '@/lib/api';
import Link from 'next/link';

export default function JobDetailClient({ job }: { job: any }) {  
    const [hasApplied, setHasApplied] = useState(false);
  const [userApplications, setUserApplications] = useState<any[]>([]);
  const [basvuruModalAcik, setBasvuruModalAcik] = useState(false);
  const [basvuruForm, setBasvuruForm] = useState({
    adSoyad: '',
    email: '',
    telefon: '',
    mesaj: '',
  });
  const [basvuruYukleniyor, setBasvuruYukleniyor] = useState(false);
  const [userType, setUserType] = useState<string | null>(null);

  // Kullanıcı tipini localStorage'dan oku
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const type = localStorage.getItem('userType');
      setUserType(type);
    }
  }, []);

    // Kullanıcının bu ilana daha önce başvurup başvurmadığını kontrol et
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        fetch(`${STRAPI_URL}/api/applications?filters[email][$eq]=${userData.email}&filters[job][id][$eq]=${job.id}`, {
          cache: 'no-store',
        })
          .then(res => res.json())
          .then(data => {
            if (data.data && data.data.length > 0) {
              setHasApplied(true);
            }
          })
          .catch(err => console.error('Başvuru kontrol hatası:', err));
      }
    }
  }, [job.id]);

  return (
    <div className="min-h-screen bg-gray-50">
            {/* Üst Kısım - Geri Dön Butonu */}
      <div className="bg-ustablue text-white py-6">
        <div className="max-w-7xl mx-auto px-6">
          <a 
            href={userType === 'is-veren' ? '/dashboard-is-veren/ilanlarim' : '/is-arayanlar'}
            className="flex items-center gap-2 text-white hover:text-ustaorange transition"
          >
            <ArrowLeft size={20} /> 
            {userType === 'is-veren' ? 'İlanlarıma Dön' : 'Tüm İlanlara Dön'}
          </a>
        </div>
      </div>

      {/* Ana İçerik */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Sol: İlan Detayları */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Başlık ve Firma */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-ustablue mb-2">{job.baslik}</h1>
                  <div className="flex items-center gap-2">
                    <Building2 size={18} className="text-ustaorange" />
                    <span className="text-lg text-ustaorange font-medium">{job.firma?.ad || 'Bilinmeyen Firma'}</span>
                    {job.firma?.dogrulanmis && (
                      <CheckCircle2 size={18} className="text-ustaorange" />
                    )}
                  </div>
                </div>
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Building2 size={32} className="text-ustablue" />
                </div>
              </div>

              {/* Temel Bilgiler */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-gray-200">
                <div className="flex items-center gap-3">
                  <MapPin size={20} className="text-ustaorange" />
                  <div>
                    <p className="text-xs text-gray-500">Konum</p>
                    <p className="text-sm font-medium text-ustablue">{job.konum || 'Belirtilmemiş'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={20} className="text-ustaorange" />
                  <div>
                    <p className="text-xs text-gray-500">Çalışma Şekli</p>
                    <p className="text-sm font-medium text-ustablue">{job.tur || 'Belirtilmemiş'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Banknote size={20} className="text-ustaorange" />
                  <div>
                    <p className="text-xs text-gray-500">Maaş</p>
                    <p className="text-sm font-medium text-ustablue">{job.maas || 'Belirtilmemiş'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* İş Tanımı */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-ustablue mb-4 flex items-center gap-2">
                <Briefcase size={24} /> İş Tanımı
              </h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                {job.aciklama || 'Açıklama bulunmuyor.'}
              </p>
            </div>

            {/* Aranan Nitelikler */}
            {job.gereksinimler && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                <h2 className="text-2xl font-bold text-ustablue mb-4 flex items-center gap-2">
                  <CheckCircle2 size={24} /> Aranan Nitelikler
                </h2>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                  {job.gereksinimler}
                </p>
              </div>
            )}
          </div>

                    {/* Sağ: Başvuru Kartı - İş verenler göremez */}
          {userType !== 'is-veren' && (
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 sticky top-24">
              <h3 className="text-xl font-bold text-ustablue mb-4">Hemen Başvur</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <CheckCircle2 size={18} className="text-ustaorange" />
                  <span>Hızlı başvuru formu</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <CheckCircle2 size={18} className="text-ustaorange" />
                  <span>2 dakika içinde tamamla</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <CheckCircle2 size={18} className="text-ustaorange" />
                  <span>Ücretsiz başvuru</span>
                </div>
              </div>

                              {hasApplied ? (
                <div className="text-center space-y-3">
                  <div className="w-full bg-green-100 text-green-700 px-6 py-4 rounded-lg font-bold">
                    <CheckCircle2 size={18} className="inline mr-2" />
                    Bu ilana zaten başvurdunuz
                  </div>
                  <Link 
                    href="/dashboard-is-arayan/basvurularim"
                    className="inline-flex items-center gap-2 text-ustablue font-bold hover:text-ustaorange transition"
                  >
                    <FileText size={16} /> Başvurularımı Görüntüle
                  </Link>
                </div>
              ) : (
                <button 
                  onClick={() => setBasvuruModalAcik(true)}
                  className="w-full bg-ustaorange text-white px-6 py-4 rounded-lg font-bold hover:bg-orange-600 transition flex items-center justify-center gap-2 shadow-lg"
                >
                  <Send size={18} /> Başvuru Yap
                </button>
              )}

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
          )}
        </div>
      </div>

      {/* BAŞVURU MODAL */}
      {basvuruModalAcik && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-8 relative">
            
            {/* Kapat Butonu */}
            <button 
              onClick={() => setBasvuruModalAcik(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
            >
              <X size={24} />
            </button>

            <h3 className="text-2xl font-bold text-ustablue mb-2">Hızlı Başvuru</h3>
            <p className="text-sm text-gray-500 mb-6">{job.baslik} pozisyonu için başvurun.</p>

            <form onSubmit={async (e) => {
              e.preventDefault();
              setBasvuruYukleniyor(true);
              try {
                await createApplication({
                  ...basvuruForm,
                  jobId: job.id,
                });
                alert('Başvurun başarıyla alındı! En kısa sürede seninle iletişime geçeceğiz.');
                setBasvuruModalAcik(false);
                setBasvuruForm({ adSoyad: '', email: '', telefon: '', mesaj: '' });
              } catch (error) {
                alert('Başvuru sırasında bir hata oluştu.');
              } finally {
                setBasvuruYukleniyor(false);
              }
            }} className="space-y-4">
              
              <div>
                <label className="block text-xs font-bold text-ustablue mb-1">Ad Soyad</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="text" 
                    placeholder="Adınız Soyadınız" 
                    required
                    value={basvuruForm.adSoyad}
                    onChange={(e) => setBasvuruForm({...basvuruForm, adSoyad: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-ustaorange" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-ustablue mb-1">E-posta</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="email" 
                    placeholder="E-posta Adresiniz" 
                    required
                    value={basvuruForm.email}
                    onChange={(e) => setBasvuruForm({...basvuruForm, email: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-ustaorange" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-ustablue mb-1">Telefon</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="tel" 
                    placeholder="Telefon Numaranız" 
                    required
                    value={basvuruForm.telefon}
                    onChange={(e) => setBasvuruForm({...basvuruForm, telefon: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-ustaorange" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-ustablue mb-1">Mesajınız (Opsiyonel)</label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 text-gray-400" size={18} />
                  <textarea 
                    placeholder="Kendini kısaca tanıt" 
                    rows={3}
                    value={basvuruForm.mesaj}
                    onChange={(e) => setBasvuruForm({...basvuruForm, mesaj: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-ustaorange resize-none" 
                  ></textarea>
                </div>
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