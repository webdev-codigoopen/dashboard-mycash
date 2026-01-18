import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

interface SidebarItemProps {
  to: string
  iconSrc: string
  label: string
  isExpanded: boolean
}

export default function SidebarItem({ to, iconSrc, label, isExpanded }: SidebarItemProps) {
  const location = useLocation()
  const isActive = location.pathname === to

  return (
    <Link
      to={to}
      className={`
        flex items-center
        transition-all duration-200 ease-in-out
        ${isActive ? 'bg-primary text-secondary-dark' : 'bg-transparent text-neutral-500 hover:bg-neutral-300/20'}
        ${isExpanded ? 'justify-start' : 'justify-center'}
      `}
      style={{
        padding: '12px 18px',
        gap: isExpanded ? '12px' : '0',
        borderRadius: '999px',
      }}
    >
      <motion.img
        src={iconSrc}
        alt={label}
        className="w-6 h-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      />

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
