import { useMediaQuery } from '@/hooks/useMediaQuery'
import SearchInput from './SearchInput'
import FilterButton from './FilterButton'
import DateRangePicker from './DateRangePicker'
import MembersWidget from './MembersWidget'
import NewTransactionButton from './NewTransactionButton'

/**
 * DashboardHeader - Barra de controles do dashboard
 * Contém busca, filtros, seletor de período, membros e botão nova transação
 */
export default function DashboardHeader() {
  const isMobile = useMediaQuery('(max-width: 767px)')

  return (
    <div
      className="
        w-full
        flex
        flex-col
        md:flex-row
        items-start
        md:items-center
        gap-4
        md:gap-6
        mb-8
      "
    >
      {/* Lado esquerdo: Busca e Filtros */}
      <div className="flex items-center gap-4 flex-1 w-full md:w-auto">
        <SearchInput />
        <FilterButton />
      </div>

      {/* Centro: Período e Membros */}
      <div className="flex items-center gap-4 flex-wrap">
        <DateRangePicker />
        <MembersWidget />
      </div>

      {/* Lado direito: Nova Transação */}
      <div className={isMobile ? 'w-full' : 'flex-shrink-0'}>
        <NewTransactionButton />
      </div>
    </div>
  )
}
