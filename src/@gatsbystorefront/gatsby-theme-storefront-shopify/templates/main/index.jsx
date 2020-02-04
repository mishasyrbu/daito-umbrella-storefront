import React from 'react';
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';

import MainPage from './MainPage';
import Layout from '@gatsbystorefront/gatsby-theme-storefront-shopify/src/components/Layout';
import strings from '@gatsbystorefront/gatsby-theme-storefront-shopify/src/templates/main/strings.json';
import config from '../../../../../gatsbystorefront-config';

const { pageTitleTemplate } = strings;
const { storeName, storeDescription } = config;

export default props => {
  return (
    <Layout>
      <Helmet title={storeName} titleTemplate={pageTitleTemplate} defer={false}>
        <meta name="description" content={storeDescription} />
      </Helmet>
      <MainPage {...props} />
    </Layout>
  );
};

export const mainPageQuery = graphql`
    query mainPageQueryAndMainPageQuery {
        product: shopifyProduct(tags: {in: "main-product"}) {
            id
            shopifyId
            title
            tags
            title,
            description
            descriptionHtml
            options {
                name
                values
            }
            productType
            fields {
                shopifyThemePath
            }
            availableForSale
            priceRange {
                minVariantPrice {
                amount
                currencyCode
                }
                maxVariantPrice {
                amount
                currencyCode
                }
            }
            variants {
                availableForSale
                compareAtPrice
                title
                price
                shopifyId
                sku
                weight
                weightUnit
                image {
                  id
                  altText
                  localFile {
                    childImageSharp {
                      main: fluid(maxWidth: 800) {
                        ...GatsbyImageSharpFluid_withWebp
                      }
                      thumbnail: fluid(maxWidth: 200, maxHeight: 200) {
                        ...GatsbyImageSharpFluid_withWebp
                      }
                    }
                  }
                }
                selectedOptions {
                  name
                  value
                }
            }
            images {
                id
                altText
                localFile {
                    childImageSharp {
                    main: fluid(maxWidth: 800) {
                        ...GatsbyImageSharpFluid_withWebp
                    }
                    thumbnail: fluid(maxWidth: 200, maxHeight: 200) {
                        ...GatsbyImageSharpFluid_withWebp
                    }
                    }
                }
            }
        }
    }
`;
