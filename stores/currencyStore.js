import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useCurrencyStore = defineStore("currency", () => {
  const baseCurrency = ref("MDL");
  const selectedCurrency = ref("MDL");
  const exchangeRates = ref({});
  const isLoading = ref(false);
  const error = ref(null);

  const availableCurrencies = ref(["MDL", "USD", "EUR", "RON"]);

  // Fetch latest exchange rates
  const fetchExchangeRates = async () => {
    isLoading.value = true;
    error.value = null;

    try {
      const response = await fetch(
        `https://api.exchangerate-api.com/v4/latest/${baseCurrency.value}`
      );
      const data = await response.json();
      exchangeRates.value = data.rates;
    } catch (err) {
      error.value = "Failed to fetch exchange rates";
      console.error("Error fetching exchange rates:", err);
    } finally {
      isLoading.value = false;
    }
  };

  const convertAmount = (amount) => {
    if (!amount) return 0;
    if (selectedCurrency.value === baseCurrency.value) return amount;
    if (!exchangeRates.value[selectedCurrency.value]) return amount;

    const rate = exchangeRates.value[selectedCurrency.value];
    return Number((amount * rate).toFixed(2));
  };

  const formatCurrency = (amount) => {
    if (!amount) return `0 ${selectedCurrency.value}`;

    const formatted = new Intl.NumberFormat("en-US", {
      style: "decimal",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);

    return `${formatted} ${selectedCurrency.value}`;
  };

  const setSelectedCurrency = (currency) => {
    if (availableCurrencies.value.includes(currency)) {
      selectedCurrency.value = currency;
    }
  };

  let updateInterval;
  const startAutoUpdate = () => {
    updateInterval = setInterval(fetchExchangeRates, 3600000); // 1 hour
  };

  const stopAutoUpdate = () => {
    if (updateInterval) {
      clearInterval(updateInterval);
    }
  };

  return {
    selectedCurrency,
    exchangeRates,
    isLoading,
    error,
    availableCurrencies, 
    fetchExchangeRates,
    convertAmount,
    formatCurrency,
    setSelectedCurrency,
    startAutoUpdate,
    stopAutoUpdate,
  };
});
