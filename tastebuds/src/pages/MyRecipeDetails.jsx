import { Link, useParams, useNavigate } from 'react-router-dom'
import './RecipeDetails.css'

export default function MyRecipeDetails({ customRecipes, onDeleteRecipe }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const meal = customRecipes.find(m => m.idMeal === id)
  if (!meal) return <p className="center">Recipe not found 😢 <br /><Link to="/" className="btn">Back Home</Link></p>

  const handleDelete = () => {
    if (window.confirm('Akidi baddik tm7i hay el wasfe? 😢')) {
      onDeleteRecipe(id)
      navigate('/')
    }
  }

  return (
    <div className="details">
      <Link to="/">← Back</Link>
      <span className="custom-badge">✨ Your Recipe</span>
      <img src={meal.strMealThumb} alt={meal.strMeal} />
      <h1>{meal.strMeal}</h1>
      <p>📍 {meal.strArea} • 🍽️ {meal.strCategory}</p>
      <div style={{display:'flex', gap:'10px', margin:'16px 0'}}>
        <Link to={`/edit/${meal.idMeal}`} style={{background:'#ff6b35', color:'white', padding:'10px 20px', borderRadius:'10px', fontWeight:'bold'}}>✏️ Edit</Link>
        <button onClick={handleDelete} style={{background:'#ff4444', color:'white', border:'none', padding:'10px 20px', borderRadius:'10px', fontWeight:'bold', cursor:'pointer'}}>🗑️ Delete</button>
      </div>
      <h2>🧂 Ingredients</h2>
      <p className="instructions">{meal.customIngredients}</p>
      <h2>👩‍🍳 Instructions</h2>
      <p className="instructions">{meal.strInstructions}</p>
    </div>
  )
}