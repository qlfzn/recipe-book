<template>
  <div v-if="recipes.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    <RecipeCard 
      v-for="recipe in recipes"
      :key="recipe.id"
      :recipe="recipe"
      @view="emit('view-recipe', $event)"
      @edit="emit('edit-recipe', $event)"
    />
  </div>
</template>

<script setup lang="ts">
import RecipeCard from './RecipeCard.vue'
import type { Recipe } from '../composables/useRecipes'

defineProps<{
  recipes: Recipe[]
  filters: Set<string>
}>()

const emit = defineEmits<{
  'edit-recipe': [recipe: Recipe]
  'view-recipe': [recipe: Recipe]
  'filter-by-tag': [tag: string | null]
}>()
</script>
