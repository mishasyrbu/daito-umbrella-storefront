module.exports = {
  storeName: 'DAITO UMBRELLA SHOP',
  storeDescription: 'Demo store description',
    email: 'info@daito-umbrella.com',
    company: 'Daito Umbrella Shop',
    // location: 'New York, NY',
    // address: '1 Centre St.',
    // phone: '+1 (800) 123-1234',
    // workingDays: 'Mon - Fri',
    // workingHours: '8AM - 6PM',
    socialNetworks: [
      'https://facebook.com/daitoumbrella',
      // 'https://instagram.com',
      // 'https://pinterest.com',
      // 'https://twitter.com',
      // 'https://youtube.com',
    ],
    payments: [
      'visa',
      'mastercard',
      'amex',
      // 'discover',
      // 'shopify',
      'paypal',
      'applepay',
    ],
    // For available socia share buttons see: https://github.com/nygardk/react-share
    shareButtons: [
      'Facebook',
      'Pinterest',
      'Twitter',
      // 'Tumblr',
      'Whatsapp',
      // 'Line',
      'Viber',
    ],
    googleAnalyticsId: 'UA-141525658-3',
    //
    // carousel, collection, product
    //
    mainPage: [
      {
        type: 'carousel',
        children: [
          {
            name: 'Jewelery',
            type: 'collection',
            handle: 'jewelery',
          },
          {
            name: 'Apparel',
            type: 'collection',
            handle: 'apparel',
            textColor: 'white',
            textBgColor: 'primary',
          },
          {
            name: 'Silk Summer Top',
            type: 'product',
            handle: 'silk-summer-top',
            textColor: 'white',
            textBgColor: 'primary',
          },
        ],
      },
      {
        name: 'Apparel',
        type: 'collection',
        handle: 'apparel',
        textColor: 'white',
        textBgColor: 'primary',
      },
      {
        name: 'Garden',
        type: 'collection',
        handle: 'garden',
        textColor: 'white',
        textBgColor: 'primary',
      },
      {
        name: 'Test',
        type: 'collection',
        handle: 'test-collection',
      },
      {
        name: 'One product',
        type: 'product',
        handle: 'red-sports-tee',
      },
      {
        name: 'Anchor Bracelet Mens',
        type: 'product',
        handle: 'leather-anchor',
      },
      {
        name: 'Yellow Sofa',
        type: 'product',
        handle: 'yellow-sofa',
      },
      {
        name: '7 Shakra Bracelet',
        type: 'product',
        handle: 'chain-bracelet',
      },
      {
        name: 'White Cotton Shirt',
        type: 'product',
        handle: 'white-cotton-shirt',
        textColor: 'white',
        textBgColor: 'primary',
      },
    ],
    footerLinks: [
      // {
      //   name: 'About us',
      //   link: '/pages/about',
      // },
      {
        name: 'Terms of Service',
        link: '/policy/termsOfService',
      },
      {
        name: 'Privacy policy',
        link: '/policy/privacyPolicy',
      },
      {
        name: 'Refunds',
        link: '/policy/refundPolicy',
      },
      {
        name: 'Contact Us',
        link: '/pages/contact-us',
      },
    ],
    locales: 'en-US',
    currency: 'USD',
    productsPerCollectionPage: '9',
    articlesPerBlogPage: '6',
  };
  