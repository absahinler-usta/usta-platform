import React from 'react';
import { MapPin, Phone, Mail, MessageCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-ustablue text-white pt-16 pb-6 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        
        {/* Logo ve Açıklama - DEĞİŞMEDİ */}
        <div className="lg:col-span-1">
          <div className="mb-4">
            <a href="/" className="block hover:opacity-80 transition">
              <img 
                src="/images/usta-jobs-logo.png" 
                alt="Usta Jobs" 
                className="h-12 w-auto"
              />
            </a>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">
            İşletmeler ile doğru iş gücünü buluşturan profesyonel insan kaynakları ve iş gücü yönetimi markasıdır.
          </p>
          <div className="flex gap-3 mt-4">
            {['f', 'i', 'in', 'yt'].map((s, i) => (
              <a key={i} href="#" className="w-8 h-8 border border-gray-600 rounded-full flex items-center justify-center hover:border-ustaorange hover:text-ustaorange transition text-xs">
                {s}
              </a>
            ))}
          </div>
        </div>

        {/* Hızlı Linkler - URL'LER DÜZELTİLDİ */}
        <div>
          <h4 className="font-bold mb-4 text-sm">Hızlı Linkler</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="/" className="hover:text-ustaorange transition">Anasayfa</a></li>
            <li><a href="/is-arayanlar" className="hover:text-ustaorange transition">İş Arayanlar</a></li>
            <li><a href="/isverenler" className="hover:text-ustaorange transition">İşverenler</a></li>
            <li><a href="/sektorler" className="hover:text-ustaorange transition">Sektörler</a></li>
            <li><a href="/hizmetlerimiz" className="hover:text-ustaorange transition">Hizmetlerimiz</a></li>
            <li><a href="/hakkimizda" className="hover:text-ustaorange transition">Hakkımızda</a></li>
            <li><a href="/iletisim" className="hover:text-ustaorange transition">İletişim</a></li>
          </ul>
        </div>

        {/* İş Arayanlar - URL'LER DÜZELTİLDİ */}
        <div>
          <h4 className="font-bold mb-4 text-sm">İş Arayanlar</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="/is-arayanlar" className="hover:text-ustaorange transition">İlanlara Göz At</a></li>
            <li><a href="#" className="hover:text-ustaorange transition">Özgeçmiş Oluştur</a></li>
            <li><a href="#" className="hover:text-ustaorange transition">Kariyer İpuçları</a></li>
            <li><a href="/sss" className="hover:text-ustaorange transition">Sıkça Sorulan Sorular</a></li>
          </ul>
        </div>

        {/* İşverenler - URL'LER DÜZELTİLDİ */}
        <div>
          <h4 className="font-bold mb-4 text-sm">İşverenler</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="/isverenler" className="hover:text-ustaorange transition">Personel Talebi Oluştur</a></li>
            <li><a href="/hizmetlerimiz" className="hover:text-ustaorange transition">Hizmetlerimiz</a></li>
            <li><a href="/sektorler" className="hover:text-ustaorange transition">Sektörel Çözümler</a></li>
            <li><a href="/hizmetlerimiz" className="hover:text-ustaorange transition">Süreç Nasıl İşler?</a></li>
          </ul>
        </div>

        {/* İletişim - DEĞİŞMEDİ */}
        <div>
          <h4 className="font-bold mb-4 text-sm">İletişim</h4>
          <ul className="space-y-3 text-sm text-gray-400">
            <li className="flex items-start gap-2">
              <MapPin size={16} className="text-ustaorange mt-0.5 flex-shrink-0" />
              <span>İkitelli OSB, Mah. Atatürk Bulvarı No: 20K Başakşehir / İstanbul</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} className="text-ustaorange flex-shrink-0" />
              <span>+90 212 123 45 67</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} className="text-ustaorange flex-shrink-0" />
              <span>sales@ustajobs.be</span>
            </li>
          </ul>
          <a href="https://wa.me/905321234567" className="mt-4 bg-ustaorange text-white px-4 py-2 rounded text-sm font-bold hover:bg-orange-600 transition flex items-center justify-center gap-2 w-full">
            <MessageCircle size={16} /> 7/24 Destek Hattı +90 532 123 45 67
          </a>
        </div>
      </div>

      {/* Alt Kısım - YIL GÜNCELLENDİ, URL'LER DÜZELTİLDİ */}
      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-gray-500">
        <div>© 2026 Usta Jobs. Tüm hakları saklıdır.</div>
        <div className="flex gap-4">
          <a href="/kullanim-sartları" className="hover:text-ustaorange">Kullanım Şartları</a>
          <a href="/gizlilik-politikasi" className="hover:text-ustaorange">Gizlilik Politikası</a>
          <a href="/kvkk" className="hover:text-ustaorange">KVKK</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;