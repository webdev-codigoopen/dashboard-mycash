import { motion } from 'framer-motion'
import logoOpen from '@/assets/icons/logo-open.svg'
import logoClose from '@/assets/icons/logo-close.svg'

interface SidebarLogoProps {
  isExpanded: boolean
}

/**
 * Logo da Sidebar
 * Mostra a versão aberta quando expandida e só o ícone quando colapsada
 */
export default function SidebarLogo({ isExpanded }: SidebarLogoProps) {
  return (
    <div className="flex items-center">
      {isExpanded ? (
        <motion.img
          key="logo-open"
          src={logoOpen}
          alt="mycash+"
          className="h-10 w-auto"
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        />
      ) : (
        <motion.img
          key="logo-close"
          src={logoClose}
          alt="mycash+"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          style={{
            width: '45px',
            height: '43px',
          }}
        />
      )}
    </div>
  )
}
