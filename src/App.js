import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import {CoinPage} from './Pages/CoinPage'
import Header from './Components/Header';
import Home from './Pages/Home';
import { styled } from '@mui/material/styles';

const StyledApp = styled('div')({
  backgroundColor: '#14161a',
  color: 'white',
  minHeight: '100vh',
});

function App() {
  return (
    <BrowserRouter>
      <StyledApp>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/coins/:id" element={<CoinPage />} />
        </Routes>
      </StyledApp>
    </BrowserRouter>
  );
}

export default App;
