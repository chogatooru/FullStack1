import React from "react";
import { Button, TextField, Box, Typography, Card, CardContent, CardActions, Avatar } from "@mui/material";
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

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
      <Box sx={{ width: '100%', maxWidth: 800 }}>
        <Typography variant="h4" gutterBottom align="center">
          Edit Blog Post
        </Typography>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar sx={{ width: 56, height: 56, mr: 2 }} />
              <Typography variant="h6">
                {blogPost.title || "Untitled"}
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
              minRows={10}
              sx={{ mb: 2 }}
            />
          </CardContent>
          <CardActions sx={{ justifyContent: 'center', p: 2 }}>
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

export default EditBlogPost;
