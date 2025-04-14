// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Learn from "./pages/Learn";
import ProductDetails from "./pages/ProductDetails"; // New page
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import HerbInfo from './pages/HerbInfo';


function App() {
  return (
    <Router>
      <Navbar />
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/shop/:productId" element={<ProductDetails />} /> {/* New route */}
            <Route path="/learn/:herbName" element={<HerbInfo />} />
          </Routes>
        </Box>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
