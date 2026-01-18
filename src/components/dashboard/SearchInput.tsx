import { useState, useEffect } from 'react'
import { useFinance } from '@/contexts/FinanceContext'

/**
 * SearchInput - Campo de busca com ícone de lupa
 * Busca em tempo real (case-insensitive, descrição e categoria)
 */
export default function SearchInput() {
  const { filters, setFilters } = useFinance()
  const [localValue, setLocalValue] = useState(filters.searchText)

  // Debounce para evitar muitas atualizações
  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters((prev) => ({
        ...prev,
        searchText: localValue,
      }))
    }, 300)

    return () => clearTimeout(timer)
  }, [localValue, setFilters])

  return (
    <div
      className="
        relative
        flex-1
        md:flex-initial
        md:w-64
      "
    >
      {/* Ícone de lupa */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
        <svg
          width="20"
          height="20"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-neutral-500"
        >
          <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M11 11L14 14"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Input */}
      <input
        type="text"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        placeholder="Pesquisar..."
        className="
          w-full
          pl-11
          pr-4
          py-3
          rounded-md
          border
          border-neutral-300
          bg-surface
          text-paragraph-sm
          text-secondary-dark
          placeholder:text-neutral-500
          focus:outline-none
          focus:ring-2
          focus:ring-primary
          focus:border-transparent
        "
      />
    </div>
  )
}
