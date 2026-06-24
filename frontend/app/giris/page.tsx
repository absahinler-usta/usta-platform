import type { Metadata } from "next";
import Link from "next/link";
import { Users, Building2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Giriş Yap veya Üye Ol - Usta Jobs",
  description: "Usta Jobs'a giriş yap veya üye ol. İş arayanlar ve işverenler için hızlı ve güvenli giriş sistemi.",
};

export default function GirisPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-4xl w-full">
        
        {/* Başlık */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-ustablue mb-3">Hoş Geldiniz</h1>
          <p className="text-gray-600">Hesabınıza giriş yapın veya yeni hesap oluşturun</p>
        </div>

        {/* Seçim Kartları */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* İş Arayan */}
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition">
            <div className="w-16 h-16 bg-ustaorange rounded-full flex items-center justify-center text-white mb-6 mx-auto">
              <Users size={32} />
            </div>
            <h2 className="text-2xl font-bold text-ustablue text-center mb-3">İş Arayan</h2>
            <p className="text-sm text-gray-600 text-center mb-6">
              Yeni iş fırsatlarına ulaşmak için kayıt ol veya giriş yap
            </p>
            <div className="flex flex-col gap-3">
              <Link 
                href="/giris/giris-is-arayan" 
                className="w-full bg-ustaorange text-white py-3 rounded-lg font-bold hover:bg-orange-600 transition text-center"
              >
                Giriş Yap
              </Link>
              <Link 
                href="/giris/kayit-is-arayan" 
                className="w-full border-2 border-ustaorange text-ustaorange py-3 rounded-lg font-bold hover:bg-ustaorange hover:text-white transition text-center"
              >
                Kayıt Ol
              </Link>
            </div>
          </div>

          {/* İş Veren */}
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition">
            <div className="w-16 h-16 bg-ustablue rounded-full flex items-center justify-center text-white mb-6 mx-auto">
              <Building2 size={32} />
            </div>
            <h2 className="text-2xl font-bold text-ustablue text-center mb-3">İş Veren</h2>
            <p className="text-sm text-gray-600 text-center mb-6">
              Personel temini için kayıt ol veya giriş yap
            </p>
            <div className="flex flex-col gap-3">
              <Link 
                href="/giris/giris-is-veren" 
                className="w-full bg-ustablue text-white py-3 rounded-lg font-bold hover:bg-blue-900 transition text-center"
              >
                Giriş Yap
              </Link>
              <Link 
                href="/giris/kayit-is-veren" 
                className="w-full border-2 border-ustablue text-ustablue py-3 rounded-lg font-bold hover:bg-ustablue hover:text-white transition text-center"
              >
                Kayıt Ol
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}