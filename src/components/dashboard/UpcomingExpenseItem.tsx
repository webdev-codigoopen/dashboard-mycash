import { Transaction } from '@/types'
import { useFinance } from '@/contexts/FinanceContext'
import { formatCurrency } from '@/utils/format'
import { formatDate } from '@/utils/format'

interface UpcomingExpenseItemProps {
  transaction: Transaction
}

/**
 * UpcomingExpenseItem - Item individual de despesa futura
 * Mostra descrição, data, conta/cartão, valor e botão de check
 */
export default function UpcomingExpenseItem({ transaction }: UpcomingExpenseItemProps) {
  const { creditCards, bankAccounts, updateTransaction } = useFinance()

  // Encontra a conta ou cartão
  const account = bankAccounts.find((a) => a.id === transaction.accountId)
  const card = creditCards.find((c) => c.id === transaction.accountId)
  const accountName = account?.name || card?.name || 'Conta não encontrada'

  // Data de vencimento (usa dueDate se disponível, senão usa date)
  const dueDate = transaction.dueDate || transaction.date

  // Formata data
  const formattedDate = formatDate(dueDate)

  // Verifica se está vencida
  const isOverdue = dueDate < new Date() && !transaction.isPaid

  const handleTogglePaid = () => {
    updateTransaction(transaction.id, {
      isPaid: !transaction.isPaid,
      status: !transaction.isPaid ? 'completed' : 'pending',
    })
  }

  return (
    <div
      className={`
        flex
        items-center
        gap-4
        p-4
        rounded-md
        border
        border-neutral-300
        transition-colors
        duration-200
        ${isOverdue ? 'bg-red-50 border-red-200' : 'bg-surface'}
        ${transaction.isPaid ? 'opacity-60' : ''}
      `}
    >
      {/* Botão de check */}
      <button
        onClick={handleTogglePaid}
        className={`
          w-6
          h-6
          rounded-md
          border-2
          flex
          items-center
          justify-center
          flex-shrink-0
          transition-colors
          duration-200
          ${
            transaction.isPaid
              ? 'bg-green-600 border-green-600'
              : 'border-neutral-300 hover:border-green-600'
          }
        `}
        aria-label={transaction.isPaid ? 'Marcar como não paga' : 'Marcar como paga'}
      >
        {transaction.isPaid && (
          <svg
            width="14"
            height="14"
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
        )}
      </button>

      {/* Informações */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3
            className={`
              text-label-sm
              font-semibold
              truncate
              ${transaction.isPaid ? 'line-through text-neutral-500' : 'text-secondary-dark'}
            `}
          >
            {transaction.description}
          </h3>
          {transaction.isRecurring && (
            <span className="text-label-xs bg-primary/20 text-secondary-dark px-2 py-0.5 rounded-full">
              Recorrente
            </span>
          )}
          {transaction.installments && transaction.installments > 1 && (
            <span className="text-label-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
              {transaction.currentInstallment}/{transaction.installments}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3 text-label-xs text-neutral-500">
          <span className={isOverdue ? 'text-red-600 font-semibold' : ''}>{formattedDate}</span>
          <span>•</span>
          <span className="truncate">{accountName}</span>
        </div>
      </div>

      {/* Valor */}
      <div className="flex-shrink-0">
        <span
          className={`
            text-label-sm
            font-bold
            ${transaction.isPaid ? 'text-neutral-500' : 'text-secondary-dark'}
          `}
        >
          {formatCurrency(transaction.amount)}
        </span>
      </div>
    </div>
  )
}
