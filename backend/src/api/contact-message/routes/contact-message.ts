export default {
  routes: [
    {
      method: 'POST',
      path: '/contact-messages/send',
      handler: 'contact-message.send',
      config: {
        policies: [],
      },
    },
  ],
};