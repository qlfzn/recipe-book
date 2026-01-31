<template>
  <div class="fixed inset-0 z-50">
    <div
      class="modal-overlay absolute inset-0 bg-black/20"
      @click="emit('close')"
    ></div>
    <div
      class="absolute inset-4 md:inset-10 lg:inset-y-10 lg:left-1/4 lg:right-1/4 bg-white rounded-lg shadow-xl overflow-hidden flex flex-col"
    >
      <div
        class="flex items-center justify-between px-6 py-4 border-b border-gray-200"
      >
        <h2 class="text-lg font-semibold text-gray-900">Recipe Details</h2>
        <button
          @click="emit('close')"
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

      <div class="flex-1 overflow-y-auto p-6">
        <div class="max-w-lg mx-auto">
          <div
            v-if="recipe.thumbnail"
            class="w-full aspect-[9/16] max-h-80 rounded-lg overflow-hidden mb-6 bg-gray-100"
          >
            <img
              :src="recipe.thumbnail"
              :alt="recipe.title"
              class="w-full h-full object-cover"
            />
          </div>

          <h3 class="text-2xl font-semibold text-gray-900 mb-2">
            {{ recipe.title }}
          </h3>

          <p
            v-if="recipe.author"
            class="text-gray-600 mb-4 flex items-center gap-2 text-sm"
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
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            by {{ recipe.author }}
          </p>

          <div
            v-if="recipe.plannedDate"
            :class="[
              'mb-4 inline-flex items-center gap-2 px-3 py-1 rounded text-sm font-medium',
              isToday
                ? 'bg-gray-900/10 text-gray-900'
                : isPast
                  ? 'bg-gray-100 text-gray-600'
                  : 'bg-gray-100 text-gray-700',
            ]"
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
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            {{
              isToday
                ? "→ Today"
                : isPast
                  ? "Was " + formattedDate
                  : formattedDate
            }}
          </div>

          <div v-if="recipe.tags.length > 0" class="flex flex-wrap gap-2 mb-6">
            <span
              v-for="tag in recipe.tags"
              :key="tag"
              class="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs"
            >
              {{ tag }}
            </span>
          </div>

          <div v-if="recipe.description" class="bg-gray-50 rounded-lg p-4">
            <h4 class="font-medium text-gray-900 mb-2 text-sm">Notes</h4>
            <p class="text-gray-700 text-sm whitespace-pre-wrap">
              {{ recipe.description }}
            </p>
          </div>
        </div>
      </div>

      <div
        class="flex items-center justify-between gap-2 px-6 py-4 border-t border-gray-200 bg-gray-50"
      >
        <button
          @click="emit('delete', recipe.id)"
          class="px-3 py-1.5 bg-red-50 border border-red-200 text-red-600 rounded hover:bg-red-100 transition-colors font-medium text-sm"
        >
          Delete
        </button>
        <div class="flex gap-2">
          <button
            @click="emit('edit', recipe)"
            class="px-3 py-1.5 bg-white border border-gray-300 text-gray-900 rounded hover:bg-gray-50 transition-colors font-medium text-sm"
          >
            Edit
          </button>
          <a
            :href="recipe.url"
            target="_blank"
            class="px-3 py-1.5 bg-gray-900 hover:bg-gray-800 text-white rounded transition-colors font-medium text-sm inline-flex items-center gap-2"
          >
            Open
            <svg
              class="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { isDateToday, isDatePast, formatPlannedDate } from "../utils/dateUtils";

const props = defineProps({
  recipe: Object
});

const emit = defineEmits({
  close: {},
  edit: {},
  delete: {}
});

const isToday = computed(() =>
  props.recipe.plannedDate ? isDateToday(props.recipe.plannedDate) : false,
);
const isPast = computed(() =>
  props.recipe.plannedDate ? isDatePast(props.recipe.plannedDate) : false,
);
const formattedDate = computed(() =>
  props.recipe.plannedDate ? formatPlannedDate(props.recipe.plannedDate) : null,
);
</script>
