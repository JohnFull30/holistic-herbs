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
      width: "100%",
      maxWidth: 280,
      minHeight: 370,
      mx: "auto",
      boxShadow: 3,
      borderRadius: 2,
      textDecoration: "none",
      color: "inherit",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      transition: "box-shadow 0.2s ease-in-out",
      "&:hover": {
        boxShadow: 6,
      },
    }}
  >
    <CardMedia
      component="img"
      height="200"
      image={image_url}
      alt={name}
      sx={{ objectFit: "cover" }}
    />

    <CardContent sx={{ textAlign: "center", flexGrow: 1 }}>
      <Typography gutterBottom variant="subtitle1" fontWeight={600}>
        {name}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        ${price}
      </Typography>

      <Button
        variant="contained"
        color="success"
        size="small"
        onClick={(e) => e.preventDefault()}
        sx={{ borderRadius: "999px", textTransform: "none" }}
      >
        Add to Cart
      </Button>
    </CardContent>
  </Card>
);

export default ProductCard;
