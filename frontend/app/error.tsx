"use client";

import Link from 'next/link';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Sayfa hatası:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        
        {/* 500 Görsel */}
        <div className="mb-8">
          <div className="text-9xl font-bold text-red-500 mb-4">500</div>
          <div className="w-32 h-32 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertTriangle size={64} className="text-white" />
          </div>
        </div>

        {/* Başlık */}
        <h1 className="text-4xl font-bold text-ustablue mb-4">
          Bir Hata Oluştu
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Üzgünüz, bir şeyler ters gitti. Lütfen daha sonra tekrar deneyin.
        </p>

        {/* Butonlar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="inline-flex items-center justify-center gap-2 bg-ustaorange text-white px-8 py-4 rounded-lg font-bold hover:bg-orange-600 transition shadow-lg"
          >
            <RefreshCw size={20} /> Tekrar Dene
          </button>
          <Link 
            href="/"
            className="inline-flex items-center justify-center gap-2 border-2 border-ustablue text-ustablue px-8 py-4 rounded-lg font-bold hover:bg-ustablue hover:text-white transition"
          >
            <Home size={20} /> Anasayfaya Dön
          </Link>
        </div>

        {/* Teknik Bilgi (Geliştirme modunda) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-12 p-6 bg-white rounded-xl shadow-sm border border-red-200 text-left">
            <h3 className="font-bold text-red-600 mb-3">Teknik Hata Detayı</h3>
            <pre className="text-xs text-gray-600 overflow-x-auto bg-gray-50 p-4 rounded">
              {error.message}
            </pre>
          </div>
        )}

      </div>
    </div>
  );
}