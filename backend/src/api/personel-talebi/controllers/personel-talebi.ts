/**
 * personel-talebi controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::personel-talebi.personel-talebi', ({ strapi }) => ({
  async create(ctx) {
    const { data } = ctx.request.body;

    try {
      // 1. Personel Talebi collection'a kaydet
      const talep = await strapi.documents('api::personel-talebi.personel-talebi').create({
        data: {
          pozisyon: data.pozisyon,
          sektor: data.sektor,
          calismaSekli: data.calismaSekli,
          sehir: data.sehir,
          personelSayisi: data.personelSayisi,
          firmaAdi: data.firmaAdi || 'Belirtilmedi',
          yetkiliAd: data.yetkiliAd || '',
          email: data.email || '',
          telefon: data.telefon || '',
          maasAraligi: data.maasAraligi || '',
          baslangicTarihi: data.baslangicTarihi || '',
          aciklama: data.aciklama || '',
          durum: 'new',
        },
      });

      console.log('✅ Personel talebi oluşturuldu:', talep.id);

            // 2. OTOMATİK: Jobs collection'a TASLAK ilan oluştur
      try {
        const slug = data.pozisyon
          .toLowerCase()
          .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
          .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
          .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') + '-' + Date.now();

        console.log('📝 Jobs taslak ilan oluşturuluyor...');

        // Firma adından slug oluştur
        const firmaSlug = (data.firmaAdi || 'firma')
          .toLowerCase()
          .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
          .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
          .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') + '-' + Date.now();

        // Önce aynı isimde firma var mı kontrol et
        let existingCompany = null;
        if (data.firmaAdi && data.firmaAdi !== 'Belirtilmedi') {
          const companies = await strapi.documents('api::company.company').findMany({
            filters: {
              name: data.firmaAdi,
            },
          });
          
          if (companies && companies.length > 0) {
            existingCompany = companies[0];
            console.log('✅ Mevcut firma bulundu:', existingCompany.id);
          }
        }

                // Firma yoksa yeni oluştur
        let companyId = null;
        if (!existingCompany && data.firmaAdi && data.firmaAdi !== 'Belirtilmedi') {
          const newCompany = await strapi.documents('api::company.company').create({
            data: {
              name: data.firmaAdi,
              slug: firmaSlug,
              description: [{
                type: 'paragraph',
                children: [{
                  type: 'text',
                  text: `${data.firmaAdi} firması Usta Jobs üzerinden personel talebi oluşturmuştur.`
                }]
              }],
              isVerified: false,
            },
            status: 'published', // ✅ DIRECT YAYINLA
          });
          companyId = newCompany.id;
          console.log('✅ Yeni firma oluşturuldu ve yayınlandı:', newCompany.id);
        } else if (existingCompany) {
          companyId = existingCompany.id;
        }

        const jobData: any = {
          title: data.pozisyon,
          slug: slug,
          city: data.sehir,
          positionType: data.calismaSekli,
          salary: data.maasAraligi || 'Görüşülecek',
          isActive: false,
          talepEmail: data.email || '',
          talepFirma: data.firmaAdi || '',
          talepYetkili: data.yetkiliAd || '',
          talepEmailGonderildi: false,
          description: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: data.aciklama || `${data.pozisyon} pozisyonu için ${data.sektor} sektöründe ${data.calismaSekli} çalışma şekli ile personel aranmaktadır.`
                }
              ]
            }
          ],
          requirements: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Detaylı gereksinimler için lütfen ilan detaylarını inceleyin veya bizimle iletişime geçin.'
                }
              ]
            }
          ],
        };

        // Firma ilişkisi varsa ekle
        if (companyId) {
          jobData.company = companyId;
        }

        const job = await strapi.documents('api::job.job').create({
          data: jobData,
          status: 'draft',
        });

        console.log('✅ Jobs taslak ilan oluşturuldu:', job.id);
      } catch (jobError) {
        console.error('❌ Jobs taslak ilan oluşturma hatası:', jobError);
      }

      // 3. Admin'e email gönder
      await strapi.plugin('email').service('email').send({
        to: 'sales@ustajobs.be',
        from: 'Usta Jobs <noreply@ustajobs.be>',
        subject: `Yeni Personel Talebi: ${data.pozisyon}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1e3a5f;">Yeni Personel Talebi</h2>
            <hr style="border: 2px solid #f97316;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding:8px;font-weight:bold;color:#1e3a5f;">Firma:</td><td style="padding:8px;">${data.firmaAdi || '-'}</td></tr>
              <tr><td style="padding:8px;font-weight:bold;color:#1e3a5f;">Yetkili:</td><td style="padding:8px;">${data.yetkiliAd || '-'}</td></tr>
              <tr><td style="padding:8px;font-weight:bold;color:#1e3a5f;">İletişim:</td><td style="padding:8px;">${data.email || '-'} / ${data.telefon || '-'}</td></tr>
              <tr><td style="padding:8px;font-weight:bold;color:#1e3a5f;">Pozisyon:</td><td style="padding:8px;">${data.pozisyon}</td></tr>
              <tr><td style="padding:8px;font-weight:bold;color:#1e3a5f;">Sektör:</td><td style="padding:8px;">${data.sektor}</td></tr>
              <tr><td style="padding:8px;font-weight:bold;color:#1e3a5f;">Çalışma Şekli:</td><td style="padding:8px;">${data.calismaSekli}</td></tr>
              <tr><td style="padding:8px;font-weight:bold;color:#1e3a5f;">Şehir:</td><td style="padding:8px;">${data.sehir}</td></tr>
              <tr><td style="padding:8px;font-weight:bold;color:#1e3a5f;">Personel Sayısı:</td><td style="padding:8px;">${data.personelSayisi}</td></tr>
            </table>
            <div style="background:#fef3c7;border-left:4px solid #f59e0b;padding:12px;margin-top:20px;border-radius:4px;">
              <p style="margin:0;color:#92400e;font-size:14px;"><strong>ℹ️ Bilgi:</strong> Bu talep otomatik olarak iş ilanlarına <strong>TASLAK</strong> olarak eklendi. Strapi Admin'den düzenleyip "Publish" butonuna basarak yayına alabilirsiniz.</p>
            </div>
            <hr style="margin-top:30px;">
            <p style="color:#6b7280;font-size:12px;">Bu talep ${new Date().toLocaleString('tr-TR')} tarihinde gönderildi.</p>
          </div>
        `,
      });

      // 4. İşverene onay email'i gönder
      if (data.email) {
        await strapi.plugin('email').service('email').send({
          to: data.email,
          from: 'Usta Jobs <noreply@ustajobs.be>',
          replyTo: 'sales@ustajobs.be',
          subject: `Personel Talebiniz Alındı - ${data.pozisyon}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background: #1e3a5f; padding: 20px; text-align: center;">
                <h1 style="color: white; margin: 0; font-size: 24px;">Usta Jobs</h1>
                <p style="color: #f97316; margin: 5px 0 0 0; font-size: 12px;">Doğru İnsan, Doğru İş</p>
              </div>
              
              <div style="padding: 30px 20px;">
                <h2 style="color: #1e3a5f;">Merhaba ${data.yetkiliAd || data.firmaAdi},</h2>
                
                <p style="line-height: 1.6; color: #374151;">
                  Personel talebiniz bize ulaştı. Ekibimiz en kısa sürede inceleyecek ve sizinle iletişime geçecektir.
                </p>

                <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <h3 style="color: #1e3a5f; margin-top: 0;">Talep Detaylarınız:</h3>
                  <table style="width: 100%; border-collapse: collapse;">
                    <tr><td style="padding: 6px 0; color: #6b7280;">Firma:</td><td style="padding: 6px 0; font-weight: bold;">${data.firmaAdi}</td></tr>
                    <tr><td style="padding: 6px 0; color: #6b7280;">Pozisyon:</td><td style="padding: 6px 0; font-weight: bold;">${data.pozisyon}</td></tr>
                    <tr><td style="padding: 6px 0; color: #6b7280;">Sektör:</td><td style="padding: 6px 0; font-weight: bold;">${data.sektor}</td></tr>
                    <tr><td style="padding: 6px 0; color: #6b7280;">Çalışma Şekli:</td><td style="padding: 6px 0; font-weight: bold;">${data.calismaSekli}</td></tr>
                    <tr><td style="padding: 6px 0; color: #6b7280;">Şehir:</td><td style="padding: 6px 0; font-weight: bold;">${data.sehir}</td></tr>
                    <tr><td style="padding: 6px 0; color: #6b7280;">Personel Sayısı:</td><td style="padding: 6px 0; font-weight: bold;">${data.personelSayisi}</td></tr>
                  </table>
                </div>

                <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; border-radius: 4px;">
                  <h4 style="color: #92400e; margin-top: 0;">Sonraki Adımlar:</h4>
                  <ol style="color: #78350f; line-height: 1.8; margin: 10px 0; padding-left: 20px;">
                    <li>Talebiniz ekibimiz tarafından inceleniyor</li>
                    <li>Size özel aday havuzumuzdan uygun adaylar belirleniyor</li>
                    <li>24 saat içinde sizinle iletişime geçilecek</li>
                    <li>İlan onaylandıktan sonra yayına alınacak ve size bildirilecek</li>
                  </ol>
                </div>

                <div style="text-align: center; margin: 30px 0;">
                  <p style="color: #6b7280; margin-bottom: 10px;">Acil durumlar için bize ulaşın:</p>
                  <a href="tel:+902121234567" style="display: inline-block; background: #f97316; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 5px;">
                    📞 +90 212 123 45 67
                  </a>
                  <a href="https://wa.me/905321234567" style="display: inline-block; background: #25D366; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 5px;">
                    💬 WhatsApp
                  </a>
                </div>
              </div>

              <div style="background: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
                <p style="color: #6b7280; font-size: 12px; margin: 0;">
                  Bu email otomatik olarak gönderilmiştir. Sorularınız için sales@ustajobs.be adresine yazabilirsiniz.
                </p>
                <p style="color: #9ca3af; font-size: 11px; margin: 10px 0 0 0;">
                  © 2026 Usta Jobs. Tüm hakları saklıdır.
                </p>
              </div>
            </div>
          `,
        });

        console.log('✅ İşverene onay emaili gönderildi:', data.email);
      }

      return ctx.send({ 
        data: talep,
        message: 'Talebiniz alındı. Detaylı inceleme sonrası ilanınız yayına alınacaktır.',
        success: true 
      });
    } catch (error) {
      console.error('❌ Personel talebi hatası:', error);
      return ctx.badRequest('Talep oluşturulamadı. Lütfen tekrar deneyin.');
    }
  },
}));