<template>
  <div class="space-y-4">
    <div>
      <label class="block text-sm font-medium text-[#4A4039] mb-2">Tags</label>
      <div id="selectedTags" class="flex flex-wrap gap-2 mb-3">
        <span 
          v-for="tag in modelValue"
          :key="tag"
          class="inline-flex items-center gap-1 px-3 py-1.5 bg-[#9CAF88] text-white rounded-full text-sm"
        >
          {{ tag }}
          <button 
            @click="removeTag(tag)"
            class="hover:bg-white/20 rounded-full p-0.5"
          >
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </span>
      </div>

      <div class="flex gap-2">
        <input 
          v-model="tagInput"
          type="text" 
          placeholder="Add a tag (e.g., japanese, dinner, quick)"
          class="flex-1 px-4 py-2.5 bg-white border border-[#C4977D]/30 rounded-xl text-[#4A4039]"
          @keypress.enter="addTag"
        >
        <button 
          @click="addTag"
          class="px-4 py-2.5 bg-[#F5EDE4] hover:bg-[#E8DDD2] text-[#6B5B4F] rounded-xl transition-colors font-medium"
        >
          Add Tag
        </button>
      </div>

      <div class="mt-3">
        <p class="text-xs text-[#6B5B4F]/70 mb-2">Suggested tags:</p>
        <div class="flex flex-wrap gap-2">
          <button 
            v-for="tag in suggestedTags"
            :key="tag"
            @click="addSuggestedTag(tag)"
            class="px-3 py-1 text-xs bg-[#F5EDE4] hover:bg-[#E8DDD2] text-[#6B5B4F] rounded-full transition-colors"
          >
            {{ tag }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  modelValue: string[]
}>()

const emit = defineEmits<{
  'update:modelValue': [tags: string[]]
}>()

const tagInput = ref('')

const suggestedTags = [
  'breakfast', 'lunch', 'dinner', 'dessert', 'quick',
  'healthy', 'asian', 'western', 'vegetarian', 'noodles'
]

const addTag = () => {
  const tag = tagInput.value.trim().toLowerCase()
  if (tag && !props.modelValue.includes(tag)) {
    emit('update:modelValue', [...props.modelValue, tag])
    tagInput.value = ''
  }
}

const addSuggestedTag = (tag: string) => {
  if (!props.modelValue.includes(tag)) {
    emit('update:modelValue', [...props.modelValue, tag])
  }
}

const removeTag = (tag: string) => {
  emit('update:modelValue', props.modelValue.filter(t => t !== tag))
}
</script>
