import React from 'react';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, DotGroup } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import GatsbyImage from 'gatsby-image';
import { useStaticQuery, graphql } from 'gatsby';

import ChevronLeft from '@gatsbystorefront/gatsby-theme-storefront-shopify/src/components/Icons/ChevronLeft';
import ChevronRight from '@gatsbystorefront/gatsby-theme-storefront-shopify/src/components/Icons/ChevronRight';

import './carousel.css';

export default props => {
    const data = useStaticQuery(graphql`
        query {
            slides: allFile (filter: { sourceInstanceName: {eq: "slider-images" } }){
                nodes {
                    relativePath
                    childImageSharp {
                        fluid (maxWidth: 4000, quality: 100) {
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
            }
        }
    `);

    const { slides } = data;
      
    return (
        <CarouselProvider
            naturalSlideWidth={1300}
            naturalSlideHeight={450}
            totalSlides={slides.nodes.length}
            isPlaying={true}
            infinite={true}
        >
            <Slider>
                {slides.nodes.map(({ id, relativePath, childImageSharp }, index) => (
                    <Slide index={index} key={id}>
                        <GatsbyImage
                            fluid={childImageSharp.fluid}
                            alt={relativePath}
                        />
                </Slide>
                ))}
            </Slider>
            
            <ButtonBack aria-label={'slider back button'}>
                <ChevronLeft width="40px" height="40px" />
            </ButtonBack>

            <ButtonNext aria-label={'slider next button'}>
                <ChevronRight width="40px" height="40px" />
            </ButtonNext>

            <DotGroup />
        </CarouselProvider>
    );
}
