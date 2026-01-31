<template>
  <div v-if="recipes.length > 0" class="mb-8">
    <div v-if="title" class="flex items-center gap-3 mb-4">
      <div
        :class="[
          'w-2 h-2 rounded-full',
          type === 'today' ? 'bg-gray-900' : 'bg-gray-400',
        ]"
      ></div>
      <h3
        :class="[
          'text-base font-semibold',
          type === 'today' ? 'text-gray-900' : 'text-gray-900',
        ]"
      >
        {{ title }}
      </h3>
      <span class="text-xs text-gray-600">{{ recipes.length }}</span>
    </div>

    <div
      :class="[
        'ml-0 pl-6 border-l-2',
        type === 'today' ? 'border-gray-900/20' : 'border-gray-300',
      ]"
    >
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
import TimelineCard from "./TimelineCard.vue";
import type { Recipe } from "../composables/useRecipes";

defineProps<{
  title: string;
  recipes: Recipe[];
  type: "today" | "upcoming" | "past";
}>();

const emit = defineEmits<{
  view: [recipe: Recipe];
}>();
</script>
