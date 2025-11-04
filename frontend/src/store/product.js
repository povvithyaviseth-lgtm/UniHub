/* This is the Zustand File!! */
import { create } from 'zustand'

const useProductStore = create((set) => ({
  products: [],
  addProduct: (newProduct) => set((state) => ({
    products: [...state.products, newProduct]
  })),
  removeProduct: (id) => set((state) => ({
    products: state.products.filter((p) => p.id !== id)
  }))
}))

export default useProductStore
