import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Grid,
  Box,
  CircularProgress,
  Divider,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import PublicIcon from "@mui/icons-material/Public";

const DishDetails = () => {
  const { id } = useParams();
  const [dish, setDish] = useState(null);

  useEffect(() => {
    api.get(`/dishes/${id}`).then((res) => setDish(res.data));
  }, [id]);

  if (!dish) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
      <Card sx={{ maxWidth: 800, width: "100%", p: 3, borderRadius: 3, boxShadow: 4 }}>
        <CardContent>
          {/* Dish Name */}
          <Typography variant="h4" component="div" gutterBottom sx={{ fontWeight: "bold" }}>
            {dish.name}
          </Typography>

          <Divider sx={{ my: 2 }} />

          {/* Ingredients */}
          <Typography variant="h6" gutterBottom>Ingredients</Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
            {dish.ingredients.split(",").map((ing, i) => (
              <Chip key={i} label={ing.trim()} color="primary" variant="outlined" />
            ))}
          </Box>

          {/* Meta Info */}
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={6} md={3}>
              <Typography variant="body1" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <RestaurantIcon color="secondary" /> {dish.diet}
              </Typography>
            </Grid>
            <Grid item xs={6} md={3}>
              <Typography variant="body1" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <AccessTimeIcon color="secondary" /> Prep: {dish.prep_time} mins
              </Typography>
            </Grid>
            <Grid item xs={6} md={3}>
              <Typography variant="body1" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <AccessTimeIcon color="secondary" /> Cook: {dish.cook_time} mins
              </Typography>
            </Grid>
            <Grid item xs={6} md={3}>
              <Typography variant="body1" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <PublicIcon color="secondary" /> {dish.region || "Unknown"}
              </Typography>
            </Grid>
          </Grid>

          {/* Flavor, Course, State */}
          <Typography variant="body1"><b>Flavor:</b> {dish.flavor_profile}</Typography>
          <Typography variant="body1"><b>Course:</b> {dish.course}</Typography>
          <Typography variant="body1"><b>State:</b> {dish.state}</Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default DishDetails;
