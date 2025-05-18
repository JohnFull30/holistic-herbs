// App.jsx
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Learn from "./pages/Learn";
import ProductDetails from "./pages/ProductDetails"; // New page
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import HerbInfo from './pages/HerbInfo';
import HerbLibrary from './pages/HerbLibrary';
import HerbDetail from './pages/HerbDetail';
import './App.css';

import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  palette: {
    primary: { main: '#2e7d32' },           // deep green
    secondary: { main: '#a5d6a7' },         // soft mint
    background: { default: '#fafafa' },     // light grey
  },
  typography: {
    h2: { fontWeight: 700, fontSize: '3rem', letterSpacing: '-1px' },
    h5: { color: '#555' },
  },
});


function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
    <Router>
      <Navbar />
      <Container maxWidth="lg">
        <Box sx={{ pt: { xs: 8, sm: 10 } }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/shop/:productId" element={<ProductDetails />} /> {/* New route */}
            <Route path="/learn/:herbName" element={<HerbInfo />} />
            <Route path="/herbs" element={<HerbLibrary />} />
            <Route path="/herbs/:herbId" element={<HerbDetail />} />


          </Routes>
        </Box>
      </Container>
      <Footer />
    </Router>
    </ThemeProvider>
  
  );
}

export default App;
