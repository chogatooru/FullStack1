import React from "react";
import { Button, TextField, Box, Typography, Card, CardContent, CardActions } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { IBlogPost } from "../types/global.typing";
import { baseUrl } from "../constants/url.constant";

const EditBlogPost: React.FC = () => {
  const [blogPost, setBlogPost] = React.useState<Partial<IBlogPost>>({
    title: "",
    content: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBlogPost({ ...blogPost, [e.target.name]: e.target.value });
  };

  React.useEffect(() => {
    axios.get(`${baseUrl}/blogPosts/${id}`).then(response => setBlogPost({
      title: response.data.title,
      content: response.data.content,
    }));
  }, [id]);

  const handleSaveBtnClick = async () => {
    if (blogPost.title === "" || blogPost.content === "") {
      alert("Enter Values");
      return;
    }

    const data: Partial<IBlogPost> = {
      title: blogPost.title,
      content: blogPost.content,
    };

    try {
      await axios.put(`${baseUrl}/blogPosts/${id}`, data);
      navigate("/blogposts", {
        state: { message: "Blog Post Updated Successfully" },
      });
    } catch (error) {
      alert("Error updating blog post");
    }
  };

  const handleBackBtnClick = () => {
    navigate("/blogposts");
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Edit Blog Post
        </Typography>
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h5" sx={{ mb: 2 }}>
              {blogPost.title}
            </Typography>
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

export default EditBlogPost;
