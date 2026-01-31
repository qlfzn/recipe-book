<template>
  <div class="fixed inset-0 z-50">
    <div class="modal-overlay absolute inset-0 bg-[#4A4039]/50 backdrop-blur-sm" @click="emit('close')"></div>
    <div class="absolute inset-x-4 top-1/2 -translate-y-1/2 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-md bg-[#FFFEFB] rounded-2xl shadow-2xl overflow-hidden">
      <div class="flex items-center justify-between px-6 py-4 border-b border-[#C4977D]/20">
        <h2 class="font-display text-xl font-semibold text-[#4A4039]">AI Settings</h2>
        <button @click="emit('close')" class="p-2 hover:bg-[#F5EDE4] rounded-lg transition-colors">
          <svg class="w-5 h-5 text-[#6B5B4F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <div class="p-6 space-y-4">
        <div>
          <label class="block text-sm font-medium text-[#4A4039] mb-2">Groq API Key</label>
          <input 
            v-model="apiKey"
            type="password" 
            placeholder="gsk_..."
            class="w-full px-4 py-3 bg-white border border-[#C4977D]/30 rounded-xl text-[#4A4039]"
          >
          <p class="mt-2 text-xs text-[#6B5B4F]/70">Your API key is stored locally and never sent anywhere except Groq's API.</p>
        </div>

        <div class="flex items-center gap-3">
          <input 
            v-model="enabled" 
            type="checkbox" 
            id="enableAiToggle"
            class="w-4 h-4 accent-[#9CAF88]"
          >
          <label for="enableAiToggle" class="text-sm text-[#4A4039]">Enable AI-powered metadata organization</label>
        </div>

        <button 
          @click="handleSave"
          class="w-full px-5 py-3 bg-[#C4977D] hover:bg-[#B38A70] text-white rounded-xl transition-colors font-medium"
        >
          Save Settings
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  initialKey: String,
  initialEnabled: Boolean
})

const emit = defineEmits(['close', 'save'])

const apiKey = ref(props.initialKey)
const enabled = ref(props.initialEnabled)

const handleSave = () => {
  emit('save', apiKey.value, enabled.value)
  emit('close')
}
</script>
