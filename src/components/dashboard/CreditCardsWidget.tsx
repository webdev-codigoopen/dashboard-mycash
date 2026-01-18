import { useState } from 'react'
import { useFinance } from '@/contexts/FinanceContext'
import { PAGINATION } from '@/constants'
import CreditCardItem from './CreditCardItem'

/**
 * CreditCardsWidget - Widget de cartões de crédito
 * Container destacado com header, lista vertical e paginação
 */
export default function CreditCardsWidget() {
  const { creditCards } = useFinance()
  const [currentPage, setCurrentPage] = useState(1)

  const cardsPerPage = PAGINATION.CARDS_PER_PAGE
  const totalPages = Math.ceil(creditCards.length / cardsPerPage)
  const startIndex = (currentPage - 1) * cardsPerPage
  const endIndex = startIndex + cardsPerPage
  const currentCards = creditCards.slice(startIndex, endIndex)

  const handleAddCard = () => {
    // TODO: Abrir modal de adicionar cartão (PROMPT 14)
    console.log('Abrir modal de adicionar cartão')
  }

  if (creditCards.length === 0) {
    return (
      <div className="bg-surface border border-neutral-300 rounded-md p-6">
        <p className="text-paragraph-sm text-neutral-500 text-center">
          Nenhum cartão cadastrado.
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
      {/* Header: Ícone, Título e Botão "+" */}
      <div className="flex items-center justify-between">
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
              <rect x="1" y="4" width="14" height="10" rx="1" stroke="currentColor" strokeWidth="1.5" />
              <path d="M1 7H15" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </div>
          <h2 className="text-heading-sm font-bold text-secondary-dark">Cartões de Crédito</h2>
        </div>

        <button
          onClick={handleAddCard}
          className="
            w-10
            h-10
            rounded-full
            bg-secondary-dark
            text-surface
            flex
            items-center
            justify-center
            hover:opacity-90
            transition-opacity
            duration-200
            touch-manipulation
          "
          aria-label="Adicionar cartão"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-surface"
          >
            <path
              d="M8 4V12M4 8H12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {/* Lista vertical de cartões */}
      <div className="flex flex-col gap-3">
        {currentCards.map((card) => (
          <CreditCardItem key={card.id} card={card} />
        ))}
      </div>

      {/* Paginação (se mais de 3 cartões) */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-2 border-t border-neutral-300">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="
              w-8
              h-8
              rounded-md
              border
              border-neutral-300
              bg-surface
              flex
              items-center
              justify-center
              disabled:opacity-50
              disabled:cursor-not-allowed
              hover:bg-neutral-100
              transition-colors
              duration-200
            "
            aria-label="Página anterior"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-secondary-dark"
            >
              <path
                d="M10 12L6 8L10 4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`
                  w-8
                  h-8
                  rounded-md
                  text-label-xs
                  font-medium
                  transition-colors
                  duration-200
                  ${
                    currentPage === page
                      ? 'bg-secondary-dark text-surface'
                      : 'bg-transparent text-neutral-500 hover:bg-neutral-100'
                  }
                `}
                aria-label={`Ir para página ${page}`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="
              w-8
              h-8
              rounded-md
              border
              border-neutral-300
              bg-surface
              flex
              items-center
              justify-center
              disabled:opacity-50
              disabled:cursor-not-allowed
              hover:bg-neutral-100
              transition-colors
              duration-200
            "
            aria-label="Próxima página"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-secondary-dark"
            >
              <path
                d="M6 4L10 8L6 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}
