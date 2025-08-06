// src/components/ProductCard.jsx
import { Link } from "react-router-dom";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
} from "@mui/material";

const ProductCard = ({ name, price, image_url }) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      width: "100%",
    }}
  >
    <Card
      component={Link}
      to={`/shop/${encodeURIComponent(name)}`}
      sx={{
        width: "100%",
        maxWidth: 300,
        textDecoration: "none",
        color: "inherit",
        boxShadow: 3,
        "&:hover": { boxShadow: 6 },
      }}
    >
      <CardMedia
        component="img"
        height="220"
        image={image_url}
        alt={name}
        sx={{ objectFit: "cover" }}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" fontWeight="bold">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ${price}
        </Typography>
      </CardContent>
    </Card>

    <Button
      variant="contained"
      color="success"
      size="small"
      sx={{ mt: 1, borderRadius: "999px", textTransform: "none" }}
    >
      Add to Cart
    </Button>
  </Box>
);

export default ProductCard;
