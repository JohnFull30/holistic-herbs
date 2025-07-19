import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ProductCard from "../components/ProductCard";
import { supabase } from "../supabaseClient";
import { Link } from "react-router-dom";

const Shop = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase.from("products").select("*");
      if (error) {
        console.error("Error fetching products:", error);
      } else {
        setProducts(data);
      }
    }

    fetchProducts();
  }, []);

  return (
    <Box sx={{ flexGrow: 1, py: 5 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: "center",
          textAlign: "center",
          mb: 4,
          px: 2,
        }}
      >
        <Typography variant="h4" sx={{ mb: { xs: 2, sm: 0 } }}>
          Shop All Products
        </Typography>
        <Button
          component={Link}
          to="/admin/products"
          variant="outlined"
          color="secondary"
        >
          Admin Product Dashboard
        </Button>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Grid
          container
          spacing={4}
          justifyContent="center"
          sx={{
            width: "100%",
            maxWidth: 1200,
            mx: "auto",
          }}
        >
          {products.map((product) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={product.id}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <ProductCard {...product} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Shop;
