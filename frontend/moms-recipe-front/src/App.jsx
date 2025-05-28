import { useEffect, useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import RecipeCard from "./RecipeCard";
import axios from "axios";
import { Button, List, ListItem, Container, Grid, Stack } from "@mui/material";
import DetailedRecipe from "./DetailedRecipe";
// import AddRecipe from "./AddRecipe";

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

  // const [addRecipeClicked, setAddRecipeClicked] = useState(false);

  // const onAddRecipeClicked = () => {
  //   setAddRecipeClicked(true);
  // };

  const url =
    "http://moms-recipes-67d19de66af2.herokuapp.com/recipe/getAllRecipes/";
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

  // const onAddRecipeCancel = () => {
  //   setAddRecipeClicked(false);
  // };

  //this is too many cascading ternary operators. Should refactor to if else or switch later
  return (
    <>
      <Container maxWidth="lg">
        {
          //if add recipe is clicked change everything to that layout
        }
        {/* {!addRecipeClicked ? ( */}
          <>
            {!recipeClicked ? (
              <>
                <Grid container direction="column">
                  <Grid item size="grow">
                    <Grid container direction="row">
                      <Grid item size={10}>
                        <h1>Mom's Recipes</h1>
                      </Grid>
                      <Grid item size="grow">
                        {/* <Button
                          variant="contained"
                          onClick={onAddRecipeClicked}
                        >
                          Add Recipe
                        </Button> */}
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item size="auto">
                    <List>
                      <Grid container direction="row">
                        {recipes.map((recipe) => (
                          <Grid item md={1}>
                            <ListItem>
                              <RecipeCard
                                recipe={recipe}
                                onClick={() => onClickRecipe(recipe)}
                              />
                            </ListItem>
                          </Grid>
                        ))}
                      </Grid>
                    </List>
                  </Grid>
                </Grid>
              </>
            ) : (
              <>
                <DetailedRecipe
                  recipe={selectedRecipe}
                  onBackButtonClick={onClickBack}
                />
              </>
            )}
          </>
        {/* ) : ( */}
          {/* <AddRecipe onAddRecipeCancel={onAddRecipeCancel} /> */}
        {/* )} */}
      </Container>
    </>
  );
}

export default App;
