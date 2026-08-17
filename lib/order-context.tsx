'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import type { Producto } from '@/lib/productos'

export type OrderItem = {
  id: string
  producto: Producto
  talle: string
  color?: string
  cantidad: number
}

type OrderContextType = {
  items: OrderItem[]
  addItem: (producto: Producto, talle: string, color?: string) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, delta: number) => void
  clearOrder: () => void
  isDrawerOpen: boolean
  setIsDrawerOpen: (open: boolean) => void
  quickViewProduct: Producto | null
  setQuickViewProduct: (product: Producto | null) => void
  isSizeGuideOpen: boolean
  setIsSizeGuideOpen: (open: boolean) => void
  isQuizOpen: boolean
  setIsQuizOpen: (open: boolean) => void
  selectedFilterSize: string | null
  setSelectedFilterSize: (size: string | null) => void
  totalCount: number
}

const OrderContext = createContext<OrderContextType | undefined>(undefined)

const STORAGE_KEY = 'sealstep_order_bag_v1'

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<OrderItem[]>([])
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [quickViewProduct, setQuickViewProduct] = useState<Producto | null>(null)
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false)
  const [isQuizOpen, setIsQuizOpen] = useState(false)
  const [selectedFilterSize, setSelectedFilterSize] = useState<string | null>(null)

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        setItems(JSON.parse(saved))
      }
    } catch {
      // ignore
    }
  }, [])

  // Save to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      // ignore
    }
  }, [items])

  const addItem = (producto: Producto, talle: string, color?: string) => {
    const id = `${producto.slug}-${talle}-${color || 'default'}`
    setItems((prev) => {
      const existing = prev.find((item) => item.id === id)
      if (existing) {
        return prev.map((item) =>
          item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item,
        )
      }
      return [...prev, { id, producto, talle, color, cantidad: 1 }]
    })
    setIsDrawerOpen(true)
  }

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.cantidad + delta
            return newQty > 0 ? { ...item, cantidad: newQty } : null
          }
          return item
        })
        .filter((item): item is OrderItem => item !== null),
    )
  }

  const clearOrder = () => {
    setItems([])
  }

  const totalCount = items.reduce((acc, item) => acc + item.cantidad, 0)

  return (
    <OrderContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearOrder,
        isDrawerOpen,
        setIsDrawerOpen,
        quickViewProduct,
        setQuickViewProduct,
        isSizeGuideOpen,
        setIsSizeGuideOpen,
        isQuizOpen,
        setIsQuizOpen,
        selectedFilterSize,
        setSelectedFilterSize,
        totalCount,
      }}
    >
      {children}
    </OrderContext.Provider>
  )
}

export function useOrder() {
  const context = useContext(OrderContext)
  if (!context) {
    throw new Error('useOrder must be used within an OrderProvider')
  }
  return context
}
