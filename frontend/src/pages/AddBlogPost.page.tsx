import React from "react";
import { TextField, Button, Box, Typography, Card, CardContent, CardActions } from "@mui/material";
import { IBlogPost } from "../types/global.typing";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../constants/url.constant";

const AddBlogPost: React.FC = () => {
  const [blogPost, setBlogPost] = React.useState<Partial<IBlogPost>>({
    title: "",
    content: "",
  });
  const navigate = useNavigate();

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBlogPost({ ...blogPost, [e.target.name]: e.target.value });
  };

  const handleSaveBtnClick = () => {
    if (blogPost.title === "" || blogPost.content === "") {
      alert("Enter Values");
      return;
    }

    const data: Partial<IBlogPost> = {
      title: blogPost.title,
      content: blogPost.content,
    };

    axios
      .post(`${baseUrl}/blogPosts`, data)
      .then(() =>
        navigate("/blogposts", {
          state: { message: "Blog Post Created Successfully" },
        })
      )
      .catch(() => alert("Error creating blog post"));
  };

  const handleBackBtnClick = () => {
    navigate("/blogposts");
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 3, flex: 1 }}>
        <Typography variant="h4" gutterBottom>
          Add New Blog Post
        </Typography>
        <Card>
          <CardContent>
            <TextField
              autoComplete="off"
              label="Title"
              variant="outlined"
              name="title"
              value={blogPost.title}
              onChange={changeHandler}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              autoComplete="off"
              label="Content"
              variant="outlined"
              name="content"
              value={blogPost.content}
              onChange={changeHandler}
              fullWidth
              sx={{ mb: 2 }}
            />
          </CardContent>
          <CardActions>
            <Button variant="contained" color="primary" onClick={handleSaveBtnClick}>
              Save
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleBackBtnClick}
            >
              Back
            </Button>
          </CardActions>
        </Card>
      </Box>
      <footer
        style={{
          paddingTop: "1rem",
          paddingBottom: "1rem",
          marginTop: "auto",
          width: "100%",
        }}
      >
        <Typography variant="body2" color="textSecondary" textAlign={"center"}>
          &copy; 2024 Powered by Monica.
        </Typography>
      </footer>
    </div>
  );
};

export default AddBlogPost;
