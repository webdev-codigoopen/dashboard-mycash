import { motion, AnimatePresence } from 'framer-motion'
import { useFinance } from '@/contexts/FinanceContext'

interface FilterModalProps {
  onClose: () => void
}

/**
 * FilterModal - Modal de filtros para mobile
 * Desliza de baixo para cima
 */
export default function FilterModal({ onClose }: FilterModalProps) {
  const { filters, setFilters } = useFinance()

  const handleTypeChange = (type: 'all' | 'income' | 'expense') => {
    setFilters((prev) => ({
      ...prev,
      transactionType: type,
    }))
    onClose()
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 bg-secondary-dark/50 z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="
            fixed
            bottom-0
            left-0
            right-0
            bg-surface
            rounded-t-2xl
            p-6
            max-h-[80vh]
            overflow-y-auto
          "
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-heading-xs font-bold text-secondary-dark">Filtros</h2>
            <button
              onClick={onClose}
              className="
                w-10
                h-10
                rounded-full
                flex
                items-center
                justify-center
                hover:bg-neutral-100
                transition-colors
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
                  d="M12 4L4 12M4 4L12 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <span className="text-label-sm font-semibold text-secondary-dark mb-3 block">
                Tipo de Transação
              </span>

              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handleTypeChange('all')}
                  className={`
                    px-4
                    py-3
                    rounded-md
                    text-left
                    text-label-sm
                    font-medium
                    transition-colors
                    duration-200
                    ${
                      filters.transactionType === 'all'
                        ? 'bg-secondary-dark text-surface'
                        : 'bg-neutral-100 text-neutral-500'
                    }
                  `}
                >
                  Todos
                </button>

                <button
                  onClick={() => handleTypeChange('income')}
                  className={`
                    px-4
                    py-3
                    rounded-md
                    text-left
                    text-label-sm
                    font-medium
                    transition-colors
                    duration-200
                    ${
                      filters.transactionType === 'income'
                        ? 'bg-secondary-dark text-surface'
                        : 'bg-neutral-100 text-neutral-500'
                    }
                  `}
                >
                  Receitas
                </button>

                <button
                  onClick={() => handleTypeChange('expense')}
                  className={`
                    px-4
                    py-3
                    rounded-md
                    text-left
                    text-label-sm
                    font-medium
                    transition-colors
                    duration-200
                    ${
                      filters.transactionType === 'expense'
                        ? 'bg-secondary-dark text-surface'
                        : 'bg-neutral-100 text-neutral-500'
                    }
                  `}
                >
                  Despesas
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
