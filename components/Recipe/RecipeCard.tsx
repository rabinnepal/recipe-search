import { FC } from "react";
import Link from "next/link";
import Image from "next/image";

interface Recipe {
  idMeal: number; // Ensure idMeal is unique and used as a key
  strYoutube: string;
  strMealThumb: string;
  strMeal: string;
  strInstructions?: string; // Mark as optional
}

interface RecipeCardProps {
  recipe: Recipe;
}

const truncateText = (text: string, length: number) => {
  return text.length > length ? `${text.substring(0, length)}...` : text;
};

const RecipeCard: FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <div className="relative overflow-hidden rounded-lg group shadow-lg transition-transform transform hover:scale-105">
      <Link
        href={`/${recipe.idMeal}`}
        className="absolute inset-0 z-10"
        prefetch={false}
      >
        <span className="sr-only">{`View ${recipe.strMeal}`}</span>
      </Link>

      <Image
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        width={600}
        height={400}
        className="object-cover mb-6 rounded-lg transition-transform transform group-hover:scale-110"
        style={{ objectFit: "cover" }}
        layout="responsive"
      />
      <div className="p-4 bg-background transition-colors group-hover:bg-gray-100">
        <h3 className="text-lg font-semibold">{recipe.strMeal}</h3>
        <p className="text-sm text-muted-foreground">
          {recipe.strInstructions
            ? truncateText(recipe.strInstructions, 100)
            : ""}
        </p>
      </div>
    </div>
  );
};

export default RecipeCard;
