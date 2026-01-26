import { ref } from 'vue'

const apiKey = ref(localStorage.getItem('groqApiKey') || '')
const enabled = ref(localStorage.getItem('aiEnabled') !== 'false')

export function useAiSettings() {
  const setApiKey = (key: string) => {
    apiKey.value = key
    localStorage.setItem('groqApiKey', key)
  }

  const setEnabled = (value: boolean) => {
    enabled.value = value
    localStorage.setItem('aiEnabled', String(value))
  }

  return {
    apiKey,
    enabled,
    setApiKey,
    setEnabled
  }
}
