import React, { useContext } from 'react';
import myContext from '../../context/data/myContext';

function Filter({ onFilterChange }) {
  const context = useContext(myContext);
  const { searchkey, setSearchkey, filterType, setFilterType, product } = context;

  const resetFilters = () => {
    setSearchkey('');
    setFilterType(''); // Reset the filterType state to clear the selected category
    onFilterChange('', ''); // Reset filters by calling the onFilterChange callback with empty values
  };

  // Extract unique categories from products
  const uniqueCategories = [...new Set(product.map(item => item.category))];

  // Function to handle category filter change
  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setFilterType(selectedCategory); // Update the filterType state with the selected category
    onFilterChange(selectedCategory, ''); // Call the onFilterChange callback with the selected category
  };

  return (
    <div className="container mx-auto px-4 mt-5">
      <div className="p-5 rounded-lg bg-gray-100 border border-gray-200">
        <div className="relative">
          {/* Search input */}
        </div>
        <div className="flex items-center justify-between mt-4">
          <p className="font-medium">Filters</p>
          <button onClick={resetFilters} className="px-4 py-2 bg-gray-50hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-md">
            Reset Filter
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
          <select value={filterType} onChange={handleCategoryChange} className="px-4 py-3 w-full rounded-md bg-gray-50 border-transparent outline-0 focus:border-gray-500 focus:bg-white focus:ring-0 text-sm">
            <option value="">Select Category</option>
            {uniqueCategories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default Filter;
