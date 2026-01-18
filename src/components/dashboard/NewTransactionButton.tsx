import { useMediaQuery } from '@/hooks/useMediaQuery'

/**
 * NewTransactionButton - Botão "Nova Transação"
 * Fundo preto, texto branco, ícone de "+"
 * Largura total no mobile, altura maior
 */
export default function NewTransactionButton() {
  const isMobile = useMediaQuery('(max-width: 767px)')

  const handleClick = () => {
    // TODO: Abrir modal de nova transação (PROMPT 12)
    console.log('Abrir modal de nova transação')
  }

  return (
    <button
      onClick={handleClick}
      className={`
        flex
        items-center
        justify-center
        gap-2
        bg-secondary-dark
        text-surface
        rounded-md
        font-semibold
        transition-opacity
        duration-200
        hover:opacity-90
        touch-manipulation
        ${isMobile ? 'w-full py-4 text-label-lg' : 'px-6 py-3 text-label-sm'}
      `}
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
      <span>Nova Transação</span>
    </button>
  )
}
