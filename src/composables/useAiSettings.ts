import { ref } from 'vue'

const apiKey = ref(import.meta.env.VITE_GROQ_API_KEY || '')
const enabled = ref(true)

export function useAiSettings() {
  return {
    apiKey,
    enabled
  }
}
