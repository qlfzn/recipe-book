<template>
  <div v-if="recipes.length > 0" class="mb-8">
    <div v-if="title" class="flex items-center gap-3 mb-4">
      <div :class="['w-3 h-3 rounded-full', type === 'today' ? 'bg-[#C4977D]' : 'bg-[#9CAF88]']"></div>
      <h3 :class="['font-display text-lg font-semibold', type === 'today' ? 'text-[#C4977D]' : 'text-[#4A4039]']">
        {{ title }}
      </h3>
      <span class="text-sm text-[#6B5B4F]/50">{{ recipes.length }} recipe{{ recipes.length > 1 ? 's' : '' }}</span>
    </div>

    <div :class="['ml-1.5 pl-5 border-l-2', type === 'today' ? 'border-[#C4977D]/30' : 'border-[#9CAF88]/30']">
      <TimelineCard 
        v-for="recipe in recipes"
        :key="recipe.id"
        :recipe="recipe"
        :type="type"
        @view="emit('view', $event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import TimelineCard from './TimelineCard.vue'
import type { Recipe } from '../composables/useRecipes'

defineProps<{
  title: string
  recipes: Recipe[]
  type: 'today' | 'upcoming' | 'past'
}>()

const emit = defineEmits<{
  'view': [recipe: Recipe]
}>()
</script>
