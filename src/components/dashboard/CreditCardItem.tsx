import { motion } from 'framer-motion'
import { CreditCard } from '@/types'
import { useFinance } from '@/contexts/FinanceContext'
import { formatCurrency } from '@/utils/format'

interface CreditCardItemProps {
  card: CreditCard
}

/**
 * CreditCardItem - Item individual do widget de cartões
 * 3 zonas: ícone, info, indicador (badge de uso)
 */
export default function CreditCardItem({ card }: CreditCardItemProps) {
  const { familyMembers } = useFinance()

  // Calcula percentual de uso
  const usagePercentage = card.limit > 0 ? (card.currentBill / card.limit) * 100 : 0
  const available = card.limit - card.currentBill

  // Encontra o titular
  const holder = familyMembers.find((m) => m.id === card.holderId)

  // Cores baseadas no tema do cartão
  const themeColors = {
    black: {
      bg: 'bg-secondary-dark',
      text: 'text-surface',
      border: 'border-secondary-dark',
    },
    lime: {
      bg: 'bg-primary',
      text: 'text-secondary-dark',
      border: 'border-primary',
    },
    white: {
      bg: 'bg-surface',
      text: 'text-secondary-dark',
      border: 'border-neutral-300',
    },
  }

  const colors = themeColors[card.theme]

  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)' }}
      transition={{ duration: 0.2 }}
      className="
        bg-surface
        border
        border-neutral-300
        rounded-md
        p-4
        flex
        items-center
        gap-4
        cursor-pointer
        transition-shadow
        duration-200
      "
    >
      {/* Zona 1: Ícone */}
      <div
        className={`
          w-12
          h-12
          rounded-md
          ${colors.bg}
          ${colors.border}
          border-2
          flex
          items-center
          justify-center
          flex-shrink-0
        `}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={colors.text}
        >
          <rect x="1" y="4" width="14" height="10" rx="1" stroke="currentColor" strokeWidth="1.5" />
          <path d="M1 7H15" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>

      {/* Zona 2: Informações */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-label-sm font-semibold text-secondary-dark truncate">
            {card.name}
          </h3>
          {card.lastDigits && (
            <span className="text-label-xs text-neutral-500">•••• {card.lastDigits}</span>
          )}
        </div>
        <div className="text-label-xs text-neutral-500">
          {holder?.name || 'Titular não encontrado'}
        </div>
        <div className="text-label-xs text-neutral-500 mt-1">
          Vence dia {card.dueDay.toString().padStart(2, '0')}
        </div>
      </div>

      {/* Zona 3: Indicador (Badge de uso) */}
      <div className="flex flex-col items-end gap-1 flex-shrink-0">
        <div
          className={`
            w-12
            h-12
            rounded-full
            flex
            items-center
            justify-center
            text-label-xs
            font-bold
            ${
              usagePercentage >= 80
                ? 'bg-red-100 text-red-600'
                : usagePercentage >= 50
                ? 'bg-yellow-100 text-yellow-600'
                : 'bg-green-100 text-green-600'
            }
          `}
        >
          {usagePercentage.toFixed(0)}%
        </div>
        <div className="text-label-xs text-neutral-500 text-right">
          {formatCurrency(available)} disp.
        </div>
      </div>
    </motion.div>
  )
}
