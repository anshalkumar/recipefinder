import React, { createContext, useState, useEffect } from 'react';

export const AvailableItemsContext = createContext();

export const AvailableItemsProvider = ({ children }) => {
  const [availableItems, setAvailableItems] = useState(() => {
    // Retrieve stored items from local storage on initial load
    const storedItems = localStorage.getItem('availableItems');
    return storedItems ? JSON.parse(storedItems) : [];
  });


  //  Function to the item in the list
  const addItem = (item) => {
    setAvailableItems((prevItems) => [...prevItems, item]);
  };

  const removeItem = (item) => {
    console.log(item);
    setAvailableItems((prevItems) => prevItems.filter((i) => i !== item));
  };

  // Store availableItems in local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('availableItems', JSON.stringify(availableItems));
  }, [availableItems]);

  return (
    <AvailableItemsContext.Provider value={{ availableItems, addItem, removeItem }}>
      {children}
    </AvailableItemsContext.Provider>
  );
};
