import React from "react";
import {
  Box,
  Container,
  AppBar,
  Toolbar,
  Typography,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const Background = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  background: `linear-gradient(135deg, ${theme.palette.background.default} 60%, ${theme.palette.primary.light} 100%)`,
  display: "flex",
  flexDirection: "column",
}));

const HomelyPaper = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(4),
  padding: theme.spacing(4),
  borderRadius: 24,
  boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
  background: theme.palette.background.paper,
  border: `1px solid ${
    theme.palette.primary[100] || theme.palette.primary.light
  }`,
}));

const HomelyAppBar = styled(AppBar)(({ theme }) => ({
  background: theme.palette.primary.main,
  boxShadow: "none",
  borderBottom: `2px solid ${
    theme.palette.primary[200] || theme.palette.primary.light
  }`,
}));

export default function Layout({ children }) {
  return (
    <Background>
      <HomelyAppBar position="static" elevation={0}>
        <Toolbar>
          <Typography
            variant="h5"
            sx={{
              fontFamily: "Pacifico, cursive",
              color: "white",
              letterSpacing: 2,
            }}
          >
            Mom's Recipes
          </Typography>
        </Toolbar>
      </HomelyAppBar>
      <Container maxWidth="lg">
        <HomelyPaper>{children}</HomelyPaper>
      </Container>
    </Background>
  );
}
