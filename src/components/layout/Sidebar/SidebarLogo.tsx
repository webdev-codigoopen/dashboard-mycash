import { motion } from 'framer-motion'

interface SidebarLogoProps {
  isExpanded: boolean
}

/**
 * Logo da Sidebar
 * Mostra texto completo quando expandida, apenas ícone quando colapsada
 */
export default function SidebarLogo({ isExpanded }: SidebarLogoProps) {
  return (
    <div className="flex items-center">
      {isExpanded ? (
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: 'auto' }}
          exit={{ opacity: 0, width: 0 }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden"
        >
          <span className="text-heading-sm font-bold text-secondary-dark whitespace-nowrap">
            mycash+
          </span>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="w-8 h-8 rounded-full bg-primary flex items-center justify-center"
        >
          <span className="text-label-sm font-bold text-secondary-dark">m</span>
        </motion.div>
      )}
    </div>
  )
}
