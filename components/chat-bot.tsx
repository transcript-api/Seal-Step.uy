'use client'

import React, { useState, useRef, useEffect } from 'react'
import {
  X,
  Send,
  Sparkles,
  Bot,
  RotateCcw,
  HelpCircle,
  ExternalLink,
} from 'lucide-react'
import { WhatsAppIcon } from '@/components/whatsapp-icon'
import { WA_LINKS, whatsappLink } from '@/lib/site'
import { PRODUCTOS } from '@/lib/productos'

type Message = {
  id: string
  sender: 'bot' | 'user'
  text: string
  timestamp: string
  userQuery?: string
  whatsappCta?: boolean
}

type KnowledgeEntry = {
  id: string
  keywords: string[]
  reply: string
}

const KNOWLEDGE_BASE: KnowledgeEntry[] = [
  {
    id: 'envios',
    keywords: [
      'envio', 'envios', 'envío', 'envíos', 'demora', 'tiempo', 'llegar', 'dac',
      'mirtrans', 'agencia', 'montevideo', 'departamento', 'interior', 'despacho',
      'tardan', 'tarda', 'costo de envio', 'cuanto demora'
    ],
    reply:
      '📦 **Envíos a todo Uruguay:** Despachamos a los 19 departamentos a través de DAC, Mirtrans, Correo Uruguayo o la agencia de tu preferencia. El tiempo de entrega es de **24 a 72 horas hábiles** con número de rastreo incluido.',
  },
  {
    id: 'encargue',
    keywords: [
      'encargue', 'pedido', 'funciona', 'como comprar', 'cómo comprar', 'proceso',
      'pasos', 'como se pide', 'hacer pedido', 'como encargo', 'ordenar'
    ],
    reply:
      '👟 **¿Cómo comprar por encargue?**\n1. Elegís el modelo y talle en la web.\n2. Nos escribís por WhatsApp para confirmar disponibilidad.\n3. Coordinamos el pago y despachamos tu paquete con número de guía.',
  },
  {
    id: 'mayorista',
    keywords: [
      'mayor', 'mayorista', 'revender', 'lote', 'packs', 'por mayor', 'emprendimiento',
      'negocio', 'revendedora', 'revendedor', 'ganancia', 'margen', 'cuanto se gana',
      'minimo mayorista', 'pack inicio', '8 pares'
    ],
    reply:
      '💼 **Ventas por Mayor:**\nTenemos lotes especiales desde **8 pares surtidos** para revendedores y tiendas de todo el país. Podés combinar modelos y talles del 34 al 43 con márgenes de más del 100% de ganancia. Escribinos para enviarte el catálogo mayorista con precios por bulto.',
  },
  {
    id: 'pagos',
    keywords: [
      'pago', 'pagos', 'pagar', 'tarjeta', 'tarjetas', 'transferencia', 'mercado pago',
      'cuotas', 'efectivo', 'brou', 'itau', 'santander', 'prex', 'midinero', 'debito',
      'credito', 'giro', 'abitab', 'redpagos'
    ],
    reply:
      '💳 **Medios de Pago Aceptados:**\n• Transferencias bancarias (BROU, Itaú, Santander, Prex, MiDinero).\n• Mercado Pago con todas las tarjetas de crédito (en cuotas sin recargo según promociones).\n• Giros por Abitab / Redpagos.',
  },
  {
    id: 'talles',
    keywords: [
      'talle', 'talles', 'medida', 'centimetro', 'centímetro', 'cm', 'calce', 'horma',
      'guia de talles', '35', '36', '37', '38', '39', '40', '41', '42', '43', 'pie'
    ],
    reply:
      '📏 **Guía de Talles:**\nManejamos la numeración habitual de Uruguay / EUR (34 al 43). En la web disponés de nuestra **Calculadora Interactiva de Talles en CM**. Las siluetas Dunk y Samba calzan fiel al talle; si dudás entre dos números, siempre recomendamos medir los cm de la plantilla.',
  },
  {
    id: 'precios',
    keywords: [
      'precio', 'precios', 'cuanto sale', 'cuanto cuesta', 'cuánto sale', 'cuánto cuesta',
      'valor', 'costo', 'barato', 'cotizacion', 'cotizar'
    ],
    reply:
      '🏷️ **Precios:**\nNuestros precios son directos de frontera para garantizarte la mejor relación calidad-precio de plaza. Podés tocar el botón de "Consultar precio" en cualquier modelo o escribirnos por WhatsApp con el modelo que te guste para darte el precio exacto con descuento.',
  },
  {
    id: 'ubicacion',
    keywords: [
      'donde estan', 'dónde están', 'ubicacion', 'ubicación', 'local', 'tienda',
      'rivera', 'donde queda', 'direccion', 'dirección', 'retiro'
    ],
    reply:
      '📍 **Ubicación:**\nNuestra base operativa se encuentra en **Rivera, Uruguay**. Esto nos permite acceder a mercadería importada de frontera sin intermediarios y enviar de forma directa a todo el territorio nacional.',
  },
  {
    id: 'fotos_calidad',
    keywords: [
      'original', 'calidad', 'fotos', 'reales', 'son reales', 'material', 'cuero',
      'gamuza', 'foto real', 'confianza', 'garantia', 'garantía', 'cambio', 'cambios'
    ],
    reply:
      '✨ **Fotos 100% Reales y Calidad:**\nTodas las imágenes de nuestra web son fotos reales del producto que recibís en tu casa, con costuras reforzadas, panelado en cuero/gamuza y suelas duraderas. Si tenés dudas con el talle, te asesoramos antes de despachar.',
  },
  {
    id: 'humano',
    keywords: [
      'humano', 'persona', 'asesor', 'atencion humana', 'hablar con alguien', 'representante',
      'dueno', 'telefono', 'numero', 'contacto directo'
    ],
    reply:
      '👋 ¡Por supuesto! Nuestro equipo de atención humana está disponible por WhatsApp para responder cualquier duda al instante.',
  },
]

const QUICK_PROMPTS = [
  '¿Hacen envíos a todo Uruguay?',
  '¿Cómo funciona la compra por encargue?',
  '¿Cómo comprar por mayor para revender?',
  '¿Qué medios de pago aceptan?',
  '¿Qué modelos tienen disponibles?',
  '¿Dónde están ubicados?',
]

export function ChatBot({ isOpen: controlledOpen, onOpenChange }: { isOpen?: boolean; onOpenChange?: (value: boolean) => void }) {
  const [isOpen, setIsOpen] = useState(controlledOpen ?? false)

  useEffect(() => {
    if (controlledOpen !== undefined) {
      setIsOpen(controlledOpen)
    }
  }, [controlledOpen])

  const handleOpenChange = (next: boolean) => {
    setIsOpen(next)
    onOpenChange?.(next)
  }

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: '¡Hola! 👋 Soy el asistente virtual inteligente de Seal Step. ¿En qué te puedo asesorar hoy? Podés preguntarme sobre envíos, compras por encargue, modelos, talles o ventas por mayor.',
      timestamp: 'Ahora',
    },
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (isOpen) {
      scrollToBottom()
    }
  }, [messages, isOpen, isTyping])

  const findAnswer = (query: string): { reply: string; matched: boolean } => {
    const clean = query
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')

    // 1. Search in Knowledge Base
    for (const entry of KNOWLEDGE_BASE) {
      const isMatch = entry.keywords.some((k) =>
        clean.includes(
          k
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, ''),
        ),
      )
      if (isMatch) {
        return { reply: entry.reply, matched: true }
      }
    }

    // 2. Check for specific sneaker brand / model name
    const foundProduct = PRODUCTOS.find((p) => {
      const prodName = p.nombre
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
      const prodSlug = p.slug.replace(/-/g, ' ')
      return clean.includes(prodName) || clean.includes(prodSlug)
    })

    if (foundProduct) {
      return {
        reply: `👟 **${foundProduct.nombre}** (${foundProduct.subtitulo || ''})\n• **Talles disponibles:** ${foundProduct.talles.join(', ')}\n• **Modalidad:** Por encargue (24 a 72 hs con fotos 100% reales).\n• **Envíos:** A todo Uruguay con número de guía.`,
        matched: true,
      }
    }

    // Check specific brands (Nike, Adidas, New Balance, Slides)
    if (clean.includes('nike') || clean.includes('dunk')) {
      return {
        reply:
          '👟 **Nike Dunk Low:** Tenemos disponibles modelos exclusivos como Dunk Panda, Dunk Storm Off Latex, Dunk Azul, Dunk Blanco y Dunk Cacao Wow. Talles del 34 al 43.',
        matched: true,
      }
    }
    if (clean.includes('adidas') || clean.includes('samba') || clean.includes('campus') || clean.includes('bad bunny') || clean.includes('gazelle')) {
      return {
        reply:
          '👟 **Adidas:** Contamos con Campus Gris/Blanco, Campus All Black, Bad Bunny All Black, Gazelle Verde Gold y Samba Linha Luxo.',
        matched: true,
      }
    }
    if (clean.includes('new balance') || clean.includes('9060') || clean.includes('1000')) {
      return {
        reply:
          '👟 **New Balance:** Disponibles los modelos estrella NB 9060 (Blanco/Gris/Off) y NB 1000 (Azul/Off White) con suela amortiguada premium.',
        matched: true,
      }
    }
    if (clean.includes('slide') || clean.includes('chancla') || clean.includes('ojota') || clean.includes('chancleta')) {
      return {
        reply:
          '🩴 **Chanclas Slide:** Contamos con la colección de verano en chanclas slide importadas acolchadas y super cómodas.',
        matched: true,
      }
    }

    // Fallback for custom / complex questions
    return {
      reply:
        'Entiendo tu consulta. Para darte una respuesta personalizada y confirmar disponibilidad en tiempo real, podés hablar directamente con un asesor humano en WhatsApp tocando el botón a continuación:',
      matched: false,
    }
  }

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputValue).trim()
    if (!text) return

    const userMsg: Message = {
      id: String(Date.now()),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }

    setMessages((prev) => [...prev, userMsg])
    if (!textToSend) setInputValue('')
    setIsTyping(true)

    // Simulate natural thinking delay
    setTimeout(() => {
      const { reply } = findAnswer(text)
      const botMsg: Message = {
        id: String(Date.now() + 1),
        sender: 'bot',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        userQuery: text, // Save exact question for WhatsApp redirection
        whatsappCta: true,
      }
      setMessages((prev) => [...prev, botMsg])
      setIsTyping(false)
    }, 600)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {!isOpen && (
        <button
          type="button"
          onClick={() => handleOpenChange(true)}
          aria-label="Abrir asistente inteligente Seal Step"
          className="group relative z-40 flex h-11 items-center gap-2 rounded-full border border-neutral-700 bg-black/95 px-3 text-white shadow-2xl backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:border-white/40 hover:bg-black ring-1 ring-white/10 sm:h-12 sm:px-4 animate-[float-soft_4s_ease-in-out_infinite]"
        >
          <div className="relative flex size-7 sm:size-8 items-center justify-center rounded-full bg-white text-black shadow">
            <Bot className="size-4 sm:size-4.5" />
            <span className="absolute -top-0.5 -right-0.5 size-2 sm:size-2.5 rounded-full bg-emerald-400 ring-2 ring-black" />
          </div>
          <div className="text-left">
            <p className="font-heading text-[11px] sm:text-xs font-bold uppercase tracking-wider text-white">
              Asistente Virtual
            </p>
            <p className="text-[9px] sm:text-[10px] text-neutral-400 font-medium hidden sm:block">
              Preguntas frecuentes & ayuda
            </p>
          </div>
        </button>
      )}

      {/* Chat Window Modal */}
      {isOpen && (
        <div className="fixed right-3 bottom-20 z-50 w-[calc(100vw-1.5rem)] max-w-sm sm:right-6 sm:bottom-24 sm:w-96 overflow-hidden rounded-3xl border border-neutral-800 bg-[#0a0a0a]/98 text-white shadow-2xl backdrop-blur-2xl animate-in fade-in slide-in-from-bottom-6 duration-300">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-neutral-800 bg-neutral-950/90 p-4 px-5">
            <div className="flex items-center gap-3">
              <div className="relative flex size-9 items-center justify-center rounded-2xl bg-white text-black shadow">
                <Bot className="size-5" />
                <span className="absolute -top-0.5 -right-0.5 size-2.5 rounded-full bg-emerald-400 ring-2 ring-black" />
              </div>
              <div>
                <h3 className="font-heading text-sm font-bold uppercase tracking-tight text-white flex items-center gap-1.5">
                  Seal Step Bot
                  <span className="rounded bg-white/10 px-1.5 py-0.2 text-[9px] font-semibold text-neutral-300">
                    IA
                  </span>
                </h3>
                <p className="text-[10px] font-medium text-emerald-400">
                  En línea · Respuestas automáticas
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() =>
                  setMessages([
                    {
                      id: 'welcome',
                      sender: 'bot',
                      text: '¡Hola! 👋 Soy el asistente virtual inteligente de Seal Step. ¿En qué te puedo asesorar hoy?',
                      timestamp: 'Ahora',
                    },
                  ])
                }
                title="Reiniciar chat"
                className="flex size-7 items-center justify-center rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 transition"
              >
                <RotateCcw className="size-3.5" />
              </button>
              <button
                type="button"
                onClick={() => handleOpenChange(false)}
                className="flex size-7 items-center justify-center rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 transition"
              >
                <X className="size-4" />
              </button>
            </div>
          </div>

          {/* Messages Body */}
          <div className="flex h-80 flex-col overflow-y-auto p-4 space-y-3 scrollbar-thin text-xs">
            {messages.map((msg) => {
              const isBot = msg.sender === 'bot'
              const userQuestion = msg.userQuery || ''
              const escalationWhatsAppHref = whatsappLink(
                userQuestion
                  ? `Hola Seal Step! Estuve consultando con el asistente de la web y quisiera hablar con un asesor sobre esto:\n\n👉 "${userQuestion}"`
                  : 'Hola Seal Step! Quisiera hablar con un asesor sobre una consulta de la web.',
              )

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isBot ? 'items-start' : 'items-end'}`}
                >
                  <div
                    className={`max-w-[88%] rounded-2xl p-3.5 leading-relaxed whitespace-pre-line ${
                      isBot
                        ? 'bg-neutral-900 border border-neutral-800 text-neutral-200 rounded-tl-sm'
                        : 'bg-white text-black font-semibold rounded-tr-sm shadow-md'
                    }`}
                  >
                    <p>{msg.text}</p>
                    {isBot && msg.whatsappCta && (
                      <div className="mt-3 pt-2.5 border-t border-neutral-800/80 flex flex-col gap-1">
                        <a
                          href={escalationWhatsAppHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#00e676] px-3.5 py-1.5 text-[11px] font-bold text-black hover:bg-[#00c853] transition shadow-sm"
                        >
                          <WhatsAppIcon className="size-3.5 fill-black" />
                          <span>Consultar con un asesor</span>
                        </a>
                      </div>
                    )}
                  </div>
                  <span className="mt-1 text-[9px] text-neutral-500 px-1">{msg.timestamp}</span>
                </div>
              )
            })}

            {isTyping && (
              <div className="flex items-center gap-1.5 rounded-2xl bg-neutral-900 border border-neutral-800 p-3 w-16">
                <span className="size-1.5 rounded-full bg-neutral-400 animate-bounce" />
                <span className="size-1.5 rounded-full bg-neutral-400 animate-bounce [animation-delay:0.2s]" />
                <span className="size-1.5 rounded-full bg-neutral-400 animate-bounce [animation-delay:0.4s]" />
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Carousel */}
          <div className="border-t border-neutral-800/80 bg-neutral-950/60 p-2.5">
            <p className="px-1 text-[10px] font-semibold text-neutral-400 mb-1.5 flex items-center gap-1">
              <Sparkles className="size-3 text-white" /> Preguntas frecuentes rápidas:
            </p>
            <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {QUICK_PROMPTS.map((prompt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSendMessage(prompt)}
                  className="shrink-0 rounded-xl border border-neutral-800 bg-neutral-900 px-2.5 py-1.5 text-[10px] font-medium text-neutral-300 hover:border-neutral-600 hover:text-white transition whitespace-nowrap"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="border-t border-neutral-800 bg-neutral-950 p-3">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSendMessage()
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Escribí tu pregunta aquí..."
                className="flex-1 rounded-xl border border-neutral-800 bg-neutral-900 py-2.5 px-3 text-xs text-white placeholder-neutral-500 outline-none transition focus:border-neutral-600 focus:ring-1 focus:ring-white/20"
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="flex size-9 items-center justify-center rounded-xl bg-white text-black disabled:opacity-40 disabled:hover:bg-white hover:bg-neutral-200 transition"
              >
                <Send className="size-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
