import React, { useState } from 'react';
import { Flex, Box, Text } from 'rebass';
import { Helmet } from 'react-helmet';
import GatsbyLink from 'gatsby-link';

import config from '../../../gatsbystorefront-config';
import ProductBuyNow from '../product/ProductBuyNow';
import FeaturedProductPrice from '../../templates/product/FeaturedProductPrice';
import strings from '@gatsbystorefront/gatsby-theme-storefront-shopify/src/templates/product/strings';
import substrDescription from '@gatsbystorefront/gatsby-theme-storefront-shopify/src/utils/substrDescription.js';
import shortcodeParser from '@gatsbystorefront/gatsby-theme-storefront-shopify/src/utils/shortcode-parser';
import ProductCounter from '@gatsbystorefront/gatsby-theme-storefront-shopify/src/components/ProductCounter';
import Payments from '@gatsbystorefront/gatsby-theme-storefront-shopify/src/components/Payments';
import ShareButtons from '@gatsbystorefront/gatsby-theme-storefront-shopify/src/components/ShareButtons';
import Divider from '@gatsbystorefront/gatsby-theme-storefront-shopify/src/components/Divider';
import ProductGalleryCurrentImage from '@gatsbystorefront/gatsby-theme-storefront-shopify/src/templates/product/ProductGalleryCurrentImage';
import ProductGalleryThumbnails from '@gatsbystorefront/gatsby-theme-storefront-shopify/src/templates/product/ProductGalleryThumbnails';
import { CurrentVariantContextProvider } from '@gatsbystorefront/gatsby-theme-storefront-shopify/src/templates/product/CurrentVariantContext';
import { CurrentImageContextProvider } from '@gatsbystorefront/gatsby-theme-storefront-shopify/src/templates/product/CurrentImageContext';
import DescriptionBox from '@gatsbystorefront/gatsby-theme-storefront-shopify/src/templates/product/DescriptionBox';

const {
  productQuantityLabel,
  paymentsLabel,
  shareButtonsLabel,
  productTypeLabel,
} = strings;

function removeTrailingLeadingSlashes(string) {
    return string.replace(/^\/*|\/*$/g, '');
}

function ProductPage({ data, location }) {
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
            fields,
        },
    } = data;

    let { cartPagePath = 'cart', basePath = '' } = options;
    basePath = removeTrailingLeadingSlashes(basePath);
    cartPagePath = removeTrailingLeadingSlashes(cartPagePath);
    const cartUrl = `${basePath && `/${basePath}`}/${cartPagePath}`;
  
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
                <ProductGalleryCurrentImage images={images} title={title} />
            </Box>

            <Flex
                flexDirection="column"
                width={[1, null, 4 / 10]}
                px={[2, null, 3]}
                data-product-info
                order={3}
            >
                <Box>
                    <GatsbyLink
                        to={fields.shopifyThemePath}
                        style={{ textDecoration: 'none', fontSize: 24, color: '#000', fontWeight: 500 }}
                        data-title-box
                    >
                        {title}
                    </GatsbyLink>
                    <FeaturedProductPrice
                        variant={variants[0]}
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
                    <ProductBuyNow
                        amount={currentAmount}
                        cartUrl={cartUrl}
                        variant={variants[0]}
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
