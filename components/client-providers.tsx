'use client'

import React, { useState } from 'react'
import { OrderProvider } from '@/lib/order-context'
import { OrderDrawer } from '@/components/order-drawer'
import { QuickViewModal } from '@/components/quick-view-modal'
import { SizeCalculatorModal } from '@/components/size-calculator-modal'
import { SneakerQuizModal } from '@/components/sneaker-quiz-modal'
import { ChatBot } from '@/components/chat-bot'
import { WhatsAppFloat } from '@/components/whatsapp-float'

export function ClientProviders({ children }: { children: React.ReactNode }) {
  const [chatOpen, setChatOpen] = useState(false)

  return (
    <OrderProvider>
      {children}
      <OrderDrawer />
      <QuickViewModal />
      <SizeCalculatorModal />
      <SneakerQuizModal />
      <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-2 sm:right-6">
        <ChatBot isOpen={chatOpen} onOpenChange={setChatOpen} />
        <WhatsAppFloat isHidden={chatOpen} />
      </div>
    </OrderProvider>
  )
}

