import { useRef, useState, useEffect } from 'react'
import { useFinance } from '@/contexts/FinanceContext'
import CategoryDonutCard from './CategoryDonutCard'

/**
 * ExpensesByCategoryCarousel - Carrossel de gastos por categoria
 * Scroll horizontal com mouse wheel, drag e setas
 * Gradiente de máscara nas bordas
 */
export default function ExpensesByCategoryCarousel() {
  const { calculateExpensesByCategory } = useFinance()
  const categories = calculateExpensesByCategory()
  const scrollRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)

  // Verifica se há scroll disponível
  const checkScroll = () => {
    if (!scrollRef.current) return

    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
    setShowLeftArrow(scrollLeft > 0)
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10)
  }

  useEffect(() => {
    checkScroll()
    const scrollElement = scrollRef.current
    if (scrollElement) {
      scrollElement.addEventListener('scroll', checkScroll)
      window.addEventListener('resize', checkScroll)
      return () => {
        scrollElement.removeEventListener('scroll', checkScroll)
        window.removeEventListener('resize', checkScroll)
      }
    }
  }, [categories])

  // Scroll com mouse wheel
  const handleWheel = (e: React.WheelEvent) => {
    if (!scrollRef.current) return
    e.preventDefault()
    scrollRef.current.scrollLeft += e.deltaY
  }

  // Scroll com setas
  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return
    const scrollAmount = 200
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    })
  }

  // Drag to scroll
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return
    setIsDragging(true)
    setStartX(e.pageX - scrollRef.current.offsetLeft)
    setScrollLeft(scrollRef.current.scrollLeft)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return
    e.preventDefault()
    const x = e.pageX - scrollRef.current.offsetLeft
    const walk = (x - startX) * 2
    scrollRef.current.scrollLeft = scrollLeft - walk
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  if (categories.length === 0) {
    return (
      <div className="bg-surface border border-neutral-300 rounded-md p-6">
        <p className="text-paragraph-sm text-neutral-500 text-center">
          Nenhuma despesa encontrada no período selecionado.
        </p>
      </div>
    )
  }

  return (
    <div className="relative">
      {/* Seta esquerda */}
      {showLeftArrow && (
        <button
          onClick={() => scroll('left')}
          className="
            absolute
            left-0
            top-1/2
            -translate-y-1/2
            z-10
            w-10
            h-10
            rounded-full
            bg-surface
            border
            border-neutral-300
            shadow-md
            flex
            items-center
            justify-center
            hover:bg-neutral-100
            transition-colors
            duration-200
            -translate-x-1/2
          "
          aria-label="Rolar para esquerda"
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
              d="M10 12L6 8L10 4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}

      {/* Container com gradiente de máscara */}
      <div className="relative overflow-hidden">
        {/* Gradiente esquerdo */}
        <div
          className="
            absolute
            left-0
            top-0
            bottom-0
            w-16
            bg-gradient-to-r
            from-background
            to-transparent
            pointer-events-none
            z-10
          "
        />

        {/* Carrossel */}
        <div
          ref={scrollRef}
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="
            flex
            gap-4
            overflow-x-auto
            scrollbar-hide
            pb-4
            px-4
            cursor-grab
            active:cursor-grabbing
          "
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {categories.map((item) => (
            <CategoryDonutCard
              key={item.category}
              category={item.category}
              amount={item.amount}
              count={item.count}
            />
          ))}
        </div>

        {/* Gradiente direito */}
        <div
          className="
            absolute
            right-0
            top-0
            bottom-0
            w-16
            bg-gradient-to-l
            from-background
            to-transparent
            pointer-events-none
            z-10
          "
        />
      </div>

      {/* Seta direita */}
      {showRightArrow && (
        <button
          onClick={() => scroll('right')}
          className="
            absolute
            right-0
            top-1/2
            -translate-y-1/2
            z-10
            w-10
            h-10
            rounded-full
            bg-surface
            border
            border-neutral-300
            shadow-md
            flex
            items-center
            justify-center
            hover:bg-neutral-100
            transition-colors
            duration-200
            translate-x-1/2
          "
          aria-label="Rolar para direita"
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
              d="M6 4L10 8L6 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}

      {/* Estilo para esconder scrollbar */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}
