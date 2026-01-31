import { ref } from 'vue'

const STORAGE_KEY = 'tiktokRecipes'

const recipes = ref([])

export function useRecipes() {
  const loadRecipes = () => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      recipes.value = JSON.parse(stored)
    }
  }

  const saveToStorage = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes.value))
  }

  const addRecipe = async (recipe) => {
    const newRecipe = {
      ...recipe,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    recipes.value.unshift(newRecipe)
    saveToStorage()
    return newRecipe
  }

  const updateRecipe = async (recipe) => {
    const index = recipes.value.findIndex(r => r.id === recipe.id)
    if (index !== -1) {
      recipes.value[index] = {
        ...recipe,
        updatedAt: new Date().toISOString()
      }
      saveToStorage()
    }
  }

  const deleteRecipe = async (id) => {
    recipes.value = recipes.value.filter(r => r.id !== id)
    saveToStorage()
  }

  return {
    recipes,
    loadRecipes,
    addRecipe,
    updateRecipe,
    deleteRecipe
  }
}
