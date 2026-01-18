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
        ${isExpanded ? '' : 'justify-center'}
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
  )
}
