import { useState, useEffect } from "react";
import axios from "axios";
import "./AllRecipes.css";
import ShowAllRecipies from "./ShowAllRecipe.jsx";

const AllRecipes = ({ recipe }) => {
  const [listOfRecipe, setListOfRecipe] = useState([]);

  useEffect(() => {
    axios.get("https://sahk.onrender.com/recipes").then((response) => {
      setListOfRecipe(response.data);
    });
  }, []);

  return (
    <>
      <ShowAllRecipies listOfRecipe={listOfRecipe} />
    </>
  );
};

export default AllRecipes;
