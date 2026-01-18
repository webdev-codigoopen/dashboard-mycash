import { Link, useLocation } from 'react-router-dom'
import { ReactNode } from 'react'

interface SidebarItemProps {
  to: string
  icon: ReactNode
  label: string
  isExpanded: boolean
}

export default function SidebarItem({ to, icon, label, isExpanded }: SidebarItemProps) {
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
      <div className="flex-shrink-0 text-lg">{icon}</div>

      {isExpanded && (
        <span className="text-label-lg font-semibold whitespace-nowrap overflow-hidden">{label}</span>
      )}
    </Link>
  )
}
