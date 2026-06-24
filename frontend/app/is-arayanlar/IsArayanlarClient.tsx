"use client";

import { getJobs, getSectors, createApplication, STRAPI_URL } from '@/lib/api';
import React, { useState, useEffect } from 'react';

import { 
  Search, Briefcase, FileText, MapPin, Clock, Building2,
  Shield, UserCheck, TrendingUp, Headphones,
  FileSearch, Send, X, Users, Handshake,
  ArrowRight, CheckCircle2, RotateCw, BadgeCheck,
  Banknote, Zap, ChevronDown, MessageCircle
} from 'lucide-react';

export default function IsArayanlarClient() {
  
  const [basvuruModalAcik, setBasvuruModalAcik] = useState(false);
  const [seciliIlanId, setSeciliIlanId] = useState<number | null>(null);
  const [basvuruForm, setBasvuruForm] = useState({
    adSoyad: '',
    email: '',
    telefon: '',
    mesaj: '',
  });
  const [basvuruYukleniyor, setBasvuruYukleniyor] = useState(false);
  const [pozisyon, setPozisyon] = useState('');
  const [sektor, setSektor] = useState('');
  const [sehir, setSehir] = useState('');

  const sehirler = ['Tümü', 'İstanbul', 'Kocaeli', 'Bursa', 'Ankara', 'İzmir', 'Adana'];
  
  const populerAramalar = ['Üretim Personeli', 'Temizlik', 'Depo Elemanı', 'Şoför', 'Garson', 'Bulaşıkçı'];

  const [gorunenIlan, setGorunenIlan] = useState(3);
  const [ilanlar, setIlanlar] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [sektorListesi, setSektorListesi] = useState<string[]>(['Tümü']);  
  const [userType, setUserType] = useState<string | null>(null);
  const [userAppliedJobs, setUserAppliedJobs] = useState<number[]>([]);
  const [user, setUser] = useState<any>(null);
    
  // Kullanıcı tipini localStorage'dan oku
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const type = localStorage.getItem('userType');
      setUserType(type);
    }
  }, []);

  // Strapi'den verileri çek (filtrelerle)
    useEffect(() => {
    // Kullanıcı başvurularını çek
    const fetchUserApplications = async () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        
        try {
          const appsRes = await fetch(`${STRAPI_URL}/api/applications?filters[email][$eq]=${userData.email}&populate=job`, {
            cache: 'no-store',
          });
          const appsData = await appsRes.json();
          const appliedJobIds = appsData.data.map((app: any) => app.job?.id).filter(Boolean);
          console.log('Başvurulan ilanlar:', appliedJobIds);
          setUserAppliedJobs(appliedJobIds);
        } catch (err) {
          console.error('Başvurular çekilemedi:', err);
        }
      }
    };
    
    fetchUserApplications();

    async function fetchData() {
      setLoading(true);
      try {
            // Kullanıcı bilgilerini al
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      
      // Kullanıcının başvurduğu ilanları çek
      fetch(`${STRAPI_URL}/api/applications?filters[email][$eq]=${userData.email}&populate=job`, {
        cache: 'no-store',
      })
        .then(res => res.json())
        .then(data => {
          const appliedJobIds = data.data.map((app: any) => app.job?.id).filter(Boolean);
          setUserAppliedJobs(appliedJobIds);
        })
        .catch(err => console.error('Başvurular çekilemedi:', err));
    }
        
        // Sektörleri Strapi'den çek
        const sectors = await getSectors();
        const sektorIsimleri = ['Tümü', ...sectors.map((s: any) => s.baslik)];
        setSektorListesi(sektorIsimleri);

        // Filtreleri hazırla
        const filters: any = {};

        if (pozisyon && pozisyon.trim() !== '') {
          filters.baslik = pozisyon;
        }

        if (sektor && sektor !== 'Tümü') {
          filters.sektor = sektor;
        }

        if (sehir && sehir !== 'Tümü') {
          filters.konum = sehir;
        }

        const jobs = await getJobs(filters);
        setIlanlar(jobs || []);
      } catch (error) {
        console.error('İlanlar yüklenemedi:', error);
        setIlanlar([]);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [pozisyon, sektor, sehir]);

  const aramaYap = () => {
    // Filtreler otomatik olarak çalışıyor, bu fonksiyon görsel amaçlı
  };

  return (
    <div>
      {/* HERO BÖLÜMÜ */}
      <section className="relative bg-ustablue text-white overflow-hidden">
        <div className="flex flex-col md:flex-row min-h-[500px] md:min-h-[600px]">
          
          {/* SOL %30 */}
          <div className="md:w-[30%] bg-ustablue px-8 md:px-12 py-16 md:py-24 flex flex-col justify-center relative z-10">
            <div className="space-y-6">
              <span className="text-ustaorange font-bold text-sm tracking-wider">İŞ ARAYANLAR İÇİN</span>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Doğru İşe, <br />
                <span className="text-ustaorange">Güvenle Başla!</span>
              </h1>
              <p className="text-base md:text-lg text-gray-200">
                Yeteneklerinize ve deneyiminize uygun iş fırsatlarına ulaşın. Usta Jobs ile kariyerinize güvenilir bir adım atın.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a href="#ilanlar" className="bg-ustaorange px-6 py-3 rounded font-bold hover:bg-orange-600 transition flex items-center justify-center gap-2 shadow-lg text-sm">
                  <Briefcase size={18} /> İlanlara Göz At
                </a>
                <a href="/iletisim" className="border-2 border-white px-6 py-3 rounded font-bold hover:bg-white hover:text-ustablue transition flex items-center justify-center gap-2 text-sm">
                  <FileText size={18} /> İletişime Geç
                </a>
              </div>
            </div>
          </div>

          {/* SAĞ %70 */}
          <div className="md:w-[70%] relative">
            <img 
              src="/images/is-arayanlar-hero.jpg" 
              alt="İş Arayanlar İçin Kariyer Fırsatları - Usta Jobs İş İlanları" 
              className="w-full h-full min-h-[400px] md:min-h-[600px] object-cover"
            />
            <div className="absolute top-0 left-0 w-2/5 h-full bg-gradient-to-r from-ustablue/100 to-transparent"></div>
          </div>

        </div>
      </section>

      {/* ARAMA FORMU */}
      <section className="relative z-30 -mt-16 px-4 md:px-12 pb-8">
        <div className="max-w-[90%] mx-auto bg-white rounded-lg shadow-2xl p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            
            {/* Pozisyon */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Pozisyon, sektör veya anahtar kelime"
                value={pozisyon}
                onChange={(e) => setPozisyon(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-ustaorange"
              />
            </div>

                        {/* Sektör */}
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <select 
                value={sektor}
                onChange={(e) => setSektor(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-ustaorange appearance-none bg-white"
              >
                {sektorListesi.map((s) => (
                  <option key={s} value={s === 'Tümü' ? '' : s}>{s === '' ? 'Sektör Seçiniz' : s}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
            </div>

            {/* Şehir */}
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <select 
                value={sehir}
                onChange={(e) => setSehir(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-ustaorange appearance-none bg-white"
              >
                {sehirler.map((s) => (
                  <option key={s} value={s === 'Tümü' ? '' : s}>{s === '' ? 'Şehir Seçiniz' : s}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
            </div>

            {/* Ara Butonu */}
            <button 
              onClick={aramaYap}
              className="bg-ustaorange text-white px-6 py-3 rounded-lg font-bold hover:bg-orange-600 transition flex items-center justify-center gap-2 shadow-lg"
            >
              <Search size={18} /> İş Ara
            </button>
          </div>

          {/* Popüler Aramalar */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-xs text-gray-500 font-medium">Popüler:</span>
            {populerAramalar.map((arama) => (
              <button 
                key={arama}
                onClick={() => setPozisyon(arama)}
                className="text-xs px-3 py-1 border border-gray-300 rounded-full hover:border-ustaorange hover:text-ustaorange transition"
              >
                {arama}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 4 ÖZELLİK KARTI */}
      <section className="py-12 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { icon: Shield, title: 'Güvenilir İş Fırsatları', desc: 'Doğru ve güvenilir ilanlar tek bir platformda.' },
            { icon: UserCheck, title: 'Kolay Başvuru', desc: 'Hızlı ve kolay başvuru ile zamandan tasarruf edin.' },
            { icon: TrendingUp, title: 'Kariyerini Geliştir', desc: 'Kendini geliştirmen için ipuçları ve rehber içerikler.' },
            { icon: Headphones, title: 'Destek Merkezi', desc: 'Her adımda yanınızda olan destek ekibimizle iletişimde kalın.' },
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

      {/* GÜNCEL İŞ İLANLARI */}
      <section id="ilanlar" className="py-12 px-6 md:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-ustablue mb-2">Güncel İş İlanları</h2>
            <div className="w-16 h-1 bg-ustaorange mx-auto"></div>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Et işleme, fabrika, temizlik, inşaat, sera ve tarım sektörlerinde binlerce iş fırsatı sizi bekliyor.
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-500">İlanlar yükleniyor...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(ilanlar || []).slice(0, gorunenIlan).map((ilan) => (
                <div key={ilan.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-lg transition group">
                  
                  {/* Üst Kısım: İkon */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-ustablue">
                      <Building2 size={24} />
                    </div>
                  </div>

                  {/* Başlık + Firma */}
                  <h3 className="font-bold text-lg text-ustablue mb-1">{ilan.baslik}</h3>
                  <div className="flex items-center gap-1 mb-3">
                    <span className="text-sm text-ustaorange font-medium">{ilan.firma?.ad || 'Bilinmeyen Firma'}</span>
                    {ilan.firma?.dogrulanmis && (
                      <BadgeCheck size={14} className="text-ustaorange" />
                    )}
                  </div>

                  {/* Açıklama */}
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">{ilan.aciklama}</p>

                  {/* Bilgiler */}
                  <div className="flex flex-wrap gap-3 mb-4 text-xs text-gray-600">
                    <span className="flex items-center gap-1">
                      <MapPin size={12} /> {ilan.konum || 'Belirtilmemiş'}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} /> {ilan.tur || 'Belirtilmemiş'}
                    </span>
                    <span className="flex items-center gap-1">
                      <Building2 size={12} /> {ilan.sektor?.baslik || 'Belirtilmemiş'}
                    </span>
                  </div>

                  {/* Maaş */}
                  {ilan.maas && (
                    <div className="flex items-center gap-1 text-xs text-gray-700 font-medium mb-4 pb-4 border-b border-gray-100">
                      <Banknote size={12} className="text-ustaorange" />
                      <span>{ilan.maas}</span>
                    </div>
                  )}

                                    {/* Butonlar */}
                  <div className="flex gap-2">
                    <a 
                      href={`/is-arayanlar/${ilan.slug}`}
                      className={`${userType === 'is-veren' ? 'w-full' : 'flex-1'} border border-ustablue text-ustablue px-4 py-2 rounded font-bold text-xs hover:bg-ustablue hover:text-white transition flex items-center justify-center gap-1`}
                    >
                      Detayları İncele <ArrowRight size={12} />
                    </a>
                    
                    {/* Hızlı Başvur - Sadece iş arayanlar görebilir */}
                    {userType !== 'is-veren' && (
                      userAppliedJobs.includes(ilan.id) ? (
                        <div className="bg-green-100 text-green-700 px-4 py-2 rounded font-bold text-xs text-center flex items-center justify-center gap-1">
                          <CheckCircle2 size={12} /> Başvuruldu
                        </div>
                      ) : (
                        <button 
                          onClick={() => {
                            setSeciliIlanId(ilan.id);
                            setBasvuruModalAcik(true);
                          }} 
                          className="bg-ustaorange text-white px-4 py-2 rounded font-bold text-xs hover:bg-orange-600 transition flex items-center gap-1"
                        >
                          <Zap size={12} /> Hızlı Başvur
                        </button>
                      )
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Daha Fazla İlan Yükle */}
          {gorunenIlan < (ilanlar || []).length && (
            <div className="text-center mt-8">
              <button 
                onClick={() => setGorunenIlan((ilanlar || []).length)}
                className="border-2 border-ustablue text-ustablue px-8 py-3 rounded font-bold hover:bg-ustablue hover:text-white transition inline-flex items-center gap-2"
              >
                Daha Fazla İlan Yükle <RotateCw size={16} />
              </button>
            </div>
          )}

          {(ilanlar || []).length === 0 && !loading && (
            <div className="text-center py-12">
              <p className="text-gray-500">Aramanızla eşleşen ilan bulunamadı.</p>
            </div>
          )}
        </div>
      </section>

      {/* BAŞVURU SÜRECİ */}
      <section className="py-16 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-ustablue mb-3">Başvuru Süreci Nasıl İşler?</h2>
            <div className="w-16 h-1 bg-ustaorange mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { num: '01', icon: FileSearch, title: 'İlanı Seç', desc: 'Sana uygun iş ilanlarını incele ve detaylarını değerlendir.' },
              { num: '02', icon: Send, title: 'Başvurunu Yap', desc: 'Özgeçmişini hızlıca başvurunu yap ve bizimle paylaş.' },
              { num: '03', icon: Users, title: 'Görüşmeye Katıl', desc: 'Uygun pozisyonlar için sana en uygun görüşme planlanır.' },
              { num: '04', icon: Handshake, title: 'İşe Başla', desc: 'Güvenilir iş ortaklarımızla çalışmaya başlayarak kariyerini ilerlet.' },
            ].map((adim, i) => (
              <div key={i} className="relative bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-lg transition">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-ustaorange text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-lg">
                  {adim.num}
                </div>
                <div className="mt-4 mb-4 flex justify-center">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-ustablue">
                    <adim.icon size={28} />
                  </div>
                </div>
                <h3 className="font-bold text-ustablue mb-2">{adim.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{adim.desc}</p>
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
              <h3 className="text-2xl md:text-3xl font-bold mb-1">Kariyerine Usta Jobs ile Başla!</h3>
              <p className="text-gray-300 text-sm">Binlerce iş fırsatı arasından sana en uygun olanı bul.</p>
            </div>
          </div>
          <a href="#ilanlar" className="bg-ustaorange px-8 py-4 rounded font-bold hover:bg-orange-600 transition flex items-center gap-2 shadow-lg whitespace-nowrap">
            Hemen Başvur <ArrowRight size={18} />
          </a>
        </div>
      </section>

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
            <p className="text-sm text-gray-500 mb-6">Bilgilerini gir, hemen başvurunu yapalım.</p>

            <form onSubmit={async (e) => {
              e.preventDefault();
              if (!seciliIlanId) return;
              setBasvuruYukleniyor(true);
              try {
                await createApplication({
                  ...basvuruForm,
                  jobId: seciliIlanId,
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