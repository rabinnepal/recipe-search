import { FC } from "react";
import Link from "next/link";
import RecipeCard from "@/components/Recipe/RecipeCard";
import {
  fetchAllArea,
  fetchAllCategories,
  fetchAllIngredients,
  fetchAllMealCategories,
  searchRecipeByName,
} from "@/components/api/route";

const Label: FC<{ htmlFor: string; children: React.ReactNode }> = ({
  htmlFor,
  children,
}) => (
  <label htmlFor={htmlFor} className="flex items-center gap-2">
    {children}
  </label>
);

const Checkbox: FC<{ id: string }> = ({ id }) => (
  <input type="checkbox" id={id} className="form-checkbox rounded-full" />
);

const Input: FC<{ type: string; placeholder: string; className: string }> = ({
  type,
  placeholder,
  className,
}) => (
  <input
    type={type}
    placeholder={placeholder}
    className={`border rounded-lg p-2 ${className}`}
  />
);

const Home: FC = async () => {
  let q = "Arrabiata";
  const [recipes, mealCategories, categories, areas, ingredients] =
    await Promise.allSettled([
      searchRecipeByName({ q }),
      fetchAllMealCategories(),
      fetchAllCategories(),
      fetchAllArea(),
      fetchAllIngredients(),
    ]);
  return (
    <div className="flex min-h-screen w-full bg-gray-100">
      <aside className="hidden w-64 border-r bg-white p-6 md:block">
        <h2 className="mb-4 text-lg font-semibold">Filters</h2>
        <div className="grid gap-6">
          <div>
            <h3 className="mb-2 text-sm font-medium">Cuisine</h3>
            <div className="grid gap-2">
              <Label htmlFor="cuisine-italian">
                <Checkbox id="cuisine-italian" /> Italian
              </Label>
              <Label htmlFor="cuisine-mexican">
                <Checkbox id="cuisine-mexican" /> Mexican
              </Label>
              <Label htmlFor="cuisine-asian">
                <Checkbox id="cuisine-asian" /> Asian
              </Label>
              <Label htmlFor="cuisine-american">
                <Checkbox id="cuisine-american" /> American
              </Label>
            </div>
          </div>
          <div>
            <h3 className="mb-2 text-sm font-medium">Dietary</h3>
            <div className="grid gap-2">
              <Label htmlFor="diet-vegetarian">
                <Checkbox id="diet-vegetarian" /> Vegetarian
              </Label>
              <Label htmlFor="diet-vegan">
                <Checkbox id="diet-vegan" /> Vegan
              </Label>
              <Label htmlFor="diet-gluten-free">
                <Checkbox id="diet-gluten-free" /> Gluten-free
              </Label>
              <Label htmlFor="diet-dairy-free">
                <Checkbox id="diet-dairy-free" /> Dairy-free
              </Label>
            </div>
          </div>
          <div>
            <h3 className="mb-2 text-sm font-medium">Cooking Time</h3>
            <div className="grid gap-2">
              <Label htmlFor="time-30-min">
                <Checkbox id="time-30-min" /> 30 min or less
              </Label>
              <Label htmlFor="time-1-hour">
                <Checkbox id="time-1-hour" /> 1 hour or less
              </Label>
              <Label htmlFor="time-1-2-hours">
                <Checkbox id="time-1-2-hours" /> 1-2 hours
              </Label>
              <Label htmlFor="time-2-plus-hours">
                <Checkbox id="time-2-plus-hours" /> 2+ hours
              </Label>
            </div>
          </div>
        </div>
      </aside>
      <div className="flex-1">
        <header className="sticky top-0 z-10 border-b bg-white px-4 py-3 md:px-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <div className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search recipes..."
                className="w-full rounded-lg pl-8 md:w-[300px] lg:w-[400px]"
              />
            </div>
          </div>
        </header>
        <div className="grid grid-cols-1 gap-6 p-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:p-6">
          {Array.from({ length: 8 }, (_, i) => (
            <RecipeCard
              description="test recipe"
              href="https://github.com/"
              imgAlt="test"
              title="Recipe"
              key={i}
              imgSrc="https://media.istockphoto.com/id/525670203/photo/snow-biking-couple.jpg?s=2048x2048&w=is&k=20&c=Z0fPlE5RZQxnbcIVQKVWnp4GIHDdTwUlNiIlQpDC5PE="
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
{
  /* <div key={i} className="relative overflow-hidden rounded-lg group">
  <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
    <span className="sr-only">View recipe</span>
  </Link>
  <img
    src="/placeholder.svg"
    alt={`Recipe ${i + 1}`}
    width={400}
    height={300}
    className="object-cover w-full h-60"
    style={{ aspectRatio: "400/300", objectFit: "cover" }}
  />
  <div className="p-4 bg-white">
    <h3 className="text-lg font-semibold">Recipe {i + 1}</h3>
    <p className="text-sm text-gray-500">
      This is a placeholder description for recipe {i + 1}.
    </p>
  </div>
</div>; */
}
