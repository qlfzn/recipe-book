<template>
  <header class="sticky top-0 z-40 bg-white border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4 py-3">
      <div class="flex items-center justify-between gap-4">
        <h1 class="text-2xl font-semibold text-gray-900">letmecook</h1>

        <div class="flex-1 max-w-md">
          <div class="relative">
            <svg
              class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search..."
              class="w-full pl-10 pr-4 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-300"
            />
          </div>
        </div>

        <div class="flex items-center gap-2">
          <button
            class="flex items-center gap-2 px-3 py-1.5 bg-gray-900 hover:bg-gray-800 text-white rounded-lg transition-colors font-medium text-sm"
            @click="$emit('add-recipe')"
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
            New
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
const emit = defineEmits({
  'add-recipe': {}
});
</script>
