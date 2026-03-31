import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../config/api.js";
import "./RecipeDetails.css";

const RecipeDetails = () => {
  const [recipe, setRecipe] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`${API_URL}/recipes/${id}`);
        setRecipe(response.data);
      } catch (error) {
        console.error("Error fetching recipe:", error.message);
      }
    };

    fetchRecipe();
  }, [id]);

  const deleteRecipe = () => {
    try {
      axios
        .delete(`${API_URL}/recipes/${recipe._id}/delete`)
        .then((response) => {
          alert(response.data.message);
          navigate("/recipes");
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  if (!recipe) return <p>Loading recipe details...</p>;

  return (
    <div className="recipe-details">
      <img src={recipe.image} alt="Recipe" className="recipe-details-image" />
      <h2 className="recipe-name">{recipe.name}</h2>
      <div className="recipe-deatil-info">
        <strong>Instructions:</strong>
        <ul>
          {recipe.instructions.map((ing, idx) => (
            <li key={idx}>
              <b>Step {idx + 1} : </b> {ing}
            </li>
          ))}
        </ul>
        <p>
          <strong>Cost Per Plate:</strong> ₹{recipe.cost}{" "}
        </p>

        <div>
          <strong>Ingredients:</strong>
          <ul className="recipe-detail-ingredients">
            {recipe.ingredients.map((ing, idx) => (
              <li key={idx}>{ing}</li>
            ))}
          </ul>
        </div>
        <p>
          <strong>Cooking Time:</strong> {recipe.cookingTime} min
        </p>
        <p>
          <strong>Meal Type:</strong> {recipe.mealType}{" "}
        </p>
        <p>
          <strong>Cooking Method:</strong> {recipe.cookingMethod}{" "}
        </p>
        <p>
          <strong>Food Type:</strong> {recipe.foodType}{" "}
        </p>
        <p className="recipe-detail-date">
          Posted on: {new Date(recipe.createdAt).toLocaleDateString()}
        </p>
      </div>
      <div className="recipe-btns">
        <button onClick={deleteRecipe}>Delete Recipe</button>
      </div>
    </div>
  );
};

export default RecipeDetails;
