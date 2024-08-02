import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/Home.page";
import Products from "./pages/BlogPosts.page";
import AddProduct from "./pages/AddBlogPost.page";
import EditProduct from "./pages/EditBlogPost.page";
import DeleteProduct from "./pages/DeleteBlogPost.page";
import { Box, createTheme, ThemeProvider } from "@mui/material";

const App: React.FC = () => {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });
  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <Box bgcolor={"background.default"} color={"text.primary"}>
          <Navbar setMode={setMode} mode={mode} />
          <div className="wrapper"></div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blogposts">
              <Route index element={<Products />} />
              <Route path="add" element={<AddProduct />} />
              <Route path="edit/:id" element={<EditProduct />} />
              <Route path="delete/:id" element={<DeleteProduct />} />
            </Route>
          </Routes>
        </Box>
      </ThemeProvider>
    </div>
  );
};
export default App;
