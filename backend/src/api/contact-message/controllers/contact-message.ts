'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::contact-message.contact-message', ({ strapi }) => ({
  async send(ctx) {
    const { adSoyad, email, telefon, konu, mesaj } = ctx.request.body;

    try {
      // Veritabanına kaydet
      await strapi.entityService.create('api::contact-message.contact-message', {
        data: {
          adSoyad,
          email,
          telefon,
          konu,
          mesaj,
        },
      });

      // Admin'e email gönder
      await strapi.plugin('email').service('email').send({
        to: 'sales@ustajobs.be',
        from: 'Usta Jobs <noreply@ustajobs.be>',
        subject: `Yeni İletişim Formu: ${konu}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1e3a5f;">Yeni İletişim Mesajı</h2>
            <hr style="border: 2px solid #f97316;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px; font-weight: bold; color: #1e3a5f;">Ad Soyad:</td>
                <td style="padding: 8px;">${adSoyad}</td>
              </tr>
              <tr>
                <td style="padding: 8px; font-weight: bold; color: #1e3a5f;">Email:</td>
                <td style="padding: 8px;">${email}</td>
              </tr>
              <tr>
                <td style="padding: 8px; font-weight: bold; color: #1e3a5f;">Telefon:</td>
                <td style="padding: 8px;">${telefon}</td>
              </tr>
              <tr>
                <td style="padding: 8px; font-weight: bold; color: #1e3a5f;">Konu:</td>
                <td style="padding: 8px;">${konu}</td>
              </tr>
            </table>
            <h3 style="color: #1e3a5f; margin-top: 20px;">Mesaj:</h3>
            <p style="background: #f3f4f6; padding: 15px; border-radius: 8px; line-height: 1.6;">${mesaj}</p>
            <hr style="margin-top: 30px;">
            <p style="color: #6b7280; font-size: 12px;">
              Bu mesaj ${new Date().toLocaleString('tr-TR')} tarihinde Usta Jobs web sitesinden gönderildi.
            </p>
          </div>
        `,
      });

      // Kullanıcıya bilgilendirme email'i
      await strapi.plugin('email').service('email').send({
        to: email,
        from: 'Usta Jobs <noreply@ustajobs.be>',
        subject: 'Mesajınız Alındı - Usta Jobs',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1e3a5f;">Merhaba ${adSoyad},</h2>
            <p style="line-height: 1.6;">Mesajınız bize ulaştı. En kısa sürede size dönüş yapacağız.</p>
            <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #1e3a5f; margin-top: 0;">Gönderdiğiniz Mesaj:</h3>
              <p style="line-height: 1.6;">${mesaj}</p>
            </div>
            <p style="line-height: 1.6;">
              Acil durumlar için bizi şu numaradan arayabilirsiniz:<br>
              <strong style="color: #f97316;">+90 212 123 45 67</strong>
            </p>
            <hr style="margin-top: 30px;">
            <p style="color: #6b7280; font-size: 12px;">
              Saygılarımızla,<br>
              <strong style="color: #1e3a5f;">Usta Jobs Ekibi</strong><br>
              <a href="https://ustajobs.be" style="color: #f97316;">ustajobs.be</a>
            </p>
          </div>
        `,
      });

      return ctx.send({ 
        message: 'Mesajınız başarıyla gönderildi',
        success: true 
      });
    } catch (error) {
      console.error('Email gönderme hatası:', error);
      return ctx.badRequest('Mesaj gönderilemedi. Lütfen tekrar deneyin.');
    }
  },
}));