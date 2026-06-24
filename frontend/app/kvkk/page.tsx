import React from 'react';

export default function KvkkPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 md:p-12">
        
        {/* Başlık */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-ustablue mb-3">KVKK Aydınlatma Metni</h1>
          <div className="w-16 h-1 bg-ustaorange mb-4"></div>
          <p className="text-sm text-gray-500">Son Güncelleme: 23 Haziran 2026</p>
        </div>

        {/* İçerik */}
        <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
          
          <section>
            <h2 className="text-2xl font-bold text-ustablue mb-3">1. Veri Sorumlusu</h2>
            <p>
              Usta Jobs (bundan sonra "Şirket" olarak anılacaktır), 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") 
              kapsamında veri sorumlusu olarak hareket etmektedir. İşbu Aydınlatma Metni, Şirketimiz tarafından 
              ziyaretçilerimizin ve kullanıcılarımızın kişisel verilerinin işlenmesine ilişkin bilgilendirme amacıyla hazırlanmıştır.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-ustablue mb-3">2. İşlenen Kişisel Veriler</h2>
            <p>Şirketimiz tarafından aşağıdaki kişisel veriler işlenebilmektedir:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Kimlik verileri (ad, soyad)</li>
              <li>İletişim verileri (e-posta adresi, telefon numarası, adres)</li>
              <li>İş başvurusu verileri (özgeçmiş, eğitim bilgileri, iş deneyimi)</li>
              <li>İşveren bilgileri (firma adı, yetkili kişi bilgileri)</li>
              <li>İşlem güvenliği verileri (IP adresi, tarayıcı bilgileri)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-ustablue mb-3">3. Kişisel Verilerin İşlenme Amaçları</h2>
            <p>Kişisel verileriniz aşağıdaki amaçlarla işlenebilmektedir:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>İş ilanlarına başvuru yapılması ve değerlendirilmesi</li>
              <li>Personel taleplerinin alınması ve değerlendirilmesi</li>
              <li>İletişim formu aracılığıyla yapılan başvuruların yanıtlanması</li>
              <li>Yasal yükümlülüklerin yerine getirilmesi</li>
              <li>Hizmet kalitesinin artırılması ve kullanıcı deneyiminin iyileştirilmesi</li>
              <li>İstatistiksel analiz ve raporlama</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-ustablue mb-3">4. Kişisel Verilerin Aktarılması</h2>
            <p>
              Kişisel verileriniz, yasal zorunluluklar kapsamında yetkili kamu kurum ve kuruluşlarına, 
              hizmet alınan üçüncü kişilere (sunucu, hosting, bulut hizmetleri sağlayıcıları) ve 
              hukuki uyuşmazlıklarda mahkemelere aktarılabilir.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-ustablue mb-3">5. Kişisel Verilerin Saklanması ve İmhası</h2>
            <p>
              Kişisel verileriniz, yasal süreler boyunca saklanmaktadır. Süre sona erdiğinde veya 
              ilgili kişinin silme talebi üzerine, veriler periyodik olarak silinmekte, yok edilmekte 
              veya anonim hale getirilmektedir.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-ustablue mb-3">6. Haklarınız</h2>
            <p>KVKK'nın 11. maddesi kapsamında aşağıdaki haklara sahipsiniz:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
              <li>İşlenmişse buna ilişkin bilgi talep etme</li>
              <li>İşlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme</li>
              <li>Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme</li>
              <li>Eksik veya yanlış işlenmiş olması halinde düzeltilmesini isteme</li>
              <li>KVKK'nın 7. maddesi kapsamında silinmesini veya yok edilmesini isteme</li>
              <li>Düzeltme, silme veya yok etme işlemlerinin aktarıldığı üçüncü kişilere bildirilmesini isteme</li>
              <li>İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme</li>
              <li>Kanuna aykırı işlenmesi sebebiyle zarara uğramanız halinde zararın giderilmesini talep etme</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-ustablue mb-3">7. İletişim</h2>
            <p>
              KVKK kapsamında haklarınızı kullanmak veya bu metin hakkında sorularınız için 
              aşağıdaki iletişim bilgilerinden bize ulaşabilirsiniz:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg mt-3 space-y-2">
              <p><strong>Adres:</strong> İkitelli OSB, Mah. Atatürk Bulvarı No: 20K Başakşehir / İstanbul</p>
              <p><strong>Telefon:</strong> +90 212 123 45 67</p>
              <p><strong>E-posta:</strong> info@ustajobs.com</p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}