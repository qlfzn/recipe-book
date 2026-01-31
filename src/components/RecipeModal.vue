<template>
  <div class="fixed inset-0 z-50">
    <div
      class="modal-overlay absolute inset-0 bg-black/20"
      @click="handleClose"
    ></div>
    <div
      class="absolute inset-4 md:inset-10 lg:inset-20 bg-white rounded-lg shadow-xl overflow-hidden flex flex-col"
    >
      <!-- Modal Header -->
      <div
        class="flex items-center justify-between px-6 py-4 border-b border-gray-200"
      >
        <h2 class="text-lg font-semibold text-gray-900">
          {{ recipe?.id ? "Edit Recipe" : "Add New Recipe" }}
        </h2>
        <button
          @click="handleClose"
          class="p-2 hover:bg-gray-100 rounded transition-colors"
        >
          <svg
            class="w-5 h-5 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <!-- Modal Content -->
      <div class="flex-1 overflow-y-auto p-6">
        <div class="max-w-2xl mx-auto space-y-6">
          <!-- URL Input -->
          <div v-if="!editMode">
            <label class="block text-sm font-medium text-gray-900 mb-2"
              >TikTok Video URL</label
            >
            <div class="flex gap-2">
              <input
                v-model="form.url"
                type="url"
                placeholder="https://www.tiktok.com/@username/video/..."
                class="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-400"
              />
              <button
                @click="fetchMetadata"
                :disabled="loading"
                class="px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-lg transition-colors font-medium text-sm flex items-center gap-2 disabled:opacity-50"
              >
                <span v-if="!loading">Fetch</span>
                <span v-else>…</span>
                <div v-if="loading" class="loading-spinner"></div>
              </button>
            </div>
            <p class="mt-2 text-sm text-gray-600">
              Paste a TikTok URL and click Fetch to auto-fill details.
            </p>
          </div>

          <!-- Edit Section -->
          <div v-if="editMode" class="space-y-6">
            <!-- Thumbnail Preview -->
            <div class="flex gap-6">
              <div
                class="w-40 h-56 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0"
              >
                <img
                  v-if="form.thumbnail"
                  :src="form.thumbnail"
                  :alt="form.title"
                  class="w-full h-full object-cover"
                />
                <div
                  v-else
                  class="w-full h-full flex items-center justify-center"
                >
                  <svg
                    class="w-10 h-10 text-gray-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>

              <div class="flex-1 space-y-4">
                <!-- Title -->
                <div>
                  <label class="block text-sm font-medium text-gray-900 mb-1"
                    >Recipe Title</label
                  >
                  <input
                    v-model="form.title"
                    type="text"
                    placeholder="Give your recipe a name…"
                    class="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-400"
                  />
                </div>

                <!-- Author -->
                <div>
                  <label class="block text-sm font-medium text-gray-900 mb-1"
                    >Creator</label
                  >
                  <input
                    v-model="form.author"
                    type="text"
                    placeholder="Creator name"
                    class="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-400"
                  />
                </div>
              </div>
            </div>

            <!-- Description -->
            <div>
              <label class="block text-sm font-medium text-gray-900 mb-1"
                >Notes</label
              >
              <textarea
                v-model="form.description"
                rows="3"
                placeholder="Add any notes or ingredients…"
                class="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-400 resize-none"
              ></textarea>
            </div>

            <!-- Plan to Cook Date -->
            <div>
              <label class="block text-sm font-medium text-gray-900 mb-1">
                Plan to Cook
                <span class="font-normal text-gray-600">(optional)</span>
              </label>
              <div class="flex gap-2 items-center">
                <input
                  v-model="form.plannedDate"
                  type="date"
                  class="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-400"
                />
                <button
                  v-if="form.plannedDate"
                  @click="form.plannedDate = null"
                  class="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors text-sm"
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
      <div
        class="flex items-center justify-end gap-2 px-6 py-4 border-t border-gray-200 bg-gray-50"
      >
        <button
          @click="handleClose"
          class="px-4 py-2 bg-white border border-gray-300 text-gray-900 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm"
        >
          Cancel
        </button>
        <button
          v-if="editMode"
          @click="handleSave"
          class="px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-lg transition-colors font-medium text-sm"
        >
          Save
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import TagInput from "./TagInput.vue";
import {
  fetchTikTokMetadata,
  processWithAI,
  autoSuggestTags,
} from "../services/aiService";
import { useAiSettings } from "../composables/useAiSettings";
import type { Recipe } from "../composables/useRecipes";

const props = defineProps<{
  recipe?: Recipe | null;
}>();

const emit = defineEmits<{
  close: [];
  save: [recipe: any];
}>();

const aiStore = useAiSettings();
const loading = ref(false);
const editMode = ref(false);

const form = reactive({
  id: "",
  url: "",
  title: "",
  author: "",
  description: "",
  thumbnail: "",
  tags: [] as string[],
  plannedDate: null as string | null,
});

onMounted(() => {
  if (props.recipe) {
    form.id = props.recipe.id;
    form.url = props.recipe.url;
    form.title = props.recipe.title;
    form.author = props.recipe.author;
    form.description = props.recipe.description;
    form.thumbnail = props.recipe.thumbnail;
    form.tags = [...props.recipe.tags];
    form.plannedDate = props.recipe.plannedDate;
    editMode.value = true;
  }
});

const fetchMetadata = async () => {
  if (!form.url) {
    alert("Please enter a TikTok URL");
    return;
  }

  loading.value = true;
  try {
    const metadata = await fetchTikTokMetadata(form.url);

    if (metadata) {
      form.author = metadata.author;
      form.thumbnail = metadata.thumbnail;

      if (aiStore.apiKey.value && aiStore.enabled.value) {
        const aiResult = await processWithAI(aiStore.apiKey.value, metadata);

        if (aiResult) {
          form.title = aiResult.title;
          form.description = aiResult.description;
          form.tags = [...new Set([...form.tags, ...aiResult.suggestedTags])];
        } else {
          form.title = metadata.title;
          form.description = metadata.title;
          form.tags = autoSuggestTags(metadata.title);
        }
      } else {
        form.title = metadata.title;
        form.description = metadata.title;
        form.tags = autoSuggestTags(metadata.title);
      }
    }

    editMode.value = true;
  } catch (error) {
    console.error("Error:", error);
    editMode.value = true;
    alert(
      "Could not fetch video details automatically. You can still add the recipe manually.",
    );
  } finally {
    loading.value = false;
  }
};

const handleSave = () => {
  if (!form.title || !form.url) {
    alert("Please fill in required fields");
    return;
  }

  const recipe = {
    id: form.id,
    url: form.url,
    title: form.title,
    author: form.author,
    description: form.description,
    thumbnail: form.thumbnail,
    tags: form.tags,
    plannedDate: form.plannedDate,
  };

  emit("save", recipe);
};

const handleClose = () => {
  emit("close");
};
</script>

<style scoped>
.loading-spinner {
  border: 3px solid #e5e7eb;
  border-top: 3px solid #1f2937;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
