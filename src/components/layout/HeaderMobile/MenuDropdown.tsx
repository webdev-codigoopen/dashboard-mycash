import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { ROUTES, ROUTE_NAMES } from '@/constants'

interface MenuDropdownProps {
  isOpen: boolean
  onClose: () => void
}

/**
 * Ícones SVG inline (mesmos da Sidebar)
 */
const HomeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
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
  <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1" y="4" width="14" height="10" rx="1" stroke="currentColor" strokeWidth="1.5" />
    <path d="M1 7H15" stroke="currentColor" strokeWidth="1.5" />
  </svg>
)

const TransactionsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M2 4H14M2 8H14M2 12H10"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
)

const ProfileIcon = () => (
  <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="6" r="3" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M3 14C3 11.5 5.5 9.5 8 9.5C10.5 9.5 13 11.5 13 14"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
)

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 4L4 12M4 4L12 12"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const LogoutIcon = () => (
  <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M6 14H3C2.44772 14 2 13.5523 2 13V3C2 2.44772 2.44772 2 3 2H6M10 12L14 8M14 8L10 4M14 8H6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

/**
 * MenuDropdown para mobile/tablet
 * Desliza de cima para baixo quando aberto
 * Não é fullscreen, cobre o conteúdo abaixo
 */
export default function MenuDropdown({ isOpen, onClose }: MenuDropdownProps) {
  const location = useLocation()

  const handleLogout = () => {
    // TODO: Implementar lógica de logout
    console.log('Logout')
    onClose()
  }

  const handleItemClick = () => {
    onClose()
  }

  const menuItems = [
    { to: ROUTES.DASHBOARD, icon: <HomeIcon />, label: ROUTE_NAMES[ROUTES.DASHBOARD] },
    { to: ROUTES.CARDS, icon: <CreditCardIcon />, label: ROUTE_NAMES[ROUTES.CARDS] },
    { to: ROUTES.TRANSACTIONS, icon: <TransactionsIcon />, label: ROUTE_NAMES[ROUTES.TRANSACTIONS] },
    { to: ROUTES.PROFILE, icon: <ProfileIcon />, label: ROUTE_NAMES[ROUTES.PROFILE] },
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay escuro semi-transparente */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-secondary-dark/50 z-50"
            onClick={onClose}
          />

          {/* Menu Dropdown */}
          <motion.div
            initial={{ y: '-100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '-100%', opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="
              fixed top-0 left-0 right-0
              bg-surface rounded-b-2xl
              shadow-lg
              z-50
              max-h-[80vh] overflow-y-auto
            "
            style={{
              paddingTop: '16px',
              paddingBottom: '24px',
            }}
          >
            {/* Header do menu */}
            <div className="flex items-center justify-between px-6 pb-4 border-b border-neutral-300">
              <h2 className="text-heading-xs font-bold text-secondary-dark">Menu</h2>
              <button
                onClick={onClose}
                className="
                  w-11 h-11 rounded-full
                  flex items-center justify-center
                  hover:bg-neutral-100
                  transition-colors duration-200
                  touch-manipulation
                "
                aria-label="Fechar menu"
              >
                <CloseIcon />
              </button>
            </div>

            {/* Itens de navegação */}
            <nav className="flex flex-col px-4 py-2">
              {menuItems.map((item) => {
                const isActive = location.pathname === item.to
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={handleItemClick}
                    className={`
                      flex items-center gap-4 px-4 py-4 rounded-md
                      transition-colors duration-200
                      touch-manipulation
                      ${
                        isActive
                          ? 'bg-secondary-dark text-surface'
                          : 'text-neutral-500 hover:bg-neutral-100'
                      }
                    `}
                  >
                    <div
                      className={`
                        flex-shrink-0
                        ${isActive ? 'text-primary' : 'text-neutral-500'}
                      `}
                    >
                      {item.icon}
                    </div>
                    <span className="text-label-lg font-semibold">{item.label}</span>
                  </Link>
                )
              })}
            </nav>

            {/* Botão Sair */}
            <div className="px-4 pt-4 border-t border-neutral-300 mt-4">
              <button
                onClick={handleLogout}
                className="
                  w-full flex items-center gap-4 px-4 py-4
                  bg-red-600 text-surface
                  rounded-md
                  hover:bg-red-700
                  transition-colors duration-200
                  touch-manipulation
                "
              >
                <LogoutIcon />
                <span className="text-label-lg font-semibold">Sair</span>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
