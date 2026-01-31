<template>
  <div></div>
</template>

<script setup>
defineProps({
  searchQuery: String
})

const emit = defineEmits({
  'update-search': {}
})
</script>
