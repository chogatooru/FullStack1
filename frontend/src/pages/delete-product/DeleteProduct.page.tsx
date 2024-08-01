import React, { useState } from "react";
import "./delete-product.scss";
import { TextField, Button } from "@mui/material";
import { IProduct } from "../../types/global.typing";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "../../constants/url.constant";

const DeleteProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDeleteBtnClick = async () => {
    axios
      .delete(`${baseUrl}/${id}`)
      .then((respone) => {
        navigate("/products", {
          state: { message: "Product Deleted Successfully" },
        });
      })
      .catch((error) => alert("error"));
  };

  const handleBackBtnClick = () => {
    navigate("/products");
  };

  return (
    <div className="delete-product">
      <h2>Delete Product</h2>
      <h4>Are You Sure You want to delete this product?</h4>

      <div>
        <Button
          variant="outlined"
          color="error"
          onClick={handleDeleteBtnClick}
        >
          Yes Delete It
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleBackBtnClick}
        >
          Back
        </Button>
      </div>
    </div>
  );
};

export default DeleteProduct;
