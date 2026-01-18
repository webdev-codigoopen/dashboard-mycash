import BalanceCard from '@/components/dashboard/BalanceCard'
import IncomeCard from '@/components/dashboard/IncomeCard'
import ExpenseCard from '@/components/dashboard/ExpenseCard'
import DashboardHeader from '@/components/dashboard/DashboardHeader'
import ExpensesByCategoryCarousel from '@/components/dashboard/ExpensesByCategoryCarousel'
import FinancialFlowChart from '@/components/dashboard/FinancialFlowChart'

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

        {/* Carrossel de Gastos por Categoria */}
        <div className="mb-8">
          <h2 className="text-heading-sm font-bold text-secondary-dark mb-4">
            Gastos por Categoria
          </h2>
          <ExpensesByCategoryCarousel />
        </div>

        {/* Gráfico de Fluxo Financeiro */}
        <div className="mb-8">
          <FinancialFlowChart />
        </div>
      </div>
    </div>
  )
}
