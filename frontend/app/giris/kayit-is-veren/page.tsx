"use client";

import { registerUser, createCompany } from "@/lib/api";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Building2, Mail, Lock, ArrowLeft, Eye, EyeOff, User } from "lucide-react";
import Link from "next/link";

export default function KayitIsVerenPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    firmaAdi: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Şifreler eşleşmiyor!");
      return;
    }

    if (formData.password.length < 6) {
      setError("Şifre en az 6 karakter olmalıdır!");
      return;
    }

    setLoading(true);

    try {
      // 1. Kullanıcıyı oluştur
      const userResponse = await registerUser({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        userType: "is-veren",
      });

      console.log('Kullanıcı oluşturuldu:', userResponse);

            // 2. Firma oluştur (JWT token ile)
      try {
        const jwt = userResponse.jwt;
        console.log('JWT token:', jwt);
        
        const companyData = await createCompany({
          name: formData.firmaAdi,
          contactEmail: formData.email,
          contactPhone: "",
          website: "",
          description: "",
          jwt: jwt, // JWT token ekle
        });

        console.log('Firma oluşturuldu:', companyData);
      } catch (companyError) {
        console.error('Firma oluşturulamadı ama kullanıcı oluşturuldu:', companyError);
      }

      alert("İş Veren hesabınız başarıyla oluşturuldu! Giriş yapabilirsiniz.");
      setTimeout(() => {
        router.push("/giris/giris-is-veren");
      }, 500);
    } catch (err: any) {
      setError(err.message || "Kayıt sırasında bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        
        {/* Geri Dön Butonu */}
        <Link 
          href="/giris" 
          className="inline-flex items-center gap-2 text-ustablue hover:text-ustaorange transition mb-6"
        >
          <ArrowLeft size={20} /> Geri Dön
        </Link>

        {/* Başlık */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-ustablue rounded-full flex items-center justify-center text-white mx-auto mb-4">
            <Building2 size={32} />
          </div>
          <h1 className="text-3xl font-bold text-ustablue mb-2">İş Veren Kayıt</h1>
          <p className="text-gray-600">Firma hesabı oluştur ve personel talebi oluştur</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Hata Mesajı */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Firma Adı */}
            <div>
              <label className="block text-xs font-bold text-ustablue mb-1">Firma Adı</label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Firma adınız"
                  required
                  value={formData.firmaAdi}
                  onChange={(e) => setFormData({...formData, firmaAdi: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-ustaorange"
                />
              </div>
            </div>

            {/* Kullanıcı Adı */}
            <div>
              <label className="block text-xs font-bold text-ustablue mb-1">Kullanıcı Adı</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Kullanıcı adınız"
                  required
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-ustaorange"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-ustablue mb-1">E-posta</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="email" 
                  placeholder="Firma e-posta adresiniz"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-ustaorange"
                />
              </div>
            </div>

            {/* Şifre */}
            <div>
              <label className="block text-xs font-bold text-ustablue mb-1">Şifre</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Şifreniz (en az 6 karakter)"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-ustaorange"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-ustablue"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Şifre Tekrar */}
            <div>
              <label className="block text-xs font-bold text-ustablue mb-1">Şifre Tekrar</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type={showConfirmPassword ? "text" : "password"} 
                  placeholder="Şifrenizi tekrar girin"
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-ustaorange"
                />
                <button 
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-ustablue"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Kayıt Butonu */}
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-ustablue text-white py-3 rounded-lg font-bold hover:bg-blue-900 transition flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
            >
              {loading ? "Kaydediliyor..." : "İş Veren Hesabı Oluştur"}
            </button>
          </form>

          {/* Zaten Üye misin? */}
          <div className="text-center mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Zaten hesabın var mı?{" "}
              <Link href="/giris/giris-is-veren" className="text-ustablue font-bold hover:underline">
                Giriş Yap
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}