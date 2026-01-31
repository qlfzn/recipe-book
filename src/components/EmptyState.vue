<template>
  <div class="text-center py-16">
    <div
      class="w-16 h-16 mx-auto mb-6 bg-gray-100 rounded-lg flex items-center justify-center"
    >
      <svg
        class="w-8 h-8 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
        />
      </svg>
    </div>
    <h3 class="text-lg font-semibold text-gray-900 mb-2">No recipes yet</h3>
    <p class="text-gray-600 mb-6">Start by adding your first recipe.</p>
    <button
      @click="emit('add-recipe')"
      class="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-lg transition-colors font-medium text-sm"
    >
      <svg
        class="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 4v16m8-8H4"
        />
      </svg>
      Add recipe
    </button>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  "add-recipe": [];
}>();
</script>
