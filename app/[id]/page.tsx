import { FC } from "react";
import { notFound } from "next/navigation";
import RecipeDetails from "@/components/Recipe/RecipeDetails";
import { fetchRecipeById } from "@/components/api/route";

interface Params {
  id: string;
}

const RecipeDetailsPage: FC<{ params: Params }> = async ({ params }) => {
  const { id } = params; // Destructure id from params
  console.log(id, "id");

  try {
    const { meals } = await fetchRecipeById({ id });

    if (!meals || meals.length === 0) {
      notFound(); // Return 404 if no meals are found
      return null;
    }

    const [recipe] = meals; // Extract the first recipe from the meals array

    return <RecipeDetails recipe={recipe} />;
  } catch (error) {
    notFound(); // Return 404 if an error occurs
    return null;
  }
};

export default RecipeDetailsPage;
