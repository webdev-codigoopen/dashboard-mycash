import { motion } from 'framer-motion'
import { useSidebar } from '@/hooks/useSidebar'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { ROUTES, ROUTE_NAMES } from '@/constants'
import SidebarLogo from './SidebarLogo'
import SidebarItem from './SidebarItem'
import SidebarUser from './SidebarUser'
import {
  RiHome4Line,
  RiIdCardLine,
  RiFileListLine,
  RiUserLine,
} from 'react-icons/ri'
import angleRightIcon from '@/assets/icons/angle-right-icon.svg'

/**
 * Sidebar principal
 * Renderiza apenas em desktop (≥1280px)
 * Estados: expandido (300px) e colapsado (80px)
 */
export default function Sidebar() {
  const { isExpanded, toggle } = useSidebar()
  const isDesktop = useMediaQuery('(min-width: 1280px)')

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
      className={`
        fixed left-0 top-0 h-screen
        bg-surface border-r border-neutral-300
        flex flex-col
        z-40
        ${isExpanded ? '' : 'items-center'}
      `}
      style={{
        padding: '32px',
        gap: '56px',
      }}
    >
      {/* Seção superior */}
      <div className={`flex flex-col ${isExpanded ? '' : 'items-center'}`} style={{ gap: '56px' }}>
        <SidebarLogo isExpanded={isExpanded} />

        <nav className="flex flex-col" style={{ gap: '12px' }}>
          <SidebarItem to={ROUTES.DASHBOARD} icon={<RiHome4Line />} label={ROUTE_NAMES[ROUTES.DASHBOARD]} isExpanded={isExpanded} />
          <SidebarItem to={ROUTES.CARDS} icon={<RiIdCardLine />} label={ROUTE_NAMES[ROUTES.CARDS]} isExpanded={isExpanded} />
          <SidebarItem to={ROUTES.TRANSACTIONS} icon={<RiFileListLine />} label={ROUTE_NAMES[ROUTES.TRANSACTIONS]} isExpanded={isExpanded} />
          <SidebarItem to={ROUTES.PROFILE} icon={<RiUserLine />} label={ROUTE_NAMES[ROUTES.PROFILE]} isExpanded={isExpanded} />
        </nav>
      </div>

      {/* Seção inferior */}
      <div className="mt-auto flex flex-col gap-3">
        <SidebarUser isExpanded={isExpanded} />
      </div>

      <motion.button
        onClick={toggle}
        animate={{
          x: isExpanded ? 288 : 68,
        }}
        transition={{
          duration: 0.3,
          ease: 'easeInOut',
        }}
        className="
          absolute top-[35px] left-0
          rounded-full
          bg-surface
          flex items-center justify-center
          hover:opacity-80
          transition-opacity duration-200
          z-50
        "
        style={{
          width: '24px',
          height: '24px',
          padding: '4px',
          boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
        }}
        aria-label={isExpanded ? 'Colapsar sidebar' : 'Expandir sidebar'}
      >
        <motion.img
          src={angleRightIcon}
          alt="Toggle sidebar"
          className="w-4 h-4"
          style={{ 
            transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s ease-in-out',
          }}
        />
      </motion.button>
    </motion.aside>
  )
}
