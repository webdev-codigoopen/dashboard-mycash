import { ReactNode } from 'react'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useSidebar } from '@/hooks/useSidebar'
import Sidebar from './Sidebar/Sidebar'
import HeaderMobile from './HeaderMobile/HeaderMobile'

interface LayoutProps {
  children: ReactNode
}

/**
 * Layout principal da aplicação
 * Gerencia a estrutura de navegação (Sidebar/HeaderMobile) e conteúdo
 * Sidebar apenas desktop (≥1280px), HeaderMobile apenas mobile/tablet (<1280px)
 */
export default function Layout({ children }: LayoutProps) {
  const isDesktop = useMediaQuery('(min-width: 1280px)')
  const { isExpanded } = useSidebar()

  // Calcula largura da sidebar para ajustar conteúdo (apenas desktop)
  const sidebarWidth = isDesktop ? (isExpanded ? 300 : 80) : 0

  return (
    <div className="min-h-screen w-full bg-background">
      {/* Sidebar - apenas desktop (≥1280px) */}
      {isDesktop && <Sidebar />}

      {/* HeaderMobile - apenas mobile/tablet (<1280px) */}
      {!isDesktop && <HeaderMobile />}

      {/* Conteúdo principal - ajusta margem quando sidebar está visível */}
      <main
        className="transition-all duration-300 ease-in-out"
        style={{
          marginLeft: `${sidebarWidth}px`,
          width: `calc(100% - ${sidebarWidth}px)`,
        }}
      >
        {children}
      </main>
    </div>
  )
}
