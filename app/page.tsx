// src/app/Home.tsx (Server Component)
import { FC } from "react";
import {
  fetchAllArea,
  fetchAllCategories,
  fetchAllIngredients,
  fetchAllMealCategories,
  searchRecipeByName,
} from "@/components/api/route";
import HomePage from "@/components/Recipe/HomePage";

const Home: FC = async () => {
  const [mealCategories, categories, areas, ingredients] = await Promise.all([
    fetchAllMealCategories(),
    fetchAllCategories(),
    fetchAllArea(),
    fetchAllIngredients(),
  ]);

  return (
    <HomePage
    // mealCategories={mealCategories}
    // categories={categories}
    // areas={areas}
    // ingredients={ingredients}
    />
  );
};

export default Home;
