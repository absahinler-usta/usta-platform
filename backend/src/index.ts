export default {
  register() {},
  
  async bootstrap({ strapi }: { strapi: any }) {
    console.log('🚀 Strapi bootstrap başladı...');

    // Job document service'ini al
    const jobService = strapi.documents('api::job.job');
    
    // Orijinal publish fonksiyonunu kaydet
    const originalPublish = jobService.publish.bind(jobService);

    // publish fonksiyonunu override et
    jobService.publish = async function(params: any) {
      console.log('🔍 CUSTOM PUBLISH FONKSİYONU ÇAĞRILDI');
      console.log('Params:', params);

      // Önce orijinal publish işlemini yap
      const result = await originalPublish(params);
      
      console.log('✅ Orijinal publish tamamlandı');
      console.log('Result:', result);

      // Result'tan document bilgilerini al
      const publishedJob = Array.isArray(result) ? result[0] : result;

      if (publishedJob?.documentId) {
        // Document'i tam bilgilerle çek
        const fullJob = await strapi.documents('api::job.job').findOne({
          documentId: publishedJob.documentId,
          status: 'published',
        });

        console.log('📄 Full job bilgileri:');
        console.log('Title:', fullJob?.title);
        console.log('Slug:', fullJob?.slug);
        console.log('talepEmail:', fullJob?.talepEmail);
        console.log('talepEmailGonderildi:', fullJob?.talepEmailGonderildi);

        // talepEmail varsa ve daha önce email gönderilmemişse
        if (
          fullJob?.talepEmail &&
          fullJob.talepEmail.trim() !== '' &&
          !fullJob?.talepEmailGonderildi
        ) {
          const ilanUrl = `https://ustajobs.be/is-arayanlar/${fullJob.slug}`;
          const ilanBaslik = fullJob.title || 'İlan';

          console.log('📧 İlan yayında emaili gönderiliyor...');
          console.log('Email:', fullJob.talepEmail);
          console.log('İlan URL:', ilanUrl);

          try {
            await strapi.plugin('email').service('email').send({
              to: fullJob.talepEmail,
              from: 'Usta Jobs <noreply@ustajobs.be>',
              replyTo: 'sales@ustajobs.be',
              subject: `🎉 İlanınız Yayında! - ${ilanBaslik}`,
              html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                  <div style="background: linear-gradient(135deg, #1e3a5f 0%, #f97316 100%); padding: 30px; text-align: center;">
                    <h1 style="color: white; margin: 0; font-size: 28px;">🎉 Tebrikler!</h1>
                    <p style="color: white; margin: 10px 0 0 0; font-size: 16px;">İlanınız yayına alındı</p>
                  </div>
                  
                  <div style="padding: 30px 20px; background: white;">
                    <h2 style="color: #1e3a5f;">Merhaba,</h2>
                    
                    <p style="line-height: 1.6; color: #374151; font-size: 16px;">
                      <strong>"${ilanBaslik}"</strong> başlıklı personel talebiniz ekibimiz tarafından onaylanmış ve 
                      web sitemizde yayına alınmıştır!
                    </p>

                    <div style="background: #f0fdf4; border: 2px solid #10b981; padding: 20px; border-radius: 8px; margin: 25px 0; text-align: center;">
                      <p style="color: #065f46; margin: 0 0 15px 0; font-size: 14px; font-weight: bold;">
                        ✅ İLANINIZ ŞİMDİ YAYINDA
                      </p>
                      <a href="${ilanUrl}" style="display: inline-block; background: #f97316; color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; box-shadow: 0 4px 6px rgba(249, 115, 22, 0.3);">
                        🚀 Yayındaki İlanınızı Görüntüleyin
                      </a>
                      <p style="color: #6b7280; margin: 15px 0 0 0; font-size: 12px; word-break: break-all;">
                        ${ilanUrl}
                      </p>
                    </div>

                    <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                      <h3 style="color: #1e3a5f; margin-top: 0;">İlan Detayları:</h3>
                      <table style="width: 100%; border-collapse: collapse;">
                        <tr><td style="padding: 6px 0; color: #6b7280;">Pozisyon:</td><td style="padding: 6px 0; font-weight: bold;">${fullJob.title}</td></tr>
                        <tr><td style="padding: 6px 0; color: #6b7280;">Şehir:</td><td style="padding: 6px 0; font-weight: bold;">${fullJob.city || '-'}</td></tr>
                        <tr><td style="padding: 6px 0; color: #6b7280;">Çalışma Şekli:</td><td style="padding: 6px 0; font-weight: bold;">${fullJob.positionType || '-'}</td></tr>
                        <tr><td style="padding: 6px 0; color: #6b7280;">Maaş:</td><td style="padding: 6px 0; font-weight: bold;">${fullJob.salary || 'Görüşülecek'}</td></tr>
                      </table>
                    </div>

                    <div style="text-align: center; margin: 30px 0;">
                      <p style="color: #6b7280; margin-bottom: 10px;">Herhangi bir sorunuz mu var?</p>
                      <a href="mailto:sales@ustajobs.be" style="display: inline-block; background: #1e3a5f; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 5px;">
                        ✉️ sales@ustajobs.be
                      </a>
                      <a href="https://wa.me/905321234567" style="display: inline-block; background: #25D366; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 5px;">
                        💬 WhatsApp
                      </a>
                    </div>
                  </div>

                  <div style="background: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
                    <p style="color: #6b7280; font-size: 12px; margin: 0;">
                      Bu email otomatik olarak gönderilmiştir.
                    </p>
                    <p style="color: #9ca3af; font-size: 11px; margin: 10px 0 0 0;">
                      © 2026 Usta Jobs. Tüm hakları saklıdır.
                    </p>
                  </div>
                </div>
              `,
            });

            // Email gönderildiğini işaretle
            await strapi.documents('api::job.job').update({
              documentId: fullJob.documentId,
              data: {
                talepEmailGonderildi: true,
              },
            });

            console.log('✅ İşverene "İlan Yayında" emaili gönderildi:', fullJob.talepEmail);
          } catch (emailError) {
            console.error('❌ Email gönderme hatası:', emailError);
          }
        }
      }

      return result;
    };

    console.log('✅ Job publish fonksiyonu override edildi');
  },
};