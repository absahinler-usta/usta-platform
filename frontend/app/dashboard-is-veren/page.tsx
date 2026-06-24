"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getEmployerDashboardData } from "@/lib/api";
import { 
  Building2, Briefcase, Settings, 
  FileText, ArrowRight, UserPlus
} from "lucide-react";
import Link from "next/link";

export default function DashboardIsVerenPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const jwt = localStorage.getItem("jwt");
    const userType = localStorage.getItem("userType");

    if (!storedUser || !jwt) {
      router.push("/giris/giris-is-veren");
      return;
    }

    if (userType !== "is-veren") {
      router.push("/dashboard-is-arayan");
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);
    setLoading(false);

    if (parsedUser.email) {
      fetchDashboardData(parsedUser.email);
    }
  }, [router]);

  const fetchDashboardData = async (email: string) => {
    setDataLoading(true);
    try {
      const data = await getEmployerDashboardData(email);
      setDashboardData(data);
    } catch (error) {
      console.error('Dashboard verileri yüklenemedi:', error);
    } finally {
      setDataLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Yükleniyor...</p>
      </div>
    );
  }

  const jobs = dashboardData?.jobs || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        {/* Hoş Geldin */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-ustablue mb-2">
            Hoş Geldin, {user?.username}! 👋
          </h2>
          <p className="text-gray-600">
            Personel ihtiyaçlarınızı buradan yönetebilirsiniz.
          </p>
        </div>

        {/* Firma Bilgisi */}
        {dashboardData?.company && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-ustablue rounded-full flex items-center justify-center text-white">
                <Building2 size={32} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-ustablue">{dashboardData.company.name}</h3>
                <p className="text-sm text-gray-600">{dashboardData.company.contactEmail}</p>
                {dashboardData.company.contactPhone && (
                  <p className="text-xs text-gray-500">{dashboardData.company.contactPhone}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Hızlı İşlemler */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <h3 className="text-xl font-bold text-ustablue mb-6">Hızlı İşlemler</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Yeni İlan Oluştur */}
            <Link 
              href="/isverenler/detayli-talep"
              className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-ustaorange hover:shadow-md transition group"
            >
              <div className="w-12 h-12 bg-ustaorange rounded-full flex items-center justify-center text-white group-hover:bg-ustablue transition">
                <UserPlus size={24} />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-ustablue">Yeni İlan Oluştur</h4>
                <p className="text-xs text-gray-500">Personel ihtiyacını bildir</p>
              </div>
              <ArrowRight size={20} className="text-ustaorange" />
            </Link>

            {/* İlanlarımı Görüntüle */}
            <Link 
              href="/dashboard-is-veren/ilanlarim"
              className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-ustaorange hover:shadow-md transition group"
            >
              <div className="w-12 h-12 bg-ustablue rounded-full flex items-center justify-center text-white group-hover:bg-ustaorange transition">
                <FileText size={24} />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-ustablue">İlanlarımı Görüntüle</h4>
                <p className="text-xs text-gray-500">Aktif ilanlarını kontrol et</p>
              </div>
              <ArrowRight size={20} className="text-ustablue" />
            </Link>

            {/* Profil Düzenle */}
            <Link
              href="/dashboard-is-veren/profil"
              className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-ustaorange hover:shadow-md transition group"
            >
              <div className="w-12 h-12 bg-gray-500 rounded-full flex items-center justify-center text-white group-hover:bg-ustaorange transition">
                <Settings size={24} />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-ustablue">Profil Düzenle</h4>
                <p className="text-xs text-gray-500">Firma bilgilerini güncelle</p>
              </div>
              <ArrowRight size={20} className="text-ustaorange" />
            </Link>

          </div>
        </div>

        {/* Son İlanlarım */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h3 className="text-xl font-bold text-ustablue mb-6">Son İlanlarım</h3>
          
          {dataLoading ? (
            <div className="text-center py-12">
              <p className="text-gray-500">İlanlar yükleniyor...</p>
            </div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase size={32} className="text-gray-400" />
              </div>
              <p className="text-gray-500 mb-4">Henüz ilan oluşturmadın.</p>
              <Link 
                href="/isverenler/detayli-talep"
                className="inline-flex items-center gap-2 bg-ustaorange text-white px-6 py-3 rounded-lg font-bold hover:bg-orange-600 transition"
              >
                <UserPlus size={18} /> Yeni İlan Oluştur
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {jobs.slice(0, 10).map((job: any) => (
                <div key={job.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="font-bold text-ustablue mb-1">{job.title}</h4>
                      <p className="text-sm text-gray-600 mb-2">{job.city} • {job.positionType}</p>
                      <p className="text-xs text-gray-500">
                        Yayınlanma: {new Date(job.createdAt).toLocaleDateString('tr-TR')}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
                        Yayında
                      </span>
                      <span className="text-xs text-ustablue font-bold">
                        {job.applications?.length || 0} Başvuru
                      </span>
                      <Link 
                        href={`/is-arayanlar/${job.slug}`}
                        className="text-xs text-ustaorange font-bold hover:underline"
                      >
                        İlanı Gör
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}