import React, { useEffect, useState } from "react";
import {
  Button,
  List,
  ListItem,
  Grid,
  Stack,
  Container,
  Box,
} from "@mui/material";

//this page will show all the details of the cicked recipe
const DetailedRecipe = ({ recipe, onBackButtonClick }) => {
  //this whole path thing will need to be
  // reworked when deployed
  let [imgPath, setImgPath] = useState();
  useEffect(() => {
    setImgPath(recipe.pic);
  }, []);

  useEffect(() => {
    console.log("path incoming: ", imgPath);
  }, [imgPath]);

  let [audioPath, setAudioPath] = useState();

  useEffect(() => {
    setAudioPath(
      recipe.audio ? `https://res.cloudinary.com/dtkf1obor/${recipe.audio}` : ""
    );
  }, []);

  useEffect(() => {
    console.log("audio path incoming: ", audioPath);
  }, [audioPath]);

  return (
    <>
      <Button variant="contained" onClick={onBackButtonClick}>
        Back
      </Button>
      
      <Container maxWidth="md">

        <h1>{recipe.title}</h1>
        <Grid container direction="column">
          <Grid size="grow">
            {
              //audio goes here
            }
            {audioPath != "" ? (
              <audio controls>
                <source src={audioPath} type="audio/wav" />
                Your browser does not support the audio element.
              </audio>
            ) : (
              <h2>No audio available</h2>
            )}
          </Grid>

          <Grid size="grow">
            {
              //description and notes on the left side
              //recipe pics on the right side
            }
            <Grid container direction="row">
              <Grid size="grow">
                {
                  //description and notes stacked
                }
                <Stack spacing={2}>
                  <h1>{recipe.description}</h1>
                  <h1>notes</h1>
                </Stack>
              </Grid>

              <Grid size="grow">
                <h1>pics</h1>
                <Box
                  component="img"
                  sx={{
                    height: 233,
                    width: 350,
                    maxHeight: { xs: 233, md: 167 },
                    maxWidth: { xs: 350, md: 250 },
                  }}
                  alt="The house from the offer."
                  src={imgPath}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default DetailedRecipe;
