<template>
  <div class="fixed inset-0 z-50">
    <div
      class="modal-overlay absolute inset-0 bg-black/20"
      @click="emit('close')"
    ></div>
    <div
      class="absolute inset-x-4 top-1/2 -translate-y-1/2 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-md bg-white rounded-lg shadow-xl overflow-hidden"
    >
      <div
        class="flex items-center justify-between px-6 py-4 border-b border-gray-200"
      >
        <h2 class="text-lg font-semibold text-gray-900">AI Settings</h2>
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

      <div class="p-6 space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-900 mb-2"
            >Groq API Key</label
          >
          <input
            v-model="apiKey"
            type="password"
            placeholder="gsk_..."
            class="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-400"
          />
          <p class="mt-2 text-xs text-gray-600">
            Your key is stored locally and only sent to Groq's API.
          </p>
        </div>

        <div class="flex items-center gap-3">
          <input
            v-model="enabled"
            type="checkbox"
            id="enableAiToggle"
            class="w-4 h-4 accent-gray-900"
          />
          <label for="enableAiToggle" class="text-sm text-gray-900"
            >Enable AI for metadata</label
          >
        </div>

        <button
          @click="handleSave"
          class="w-full px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-lg transition-colors font-medium"
        >
          Save
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  initialKey: string;
  initialEnabled: boolean;
}>();

const emit = defineEmits<{
  close: [];
  save: [key: string, enabled: boolean];
}>();

const apiKey = ref(props.initialKey);
const enabled = ref(props.initialEnabled);

const handleSave = () => {
  emit("save", apiKey.value, enabled.value);
  emit("close");
};
</script>
