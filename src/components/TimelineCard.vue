<template>
  <div class="mb-4 last:mb-0">
    <div 
      :class="[
        'recipe-card border rounded-xl p-4 cursor-pointer flex gap-4',
        cardBg
      ]"
      @click="emit('view', recipe)"
    >
      <div class="w-16 h-20 rounded-lg overflow-hidden bg-[#F5EDE4] flex-shrink-0">
        <img 
          v-if="recipe.thumbnail"
          :src="recipe.thumbnail" 
          :alt="recipe.title" 
          class="w-full h-full object-cover"
        >
        <div v-else class="w-full h-full flex items-center justify-center">
          <svg class="w-6 h-6 text-[#C4977D]/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
          </svg>
        </div>
      </div>

      <div class="flex-1 min-w-0">
        <div class="flex items-start justify-between gap-2">
          <h4 class="font-display font-semibold text-[#4A4039] line-clamp-1">{{ recipe.title }}</h4>
          <span class="text-xs text-[#6B5B4F]/60 whitespace-nowrap">{{ formattedDate }}</span>
        </div>
        <p v-if="recipe.author" class="text-sm text-[#6B5B4F]/70">by {{ recipe.author }}</p>
        <div v-if="recipe.tags.length > 0" class="flex flex-wrap gap-1 mt-2">
          <span 
            v-for="tag in recipe.tags.slice(0, 3)"
            :key="tag"
            class="px-2 py-0.5 bg-[#9CAF88]/20 text-[#6B5B4F] rounded-full text-xs"
          >
            {{ tag }}
          </span>
        </div>
      </div>

      <div class="flex items-center">
        <svg class="w-5 h-5 text-[#C4977D]/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { formatPlannedDateFull, isDateToday, isDatePast } from '../utils/dateUtils'
import type { Recipe } from '../composables/useRecipes'

const props = defineProps<{
  recipe: Recipe
  type: 'today' | 'upcoming' | 'past'
}>()

const emit = defineEmits<{
  'view': [recipe: Recipe]
}>()

const formattedDate = computed(() => props.recipe.plannedDate ? formatPlannedDateFull(props.recipe.plannedDate) : '')

const cardBg = computed(() => {
  if (props.type === 'today') return 'bg-[#C4977D]/10 border-[#C4977D]/20'
  if (props.type === 'past') return 'bg-gray-50 border-gray-200'
  return 'bg-white border-[#C4977D]/10'
})
</script>
