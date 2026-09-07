'use client'

import { useEffect, useState } from 'react'
import { X, Download, Smartphone, Monitor, Apple, Share } from 'lucide-react'

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

interface InstallPwaModalProps {
  isOpen: boolean
  onClose: () => void
}

export function InstallPwaModal({ isOpen, onClose }: InstallPwaModalProps) {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [isIOS, setIsIOS] = useState(false)
  const [isAndroid, setIsAndroid] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)
  const [installing, setInstalling] = useState(false)
  const [installed, setInstalled] = useState(false)

  useEffect(() => {
    // Detectar plataforma
    const ua = navigator.userAgent
    setIsIOS(/iPad|iPhone|iPod/.test(ua) && !(window as Window & { MSStream?: unknown }).MSStream)
    setIsAndroid(/Android/.test(ua))

    // Detectar si ya está instalada
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true)
    }

    // Capturar el evento de instalación
    const handler = (e: Event) => {
      e.preventDefault()
      setInstallPrompt(e as BeforeInstallPromptEvent)
    }
    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInstall = async () => {
    if (!installPrompt) return
    setInstalling(true)
    await installPrompt.prompt()
    const choice = await installPrompt.userChoice
    if (choice.outcome === 'accepted') {
      setInstalled(true)
      setInstallPrompt(null)
    }
    setInstalling(false)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-200 p-4">
      <div className="relative w-full max-w-md rounded-3xl border border-neutral-700 bg-[#111] text-white shadow-2xl animate-in slide-in-from-bottom-4 duration-300 overflow-hidden">
        {/* Header */}
        <div className="relative bg-gradient-to-br from-emerald-500/20 via-transparent to-transparent p-6 pb-5 border-b border-neutral-800">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 flex size-8 items-center justify-center rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white transition"
          >
            <X className="size-4" />
          </button>
          <div className="flex items-center gap-4">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400">
              <Smartphone className="size-7" />
            </div>
            <div>
              <h2 className="font-black text-lg tracking-tight">Instalar App del Panel</h2>
              <p className="text-xs text-neutral-400 mt-0.5">Acceso directo desde tu teléfono o PC</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-5">
          {isInstalled || installed ? (
            /* Ya instalada */
            <div className="text-center py-4">
              <div className="flex size-16 items-center justify-center rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 mx-auto mb-4">
                <Monitor className="size-8" />
              </div>
              <p className="font-bold text-emerald-400 text-lg">¡App instalada!</p>
              <p className="text-neutral-400 text-sm mt-1">Buscá el ícono de Seal Step en tu pantalla de inicio o escritorio.</p>
              <button
                onClick={onClose}
                className="mt-5 w-full py-3 rounded-full bg-emerald-500 text-black font-bold text-sm hover:bg-emerald-400 transition"
              >
                Perfecto, cerrar
              </button>
            </div>
          ) : isIOS ? (
            /* Instrucciones iOS */
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-amber-400">
                <Apple className="size-5" />
                <span className="font-bold text-sm">Instalar en iPhone / iPad</span>
              </div>
              <ol className="space-y-3">
                {[
                  { icon: Share, text: 'Toca el botón de Compartir (cuadrado con flecha) en Safari' },
                  { icon: Download, text: 'Deslizá hacia abajo y seleccioná "Añadir a la pantalla de inicio"' },
                  { icon: Smartphone, text: 'Confirmá tocando "Añadir" en la esquina superior derecha' },
                ].map((step, i) => {
                  const Icon = step.icon
                  return (
                    <li key={i} className="flex items-start gap-3">
                      <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-neutral-800 border border-neutral-700 text-neutral-300 text-xs font-bold">
                        {i + 1}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-neutral-300 pt-0.5">
                        <Icon className="size-4 shrink-0 text-amber-400" />
                        {step.text}
                      </div>
                    </li>
                  )
                })}
              </ol>
              <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-3 text-xs text-amber-300">
                ⚠️ Solo funciona desde Safari. Si estás en Chrome para iOS, copiá la URL y pegala en Safari.
              </div>
            </div>
          ) : installPrompt ? (
            /* Android / Chrome Desktop — instalación directa */
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-emerald-400">
                <Download className="size-5" />
                <span className="font-bold text-sm">
                  {isAndroid ? 'Instalar en Android' : 'Instalar en tu PC / Mac'}
                </span>
              </div>
              <p className="text-sm text-neutral-300">
                Instalá el Panel de Seal Step como una app nativa. Funciona sin depender del navegador y tenés acceso con un solo toque desde tu pantalla de inicio.
              </p>
              <ul className="space-y-2">
                {['Funciona offline parcialmente', 'Sin barra de navegación del browser', 'Ícono en pantalla de inicio', 'Notificaciones (próximamente)'].map((feat) => (
                  <li key={feat} className="flex items-center gap-2 text-sm text-neutral-300">
                    <span className="size-1.5 rounded-full bg-emerald-400 shrink-0" />
                    {feat}
                  </li>
                ))}
              </ul>
              <button
                onClick={handleInstall}
                disabled={installing}
                className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-black text-sm uppercase tracking-wide transition-all hover:scale-[1.02] disabled:opacity-50"
              >
                {installing ? (
                  <>
                    <span className="size-4 border-2 border-black/40 border-t-black rounded-full animate-spin" />
                    Instalando...
                  </>
                ) : (
                  <>
                    <Download className="size-4" />
                    Instalar App Ahora
                  </>
                )}
              </button>
            </div>
          ) : (
            /* Sin beforeinstallprompt disponible — instrucciones manuales */
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-neutral-300">
                <Monitor className="size-5" />
                <span className="font-bold text-sm">Instalar en Chrome / Edge</span>
              </div>
              <ol className="space-y-3">
                {[
                  'Asegurate de estar en Chrome, Edge o Brave',
                  'Hacé clic en el ícono de instalación (⊕) en la barra de direcciones',
                  'Seleccioná "Instalar" en el diálogo que aparece',
                  'El panel se abrirá como una app independiente',
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-neutral-800 border border-neutral-700 text-neutral-300 text-xs font-bold">
                      {i + 1}
                    </div>
                    <span className="text-sm text-neutral-300 pt-0.5">{step}</span>
                  </li>
                ))}
              </ol>
              <div className="rounded-2xl border border-neutral-700 bg-neutral-900/60 p-3 text-xs text-neutral-400">
                💡 También podés agregar <strong className="text-white">sealstep.uy/admin</strong> a tus Favoritos para acceso rápido.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
