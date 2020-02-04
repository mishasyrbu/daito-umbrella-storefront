import React, { useState, useEffect } from 'react';
import { Button } from 'rebass';
import { navigate } from 'gatsby';

import useShopifyFunctions from '@gatsbystorefront/gatsby-theme-storefront-shopify/src/hooks/useShopifyFunctions';
import strings from './strings.json';

const ProductBuyNow = ({ amount, cartUrl, variant }) => {
  const { addItem } = useShopifyFunctions();
  const [disabled, setDisabled] = useState(false);

  const { productBuyNowButton, productBuyNowSoldoutButton } = strings;

  async function addToCartHandler(id, amount) {
    await addItem({ variantId: id, quantity: amount });
    navigate(cartUrl);
  }

  useEffect(() => {
    if (variant && variant.hasOwnProperty('availableForSale')) {
        variant.availableForSale ? setDisabled(false) : setDisabled(true);
    }
  }, [variant]);

  return (
    <Button
      disabled={disabled}
      ml="auto"
      width={['300px', '400px']}
      onClick={() => {
        addToCartHandler(variant.shopifyId, amount);
      }}
      variant={!disabled ? 'primary' : 'disabled'}
    >
      {!disabled ? productBuyNowButton : productBuyNowSoldoutButton}
    </Button>
  );
};

export default ProductBuyNow;
