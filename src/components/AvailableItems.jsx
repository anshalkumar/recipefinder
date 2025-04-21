import React, { useState, useContext , useEffect } from 'react';
import { AvailableItemsContext } from './AvailableItemsContext';


const AvailableItems = () => {
  //  State variables
  const { availableItems, addItem, removeItem } = useContext(AvailableItemsContext);
  const [item, setItem] = useState('');
  const [error, setError] = useState('');

  //  When Add Item is clicked 
  const handleAddItem = () => {
    if (!item.trim()) {
      setError('Please enter an item');
      return;
    }
    addItem(item);
    setItem('');
    setError('');
  };

  // When Remove Item is clicked
  const handleRemoveItem = (item) => {
    // console.log(item);
    removeItem(item);
  };

 
  // If the user enters the key "Enter", the handleAddItem function will be called
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddItem();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4 md:p-6 lg:p-8">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"> 
        <a href="/">Search Items</a>
      </button>
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800">
            Available Items
          </h1>

          <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Enter item"
                value={item}
                onChange={(e) => {
                  setItem(e.target.value);
                  setError('');
                }}
                onKeyPress={handleKeyPress}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-700 placeholder-gray-400"
              />
            </div>
            <button
              onClick={handleAddItem}
              className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Add Item
            </button>
          </div>

          {error && (
            <p className="text-red-500 text-center mb-6 bg-red-50 py-2 px-4 rounded-lg">
              {error}
            </p>
          )}

          <div className="mt-8">
            {availableItems.length === 0 ? (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <p className="text-gray-500">No items available</p>
              </div>
            ) : (
              <ul className="space-y-3">
                {availableItems.map((item, index) => (
                  <li 
                    key={index}
                    className="flex items-center justify-between bg-white border border-gray-200 rounded-lg p-4 group hover:shadow-md transition-all duration-200"
                  >
                    <span className="text-gray-700">{item}</span>
                    <button
                      onClick={() => handleRemoveItem(item)}
                      className="text-gray-400 hover:text-red-500 p-1 rounded-full hover:bg-red-50 transition-all duration-200 opacity-0 group-hover:opacity-100"
                      aria-label="Remove item"
                    >
                      <svg 
                        className="w-5 h-5" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth="2" 
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {availableItems.length > 0 && (
            <div className="mt-6 text-center text-gray-500 text-sm">
              Total items: {availableItems.length}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AvailableItems;