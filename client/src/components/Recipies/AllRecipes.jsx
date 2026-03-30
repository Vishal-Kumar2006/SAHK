import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../config/api.js";
import "./AllRecipes.css";
import ShowAllRecipies from "./ShowAllRecipe.jsx";

const AllRecipes = ({ recipe }) => {
  const [listOfRecipe, setListOfRecipe] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/recipes`)
      .then((response) => {
        setListOfRecipe(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <ShowAllRecipies listOfRecipe={listOfRecipe} />
    </>
  );
};

export default AllRecipes;
