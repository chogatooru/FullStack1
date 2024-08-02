import React from "react";
import { Button, Box, Typography, Container, Paper } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../constants/url.constant";

const DeleteBlogPost: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDeleteBtnClick = async () => {
    axios
      .delete(`${baseUrl}/blogPosts/${id}`)
      .then(() => {
        navigate("/blogPosts", {
          state: { message: "Blog post deleted successfully" },
        });
      })
      .catch(() => alert("Error deleting blog post"));
  };

  const handleBackBtnClick = () => {
    navigate("/blogPosts");
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Delete Blog Post
        </Typography>
        <Typography variant="h6" gutterBottom>
          Are you sure you want to delete this blog post?
        </Typography>
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Button
            variant="contained"
            color="error"
            onClick={handleDeleteBtnClick}
            sx={{ mr: 2 }}
          >
            Yes, Delete It
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleBackBtnClick}
          >
            Back
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default DeleteBlogPost;
