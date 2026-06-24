"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User, Mail, Lock, ArrowLeft, Eye, EyeOff, Save, CheckCircle } from "lucide-react";
import Link from "next/link";
import { STRAPI_URL } from "@/lib/api";

export default function ProfilDuzenlePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const jwt = localStorage.getItem("jwt");

    if (!storedUser || !jwt) {
      router.push("/giris/giris-is-arayan");
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);
    setFormData({
      username: parsedUser.username || "",
      email: parsedUser.email || "",
    });
    setLoading(false);
  }, [router]);

  // Profil bilgilerini güncelle
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    setSaving(true);

    try {
      const jwt = localStorage.getItem("jwt");
      const res = await fetch(`${STRAPI_URL}/api/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error?.message || "Güncelleme başarısız");
      }

      const updatedUser = await res.json();
      
      // localStorage'ı güncelle
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      
      setSuccess("Profil bilgileri başarıyla güncellendi!");
    } catch (err: any) {
      setError(err.message || "Bir hata oluştu");
    } finally {
      setSaving(false);
    }
  };

  // Şifre değiştir
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess("");
    setError("");

    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      setError("Yeni şifreler eşleşmiyor!");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setError("Yeni şifre en az 6 karakter olmalıdır!");
      return;
    }

    setSaving(true);

    try {
      const jwt = localStorage.getItem("jwt");
      
      // Önce mevcut şifre ile giriş yap (doğrulama)
      const loginRes = await fetch(`${STRAPI_URL}/api/auth/local`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier: user.email,
          password: passwordData.currentPassword,
        }),
      });

      if (!loginRes.ok) {
        throw new Error("Mevcut şifre hatalı!");
      }

      // Şifreyi güncelle
      const res = await fetch(`${STRAPI_URL}/api/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({
          password: passwordData.newPassword,
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error?.message || "Şifre güncellenemedi");
      }

      setSuccess("Şifre başarıyla değiştirildi!");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
    } catch (err: any) {
      setError(err.message || "Bir hata oluştu");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-6">
        
        {/* Geri Dön */}
        <Link 
          href="/dashboard-is-arayan"
          className="inline-flex items-center gap-2 text-ustablue hover:text-ustaorange transition mb-6"
        >
          <ArrowLeft size={20} /> Dashboard'a Dön
        </Link>

        {/* Başlık */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-ustablue mb-2">Profil Düzenle</h1>
          <p className="text-gray-600">Hesap bilgilerini güncelle</p>
        </div>

        {/* Başarı/Hata Mesajları */}
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
            <CheckCircle size={20} />
            {success}
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Profil Bilgileri */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <h2 className="text-xl font-bold text-ustablue mb-6">Profil Bilgileri</h2>
          
          <form onSubmit={handleUpdateProfile} className="space-y-4">
            
            {/* Kullanıcı Adı */}
            <div>
              <label className="block text-xs font-bold text-ustablue mb-1">Kullanıcı Adı</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text" 
                  required
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-ustaorange"
                />
              </div>
            </div>

                        {/* Email - Değiştirilemez */}
            <div>
              <label className="block text-xs font-bold text-ustablue mb-1">E-posta</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="email" 
                  value={formData.email}
                  disabled
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-sm bg-gray-100 cursor-not-allowed"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">E-posta adresi değiştirilemez. Değiştirmek için destek ile iletişime geçin.</p>
            </div>

            {/* Kaydet Butonu */}
            <button 
              type="submit" 
              disabled={saving}
              className="w-full bg-ustaorange text-white py-3 rounded-lg font-bold hover:bg-orange-600 transition flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
            >
              {saving ? "Kaydediliyor..." : (
                <>
                  <Save size={18} /> Değişiklikleri Kaydet
                </>
              )}
            </button>
          </form>
        </div>

        {/* Şifre Değiştir */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-xl font-bold text-ustablue mb-6">Şifre Değiştir</h2>
          
          <form onSubmit={handleChangePassword} className="space-y-4">
            
            {/* Mevcut Şifre */}
            <div>
              <label className="block text-xs font-bold text-ustablue mb-1">Mevcut Şifre</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type={showCurrentPassword ? "text" : "password"} 
                  required
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                  className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-ustaorange"
                />
                <button 
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-ustablue"
                >
                  {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Yeni Şifre */}
            <div>
              <label className="block text-xs font-bold text-ustablue mb-1">Yeni Şifre (en az 6 karakter)</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type={showNewPassword ? "text" : "password"} 
                  required
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                  className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-ustaorange"
                />
                <button 
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-ustablue"
                >
                  {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Yeni Şifre Tekrar */}
            <div>
              <label className="block text-xs font-bold text-ustablue mb-1">Yeni Şifre Tekrar</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type={showConfirmPassword ? "text" : "password"} 
                  required
                  value={passwordData.confirmNewPassword}
                  onChange={(e) => setPasswordData({...passwordData, confirmNewPassword: e.target.value})}
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

            {/* Şifre Değiştir Butonu */}
            <button 
              type="submit" 
              disabled={saving}
              className="w-full bg-ustablue text-white py-3 rounded-lg font-bold hover:bg-blue-900 transition flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
            >
              {saving ? "Değiştiriliyor..." : (
                <>
                  <Lock size={18} /> Şifreyi Değiştir
                </>
              )}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}