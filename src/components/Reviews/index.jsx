import React from 'react';

import ReviewsList from './ReviewsList';
import ReviewsChart from './ReviewsChart';

function Reviews () {
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h1>Customer Reviews</h1>
            <ReviewsChart />
            <ReviewsList data={reviewsList} />
        </div>
    );
}

export default Reviews;


const reviewsList = [{
    userName: 'John Doe',
    country: 'US',
    rate: 85, // 0 - 100
    feedback: 'Good exultant high quality',
    date: '14 Dec 2019 18:48',
    photo: [
        'https://ae01.alicdn.com/kf/U62996061867f4edd99d443a357ef733bX.jpg',
        'https://ae01.alicdn.com/kf/U2a7eb2fad9d84bcab76d6341fccce4ceL.jpg',
    ],
}, {
    userName: 'Elon Musk',
    country: 'US',
    rate: 90, // 0 - 100
    feedback: 'Perfect',
    date: '19 Dec 2019 08:48',
    photo: [
        'https://ae01.alicdn.com/kf/U54ab7dc05926451d9a78845dc3d8368bE.jpg',
        'https://ae01.alicdn.com/kf/U72e77a395b7e48988ddd660e288f6396N.jpg',
        'https://ae01.alicdn.com/kf/U5327fbd4079d4bca8dc28d78efd47daeW.jpg',
    ],
}];
