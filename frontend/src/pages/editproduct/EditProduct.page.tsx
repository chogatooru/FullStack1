import React from "react";
import PropTypes from "prop-types";
import "./edit-product.scss";
import { Button, TextField } from "@mui/material";
import { IProduct } from "../../types/global.typing";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../constants/url.constant";

const EditProduct: React.FC = () => {
  const [product, setProduct] = React.useState<Partial<IProduct>>({
    title: "",
    brand: "",
  });

  const navigate = useNavigate();
  const {id} = useParams();

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  React.useEffect(() => {
    axios.get(`${baseUrl}/${id}`).then(response=>setProduct({
        title:response.data.title,
        brand:response.data.brand,
    }
    ));
},[])

  const handleSaveBtnClick = async () => {
    if (product.title === "" || product.brand === "") {
      alert("Enter Values");
      return;
    }

    const data: Partial<IProduct> = {
      brand: product.brand,
      title: product.title,
    };

    axios
        .put(`${baseUrl}/${id}`, data)
        .then((respone) => {
          navigate("/products", {
            state: { message: "Product Updated Successfully" },
          });
        })
        .catch((error) => alert("error"));
  };

  const handleBackBtnClick = () => {
    navigate("/products");
  };

  return (
    <div>
      <h2>Edit Product</h2>
      <TextField
        autoComplete="off"
        label="Brand"
        variant="outlined"
        name="brand"
        value={product.brand}
        onChange={changeHandler}
      />
      <TextField
        autoComplete="off"
        label="Title"
        name="title"
        variant="outlined"
        value={product.title}
        onChange={changeHandler}
      />
      <div>
        <Button variant="outlined" color="primary" onClick={handleSaveBtnClick}>
          Save
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


export default EditProduct;
