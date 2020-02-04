import React, { useState } from 'react';
import { Flex, Box, Text } from 'rebass';
import { Helmet } from 'react-helmet';

import config from '../../../../../gatsbystorefront-config';
import strings from '@gatsbystorefront/gatsby-theme-storefront-shopify/src/templates/product/strings';
import substrDescription from '@gatsbystorefront/gatsby-theme-storefront-shopify/src/utils/substrDescription.js';
import shortcodeParser from '@gatsbystorefront/gatsby-theme-storefront-shopify/src/utils/shortcode-parser';
import ProductCounter from '@gatsbystorefront/gatsby-theme-storefront-shopify/src/components/ProductCounter';
import Payments from '@gatsbystorefront/gatsby-theme-storefront-shopify/src/components/Payments';
import ShareButtons from '@gatsbystorefront/gatsby-theme-storefront-shopify/src/components/ShareButtons';
import Divider from '@gatsbystorefront/gatsby-theme-storefront-shopify/src/components/Divider';
import Breadcrumbs from '@gatsbystorefront/gatsby-theme-storefront-shopify/src/components/Breadcrumbs';
import ProductGalleryCurrentImage from '@gatsbystorefront/gatsby-theme-storefront-shopify/src/templates/product/ProductGalleryCurrentImage';
import ProductGalleryThumbnails from '@gatsbystorefront/gatsby-theme-storefront-shopify/src/templates/product/ProductGalleryThumbnails';
import { CurrentVariantContextProvider } from '@gatsbystorefront/gatsby-theme-storefront-shopify/src/templates/product/CurrentVariantContext';
import { CurrentImageContextProvider } from '@gatsbystorefront/gatsby-theme-storefront-shopify/src/templates/product/CurrentImageContext';
import DescriptionBox from '@gatsbystorefront/gatsby-theme-storefront-shopify/src/templates/product/DescriptionBox';
import ProductVariantSelector from '@gatsbystorefront/gatsby-theme-storefront-shopify/src/templates/product/ProductVariantSelector';
import ProductVariantAddToCart from '@gatsbystorefront/gatsby-theme-storefront-shopify/src/templates/product/ProductVariantAddToCart';
import ProductVariantPrice from '@gatsbystorefront/gatsby-theme-storefront-shopify/src/templates/product/ProductVariantPrice';

const {
  productQuantityLabel,
  paymentsLabel,
  shareButtonsLabel,
  productTypeLabel,
} = strings;

function ProductPage({ data, pageContext, location }) {
  const [currentAmount, setCurrentAmount] = useState(1);

  const {
    product: {
      title,
      description,
      descriptionHtml,
      images,
      variants,
      options,
      productType,
    },
  } = data;

  // There are cases when product doesn't belong to any collection.
  // In this case we need to set a guard in case "collection" and "fields" props undefined.
  const { collection } = data || {};
  const { fields } = collection || {};
  const { title: collectionTitle } = collection || {
    title: null,
  };
  const { shopifyThemePath: collectionPath } = fields || {
    shopifyThemePath: null,
  };

  const { cartUrl } = pageContext;
  const { payments, shareButtons } = config;

  function increaseAmount() {
    setCurrentAmount(a => a + 1);
  }

  function decreaseAmount() {
    setCurrentAmount(a => (a <= 1 ? 1 : a - 1));
  }

  const getShortDescription = descriptionHtml => {
    let shortDescrition_temp;
    return {
      withoutShortDescription: shortcodeParser.parseInContext(descriptionHtml, {
        short_description: (buf, opts) => {
          shortDescrition_temp = buf;
          return ''; // return but not using it
        },
      }),
      shortDescription: shortDescrition_temp,
    };
  };
  const { withoutShortDescription, shortDescription } = getShortDescription(
    descriptionHtml
  );

  return (
    <CurrentVariantContextProvider>
      <CurrentImageContextProvider>
        <Helmet>
          {/* Google's meta description length is up to 920 pixels, which might
          allow for up to 158 characters. On mobile devices, the max limit is
          about 680 pixels and 120 characters. Oct 1, 2019 */}
          <meta
            name="description"
            content={
              shortDescription
                ? substrDescription(shortDescription, 158)
                : substrDescription(description, 158)
            }
          />
        </Helmet>
        <Flex
          flexDirection={['column', null, 'row']}
          pt={3}
          px={4}
          mx="auto"
          sx={{ maxWidth: 1300 }}
          fontFamily="body"
        >
          {images && images.length > 1 ? (
            <Box
              width={[1, null, 1 / 10]}
              py={2}
              px={[2, null, 0]}
              order={[2, null, 1]}
            >
              <ProductGalleryThumbnails images={images} title={title} />
            </Box>
          ) : (
            ''
          )}
          <Box
            width={
              images && images.length > 1
                ? [1, null, 5 / 10]
                : [1, null, 6 / 10]
            }
            ml="auto"
            py={2}
            pr={images && images.length > 1 ? [2, null, 3] : [2, null, 3]}
            pl={images && images.length > 1 ? [2, null, 3] : [2, null, 0]}
            data-product-image-container
            order={[1, null, 2]}
          >
            {/* Breadcrumbs block 1 for mobile */}
            <Box mb={1} sx={{ display: ['block', 'block', 'none'] }}>
              <Breadcrumbs
                productTitle={title}
                collectionTitle={collectionTitle}
                collectionPath={collectionPath}
                separator="/"
              />
            </Box>

            <ProductGalleryCurrentImage images={images} title={title} />
          </Box>

          <Flex
            flexDirection="column"
            width={[1, null, 4 / 10]}
            px={[2, null, 3]}
            data-product-info
            order={3}
          >
            {/* Breadcrumbs block 2 for desktop */}
            <Box sx={{ display: ['none', 'none', 'block'] }} pt={1}>
              <Breadcrumbs
                productTitle={title}
                collectionTitle={collectionTitle}
                collectionPath={collectionPath}
                separator="/"
              />
            </Box>
            <Box>
              <Text as="h1" mb={3} data-title-box>
                {title}
              </Text>
              <ProductVariantPrice
                initialDisplayPrice={variants[0].price}
                mb={3}
              />
              {shortDescription ? (
                <DescriptionBox
                  source={shortDescription}
                  escapeHtml={false}
                  mb={3}
                />
              ) : (
                ''
              )}
            </Box>

            <ProductVariantSelector
              variants={variants}
              options={options}
              pageContext={pageContext}
              mb={4}
            />

            <Flex alignItems="center" mb={4}>
              <Box mr={2}>
                <Text>{productQuantityLabel}</Text>
              </Box>
              <Box width={0.2}>
                <ProductCounter
                  decreaseAmount={decreaseAmount}
                  increaseAmount={increaseAmount}
                  currentAmount={currentAmount}
                />
              </Box>
            </Flex>

            <Flex mb={4}>
              <Box>
                <ProductVariantAddToCart
                  amount={currentAmount}
                  cartUrl={cartUrl}
                />
              </Box>
            </Flex>

            <Flex mb={4}>
              <Box>
                <Text>{paymentsLabel}</Text>
                <Payments payments={payments} />
              </Box>
            </Flex>

            <Divider bg="grey" mb={4} />

            {productType ? (
              <Flex mb={4}>
                <Box mr={2}>
                  <Text>{productTypeLabel}</Text>
                </Box>
                <Box>{productType}</Box>
              </Flex>
            ) : (
              ''
            )}

            <Flex mb={4} alignItems="center">
              <Box mr={2}>
                <Text>{shareButtonsLabel}</Text>
              </Box>
              <Box>
                <ShareButtons buttons={shareButtons} location={location.href} />
              </Box>
            </Flex>
          </Flex>
        </Flex>

        <Flex
          pt={3}
          px={4}
          mx="auto"
          style={{ maxWidth: 1300 }}
          fontFamily="body"
        >
          <Box width={1}>
            <Divider bg="grey" mb={4} />
            <DescriptionBox
              pt={3}
              source={withoutShortDescription}
              escapeHtml={false}
            />
          </Box>
        </Flex>
      </CurrentImageContextProvider>
    </CurrentVariantContextProvider>
  );
}

export default ProductPage;
