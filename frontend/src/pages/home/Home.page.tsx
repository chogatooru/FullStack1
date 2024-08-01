import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./home.scss";
import kitten from "../../assets/images/pexels-lina-1741205.jpg";

const Home = () => {
  const redirect = useNavigate();
  return (
    <div className="home">
      <h1>Welcome to Pet Store</h1>
      <Button
      style={{ marginBottom: '2rem' }}
        variant="outlined"
        color="primary"
        onClick={() => redirect("/products")}
      >
        Products List
      </Button>
      <img src={kitten} alt="kitten" />
    </div>
  );
};

export default Home;
