export default {
  async send(ctx) {
    const { adSoyad, email, telefon, konu, mesaj } = ctx.request.body;
    
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
    
    // Email gönder (opsiyonel)
    // ...
    
    return ctx.send({ message: 'Mesaj gönderildi' });
  },
};