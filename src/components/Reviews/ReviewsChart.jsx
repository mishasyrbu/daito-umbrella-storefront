import React from 'react';
import styled from '@emotion/styled';
import StarIcon from '../Icons/Star';

const ChartWrapper = styled.ul`
    padding: 0;
    margin: 0;
`;
const ChartListItem = styled.li`
    display: flex;
    align-items: center;
`;
const ChartLine = styled.b`
    display: block;
    height: 3px;
    min-width: 200px;
    background-color: red;
`;

const RAITING_NUMBERS = [1, 2, 3, 4, 5];

function ReviewsChart() {
    return (
        <ChartWrapper>
            {RAITING_NUMBERS.reverse().map(rn => (
                <ChartListItem>
                    <span>{rn}</span>
                    <span><StarIcon width="20" height="20" /></span>
                    <span><ChartLine /></span>
                    <span>100</span>
                </ChartListItem>
            ))}
        </ChartWrapper>
    );
}

export default ReviewsChart;
