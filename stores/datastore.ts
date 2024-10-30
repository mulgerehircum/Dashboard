export const useFinanceStore = defineStore('finance', {
  state: () => ({
    invoices: {
      total: 0,
      paid: 0,
      notPaid: 0
    },
    payments: {
      total: 0,
      paid: 0,
      notPaid: 0
    },
    topOverdueInvoices: [] as any[],
    cashflowData: {
      labels: [] as string[],
      invoices: [] as number[],
      payments: [] as number[]
    },
    isLoading: false,
    error: null as string | null,
    failedOnce: false
  }),

  actions: {
    async fetchFinancialData() {
      this.isLoading = true
      this.error = null

      try {
        if (this.failedOnce) {
          const mockData = generateMockData()
          this.invoices = mockData.invoices
          this.payments = mockData.payments
          this.topOverdueInvoices = mockData.topOverdueInvoices
          this.cashflowData = mockData.cashflowData
          return
        }

        const response = await fetch('/api/financial-data')
        
        if (response.status === 404) {
          this.failedOnce = true
          this.error = 'Financial data not found'
          return
        }

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        
        if (!data) {
          throw new Error('No data received')
        }

        this.invoices = data.invoices
        this.payments = data.payments
        this.topOverdueInvoices = data.topOverdueInvoices
        this.cashflowData = data.cashflowData

      } catch (err: any) {
        this.error = err?.message || 'Failed to fetch financial data'
      } finally {
        this.isLoading = false
      }
    }
  }
})