import Link from 'next/link';
import { Home, Search, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        
        {/* 404 Görsel */}
        <div className="mb-8">
          <div className="text-9xl font-bold text-ustaorange mb-4">404</div>
          <div className="w-32 h-32 bg-ustablue rounded-full flex items-center justify-center mx-auto mb-6">
            <Search size={64} className="text-white" />
          </div>
        </div>

        {/* Başlık */}
        <h1 className="text-4xl font-bold text-ustablue mb-4">
          Sayfa Bulunamadı
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Aradığınız sayfa mevcut değil, taşınmış veya silinmiş olabilir.
        </p>

        {/* Butonlar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-ustaorange text-white px-8 py-4 rounded-lg font-bold hover:bg-orange-600 transition shadow-lg"
          >
            <Home size={20} /> Anasayfaya Dön
          </Link>
          <Link 
            href="/is-arayanlar"
            className="inline-flex items-center justify-center gap-2 border-2 border-ustablue text-ustablue px-8 py-4 rounded-lg font-bold hover:bg-ustablue hover:text-white transition"
          >
            <Search size={20} /> İş İlanlarına Göz At
          </Link>
        </div>

        {/* Ek Bilgi */}
        <div className="mt-12 p-6 bg-white rounded-xl shadow-sm border border-gray-200">
          <h3 className="font-bold text-ustablue mb-3">Ne Arıyordunuz?</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <Link href="/is-arayanlar" className="text-ustaorange hover:underline">
              İş İlanları
            </Link>
            <Link href="/sektorler" className="text-ustaorange hover:underline">
              Sektörler
            </Link>
            <Link href="/iletisim" className="text-ustaorange hover:underline">
              İletişim
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}