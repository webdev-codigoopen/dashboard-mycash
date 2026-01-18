import { useMemo } from 'react'
import { useFinance } from '@/contexts/FinanceContext'
import UpcomingExpenseItem from './UpcomingExpenseItem'

/**
 * UpcomingExpensesWidget - Widget de próximas despesas
 * Lista cronológica de contas a pagar ordenada por data de vencimento
 */
export default function UpcomingExpensesWidget() {
  const { transactions } = useFinance()

  // Filtra e ordena despesas futuras
  const upcomingExpenses = useMemo(() => {
    const now = new Date()
    now.setHours(0, 0, 0, 0)

    // Filtra despesas não pagas com dueDate futuro ou recorrentes
    const expenses = transactions
      .filter((t) => {
        if (t.type !== 'expense') return false
        if (t.isPaid) return false

        // Inclui despesas recorrentes ou com dueDate futuro
        if (t.isRecurring) return true
        if (t.dueDate) {
          const due = new Date(t.dueDate)
          due.setHours(0, 0, 0, 0)
          return due >= now
        }

        // Se não tem dueDate, usa a data da transação
        const transDate = new Date(t.date)
        transDate.setHours(0, 0, 0, 0)
        return transDate >= now
      })
      .sort((a, b) => {
        // Ordena por data de vencimento crescente
        const dateA = a.dueDate || a.date
        const dateB = b.dueDate || b.date
        return dateA.getTime() - dateB.getTime()
      })

    return expenses
  }, [transactions])

  if (upcomingExpenses.length === 0) {
    return (
      <div className="bg-surface border border-neutral-300 rounded-md p-6">
        <div className="flex items-center gap-3 mb-4">
          <div
            className="
              w-10
              h-10
              rounded-full
              bg-neutral-100
              flex
              items-center
              justify-center
            "
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-secondary-dark"
            >
              <path
                d="M8 4V12M4 8H12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <h2 className="text-heading-sm font-bold text-secondary-dark">Próximas Despesas</h2>
        </div>
        <p className="text-paragraph-sm text-neutral-500 text-center">
          Nenhuma despesa pendente.
        </p>
      </div>
    )
  }

  return (
    <div
      className="
        bg-surface
        border
        border-neutral-300
        rounded-md
        p-6
        flex
        flex-col
        gap-4
      "
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <div
          className="
            w-10
            h-10
            rounded-full
            bg-neutral-100
            flex
            items-center
            justify-center
          "
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-secondary-dark"
          >
            <path
              d="M8 4V12M4 8H12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <h2 className="text-heading-sm font-bold text-secondary-dark">Próximas Despesas</h2>
      </div>

      {/* Lista cronológica */}
      <div className="flex flex-col gap-3">
        {upcomingExpenses.map((expense) => (
          <UpcomingExpenseItem key={expense.id} transaction={expense} />
        ))}
      </div>
    </div>
  )
}
