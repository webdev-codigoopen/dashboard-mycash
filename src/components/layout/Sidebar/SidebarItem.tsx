import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ReactNode } from 'react'

interface SidebarItemProps {
  to: string
  icon: ReactNode
  label: string
  isExpanded: boolean
}

/**
 * Item de navegação da Sidebar
 * Mostra ícone + texto quando expandida, apenas ícone quando colapsada
 * Item ativo tem fundo preto com texto branco e ícone verde-limão
 */
export default function SidebarItem({
  to,
  icon,
  label,
  isExpanded,
}: SidebarItemProps) {
  const location = useLocation()
  const isActive = location.pathname === to

  return (
    <div className="relative group">
      <Link
        to={to}
        className={`
          flex items-center rounded-full
          transition-all duration-200 ease-in-out
          ${
            isActive
              ? 'bg-primary text-secondary-dark'
              : 'bg-transparent text-neutral-500 hover:bg-neutral-300/20'
          }
        `}
        style={{
          padding: '12px 16px',
          gap: '8px',
        }}
      >
        {/* Ícone - sempre visível */}
        <div
          className={`
            flex-shrink-0 w-4 h-4
            ${isActive ? 'text-secondary-dark' : 'text-neutral-500'}
          `}
        >
          {icon}
        </div>

        {/* Texto - apenas quando expandida */}
        <AnimatePresence>
          {isExpanded && (
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.2 }}
              className="text-label-lg font-semibold whitespace-nowrap overflow-hidden"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </Link>

      {/* Tooltip quando colapsada */}
      <AnimatePresence>
        {!isExpanded && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ delay: 0.3, duration: 0.2 }}
            className="
              absolute left-full ml-2 px-3 py-2
              bg-secondary-dark text-surface
              rounded-md text-label-sm
              whitespace-nowrap
              pointer-events-none
              z-50
              opacity-0 group-hover:opacity-100
              transition-opacity duration-200
            "
          >
            {label}
            {/* Seta do tooltip */}
            <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-secondary-dark" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
