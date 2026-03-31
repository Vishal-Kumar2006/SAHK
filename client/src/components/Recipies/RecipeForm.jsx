import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { MdDeleteOutline } from "react-icons/md";
import {
  API_URL,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_UPLOAD_PRESET,
  CLOUDINARY_FOLDER,
} from "../../config/api.js";
import "./RecipeForm.css";

const animatedComponents = makeAnimated();

const RecipeForm = () => {
  const meals = ["Breakfast", "Lunch", "Dinner", "Brunch", "Snacks", "Dessert"];
  const foodTypes = [
    "Vegetarian",
    "Non-Vegetarian",
    "Vegan",
    "Gluten-Free",
    "Keto",
    "Diabetic-Friendly",
    "Paleo",
    "High-Protein",
    "Low-Carb",
  ];
  const cookingMethods = [
    "Fried",
    "Baked",
    "Grilled",
    "Steamed",
    "Boiled",
    "Raw",
  ];
  const cookingTimes = [
    { label: "Under 10 minutes", value: 5 },
    { label: "10 minutes", value: 10 },
    { label: "20 minutes", value: 20 },
    { label: "30 minutes", value: 30 },
    { label: "60 minutes", value: 60 },
    { label: "More than 2 hours", value: 120 },
  ];
  const ingredientOptions = [
    "Salt",
    "Sugar",
    "Oil",
    "Flour",
    "Rice",
    "Milk",
    "Tomato",
    "Onion",
    "Garlic",
    "Chicken",
    "Butter",
  ].map((item) => ({ value: item, label: item }));

  const navigate = useNavigate();

  const [recipeData, setRecipeData] = useState({
    name: "",
    instructions: [""],
    image: "",
    ingredients: [],
    mealType: "Breakfast",
    foodType: "Vegetarian",
    cookingMethod: "Fried",
    cookingTime: 5,
    cost: 0,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRecipeData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : name === "cost" || name === "cookingTime"
            ? Number(value)
            : value,
    }));
  };

  const handleInstructionChange = (index, value) => {
    const newInstructions = [...recipeData.instructions];
    newInstructions[index] = value;
    setRecipeData((prev) => ({
      ...prev,
      instructions: newInstructions,
    }));
  };

  // Delete a specific input
  const handleDeleteInput = (index) => {
    const newInstructions = recipeData.instructions.filter(
      (_, i) => i !== index,
    );
    setRecipeData((prev) => ({
      ...prev,
      instructions: newInstructions,
    }));
  };

  const handleAddInstruction = () => {
    setRecipeData((prev) => ({
      ...prev,
      instructions: [...prev.instructions, ""],
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    formData.append("folder", CLOUDINARY_FOLDER);

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData,
        { withCredentials: false },
      );
      setRecipeData((prev) => ({ ...prev, image: res.data.secure_url }));
    } catch (err) {
      console.error("Image upload failed", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/recipes/new`, recipeData);
      console.log();
      alert("Recipe created successfully!");
      navigate(`/recipes/${response.data._id}`);
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="RecipeForm">
      <h3>Create a New Recipe</h3>
      <form onSubmit={handleSubmit}>
        <label>Recipe Name</label>
        <input
          name="name"
          placeholder="Enter Recipe Name"
          onChange={handleInputChange}
          value={recipeData.name}
          className="recipe-input"
        />

        <label>Recipe Instructions (Step-by-step)</label>
        {recipeData.instructions.map((step, index) => (
          <div className="recipe-instructions" key={index}>
            <textarea
              value={step}
              placeholder={`Step ${index + 1}`}
              onChange={(e) => handleInstructionChange(index, e.target.value)}
              className="recipe-input"
            />
            <MdDeleteOutline
              className="step-delete-btn"
              onClick={(e) => handleDeleteInput(index)}
            />
            {/* <button type="button">
              <MdDeleteOutline />
            </button> */}
          </div>
        ))}
        <button type="button" onClick={handleAddInstruction}>
          + Add Step
        </button>

        <label>Recipe Image</label>
        <input
          type="file"
          name="image"
          onChange={handleImageUpload}
          className="recipe-input"
        />

        <label>Recipe Ingredients</label>
        <Select
          className="recipe-input"
          id="recipe-ingredients"
          isMulti
          closeMenuOnSelect={false}
          components={animatedComponents}
          options={ingredientOptions}
          value={ingredientOptions.filter((opt) =>
            recipeData.ingredients.includes(opt.value),
          )}
          onChange={(selected) =>
            setRecipeData((prev) => ({
              ...prev,
              ingredients: selected.map((opt) => opt.value),
            }))
          }
        />

        <label>Cost (per plate)</label>
        <input
          type="number"
          name="cost"
          onChange={handleInputChange}
          value={recipeData.cost}
          className="recipe-input"
        />

        <div className="recipe-dropdown">
          <div className="single-dropdown">
            <label>Meal Type</label>
            <select
              name="mealType"
              className="recipe-input"
              onChange={handleInputChange}
              value={recipeData.mealType}>
              {meals.map((meal) => (
                <option key={meal} value={meal}>
                  {meal}
                </option>
              ))}
            </select>
          </div>
          <div className="single-dropdown">
            <label>Food Type</label>
            <select
              name="foodType"
              className="recipe-input"
              onChange={handleInputChange}
              value={recipeData.foodType}>
              {foodTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="recipe-dropdown">
          <div className="single-dropdown">
            <label>Cooking Method</label>
            <select
              name="cookingMethod"
              className="recipe-input"
              onChange={handleInputChange}
              value={recipeData.cookingMethod}>
              {cookingMethods.map((method) => (
                <option key={method} value={method}>
                  {method}
                </option>
              ))}
            </select>
          </div>

          <div className="single-dropdown">
            <label>Cooking Time</label>
            <select
              name="cookingTime"
              className="recipe-input"
              onChange={handleInputChange}
              value={recipeData.cookingTime}>
              {cookingTimes.map((time) => (
                <option key={time.value} value={time.value}>
                  {time.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button className="form-button" type="submit">
          Create Recipe
        </button>
      </form>
    </div>
  );
};

export default RecipeForm;
