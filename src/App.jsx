// App.jsx
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Learn from "./pages/Learn";
import ProductDetails from "./pages/ProductDetails"; // New page
import Box from "@mui/material/Box";
import HerbInfo from "./pages/HerbInfo";
import HerbLibrary from "./pages/HerbLibrary";
import HerbDetail from "./pages/HerbDetail";
import AddHerbForm from "./pages/AddHerbForm";
import "./App.css";
import HerbDashboard from "./pages/HerbDashboard";
import ProductDashboard from "./pages/ProductDashboard";
import AddProductForm from "./pages/AddProductForm";
import AddAdminRemedyForm from "./pages/AddAdminRemedyForm";
import RecipeRemedyList from "./pages/RecipeRemedyList";
import RemedyDashboard from "./pages/RemedyDashboard";
import RemedyDetail from "./pages/RemedyDetail";

import { ThemeProvider, createTheme } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

const theme = createTheme({
  palette: {
    primary: { main: "#2e7d32" }, // deep green
    secondary: { main: "#a5d6a7" }, // soft mint
    background: { default: "#fafafa" }, // light grey
  },
  typography: {
    h2: { fontWeight: 700, fontSize: "3rem", letterSpacing: "-1px" },
    h5: { color: "#555" },
  },
  components: {
    MuiCardMedia: {
      styleOverrides: {
        root: {
          width: "100%",
          height: "100%",
          objectFit: "cover",
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Box
          sx={{ px: { xs: 2, md: 4 }, pt: { xs: 8, sm: 10 }, maxWidth: "100%" }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/shop/:productId" element={<ProductDetails />} />{" "}
            {/* New route */}
            <Route path="/learn" element={<Learn />} />
            <Route path="/learn/:herbName" element={<HerbInfo />} />
            <Route path="/herbs" element={<HerbLibrary />} />
            <Route path="/herbs/:herbId" element={<HerbDetail />} />
            <Route path="/admin/add-herb" element={<AddHerbForm />} />
            <Route path="/admin/herbs" element={<HerbDashboard />} />
            <Route path="/admin/products" element={<ProductDashboard />} />
            <Route path="/admin/add-product" element={<AddProductForm />} />
            <Route path="/admin/add-remedy" element={<AddAdminRemedyForm />} />
            <Route path="/learn/recipes/:slug" element={<RemedyDetail />} />
            <Route path="/learn/recipes" element={<RecipeRemedyList />} />
            <Route path="/admin/remedies" element={<RemedyDashboard />} />
          </Routes>
        </Box>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;
