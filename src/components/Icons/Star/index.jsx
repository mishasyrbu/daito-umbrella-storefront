import React from 'react';
import { Flex } from 'rebass';

const Star = props => {
  return (
    <Flex {...props} justifyContent="center">
      <svg
        width={props.width ? props.width : '100%'}
        height={props.height ? props.height : '100%'}
        aria-hidden="true"
        focusable="false"
        data-prefix="fas"
        data-icon="star"
        className="svg-inline--fa fa-star fa-w-14"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path
            fill="currentColor"
            d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
        ></path>
      </svg>
    </Flex>
  );
};

export default Star;
