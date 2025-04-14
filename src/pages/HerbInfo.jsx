import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Box, CardMedia, Divider, Button } from '@mui/material';

const herbData = {
  "Lavender Essential Oil": {
    image: "https://placehold.co/400x400?text=Lavender+Oil",
    healing: "Soothes anxiety, promotes restful sleep, and helps reduce skin inflammation.",
    recipe: "Lavender Sleep Balm: Combine 1 tbsp coconut oil with 5 drops lavender essential oil. Rub on temples and wrists before bed.",
    facts: "Lavender has been used since Roman times for baths and wound care. It's one of the most versatile oils."
  },
  "Eucalyptus Herbal Extract": {
    image: "https://placehold.co/400x400?text=Eucalyptus",
    healing: "Clears sinuses, supports respiratory health, and repels insects naturally.",
    recipe: "Eucalyptus Steam Bowl: Add 5 drops of eucalyptus to hot water. Inhale steam under a towel for sinus relief.",
    facts: "Native to Australia, eucalyptus is a fast-growing tree with potent antibacterial oils."
  },
  "Chamomile Tincture": {
    image: "https://placehold.co/400x400?text=Chamomile",
    healing: "Relieves stress, calms the digestive system, and promotes better sleep.",
    recipe: "Chamomile Tea: Steep 2 tsp dried chamomile in hot water for 10 minutes. Sweeten with honey if desired.",
    facts: "Chamomile has been used in ancient Egypt and Rome as a remedy for insomnia and stomach ailments."
  },
  "Peppermint Oil": {
    image: "https://placehold.co/400x400?text=Peppermint",
    healing: "Eases indigestion, relieves headaches, and uplifts energy levels.",
    recipe: "Digestive Rub: Mix 5 drops peppermint oil with 1 tsp carrier oil and massage onto stomach.",
    facts: "Peppermint contains menthol which gives it that cooling, tingling sensation."
  },
  "Lemon Balm": {
    image: "https://placehold.co/400x400?text=Lemon+Balm",
    healing: "Reduces stress, improves mood, and may ease cold sores.",
    recipe: "Lemon Balm Elixir: Simmer 1/2 cup lemon balm leaves with 2 cups water. Sweeten with lemon and honey.",
    facts: "Also known as 'Melissa', this herb is a favorite among beekeepers due to its pleasant lemon scent."
  },
  "Tea Tree Oil": {
    image: "https://placehold.co/400x400?text=Tea+Tree+Oil",
    healing: "Fights acne, cleans wounds, and acts as a natural disinfectant.",
    recipe: "Skin Cleanser: Mix 1 drop tea tree oil with 1 tbsp aloe vera gel. Apply to blemishes.",
    facts: "Used by Aboriginal Australians for centuries as a natural antiseptic."
  }
};

const HerbInfo = () => {
  const { herbName } = useParams();
  const navigate = useNavigate();
  const herb = herbData[herbName];

  if (!herb) {
    return (
      <Box sx={{ textAlign: 'center', mt: 5 }}>
        <Typography variant="h5">Information not found!</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', my: 5 }}>
      <Button onClick={() => navigate(-1)} variant="outlined" color="success" sx={{ mb: 3 }}>
        ← Back
      </Button>
      <Typography variant="h3" gutterBottom>{herbName}</Typography>
      <CardMedia
        component="img"
        image={herb.image}
        alt={herbName}
        sx={{ maxHeight: 400, width: '100%', borderRadius: 2, objectFit: 'cover', mb: 3 }}
      />
      <Typography variant="h5" color="success.main">Healing Benefits</Typography>
      <Typography paragraph>{herb.healing}</Typography>
      <Divider sx={{ my: 3 }} />
      <Typography variant="h5" color="success.main">Holistic Recipe</Typography>
      <Typography paragraph>{herb.recipe}</Typography>
      <Divider sx={{ my: 3 }} />
      <Typography variant="h5" color="success.main">Helpful Facts</Typography>
      <Typography>{herb.facts}</Typography>
    </Box>
  );
};

export default HerbInfo;
