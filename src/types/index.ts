/**
 * Tipos fundamentais do sistema mycash+
 * Representam as cinco entidades principais
 */

/**
 * Tipo de transação
 */
export type TransactionType = 'income' | 'expense';

/**
 * Status da transação
 */
export type TransactionStatus = 'pending' | 'completed' | 'cancelled';

/**
 * Tema visual do cartão de crédito
 */
export type CardTheme = 'black' | 'lime' | 'white';

/**
 * Entidade: Transaction
 * Representa uma transação financeira (receita ou despesa)
 */
export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  description: string;
  category: string;
  date: Date;
  accountId: string; // ID da conta bancária ou cartão de crédito
  memberId: string | null; // ID do membro responsável, null se for geral
  installments?: number; // Número de parcelas (opcional, padrão 1)
  currentInstallment?: number; // Parcela atual (opcional)
  status: TransactionStatus;
  isPaid: boolean; // Se a despesa foi paga
  isRecurring: boolean; // Se é uma despesa recorrente
  dueDate?: Date; // Data de vencimento (para despesas futuras)
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Entidade: Goal
 * Representa um objetivo financeiro
 */
export interface Goal {
  id: string;
  title: string;
  description?: string;
  targetAmount: number;
  currentAmount: number;
  deadline: Date;
  memberId: string | null; // ID do membro responsável, null se for familiar
  category?: string;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Entidade: CreditCard
 * Representa um cartão de crédito
 */
export interface CreditCard {
  id: string;
  name: string;
  holderId: string; // ID do membro titular
  closingDay: number; // Dia de fechamento (1-31)
  dueDay: number; // Dia de vencimento (1-31)
  limit: number; // Limite total do cartão
  currentBill: number; // Fatura atual
  theme: CardTheme; // Tema visual: black, lime ou white
  lastDigits?: string; // Últimos 4 dígitos (opcional)
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Entidade: BankAccount
 * Representa uma conta bancária
 */
export interface BankAccount {
  id: string;
  name: string;
  holderId: string; // ID do membro titular
  balance: number; // Saldo atual
  bankName?: string; // Nome do banco (opcional)
  accountNumber?: string; // Número da conta (opcional)
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Entidade: FamilyMember
 * Representa um membro da família
 */
export interface FamilyMember {
  id: string;
  name: string;
  role: string; // Função na família (Pai, Mãe, Filho, etc)
  avatarUrl?: string; // URL do avatar (opcional)
  email?: string; // Email (opcional)
  monthlyIncome?: number; // Renda mensal estimada (opcional)
  isPrimary?: boolean; // Se é o usuário principal (opcional)
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Filtros globais do sistema
 */
export interface GlobalFilters {
  selectedMember: string | null;
  dateRange: {
    startDate: Date | null;
    endDate: Date | null;
  };
  transactionType: 'all' | 'income' | 'expense';
  searchText: string;
}
