import React from 'react';
import { Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Carousel from './Carousal';

// Define styles using the styled functionS from @mui/material/styles
const BannerContainer = styled('div')({
  backgroundImage: "url(./banner2.jpg)",
  height: 400,
  display: 'flex',
  flexDirection: 'column',
  paddingTop: 25,
  justifyContent: 'space-around',
  backgroundSize: 'cover',  // Ensure the background image covers the entire container
  backgroundPosition: 'center',  // Center the background image
});

const Tagline = styled('div')({
  height: '40%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  textAlign: 'center',
});

const BannerContent = styled(Container)({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
});

const CarouselWrapper = styled('div')({
  height: '50%',
  display: 'flex',
  alignItems: 'center',
});

const Banner = () => {
  return (
    <BannerContainer>
      <BannerContent>
        <Tagline>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 'bold',
              marginBottom: 2,
              fontFamily: 'Montserrat',
            }}
          >
            Crypto Vision
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{
              color: 'darkgrey',
              textTransform: 'capitalize',
              fontFamily: 'Montserrat',
            }}
          >
            Get all the Info regarding your favorite Crypto Currency
          </Typography>
        </Tagline>
        <CarouselWrapper>
          <Carousel />
        </CarouselWrapper>
      </BannerContent>
    </BannerContainer>
  );
};

export default Banner;
