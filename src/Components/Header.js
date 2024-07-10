import React from 'react';
import { AppBar, Container, MenuItem, createTheme, ThemeProvider, Select, Toolbar, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { CryptoState } from '../CryptoContext';

// Define styles using the styled function from @mui/material/styles
const Title = styled(Typography)(({ theme }) => ({
  flex: 1,
  color: 'gold',
  fontFamily: 'Montserrat',
  fontWeight: 'bold',
  cursor: 'pointer',
}));

const SelectCurrency = styled(Select)({
  width: 100,
  height: 40,
  marginRight: 15,
});

const darkTheme = createTheme({
  palette: {
    primary: {
      main: '#fff',
    },
    mode: 'dark',
  },
});

const Header = () => {
  const navigate = useNavigate();
  const { currency, setCurrency } = CryptoState();

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <Title onClick={() => navigate('/')} variant="h6">
              CRYPTO-VISION
            </Title>

            <SelectCurrency
              variant="outlined"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <MenuItem value="INR">INR</MenuItem>
              <MenuItem value="USD">USD</MenuItem>
              <MenuItem value="EUR">EURO</MenuItem>
            </SelectCurrency>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
