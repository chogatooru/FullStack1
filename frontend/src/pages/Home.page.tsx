import React from "react";
import {
  Button,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import kitten from "../assets/images/pexels-lina-1741205.jpg"

const Home = () => {
  const redirect = useNavigate();
  return (
    <Container maxWidth="md" style={{ marginTop: "2rem", textAlign: "center" }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Welcome to PetPaw Diaries
      </Typography>
      <Typography variant="body1" paragraph>
        Share and explore delightful stories and diaries about your beloved
        pets.
      </Typography>
      <Button
        style={{ marginBottom: "2rem" }}
        variant="contained"
        color="primary"
        onClick={() => redirect("/blogposts")}
      >
        View Posts
      </Button>
      <Grid item xs={12} sm={6} md={4}>
        <Card>
          <CardMedia component="img" alt="kitten" height="350" image={kitten} />
          <CardContent>
            <Typography variant="h5" component="h2">
              Cute Kitten
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              This adorable kitten is just one example of the lovely pets we
              have stories about.
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <footer
        style={{
          paddingTop: "1rem",
          paddingBottom: "1rem",
          marginTop: "auto",
          width: "100%",
        }}
      >
        <Typography variant="body2" color="textSecondary">
          &copy; 2024 Powered by Monica.
        </Typography>
      </footer>
    </Container>
  );
};

export default Home;
