'use client'

import React from 'react'
import { OrderProvider } from '@/lib/order-context'
import { OrderDrawer } from '@/components/order-drawer'
import { QuickViewModal } from '@/components/quick-view-modal'
import { SizeCalculatorModal } from '@/components/size-calculator-modal'
import { SneakerQuizModal } from '@/components/sneaker-quiz-modal'

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <OrderProvider>
      {children}
      <OrderDrawer />
      <QuickViewModal />
      <SizeCalculatorModal />
      <SneakerQuizModal />
    </OrderProvider>
  )
}

