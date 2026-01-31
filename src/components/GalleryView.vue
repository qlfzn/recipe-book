<template>
  <div
    v-if="recipes.length > 0"
    class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
  >
    <RecipeCard
      v-for="recipe in recipes"
      :key="recipe.id"
      :recipe="recipe"
      @view="emit('view-recipe', $event)"
      @edit="emit('edit-recipe', $event)"
    />
  </div>
</template>

<script setup>
import RecipeCard from "./RecipeCard.vue";

defineProps({
  recipes: Array,
  filters: Object
});

const emit = defineEmits({
  'edit-recipe': {},
  'view-recipe': {},
  'filter-by-tag': {}
});
</script>
