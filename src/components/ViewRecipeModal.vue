<template>
  <div class="fixed inset-0 z-50">
    <div class="modal-overlay absolute inset-0 bg-[#4A4039]/50 backdrop-blur-sm" @click="emit('close')"></div>
    <div class="absolute inset-4 md:inset-10 lg:inset-y-10 lg:left-1/4 lg:right-1/4 bg-[#FFFEFB] rounded-2xl shadow-2xl overflow-hidden flex flex-col">
      <div class="flex items-center justify-between px-6 py-4 border-b border-[#C4977D]/20">
        <h2 class="font-display text-xl font-semibold text-[#4A4039]">Recipe Details</h2>
        <button @click="emit('close')" class="p-2 hover:bg-[#F5EDE4] rounded-lg transition-colors">
          <svg class="w-5 h-5 text-[#6B5B4F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <div class="flex-1 overflow-y-auto p-6">
        <div class="max-w-lg mx-auto">
          <div v-if="recipe.thumbnail" class="w-full aspect-[9/16] max-h-80 rounded-xl overflow-hidden mb-6 bg-[#F5EDE4]">
            <img :src="recipe.thumbnail" :alt="recipe.title" class="w-full h-full object-cover">
          </div>

          <h3 class="font-display text-2xl font-semibold text-[#4A4039] mb-2">{{ recipe.title }}</h3>

          <p v-if="recipe.author" class="text-[#6B5B4F] mb-4 flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>
            {{ recipe.author }}
          </p>

          <div 
            v-if="recipe.plannedDate"
            :class="['mb-4 inline-flex items-center gap-2 px-3 py-2 rounded-lg',
              isToday ? 'bg-[#C4977D]/20 text-[#8B5A3C]' : isPast ? 'bg-gray-100 text-gray-500' : 'bg-[#9CAF88]/20 text-[#5A6B4D]']"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
            <span class="text-sm font-medium">
              {{ isToday ? '🍳 Cooking Today!' : isPast ? 'Was planned for ' + formattedDate : 'Planned for ' + formattedDate }}
            </span>
          </div>

          <div v-if="recipe.tags.length > 0" class="flex flex-wrap gap-2 mb-6">
            <span 
              v-for="tag in recipe.tags"
              :key="tag"
              class="px-3 py-1 bg-[#9CAF88]/20 text-[#6B5B4F] rounded-full text-sm"
            >
              {{ tag }}
            </span>
          </div>

          <div v-if="recipe.description" class="bg-[#F5EDE4] rounded-xl p-4">
            <h4 class="font-medium text-[#4A4039] mb-2">Notes & Description</h4>
            <p class="text-[#6B5B4F] whitespace-pre-wrap">{{ recipe.description }}</p>
          </div>
        </div>
      </div>

      <div class="flex items-center justify-between gap-3 px-6 py-4 border-t border-[#C4977D]/20 bg-[#FAF6F1]">
        <button 
          @click="emit('delete', recipe.id)"
          class="px-5 py-2.5 bg-red-50 border border-red-200 text-red-600 rounded-xl hover:bg-red-100 transition-colors font-medium"
        >
          Delete
        </button>
        <div class="flex gap-3">
          <button 
            @click="emit('edit', recipe)"
            class="px-5 py-2.5 bg-white border border-[#C4977D]/30 text-[#6B5B4F] rounded-xl hover:bg-[#F5EDE4] transition-colors font-medium"
          >
            Edit
          </button>
          <a 
            :href="recipe.url"
            target="_blank"
            class="px-5 py-2.5 bg-[#C4977D] hover:bg-[#B38A70] text-white rounded-xl transition-colors font-medium inline-flex items-center gap-2"
          >
            Open in TikTok
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { isDateToday, isDatePast, formatPlannedDate } from '../utils/dateUtils'
import type { Recipe } from '../composables/useRecipes'

const props = defineProps<{
  recipe: Recipe
}>()

const emit = defineEmits<{
  'close': []
  'edit': [recipe: Recipe]
  'delete': [id: string]
}>()

const isToday = computed(() => props.recipe.plannedDate ? isDateToday(props.recipe.plannedDate) : false)
const isPast = computed(() => props.recipe.plannedDate ? isDatePast(props.recipe.plannedDate) : false)
const formattedDate = computed(() => props.recipe.plannedDate ? formatPlannedDate(props.recipe.plannedDate) : null)
</script>
