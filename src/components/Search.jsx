import React, { useState , useContext } from 'react';
import Modal from 'react-modal';
import { AvailableItemsContext } from './AvailableItemsContext';

Modal.setAppElement('#root');


const Search = () => {
    // State variables
    const {availableItems , addItem , removeItem}= useContext(AvailableItemsContext);
    const [input, setInput] = useState("");
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [selectedMeal, setSelectedMeal] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);


    // Function to get the recipes for the selected ingredient
    const getRecipes = async () => {
        if (!input.trim()) {
            setError("Please enter an ingredient");
            return;
        }

        setLoading(true);
        setError("");
        try {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${input}`);
            const data = await response.json();
            if (data.meals) {
                setRecipes(data.meals);
            } else {
                setRecipes([]);
                setError("No recipes found.");
            }
        } catch (error) {
            console.error(error);
            setError("Network Error. Please try again.");
        } finally {
            setLoading(false);
        }
    };


    // Function to handle the click event on a recipe
    const handleMealClick = async (mealId) => {
        try {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
            const data = await response.json();
            if (data.meals) {
                setSelectedMeal(data.meals[0]);
                setIsModalOpen(true);
            }
        } catch (error) {
            console.error("Error fetching meal details:", error);
            setError("Unable to load meal details.");
        }
    };


    // Modal Function
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedMeal(null);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                <a href="/Available">Available Items</a>
            </button>
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 text-gray-800">
                    Recipe Finder
                </h1>

                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
                    <div className="relative w-full max-w-md">
                        <input
                            type="text"
                            placeholder="Enter main ingredient"
                            value={input}
                            onChange={(e) => {
                                setInput(e.target.value);
                                setError("");
                            }}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <select
                        onChange={(e) => setInput(e.target.value)}
                        value={input}
                        className="w-full max-w-md px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="">Select an ingredient</option>
                        {availableItems.map((ingredient, index) => (
                            <option key={index} value={ingredient}>
                                {ingredient}
                            </option>
                        ))}
                    </select>
                    <button
                        onClick={getRecipes}
                        className="w-full sm:w-auto px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 ease-in-out"
                    >
                        Search Recipes
                    </button>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center min-h-[200px]">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                ) : error ? (
                    <div className="text-center p-4">
                        <p className="text-red-500 text-lg">{error}</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {recipes.map((recipe) => (
                            <div
                                key={recipe.idMeal}
                                onClick={() => handleMealClick(recipe.idMeal)}
                                className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                            >
                                <div className="relative overflow-hidden">
                                    <img
                                        src={recipe.strMealThumb}
                                        alt={recipe.strMeal}
                                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>
                                <div className="p-4">
                                    <h2 className="text-lg font-semibold text-gray-800 line-clamp-2">
                                        {recipe.strMeal}
                                    </h2>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <Modal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-0 outline-none"
                    overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4"
                >
                    {selectedMeal && (
                        <div>
                            <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
                                <h2 className="text-xl font-semibold text-gray-800">
                                    {selectedMeal.strMeal}
                                </h2>
                                <button
                                    onClick={closeModal}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <div className="p-4">
                                <img
                                    src={selectedMeal.strMealThumb}
                                    alt={selectedMeal.strMeal}
                                    className="w-full h-64 object-cover rounded-lg mb-6"
                                />
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-lg font-semibold mb-2">Instructions</h3>
                                        <p className="text-gray-600 whitespace-pre-line">
                                            {selectedMeal.strInstructions}
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold mb-2">Ingredients</h3>
                                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                            {[...Array(20)].map((_, index) => {
                                                const ingredient = selectedMeal[`strIngredient${index + 1}`];
                                                const measure = selectedMeal[`strMeasure${index + 1}`];
                                                return ingredient ? (
                                                    <li key={index} className="text-gray-600">
                                                        {`${measure} ${ingredient}`.trim()}
                                                    </li>
                                                ) : null;
                                            })}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </Modal>
            </div>
        </div>
    );
};

export default Search;
