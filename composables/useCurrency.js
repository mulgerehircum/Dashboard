import { computed } from 'vue'
import { useCurrencyStore } from '@/stores/currencyStore'

export function useCurrency() {
  const currencyStore = useCurrencyStore()

  const createCurrencyComputed = (amount) => {
    return computed(() => {
      const converted = currencyStore.convertAmount(amount.value)
      return currencyStore.formatCurrency(converted)
    })
  }

  const createMetricsComputed = (metrics) => {
    return computed(() => {
      const converted = {}
      for (const [key, value] of Object.entries(metrics.value)) {
        converted[key] = currencyStore.convertAmount(value)
      }
      return converted
    })
  }

  return {
    currencyStore,
    createCurrencyComputed,
    createMetricsComputed
  }
}