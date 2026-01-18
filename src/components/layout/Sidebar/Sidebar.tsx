import { motion } from 'framer-motion'
import { useSidebar } from '@/hooks/useSidebar'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { ROUTES, ROUTE_NAMES } from '@/constants'
import SidebarLogo from './SidebarLogo'
import SidebarItem from './SidebarItem'
import SidebarUser from './SidebarUser'

/**
 * Ícones SVG inline (temporário - depois podemos usar biblioteca de ícones)
 */
const HomeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M8 1L1 7V15H6V11H10V15H15V7L8 1Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const CreditCardIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1" y="4" width="14" height="10" rx="1" stroke="currentColor" strokeWidth="1.5" />
    <path d="M1 7H15" stroke="currentColor" strokeWidth="1.5" />
  </svg>
)

const TransactionsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M2 4H14M2 8H14M2 12H10"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
)

const ProfileIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="6" r="3" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M3 14C3 11.5 5.5 9.5 8 9.5C10.5 9.5 13 11.5 13 14"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
)

const ChevronLeftIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M10 12L6 8L10 4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const ChevronRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M6 4L10 8L6 12"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

/**
 * Sidebar principal
 * Renderiza apenas em desktop (≥1280px)
 * Estados: expandido (300px) e colapsado (~80px)
 */
export default function Sidebar() {
  const { isExpanded, toggle } = useSidebar()
  const isDesktop = useMediaQuery('(min-width: 1280px)')

  // Não renderiza em mobile/tablet
  if (!isDesktop) {
    return null
  }

  const sidebarWidth = isExpanded ? 300 : 80

  return (
    <motion.aside
      initial={false}
      animate={{
        width: sidebarWidth,
      }}
      transition={{
        duration: 0.3,
        ease: 'easeInOut',
      }}
      className="
        fixed left-0 top-0 h-screen
        bg-surface border-r border-neutral-300
        flex flex-col
        z-40
      "
      style={{
        padding: '32px',
        gap: '56px',
      }}
    >
      {/* Seção superior: Logo e Menu */}
      <div className="flex flex-col" style={{ gap: '56px' }}>
        {/* Logo */}
        <SidebarLogo isExpanded={isExpanded} />

        {/* Menu de navegação */}
        <nav className="flex flex-col" style={{ gap: '8px' }}>
          <SidebarItem
            to={ROUTES.DASHBOARD}
            icon={<HomeIcon />}
            label={ROUTE_NAMES[ROUTES.DASHBOARD]}
            isExpanded={isExpanded}
          />
          <SidebarItem
            to={ROUTES.CARDS}
            icon={<CreditCardIcon />}
            label={ROUTE_NAMES[ROUTES.CARDS]}
            isExpanded={isExpanded}
          />
          <SidebarItem
            to={ROUTES.TRANSACTIONS}
            icon={<TransactionsIcon />}
            label={ROUTE_NAMES[ROUTES.TRANSACTIONS]}
            isExpanded={isExpanded}
          />
          <SidebarItem
            to={ROUTES.PROFILE}
            icon={<ProfileIcon />}
            label={ROUTE_NAMES[ROUTES.PROFILE]}
            isExpanded={isExpanded}
          />
        </nav>
      </div>

      {/* Seção inferior: Usuário */}
      <div className="mt-auto flex flex-col gap-3">
        <SidebarUser isExpanded={isExpanded} />
      </div>

      {/* Botão de toggle - posicionado na borda direita */}
      <button
        onClick={toggle}
        className="
          absolute -right-4 top-9
          w-8 h-8 rounded-full
          bg-surface border border-neutral-300
          shadow-md
          flex items-center justify-center
          hover:bg-neutral-100
          transition-colors duration-200
          z-50
        "
        aria-label={isExpanded ? 'Colapsar sidebar' : 'Expandir sidebar'}
      >
        {isExpanded ? (
          <ChevronLeftIcon />
        ) : (
          <ChevronRightIcon />
        )}
      </button>
    </motion.aside>
  )
}
