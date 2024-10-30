<template>
    <div class="display: block; box-sizing: border-box; height: 130px; width: 130px;">
      <Pie :data="chartData" :options="chartOptions" />
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  import { Pie } from 'vue-chartjs'
  import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
  import { useFinanceStore } from '../stores/datastore'
  
  ChartJS.register(ArcElement, Tooltip, Legend)
  
  const props = defineProps({
    type: {
      type: String,
      required: true,
      validator: (value) => ['invoices', 'payments'].includes(value)
    },
    title: {
      type: String,
      default: 'Financial Overview'
    }
  })
  
  const store = useFinanceStore()
  
  const chartData = computed(() => ({
    datasets: [{
      data: [
        store[props.type].paid,
        store[props.type].notPaid
      ],
      backgroundColor: ['#4CAF50', '#FF5252']
    }]
  }))
  
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom'
      },
      title: {
        display: false,
        text: props.title
      }
    }
  }
  </script>