import { createContext, useContext, useState, ReactNode, useMemo } from 'react'
import {
  Transaction,
  Goal,
  CreditCard,
  BankAccount,
  FamilyMember,
  GlobalFilters,
} from '@/types'
import { INCOME_CATEGORIES, EXPENSE_CATEGORIES } from '@/constants'

/**
 * Interface do contexto financeiro
 */
interface FinanceContextType {
  // Arrays principais
  transactions: Transaction[]
  goals: Goal[]
  creditCards: CreditCard[]
  bankAccounts: BankAccount[]
  familyMembers: FamilyMember[]

  // Filtros globais
  filters: GlobalFilters
  setFilters: (filters: GlobalFilters | ((prev: GlobalFilters) => GlobalFilters)) => void

  // CRUD Transactions
  addTransaction: (transaction: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateTransaction: (id: string, updates: Partial<Transaction>) => void
  deleteTransaction: (id: string) => void

  // CRUD Goals
  addGoal: (goal: Omit<Goal, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateGoal: (id: string, updates: Partial<Goal>) => void
  deleteGoal: (id: string) => void

  // CRUD CreditCards
  addCreditCard: (card: Omit<CreditCard, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateCreditCard: (id: string, updates: Partial<CreditCard>) => void
  deleteCreditCard: (id: string) => void

  // CRUD BankAccounts
  addBankAccount: (account: Omit<BankAccount, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateBankAccount: (id: string, updates: Partial<BankAccount>) => void
  deleteBankAccount: (id: string) => void

  // CRUD FamilyMembers
  addFamilyMember: (member: Omit<FamilyMember, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateFamilyMember: (id: string, updates: Partial<FamilyMember>) => void
  deleteFamilyMember: (id: string) => void

  // Funções de cálculo derivadas
  getFilteredTransactions: () => Transaction[]
  calculateTotalBalance: () => number
  calculateIncomeForPeriod: () => number
  calculateExpensesForPeriod: () => number
  calculateExpensesByCategory: () => Array<{ category: string; amount: number; count: number }>
  calculateCategoryPercentage: (category: string) => number
  calculateSavingsRate: () => number
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined)

/**
 * Gera um ID único simples
 */
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Dados mock iniciais
 */
function createMockData() {
  const now = new Date()
  const threeMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 3, 1)

  // Membros da família
  const members: FamilyMember[] = [
    {
      id: 'member-1',
      name: 'Lucas Marte',
      role: 'Pai',
      email: 'lucas.marte@email.com',
      monthlyIncome: 8500,
      isPrimary: true,
      createdAt: new Date(2024, 0, 1),
      updatedAt: new Date(2024, 0, 1),
    },
    {
      id: 'member-2',
      name: 'Ana Marte',
      role: 'Mãe',
      email: 'ana.marte@email.com',
      monthlyIncome: 6200,
      createdAt: new Date(2024, 0, 1),
      updatedAt: new Date(2024, 0, 1),
    },
    {
      id: 'member-3',
      name: 'Pedro Marte',
      role: 'Filho',
      monthlyIncome: 0,
      createdAt: new Date(2024, 0, 1),
      updatedAt: new Date(2024, 0, 1),
    },
  ]

  // Contas bancárias
  const accounts: BankAccount[] = [
    {
      id: 'account-1',
      name: 'Conta Corrente Nubank',
      holderId: 'member-1',
      balance: 12500.0,
      bankName: 'Nubank',
      accountNumber: '0001',
      createdAt: new Date(2024, 0, 1),
      updatedAt: new Date(2024, 0, 1),
    },
    {
      id: 'account-2',
      name: 'Conta Corrente Inter',
      holderId: 'member-2',
      balance: 8500.0,
      bankName: 'Inter',
      accountNumber: '0002',
      createdAt: new Date(2024, 0, 1),
      updatedAt: new Date(2024, 0, 1),
    },
    {
      id: 'account-3',
      name: 'Conta Poupança',
      holderId: 'member-1',
      balance: 25000.0,
      bankName: 'Banco do Brasil',
      accountNumber: '0003',
      createdAt: new Date(2024, 0, 1),
      updatedAt: new Date(2024, 0, 1),
    },
  ]

  // Cartões de crédito
  const cards: CreditCard[] = [
    {
      id: 'card-1',
      name: 'Nubank',
      holderId: 'member-1',
      closingDay: 10,
      dueDay: 18,
      limit: 15000,
      currentBill: 3200.5,
      theme: 'black',
      lastDigits: '1234',
      createdAt: new Date(2024, 0, 1),
      updatedAt: new Date(2024, 0, 1),
    },
    {
      id: 'card-2',
      name: 'Inter',
      holderId: 'member-2',
      closingDay: 5,
      dueDay: 12,
      limit: 8000,
      currentBill: 1850.0,
      theme: 'lime',
      lastDigits: '5678',
      createdAt: new Date(2024, 0, 1),
      updatedAt: new Date(2024, 0, 1),
    },
    {
      id: 'card-3',
      name: 'PicPay',
      holderId: 'member-1',
      closingDay: 15,
      dueDay: 25,
      limit: 5000,
      currentBill: 450.0,
      theme: 'white',
      lastDigits: '9012',
      createdAt: new Date(2024, 0, 1),
      updatedAt: new Date(2024, 0, 1),
    },
  ]

  // Objetivos
  const goals: Goal[] = [
    {
      id: 'goal-1',
      title: 'Viagem para Europa',
      description: 'Economizar para viagem de 15 dias',
      targetAmount: 30000,
      currentAmount: 12500,
      deadline: new Date(2025, 5, 1),
      memberId: null,
      category: 'Lazer',
      isCompleted: false,
      createdAt: new Date(2024, 0, 1),
      updatedAt: new Date(2024, 0, 1),
    },
    {
      id: 'goal-2',
      title: 'Reserva de Emergência',
      description: '6 meses de despesas',
      targetAmount: 50000,
      currentAmount: 25000,
      deadline: new Date(2025, 11, 31),
      memberId: null,
      category: 'Outros',
      isCompleted: false,
      createdAt: new Date(2024, 0, 1),
      updatedAt: new Date(2024, 0, 1),
    },
    {
      id: 'goal-3',
      title: 'Notebook Novo',
      description: 'MacBook Pro para trabalho',
      targetAmount: 12000,
      currentAmount: 3500,
      deadline: new Date(2024, 11, 31),
      memberId: 'member-1',
      category: 'Educação',
      isCompleted: false,
      createdAt: new Date(2024, 0, 1),
      updatedAt: new Date(2024, 0, 1),
    },
    {
      id: 'goal-4',
      title: 'Curso de Inglês',
      description: 'Curso online para Pedro',
      targetAmount: 2400,
      currentAmount: 800,
      deadline: new Date(2024, 8, 1),
      memberId: 'member-3',
      category: 'Educação',
      isCompleted: false,
      createdAt: new Date(2024, 0, 1),
      updatedAt: new Date(2024, 0, 1),
    },
  ]

  // Transações (20-30 transações distribuídas nos últimos 3 meses)
  const transactions: Transaction[] = []

  // Função auxiliar para gerar data aleatória nos últimos 3 meses
  const randomDate = (start: Date, end: Date): Date => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
  }

  // Receitas
  const incomeAmounts = [8500, 6200, 1200, 800, 500, 300]
  const incomeCategories = INCOME_CATEGORIES
  incomeAmounts.forEach((amount, index) => {
    transactions.push({
      id: `transaction-income-${index + 1}`,
      type: 'income',
      amount,
      description: `Receita ${incomeCategories[index % incomeCategories.length]}`,
      category: incomeCategories[index % incomeCategories.length],
      date: randomDate(threeMonthsAgo, now),
      accountId: accounts[index % accounts.length].id,
      memberId: members[index % members.length].id,
      status: 'completed',
      isPaid: true,
      isRecurring: index < 2, // Primeiras duas são recorrentes (salários)
      createdAt: randomDate(threeMonthsAgo, now),
      updatedAt: randomDate(threeMonthsAgo, now),
    })
  })

  // Despesas
  const expenseAmounts = [
    2500, 1200, 800, 600, 450, 350, 280, 220, 180, 150, 120, 100, 80, 60, 50, 40, 30, 25, 20, 15,
  ]
  const expenseCategories = EXPENSE_CATEGORIES
  expenseAmounts.forEach((amount, index) => {
    const date = randomDate(threeMonthsAgo, now)
    const isRecurring = index < 5 // Primeiras 5 são recorrentes
    const installments = index % 3 === 0 && index > 5 ? 3 : 1
    const currentInstallment = installments > 1 ? (index % installments) + 1 : undefined

    transactions.push({
      id: `transaction-expense-${index + 1}`,
      type: 'expense',
      amount,
      description: `Despesa ${expenseCategories[index % expenseCategories.length]}`,
      category: expenseCategories[index % expenseCategories.length],
      date,
      accountId: index % 2 === 0 ? cards[index % cards.length].id : accounts[index % accounts.length].id,
      memberId: members[index % members.length].id,
      installments: installments > 1 ? installments : undefined,
      currentInstallment,
      status: index % 3 === 0 ? 'pending' : 'completed',
      isPaid: index % 3 !== 0,
      isRecurring,
      dueDate: isRecurring ? new Date(date.getTime() + 30 * 24 * 60 * 60 * 1000) : undefined,
      createdAt: date,
      updatedAt: date,
    })
  })

  return { members, accounts, cards, goals, transactions }
}

interface FinanceProviderProps {
  children: ReactNode
}

/**
 * FinanceProvider - Gerencia todo o estado global da aplicação
 * ⚠️ IMPORTANTE: NÃO usa localStorage/sessionStorage, apenas React state
 */
export function FinanceProvider({ children }: FinanceProviderProps) {
  const mockData = useMemo(() => createMockData(), [])

  // Estados principais
  const [transactions, setTransactions] = useState<Transaction[]>(mockData.transactions)
  const [goals, setGoals] = useState<Goal[]>(mockData.goals)
  const [creditCards, setCreditCards] = useState<CreditCard[]>(mockData.cards)
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>(mockData.accounts)
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>(mockData.members)

  // Filtros globais
  const [filters, setFilters] = useState<GlobalFilters>({
    selectedMember: null,
    dateRange: {
      startDate: null,
      endDate: null,
    },
    transactionType: 'all',
    searchText: '',
  })

  // ========== CRUD Transactions ==========
  const addTransaction = (
    transaction: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>
  ) => {
    const now = new Date()
    const newTransaction: Transaction = {
      ...transaction,
      id: generateId(),
      createdAt: now,
      updatedAt: now,
    }
    setTransactions((prev) => [...prev, newTransaction])
  }

  const updateTransaction = (id: string, updates: Partial<Transaction>) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates, updatedAt: new Date() } : t))
    )
  }

  const deleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id))
  }

  // ========== CRUD Goals ==========
  const addGoal = (goal: Omit<Goal, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date()
    const newGoal: Goal = {
      ...goal,
      id: generateId(),
      createdAt: now,
      updatedAt: now,
    }
    setGoals((prev) => [...prev, newGoal])
  }

  const updateGoal = (id: string, updates: Partial<Goal>) => {
    setGoals((prev) =>
      prev.map((g) => (g.id === id ? { ...g, ...updates, updatedAt: new Date() } : g))
    )
  }

  const deleteGoal = (id: string) => {
    setGoals((prev) => prev.filter((g) => g.id !== id))
  }

  // ========== CRUD CreditCards ==========
  const addCreditCard = (card: Omit<CreditCard, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date()
    const newCard: CreditCard = {
      ...card,
      id: generateId(),
      createdAt: now,
      updatedAt: now,
    }
    setCreditCards((prev) => [...prev, newCard])
  }

  const updateCreditCard = (id: string, updates: Partial<CreditCard>) => {
    setCreditCards((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updates, updatedAt: new Date() } : c))
    )
  }

  const deleteCreditCard = (id: string) => {
    setCreditCards((prev) => prev.filter((c) => c.id !== id))
  }

  // ========== CRUD BankAccounts ==========
  const addBankAccount = (account: Omit<BankAccount, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date()
    const newAccount: BankAccount = {
      ...account,
      id: generateId(),
      createdAt: now,
      updatedAt: now,
    }
    setBankAccounts((prev) => [...prev, newAccount])
  }

  const updateBankAccount = (id: string, updates: Partial<BankAccount>) => {
    setBankAccounts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...updates, updatedAt: new Date() } : a))
    )
  }

  const deleteBankAccount = (id: string) => {
    setBankAccounts((prev) => prev.filter((a) => a.id !== id))
  }

  // ========== CRUD FamilyMembers ==========
  const addFamilyMember = (member: Omit<FamilyMember, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date()
    const newMember: FamilyMember = {
      ...member,
      id: generateId(),
      createdAt: now,
      updatedAt: now,
    }
    setFamilyMembers((prev) => [...prev, newMember])
  }

  const updateFamilyMember = (id: string, updates: Partial<FamilyMember>) => {
    setFamilyMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...updates, updatedAt: new Date() } : m))
    )
  }

  const deleteFamilyMember = (id: string) => {
    setFamilyMembers((prev) => prev.filter((m) => m.id !== id))
  }

  // ========== Funções de Cálculo Derivadas ==========

  /**
   * Retorna transações filtradas aplicando todos os filtros ativos
   */
  const getFilteredTransactions = (): Transaction[] => {
    let filtered = [...transactions]

    // Filtro por tipo
    if (filters.transactionType !== 'all') {
      filtered = filtered.filter((t) => t.type === filters.transactionType)
    }

    // Filtro por membro
    if (filters.selectedMember) {
      filtered = filtered.filter((t) => t.memberId === filters.selectedMember)
    }

    // Filtro por período
    if (filters.dateRange.startDate) {
      filtered = filtered.filter((t) => t.date >= filters.dateRange.startDate!)
    }
    if (filters.dateRange.endDate) {
      const endDate = new Date(filters.dateRange.endDate)
      endDate.setHours(23, 59, 59, 999) // Inclui o dia inteiro
      filtered = filtered.filter((t) => t.date <= endDate)
    }

    // Filtro por busca textual
    if (filters.searchText.trim()) {
      const searchLower = filters.searchText.toLowerCase()
      filtered = filtered.filter(
        (t) =>
          t.description.toLowerCase().includes(searchLower) ||
          t.category.toLowerCase().includes(searchLower)
      )
    }

    return filtered
  }

  /**
   * Calcula saldo total: soma saldos de contas e subtrai faturas de cartões
   */
  const calculateTotalBalance = (): number => {
    const accountsBalance = bankAccounts.reduce((sum, account) => sum + account.balance, 0)
    const cardsDebt = creditCards.reduce((sum, card) => sum + card.currentBill, 0)
    return accountsBalance - cardsDebt
  }

  /**
   * Calcula receitas do período filtrado
   */
  const calculateIncomeForPeriod = (): number => {
    const filtered = getFilteredTransactions()
    return filtered
      .filter((t) => t.type === 'income' && t.status === 'completed')
      .reduce((sum, t) => sum + t.amount, 0)
  }

  /**
   * Calcula despesas do período filtrado
   */
  const calculateExpensesForPeriod = (): number => {
    const filtered = getFilteredTransactions()
    return filtered
      .filter((t) => t.type === 'expense' && t.status === 'completed')
      .reduce((sum, t) => sum + t.amount, 0)
  }

  /**
   * Agrupa despesas por categoria e retorna array ordenado por valor decrescente
   */
  const calculateExpensesByCategory = (): Array<{ category: string; amount: number; count: number }> => {
    const filtered = getFilteredTransactions()
    const expenses = filtered.filter((t) => t.type === 'expense' && t.status === 'completed')

    const categoryMap = new Map<string, { amount: number; count: number }>()

    expenses.forEach((t) => {
      const existing = categoryMap.get(t.category) || { amount: 0, count: 0 }
      categoryMap.set(t.category, {
        amount: existing.amount + t.amount,
        count: existing.count + 1,
      })
    })

    return Array.from(categoryMap.entries())
      .map(([category, data]) => ({ category, ...data }))
      .sort((a, b) => b.amount - a.amount)
  }

  /**
   * Calcula percentual de uma categoria em relação à receita total
   */
  const calculateCategoryPercentage = (category: string): number => {
    const totalIncome = calculateIncomeForPeriod()
    if (totalIncome === 0) return 0

    const categoryExpenses = calculateExpensesByCategory().find((c) => c.category === category)
    if (!categoryExpenses) return 0

    return (categoryExpenses.amount / totalIncome) * 100
  }

  /**
   * Calcula taxa de poupança: (receitas - despesas) / receitas × 100
   */
  const calculateSavingsRate = (): number => {
    const income = calculateIncomeForPeriod()
    const expenses = calculateExpensesForPeriod()

    if (income === 0) return 0

    return ((income - expenses) / income) * 100
  }

  const value: FinanceContextType = {
    // Arrays principais
    transactions,
    goals,
    creditCards,
    bankAccounts,
    familyMembers,

    // Filtros
    filters,
    setFilters,

    // CRUD Transactions
    addTransaction,
    updateTransaction,
    deleteTransaction,

    // CRUD Goals
    addGoal,
    updateGoal,
    deleteGoal,

    // CRUD CreditCards
    addCreditCard,
    updateCreditCard,
    deleteCreditCard,

    // CRUD BankAccounts
    addBankAccount,
    updateBankAccount,
    deleteBankAccount,

    // CRUD FamilyMembers
    addFamilyMember,
    updateFamilyMember,
    deleteFamilyMember,

    // Funções de cálculo
    getFilteredTransactions,
    calculateTotalBalance,
    calculateIncomeForPeriod,
    calculateExpensesForPeriod,
    calculateExpensesByCategory,
    calculateCategoryPercentage,
    calculateSavingsRate,
  }

  return <FinanceContext.Provider value={value}>{children}</FinanceContext.Provider>
}

/**
 * Hook customizado para acessar o contexto financeiro
 * Deve ser o único ponto de acesso ao contexto em toda a aplicação
 */
export function useFinance(): FinanceContextType {
  const context = useContext(FinanceContext)
  if (context === undefined) {
    throw new Error('useFinance must be used within a FinanceProvider')
  }
  return context
}
