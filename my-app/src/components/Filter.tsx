'use client'
import { useState, ChangeEvent } from "react";

interface FilterProps {
  categories: string[];
  tags: string[];
  onFilter: (filters: { category: string; tags: string[] }) => void;
}

const Filter: React.FC<FilterProps> = ({ categories, tags, onFilter }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const handleTagChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSelectedTags((prevTags) => {
      if (prevTags.includes(value)) {
        return prevTags.filter((tag) => tag !== value);
      } else {
        return [...prevTags, value];
      }
    });
  };

  const handleFilter = () => {
    const filters = {
      category: selectedCategory,
      tags: selectedTags,
    };
    onFilter(filters);
  };

  return (
    <div className="flex flex-col mb-8">
      <div className="flex flex-col mb-4">
        <label className="mr-2">Filter by Category:</label>
        <select
          className="border border-gray-300 rounded p-2"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="">All</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-row mb-4">
        <label className="mr-2">Filter by Tag:</label>
        {tags.map((tag) => (
          <div className="mr-2" key={tag}>
            <label>
              <input
                type="checkbox"
                value={tag}
                checked={selectedTags.includes(tag)}
                onChange={handleTagChange}
              />
              {tag}
            </label>
          </div>
        ))}
      </div>
      
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleFilter}
      >
        Apply Filter
      </button>
    </div>
  );
};

export default Filter;
