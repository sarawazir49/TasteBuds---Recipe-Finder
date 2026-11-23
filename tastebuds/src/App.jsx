import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import RecipeDetails from './pages/RecipeDetails'
import MyRecipeDetails from './pages/MyRecipeDetails'
import Favorites from './pages/Favorites'
import AddRecipe from './pages/AddRecipe'
import './App.css'

export default function App() {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('tastebuds-favs')
    return saved ? JSON.parse(saved) : []
  })
  useEffect(() => { localStorage.setItem('tastebuds-favs', JSON.stringify(favorites)) }, [favorites])
  const toggleFav = (meal) => {
    setFavorites(prev => prev.some(f => f.idMeal === meal.idMeal) ? prev.filter(f => f.idMeal !== meal.idMeal) : [...prev, meal])
  }

  const [customRecipes, setCustomRecipes] = useState(() => {
    const saved = localStorage.getItem('tastebuds-custom')
    return saved ? JSON.parse(saved) : []
  })
  useEffect(() => { localStorage.setItem('tastebuds-custom', JSON.stringify(customRecipes)) }, [customRecipes])

  const addRecipe = (recipe) => setCustomRecipes(prev => [recipe, ...prev])
  const updateRecipe = (updated) => setCustomRecipes(prev => prev.map(r => r.idMeal === updated.idMeal ? updated : r))
  const deleteRecipe = (id) => setCustomRecipes(prev => prev.filter(r => r.idMeal !== id))

  return (
    <BrowserRouter>
      <Navbar favoritesCount={favorites.length} />
      <main>
        <Routes>
          <Route path="/" element={<Home favorites={favorites} onToggleFav={toggleFav} customRecipes={customRecipes} />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
          <Route path="/my-recipe/:id" element={<MyRecipeDetails customRecipes={customRecipes} onDeleteRecipe={deleteRecipe} />} />
          <Route path="/favorites" element={<Favorites favorites={favorites} onToggleFav={toggleFav} />} />
          <Route path="/add" element={<AddRecipe onAddRecipe={addRecipe} />} />
          <Route path="/edit/:id" element={<AddRecipe onAddRecipe={updateRecipe} customRecipes={customRecipes} isEdit={true} />} />
        </Routes>
      </main>
      <footer>🍔 TasteBuds - Made with ❤️ by Sara</footer>
    </BrowserRouter>
  )
}