import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {  ThemeProvider, createTheme } from '@mui/material/styles';
import { Typography, CircularProgress, Box } from "@mui/material";
import parse from 'html-react-parser';  // Import html-react-parser
import DOMPurify from 'dompurify';  // Import DOMPurify
import { SingleCoin } from "../Config/api";
import { CryptoState } from "../CryptoContext";
import CoinInfo from "../Components/CoinInfo";

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const { currency, symbol } = CryptoState();
 

  const fetchCoin = async () => {
    try {
      const { data } = await axios.get(SingleCoin(id));
      console.log(data);
      setCoin(data);
    } catch (error) {
      console.error("Failed to fetch coin data:", error);
    }
  };  // Add `id` to the dependency array of `fetchCoin`

  useEffect(() => {
   fetchCoin();
    //eslint-disable-next-line
  }, []);  
  // Only re-run `useEffect` if `fetchCoin` changes

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#14161a',
        color: 'white',
      }}
    >
      <Box
        sx={{
          width: { xs: '100%', md: '30%' },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 25,
          borderRight: '2px solid grey',
          padding: 2,
        }}
      >
        {coin ? (
          <>
            <img
              src={coin?.image.large}
              alt={coin?.name}
              height="200"
              style={{ marginBottom: 20 }}
            />
            <Typography variant="h3" sx={{ fontWeight: 'bold', marginBottom: 2, fontFamily: 'Montserrat', textAlign: 'center' }}>
              {coin?.name}
            </Typography>
            <Typography variant="h5" sx={{ width: '100%', fontFamily: 'Montserrat', padding: 2, paddingBottom: 2, paddingTop: 0, textAlign: 'justify' }}>
              {parse(DOMPurify.sanitize(coin?.description.en.split(". ")[0]))}
            </Typography>
            <Box
              sx={{
                alignSelf: 'center',
                padding: 2,
                paddingTop: 1,
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                borderTop: '2px solid grey',
                borderBottom: '2px solid grey',
                marginTop: 2,
                marginBottom: 2,
              }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 1 }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                  Rank:
                </Typography>
                <Typography variant="h5">
                  {numberWithCommas(coin?.market_cap_rank)}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 1 }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                  Current Price:
                </Typography>
                <Typography variant="h5">
                  {symbol}{" "}
                  {numberWithCommas(
                    coin?.market_data.current_price[currency.toLowerCase()]
                  )}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 1 }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                  Market Cap:
                </Typography>
                <Typography variant="h5">
                  {symbol}{" "}
                  {numberWithCommas(
                    coin?.market_data.market_cap[currency.toLowerCase()]
                      .toString()
                      .slice(0, -6)
                  )}
                </Typography>
              </Box>
            </Box>
          </>
        ) : (
          <CircularProgress style={{ color: "gold" }} size={250} thickness={1} />
        )}
      </Box>
      <CoinInfo coin={coin} />
    </Box>
  );
};

// Move theme initialization outside of CoinPage
const theme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    mode: "dark",
  },
});

const App = () => (
  <ThemeProvider theme={theme}>
    <CoinPage />
  </ThemeProvider>
);

export default App;
