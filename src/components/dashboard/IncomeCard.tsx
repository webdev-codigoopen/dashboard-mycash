import { useFinance } from '@/contexts/FinanceContext'
import { formatCurrency } from '@/utils/format'
import { useCountAnimation } from '@/hooks/useCountAnimation'

/**
 * IncomeCard - Card de Receitas
 * Fundo branco, borda sutil, ícone de seta diagonal baixo-esquerda
 */
export default function IncomeCard() {
  const { calculateIncomeForPeriod } = useFinance()
  const income = calculateIncomeForPeriod()
  const animatedValue = useCountAnimation(income, 800)

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
        <span className="text-label-sm font-bold text-secondary-dark">Receitas</span>

        {/* Ícone em círculo cinza claro */}
        <div
          className="
            w-10
            h-10
            rounded-full
            bg-neutral-300
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
            className="text-secondary-dark"
          >
            {/* Seta diagonal apontando para baixo-esquerda (entrada de dinheiro) */}
            <path
              d="M4 12L12 4M12 4H8M12 4V8"
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
