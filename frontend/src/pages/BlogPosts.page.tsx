import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl } from "../constants/url.constant";
import { Button, Typography } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import moment from "moment";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { IBlogPost } from "../types/global.typing";

const BlogPosts: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<IBlogPost[]>([]);
  const location = useLocation();
  const redirect = useNavigate();

  const fetchBlogPosts = async () => {
    try {
      const response = await axios.get<IBlogPost[]>(`${baseUrl}/blogPosts`);
      setBlogPosts(response.data);
      if (location?.state?.message) {
        Swal.fire({
          icon: "success",
          title: location?.state?.message,
        });
        redirect("/blogposts", { replace: true, state: {} });
      }
    } catch (error) {
      console.log(error);
      alert("Error");
    }
  };

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  return (
    <div
      style={{
        overflowX: "auto",
        margin: "2rem",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Title</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>
              Content
            </th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>
              Updated At
            </th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Edit</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Delete</th>
          </tr>
        </thead>
        <tbody>
          {blogPosts.length > 0 ? (
            blogPosts.map((blogPost) => (
              <tr key={blogPost.id}>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {blogPost.title}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {blogPost.content}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {moment(blogPost.updatedAt).fromNow()}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  <Button
                    variant="outlined"
                    color="warning"
                    onClick={() => redirect(`/blogposts/edit/${blogPost.id}`)}
                  >
                    <Edit />
                  </Button>
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => redirect(`/blogposts/delete/${blogPost.id}`)}
                  >
                    <Delete />
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} style={{ textAlign: "center", padding: "8px" }}>
                No posts available
              </td>
            </tr>
          )}
        </tbody>
      </table>
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

export default BlogPosts;
