<template>
  <div class="fixed inset-0 z-50">
    <div class="modal-overlay absolute inset-0 bg-[#4A4039]/50 backdrop-blur-sm" @click="handleClose"></div>
    <div class="absolute inset-4 md:inset-10 lg:inset-20 bg-[#FFFEFB] rounded-2xl shadow-2xl overflow-hidden flex flex-col">
      <!-- Modal Header -->
      <div class="flex items-center justify-between px-6 py-4 border-b border-[#C4977D]/20">
        <h2 class="font-display text-xl font-semibold text-[#4A4039]">{{ recipe?.id ? 'Edit Recipe' : 'Add New Recipe' }}</h2>
        <button @click="handleClose" class="p-2 hover:bg-[#F5EDE4] rounded-lg transition-colors">
          <svg class="w-5 h-5 text-[#6B5B4F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <!-- Modal Content -->
      <div class="flex-1 overflow-y-auto p-6">
        <div class="max-w-2xl mx-auto space-y-6">
          <!-- URL Input -->
          <div v-if="!editMode">
            <label class="block text-sm font-medium text-[#4A4039] mb-2">TikTok Video URL</label>
            <div class="flex gap-3">
              <input 
                v-model="form.url"
                type="url" 
                placeholder="https://www.tiktok.com/@username/video/..."
                class="flex-1 px-4 py-3 bg-white border border-[#C4977D]/30 rounded-xl text-[#4A4039]"
              >
              <button 
                @click="fetchMetadata"
                :disabled="loading"
                class="px-5 py-3 bg-[#9CAF88] hover:bg-[#8A9E79] text-white rounded-xl transition-colors font-medium flex items-center gap-2 disabled:opacity-50"
              >
                <span v-if="!loading">Fetch</span>
                <span v-else>Processing...</span>
                <div v-if="loading" class="loading-spinner"></div>
              </button>
            </div>
            <p class="mt-2 text-sm text-[#6B5B4F]/70 flex items-center gap-2">
              Paste your TikTok recipe video URL and click Fetch to auto-fill details
            </p>
          </div>

          <!-- Edit Section -->
          <div v-if="editMode" class="space-y-6">
            <!-- Thumbnail Preview -->
            <div class="flex gap-6">
              <div class="w-40 h-56 rounded-xl overflow-hidden bg-[#F5EDE4] flex-shrink-0">
                <img 
                  v-if="form.thumbnail" 
                  :src="form.thumbnail" 
                  :alt="form.title"
                  class="w-full h-full object-cover"
                >
                <div v-else class="w-full h-full flex items-center justify-center">
                  <svg class="w-12 h-12 text-[#C4977D]/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                  </svg>
                </div>
              </div>

              <div class="flex-1 space-y-4">
                <!-- Title -->
                <div>
                  <label class="block text-sm font-medium text-[#4A4039] mb-2">Recipe Title</label>
                  <input 
                    v-model="form.title"
                    type="text" 
                    placeholder="Give your recipe a memorable name..."
                    class="w-full px-4 py-3 bg-white border border-[#C4977D]/30 rounded-xl text-[#4A4039]"
                  >
                </div>

                <!-- Author -->
                <div>
                  <label class="block text-sm font-medium text-[#4A4039] mb-2">Creator</label>
                  <input 
                    v-model="form.author"
                    type="text" 
                    placeholder="TikTok creator name"
                    class="w-full px-4 py-3 bg-white border border-[#C4977D]/30 rounded-xl text-[#4A4039]"
                  >
                </div>
              </div>
            </div>

            <!-- Description -->
            <div>
              <label class="block text-sm font-medium text-[#4A4039] mb-2">Description / Recipe Notes</label>
              <textarea 
                v-model="form.description"
                rows="4"
                placeholder="Add any recipe steps, ingredients, or notes from the video caption..."
                class="w-full px-4 py-3 bg-white border border-[#C4977D]/30 rounded-xl text-[#4A4039] resize-none"
              ></textarea>
            </div>

            <!-- Plan to Cook Date -->
            <div>
              <label class="block text-sm font-medium text-[#4A4039] mb-2">
                Plan to Cook 
                <span class="font-normal text-[#6B5B4F]/70">(optional)</span>
              </label>
              <div class="flex gap-3 items-center">
                <input 
                  v-model="form.plannedDate"
                  type="date" 
                  class="flex-1 px-4 py-3 bg-white border border-[#C4977D]/30 rounded-xl text-[#4A4039]"
                >
                <button 
                  @click="form.plannedDate = null"
                  class="px-4 py-3 bg-[#F5EDE4] hover:bg-[#E8DDD2] text-[#6B5B4F] rounded-xl transition-colors text-sm"
                >
                  Clear
                </button>
              </div>
            </div>

            <!-- Tags -->
            <TagInput v-model="form.tags" />
          </div>
        </div>
      </div>

      <!-- Modal Footer -->
      <div class="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#C4977D]/20 bg-[#FAF6F1]">
        <button 
          @click="handleClose"
          class="px-5 py-2.5 bg-white border border-[#C4977D]/30 text-[#6B5B4F] rounded-xl hover:bg-[#F5EDE4] transition-colors font-medium"
        >
          Cancel
        </button>
        <button 
          v-if="editMode"
          @click="handleSave"
          class="px-5 py-2.5 bg-[#C4977D] hover:bg-[#B38A70] text-white rounded-xl transition-colors font-medium"
        >
          Save Recipe
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import TagInput from './TagInput.vue'
import { fetchTikTokMetadata, processWithAI, autoSuggestTags } from '../services/aiService'
import { useAiSettings } from '../composables/useAiSettings'
import type { Recipe } from '../composables/useRecipes'

const props = defineProps<{
  recipe?: Recipe | null
}>()

const emit = defineEmits<{
  'close': []
  'save': [recipe: any]
}>()

const aiStore = useAiSettings()
const loading = ref(false)
const editMode = ref(false)

const form = reactive({
  id: '',
  url: '',
  title: '',
  author: '',
  description: '',
  thumbnail: '',
  tags: [] as string[],
  plannedDate: null as string | null
})

onMounted(() => {
  if (props.recipe) {
    form.id = props.recipe.id
    form.url = props.recipe.url
    form.title = props.recipe.title
    form.author = props.recipe.author
    form.description = props.recipe.description
    form.thumbnail = props.recipe.thumbnail
    form.tags = [...props.recipe.tags]
    form.plannedDate = props.recipe.plannedDate
    editMode.value = true
  }
})

const fetchMetadata = async () => {
  if (!form.url) {
    alert('Please enter a TikTok URL')
    return
  }

  loading.value = true
  try {
    const metadata = await fetchTikTokMetadata(form.url)
    
    if (metadata) {
      form.author = metadata.author
      form.thumbnail = metadata.thumbnail

      if (aiStore.apiKey.value && aiStore.enabled.value) {
        const aiResult = await processWithAI(aiStore.apiKey.value, metadata)
        
        if (aiResult) {
          form.title = aiResult.title
          form.description = aiResult.description
          form.tags = [...new Set([...form.tags, ...aiResult.suggestedTags])]
        } else {
          form.title = metadata.title
          form.description = metadata.title
          form.tags = autoSuggestTags(metadata.title)
        }
      } else {
        form.title = metadata.title
        form.description = metadata.title
        form.tags = autoSuggestTags(metadata.title)
      }
    }

    editMode.value = true
  } catch (error) {
    console.error('Error:', error)
    editMode.value = true
    alert('Could not fetch video details automatically. You can still add the recipe manually.')
  } finally {
    loading.value = false
  }
}

const handleSave = () => {
  if (!form.title || !form.url) {
    alert('Please fill in required fields')
    return
  }

  const recipe = {
    id: form.id,
    url: form.url,
    title: form.title,
    author: form.author,
    description: form.description,
    thumbnail: form.thumbnail,
    tags: form.tags,
    plannedDate: form.plannedDate
  }

  emit('save', recipe)
}

const handleClose = () => {
  emit('close')
}
</script>

<style scoped>
.loading-spinner {
  border: 3px solid var(--warm-beige);
  border-top: 3px solid var(--terracotta);
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
