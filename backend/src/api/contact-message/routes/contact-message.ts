'use strict';

module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/contact-messages/send',
      handler: 'contact-message.send',
      config: {
        auth: false,
      },
    },
    // Mevcut CRUD route'ları için
    {
      method: 'GET',
      path: '/contact-messages',
      handler: 'contact-message.find',
      config: {
        auth: false,
      },
    },
    {
      method: 'GET',
      path: '/contact-messages/:id',
      handler: 'contact-message.findOne',
      config: {
        auth: false,
      },
    },
    {
      method: 'PUT',
      path: '/contact-messages/:id',
      handler: 'contact-message.update',
      config: {
        auth: false,
      },
    },
    {
      method: 'DELETE',
      path: '/contact-messages/:id',
      handler: 'contact-message.delete',
      config: {
        auth: false,
      },
    },
  ],
};