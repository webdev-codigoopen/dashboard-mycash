/**
 * Constantes do sistema mycash+
 */

/**
 * Categorias padrão de receitas
 */
export const INCOME_CATEGORIES = [
  'Salário',
  'Freelance',
  'Investimentos',
  'Aluguel Recebido',
  'Outros',
] as const;

/**
 * Categorias padrão de despesas
 */
export const EXPENSE_CATEGORIES = [
  'Aluguel',
  'Alimentação',
  'Mercado',
  'Academia',
  'Transporte',
  'Saúde',
  'Educação',
  'Lazer',
  'Contas',
  'Outros',
] as const;

/**
 * Rotas principais do sistema
 */
export const ROUTES = {
  DASHBOARD: '/',
  CARDS: '/cards',
  TRANSACTIONS: '/transactions',
  PROFILE: '/profile',
} as const;

/**
 * Nomes das rotas para navegação
 */
export const ROUTE_NAMES = {
  [ROUTES.DASHBOARD]: 'Dashboard',
  [ROUTES.CARDS]: 'Cartões',
  [ROUTES.TRANSACTIONS]: 'Transações',
  [ROUTES.PROFILE]: 'Perfil',
} as const;

/**
 * Breakpoints do sistema (em pixels)
 */
export const BREAKPOINTS = {
  MOBILE: 768,
  TABLET: 1280,
  DESKTOP: 1920,
} as const;

/**
 * Configurações de paginação
 */
export const PAGINATION = {
  DASHBOARD_TABLE: 5,
  TRANSACTIONS_TABLE: 10,
  CARDS_PER_PAGE: 3,
} as const;
