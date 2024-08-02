import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../constants/url.constant";
import { Box, Button, Typography, Avatar } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Edit, Delete } from "@mui/icons-material";
import moment from "moment";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { IBlogPost } from "../types/global.typing";


const BlogPosts: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<IBlogPost[]>([]);
  const location = useLocation();
  const navigate = useNavigate();

  const fetchBlogPosts = async () => {
    try {
      const response = await axios.get<IBlogPost[]>(`${baseUrl}/blogPosts`);
      setBlogPosts(response.data);
      if (location?.state?.message) {
        Swal.fire({
          icon: "success",
          title: location?.state?.message,
        });
        navigate("/blogposts", { replace: true, state: {} });
      }
    } catch (error) {
      console.error("Fetch error:", error);
      Swal.fire({
        icon: "error",
        title: "Error fetching blog posts",
        text: "An error occurred while fetching the blog posts. Please try again later.",
      });
    }
  };

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const columns: GridColDef[] = [
    {
      field: "avatar",
      headerName: "",
      width: 80,
      renderCell: () => (
        <Avatar sx={{ width: 40, height: 40 }} />
      ),
    },
    {
      field: "title",
      headerName: "Title",
      width: 200,
      renderCell: (params) => (
        <Typography noWrap>{params.row.title}</Typography>
      ),
    },
    {
      field: "content",
      headerName: "Content",
      width: 600,
      renderCell: (params) => (
        <Typography noWrap>{params.row.content}</Typography>
      ),
    },
    {
      field: "edit",
      headerName: "",
      width: 100,
      renderCell: (params) => (
        <Button
          variant="outlined"
          color="warning"
          onClick={() => navigate(`/blogposts/edit/${params.row.id}`)}
        >
          <Edit />
        </Button>
      ),
    },
    {
      field: "delete",
      headerName: "",
      width: 100,
      renderCell: (params) => (
        <Button
          variant="outlined"
          color="error"
          onClick={() => navigate(`/blogposts/delete/${params.row.id}`)}
        >
          <Delete />
        </Button>
      ),
    },
    {
      field: "updatedAt",
      headerName: "Updated At",
      width: 150,
      renderCell: (params) => (
        <Typography>{moment(params.row.updatedAt).fromNow()}</Typography>
      ),
    },
  ];

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
      <Box sx={{ width: '100%', maxWidth: 1200 }}>
        <DataGrid
          rows={blogPosts}
          columns={columns}
          autoHeight
          hideFooterSelectedRowCount
        />
      </Box>
      <footer
        style={{
          paddingTop: "1rem",
          paddingBottom: "1rem",
          marginTop: "auto",
          width: "100%",
        }}
      >
        <Typography variant="body2" color="textSecondary" textAlign="center">
          &copy; 2024 Powered by Monica.
        </Typography>
      </footer>
    </Box>
  );
};

export default BlogPosts;
