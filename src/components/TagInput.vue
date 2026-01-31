<template>
  <div class="space-y-4">
    <div>
      <label class="block text-sm font-medium text-gray-900 mb-2">Tags</label>
      <div class="flex flex-wrap gap-2 mb-3">
        <span
          v-for="tag in modelValue"
          :key="tag"
          class="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-900 text-white rounded text-sm"
        >
          {{ tag }}
          <button
            @click="removeTag(tag)"
            class="hover:bg-white/20 rounded p-0.5"
          >
            <svg
              class="w-3 h-3"
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
        </span>
      </div>

      <div class="flex gap-2">
        <input
          v-model="tagInput"
          type="text"
          placeholder="Add a tag…"
          class="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-400"
          @keypress.enter="addTag"
        />
        <button
          @click="addTag"
          class="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-lg transition-colors font-medium text-sm"
        >
          Add
        </button>
      </div>

      <div class="mt-3">
        <p class="text-xs text-gray-600 mb-2">Suggestions:</p>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="tag in suggestedTags"
            :key="tag"
            @click="addSuggestedTag(tag)"
            class="px-2.5 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded transition-colors"
          >
            {{ tag }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  modelValue: Array
});

const emit = defineEmits({
  'update:modelValue': {}
});

const tagInput = ref("");

const suggestedTags = [
  "breakfast",
  "lunch",
  "dinner",
  "dessert",
  "quick",
  "healthy",
  "asian",
  "western",
  "vegetarian",
  "noodles",
];

const addTag = () => {
  const tag = tagInput.value.trim().toLowerCase();
  if (tag && !props.modelValue.includes(tag)) {
    emit("update:modelValue", [...props.modelValue, tag]);
    tagInput.value = "";
  }
};

const addSuggestedTag = (tag) => {
  if (!props.modelValue.includes(tag)) {
    emit("update:modelValue", [...props.modelValue, tag]);
  }
};

const removeTag = (tag) => {
  emit(
    "update:modelValue",
    props.modelValue.filter((t) => t !== tag),
  );
};
</script>
