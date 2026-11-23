import RecipeCard from '../components/RecipeCard'
export default function Favorites({ favorites, onToggleFav }) {
  if (favorites.length === 0) return <p className="center">No favorites yet 😢<br />Dossi 3al ❤️ la t7afzi wasfe!</p>
  return (
    <div>
      <h1 className="center">❤️ My Favorites</h1>
      <div className="grid">{favorites.map(meal => <RecipeCard key={meal.idMeal} meal={meal} isFav={true} onToggleFav={onToggleFav} />)}</div>
    </div>
  )
}