import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface RSSCategoryData {
  category: string
  data: any[]
}

interface RSSStore {
  categoryData: RSSCategoryData[]
  addOrUpdateCategoryData: (category: string, data: any[]) => void
  clearData: () => void
}

export const useRSSStore = create<RSSStore>()(
  persist(
    (set) => ({
      categoryData: [],
      
      addOrUpdateCategoryData: (category, data) => set((state) => {
        const categoryExists = state.categoryData.some(cat => cat.category === category)

        return {
          categoryData: categoryExists
            ? state.categoryData.map(cat => 
                cat.category === category ? { category, data } : cat
              )
            : [...state.categoryData, { category, data }]
        }
      }),
      
      clearData: () => set({ categoryData: [] })
    }),
    { name: 'rss-storage' }
  )
)
