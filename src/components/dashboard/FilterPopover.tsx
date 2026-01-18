import { useFinance } from '@/contexts/FinanceContext'
import { useEffect, useRef } from 'react'

interface FilterPopoverProps {
  anchorRef: React.RefObject<HTMLButtonElement>
  onClose: () => void
}

/**
 * FilterPopover - Popover de filtros para desktop
 * Fundo branco semi-transparente com glassmorphism
 */
export default function FilterPopover({ anchorRef, onClose }: FilterPopoverProps) {
  const { filters, setFilters } = useFinance()
  const popoverRef = useRef<HTMLDivElement>(null)

  // Posiciona o popover abaixo do botão
  useEffect(() => {
    if (!anchorRef.current || !popoverRef.current) return

    const anchorRect = anchorRef.current.getBoundingClientRect()
    const popover = popoverRef.current

    popover.style.top = `${anchorRect.bottom + 8}px`
    popover.style.left = `${anchorRect.left}px`
  }, [anchorRef])

  // Fecha ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        anchorRef.current &&
        !anchorRef.current.contains(event.target as Node)
      ) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [onClose, anchorRef])

  const handleTypeChange = (type: 'all' | 'income' | 'expense') => {
    setFilters((prev) => ({
      ...prev,
      transactionType: type,
    }))
  }

  return (
    <div
      ref={popoverRef}
      className="
        absolute
        z-50
        bg-surface/95
        backdrop-blur-md
        rounded-md
        border
        border-neutral-300
        shadow-lg
        p-4
        min-w-[200px]
      "
    >
      <div className="flex flex-col gap-3">
        <span className="text-label-sm font-semibold text-secondary-dark mb-1">
          Tipo de Transação
        </span>

        {/* Opção: Todos */}
        <button
          onClick={() => handleTypeChange('all')}
          className={`
            px-4
            py-2
            rounded-md
            text-left
            text-label-sm
            font-medium
            transition-colors
            duration-200
            ${
              filters.transactionType === 'all'
                ? 'bg-secondary-dark text-surface'
                : 'bg-transparent text-neutral-500 hover:bg-neutral-100'
            }
          `}
        >
          Todos
        </button>

        {/* Opção: Receitas */}
        <button
          onClick={() => handleTypeChange('income')}
          className={`
            px-4
            py-2
            rounded-md
            text-left
            text-label-sm
            font-medium
            transition-colors
            duration-200
            ${
              filters.transactionType === 'income'
                ? 'bg-secondary-dark text-surface'
                : 'bg-transparent text-neutral-500 hover:bg-neutral-100'
            }
          `}
        >
          Receitas
        </button>

        {/* Opção: Despesas */}
        <button
          onClick={() => handleTypeChange('expense')}
          className={`
            px-4
            py-2
            rounded-md
            text-left
            text-label-sm
            font-medium
            transition-colors
            duration-200
            ${
              filters.transactionType === 'expense'
                ? 'bg-secondary-dark text-surface'
                : 'bg-transparent text-neutral-500 hover:bg-neutral-100'
            }
          `}
        >
          Despesas
        </button>
      </div>
    </div>
  )
}
