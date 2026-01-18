import { motion, AnimatePresence } from 'framer-motion'

interface SidebarUserProps {
  isExpanded: boolean
  name?: string
  email?: string
  avatarUrl?: string
}

/**
 * Componente de informações do usuário na Sidebar
 * Mostra avatar + nome + email quando expandida
 * Apenas avatar quando colapsada
 */
export default function SidebarUser({
  isExpanded,
  name = 'Lucas Marte',
  email = 'lucasmarte@gmail.com',
  avatarUrl,
}: SidebarUserProps) {
  return (
    <div className={`flex items-center ${isExpanded ? 'gap-3' : 'justify-center'}`}>
      {/* Avatar - sempre visível */}
      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-neutral-300 overflow-hidden">
        {avatarUrl ? (
          <img src={avatarUrl} alt={name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-neutral-400 flex items-center justify-center">
            <span className="text-label-xs text-neutral-1100 font-semibold">
              {name.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
      </div>

      {/* Informações - apenas quando expandida */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 'auto' }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden flex flex-col gap-1"
          >
            <span className="text-label-md font-semibold text-neutral-1100 whitespace-nowrap">
              {name}
            </span>
            <span className="text-paragraph-sm text-neutral-500 whitespace-nowrap">
              {email}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
