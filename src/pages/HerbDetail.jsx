// src/pages/HerbDetail.jsx
import { useParams } from 'react-router-dom';
import {
  Box, Typography, CardMedia, Accordion, AccordionSummary,
  AccordionDetails, Button, Stack, Divider
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ShareIcon from '@mui/icons-material/Share';
import herbs from '../data/herbs';
import { Link } from 'react-router-dom';


const HerbDetail = () => {
  const { herbId } = useParams();
  const herb = herbs.find(h => h.slug === herbId);

  if (!herb) {
    return (
      <Box sx={{ textAlign: 'center', mt: 5 }}>
        <Typography variant="h5">Herb not found!</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', my: 5 }}>
      <CardMedia
        component="img"
        image={herb.image}
        alt={herb.name}
        sx={{ height: 400, borderRadius: 2 }}
      />

      <Typography variant="h3" sx={{ my: 3 }}>{herb.name}</Typography>

      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1"><strong>Scientific Name:</strong> {herb.scientificName}</Typography>
        <Typography variant="subtitle1"><strong>Common Uses:</strong> {herb.commonUses}</Typography>
        <Typography variant="subtitle1"><strong>Healing Benefits:</strong> {herb.healingBenefits}</Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Benefits & Scientific Info</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{herb.benefits}</Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Culinary Uses</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{herb.culinary}</Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">DIY Herbal Remedies</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{herb.remedies}</Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Recommended Products</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ul>
            {herb.productLinks.map((product, idx) => (
              <li key={idx}>
                <Button component={Link} to={`/shop/${encodeURIComponent(product)}`} color="success">
                  {product}
                </Button>
              </li>
            ))}
          </ul>
        </AccordionDetails>
      </Accordion>

      <Divider sx={{ my: 4 }} />

      <Typography variant="subtitle1" sx={{ mb: 1 }}>Share this herb:</Typography>
      <Stack direction="row" spacing={2}>
        <Button
          startIcon={<ShareIcon />}
          href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
          target="_blank"
          rel="noopener"
          variant="outlined"
        >
          Facebook
        </Button>
        <Button
          startIcon={<ShareIcon />}
          href={`https://twitter.com/intent/tweet?url=${window.location.href}&text=Check out this amazing herb!`}
          target="_blank"
          rel="noopener"
          variant="outlined"
        >
          Twitter
        </Button>
        <Button
          startIcon={<ShareIcon />}
          href={`https://pinterest.com/pin/create/button/?url=${window.location.href}`}
          target="_blank"
          rel="noopener"
          variant="outlined"
        >
          Pinterest
        </Button>
      </Stack>
    </Box>
  );
};

export default HerbDetail;
