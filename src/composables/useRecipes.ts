import { ref } from 'vue'

export interface Recipe {
  id: string
  url: string
  title: string
  author: string
  description: string
  thumbnail: string
  tags: string[]
  plannedDate: string | null
  createdAt: string
  updatedAt: string
}

const STORAGE_KEY = 'tiktokRecipes'

const recipes = ref<Recipe[]>([])

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

  const addRecipe = async (recipe: Omit<Recipe, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newRecipe: Recipe = {
      ...recipe,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    recipes.value.unshift(newRecipe)
    saveToStorage()
    return newRecipe
  }

  const updateRecipe = async (recipe: Recipe) => {
    const index = recipes.value.findIndex(r => r.id === recipe.id)
    if (index !== -1) {
      recipes.value[index] = {
        ...recipe,
        updatedAt: new Date().toISOString()
      }
      saveToStorage()
    }
  }

  const deleteRecipe = async (id: string) => {
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
