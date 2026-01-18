import { useFinance } from '@/contexts/FinanceContext'
import { motion } from 'framer-motion'

/**
 * MembersWidget - Widget de membros da família
 * Avatares sobrepostos, seleção com borda preta e check verde
 */
export default function MembersWidget() {
  const { familyMembers, filters, setFilters } = useFinance()

  const handleMemberClick = (memberId: string | null) => {
    setFilters((prev) => ({
      ...prev,
      selectedMember: prev.selectedMember === memberId ? null : memberId,
    }))
  }

  const handleAddMember = () => {
    // TODO: Abrir modal de adicionar membro (PROMPT 13)
    console.log('Abrir modal de adicionar membro')
  }

  return (
    <div className="flex items-center gap-2">
      {/* Avatares dos membros */}
      <div className="flex items-center -space-x-2">
        {familyMembers.map((member, index) => {
          const isSelected = filters.selectedMember === member.id

          return (
            <motion.button
              key={member.id}
              onClick={() => handleMemberClick(member.id)}
              whileHover={{ scale: 1.1, zIndex: 10 }}
              className={`
                relative
                w-10
                h-10
                rounded-full
                border-2
                overflow-hidden
                transition-all
                duration-200
                ${
                  isSelected
                    ? 'border-secondary-dark border-[3px]'
                    : 'border-surface'
                }
              `}
              style={{ zIndex: isSelected ? 10 : familyMembers.length - index }}
            >
              {member.avatarUrl ? (
                <img
                  src={member.avatarUrl}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-neutral-300 flex items-center justify-center">
                  <span className="text-label-sm text-neutral-1100 font-semibold">
                    {member.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}

              {/* Check verde quando selecionado */}
              {isSelected && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-600 rounded-full border-2 border-surface flex items-center justify-center">
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-surface"
                  >
                    <path
                      d="M13 4L6 11L3 8"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
            </motion.button>
          )
        })}
      </div>

      {/* Botão adicionar membro */}
      <button
        onClick={handleAddMember}
        className="
          w-10
          h-10
          rounded-full
          bg-neutral-100
          border-2
          border-dashed
          border-neutral-300
          flex
          items-center
          justify-center
          hover:bg-neutral-200
          transition-colors
          duration-200
          touch-manipulation
        "
        aria-label="Adicionar membro"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-secondary-dark"
        >
          <path
            d="M8 4V12M4 8H12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  )
}
