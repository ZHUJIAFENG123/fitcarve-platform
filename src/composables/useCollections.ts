const COLLECTIONS_KEY = 'newsCollections'

export interface Collection {
  id: string
  name: string
  newsIds: number[]
  createdAt: number
}

export function getCollections(): Collection[] {
  try {
    const raw = localStorage.getItem(COLLECTIONS_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveCollections(collections: Collection[]) {
  localStorage.setItem(COLLECTIONS_KEY, JSON.stringify(collections))
}

export function createCollection(name: string): Collection {
  const collections = getCollections()
  const col: Collection = {
    id: `col_${Date.now()}`,
    name: name.trim() || '默认收藏夹',
    newsIds: [],
    createdAt: Date.now()
  }
  collections.push(col)
  saveCollections(collections)
  return col
}

export function deleteCollection(id: string) {
  saveCollections(getCollections().filter(c => c.id !== id))
}

export function renameCollection(id: string, name: string) {
  const collections = getCollections()
  const col = collections.find(c => c.id === id)
  if (col) {
    col.name = name.trim()
    saveCollections(collections)
  }
}

export function addToCollection(collectionId: string, newsId: number) {
  const collections = getCollections()
  const col = collections.find(c => c.id === collectionId)
  if (col && !col.newsIds.includes(newsId)) {
    col.newsIds.push(newsId)
    saveCollections(collections)
    return true
  }
  return false
}

export function removeFromCollection(collectionId: string, newsId: number) {
  const collections = getCollections()
  const col = collections.find(c => c.id === collectionId)
  if (col) {
    col.newsIds = col.newsIds.filter(id => id !== newsId)
    saveCollections(collections)
  }
}

export function isInCollection(collectionId: string, newsId: number): boolean {
  const collections = getCollections()
  const col = collections.find(c => c.id === collectionId)
  return col ? col.newsIds.includes(newsId) : false
}

export function getNewsCollections(newsId: number): Collection[] {
  return getCollections().filter(c => c.newsIds.includes(newsId))
}
