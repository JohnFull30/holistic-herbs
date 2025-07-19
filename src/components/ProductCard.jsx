// src/components/ProductCard.jsx
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const ProductCard = ({ name, price, image_url }) => (
  <Card
    component={Link}
    to={`/shop/${encodeURIComponent(name)}`}
    sx={{
      textDecoration: "none",
      color: "inherit",
      maxWidth: 345,
      width: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      boxShadow: 2,
      borderRadius: 2,
      transition: "0.2s",
      "&:hover": { boxShadow: 4 },
    }}
  >
    <CardMedia
      component="img"
      height="240"
      image={image_url}
      alt={name}
      sx={{ objectFit: "cover" }}
    />
    <CardContent sx={{ textAlign: "center" }}>
      <Typography gutterBottom variant="h6">
        {name}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        ${price}
      </Typography>
      <Button
        variant="contained"
        color="success"
        size="small"
        onClick={(e) => e.preventDefault()} // Prevent navigating on button click
        sx={{ borderRadius: "999px", textTransform: "none" }}
      >
        Add to Cart
      </Button>
    </CardContent>
  </Card>
);

export default ProductCard;
