// components/common/Search.tsx
"use client";

import { FC, useState } from "react";

const Input: FC<{
  type: string;
  placeholder: string;
  className: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ type, placeholder, className, value, onChange }) => (
  <input
    type={type}
    placeholder={placeholder}
    className={`border rounded-lg p-2 ${className}`}
    value={value}
    onChange={onChange}
  />
);

const Search: FC<{ q: string; onSearch: (query: string) => void }> = ({
  q,
  onSearch,
}) => {
  const [query, setQuery] = useState(q);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <header className="sticky top-0 z-10 border-b bg-white px-4 py-3 md:px-6">
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <div className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search recipes..."
            className="w-full rounded-lg pl-8 md:w-[300px] lg:w-[400px]"
            value={query}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </header>
  );
};

export default Search;
