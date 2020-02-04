import React, { useState, useEffect } from 'react';
import { Flex, Box, Text } from 'rebass';

import formatPrice from '@gatsbystorefront/gatsby-theme-storefront-shopify/src/utils/formatPrice';
import strings from './strings.json';

const FeaturedProductPrice = ({ initialDisplayPrice = 0, mb = 0, variant }) => {
  const { productPriceLabel, productCompareAtPriceLabel } = strings;
  
  const [displayPrice, setDisplayPrice] = useState(
    formatPrice(initialDisplayPrice)
  );
  const [compareAtPrice, setCompareAtPrice] = useState();

  useEffect(() => {
    if (variant && variant.hasOwnProperty('price')) {
        variant.price
        ? setDisplayPrice(formatPrice(variant.price))
        : setDisplayPrice(formatPrice(initialDisplayPrice));

        variant.compareAtPrice
        ? setCompareAtPrice(formatPrice(variant.compareAtPrice))
        : setCompareAtPrice(false);
    }
  }, [variant, initialDisplayPrice]);

  return (
    <React.Fragment>
      <Flex>
        {compareAtPrice ? (
          <Box mr={2}>
            <Text fontSize={[1, 2]}>
              {productCompareAtPriceLabel}{' '}
              <Text as="strike">{compareAtPrice}</Text>
            </Text>
          </Box>
        ) : (
          ''
        )}
      </Flex>
      <Flex mb={mb}>
        <Box>
          {productPriceLabel}{' '}
          <Text as="span" color="primary" fontSize={[3, 4]}>
            {displayPrice}
          </Text>
        </Box>
      </Flex>
    </React.Fragment>
  );
};

export default FeaturedProductPrice;
