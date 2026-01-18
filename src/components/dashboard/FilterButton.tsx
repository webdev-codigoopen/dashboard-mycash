import { useState, useRef, useEffect } from 'react'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import FilterPopover from './FilterPopover'
import FilterModal from './FilterModal'

/**
 * FilterButton - Botão circular com ícone de controles deslizantes
 * Abre popover no desktop, modal no mobile
 */
export default function FilterButton() {
  const [isOpen, setIsOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const isMobile = useMediaQuery('(max-width: 767px)')

  // Fecha ao clicar fora
  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (event: MouseEvent) => {
      if (buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  return (
    <>
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="
          w-11
          h-11
          rounded-full
          bg-neutral-100
          hover:bg-neutral-200
          flex
          items-center
          justify-center
          transition-colors
          duration-200
          touch-manipulation
        "
        aria-label="Filtros"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-secondary-dark"
        >
          {/* Ícone de controles deslizantes */}
          <path
            d="M2 4H14M4 8H12M6 12H10"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {isOpen && (
        <>
          {isMobile ? (
            <FilterModal onClose={() => setIsOpen(false)} />
          ) : (
            <FilterPopover
              anchorRef={buttonRef}
              onClose={() => setIsOpen(false)}
            />
          )}
        </>
      )}
    </>
  )
}
