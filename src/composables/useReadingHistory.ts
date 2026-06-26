const HISTORY_KEY = 'newsReadingHistory'
const MAX_HISTORY = 50

export interface HistoryItem {
  id: number
  title: string
  category: string
  image: string
  timestamp: number
}

export function getHistory(): HistoryItem[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function addToHistory(item: Omit<HistoryItem, 'timestamp'>) {
  const history = getHistory()
  // Remove duplicate
  const filtered = history.filter(h => h.id !== item.id)
  // Add to front
  filtered.unshift({ ...item, timestamp: Date.now() })
  // Cap at MAX_HISTORY
  const trimmed = filtered.slice(0, MAX_HISTORY)
  localStorage.setItem(HISTORY_KEY, JSON.stringify(trimmed))
}

export function removeFromHistory(id: number) {
  const history = getHistory().filter(h => h.id !== id)
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history))
}

export function clearHistory() {
  localStorage.removeItem(HISTORY_KEY)
}
