import React, { useState, useEffect } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import axios from 'axios';
import { TrendingCoins } from '../Config/api';
import { CryptoState } from '../CryptoContext';
import { Box, Typography } from '@mui/material';

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Carousel = () => {
  const [trending, setTrending] = useState([]);
  const { currency, symbol } = CryptoState();

  const fetchTrendingCoins = async () => {
    try {
      const { data } = await axios.get(TrendingCoins(currency));
      setTrending(data);
    } catch (error) {
      console.error('Failed to fetch trending coins:', error);
    }
  };

  useEffect(() => {
    fetchTrendingCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  const items = trending.map((coin) => {
    let profit = coin?.price_change_percentage_24h >= 0;

    return (
      <Box
        key={coin.id}
        sx={{
          padding: 2,
          textAlign: 'center',
          color: 'white',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <img
          src={coin?.image}
          alt={coin.name}
          height="80"
          style={{ marginBottom: 10 }}
        />
        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
          {coin?.symbol.toUpperCase()}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: profit ? "rgb(14, 203, 129)" : "red",
            fontWeight: 500,
          }}
        >
          {profit && "+"}
          {coin?.price_change_percentage_24h?.toFixed(2)}%
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: 500 }}>
          {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
        </Typography>
      </Box>
    );
  });

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
    1024: {
      items: 6,  // Added support for larger screens
    },
  };

  return (
    <AliceCarousel
      mouseTracking
      items={items}
      autoPlay
      responsive={responsive}
      autoPlayInterval={1000}
      animationDuration={1500}
      infinite
      disableButtonsControls
      disableDotsControls
    />
  );
};

export default Carousel;
