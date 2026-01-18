import { useState, useRef, useEffect } from 'react'
import { useFinance } from '@/contexts/FinanceContext'
import { formatDateRange } from '@/utils/format'
import { startOfMonth, endOfMonth, subMonths, startOfYear, endOfYear } from 'date-fns'

/**
 * DateRangePicker - Seletor de período com calendário
 * Botão mostra período atual, abre calendário ao clicar
 */
export default function DateRangePicker() {
  const { filters, setFilters } = useFinance()
  const [isOpen, setIsOpen] = useState(false)
  const [startDate, setStartDate] = useState<Date | null>(filters.dateRange.startDate)
  const [endDate, setEndDate] = useState<Date | null>(filters.dateRange.endDate)
  const [selectingStart, setSelectingStart] = useState(true)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const calendarRef = useRef<HTMLDivElement>(null)

  // Sincroniza com filtros globais
  useEffect(() => {
    setStartDate(filters.dateRange.startDate)
    setEndDate(filters.dateRange.endDate)
  }, [filters.dateRange])

  // Fecha ao clicar fora
  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        handleConfirm()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen, startDate, endDate])

  const handleDateClick = (date: Date) => {
    if (selectingStart || !startDate) {
      setStartDate(date)
      setEndDate(null)
      setSelectingStart(false)
    } else {
      if (date < startDate!) {
        setStartDate(date)
        setEndDate(null)
      } else {
        setEndDate(date)
        setSelectingStart(true)
      }
    }
  }

  const handleConfirm = () => {
    setFilters((prev) => ({
      ...prev,
      dateRange: {
        startDate,
        endDate,
      },
    }))
    setIsOpen(false)
    setSelectingStart(true)
  }

  const handleQuickSelect = (type: 'thisMonth' | 'lastMonth' | 'last3Months' | 'thisYear') => {
    const now = new Date()
    let start: Date
    let end: Date

    switch (type) {
      case 'thisMonth':
        start = startOfMonth(now)
        end = endOfMonth(now)
        break
      case 'lastMonth':
        const lastMonth = subMonths(now, 1)
        start = startOfMonth(lastMonth)
        end = endOfMonth(lastMonth)
        break
      case 'last3Months':
        start = startOfMonth(subMonths(now, 2))
        end = endOfMonth(now)
        break
      case 'thisYear':
        start = startOfYear(now)
        end = endOfYear(now)
        break
    }

    setStartDate(start)
    setEndDate(end)
    setFilters((prev) => ({
      ...prev,
      dateRange: { startDate: start, endDate: end },
    }))
    setIsOpen(false)
  }

  const clearSelection = () => {
    setStartDate(null)
    setEndDate(null)
    setFilters((prev) => ({
      ...prev,
      dateRange: { startDate: null, endDate: null },
    }))
    setIsOpen(false)
  }

  // Gera dias do mês atual
  const generateCalendarDays = () => {
    const now = new Date()
    const year = now.getFullYear()
    const month = now.getMonth()
    const lastDay = new Date(year, month + 1, 0)
    const days: Date[] = []

    // Preenche dias do mês
    for (let day = 1; day <= lastDay.getDate(); day++) {
      days.push(new Date(year, month, day))
    }

    return days
  }

  const calendarDays = generateCalendarDays()
  const monthNames = [
    'Jan',
    'Fev',
    'Mar',
    'Abr',
    'Mai',
    'Jun',
    'Jul',
    'Ago',
    'Set',
    'Out',
    'Nov',
    'Dez',
  ]

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="
          px-4
          py-2
          rounded-md
          border
          border-neutral-300
          bg-surface
          text-label-sm
          text-secondary-dark
          hover:bg-neutral-100
          transition-colors
          duration-200
          whitespace-nowrap
        "
      >
        {formatDateRange(startDate, endDate)}
      </button>

      {isOpen && (
        <div
          ref={calendarRef}
          className="
            absolute
            top-full
            left-0
            mt-2
            z-50
            bg-surface
            border
            border-neutral-300
            rounded-md
            shadow-lg
            p-4
            min-w-[300px]
          "
        >
          {/* Atalhos rápidos */}
          <div className="flex flex-wrap gap-2 mb-4">
            <button
              onClick={() => handleQuickSelect('thisMonth')}
              className="px-3 py-1.5 text-label-xs bg-neutral-100 rounded-md hover:bg-neutral-200 transition-colors"
            >
              Este mês
            </button>
            <button
              onClick={() => handleQuickSelect('lastMonth')}
              className="px-3 py-1.5 text-label-xs bg-neutral-100 rounded-md hover:bg-neutral-200 transition-colors"
            >
              Mês passado
            </button>
            <button
              onClick={() => handleQuickSelect('last3Months')}
              className="px-3 py-1.5 text-label-xs bg-neutral-100 rounded-md hover:bg-neutral-200 transition-colors"
            >
              Últimos 3 meses
            </button>
            <button
              onClick={() => handleQuickSelect('thisYear')}
              className="px-3 py-1.5 text-label-xs bg-neutral-100 rounded-md hover:bg-neutral-200 transition-colors"
            >
              Este ano
            </button>
          </div>

          {/* Calendário simplificado */}
          <div className="mb-4">
            <div className="text-label-sm font-semibold text-secondary-dark mb-2">
              {monthNames[new Date().getMonth()]} {new Date().getFullYear()}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day) => (
                <div
                  key={day}
                  className="text-label-xs text-neutral-500 text-center py-1"
                >
                  {day}
                </div>
              ))}
              {calendarDays.map((day) => {
                const isSelected =
                  (startDate && day.getTime() === startDate.getTime()) ||
                  (endDate && day.getTime() === endDate.getTime())
                const isInRange =
                  startDate &&
                  endDate &&
                  day >= startDate &&
                  day <= endDate &&
                  !isSelected

                return (
                  <button
                    key={day.getTime()}
                    onClick={() => handleDateClick(day)}
                    className={`
                      aspect-square
                      rounded-md
                      text-label-xs
                      transition-colors
                      duration-200
                      ${
                        isSelected
                          ? 'bg-secondary-dark text-surface'
                          : isInRange
                          ? 'bg-neutral-100 text-secondary-dark'
                          : 'hover:bg-neutral-100 text-secondary-dark'
                      }
                    `}
                  >
                    {day.getDate()}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Botões de ação */}
          <div className="flex gap-2">
            <button
              onClick={clearSelection}
              className="px-4 py-2 text-label-sm text-neutral-500 hover:text-secondary-dark transition-colors"
            >
              Limpar
            </button>
            <button
              onClick={handleConfirm}
              className="ml-auto px-4 py-2 bg-secondary-dark text-surface rounded-md text-label-sm font-medium hover:opacity-90 transition-opacity"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
