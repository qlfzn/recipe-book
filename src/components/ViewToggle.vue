<template>
  <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
    <!-- View Toggle -->
    <div class="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
      <button 
        @click="emit('change-view', 'gallery')"
        :class="['flex items-center gap-2 px-4 py-2 rounded text-sm font-medium transition-all', 
          currentView === 'gallery' 
            ? 'bg-white text-gray-900 shadow-sm' 
            : 'text-gray-600 hover:bg-white/50']"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
        </svg>
        Gallery
      </button>
      <button 
        @click="emit('change-view', 'timeline')"
        :class="['flex items-center gap-2 px-4 py-2 rounded text-sm font-medium transition-all',
          currentView === 'timeline'
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-gray-600 hover:bg-white/50']"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
        </svg>
        Timeline
        <span v-if="upcomingCount > 0" class="px-1.5 py-0.5 bg-gray-900 text-white text-xs rounded-full">{{ upcomingCount }}</span>
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  currentView: String,
  upcomingCount: Number
})

const emit = defineEmits(['change-view'])
</script>
