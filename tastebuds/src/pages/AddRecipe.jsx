import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './AddRecipe.css'

export default function AddRecipe({ onAddRecipe, customRecipes, isEdit }) {
  const navigate = useNavigate()
  const { id } = useParams()
  const editingRecipe = isEdit ? customRecipes?.find(r => r.idMeal === id) : null

  const [form, setForm] = useState({ strMeal: '', strCategory: 'Chicken', strArea: '', strInstructions: '', customIngredients: '' })
  const [image, setImage] = useState('')
  const [preview, setPreview] = useState('')

  useEffect(() => {
    if (editingRecipe) {
      setForm({ strMeal: editingRecipe.strMeal, strCategory: editingRecipe.strCategory, strArea: editingRecipe.strArea, strInstructions: editingRecipe.strInstructions, customIngredients: editingRecipe.customIngredients || '' })
      setImage(editingRecipe.strMealThumb)
      setPreview(editingRecipe.strMealThumb)
    }
  }, [])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onloadend = () => { setImage(reader.result); setPreview(reader.result) }
    reader.readAsDataURL(file)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.strMeal || !form.strInstructions) return alert('3abbi el isim w el tari2a! 🙏')
    const newRecipe = {
      idMeal: editingRecipe ? editingRecipe.idMeal : 'custom-' + Date.now(),
      strMeal: form.strMeal,
      strCategory: form.strCategory,
      strArea: form.strArea || 'Homemade',
      strInstructions: form.strInstructions,
      customIngredients: form.customIngredients,
      strMealThumb: image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500',
      strTags: 'Homemade',
      isCustom: true
    }
    onAddRecipe(newRecipe)
    navigate('/')
  }

  return (
    <div className="add-page">
      <h1>{editingRecipe ? '✏️ Edit Recipe' : '➕ Add Your Recipe'}</h1>
      <form onSubmit={handleSubmit} className="add-form">
        <label>Recipe Name *</label>
        <input name="strMeal" value={form.strMeal} onChange={handleChange} placeholder="Ex: Mama's Kibbeh..." />
        <label>📸 Recipe Image</label>
        <div className="image-row">
          {preview ? <img src={preview} className="preview-img" alt="preview" /> : <div className="preview-placeholder">No Image Yet</div>}
          <label className="upload-btn">📤 Upload Image<input type="file" accept="image/*" onChange={handleImageUpload} hidden /></label>
        </div>
        <label>Category</label>
        <select name="strCategory" value={form.strCategory} onChange={handleChange}><option>Chicken</option><option>Beef</option><option>Pasta</option><option>Dessert</option><option>Vegan</option></select>
        <label>Country / Area</label>
        <input name="strArea" value={form.strArea} onChange={handleChange} placeholder="Ex: Lebanese, Italian..." />
        <label>🧂 Ingredients</label>
        <textarea name="customIngredients" value={form.customIngredients} onChange={handleChange} placeholder="1 cup flour, 2 eggs..." rows="4" />
        <label>👩‍🍳 Instructions *</label>
        <textarea name="strInstructions" value={form.strInstructions} onChange={handleChange} placeholder="Step 1: Mix..." rows="6" />
        <button type="submit" className="submit-btn">{editingRecipe ? '💾 Save Changes' : '✅ Publish Recipe'}</button>
      </form>
    </div>
  )
}