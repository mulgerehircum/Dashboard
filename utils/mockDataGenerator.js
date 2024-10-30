const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const randomDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

const formatCurrency = (amount) => parseFloat(amount.toFixed(2));

export const generateMockData = () => {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth(); // 0-11
  
  const cashflowData = {
    labels: [],
    invoices: [],
    payments: []
  };

  for (let i = 0; i < months.length; i++) {
    if (i > currentMonth) break;
    
    cashflowData.labels.push(months[i]);
    
    const monthlyInvoice = randomNumber(8000, 15000);
    const monthlyPayment = randomNumber(monthlyInvoice * 0.7, monthlyInvoice * 1.1);
    
    cashflowData.invoices.push(monthlyInvoice);
    cashflowData.payments.push(monthlyPayment);
  }

  const totalInvoiced = cashflowData.invoices.reduce((sum, val) => sum + val, 0);
  const invoicePaid = randomNumber(totalInvoiced * 0.6, totalInvoiced * 0.8);
  const invoiceNotPaid = totalInvoiced - invoicePaid;

  const totalPayments = cashflowData.payments.reduce((sum, val) => sum + val, 0);
  const paymentsPaid = randomNumber(totalPayments * 0.7, totalPayments * 0.9);
  const paymentsNotPaid = totalPayments - paymentsPaid;

  const topOverdueInvoices = Array.from({ length: 5 }, (_, index) => {
    const dueDate = randomDate(
      new Date(currentYear, currentMonth - 3, 1),
      new Date(currentYear, currentMonth, 0)
    );
    
    return {
      id: `INV-${currentYear}${String(randomNumber(1000, 9999))}`,
      amount: formatCurrency(randomNumber(5000, 15000)),
      dueDate: dueDate.toISOString(),
      client: `Client ${index + 1}`,
      status: 'Overdue'
    };
  }).sort((a, b) => b.amount - a.amount);

  return {
    invoices: {
      total: formatCurrency(totalInvoiced),
      paid: formatCurrency(invoicePaid),
      notPaid: formatCurrency(invoiceNotPaid)
    },
    payments: {
      total: formatCurrency(totalPayments),
      paid: formatCurrency(paymentsPaid),
      notPaid: formatCurrency(paymentsNotPaid)
    },
    cashflowData,
    topOverdueInvoices
  };
};