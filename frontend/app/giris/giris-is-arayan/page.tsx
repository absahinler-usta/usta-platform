"use client";

import { loginUser } from "@/lib/api";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Mail, Lock, ArrowLeft, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

export default function GirisIsArayanPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    identifier: "", // email veya username
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await loginUser({
        identifier: formData.identifier,
        password: formData.password,
      });

      // JWT token'ı localStorage'a kaydet
            localStorage.setItem("jwt", response.jwt);
      localStorage.setItem("user", JSON.stringify(response.user));
      localStorage.setItem("userType", response.user.userType || "is-arayan");
      

      alert("Giriş başarılı!");
      window.location.href = "/dashboard-is-arayan";
    } catch (err: any) {
      setError(err.message || "Giriş yapılamadı. Email veya şifre hatalı.");
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
          <div className="w-16 h-16 bg-ustaorange rounded-full flex items-center justify-center text-white mx-auto mb-4">
            <User size={32} />
          </div>
          <h1 className="text-3xl font-bold text-ustablue mb-2">İş Arayan Giriş</h1>
          <p className="text-gray-600">Hesabınıza giriş yapın</p>
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

            {/* Email veya Kullanıcı Adı */}
            <div>
              <label className="block text-xs font-bold text-ustablue mb-1">E-posta veya Kullanıcı Adı</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text" 
                  placeholder="E-posta veya kullanıcı adınız"
                  required
                  value={formData.identifier}
                  onChange={(e) => setFormData({...formData, identifier: e.target.value})}
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
                  placeholder="Şifreniz"
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

            {/* Giriş Butonu */}
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-ustaorange text-white py-3 rounded-lg font-bold hover:bg-orange-600 transition flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
            >
              {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
            </button>
          </form>

          {/* Kayıt Ol Linki */}
          <div className="text-center mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Hesabın yok mu?{" "}
              <Link href="/giris/kayit-is-arayan" className="text-ustaorange font-bold hover:underline">
                Kayıt Ol
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}