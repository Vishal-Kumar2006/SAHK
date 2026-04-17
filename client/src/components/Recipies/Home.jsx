import "./Home.css";
import { useRef } from "react";
import SlidingBlocks from "./SlidingBlock";
import MealType from "./MealType";
import FoodType from "./FoodType";
import CookingMethod from "./CookingMethod";
import CookingTime from "./CookingTime";
import CostRecepies from "./CostRecipes";

const Home = () => {
  return (
    <div className="Home">
      <div className="Recipe-search-home">
        <input type="text" placeholder="Search a Recipe" />
        <button>Search</button>
      </div>

      <div className="home-types">
        <MealType />
      </div>
      <div className="home-types">
        <FoodType />
      </div>
      <div className="home-types">
        <CookingMethod />
      </div>
      <div className="home-types">
        <CostRecepies />
      </div>
      <div className="home-types">
        <CookingTime />
      </div>
    </div>
  );
};

export default Home;
