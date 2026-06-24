"use client";

import { useState, useEffect } from "react";
import { getUserApplications, withdrawApplication } from "@/lib/api";
import { useRouter } from "next/navigation";
import { ArrowLeft, FileText, Briefcase, Building2, Calendar, CheckCircle2, XCircle, Clock } from "lucide-react";
import Link from "next/link";

export default function BasvurularimPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState<any[]>([]);
  const [withdrawingId, setWithdrawingId] = useState<number | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const jwt = localStorage.getItem("jwt");

    if (!storedUser || !jwt) {
      router.push("/giris/giris-is-arayan");
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);
    setLoading(false);

    if (parsedUser.email) {
      fetchApplications(parsedUser.email);
    }
  }, [router]);

  const fetchApplications = async (email: string) => {
    setLoading(true);
    try {
      const apps = await getUserApplications(email);
      setApplications(apps);
    } catch (error) {
      console.error('Başvurular yüklenemedi:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleWithdraw = async (app: any) => {
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
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Geri Dön */}
        <Link 
          href="/dashboard-is-arayan"
          className="inline-flex items-center gap-2 text-ustablue hover:text-ustaorange transition mb-6"
        >
          <ArrowLeft size={20} /> Dashboard'a Dön
        </Link>

        {/* Başlık */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-ustablue mb-2">Başvurularım</h1>
          <p className="text-gray-600">Tüm başvurularını görüntüle ve yönet</p>
        </div>

        {/* İstatistikler */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-ustaorange rounded-full flex items-center justify-center text-white">
                <FileText size={24} />
              </div>
              <div>
                <h3 className="font-bold text-ustablue">Toplam</h3>
                <p className="text-2xl font-bold text-ustaorange">{applications.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center text-white">
                <Clock size={24} />
              </div>
              <div>
                <h3 className="font-bold text-ustablue">Beklemede</h3>
                <p className="text-2xl font-bold text-yellow-500">
                  {applications.filter(app => app.durum === 'pending').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white">
                <CheckCircle2 size={24} />
              </div>
              <div>
                <h3 className="font-bold text-ustablue">Kabul Edilen</h3>
                <p className="text-2xl font-bold text-green-500">
                  {applications.filter(app => app.durum === 'approved').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Başvurular Listesi */}
        {applications.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
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
            {applications.map((app) => (
              <div key={app.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-ustablue mb-2">
                      {app.job?.baslik || 'İlan Bilgisi Yok'}
                    </h3>
                    
                    <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Building2 size={16} /> {app.job?.firma?.ad || 'Bilinmeyen Firma'}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={16} /> {new Date(app.createdAt).toLocaleDateString('tr-TR')}
                      </span>
                    </div>

                    {app.mesaj && (
                      <p className="text-sm text-gray-600 mb-4 p-3 bg-gray-50 rounded">
                        {app.mesaj}
                      </p>
                    )}

                    <div className="flex items-center gap-4">
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
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 ml-4">
                    {app.job && (
                      <Link 
                        href={`/is-arayanlar/${app.job.slug}`}
                        className="flex items-center gap-2 border border-ustablue text-ustablue px-4 py-2 rounded-lg font-bold text-sm hover:bg-ustablue hover:text-white transition"
                      >
                        İlanı Gör
                      </Link>
                    )}
                    
                    {/* Başvuruyu Geri Çek - Sadece beklemede olanlar için */}
                    {app.durum === 'pending' && (
                      <button
                        onClick={() => handleWithdraw(app)}
                        disabled={withdrawingId === app.id}
                        className="flex items-center gap-2 border border-red-500 text-red-500 px-4 py-2 rounded-lg font-bold text-sm hover:bg-red-500 hover:text-white transition disabled:opacity-50"
                      >
                        {withdrawingId === app.id ? 'İşleniyor...' : (
                          <>
                            <XCircle size={16} /> Başvuruyu Geri Çek
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}