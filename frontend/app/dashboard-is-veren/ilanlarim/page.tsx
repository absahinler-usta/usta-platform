"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getEmployerDashboardData, updateApplicationStatus, deleteJob } from "@/lib/api";
import { 
  Briefcase, MapPin, Clock, Users, Eye, 
  ArrowLeft, Calendar, CheckCircle2, XCircle
} from "lucide-react";
import Link from "next/link";

export default function IlanlarimPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState<any[]>([]);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [showApplications, setShowApplications] = useState(false);
  const [updatingId, setUpdatingId] = useState<number | null>(null);  
  const [deactivatingId, setDeactivatingId] = useState<number | null>(null);
  

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

    if (parsedUser.email) {
      fetchJobs(parsedUser.email);
    }
  }, [router]);

  const fetchJobs = async (email: string) => {
    setLoading(true);
    try {
      const data = await getEmployerDashboardData(email);
      setJobs(data.jobs || []);
    } catch (error) {
      console.error('İlanlar yüklenemedi:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewApplications = (job: any) => {
    setSelectedJob(job);
    setShowApplications(true);
  };

  const handleCloseApplications = () => {
    setShowApplications(false);
    setSelectedJob(null);
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
          href="/dashboard-is-veren"
          className="inline-flex items-center gap-2 text-ustablue hover:text-ustaorange transition mb-6"
        >
          <ArrowLeft size={20} /> Dashboard'a Dön
        </Link>

        {/* Başlık */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-ustablue mb-2">İlanlarım</h1>
          <p className="text-gray-600">Tüm aktif ilanlarını görüntüle ve başvuruları yönet</p>
        </div>

        {/* İlanlar Listesi */}
        {jobs.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Briefcase size={32} className="text-gray-400" />
            </div>
            <p className="text-gray-500 mb-4">Henüz ilan oluşturmadın.</p>
            <Link 
              href="/isverenler/detayli-talep"
              className="inline-flex items-center gap-2 bg-ustaorange text-white px-6 py-3 rounded-lg font-bold hover:bg-orange-600 transition"
            >
              <Briefcase size={18} /> Yeni İlan Oluştur
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {jobs.map((job) => (
              <div key={job.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-ustablue mb-2">{job.title}</h3>
                    
                    <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <MapPin size={16} /> {job.city || 'Belirtilmemiş'}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={16} /> {job.positionType || 'Belirtilmemiş'}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={16} /> {new Date(job.createdAt).toLocaleDateString('tr-TR')}
                      </span>
                    </div>

                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {job.description?.[0]?.children?.[0]?.text || 'Açıklama yok'}
                    </p>

                    <div className="flex items-center gap-4">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
                        Yayında
                      </span>
                      <span className="flex items-center gap-1 text-sm text-ustablue font-medium">
                        <Users size={16} /> {job.applications?.length || 0} Başvuru
                      </span>
                    </div>
                  </div>

                                    <div className="flex flex-col gap-2 ml-4">
                    <button 
                      onClick={() => handleViewApplications(job)}
                      className="flex items-center gap-2 bg-ustaorange text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-orange-600 transition"
                    >
                      <Eye size={16} /> Başvuruları Gör
                    </button>
                    <Link 
                      href={`/is-arayanlar/${job.slug}`}
                      className="flex items-center gap-2 border border-ustablue text-ustablue px-4 py-2 rounded-lg font-bold text-sm hover:bg-ustablue hover:text-white transition"
                    >
                      <Eye size={16} /> İlanı Görüntüle
                    </Link>
                    <button
                      onClick={async () => {
                        if (!confirm('Bu ilanı silmek istediğinize emin misiniz?')) return;
                        
                        setDeactivatingId(job.id);
                        try {
                          const jwt = localStorage.getItem('jwt');
                          await deleteJob(job.documentId || job.id, jwt!);
                          alert('İlan başarıyla silindi!');
                          
                          // İlanı listeden kaldır
                          setJobs(jobs.filter(j => j.id !== job.id));
                        } catch (err: any) {
                          alert(err.message || 'Hata oluştu');
                        } finally {
                          setDeactivatingId(null);
                        }
                      }}
                      disabled={deactivatingId === job.id}
                      className="flex items-center gap-2 border border-red-500 text-red-500 px-4 py-2 rounded-lg font-bold text-sm hover:bg-red-500 hover:text-white transition disabled:opacity-50"
                    >
                      {deactivatingId === job.id ? 'Siliniyor...' : 'İlanı Sil'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Başvurular Modal */}
        {showApplications && selectedJob && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto p-8 relative">
              
              {/* Kapat Butonu */}
              <button 
                onClick={handleCloseApplications}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
              >
                <XCircle size={24} />
              </button>

              <h3 className="text-2xl font-bold text-ustablue mb-2">
                {selectedJob.title} - Başvurular
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                Toplam {selectedJob.applications?.length || 0} başvuru
              </p>

              {selectedJob.applications?.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users size={32} className="text-gray-400" />
                  </div>
                  <p className="text-gray-500">Bu ilan için henüz başvuru yok.</p>
                </div>
              ) : (
                <div className="space-y-4">
                                    {selectedJob.applications.map((app: any) => (
                    <div key={app.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-bold text-ustablue">{app.adSoyad}</h4>
                          <p className="text-sm text-gray-600">{app.email}</p>
                          <p className="text-sm text-gray-600">{app.telefon}</p>
                        </div>
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
                      {app.mesaj && (
                        <p className="text-sm text-gray-600 mt-2 p-3 bg-gray-50 rounded">
                          {app.mesaj}
                        </p>
                      )}
                      <p className="text-xs text-gray-500 mt-2">
                        Başvuru Tarihi: {new Date(app.createdAt).toLocaleDateString('tr-TR')}
                      </p>
                      
                      {/* Kabul/Red Butonları */}
                      {app.durum === 'pending' && (
                        <div className="flex gap-2 mt-3 pt-3 border-t border-gray-200">
                          <button
                            onClick={async () => {
                              if (!confirm('Bu başvuruyu kabul etmek istediğinize emin misiniz?')) return;
                              setUpdatingId(app.id);
                              try {
                                const jwt = localStorage.getItem('jwt');
                                                              await updateApplicationStatus(app.documentId, 'approved', jwt!);
                                alert('Başvuru kabul edildi!');
                                // Listeyi güncelle
                                const data = await getEmployerDashboardData(user.email);
                                const updatedJob = data.jobs.find((j: any) => j.id === selectedJob.id);
                                if (updatedJob) {
                                  setSelectedJob(updatedJob);
                                  setJobs(data.jobs);
                                }
                              } catch (err: any) {
                                alert(err.message || 'Hata oluştu');
                              } finally {
                                setUpdatingId(null);
                              }
                            }}
                            disabled={updatingId === app.id}
                            className="flex-1 bg-green-500 text-white py-2 rounded-lg font-bold text-sm hover:bg-green-600 transition disabled:opacity-50"
                          >
                            {updatingId === app.id ? 'İşleniyor...' : 'Kabul Et'}
                          </button>
                          <button
                            onClick={async () => {
                              if (!confirm('Bu başvuruyu reddetmek istediğinize emin misiniz?')) return;
                              setUpdatingId(app.id);
                              try {
                                const jwt = localStorage.getItem('jwt');
                                                              await updateApplicationStatus(app.documentId, 'rejected', jwt!);
                                alert('Başvuru reddedildi!');
                                // Listeyi güncelle
                                const data = await getEmployerDashboardData(user.email);
                                const updatedJob = data.jobs.find((j: any) => j.id === selectedJob.id);
                                if (updatedJob) {
                                  setSelectedJob(updatedJob);
                                  setJobs(data.jobs);
                                }
                              } catch (err: any) {
                                alert(err.message || 'Hata oluştu');
                              } finally {
                                setUpdatingId(null);
                              }
                            }}
                            disabled={updatingId === app.id}
                            className="flex-1 bg-red-500 text-white py-2 rounded-lg font-bold text-sm hover:bg-red-600 transition disabled:opacity-50"
                          >
                            {updatingId === app.id ? 'İşleniyor...' : 'Reddet'}
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}