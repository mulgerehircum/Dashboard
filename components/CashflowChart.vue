<template>
  <Bar v-if="!financeStore.isLoading" :data="chartData" :options="chartOptions" />
  <div v-else class="flex items-center justify-center h-64">
    Loading chart data...
  </div>
</template>

<script setup>
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { Bar } from 'vue-chartjs'
import { useFinanceStore } from '../stores/datastore'
import { computed, onMounted } from 'vue'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

const financeStore = useFinanceStore()

onMounted(() => {
  financeStore.fetchFinancialData()
})

const months = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
]

// Transform store data to ensure full calendar year
const chartData = computed(() => {
  // Get the data from store
  const storeData = financeStore.cashflowData

  // Create arrays of 12 zeros for invoices and payments
  const invoices = new Array(12).fill(0)
  const payments = new Array(12).fill(0)

  // Map store data to the correct month indices
  storeData.labels.forEach((label, index) => {
    const monthIndex = months.indexOf(label)
    if (monthIndex !== -1) {
      invoices[monthIndex] = storeData.invoices[index]
      payments[monthIndex] = storeData.payments[index]
    }
  })

  return {
    labels: months,
    datasets: [
      {
        label: 'Invoices',
        backgroundColor: '#60A5FA',
        data: invoices,
        borderRadius: 6,
      },
      {
        label: 'Payments',
        backgroundColor: '#34D399',
        data: payments,
        borderRadius: 6,
      }
    ]
  }
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        usePointStyle: true,
        pointStyle: 'circle',
      }
    },
    title: {
      display: true,
      text: 'Monthly Cashflow'
    }
  },
  scales: {
    x: {
      grid: {
        display: false
      }
    },
    y: {
      beginAtZero: true,
      grid: {
        borderDash: [2, 4],
        color: '#e2e8f0'
      },
      ticks: {
        callback: (value) => {
          return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
          }).format(value)
        }
      }
    }
  }
}
</script>