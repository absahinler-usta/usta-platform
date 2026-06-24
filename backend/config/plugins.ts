export default ({ env }) => ({
  email: {
    config: {
      provider: 'nodemailer',
      providerOptions: {
        host: env('SMTP_HOST', 'mail.ustajobs.be'),
        port: env('SMTP_PORT', 587),
        secure: env('SMTP_SECURE', 'false') === 'true',
        auth: {
          user: env('SMTP_USERNAME'),
          pass: env('SMTP_PASSWORD'),
        },
        // ⚠️ GEÇİCİ: SSL sertifikası sorunlu, doğrulamayı atla
        tls: {
          rejectUnauthorized: false,
        },
      },
      settings: {
        defaultFrom: 'Usta Jobs <noreply@ustajobs.be>',
        defaultReplyTo: env('EMAIL_REPLY_TO', 'sales@ustajobs.be'),
      },
    },
  },
});