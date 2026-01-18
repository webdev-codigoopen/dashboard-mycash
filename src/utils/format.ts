/**
 * Utilitários de formatação
 */

/**
 * Formata valor numérico como moeda brasileira (R$)
 * Exemplo: 1234.56 -> "R$ 1.234,56"
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

/**
 * Formata data no formato brasileiro
 * Exemplo: new Date(2024, 0, 15) -> "15 jan, 2024"
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date)
}

/**
 * Formata intervalo de datas
 * Exemplo: "01 jan - 31 jan, 2024"
 */
export function formatDateRange(startDate: Date | null, endDate: Date | null): string {
  if (!startDate || !endDate) {
    return 'Selecionar período'
  }

  const start = formatDate(startDate)
  const end = formatDate(endDate)

  // Se for o mesmo mês/ano, simplifica
  if (
    startDate.getMonth() === endDate.getMonth() &&
    startDate.getFullYear() === endDate.getFullYear()
  ) {
    return `${startDate.getDate().toString().padStart(2, '0')} ${start.slice(3)} - ${endDate.getDate().toString().padStart(2, '0')} ${end.slice(3)}`
  }

  return `${start} - ${end}`
}
