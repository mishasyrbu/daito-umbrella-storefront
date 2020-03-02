import React from 'react';
import { Flex, Box } from 'rebass';

import FeaturedProduct from '../../../../templates/main/FeaturedProduct';
import Carousel from '../../../../templates/main/Carousel';
import Reviews from '../../../../components/Reviews';

const MainPage = props => {
  const { data } = props;
  console.log('data', data)
  
  return (
    <Flex flexWrap="wrap" px={2} pt={3} mx="auto" style={{ maxWidth: 1300 }}>
        <Box width={1} sx={{ position: 'relative' }}>
          <Carousel />
        </Box>
        <Box width={1} sx={{ position: 'relative' }}>
          <FeaturedProduct {...props} />
        </Box>
        <Box width={1} sx={{ position: 'relative' }}>
          <Reviews />
        </Box>
    </Flex>
  );
};

export default MainPage;
