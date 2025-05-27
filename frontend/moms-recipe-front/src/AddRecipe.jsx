import { Container, Button, Box, TextField, Grid } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
// import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const url = "http://127.0.0.1:8000/recipe/addRecipeComprehensive/";

const AddRecipe = ({ onAddRecipeCancel }) => {
  const [audioLocation, setAudioLocation] = useState("");
  const [pictureLocation, setPictureLocation] = useState("");
  const [titleText, setTitleText] = useState("");
  const [descText, setDescText] = useState("");
  const [notesText, setNotesText] = useState("");
  const [submitEnable, setSubmitEnable] = useState(false);
  const [showSubmitted, setShowSubmitted] = useState(false);

  useEffect(() => {
    if (
      titleText != "" &&
      descText != "" &&
      notesText != "" &&
      pictureLocation != "" &&
      audioLocation != "" 
    ) {
      setSubmitEnable(true);
    }
  }, [audioLocation, pictureLocation, titleText, descText, notesText]);


  const onAudioChange = (event) => {
    const audioFile = event.target.files[0];
    if (audioFile) {
      setAudioLocation(audioFile);
    }
  };

  const onPictureChange = (event) => {
    const picFile = event.target.files[0];
    if (picFile) {
      setPictureLocation(picFile);
    }
  };

  const onClickSubmit = async () => {
    const recipeObject = {
      title: titleText,
      desc: descText,
      notes: notesText,
      pic: pictureLocation,
      audio: audioLocation,
    };

    const response = axios.post(url, recipeObject, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    response.then((response) => {
      if (response.status === 200) {
        setSubmitEnable(false);
        setShowSubmitted(true);
      }
    });
  };

  return (
    <>
      <Box>
        <Button variant="contained" onClick={onAddRecipeCancel}>
          Back
        </Button>
      </Box>

      <Container>
        <h1>Add New Recipe from here</h1>
        <Box padding={"10px"}>
          <Grid container direction="column">
            <Grid item size="grow">
              <TextField
                fullWidth
                label="Title"
                variant="outlined"
                onChange={(event) => {
                  setTitleText(event.target.value);
                }}
                sx={{
                  backgroundColor: "white",
                  input: { color: "black" },
                  padding: "10px",
                }}
              />
            </Grid>
            <Grid item size="grow">
              <TextField
                fullWidth
                label="Description"
                variant="outlined"
                onChange={(event) => {
                  setDescText(event.target.value);
                }}
                sx={{
                  backgroundColor: "white", // Set background color
                  input: { color: "black" },
                  padding: "10px", // Set text color
                }}
              />
            </Grid>
            <Grid item size="grow">
              <TextField
                fullWidth
                label="Notes"
                variant="outlined"
                onChange={(event) => {
                  setNotesText(event.target.value);
                }}
                sx={{
                  backgroundColor: "white", // Set background color
                  input: { color: "black" },
                  padding: "10px", // Set text color
                }}
              />
            </Grid>
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Upload audio
              <VisuallyHiddenInput
                type="file"
                onChange={onAudioChange}
                accept="audio/*"
              />
            </Button>

            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Upload Picture
              <VisuallyHiddenInput
                type="file"
                onChange={onPictureChange}
                accept="image/*"
              />
            </Button>
          </Grid>
          {
            // this part to show the selected audio file
            audioLocation != "" && <h3>Selected Audio: {audioLocation.name}</h3>
          }
          {
            // this part to show the selected pic file
            pictureLocation != "" && (
              <h3>Selected Picture: {pictureLocation.name}</h3>
            )
          }
        </Box>
        <Button
          variant="contained"
          onClick={onClickSubmit}
          disabled={!submitEnable}
        >
          Submit
        </Button>
        {
          // this part to show the selected pic file
          showSubmitted && <h3>New Recipe Submitted!!</h3>
        }
      </Container>
    </>
  );
};

export default AddRecipe;
