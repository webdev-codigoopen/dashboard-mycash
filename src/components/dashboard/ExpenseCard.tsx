import { useFinance } from '@/contexts/FinanceContext'
import { formatCurrency } from '@/utils/format'
import { useCountAnimation } from '@/hooks/useCountAnimation'

/**
 * ExpenseCard - Card de Despesas
 * Fundo branco, borda sutil, ícone de seta diagonal cima-direita
 */
export default function ExpenseCard() {
  const { calculateExpensesForPeriod } = useFinance()
  const expenses = calculateExpensesForPeriod()
  const animatedValue = useCountAnimation(expenses, 800)

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
        justify-between
      "
      style={{
        minHeight: '180px',
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        {/* Label */}
        <span className="text-label-sm font-bold text-neutral-500">Despesas</span>

        {/* Ícone em círculo vermelho claro */}
        <div
          className="
            w-10
            h-10
            rounded-full
            bg-red-100
            flex
            items-center
            justify-center
            flex-shrink-0
          "
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-red-600"
          >
            {/* Seta diagonal apontando para cima-direita (saída de dinheiro) */}
            <path
              d="M12 4L4 12M4 12H8M4 12V8"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Valor */}
      <div className="text-heading-md font-bold text-secondary-dark">
        {formatCurrency(animatedValue)}
      </div>
    </div>
  )
}
