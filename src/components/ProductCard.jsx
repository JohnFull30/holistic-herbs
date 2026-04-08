import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const ProductCard = ({ name, price, image_url }) => (
  <Box sx={{ position: "relative", width: "100%", maxWidth: 345 }}>
    <Card
      component={Link}
      to={`/shop/${encodeURIComponent(name)}`}
      sx={{
        width: "100%",
        boxShadow: 3,
        textDecoration: "none",
        color: "inherit",
        borderRadius: 2,
        overflow: "hidden",
        "&:hover": { boxShadow: 6 },
      }}
    >
      <CardMedia
        component="img"
        image={image_url}
        alt={name}
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = `${process.env.PUBLIC_URL}/images/herb-library-thumbnail.jpg`;
        }}
        sx={{
          width: "100%",
          height: 280,
          objectFit: "cover",
          display: "block",
          backgroundColor: "#f6f6f6",
        }}
      />

      <CardContent sx={{ textAlign: "center", minHeight: 100 }}>
        <Typography gutterBottom variant="h6">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ${price}
        </Typography>
      </CardContent>
    </Card>

    <Box sx={{ textAlign: "center", mt: 1 }}>
      <Button variant="contained" color="success" size="small">
        Add to Cart
      </Button>
    </Box>
  </Box>
);

export default ProductCard;
