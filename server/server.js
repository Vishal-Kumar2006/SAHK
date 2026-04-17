const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const recipesRoute = require("./Routes/recipes.js");
const userRoute = require("./Routes/user.js");
const filteredRoutes = require("./Routes/filteredRoutes.js");

const PORT = process.env.PORT || 5000;

// Allowed Json Data from Backend
app.use(express.json());

const allowedOrigins = [
  "http://localhost:5173",
  "https://sahk-frontend.onrender.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);
app.use(cookieParser());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected Successfully!"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// All Routes for Recipies
app.use("/recipes", recipesRoute);

app.use("/recipes/filter", filteredRoutes);

app.use("/user", userRoute);

app.listen(PORT, () => {
  console.log(`Srever is Listning at Port http://localhost:${PORT}`);
});
