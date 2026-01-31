<template>
  <div v-if="recipes.length > 0" class="mb-8">
    <div v-if="title" class="flex items-center gap-3 mb-4">
      <div :class="['w-3 h-3 rounded-full', type === 'today' ? 'bg-gray-900' : 'bg-gray-400']"></div>
      <h3 :class="['text-lg font-semibold', type === 'today' ? 'text-gray-900' : 'text-gray-900']">
        {{ title }}
      </h3>
      <span class="text-sm text-gray-600">{{ recipes.length }} recipe{{ recipes.length > 1 ? 's' : '' }}</span>
    </div>

    <div :class="['ml-1.5 pl-5 border-l-2', type === 'today' ? 'border-gray-900/30' : 'border-gray-300']">
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

<script setup>
import TimelineCard from './TimelineCard.vue'

defineProps({
  title: String,
  recipes: Array,
  type: String
})

const emit = defineEmits(['view'])
</script>
