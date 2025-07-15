import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Footer from "./components/Body/Footer.jsx";
import Navbar from "./components/Body/Navbar.jsx";

import Home from "./components/Recipies/Home.jsx";
import AllRecipes from "./components/Recipies/AllRecipes.jsx";
import RecipePage from "./components/Recipies/RecipeDetails.jsx";
import RecipeForm from "./components/Recipies/RecipeForm.jsx";
import ShowAllRecipies from "./components/Recipies/ShowAllRecipe.jsx";

import Login from "./components/User/Login.jsx";
import SignUp from "./components/User/SignUp.jsx";
import Profile from "./components/User/Profile.jsx";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="body">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recipes" element={<AllRecipes />} />
            <Route path="/recipes/:id" element={<RecipePage />} />
            <Route path="/recipes/new" element={<RecipeForm />} />
            <Route
              path="/recipes/filtered-recipies"
              element={<ShowAllRecipies />}
            />

            {/* <Route path="/recipes/new" element={<RecipeForm/>}/> */}

            <Route path="/user/login" element={<Login />} />
            {/* <Route path="/user/login" element={<TodoApp/>}/> */}

            <Route path="/user/signup" element={<SignUp />} />
            <Route path="/user/profile" element={<Profile />} />
          </Routes>
        </BrowserRouter>
      </div>
      <Footer />
    </div>
  );
}

export default App;
