import { useState } from 'react'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import MenuDropdown from './MenuDropdown'
import logoOpen from '@/assets/icons/logo-open.svg'

interface HeaderMobileProps {
  userName?: string
  userEmail?: string
  avatarUrl?: string
}

/**
 * HeaderMobile para mobile/tablet
 * Renderiza apenas em viewports < 1280px
 * Substitui completamente a Sidebar
 */
export default function HeaderMobile({
  userName = 'Lucas Marte',
  avatarUrl,
}: HeaderMobileProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isMobile = useMediaQuery('(max-width: 1279px)')

  // Não renderiza em desktop
  if (!isMobile) {
    return null
  }

  const handleAvatarClick = () => {
    setIsMenuOpen(true)
  }

  const handleCloseMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <>
      <header
        className="
          fixed top-0 left-0 right-0
          h-16
          bg-surface border-b border-neutral-300
          flex items-center justify-between
          px-4
          z-30
        "
      >
        {/* Logo à esquerda */}
        <div className="flex items-center gap-2">
          <img src={logoOpen} alt="mycash+" className="h-10 w-auto" />
        </div>

        {/* Avatar à direita */}
        <button
          onClick={handleAvatarClick}
          className="
            flex-shrink-0 w-10 h-10 rounded-full
            bg-neutral-300 overflow-hidden
            border-2 border-transparent
            hover:border-primary
            transition-all duration-200
            touch-manipulation
          "
          aria-label="Abrir menu"
        >
          {avatarUrl ? (
            <img src={avatarUrl} alt={userName} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-neutral-400 flex items-center justify-center">
              <span className="text-label-sm text-neutral-1100 font-semibold">
                {userName.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </button>
      </header>

      {/* Menu Dropdown */}
      <MenuDropdown isOpen={isMenuOpen} onClose={handleCloseMenu} />

      {/* Espaçador para compensar header fixo */}
      <div className="h-16" />
    </>
  )
}
