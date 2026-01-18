import { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

/**
 * Layout principal da aplicação
 * Gerencia a estrutura de navegação (Sidebar/HeaderMobile) e conteúdo
 */
export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen w-full bg-background">
      {/* TODO: Implementar Sidebar (desktop ≥1280px) */}
      {/* TODO: Implementar HeaderMobile (mobile/tablet <1280px) */}
      
      <main className="w-full">
        {children}
      </main>
    </div>
  )
}
