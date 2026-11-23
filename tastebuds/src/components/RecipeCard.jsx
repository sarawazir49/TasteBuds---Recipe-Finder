import { Link } from 'react-router-dom'
import './RecipeCard.css'
export default function RecipeCard({ meal, isFav, onToggleFav }) {
  return (
    <div className="card">
      <Link to={meal.isCustom ? `/my-recipe/${meal.idMeal}` : `/recipe/${meal.idMeal}`}>
        <img src={meal.strMealThumb} alt={meal.strMeal} />
        <div className="card-body">
          <h3>{meal.strMeal}</h3>
          <p>📍 {meal.strArea} • 🍽️ {meal.strCategory}</p>
          {meal.isCustom && <span className="custom-tag">✨ Your Recipe</span>}
        </div>
      </Link>
      <button className="fav-btn" onClick={() => onToggleFav(meal)}>{isFav ? '❤️' : '🤍'}</button>
    </div>
  )
}