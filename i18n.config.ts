export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en: {
      dashboard: {
        title: 'Dashboard',
        currency: {
          select: 'Select currency'
        },
        overview: {
          title: 'General overview',
          total: 'Total',
          invoiced: {
            title: 'Total invoiced',
            avgPayment: 'Average Payment Date',
            days: 'days',
            paid: 'Paid',
            notPaid: 'Not Paid'
          },
          payments: {
            title: 'Total payments',
            avgPayment: 'Average Payment Date',
            days: 'days',
            paid: 'Paid',
            notPaid: 'Not Paid'
          }
        },
        financial: {
          title: 'Financial Summary',
          total: 'Total',
          invoices: {
            title: 'Invoices',
            avgPayment: 'Average Payment Date',
            days: 'days',
            total: 'Total',
            received: 'Received',
            due: 'Due',
            overdue: 'Overdue'
          },
          payments: {
            title: 'Payments',
            avgPayment: 'Average Payment Date',
            days: 'days',
            total: 'Total',
            received: 'Received',
            due: 'Due',
            overdue: 'Overdue'
          }
        },
        overdue: {
          title: 'Top-5 Overdue Invoices',
          total: 'Total'
        },
        cashflow: {
          title: 'Cashflow'
        }
      },
      header: {
        menu: {
          toggle: 'Toggle menu'
        },
        logo: {
          alt: 'Sirius Logo'
        },
        languages: {
          select: 'Select language',
          en: 'English',
          ro: 'Romanian',
          ru: 'Russian'
        }
      },
      common: {
        retry: 'Retry',
        loading: 'Loading...'
      }
    },
    ro: {
      dashboard: {
        title: 'Panou de control',
        currency: {
          select: 'Selectați valuta'
        },
        overview: {
          title: 'Prezentare generală',
          total: 'Total',
          invoiced: {
            title: 'Total facturat',
            avgPayment: 'Data medie de plată',
            days: 'zile',
            paid: 'Plătit',
            notPaid: 'Neplătit'
          },
          payments: {
            title: 'Total plăți',
            avgPayment: 'Data medie de plată',
            days: 'zile',
            paid: 'Plătit',
            notPaid: 'Neplătit'
          }
        },
        financial: {
          title: 'Sumar financiar',
          total: 'Total',
          invoices: {
            title: 'Facturi',
            avgPayment: 'Data medie de plată',
            days: 'zile',
            total: 'Total',
            received: 'Încasat',
            due: 'Scadent',
            overdue: 'Întârziat'
          },
          payments: {
            title: 'Plăți',
            avgPayment: 'Data medie de plată',
            days: 'zile',
            total: 'Total',
            received: 'Încasat',
            due: 'Scadent',
            overdue: 'Întârziat'
          }
        },
        overdue: {
          title: 'Top-5 Facturi restante',
          total: 'Total'
        },
        cashflow: {
          title: 'Flux de numerar'
        }
      },
      header: {
        menu: {
          toggle: 'Comutare meniu'
        },
        logo: {
          alt: 'Logo Sirius'
        },
        languages: {
          select: 'Selectați limba',
          en: 'Engleză',
          ro: 'Română',
          ru: 'Rusă'
        }
      },
      common: {
        retry: 'Reîncercați',
        loading: 'Se încarcă...'
      }
    },
    ru: {
      dashboard: {
        title: 'Панель управления',
        currency: {
          select: 'Выберите валюту'
        },
        overview: {
          title: 'Общий обзор',
          total: 'Всего',
          invoiced: {
            title: 'Всего выставлено',
            avgPayment: 'Средняя дата оплаты',
            days: 'дней',
            paid: 'Оплачено',
            notPaid: 'Не оплачено'
          },
          payments: {
            title: 'Всего платежей',
            avgPayment: 'Средняя дата оплаты',
            days: 'дней',
            paid: 'Оплачено',
            notPaid: 'Не оплачено'
          }
        },
        financial: {
          title: 'Финансовая сводка',
          total: 'Всего',
          invoices: {
            title: 'Счета',
            avgPayment: 'Средняя дата оплаты',
            days: 'дней',
            total: 'Всего',
            received: 'Получено',
            due: 'К оплате',
            overdue: 'Просрочено'
          },
          payments: {
            title: 'Платежи',
            avgPayment: 'Средняя дата оплаты',
            days: 'дней',
            total: 'Всего',
            received: 'Получено',
            due: 'К оплате',
            overdue: 'Просрочено'
          }
        },
        overdue: {
          title: 'Топ-5 просроченных счетов',
          total: 'Всего'
        },
        cashflow: {
          title: 'Денежный поток'
        }
      },
      header: {
        menu: {
          toggle: 'Переключить меню'
        },
        logo: {
          alt: 'Логотип Sirius'
        },
        languages: {
          select: 'Выберите язык',
          en: 'Английский',
          ro: 'Румынский',
          ru: 'Русский'
        }
      },
      common: {
        retry: 'Повторить',
        loading: 'Загрузка...'
      }
    }
  }
}))