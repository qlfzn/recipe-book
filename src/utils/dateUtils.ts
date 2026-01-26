export function formatPlannedDate(dateString: string): string {
  const date = new Date(dateString + 'T00:00:00')
  const options: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'short', day: 'numeric' }
  return date.toLocaleDateString('en-US', options)
}

export function formatPlannedDateFull(dateString: string): string {
  const date = new Date(dateString + 'T00:00:00')
  const options: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'short', day: 'numeric' }
  return date.toLocaleDateString('en-US', options)
}

export function isDateToday(dateString: string): boolean {
  const today = new Date().toISOString().split('T')[0]
  return dateString === today
}

export function isDateUpcoming(dateString: string): boolean {
  const today = new Date().toISOString().split('T')[0]
  return dateString >= today
}

export function isDatePast(dateString: string): boolean {
  const today = new Date().toISOString().split('T')[0]
  return dateString < today
}

export function getTodayDate(): string {
  return new Date().toISOString().split('T')[0]
}
