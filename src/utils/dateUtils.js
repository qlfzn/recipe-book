export function formatPlannedDate(dateString) {
  const date = new Date(dateString + 'T00:00:00')
  const options = { weekday: 'short', month: 'short', day: 'numeric' }
  return date.toLocaleDateString('en-US', options)
}

export function formatPlannedDateFull(dateString) {
  const date = new Date(dateString + 'T00:00:00')
  const options = { weekday: 'short', month: 'short', day: 'numeric' }
  return date.toLocaleDateString('en-US', options)
}

export function isDateToday(dateString) {
  const today = new Date().toISOString().split('T')[0]
  return dateString === today
}

export function isDateUpcoming(dateString) {
  const today = new Date().toISOString().split('T')[0]
  return dateString >= today
}

export function isDatePast(dateString) {
  const today = new Date().toISOString().split('T')[0]
  return dateString < today
}

export function getTodayDate() {
  return new Date().toISOString().split('T')[0]
}
