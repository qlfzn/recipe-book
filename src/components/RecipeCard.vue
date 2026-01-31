<template>
  <div
    class="recipe-card bg-white rounded-lg overflow-hidden border border-gray-200 cursor-pointer hover:shadow-md transition-shadow"
    @click="emit('view', recipe)"
  >
    <div class="aspect-[9/12] bg-gray-100 relative overflow-hidden">
      <img 
        v-if="recipe.thumbnail"
        :src="recipe.thumbnail" 
        :alt="recipe.title" 
        class="w-full h-full object-cover"
      >
      <div v-else class="w-full h-full flex items-center justify-center">
        <svg class="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
        </svg>
      </div>

      <div class="absolute top-2 right-2">
        <button 
          @click.stop="emit('edit', recipe)"
          class="p-2 bg-white hover:bg-gray-50 rounded border border-gray-200 shadow-sm transition-colors"
        >
          <svg class="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
          </svg>
        </button>
      </div>

      <div v-if="recipe.plannedDate" class="absolute bottom-2 left-2 right-2">
        <div 
          :class="[
            'inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded text-xs font-medium',
            isToday ? 'bg-gray-900 text-white' : isPast ? 'bg-gray-500 text-white' : 'bg-white border border-gray-300 text-gray-900'
          ]"
        >
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
          </svg>
          {{ isToday ? '🍳 Today' : formattedDate }}
        </div>
      </div>
    </div>

    <div class="p-4">
      <h3 class="font-semibold text-gray-900 mb-1 line-clamp-2 text-sm">{{ recipe.title }}</h3>
      <p v-if="recipe.author" class="text-xs text-gray-600 mb-3">by {{ recipe.author }}</p>
      <div v-else class="mb-3"></div>

      <div v-if="recipe.tags.length > 0" class="flex flex-wrap gap-1.5">
        <span 
          v-for="tag in recipe.tags.slice(0, 3)"
          :key="tag"
          class="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs"
        >
          {{ tag }}
        </span>
        <span v-if="recipe.tags.length > 3" class="px-2 py-0.5 text-gray-500 text-xs">
          +{{ recipe.tags.length - 3 }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { isDateToday, isDatePast, formatPlannedDate } from '../utils/dateUtils.js'

const props = defineProps({
  recipe: Object
})

const emit = defineEmits(['view', 'edit'])

const isToday = computed(() => props.recipe.plannedDate ? isDateToday(props.recipe.plannedDate) : false)
const isPast = computed(() => props.recipe.plannedDate ? isDatePast(props.recipe.plannedDate) : false)
const formattedDate = computed(() => props.recipe.plannedDate ? formatPlannedDate(props.recipe.plannedDate) : null)
</script>
