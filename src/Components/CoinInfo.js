import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { HistoricalChart } from '../Config/api';
import { CircularProgress, createTheme, ThemeProvider } from '@mui/material';
import SelectButton from './Select';
import { chartDays } from '../Config/data';
import { CryptoState } from '../CryptoContext';

const darkTheme = createTheme({
  palette: {
    primary: {
      main: '#fff',
    },
    mode: 'dark',
  },
});

const CoinInfo = ({ coin }) => {
  const [historicData, setHistoricData] = useState([]);
  const [days, setDays] = useState(1);
  const { currency } = CryptoState();
  const [loading, setLoading] = useState(true);
  const [showPrice, setShowPrice] = useState(true);

  const fetchHistoricData = useCallback(async () => {
    if (!coin || !coin.id) return;
    setLoading(true);
    try {
      const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
      const formattedData = data.prices.map((price) => ({
        date: new Date(price[0]).toLocaleDateString(),
        price: price[1],
      }));
      setHistoricData(formattedData);
    } catch (error) {
      console.error('Failed to fetch historical data:', error);
    } finally {
      setLoading(false);
    }
  }, [coin, days, currency]);

  useEffect(() => {
    fetchHistoricData();
  }, [fetchHistoricData]);

  const handlePriceToggle = () => {
    setShowPrice(!showPrice);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <div
        style={{
          width: '90%',
          maxWidth: 1200,
          margin: '0 auto', // Center the content horizontally
          paddingTop: 10,  // Reduced top padding to minimize gap
          paddingBottom: 20, // Bottom padding for better spacing
        }}
      >
        {loading ? (
          <CircularProgress style={{ color: 'gold' }} size={250} thickness={1} />
        ) : (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              data={historicData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#3f3f3f" />
              <XAxis dataKey="date" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip
                contentStyle={{ backgroundColor: '#333', borderColor: '#444' }}
              />
              <Legend />
              {showPrice && (
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#EEBC1D"
                  strokeWidth={2}
                  dot={{ stroke: '#EEBC1D', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 8 }}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        )}
        <div
          style={{
            display: 'flex',
            marginTop: 20,
            marginBottom: 20, // Adjust bottom margin for spacing
            justifyContent: 'space-around',
            width: '100%',
          }}
        >
          {chartDays.map((day) => (
            <SelectButton
              key={day.value}
              onClick={() => {
                setDays(day.value);
                // fetchHistoricData is memoized, so it's safe to call directly
              }}
              selected={day.value === days}
            >
              {day.label}
            </SelectButton>
          ))}
        </div>
        <button
          onClick={handlePriceToggle}
          style={{
            marginTop: 20,
            padding: '10px 20px',
            backgroundColor: '#EEBC1D',
            border: 'none',
            borderRadius: '5px',
            color: '#fff',
            cursor: 'pointer',
          }}
        >
          {showPrice ? 'Hide Price' : 'Show Price'}
        </button>
      </div>
    </ThemeProvider>
  );
};

export default CoinInfo;
