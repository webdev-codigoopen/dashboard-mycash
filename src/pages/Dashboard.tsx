import BalanceCard from '@/components/dashboard/BalanceCard'
import IncomeCard from '@/components/dashboard/IncomeCard'
import ExpenseCard from '@/components/dashboard/ExpenseCard'
import DashboardHeader from '@/components/dashboard/DashboardHeader'
import ExpensesByCategoryCarousel from '@/components/dashboard/ExpensesByCategoryCarousel'
import FinancialFlowChart from '@/components/dashboard/FinancialFlowChart'
import CreditCardsWidget from '@/components/dashboard/CreditCardsWidget'
import UpcomingExpensesWidget from '@/components/dashboard/UpcomingExpensesWidget'

/**
 * Página principal - Dashboard
 * Exibe visão geral das finanças da família
 */
export default function Dashboard() {
  return (
    <div className="w-full min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-[1400px] mx-auto lg:max-w-[1600px]">
        <h1 className="text-heading-md mb-8">Dashboard</h1>

        {/* Header com controles */}
        <DashboardHeader />

        {/* Cards de Resumo Financeiro */}
        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-3
            gap-4
            md:gap-6
            mb-8
          "
        >
          {/* BalanceCard - pode ser um pouco maior no desktop */}
          <div className="md:col-span-1">
            <BalanceCard />
          </div>

          {/* IncomeCard */}
          <div className="md:col-span-1">
            <IncomeCard />
          </div>

          {/* ExpenseCard */}
          <div className="md:col-span-1">
            <ExpenseCard />
          </div>
        </div>

        {/* Grid: Carrossel e Widget de Cartões */}
        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-2
            gap-6
            mb-8
          "
        >
          {/* Carrossel de Gastos por Categoria */}
          <div>
            <h2 className="text-heading-sm font-bold text-secondary-dark mb-4">
              Gastos por Categoria
            </h2>
            <ExpensesByCategoryCarousel />
          </div>

          {/* Widget de Cartões de Crédito */}
          <div>
            <CreditCardsWidget />
          </div>
        </div>

        {/* Grid: Gráfico e Próximas Despesas */}
        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-2
            gap-6
            mb-8
          "
        >
          {/* Gráfico de Fluxo Financeiro */}
          <div>
            <FinancialFlowChart />
          </div>

          {/* Widget de Próximas Despesas */}
          <div>
            <UpcomingExpensesWidget />
          </div>
        </div>
      </div>
    </div>
  )
}
