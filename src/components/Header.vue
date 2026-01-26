<template>
  <header class="sticky top-0 z-40 bg-[#FAF6F1]/95 backdrop-blur-sm border-b border-[#C4977D]/20">
    <div class="max-w-7xl mx-auto px-4 py-4">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-[#C4977D] rounded-full flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
            </svg>
          </div>
          <h1 class="font-display text-2xl font-bold text-[#4A4039]">Recipe Keeper</h1>
        </div>

        <!-- Search Bar -->
        <div class="flex-1 max-w-xl">
          <div class="relative">
            <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B5B4F]/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            <input 
              type="text" 
              placeholder="Search recipes by title, tags, or description..."
              class="w-full pl-10 pr-4 py-2.5 bg-white border border-[#C4977D]/30 rounded-xl text-[#4A4039] placeholder-[#6B5B4F]/50"
            >
          </div>
        </div>

        <!-- Add Recipe Button -->
        <button 
          class="flex items-center gap-2 px-5 py-2.5 bg-[#C4977D] hover:bg-[#B38A70] text-white rounded-xl transition-colors font-medium"
          @click="$emit('add-recipe')"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
          </svg>
          Add Recipe
        </button>

        <!-- AI Settings Button -->
        <button 
          class="flex items-center gap-2 px-3 py-2.5 bg-[#F5EDE4] hover:bg-[#E8DDD2] text-[#6B5B4F] rounded-xl transition-colors"
          title="AI Settings"
          @click="$emit('open-api-modal')"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
          </svg>
          <span :class="['w-2 h-2 rounded-full', aiEnabled ? 'bg-[#9CAF88]' : 'bg-gray-300']"></span>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
defineProps<{
  aiEnabled: boolean
}>()

const emit = defineEmits<{
  'open-api-modal': []
  'add-recipe': []
  'open-search': []
}>()
</script>
