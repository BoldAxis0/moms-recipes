import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import RecipeCard from "./RecipeCard";
import axios from "axios";
import { Button, List, ListItem, Container } from "@mui/material";
import DetailedRecipe from "./DetailedRecipe";

function App() {
  // const axios = require('axios')
  // const [count, setCount] = useState(0)
  const [recipeClicked, setRecipeClicked] = useState(false);

  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState();
  //show all recipes normally, otherwise show only the clicked upon recipe
  //fetch all recipes first, then show all of them by a for loop
  // then set the on click of each to toggle recipeClicked, and then show
  // detailedRecipe page with the details sent as prop

  const url = "http://127.0.0.1:8000/recipe/getAllRecipes/";
  const fetchAllRecipes = async () => {
    const response = await axios.get(url);
    // waits until the request completes...
    // setRecipes(response.data)
    // console.log(response.data)
    return response.data;
  };

  useEffect(() => {
    fetchAllRecipes().then((result) => {
      // do things with the result here, like call functions with them
      // console.log(result);
      setRecipes(result);
    });
  }, []);

  useEffect(() => {
    console.log("recipes are as follows: ", recipes);
  }, [recipes]);

  const onClickRecipe = (recipe) => {
    console.log("hurray!  i was clicked hehe");
    setRecipeClicked(true);
    setSelectedRecipe(recipe);
  };

  const onClickBack = () => {
    setRecipeClicked(false);
  };

  return (
    <>
      <Container maxWidth = 'lg'>
        {!recipeClicked ? (
          <List>
            {recipes.map((recipe) => (
              <ListItem>
                <RecipeCard
                  recipe={recipe}
                  onClick={() => onClickRecipe(recipe)}
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <>
            <DetailedRecipe recipe={selectedRecipe} onClick={onClickBack} />
          </>
        )}
      </Container>
    </>
  );
}

export default App;
