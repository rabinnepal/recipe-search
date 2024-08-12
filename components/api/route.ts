import { api } from "./interceptor";

// Home page
export const searchRecipeByName = async ({ q }: { q: string }) => {
  try {
    const response = await api(`/api/json/v1/1/search.php?s=${q}`);
    const recipes = await response.json();
    return recipes;
  } catch (error) {
    console.error("Error fetching recipes ", error);

    return undefined;
  }
};
export const fetchRecipeById = async ({ id }: { id: string }) => {
  try {
    const response = await api(`/api/json/v1/1/lookup.php?i=${id}`);
    const recipe = await response.json();
    return recipe;
  } catch (error) {
    console.error("Error fetching recipe ", error);

    return undefined;
  }
};
export const fetchRecipeByAreas = async ({
  selectedArea,
}: {
  selectedArea: string | null;
}) => {
  console.log(selectedArea);
  try {
    const response = await api(`/api/json/v1/1/filter.php?a=${selectedArea}`);
    const recipe = await response.json();
    return recipe;
  } catch (error) {
    console.error("Error fetching recipe ", error);

    return undefined;
  }
};
export const fetchRecipeByCategories = async ({
  selectedCategories,
}: {
  selectedCategories: string | null;
}) => {
  console.log(selectedCategories);
  try {
    const response = await api(
      `/api/json/v1/1/filter.php?c=${selectedCategories}`
    );
    const recipe = await response.json();
    return recipe;
  } catch (error) {
    console.error("Error fetching recipe ", error);

    return undefined;
  }
};

// list meal categories
export const fetchAllMealCategories = async () => {
  try {
    const response = await api(`/api/json/v1/1/categories.php`);
    const categories = await response.json();
    return categories;
  } catch (error) {
    console.error("Error fetching categories ", error);

    return undefined;
  }
};
// list categories
export const fetchAllCategories = async () => {
  try {
    const response = await api(`/api/json/v1/1/list.php?c=list`);
    const categories = await response.json();
    return categories;
  } catch (error) {
    console.error("Error fetching categories ", error);

    return undefined;
  }
};
// list area
export const fetchAllArea = async () => {
  try {
    const response = await api(`/api/json/v1/1/list.php?a=list`);
    const categories = await response.json();
    return categories;
  } catch (error) {
    console.error("Error fetching categories ", error);

    return undefined;
  }
};
// list Ingredients
export const fetchAllIngredients = async () => {
  try {
    const response = await api(`/api/json/v1/1/list.php?i=list`);
    const categories = await response.json();
    return categories;
  } catch (error) {
    console.error("Error fetching categories ", error);

    return undefined;
  }
};
