import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import './RecipeDetails.css'
export default function RecipeDetails() {
  const { id } = useParams()
  const [meal, setMeal] = useState(null)
  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`).then(r => r.json()).then(d => setMeal(d.meals?.[0]))
  }, [id])
  if (!meal) return <p className="center">⏳ Loading...</p>
  const ingredients = []
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) ingredients.push(`${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}`)
  }
  return (
    <div className="details">
      <Link to="/">← Back</Link>
      <img src={meal.strMealThumb} alt={meal.strMeal} />
      <h1>{meal.strMeal}</h1>
      <p>📍 {meal.strArea} • 🍽️ {meal.strCategory} • 🏷️ {meal.strTags}</p>
      <h2>🧂 Ingredients</h2>
      <ul>{ingredients.map((ing, i) => <li key={i}>{ing}</li>)}</ul>
      <h2>👩‍🍳 Instructions</h2>
      <p className="instructions">{meal.strInstructions}</p>
      {meal.strYoutube && <a href={meal.strYoutube} target="_blank" rel="noreferrer" className="btn">▶️ Watch on YouTube</a>}
    </div>
  )
}