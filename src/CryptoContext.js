import React, { createContext, useState, useEffect, useContext } from 'react';

const Crypto = createContext();

const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState("INR");
  const [symbol, setSymbol] = useState("₹");

  useEffect(() => {
    // Update the symbol based on the selected currency
    switch (currency) {
      case "INR":
        setSymbol("₹");
        break;
      case "USD":
        setSymbol("$");
        break;
      case "EUR":
        setSymbol("€");
        break;
      default:
        setSymbol("₹"); // Default to INR symbol
    }
  }, [currency]);

  return (
    <Crypto.Provider value={{ currency, setCurrency, symbol }}>
      {children}
    </Crypto.Provider>
  );
};

// Custom hook to use CryptoContext
export const CryptoState = () => {
  return useContext(Crypto);
};

export default CryptoContext;
