<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useFinanceStore } from '~/stores/datastore'
import { useCurrencyStore } from '~/stores/currencyStore'
import { useCurrency } from '~/composables/useCurrency'
import CashflowChart from '@/components/CashflowChart.vue'
import PieChart from '~/components/PieChart.vue'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
// Init stores
const financeStore = useFinanceStore()
const currencyStore = useCurrencyStore()
const { createCurrencyComputed } = useCurrency()
const isLoading = ref(true)
const loadError = ref(null)

const retryLoad = async () => {
  isLoading.value = true
  loadError.value = null
  try {
    await Promise.all([
      financeStore.fetchFinancialData(),
      currencyStore.fetchExchangeRates()
    ])
  } catch (error) {
    loadError.value = error.message || 'Failed to load dashboard data'
  } finally {
    isLoading.value = false
  }
}
// Get refs
const { invoices, payments } = storeToRefs(financeStore)
const { selectedCurrency, availableCurrencies } = storeToRefs(currencyStore)
const formatCurrency = (amount) => parseFloat(amount.toFixed(2))

// Create computed properties
const invoicesTotal = createCurrencyComputed(computed(() => invoices.value.total))
const invoicesPaid = createCurrencyComputed(computed(() => invoices.value.paid))
const invoicesNotPaid = createCurrencyComputed(computed(() => invoices.value.notPaid))
const paymentsTotal = createCurrencyComputed(computed(() => payments.value.total))
const paymentsPaid = createCurrencyComputed(computed(() => payments.value.paid))
const paymentsNotPaid = createCurrencyComputed(computed(() => payments.value.notPaid))
const invoiceNotPaidPercentage = computed(() => {
  const total = invoices.value.total
  return total ? formatCurrency((invoices.value.notPaid / total) * 100) : 0
})

const paymentNotPaidPercentage = computed(() => {
  const total = payments.value.total
  return total ? formatCurrency((payments.value.notPaid / total) * 100) : 0
})
// Init data
onMounted(async () => {
  await retryLoad()
  currencyStore.startAutoUpdate()
})

onUnmounted(() => {
  currencyStore.stopAutoUpdate()
})

// Currency selection handler
const handleCurrencySelect = (currency) => {
  currencyStore.setSelectedCurrency(currency)
}
</script>
<template>
  <main tabindex="-1" class="overflow-x-hidden relative ml-auto min-h-screen py-16 transition-all w-acalc(100%-0px) lg:w-acalc(100%-222px)">
    <!-- Loading State -->
    <div v-if="isLoading" class="flex justify-center items-center min-h-[50vh]">
      <div class="text-center">
        <i class="i-ic-baseline-refresh animate-spin h-8 w-8 mb-4"></i>
        <p>{{ t('common.loading') }}</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="loadError || financeStore.error" class="mx-auto px-5 mb-6 max-w-[957px]">
      <div class="bg-red-50 border-l-4 border-red-400 p-4">
        <div class="flex">
          <div class="flex-shrink-0">
            <i class="i-ic-baseline-error text-red-400 h-5 w-5"></i>
          </div>
          <div class="ml-3">
            <p class="text-sm text-red-700">
              {{ loadError || financeStore.error }}
            </p>
            <button 
              @click="retryLoad" 
              class="mt-2 text-sm font-medium text-red-700 hover:text-red-600"
            >
              {{ t('common.retry') }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="xl3:max-w-[1600px] xl2:max-w-[1000px] mx-auto w-full max-w-[957px]">
      <div class="min-h-screen space-y-12 pt-16 lg:pt-0">
        <div class="flex flex-col items-start justify-start gap-6 px-5 lg:flex-row lg:justify-between lg:gap-2">
          <h1 class="text-xl lg:text-4xl font-bold text-primary-dark">{{ t('dashboard.title') }}</h1>
          <div class="flex flex-wrap">
            <button 
              v-for="currency in availableCurrencies" 
              :key="currency"
              class="border-primary-blue-4 hover:bg-primary-blue-3 mb-2 mr-2 rounded border px-4 py-2 text-xs font-medium transition"
              :class="[selectedCurrency === currency ? 'bg-primary-blue-4 text-white' : 'text-primary-blue-4 bg-white hover:text-white']"
              @click="handleCurrencySelect(currency)"
            >
              {{ currency }}
            </button>
          </div>
        </div>

        <!-- General Overview Section -->
        <div class="space-y-3 px-5">
          <div class="flex justify-between">
            <h2 class="font-bold text-sm lg:text-xl">{{ t('dashboard.overview.title') }}</h2>
            <div class="inline-block text-left cursor-pointer">
              <button class="flex items-center justify-center space-x-2 p-1">
                <span class="font-medium text-primary-blue-4 text-sm">{{ t('dashboard.overview.total') }}</span>
                <i class="i-ic-baseline-keyboard-arrow-down h-4.5 w-4.5 min-w-4.5 block"></i>
              </button>
            </div>
          </div>

          <!-- Overview Cards -->
          <div class="flex items-start justify-between gap-3">
            <!-- Total Invoiced Card -->
            <div class="rounded-md shadow flex w-full space-x-6 bg-white p-6">
              <div class="space-y-6">
                <div class="flex space-x-1">
                  <i class="i-ic-outline-show-chart text-state-success block h-6 w-6 min-w-6"></i>
                  <span>{{ t('dashboard.overview.invoiced.title') }}</span>
                </div>
                <div class="space-y-3">
                  <div class="text-2xl font-bold">
                    <span>{{ invoicesTotal }}</span>&nbsp;
                  </div>
                  <div class="text-xs">
                    {{ t('dashboard.overview.invoiced.avgPayment') }}:&nbsp;
                    <span class="text-primary-blue-4">0 {{ t('dashboard.overview.invoiced.days') }}</span>
                  </div>
                </div>
              </div>
              <div class="border-primary-light h-auto border"></div>
              <div class="space-y-4.5">
                <div class="space-y-2">
                  <div class="flex space-x-1">
                    <i class="i-ic-baseline-account-balance-wallet w-4.5 h-4.5 text-state-success block"></i>
                    <span class="text-sm">{{ t('dashboard.overview.invoiced.paid') }}</span>
                  </div>
                  <div class="font-bold">
                    <span>{{ invoicesPaid }}</span>&nbsp;
                  </div>
                </div>
                <div class="space-y-2">
                  <div class="flex space-x-1">
                    <i class="i-ic-baseline-account-balance-wallet w-4.5 h-4.5 text-state-warning block"></i>
                    <span class="text-sm">{{ t('dashboard.overview.invoiced.notPaid') }} ({{ invoiceNotPaidPercentage }}%)</span>
                  </div>
                  <div class="font-bold">
                    <span>{{ invoicesNotPaid }}</span>&nbsp;
                  </div>
                </div>
              </div>
            </div>

            <!-- Total Payments Card -->
            <div class="rounded-md shadow flex w-full space-x-6 bg-white p-6">
              <div class="space-y-6">
                <div class="flex space-x-1">
                  <i class="i-ic-outline-show-chart text-state-error rotate-x-180 block h-6 w-6 min-w-6 transform"></i>
                  <span>{{ t('dashboard.overview.payments.title') }}</span>
                </div>
                <div class="space-y-3">
                  <div class="text-2xl font-bold">
                    <span>{{ paymentsTotal }}</span>&nbsp;
                  </div>
                  <div class="text-xs">
                    {{ t('dashboard.overview.payments.avgPayment') }}:&nbsp;
                    <span class="text-primary-blue-4">0 {{ t('dashboard.overview.payments.days') }}</span>
                  </div>
                </div>
              </div>
              <div class="border-primary-light h-auto border"></div>
              <div class="space-y-4.5">
                <div class="space-y-2">
                  <div class="flex space-x-1">
                    <i class="i-ic-baseline-account-balance-wallet w-4.5 h-4.5 text-state-success block"></i>
                    <span class="text-sm">{{ t('dashboard.overview.payments.paid') }}</span>
                  </div>
                  <div class="font-bold">
                    <span>{{ paymentsPaid }}</span>&nbsp;
                  </div>
                </div>
                <div class="space-y-2">
                  <div class="flex space-x-1">
                    <i class="i-ic-baseline-account-balance-wallet w-4.5 h-4.5 text-state-warning block"></i>
                    <span class="text-sm">{{ t('dashboard.overview.payments.notPaid') }} ({{ paymentNotPaidPercentage }}%)</span>
                  </div>
                  <div class="font-bold">
                    <span>{{ paymentsNotPaid }}</span>&nbsp;
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Financial Summary -->
        <div class="space-y-3 px-5">
          <div class="flex justify-between">
            <h2 class="font-700 text-sm lg:text-xl">{{ t('dashboard.financial.title') }}</h2>
            <div>
              <button class="flex items-center justify-center space-x-2 p-1">
                <span class="font-500 text-primary-blue-4 text-sm">{{ t('dashboard.financial.total') }}</span>
                <i class="i-ic-baseline-keyboard-arrow-down h-4.5 w-4.5 min-w-4.5 block"></i>
              </button>
            </div>
          </div>

          <!-- Summary Cards -->
          <div class="flex items-start justify-between gap-3">
            <!-- Invoices Card -->
            <div class="rounded-2 space-y-4.5 w-full bg-white p-6 shadow">
              <div class="flex justify-between gap-2">
                <div class="flex space-x-1">
                  <i class="i-ic-outline-show-chart text-state-success block h-6 w-6 min-w-6"></i>
                  <span>{{ t('dashboard.financial.invoices.title') }}</span>
                </div>
                <div class="text-xs">
                  {{ t('dashboard.financial.invoices.avgPayment') }}:<br>
                  <span class="text-primary-blue-4">0 {{ t('dashboard.financial.invoices.days') }}</span>
                </div>
              </div>

              <div class="flex justify-between gap-6">
                <div class="relative !h-[130px] !w-[130px]" width="130" height="130">
                  <PieChart type="invoices" :title="t('dashboard.financial.invoices.title')" />
                </div>
                <div class="space-y-3">
                  <div class="flex justify-between space-x-2.5 text-sm">
                    <div class="font-700 flex space-x-2.5">
                      <div class="bg-primary-blue-4 flex h-5 w-5 min-w-5 max-w-5 items-center justify-center overflow-hidden rounded-full text-xs text-white">0</div>
                      <div>{{ t('dashboard.financial.invoices.total') }}</div>
                    </div>
                    <div class="font-700"><span>{{ invoicesTotal }}</span>&nbsp;</div>
                  </div>
                  <hr class="border-primary-light border-b">
                  <div class="flex justify-between space-x-2.5 text-sm">
                    <div class="flex space-x-2.5">
                      <div class="flex h-5 w-5 min-w-5 max-w-5 items-center justify-center overflow-hidden rounded-full bg-[#39ABF8] text-xs text-white">0</div>
                      <div>{{ t('dashboard.financial.invoices.received') }}</div>
                    </div>
                    <div><span>0</span>&nbsp;</div>
                  </div>
                  <div class="flex justify-between space-x-2.5 text-sm">
                    <div class="flex space-x-2.5">
                      <div class="flex h-5 w-5 min-w-5 max-w-5 items-center justify-center overflow-hidden rounded-full bg-[#BEE9FF] text-xs text-black">0</div>
                      <div>{{ t('dashboard.financial.invoices.due') }}</div>
                    </div>
                    <div><span>0</span>&nbsp;</div>
                  </div>
                  <div class="flex justify-between space-x-2.5 text-sm">
                    <div class="flex space-x-2.5">
                      <div class="bg-state-error flex h-5 w-5 min-w-5 max-w-5 items-center justify-center overflow-hidden rounded-full text-xs text-white">0</div>
                      <div>{{ t('dashboard.financial.invoices.overdue') }}</div>
                    </div>
                    <div><span>0</span>&nbsp;</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Payments Card -->
            <div class="rounded-2 space-y-4.5 w-full bg-white p-6 shadow">
              <div class="flex justify-between gap-2">
                <div class="flex space-x-1">
                  <i class="i-ic-outline-show-chart text-state-success block h-6 w-6 min-w-6"></i>
                  <span>{{ t('dashboard.financial.payments.title') }}</span>
                </div>
                <div class="text-xs">
                  {{ t('dashboard.financial.payments.avgPayment') }}:<br>
                  <span class="text-primary-blue-4">0 {{ t('dashboard.financial.payments.days') }}</span>
                </div>
              </div>

              <div class="flex justify-between gap-6">
                <div class="relative !h-[130px] !w-[130px]" width="130" height="130">
                  <PieChart type="payments" :title="t('dashboard.financial.payments.title')" />
                </div>
                <div class="space-y-3">
                  <div class="flex justify-between space-x-2.5 text-sm">
                    <div class="font-700 flex space-x-2.5">
                      <div class="bg-primary-blue-4 flex h-5 w-5 min-w-5 max-w-5 items-center justify-center overflow-hidden rounded-full text-xs text-white">0</div>
                      <div>{{ t('dashboard.financial.payments.total') }}</div>
                    </div>
                    <div class="font-700"><span>{{ paymentsTotal }}</span>&nbsp;</div>
                  </div>
                  <hr class="border-primary-light border-b">
                  <div class="flex justify-between space-x-2.5 text-sm">
                    <div class="flex space-x-2.5">
                      <div class="flex h-5 w-5 min-w-5 max-w-5 items-center justify-center overflow-hidden rounded-full bg-[#39ABF8] text-xs text-white">0</div>
                      <div>{{ t('dashboard.financial.payments.received') }}</div>
                    </div>
                    <div><span>0</span>&nbsp;{{ selectedCurrency }}</div>
                  </div>
                  <div class="flex justify-between space-x-2.5 text-sm">
                    <div class="flex space-x-2.5">
                      <div class="flex h-5 w-5 min-w-5 max-w-5 items-center justify-center overflow-hidden rounded-full bg-[#BEE9FF] text-xs text-black">0</div>
                      <div>{{ t('dashboard.financial.payments.due') }}</div>
                    </div>
                    <div><span>0</span>&nbsp;{{ selectedCurrency }}</div>
                  </div>
                  <div class="flex justify-between space-x-2.5 text-sm">
                    <div class="flex space-x-2.5">
                      <div class="bg-state-error flex h-5 w-5 min-w-5 max-w-5 items-center justify-center overflow-hidden rounded-full text-xs text-white">0</div>
                      <div>{{ t('dashboard.financial.payments.overdue') }}</div>
                    </div>
                    <div><span>0</span>&nbsp;{{ selectedCurrency }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Overdue Invoices -->
          <div class="flex items-start justify-between gap-3">
            <div class="rounded-2 w-full space-y-3 bg-white p-6 shadow">
              <div class="flex items-center space-x-2">
                <span class="bg-state-error w-4.5 h-4.5 min-w-4.5 flex items-center justify-center rounded-full"></span>
                <span>{{ t('dashboard.overdue.title') }}</span>
              </div>
              <hr class="border-primary-light border-b">
              <div class="font-700 flex items-center justify-between text-xl">
                <div>{{ t('dashboard.overdue.total') }}</div>
                <div><span>0</span>&nbsp;{{ selectedCurrency }}</div>
              </div>
            </div>
            <div class="rounded-2 w-full space-y-3 bg-white p-6 shadow">
              <div class="flex items-center space-x-2">
                <span class="bg-state-error w-4.5 h-4.5 min-w-4.5 flex items-center justify-center rounded-full"></span>
                <span>{{ t('dashboard.overdue.title') }}</span>
              </div>
              <hr class="border-primary-light border-b">
              <div class="font-700 flex items-center justify-between text-xl">
                <div>{{ t('dashboard.overdue.total') }}</div>
                <div><span>0</span>&nbsp;{{ selectedCurrency }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Cashflow -->
        <div class="space-y-3 pb-40">
          <h2 class="font-700 text-sm lg:text-xl">{{ t('dashboard.cashflow.title') }}</h2>
          <div class="rounded-2 lg:overflow-x-initial w-full overflow-x-scroll bg-white p-6 shadow">
            <div class="mx-auto flex w-[852px] max-w-[852px] flex-col space-y-4 lg:w-auto">
              <CashflowChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>



<style scoped>
.shadow {
  box-shadow: 5.328px 5.328px 19.982px 0px rgba(0, 0, 0, 0.15);
}
</style>