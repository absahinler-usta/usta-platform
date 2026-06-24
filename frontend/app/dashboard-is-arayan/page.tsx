"use client";

import { useState, useEffect } from "react";
import { getUserApplications, withdrawApplication } from "@/lib/api";
import { useRouter } from "next/navigation";
import { 
  User, Mail, Briefcase, Settings, 
  FileText, CheckCircle2, Clock, ArrowRight 
} from "lucide-react";
import Link from "next/link";

export default function DashboardIsArayanPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState<any[]>([]);
  const [applicationsLoading, setApplicationsLoading] = useState(true);  
  const [withdrawingId, setWithdrawingId] = useState<number | null>(null);

  // Debug için başvuruları logla
console.log('Başvurular durumu:', applications.map((app: any) => ({
  id: app.id,
  durum: app.durum,
  job: app.job?.baslik
})));

  useEffect(() => {
    // localStorage'dan kullanıcı bilgilerini al
    const storedUser = localStorage.getItem("user");
    const jwt = localStorage.getItem("jwt");

    if (!storedUser || !jwt) {
      router.push("/giris/giris-is-arayan");
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);
    setLoading(false);

    // Kullanıcının başvurularını çek
    if (parsedUser.email) {
      fetchApplications(parsedUser.email);
    }
  }, [router]);

  const fetchApplications = async (email: string) => {
    setApplicationsLoading(true);
    try {
      const apps = await getUserApplications(email);
      setApplications(apps);
      console.log('Kullanıcı başvuruları:', apps);
    } catch (error) {
      console.error('Başvurular yüklenemedi:', error);
    } finally {
      setApplicationsLoading(false);
    }
  };

  // İstatistikleri hesapla
  const totalApplications = applications.length;
  const pendingApplications = applications.filter(app => app.durum === 'pending').length;
  const approvedApplications = applications.filter(app => app.durum === 'approved').length;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Ana İçerik */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        {/* Hoş Geldin */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-ustablue mb-2">
            Hoş Geldin, {user?.username}! 👋
          </h2>
          <p className="text-gray-600">
            İşte senin için özel fırsatlar ve başvuruların.
          </p>
        </div>

        {/* İstatistik Kartları */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          {/* Başvurularım */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-ustaorange rounded-full flex items-center justify-center text-white">
                <FileText size={24} />
              </div>
              <div>
                <h3 className="font-bold text-ustablue">Başvurularım</h3>
                <p className="text-2xl font-bold text-ustaorange">
                  {applicationsLoading ? '-' : totalApplications}
                </p>
              </div>
            </div>
            <p className="text-xs text-gray-500">Toplam başvuru sayın</p>
          </div>

          {/* Bekleyen */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center text-white">
                <Clock size={24} />
              </div>
              <div>
                <h3 className="font-bold text-ustablue">Bekleyen</h3>
                <p className="text-2xl font-bold text-yellow-500">
                  {applicationsLoading ? '-' : pendingApplications}
                </p>
              </div>
            </div>
            <p className="text-xs text-gray-500">Değerlendirme bekleyen başvurular</p>
          </div>

          {/* Kabul Edilen */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white">
                <CheckCircle2 size={24} />
              </div>
              <div>
                <h3 className="font-bold text-ustablue">Kabul Edilen</h3>
                <p className="text-2xl font-bold text-green-500">
                  {applicationsLoading ? '-' : approvedApplications}
                </p>
              </div>
            </div>
            <p className="text-xs text-gray-500">Kabul edilen başvurular</p>
          </div>
        </div>

        {/* Hızlı İşlemler */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <h3 className="text-xl font-bold text-ustablue mb-6">Hızlı İşlemler</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* İş İlanlarına Göz At */}
            <Link 
              href="/is-arayanlar"
              className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-ustaorange hover:shadow-md transition group"
            >
              <div className="w-12 h-12 bg-ustablue rounded-full flex items-center justify-center text-white group-hover:bg-ustaorange transition">
                <Briefcase size={24} />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-ustablue">İş İlanlarına Göz At</h4>
                <p className="text-xs text-gray-500">Güncel iş fırsatlarını keşfet</p>
              </div>
              <ArrowRight size={20} className="text-ustaorange" />
            </Link>

                        {/* Başvurularım */}
            <Link 
              href="/dashboard-is-arayan/basvurularim"
              className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-ustaorange hover:shadow-md transition group"
            >
              <div className="w-12 h-12 bg-ustaorange rounded-full flex items-center justify-center text-white group-hover:bg-ustablue transition">
                <FileText size={24} />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-ustablue">Başvurularım</h4>
                <p className="text-xs text-gray-500">Tüm başvurularını gör</p>
              </div>
              <ArrowRight size={20} className="text-ustaorange" />
            </Link>

                        {/* Profil Düzenle */}
            <Link 
              href="/dashboard-is-arayan/profil"
              className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-ustaorange hover:shadow-md transition group"
            >
              <div className="w-12 h-12 bg-gray-500 rounded-full flex items-center justify-center text-white group-hover:bg-ustaorange transition">
                <Settings size={24} />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-ustablue">Profil Düzenle</h4>
                <p className="text-xs text-gray-500">Bilgilerini güncelle</p>
              </div>
              <ArrowRight size={20} className="text-ustaorange" />
            </Link>

          </div>
        </div>

        {/* Son Başvurular */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h3 className="text-xl font-bold text-ustablue mb-6">Son Başvurularım</h3>
          
          {applicationsLoading ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Başvurular yükleniyor...</p>
            </div>
          ) : applications.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText size={32} className="text-gray-400" />
              </div>
              <p className="text-gray-500 mb-4">Henüz başvuru yapmadın.</p>
              <Link 
                href="/is-arayanlar"
                className="inline-flex items-center gap-2 bg-ustaorange text-white px-6 py-3 rounded-lg font-bold hover:bg-orange-600 transition"
              >
                <Briefcase size={18} /> İş İlanlarına Göz At
              </Link>
            </div>
          ) : (
                        <div className="space-y-4">
              {applications.slice(0, 5).map((app) => (
                <div key={app.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="font-bold text-ustablue mb-1">
                        {app.job?.baslik || 'İlan Bilgisi Yok'}
                      </h4>
                      <p className="text-sm text-gray-600 mb-2">
                        {app.job?.firma?.ad || 'Bilinmeyen Firma'}
                      </p>
                      <p className="text-xs text-gray-500">
                        Başvuru Tarihi: {new Date(app.createdAt).toLocaleDateString('tr-TR')}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        app.durum === 'approved' 
                          ? 'bg-green-100 text-green-700'
                          : app.durum === 'rejected'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {app.durum === 'approved' 
                          ? 'Kabul Edildi'
                          : app.durum === 'rejected'
                          ? 'Reddedildi'
                          : 'Beklemede'}
                      </span>
                      {app.job && (
                        <Link 
                          href={`/is-arayanlar/${app.job.slug}`}
                          className="text-xs text-ustaorange font-bold hover:underline"
                        >
                          İlanı Gör
                        </Link>
                      )}
                    </div>
                  </div>
                  
                                    {/* Başvuruyu Geri Çek Butonu - Sadece beklemede olan başvurular için */}
                  {app.durum === 'pending' && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <button
                        onClick={async () => {
                          if (!confirm('Bu başvuruyu geri çekmek istediğinize emin misiniz?')) return;
                          setWithdrawingId(app.id);
                          try {
                            const jwt = localStorage.getItem('jwt');
                            await withdrawApplication(app.documentId || app.id, jwt!);
                            alert('Başvuru geri çekildi!');
                            // Listeyi güncelle
                            const data = await getUserApplications(user.email);
                            setApplications(data);
                          } catch (err: any) {
                            alert(err.message || 'Hata oluştu');
                          } finally {
                            setWithdrawingId(null);
                          }
                        }}
                        disabled={withdrawingId === app.id}
                        className="w-full border border-red-500 text-red-500 py-2 rounded-lg font-bold text-sm hover:bg-red-500 hover:text-white transition disabled:opacity-50"
                      >
                        {withdrawingId === app.id ? 'İşleniyor...' : 'Başvuruyu Geri Çek'}
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}