import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";

//have to put props in curly braces like dis: func name({props go here})

function RecipeCard({ onClick, recipe }) {
  let [imgPath, setImgPath] = useState();

  useEffect(() => {
    setImgPath(recipe.pic);
  }, [recipe]);

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia 
      sx={{ height: 140 }} 
      image={imgPath} 
      title="green iguana" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {recipe.title}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {recipe.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small" onClick={onClick}>
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}

export default RecipeCard;
