import { useMemo } from 'react'
import { useFinance } from '@/contexts/FinanceContext'
import { formatCurrency } from '@/utils/format'
import { useCountAnimation } from '@/hooks/useCountAnimation'

/**
 * BalanceCard - Card de Saldo Total
 * Fundo preto, texto branco, círculo verde-limão desfocado no fundo
 */
export default function BalanceCard() {
  const { calculateTotalBalance, bankAccounts, creditCards } = useFinance()

  const currentBalance = calculateTotalBalance()

  // Calcula saldo de 30 dias atrás para comparação
  const previousBalance = useMemo(() => {
    // Para simplificar, vamos calcular baseado nas contas e cartões
    // Em uma implementação real, isso viria de dados históricos
    const accountsBalance = bankAccounts.reduce((sum, account) => sum + account.balance, 0)
    const cardsDebt = creditCards.reduce((sum, card) => sum + card.currentBill, 0)
    // Simula um saldo 12% menor (crescimento de 12%)
    return (accountsBalance - cardsDebt) * 0.88
  }, [bankAccounts, creditCards])

  // Calcula crescimento percentual
  const growthPercentage = useMemo(() => {
    if (previousBalance === 0) return 0
    return ((currentBalance - previousBalance) / previousBalance) * 100
  }, [currentBalance, previousBalance])

  // Anima o valor
  const animatedValue = useCountAnimation(currentBalance, 800)

  return (
    <div
      className="
        relative
        bg-secondary-dark
        rounded-md
        p-6
        overflow-hidden
        flex flex-col
        justify-between
      "
      style={{
        minHeight: '180px',
      }}
    >
      {/* Círculo decorativo desfocado no fundo */}
      <div
        className="
          absolute
          -right-16
          -top-16
          w-48
          h-48
          rounded-full
          bg-primary
          opacity-20
          blur-3xl
        "
        style={{
          filter: 'blur(60px)',
        }}
      />

      {/* Conteúdo */}
      <div className="relative z-10 flex flex-col gap-4">
        {/* Label */}
        <span className="text-label-sm text-neutral-300">Saldo Total</span>

        {/* Valor */}
        <div className="text-heading-lg font-bold text-surface">
          {formatCurrency(animatedValue)}
        </div>

        {/* Badge de crescimento */}
        {growthPercentage > 0 && (
          <div
            className="
              inline-flex
              items-center
              gap-2
              px-3
              py-1.5
              rounded-full
              bg-surface/20
              backdrop-blur-sm
              w-fit
            "
          >
            {/* Ícone de gráfico crescente */}
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-primary"
            >
              <path
                d="M2 12L6 8L9 11L14 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M11 6H14V9"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-label-sm text-surface font-semibold">
              +{growthPercentage.toFixed(0)}% esse mês
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
