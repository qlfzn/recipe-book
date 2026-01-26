<template>
  <div></div>
</template>

<script setup lang="ts">
defineProps<{
  searchQuery: string
}>()

const emit = defineEmits<{
  'update-search': [query: string]
}>()
</script>
