import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { BsBack } from "react-icons/bs";
import { IoReturnDownBack } from "react-icons/io5";

interface Recipe {
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strIngredient1?: string;
  strIngredient2?: string;
  strIngredient3?: string;
  strIngredient4?: string;
  strIngredient5?: string;
  strIngredient6?: string;
  strIngredient7?: string;
  strIngredient8?: string;
  strIngredient9?: string;
  strIngredient10?: string;
  strMeasure1?: string;
  strMeasure2?: string;
  strMeasure3?: string;
  strMeasure4?: string;
  strMeasure5?: string;
  strMeasure6?: string;
  strMeasure7?: string;
  strMeasure8?: string;
  strMeasure9?: string;
  strMeasure10?: string;
  strYoutube: string;
  strSource: string;
}

interface RecipeDetailsProps {
  recipe: Recipe;
}

const RecipeDetails: FC<RecipeDetailsProps> = ({ recipe }) => {
  const ingredients = [
    { ingredient: recipe.strIngredient1, measure: recipe.strMeasure1 },
    { ingredient: recipe.strIngredient2, measure: recipe.strMeasure2 },
    { ingredient: recipe.strIngredient3, measure: recipe.strMeasure3 },
    { ingredient: recipe.strIngredient4, measure: recipe.strMeasure4 },
    { ingredient: recipe.strIngredient5, measure: recipe.strMeasure5 },
    { ingredient: recipe.strIngredient6, measure: recipe.strMeasure6 },
    { ingredient: recipe.strIngredient7, measure: recipe.strMeasure7 },
    { ingredient: recipe.strIngredient8, measure: recipe.strMeasure8 },
    { ingredient: recipe.strIngredient9, measure: recipe.strMeasure9 },
    { ingredient: recipe.strIngredient10, measure: recipe.strMeasure10 },
  ].filter((item) => item.ingredient);

  // Extract YouTube video ID from URL
  const youtubeId = recipe.strYoutube.split("v=")[1]?.split("&")[0];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <button className="flex gap-2 items-center mb-4 px-4 py-2 bg-gray-300 text-gray-800 rounded-lg shadow hover:bg-gray-400 transition">
        <IoReturnDownBack size={20} />
        <Link href="/">Go Back</Link>
      </button>
      <h2 className="text-3xl font-bold mb-4">{recipe.strMeal}</h2>
      <Image
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        width={600}
        height={400}
        className="object-cover mb-6 rounded-lg"
        style={{ objectFit: "cover" }}
        layout="responsive"
      />
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Category:</h3>
        <p className="text-sm">{recipe.strCategory}</p>
      </div>
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Area:</h3>
        <p className="text-sm">{recipe.strArea}</p>
      </div>
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Ingredients:</h3>
        <ul className="list-disc list-inside pl-4 mb-6">
          {ingredients.map((item, index) => (
            <li key={index} className="text-sm">
              {item.ingredient} - {item.measure}
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Instructions:</h3>
        <p className="text-sm">{recipe.strInstructions}</p>
      </div>
      {recipe.strSource && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Read Blog:</h3>
          <Link href={recipe.strSource} className="text-blue-400 underline">
            {recipe.strSource}
          </Link>
        </div>
      )}
      {youtubeId && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Watch Video:</h3>
          <div className="relative pb-[56.25%] h-0 overflow-hidden">
            <iframe
              src={`https://www.youtube.com/embed/${youtubeId}`}
              title={recipe.strMeal}
              className="absolute top-0 left-0 w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeDetails;
