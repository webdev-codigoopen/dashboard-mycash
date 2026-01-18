import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { formatCurrency } from '@/utils/format'

/**
 * Dados mock para 7 meses
 * Estruturado para facilitar integração futura com dados reais
 */
const mockData = [
  { month: 'Jan', receitas: 14700, despesas: 8200 },
  { month: 'Fev', receitas: 15200, despesas: 9100 },
  { month: 'Mar', receitas: 16800, despesas: 10500 },
  { month: 'Abr', receitas: 14500, despesas: 8800 },
  { month: 'Mai', receitas: 16200, despesas: 9700 },
  { month: 'Jun', receitas: 17500, despesas: 11200 },
  { month: 'Jul', receitas: 15800, despesas: 9400 },
]

/**
 * Tooltip customizado
 */
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const receitas = payload.find((p: any) => p.dataKey === 'receitas')?.value || 0
    const despesas = payload.find((p: any) => p.dataKey === 'despesas')?.value || 0

    return (
      <div
        className="
          bg-surface
          border
          border-neutral-300
          rounded-md
          shadow-lg
          p-3
          flex
          flex-col
          gap-2
        "
      >
        <div className="text-label-sm font-bold text-secondary-dark">{label}</div>
        <div className="text-label-xs text-green-600 font-medium">
          Receitas: {formatCurrency(receitas)}
        </div>
        <div className="text-label-xs text-secondary-dark font-medium">
          Despesas: {formatCurrency(despesas)}
        </div>
      </div>
    )
  }
  return null
}

/**
 * FinancialFlowChart - Gráfico de fluxo financeiro
 * Card com título, legenda e gráfico de linhas
 */
export default function FinancialFlowChart() {
  return (
    <div
      className="
        bg-surface
        border
        border-neutral-300
        rounded-md
        p-6
        flex
        flex-col
        gap-6
      "
    >
      {/* Header: Título e Legenda */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        {/* Título com ícone */}
        <div className="flex items-center gap-3">
          <div
            className="
              w-10
              h-10
              rounded-full
              bg-neutral-100
              flex
              items-center
              justify-center
            "
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-secondary-dark"
            >
              {/* Ícone de gráfico crescente */}
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
          </div>
          <h2 className="text-heading-sm font-bold text-secondary-dark">Fluxo Financeiro</h2>
        </div>

        {/* Legenda */}
        <div className="flex items-center gap-6">
          {/* Receitas */}
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-label-sm text-secondary-dark">Receitas</span>
          </div>

          {/* Despesas */}
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-secondary-dark" />
            <span className="text-label-sm text-secondary-dark">Despesas</span>
          </div>
        </div>
      </div>

      {/* Gráfico */}
      <div style={{ width: '100%', height: '300px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={mockData}
            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
          >
            {/* Grid horizontal tracejado */}
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e5e7eb"
              vertical={false}
            />

            {/* Eixo X - Meses */}
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: '#9ca3af',
                fontSize: 12,
                fontFamily: 'Inter, sans-serif',
              }}
            />

            {/* Eixo Y - Valores monetários */}
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{
                fill: '#9ca3af',
                fontSize: 12,
                fontFamily: 'Inter, sans-serif',
              }}
              tickFormatter={(value) => {
                if (value >= 1000) {
                  return `R$ ${(value / 1000).toFixed(0)}k`
                }
                return `R$ ${value}`
              }}
            />

            {/* Tooltip customizado */}
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ stroke: '#d1d5db', strokeWidth: 1, strokeDasharray: '3 3' }}
            />

            {/* Linha de Receitas */}
            <Line
              type="monotone"
              dataKey="receitas"
              stroke="#D7FF00"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6, fill: '#D7FF00', strokeWidth: 2, stroke: '#FFFFFF' }}
            />

            {/* Linha de Despesas */}
            <Line
              type="monotone"
              dataKey="despesas"
              stroke="#060A11"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6, fill: '#060A11', strokeWidth: 2, stroke: '#FFFFFF' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
