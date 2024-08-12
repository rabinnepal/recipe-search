import { FC, useState } from "react";

interface Category {
  strCategory: string;
}

interface CategoryListProps {
  categories: Category[];
  selectedCategories: string | null;
  onCategoryChange: (category: string) => void;
}

const Label: FC<{ htmlFor: string; children: React.ReactNode }> = ({
  htmlFor,
  children,
}) => (
  <label htmlFor={htmlFor} className="flex items-center gap-2">
    {children}
  </label>
);

const Checkbox: FC<{
  id: string;
  checked: boolean;
  onChange: () => void;
}> = ({ id, checked, onChange }) => (
  <input
    type="checkbox"
    id={id}
    className="form-checkbox rounded-full"
    checked={checked}
    onChange={onChange}
  />
);

const CategoryList: FC<CategoryListProps> = ({
  categories,
  selectedCategories,
  onCategoryChange,
}) => {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => setShowMore(!showMore);
  const visibleCategories = showMore ? categories : categories.slice(0, 10);

  const handleCategoryChange = (category: string) => {
    onCategoryChange(category);
  };

  return (
    <div>
      <h3 className="mb-2 text-sm font-medium">Categories</h3>
      <div className="grid gap-2">
        {visibleCategories.map((category) => (
          <Label key={category.strCategory} htmlFor={category.strCategory}>
            <Checkbox
              id={category.strCategory}
              checked={selectedCategories === category.strCategory}
              onChange={() => handleCategoryChange(category.strCategory)}
            />{" "}
            {category.strCategory}
          </Label>
        ))}
      </div>
      {categories.length > 10 && (
        <button
          onClick={toggleShowMore}
          className="mt-2 text-blue-500 hover:underline"
        >
          {showMore ? "Show Less" : "Show More"}
        </button>
      )}
    </div>
  );
};

export default CategoryList;
