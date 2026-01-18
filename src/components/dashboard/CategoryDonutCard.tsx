import { motion } from 'framer-motion'
import { useFinance } from '@/contexts/FinanceContext'
import { formatCurrency } from '@/utils/format'

interface CategoryDonutCardProps {
  category: string
  amount: number
  count: number
}

/**
 * CategoryDonutCard - Card de categoria com gráfico donut
 * Gráfico donut de 64px mostrando percentual em relação à receita total
 */
export default function CategoryDonutCard({ category, amount, count }: CategoryDonutCardProps) {
  const { calculateCategoryPercentage } = useFinance()

  const percentage = calculateCategoryPercentage(category)

  // Calcula o ângulo para o gráfico donut (circunferência completa = 100%)
  const radius = 28 // Raio interno do donut
  const circumference = 2 * Math.PI * radius
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  // Cores para diferentes categorias (usando tokens do design system)
  const categoryColors: Record<string, string> = {
    Aluguel: '#e61e32', // red-600
    Alimentação: '#15be78', // green-600
    Mercado: '#2a89ef', // blue-600
    Academia: '#D7FF00', // primary
    Transporte: '#c4e703', // brand-700
    Saúde: '#e61e32', // red-600
    Educação: '#2a89ef', // blue-600
    Lazer: '#D7FF00', // primary
    Contas: '#9ca3af', // neutral-500
    Outros: '#9ca3af', // neutral-500
  }

  const color = categoryColors[category] || '#9ca3af'

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -4 }}
      transition={{ duration: 0.2 }}
      className="
        flex-shrink-0
        w-48
        bg-surface
        border
        border-neutral-300
        rounded-md
        p-4
        flex
        flex-col
        gap-3
        cursor-pointer
      "
    >
      {/* Nome da categoria */}
      <h3 className="text-label-sm font-semibold text-secondary-dark">{category}</h3>

      {/* Gráfico donut e informações */}
      <div className="flex items-center gap-4">
        {/* Gráfico donut SVG */}
        <div className="relative flex-shrink-0" style={{ width: '64px', height: '64px' }}>
          <svg width="64" height="64" viewBox="0 0 64 64" className="transform -rotate-90">
            {/* Círculo de fundo (cinza claro) */}
            <circle
              cx="32"
              cy="32"
              r={radius}
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="8"
            />
            {/* Círculo do percentual */}
            <motion.circle
              cx="32"
              cy="32"
              r={radius}
              fill="none"
              stroke={color}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={strokeDasharray}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          </svg>
          {/* Percentual no centro */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-label-xs font-bold text-secondary-dark">
              {percentage.toFixed(0)}%
            </span>
          </div>
        </div>

        {/* Informações */}
        <div className="flex flex-col gap-1 flex-1 min-w-0">
          <div className="text-heading-xs font-bold text-secondary-dark">
            {formatCurrency(amount)}
          </div>
          <div className="text-label-xs text-neutral-500">
            {count} {count === 1 ? 'transação' : 'transações'}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
