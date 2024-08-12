"use client";

import { FC, useState, useEffect } from "react";
import RecipeCard from "@/components/Recipe/RecipeCard";
import {
  fetchAllArea,
  fetchAllCategories,
  fetchRecipeByAreas,
  fetchRecipeByCategories,
  searchRecipeByName,
} from "@/components/api/route";
import CuisineList from "./CuisineList";
import CategoryList from "./CategoryList";
import { IoClose } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import Loading from "../common/Loading";

const Home: FC = () => {
  const [q, setQ] = useState<string>("");
  const [recipes, setRecipes] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [areas, setAreas] = useState<any[]>([]);
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string | null>(
    null
  );
  const [sidebarVisible, setSidebarVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true); // Add loading state

  const fetchRecipeData = async () => {
    setLoading(true);
    try {
      const [searchResults, areaResults, categoryResults] =
        await Promise.allSettled([
          searchRecipeByName({ q }),
          selectedArea
            ? fetchRecipeByAreas({ selectedArea })
            : Promise.resolve({ meals: [] }),
          selectedCategories
            ? fetchRecipeByCategories({
                selectedCategories,
              })
            : Promise.resolve({ meals: [] }),
        ]);

      const searchMeals =
        searchResults.status === "fulfilled"
          ? searchResults.value?.meals || []
          : [];
      const areaMeals =
        areaResults.status === "fulfilled"
          ? areaResults.value?.meals || []
          : [];
      const categoryMeals =
        categoryResults.status === "fulfilled"
          ? categoryResults.value?.meals || []
          : [];

      // Combine results based on filters
      let recipesToShow: any[] = [];

      if (selectedArea && selectedCategories) {
        // If both area and categories are selected, filter the combined results
        const filteredByArea = areaMeals.filter(
          (meal: any) => selectedCategories
        );
        recipesToShow = filteredByArea;
      } else if (selectedArea) {
        // If only area is selected
        recipesToShow = areaMeals;
      } else if (selectedCategories) {
        // If only categories are selected
        recipesToShow = categoryMeals;
      } else {
        // If neither is selected, use search results
        recipesToShow = searchMeals;
      }

      setRecipes(recipesToShow);
    } catch (error) {
      console.error("Error fetching recipe data:", error);
    } finally {
      setLoading(false); // Set loading to false after fetch is complete
    }
  };
  console.log(loading);
  const fetchCategories = async () => {
    setLoading(true); // Set loading to true before starting fetch
    try {
      const [categoriesResult, areaResult] = await Promise.allSettled([
        fetchAllCategories(),
        fetchAllArea(),
      ]);

      if (categoriesResult.status === "fulfilled") {
        setCategories(categoriesResult.value?.meals || []);
      }
      if (areaResult.status === "fulfilled") {
        setAreas(areaResult.value?.meals || []);
      }
    } catch (error) {
      console.error("Error fetching categories or areas:", error);
    } finally {
      setLoading(false); // Set loading to false after fetch is complete
    }
  };

  useEffect(() => {
    fetchRecipeData();
    fetchCategories();
  }, [q, selectedArea, selectedCategories]);

  const handleSearch = (query: string) => {
    setQ(query);
  };

  const handleAreaChange = (area: string | null) => {
    setSelectedArea(area);
  };

  const handleCategoryChange = (cat: string | null) => {
    setSelectedCategories(cat);
  };

  const resetFilters = () => {
    setSelectedArea(null);
    setSelectedCategories(null);
  };

  return (
    <div className="flex min-h-screen w-full bg-gray-100">
      {/* Sidebar for Desktop */}
      <aside className="relative hidden w-64 border-r bg-white p-6 md:block">
        <div className="flex flex-col h-full">
          <div className="flex-1">
            <h2 className="mb-4 text-lg font-semibold">Filters</h2>
            <button
              onClick={resetFilters}
              className="my-4 w-full rounded bg-blue-500 py-2 text-white hover:bg-blue-600"
            >
              Reset Filters
            </button>
            <div className="grid gap-6">
              <CuisineList
                areas={areas}
                selectedArea={selectedArea}
                onAreaChange={handleAreaChange}
              />
              <CategoryList
                categories={categories}
                selectedCategories={selectedCategories}
                onCategoryChange={handleCategoryChange}
              />
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Filter Toggle Button */}
      <div
        className={`block lg:hidden fixed bg-white text-font-primary z-[1100] w-[100vw] h-[100vh] top-0 shadow duration-300 ease-in ${
          sidebarVisible ? "left-0" : "-left-[100vw]"
        }`}
      >
        <div className="flex flex-col h-full px-4 pt-8">
          <button
            onClick={() => setSidebarVisible(false)}
            className="absolute top-4 right-4 cursor-pointer duration-200 ease-in hover:opacity-70 flex items-center justify-center"
          >
            <IoClose className="fill-font-primary scale-100" />
          </button>
          <div className="flex-1">
            <h2 className="mb-4 text-lg font-semibold">Filters</h2>
            <button
              onClick={() => {
                resetFilters();
                setSidebarVisible(false);
              }}
              className="my-4 w-full rounded bg-blue-500 py-2 text-white hover:bg-blue-600"
            >
              Reset Filters
            </button>
            <div
              className="grid gap-6"
              onClick={() => setSidebarVisible(false)}
            >
              <CuisineList
                areas={areas}
                selectedArea={selectedArea}
                onAreaChange={handleAreaChange}
              />
              <CategoryList
                categories={categories}
                selectedCategories={selectedCategories}
                onCategoryChange={handleCategoryChange}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1">
        <header className="sticky top-0 z-10 border-b bg-white px-4 py-3 md:px-6">
          <div className="flex items-center gap-4">
            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setSidebarVisible(true)}
              className="md:hidden p-3"
            >
              <RxHamburgerMenu size={24} />
            </button>
            <div className="relative flex-1">
              <input
                type="search"
                placeholder="Search recipes..."
                className="w-full rounded-lg border p-2 pl-8 md:w-[300px] lg:w-[400px]"
                value={q}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
          </div>
        </header>
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <Loading /> {/* Show loader component */}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 p-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:p-6">
            {recipes.length > 0 ? (
              recipes.map((recipe, i) => <RecipeCard key={i} recipe={recipe} />)
            ) : (
              <p>No recipes found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
