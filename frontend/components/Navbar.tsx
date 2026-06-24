"use client";
import React, { useState, useEffect, useRef, useSyncExternalStore } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown } from 'lucide-react';
import { getSectors, getHizmetler } from '@/lib/api';


const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sektorler, setSektorler] = useState<any[]>([]);
  const [hizmetler, setHizmetler] = useState<any[]>([]);
  const [sektorDropdownOpen, setSektorDropdownOpen] = useState(false);
  const [hizmetDropdownOpen, setHizmetDropdownOpen] = useState(false);
  const pathname = usePathname();
    
      // Basit useState + useEffect ile kullanıcı takibi
  const [user, setUser] = useState<any | null>(null);
  const [userType, setUserType] = useState<string | null>(null);
  const isLoggedIn = !!user;

  useEffect(() => {
    // İlk yükleme
    const storedUser = localStorage.getItem("user");
    const storedUserType = localStorage.getItem("userType");
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setUserType(storedUserType);
    }

    // Storage değişikliklerini dinle
    const handleStorageChange = () => {
      const storedUser = localStorage.getItem("user");
      const storedUserType = localStorage.getItem("userType");
      
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        setUserType(storedUserType);
      } else {
        setUser(null);
        setUserType(null);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("focus", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("focus", handleStorageChange);
    };
  }, []);

  const sektorRef = useRef<HTMLDivElement>(null);
  const hizmetRef = useRef<HTMLDivElement>(null);

  // Strapi'den sektör ve hizmetleri çek
  useEffect(() => {
    async function fetchData() {
      try {
        const sectors = await getSectors();
        setSektorler(sectors.slice(0, 6));
        
        const hizmetlerData: any[] = await getHizmetler();
        setHizmetler(hizmetlerData.filter(h => h.isActive).slice(0, 6));
      } catch (error) {
        console.error('Menu verileri yuklenemedi:', error);
      }
    }
    fetchData();
  }, []);

      const handleLogout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("user");
    localStorage.removeItem("userType");
    window.location.href = "/";
  };

  // Dropdown dışına tıklayınca kapat
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sektorRef.current && !sektorRef.current.contains(event.target as Node)) {
        setSektorDropdownOpen(false);
      }
      if (hizmetRef.current && !hizmetRef.current.contains(event.target as Node)) {
        setHizmetDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Aktif menü kontrolü
  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <nav className="bg-ustablue text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between">
        
        {/* Logo - DEĞİŞMEDİ */}
        <a href="/" className="flex items-center gap-3">
          <img 
            src="/images/usta-jobs-logo.png" 
            alt="Usta Jobs Logo" 
            className="h-12 w-auto"
          />
        </a>

        {/* Desktop Menü */}
        <div className="hidden lg:flex items-center gap-6 text-sm font-medium">
          {/* Anasayfa */}
          <a 
            href="/" 
            className={`transition ${isActive('/') ? 'text-ustaorange font-bold' : 'hover:text-ustaorange'}`}
          >
            Anasayfa
          </a>

          {/* İş Arayanlar - OK İŞARETİ KALDIRILDI */}
          <a 
            href="/is-arayanlar" 
            className={`transition ${isActive('/is-arayanlar') ? 'text-ustaorange font-bold' : 'hover:text-ustaorange'}`}
          >
            İş Arayanlar
          </a>

          {/* İşverenler - OK İŞARETİ KALDIRILDI */}
          <a 
            href="/isverenler" 
            className={`transition ${isActive('/isverenler') ? 'text-ustaorange font-bold' : 'hover:text-ustaorange'}`}
          >
            İşverenler
          </a>

          {/* Sektörler Dropdown - TIKLAMA İLE */}
          <div ref={sektorRef} className="relative">
            <button 
              onClick={() => {
                setSektorDropdownOpen(!sektorDropdownOpen);
                setHizmetDropdownOpen(false);
              }}
              className={`flex items-center gap-1 transition ${isActive('/sektorler') ? 'text-ustaorange font-bold' : 'hover:text-ustaorange'}`}
            >
              Sektörler <ChevronDown size={14} className={`transition-transform ${sektorDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {sektorDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-white text-gray-800 rounded-lg shadow-xl border border-gray-200 overflow-hidden">
                <a 
                  href="/sektorler" 
                  className="block px-4 py-3 text-sm font-bold text-ustablue hover:bg-gray-50 border-b border-gray-200"
                  onClick={() => setSektorDropdownOpen(false)}
                >
                  Tüm Sektörler →
                </a>
                {sektorler.map((sektor) => (
                  <a 
                    key={sektor.id}
                    href={`/sektorler/${sektor.slug}`}
                    className="block px-4 py-2 text-sm hover:bg-gray-50 hover:text-ustaorange transition"
                    onClick={() => setSektorDropdownOpen(false)}
                  >
                    {sektor.baslik}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Hizmetlerimiz Dropdown - TIKLAMA İLE */}
          <div ref={hizmetRef} className="relative">
            <button 
              onClick={() => {
                setHizmetDropdownOpen(!hizmetDropdownOpen);
                setSektorDropdownOpen(false);
              }}
              className={`flex items-center gap-1 transition ${isActive('/hizmetlerimiz') ? 'text-ustaorange font-bold' : 'hover:text-ustaorange'}`}
            >
              Hizmetlerimiz <ChevronDown size={14} className={`transition-transform ${hizmetDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {hizmetDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-white text-gray-800 rounded-lg shadow-xl border border-gray-200 overflow-hidden">
                <a 
                  href="/hizmetlerimiz" 
                  className="block px-4 py-3 text-sm font-bold text-ustablue hover:bg-gray-50 border-b border-gray-200"
                  onClick={() => setHizmetDropdownOpen(false)}
                >
                  Tüm Hizmetler →
                </a>
                {hizmetler.map((hizmet) => (
                  <a 
                    key={hizmet.id}
                    href={`/hizmetlerimiz/${hizmet.slug}`}
                    className="block px-4 py-2 text-sm hover:bg-gray-50 hover:text-ustaorange transition"
                    onClick={() => setHizmetDropdownOpen(false)}
                  >
                    {hizmet.baslik}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Hakkımızda */}
          <a 
            href="/hakkimizda" 
            className={`transition ${isActive('/hakkimizda') ? 'text-ustaorange font-bold' : 'hover:text-ustaorange'}`}
          >
            Hakkımızda
          </a>

          {/* İletişim */}
          <a 
            href="/iletisim" 
            className={`transition ${isActive('/iletisim') ? 'text-ustaorange font-bold' : 'hover:text-ustaorange'}`}
          >
            İletişim
          </a>
        </div>

                {/* Sağ Butonlar */}
        <div className="hidden lg:flex items-center gap-3">
          {isLoggedIn ? (
            <>
              <a 
                href={userType === 'is-veren' ? '/dashboard-is-veren' : '/dashboard-is-arayan'}
                className="flex items-center gap-2 text-white hover:text-ustaorange transition text-sm font-medium"
              >
                <span>Merhaba, {user?.username}</span>
              </a>
              <button 
                onClick={handleLogout}
                className="bg-red-500 px-5 py-2 rounded text-sm font-bold hover:bg-red-600 transition"
              >
                Çıkış Yap
              </button>
            </>
          ) : (
            <>
              <a 
                href="/giris"
                className="border border-white px-5 py-2 rounded text-sm font-medium hover:bg-white hover:text-ustablue transition"
              >
                Giriş Yap
              </a>
              <a 
                href="/giris"
                className="bg-ustaorange px-5 py-2 rounded text-sm font-bold hover:bg-orange-600 transition"
              >
                Üye Ol
              </a>
            </>
          )}
        </div>

        {/* Mobil Menü Butonu */}
        <button className="lg:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobil Menü */}
      {mobileOpen && (
        <div className="lg:hidden py-4 border-t border-white/20 px-4">
          <div className="flex flex-col gap-3">
            <a href="/" className="text-sm font-medium hover:text-ustaorange" onClick={() => setMobileOpen(false)}>
              Anasayfa
            </a>
            <a href="/is-arayanlar" className="text-sm font-medium hover:text-ustaorange" onClick={() => setMobileOpen(false)}>
              İş Arayanlar
            </a>
            <a href="/isverenler" className="text-sm font-medium hover:text-ustaorange" onClick={() => setMobileOpen(false)}>
              İşverenler
            </a>
            
            {/* Mobil Sektörler */}
            <div>
              <a href="/sektorler" className="text-sm font-bold text-ustaorange mb-2 block" onClick={() => setMobileOpen(false)}>
                Sektörler
              </a>
              <div className="pl-4 space-y-2">
                {sektorler.map((sektor) => (
                  <a 
                    key={sektor.id}
                    href={`/sektorler/${sektor.slug}`}
                    className="block text-sm text-gray-300 hover:text-ustaorange"
                    onClick={() => setMobileOpen(false)}
                  >
                    {sektor.baslik}
                  </a>
                ))}
              </div>
            </div>

            {/* Mobil Hizmetler */}
            <div>
              <a href="/hizmetlerimiz" className="text-sm font-bold text-ustaorange mb-2 block" onClick={() => setMobileOpen(false)}>
                Hizmetlerimiz
              </a>
              <div className="pl-4 space-y-2">
                {hizmetler.map((hizmet) => (
                  <a 
                    key={hizmet.id}
                    href={`/hizmetlerimiz/${hizmet.slug}`}
                    className="block text-sm text-gray-300 hover:text-ustaorange"
                    onClick={() => setMobileOpen(false)}
                  >
                    {hizmet.baslik}
                  </a>
                ))}
              </div>
            </div>

            <a href="/hakkimizda" className="text-sm font-medium hover:text-ustaorange" onClick={() => setMobileOpen(false)}>
              Hakkımızda
            </a>
            <a href="/iletisim" className="text-sm font-medium hover:text-ustaorange" onClick={() => setMobileOpen(false)}>
              İletişim
            </a>
            
                                    
                <div className="flex gap-2 pt-3 border-t border-white/20">
              {isLoggedIn ? (
                <>
                  <a 
                    href={userType === 'is-veren' ? '/dashboard-is-veren' : '/dashboard-is-arayan'}
                    className="flex-1 text-center px-4 py-2 border border-white rounded text-sm font-medium hover:bg-white hover:text-ustablue transition"
                    onClick={() => setMobileOpen(false)}
                  >
                    Merhaba, {user?.username}
                  </a>
                  <button 
                    onClick={() => {
                      handleLogout();
                      setMobileOpen(false);
                    }}
                    className="flex-1 text-center px-4 py-2 bg-red-500 rounded text-sm font-bold hover:bg-red-600 transition"
                  >
                    Çıkış Yap
                  </button>
                </>
              ) : (
                <>
                  <a 
                    href="/giris"
                    className="flex-1 text-center px-4 py-2 border border-white rounded text-sm font-medium hover:bg-white hover:text-ustablue transition"
                    onClick={() => setMobileOpen(false)}
                  >
                    Giriş Yap
                  </a>
                  <a 
                    href="/giris"
                    className="flex-1 text-center px-4 py-2 bg-ustaorange rounded text-sm font-bold hover:bg-orange-600 transition"
                    onClick={() => setMobileOpen(false)}
                  >
                    Üye Ol
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;