import { AnimatePresence, motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { ROUTES, ROUTE_NAMES } from '@/constants'
import SidebarLogo from '../Sidebar/SidebarLogo'
import {
  RiHome4Line,
  RiIdCardLine,
  RiFileListLine,
  RiUserLine,
  RiArrowRightSLine,
} from 'react-icons/ri'

interface MenuDropdownProps {
  isOpen: boolean
  onClose: () => void
}

export default function MenuDropdown({ isOpen, onClose }: MenuDropdownProps) {
  const location = useLocation()

  const menuItems = [
    { to: ROUTES.DASHBOARD, icon: <RiHome4Line />, label: ROUTE_NAMES[ROUTES.DASHBOARD] },
    { to: ROUTES.CARDS, icon: <RiIdCardLine />, label: ROUTE_NAMES[ROUTES.CARDS] },
    { to: ROUTES.TRANSACTIONS, icon: <RiFileListLine />, label: ROUTE_NAMES[ROUTES.TRANSACTIONS] },
    { to: ROUTES.PROFILE, icon: <RiUserLine />, label: ROUTE_NAMES[ROUTES.PROFILE] },
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-secondary-dark/40 z-40"
            onClick={onClose}
          />

          <motion.aside
            initial={{ x: '-120%' }}
            animate={{ x: 0 }}
            exit={{ x: '-120%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed top-0 left-0 h-full w-[280px] bg-surface border-r border-neutral-300 shadow-lg z-50 flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-6 border-b border-neutral-300">
              <SidebarLogo isExpanded />
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-neutral-100 transition-colors duration-200"
                aria-label="Fechar menu"
              >
                <RiArrowRightSLine className="w-4 h-4 rotate-180" />
              </button>
            </div>

            <nav className="flex flex-col gap-2 px-4 py-4 flex-1 overflow-y-auto">
              {menuItems.map((item) => {
                const isActive = location.pathname === item.to
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={onClose}
                    className={`
                      flex items-center gap-4 px-4 py-3 rounded-full
                      transition-colors duration-200
                      ${isActive ? 'bg-primary text-secondary-dark' : 'text-neutral-500 hover:bg-neutral-300/20'}
                    `}
                  >
                    <div className="flex-shrink-0 text-lg">{item.icon}</div>
                    <span className="text-label-lg font-semibold">{item.label}</span>
                  </Link>
                )
              })}
            </nav>

            <div className="px-4 pb-6">
              <button
                onClick={onClose}
                className="w-full flex items-center gap-3 px-4 py-3 bg-red-600 text-surface rounded-full hover:bg-red-700 transition-colors duration-200"
              >
                <span className="text-label-lg font-semibold">Sair</span>
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
