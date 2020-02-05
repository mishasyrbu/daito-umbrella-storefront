require('dotenv').config({
  path: `.env`,
})
module.exports = {
  pathPrefix: '/daito-umbrella-storefront',
  plugins: [
    {
      resolve: '@gatsbystorefront/gatsby-theme-storefront-shopify',
      options: {
        shopName: process.env.GATSBY_SHOP_NAME,
        accessToken: process.env.GATSBY_SHOPIFY_ACCESS_TOKEN,
        basePath: '/',
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: 'slider-images',
        path: `${__dirname}/static/images/slider`,
      },
    },
  ],
}
