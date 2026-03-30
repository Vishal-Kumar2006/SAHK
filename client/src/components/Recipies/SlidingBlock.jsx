import { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../config/api.js";
import "./SlidingBlocks.css";

const SlidingBlocks = ({ data = [], type }) => {
  const scrollRef = useRef();

  const scrollLeft = () => {
    scrollRef.current.scrollLeft -= 400;
  };

  const scrollRight = () => {
    scrollRef.current.scrollLeft += 400;
  };

  const navigate = useNavigate();

  const handleClick = async (filterType) => {
    try {
      const response = await axios.get(`${API_URL}/recipes/filter/${type}`, {
        params: { filterType },
      });

      const recipes = response.data;

      // Navigate with data
      navigate(`recipes/filtered-recipies`, { state: { recipes } });
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  return (
    <div className="Sliding-Blocks">
      <button className="scroll-btn left" onClick={scrollLeft}>
        ←
      </button>

      <div className="Recipe-Catagories-wrapper">
        <div
          className="Recipe-Catagories-mealtype"
          ref={scrollRef}
          id="scrollContainer">
          {data.map((item, i) => (
            <div
              className="MealType-catagory"
              onClick={() => handleClick(item.heading)}
              key={i}>
              <img
                src={item.image === "" ? null : item.image}
                alt="Recipe Type Image"
                className="recipe-image"
              />
              <div>
                <h3 className="MealType-catagory-heading">
                  {item.heading} {type === "cost" ? "Rs per Plate" : ""}
                </h3>
                <p className="MealType-catagory-desciption">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        <button className="scroll-btn right" onClick={scrollRight}>
          →
        </button>
      </div>
    </div>
  );
};

export default SlidingBlocks;
