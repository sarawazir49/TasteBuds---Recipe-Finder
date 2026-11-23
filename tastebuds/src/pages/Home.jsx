import { useState, useEffect } from 'react'
import RecipeCard from '../components/RecipeCard'
import './Home.css'
const API = 'https://www.themealdb.com/api/json/v1/1'

export default function Home({ favorites, onToggleFav, customRecipes }) {
  const [meals, setMeals] = useState([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [loading, setLoading] = useState(true)

  const fetchMeals = async (query = '') => {
    setLoading(true)
    const res = await fetch(`${API}/search.php?s=${query}`)
    const data = await res.json()
    setMeals(data.meals || [])
    setLoading(false)
  }
  useEffect(() => { fetchMeals() }, [])
  const handleSearch = (e) => { e.preventDefault(); fetchMeals(search) }
  const filtered = category ? meals.filter(m => m.strCategory === category) : meals
  const filteredCustom = customRecipes.filter(meal => {
    const matchesSearch = meal.strMeal.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = category ? meal.strCategory === category : true
    return matchesSearch && matchesCategory
  })
  const allMeals = [...filteredCustom, ...filtered]

  return (
    <div>
      <div className="hero">
        <h1>What Are You Craving Today? 😋</h1>
        <p>Discover over 300 recipes from all around the world!</p>
        <form onSubmit={handleSearch} className="search-box">
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search... Pasta, Chicken, Pizza..." />
          <button type="submit">🔍 Search</button>
        </form>
        <div className="filters">
          <button onClick={() => setCategory('')} className={!category ? 'active' : ''}>All</button>
          <button onClick={() => setCategory('Chicken')} className={category==='Chicken' ? 'active' : ''}>Chicken</button>
          <button onClick={() => setCategory('Beef')} className={category==='Beef' ? 'active' : ''}>Beef</button>
          <button onClick={() => setCategory('Pasta')} className={category==='Pasta' ? 'active' : ''}>Pasta</button>
          <button onClick={() => setCategory('Dessert')} className={category==='Dessert' ? 'active' : ''}>Dessert</button>
          <button onClick={() => setCategory('Vegan')} className={category==='Vegan' ? 'active' : ''}>Vegan</button>
        </div>
      </div>
      {loading ? <p className="center">⏳ Loading recipes...</p> : (
        allMeals.length === 0 ? <p className="center">No recipes found 😢</p> : (
          <div className="grid">
            {allMeals.map(meal => <RecipeCard key={meal.idMeal} meal={meal} isFav={favorites.some(f => f.idMeal === meal.idMeal)} onToggleFav={onToggleFav} />)}
          </div>
        )
      )}
    </div>
  )
}