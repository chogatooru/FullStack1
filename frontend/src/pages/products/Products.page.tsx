import axios from "axios";
import { IProduct } from "../../types/global.typing";
import "./products.scss";
import { useEffect, useState } from "react";
import { baseUrl } from "../../constants/url.constant";
import { Button } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import moment from "moment";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";

const Products: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const location = useLocation();
  const redirect = useNavigate();

  console.log(location);

  const fetchProducts = async () => {
    try {
      const response = await axios.get<IProduct[]>(baseUrl);
      setProducts(response.data);
      if (location?.state) {
        Swal.fire({
          icon: "success",
          title: location?.state?.message,
        });
        redirect("/products");
      }
    } catch (error) {
      console.log(error);
      alert("Error fetching products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  //console.log(products);

  // const redirectToEditPage = (id: string) => {
  //   redirect(`/products/edit/${id}`);
  // };
  const deleteProduct = (id: string) => {
    redirect(`/products/edit/${id}`);
  };

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Brand</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="product">
              <td>{product.title}</td>
              <td>{product.brand}</td>
              <td>{moment(product.createdAt).fromNow()}</td>
              <td>{moment(product.updatedAt).fromNow()}</td>
              <td>
                <Button
                  variant="outlined"
                  color="warning"
                  sx={{ mx: 3 }}
                  onClick={() => redirect(`/products/edit/${product.id}`)}
                >
                  <Edit />
                </Button>
              </td>
              <td>
                <Button variant="outlined" color="error">
                  <Delete />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
