"use client";

import { sendContactMessage } from '@/lib/api';
import React, { useState } from 'react';
import { 
  MapPin, Phone, MessageCircle, Mail, Clock,
  Headphones, Shield, Target, Send, User,
  ChevronDown, ArrowRight, Headset, CheckCircle2
} from 'lucide-react';

export default function IletisimPage() {
  const [form, setForm] = useState({
    adSoyad: '',
    email: '',
    telefon: '',
    konu: '',
    mesaj: '',
    kvkkOnay: false,
  });
  const [gonderildi, setGonderildi] = useState(false);
  const [acikSss, setAcikSss] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.kvkkOnay) {
      alert('Lütfen KVKK aydınlatma metnini onaylayın.');
      return;
    }
    
    try {
      await sendContactMessage({
        adSoyad: form.adSoyad,
        email: form.email,
        telefon: form.telefon,
        konu: form.konu,
        mesaj: form.mesaj,
      });
      setGonderildi(true);
      setForm({
        adSoyad: '',
        email: '',
        telefon: '',
        konu: '',
        mesaj: '',
        kvkkOnay: false,
      });
      setTimeout(() => setGonderildi(false), 5000);
    } catch (error) {
      alert('Mesaj gönderilemedi. Lütfen tekrar deneyin.');
    }
  };

  const sss = [
    { soru: 'Hangi sektörlerde hizmet veriyorsunuz?', cevap: 'Et işleme, fabrika, temizlik, inşaat, sera ve tarım başta olmak üzere birçok sektörde personel çözümleri sunuyoruz.' },
    { soru: 'Personel temini süreci nasıl ilerliyor?', cevap: 'Talebinizi aldıktan sonra ihtiyaçlarınıza uygun adayları belirliyor, sizinle paylaşıyor ve değerlendirme sürecini birlikte yürütüyoruz.' },
    { soru: 'İlan oluşturmak veya başvuru yapmak ücretli mi?', cevap: 'İş arayanlar için tüm başvuru süreçleri tamamen ücretsizdir. İşverenler için detaylı bilgi almak üzere bizimle iletişime geçebilirsiniz.' },
    { soru: 'Çalışma saatleriniz nedir?', cevap: 'Hafta içi 09:00 - 18:00 saatleri arasında hizmet vermekteyiz. Cumartesi günü 10:00 - 14:00 arasında ulaşabilirsiniz.' },
  ];

  return (
    <div>
      {/* HERO BÖLÜMÜ - Sol %30 Lacivert + Sağ %70 Görsel */}
      <section className="relative bg-ustablue text-white overflow-hidden pb-0">
        <div className="flex flex-col md:flex-row min-h-[500px] md:min-h-[600px]">
          
          {/* SOL %30 - Lacivert Arka Plan + Yazılar */}
          <div className="md:w-[30%] bg-ustablue px-8 md:px-12 py-16 md:py-24 flex flex-col justify-center relative z-10">
            <div className="space-y-6">
              <span className="text-ustaorange font-bold text-sm tracking-wider">İLETİŞİM</span>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Bizimle <br />
                <span className="text-ustaorange">İletişime Geçin!</span>
              </h1>
              <p className="text-base md:text-lg text-gray-200">
                İş gücü çözümlerimiz hakkında bilgi almak, sorularınızı iletmek veya iş birliği fırsatları için bize ulaşabilirsiniz.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a 
                  href="https://wa.me/905321234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-ustaorange px-6 py-3 rounded font-bold hover:bg-orange-600 transition flex items-center justify-center gap-2 shadow-lg text-sm"
                >
                  <MessageCircle size={18} /> WhatsApp
                </a>
                <a 
                  href="tel:+902121234567"
                  className="border-2 border-white px-6 py-3 rounded font-bold hover:bg-white hover:text-ustablue transition flex items-center justify-center gap-2 text-sm"
                >
                  <Phone size={18} /> Hemen Ara
                </a>
              </div>
            </div>
          </div>

          {/* SAĞ %70 - Görsel + Hafif Gradient */}
          <div className="md:w-[70%] relative">
            <img 
              src="/images/iletisim-hero.jpg" 
              alt="İletişim - Usta Jobs" 
              className="w-full h-full min-h-[400px] md:min-h-[600px] object-cover"
            />
            <div className="absolute top-0 left-0 w-2/5 h-full bg-gradient-to-r from-ustablue/100 to-transparent"></div>
          </div>

        </div>
      </section>

      {/* İLETİŞİM BİLGİLERİ - 4 Kart */}
      <section className="py-12 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Adres */}
            <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-lg hover:shadow-lg transition">
              <div className="w-12 h-12 bg-ustablue rounded-full flex items-center justify-center text-white flex-shrink-0">
                <MapPin size={22} />
              </div>
              <div>
                <h3 className="font-bold text-ustablue mb-2 text-sm">Adres</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  İkitelli OSB, Mah. Atatürk Bulvarı No: 20K Başakşehir / İstanbul
                </p>
              </div>
            </div>

            {/* Telefon */}
            <a href="tel:+902121234567" className="flex items-start gap-4 p-6 bg-gray-50 rounded-lg hover:shadow-lg transition">
              <div className="w-12 h-12 bg-ustablue rounded-full flex items-center justify-center text-white flex-shrink-0">
                <Phone size={22} />
              </div>
              <div>
                <h3 className="font-bold text-ustablue mb-2 text-sm">Telefon</h3>
                <p className="text-xs text-gray-600 leading-relaxed">+90 212 123 45 67</p>
              </div>
            </a>

            {/* WhatsApp */}
            <a href="https://wa.me/905321234567" target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 p-6 bg-gray-50 rounded-lg hover:shadow-lg transition">
              <div className="w-12 h-12 bg-ustablue rounded-full flex items-center justify-center text-white flex-shrink-0">
                <MessageCircle size={22} />
              </div>
              <div>
                <h3 className="font-bold text-ustablue mb-2 text-sm">WhatsApp</h3>
                <p className="text-xs text-gray-600 leading-relaxed">+90 532 123 45 67</p>
              </div>
            </a>

            {/* E-posta */}
            <a href="mailto:sales@ustajobs.be" className="flex items-start gap-4 p-6 bg-gray-50 rounded-lg hover:shadow-lg transition">
              <div className="w-12 h-12 bg-ustablue rounded-full flex items-center justify-center text-white flex-shrink-0">
                <Mail size={22} />
              </div>
              <div>
                <h3 className="font-bold text-ustablue mb-2 text-sm">E-Posta</h3>
                <p className="text-xs text-gray-600 leading-relaxed">sales@ustajobs.be</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* FORM + HARİTA */}
      <section className="py-16 px-6 md:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Sol: İletişim Formu */}
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-ustablue mb-6">Bize Mesaj Gönderin</h2>
              <div className="w-12 h-1 bg-ustaorange mb-8"></div>

              {gonderildi ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
                  <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-green-700 mb-2">Mesajınız Alındı!</h3>
                  <p className="text-sm text-green-600">En kısa sürede size dönüş yapacağız.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <input 
                        type="text"
                        name="adSoyad"
                        placeholder="Adınız Soyadınız"
                        value={form.adSoyad}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-ustaorange"
                        required
                      />
                    </div>
                    <div>
                      <input 
                        type="email"
                        name="email"
                        placeholder="E-posta Adresiniz"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-ustaorange"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <input 
                        type="tel"
                        name="telefon"
                        placeholder="Telefon Numaranız"
                        value={form.telefon}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-ustaorange"
                      />
                    </div>
                    <div>
                      <select 
                        name="konu"
                        value={form.konu}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-ustaorange appearance-none bg-white"
                        required
                      >
                        <option value="">Konu Seçiniz</option>
                        <option value="Personel Talebi">Personel Talebi</option>
                        <option value="İş Başvurusu">İş Başvurusu</option>
                        <option value="Bilgi Alma">Bilgi Alma</option>
                        <option value="İş Birliği">İş Birliği</option>
                        <option value="Diğer">Diğer</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <textarea 
                      name="mesaj"
                      placeholder="Mesajınız"
                      value={form.mesaj}
                      onChange={handleChange}
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-ustaorange resize-none"
                      required
                    ></textarea>
                  </div>

                  {/* KVKK Onayı */}
                  <div className="flex items-start gap-2 mt-4">
                    <input 
                      type="checkbox" 
                      id="kvkk-iletisim"
                      required
                      checked={form.kvkkOnay}
                      onChange={(e) => setForm({...form, kvkkOnay: e.target.checked})}
                      className="mt-1 w-4 h-4 accent-ustaorange"
                    />
                    <label htmlFor="kvkk-iletisim" className="text-xs text-gray-600 leading-relaxed">
                      <a href="/kvkk" target="_blank" className="text-ustaorange hover:underline font-bold">
                        KVKK Aydınlatma Metni
                      </a>
                      'ni okudum ve kişisel verilerimin işlenmesini kabul ediyorum.
                    </label>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-ustaorange text-white px-6 py-4 rounded-lg font-bold hover:bg-orange-600 transition flex items-center justify-center gap-2 shadow-lg"
                  >
                    Mesaj Gönder <ArrowRight size={18} />
                  </button>
                </form>
              )}
            </div>

            {/* Sağ: Harita */}
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-ustablue mb-6">Haritada Biz</h2>
              <div className="w-12 h-1 bg-ustaorange mb-8"></div>
              <div className="rounded-lg overflow-hidden shadow-md border border-gray-200 h-[400px]">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3008.1234567890123!2d28.8023!3d41.0742!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDA0JzI3LjEiTiAyOMKwNDgnMDguMyJF!5e0!3m2!1str!2str!4v1234567890123!5m2!1str!2str"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Usta Jobs Konum"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 ÖZELLİK KARTI */}
      <section className="py-12 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="flex items-start gap-4 p-6 border border-gray-200 rounded-lg hover:shadow-lg transition">
              <div className="w-12 h-12 bg-ustaorange rounded-full flex items-center justify-center text-white flex-shrink-0">
                <Clock size={22} />
              </div>
              <div>
                <h3 className="font-bold text-ustablue mb-1 text-sm">Hızlı Yanıt</h3>
                <p className="text-xs text-gray-600 leading-relaxed">Talebinize en kısa sürede geri dönüş sağlıyoruz.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 border border-gray-200 rounded-lg hover:shadow-lg transition">
              <div className="w-12 h-12 bg-ustaorange rounded-full flex items-center justify-center text-white flex-shrink-0">
                <Headset size={22} />
              </div>
              <div>
                <h3 className="font-bold text-ustablue mb-1 text-sm">Profesyonel Destek</h3>
                <p className="text-xs text-gray-600 leading-relaxed">Deneyimli ekibimizle size en iyi desteği sunuyoruz.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 border border-gray-200 rounded-lg hover:shadow-lg transition">
              <div className="w-12 h-12 bg-ustaorange rounded-full flex items-center justify-center text-white flex-shrink-0">
                <Shield size={22} />
              </div>
              <div>
                <h3 className="font-bold text-ustablue mb-1 text-sm">Güvenilir Hizmet</h3>
                <p className="text-xs text-gray-600 leading-relaxed">Şeffaf ve güvenilir süreç yönetimi ile çalışıyoruz.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 border border-gray-200 rounded-lg hover:shadow-lg transition">
              <div className="w-12 h-12 bg-ustaorange rounded-full flex items-center justify-center text-white flex-shrink-0">
                <Target size={22} />
              </div>
              <div>
                <h3 className="font-bold text-ustablue mb-1 text-sm">Çözüm Odaklı</h3>
                <p className="text-xs text-gray-600 leading-relaxed">İhtiyaçlarınıza özel çözümler üretiyoruz.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SIKÇA SORULAN SORULAR */}
      <section className="py-16 px-6 md:px-12 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-ustablue mb-3">Sıkça Sorulan Sorular</h2>
            <div className="w-16 h-1 bg-ustaorange mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sss.map((item, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setAcikSss(acikSss === i ? null : i)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition"
                >
                  <span className="font-bold text-ustablue text-sm">{item.soru}</span>
                  <ChevronDown 
                    size={16} 
                    className={`text-ustaorange transition-transform ${acikSss === i ? 'rotate-180' : ''}`}
                  />
                </button>
                {acikSss === i && (
                  <div className="px-6 pb-4">
                    <p className="text-sm text-gray-600 leading-relaxed">{item.cevap}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}