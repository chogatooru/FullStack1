import React from "react";
import { TextField, Button, Box, Typography, Card, CardContent, CardActions, Avatar } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../constants/url.constant";
import { IBlogPost } from "../types/global.typing";

const AddBlogPost: React.FC = () => {
  const [blogPost, setBlogPost] = React.useState<Partial<IBlogPost>>({
    title: "",
    content: "",
  });
  const navigate = useNavigate();

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', p: 2 }}>
      <Box sx={{ width: '100%', maxWidth: 800 }}>
        <Typography variant="h4" gutterBottom align="center">
          Add New Blog Post
        </Typography>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar
                alt="Author Avatar"
                sx={{ width: 56, height: 56, mr: 2 }}
              />
              <Typography variant="h6">
                {blogPost.title || " "}
              </Typography>
            </Box>
            <TextField
              autoComplete="off"
              label="Title"
              name="title"
              variant="outlined"
              value={blogPost.title}
              onChange={changeHandler}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              autoComplete="off"
              label="Content"
              name="content"
              variant="outlined"
              value={blogPost.content}
              onChange={changeHandler}
              fullWidth
              multiline
              minRows={10} // Increased size for better typing experience
              sx={{ mb: 2 }}
            />
          </CardContent>
          <CardActions sx={{ justifyContent: 'center' , p: 2 }}>
            <Button variant="contained" color="primary" onClick={handleSaveBtnClick}>
              Save
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleBackBtnClick}
              sx={{ ml: 2 }}
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
          textAlign: "center",
        }}
      >
        <Typography variant="body2" color="textSecondary">
          &copy; 2024 Powered by Monica.
        </Typography>
      </footer>
    </Box>
  );
};

export default AddBlogPost;
