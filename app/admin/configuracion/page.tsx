'use client'

import React, { useState, useEffect } from 'react'
import {
  Sliders,
  Phone,
  Truck,
  TrendingUp,
  Megaphone,
  CreditCard,
  Save,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  Sparkles,
} from 'lucide-react'
import { DEFAULT_SITE_CONFIG, type SiteConfig } from '@/lib/site-config'

type TabType = 'contacto' | 'metricas' | 'envios' | 'anuncios' | 'mercadopago'

export default function AdminConfiguracionPage() {
  const [config, setConfig] = useState<SiteConfig>(DEFAULT_SITE_CONFIG)
  const [activeTab, setActiveTab] = useState<TabType>('contacto')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  useEffect(() => {
    async function loadConfig() {
      try {
        const res = await fetch('/api/admin/config')
        const data = await res.json()
        if (data.success && data.config) {
          setConfig(data.config)
        }
      } catch (err) {
        console.error('Error al cargar configuración:', err)
      } finally {
        setLoading(false)
      }
    }
    loadConfig()
  }, [])

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    setSaving(true)
    setStatusMessage(null)

    try {
      const res = await fetch('/api/admin/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      })
      const data = await res.json()
      if (data.success) {
        setStatusMessage({ type: 'success', text: '¡Ajustes guardados correctamente en la tienda!' })
      } else {
        setStatusMessage({ type: 'error', text: data.error || 'Error al guardar.' })
      }
    } catch {
      setStatusMessage({ type: 'error', text: 'Error de conexión con el servidor al guardar.' })
    } finally {
      setSaving(false)
      setTimeout(() => setStatusMessage(null), 5000)
    }
  }

  const handleResetDefaults = () => {
    if (confirm('¿Deseás restaurar todos los valores por defecto iniciales?')) {
      setConfig(DEFAULT_SITE_CONFIG)
      setStatusMessage({ type: 'success', text: 'Valores restablecidos a predeterminados. Presioná "Guardar Cambios" para confirmar.' })
    }
  }

  if (loading) {
    return (
      <div className="p-10 flex items-center justify-center min-h-[60vh]">
        <div className="flex items-center gap-3 text-neutral-400 text-sm">
          <span className="size-5 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin" />
          <span>Cargando ajustes comerciales de Seal Step...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 sm:p-10 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800/80 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-0.5 text-xs font-bold uppercase tracking-widest text-emerald-400 mb-2">
            <Sliders className="size-3.5" />
            <span>Ajustes Generales</span>
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
            Valores Comerciales de la Tienda
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Modificá aquí los números de WhatsApp, métricas, plazos de envío y pasarelas de pago sin tocar código.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleResetDefaults}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-neutral-800 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 text-xs font-bold uppercase tracking-wider transition"
          >
            <RotateCcw className="size-3.5" />
            <span>Restablecer</span>
          </button>
          <button
            type="button"
            onClick={() => handleSave()}
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-black uppercase tracking-wider transition shadow-lg shadow-emerald-500/20 disabled:opacity-50"
          >
            {saving ? (
              <span className="size-4 rounded-full border-2 border-black border-t-transparent animate-spin" />
            ) : (
              <Save className="size-4" />
            )}
            <span>Guardar Cambios</span>
          </button>
        </div>
      </div>

      {/* Alerta de feedback */}
      {statusMessage && (
        <div
          className={`p-4 rounded-2xl border text-xs font-bold flex items-center gap-3 animate-in fade-in duration-200 ${
            statusMessage.type === 'success'
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
              : 'bg-red-500/10 border-red-500/30 text-red-400'
          }`}
        >
          {statusMessage.type === 'success' ? (
            <CheckCircle2 className="size-4 shrink-0" />
          ) : (
            <AlertCircle className="size-4 shrink-0" />
          )}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* Navegación por Pestañas */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-neutral-800/80">
        <button
          type="button"
          onClick={() => setActiveTab('contacto')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition ${
            activeTab === 'contacto'
              ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
              : 'bg-neutral-900/60 border border-transparent text-neutral-400 hover:text-white'
          }`}
        >
          <Phone className="size-4" />
          <span>Contacto & WhatsApp</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('metricas')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition ${
            activeTab === 'metricas'
              ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
              : 'bg-neutral-900/60 border border-transparent text-neutral-400 hover:text-white'
          }`}
        >
          <TrendingUp className="size-4" />
          <span>Métricas del Hero</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('envios')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition ${
            activeTab === 'envios'
              ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
              : 'bg-neutral-900/60 border border-transparent text-neutral-400 hover:text-white'
          }`}
        >
          <Truck className="size-4" />
          <span>Envíos & Logística</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('anuncios')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition ${
            activeTab === 'anuncios'
              ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
              : 'bg-neutral-900/60 border border-transparent text-neutral-400 hover:text-white'
          }`}
        >
          <Megaphone className="size-4" />
          <span>Avisos & Marquesina</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('mercadopago')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition ${
            activeTab === 'mercadopago'
              ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
              : 'bg-neutral-900/60 border border-transparent text-neutral-400 hover:text-white'
          }`}
        >
          <CreditCard className="size-4" />
          <span>Mercado Pago</span>
        </button>
      </div>

      {/* Contenido de Formularios según Pestaña */}
      <form onSubmit={handleSave} className="space-y-6">
        {/* PESTAÑA: Contacto & WhatsApp */}
        {activeTab === 'contacto' && (
          <div className="rounded-2xl border border-neutral-800 bg-[#0d0d0d] p-6 space-y-5">
            <h2 className="text-base font-heading font-black uppercase text-white tracking-wide flex items-center gap-2">
              <Phone className="size-4 text-emerald-400" />
              <span>Canales de Contacto Directo</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                  Número de WhatsApp (con código de país sin +)
                </label>
                <input
                  type="text"
                  value={config.whatsappNumber}
                  onChange={(e) => setConfig({ ...config, whatsappNumber: e.target.value })}
                  placeholder="59895843091"
                  className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-none focus:border-emerald-500 transition"
                />
                <span className="text-[11px] text-neutral-500 mt-1 block">
                  Ejemplo: 59895843091 (para Uruguay)
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                  Número Visible en Pantalla
                </label>
                <input
                  type="text"
                  value={config.whatsappDisplay}
                  onChange={(e) => setConfig({ ...config, whatsappDisplay: e.target.value })}
                  placeholder="+598 95 843 091"
                  className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-none focus:border-emerald-500 transition"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                  Mensaje Inicial de WhatsApp para Consultas
                </label>
                <textarea
                  rows={2}
                  value={config.whatsappMensajeBienvenida}
                  onChange={(e) => setConfig({ ...config, whatsappMensajeBienvenida: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-none focus:border-emerald-500 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                  Email de Contacto Comercial
                </label>
                <input
                  type="email"
                  value={config.emailContacto}
                  onChange={(e) => setConfig({ ...config, emailContacto: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-none focus:border-emerald-500 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                  Ciudad y Base Operativa
                </label>
                <input
                  type="text"
                  value={config.ciudadBase}
                  onChange={(e) => setConfig({ ...config, ciudadBase: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-none focus:border-emerald-500 transition"
                />
              </div>
            </div>
          </div>
        )}

        {/* PESTAÑA: Métricas del Hero */}
        {activeTab === 'metricas' && (
          <div className="rounded-2xl border border-neutral-800 bg-[#0d0d0d] p-6 space-y-5">
            <h2 className="text-base font-heading font-black uppercase text-white tracking-wide flex items-center gap-2">
              <TrendingUp className="size-4 text-emerald-400" />
              <span>Contadores y Prueba Social en Portada</span>
            </h2>
            <p className="text-xs text-neutral-400">
              Estos valores se muestran debajo de los botones principales del Hero para transmitir solidez comercial.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                  Pares Enviados (+X)
                </label>
                <input
                  type="number"
                  value={config.statsHero.paresEnviados}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      statsHero: { ...config.statsHero, paresEnviados: Number(e.target.value) || 0 },
                    })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-none focus:border-emerald-500 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                  Departamentos (de Uruguay)
                </label>
                <input
                  type="number"
                  value={config.statsHero.departamentos}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      statsHero: { ...config.statsHero, departamentos: Number(e.target.value) || 0 },
                    })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-none focus:border-emerald-500 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                  Compra Segura (%)
                </label>
                <input
                  type="number"
                  value={config.statsHero.compraSeguraPorcentaje}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      statsHero: { ...config.statsHero, compraSeguraPorcentaje: Number(e.target.value) || 0 },
                    })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-none focus:border-emerald-500 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                  Revendedores (+X)
                </label>
                <input
                  type="number"
                  value={config.statsHero.revendedoresActivos}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      statsHero: { ...config.statsHero, revendedoresActivos: Number(e.target.value) || 0 },
                    })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-none focus:border-emerald-500 transition"
                />
              </div>
            </div>
          </div>
        )}

        {/* PESTAÑA: Envíos & Logística */}
        {activeTab === 'envios' && (
          <div className="rounded-2xl border border-neutral-800 bg-[#0d0d0d] p-6 space-y-5">
            <h2 className="text-base font-heading font-black uppercase text-white tracking-wide flex items-center gap-2">
              <Truck className="size-4 text-emerald-400" />
              <span>Condiciones de Entrega y Fletes</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                  Plazo de Entrega Estimado
                </label>
                <input
                  type="text"
                  value={config.envios.plazoEstimado}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      envios: { ...config.envios, plazoEstimado: e.target.value },
                    })
                  }
                  placeholder="24 a 72 hs"
                  className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-none focus:border-emerald-500 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                  Costo de Envío Base ($ UYU)
                </label>
                <input
                  type="number"
                  value={config.envios.costoEnvioBaseUYU}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      envios: { ...config.envios, costoEnvioBaseUYU: Number(e.target.value) || 0 },
                    })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-none focus:border-emerald-500 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                  Envío Gratis a partir de ($ UYU)
                </label>
                <input
                  type="number"
                  value={config.envios.envioGratisMinimoUYU}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      envios: { ...config.envios, envioGratisMinimoUYU: Number(e.target.value) || 0 },
                    })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-none focus:border-emerald-500 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                  Agencias Transportistas Asociadas
                </label>
                <input
                  type="text"
                  value={config.envios.transportistas}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      envios: { ...config.envios, transportistas: e.target.value },
                    })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-none focus:border-emerald-500 transition"
                />
              </div>
            </div>
          </div>
        )}

        {/* PESTAÑA: Avisos & Marquesina */}
        {activeTab === 'anuncios' && (
          <div className="rounded-2xl border border-neutral-800 bg-[#0d0d0d] p-6 space-y-5">
            <h2 className="text-base font-heading font-black uppercase text-white tracking-wide flex items-center gap-2">
              <Megaphone className="size-4 text-emerald-400" />
              <span>Mensajes Promocionales y Cintillo</span>
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                  Texto del Cintillo Inferior (Marquesina Continua)
                </label>
                <textarea
                  rows={3}
                  value={config.anuncios.cintilloMarquesina}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      anuncios: { ...config.anuncios, cintilloMarquesina: e.target.value },
                    })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-none focus:border-emerald-500 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                  Texto del Banner Informativo
                </label>
                <input
                  type="text"
                  value={config.anuncios.promoBannerTexto}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      anuncios: { ...config.anuncios, promoBannerTexto: e.target.value },
                    })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-none focus:border-emerald-500 transition"
                />
              </div>
            </div>
          </div>
        )}

        {/* PESTAÑA: Mercado Pago Uruguay */}
        {activeTab === 'mercadopago' && (
          <div className="rounded-2xl border border-neutral-800 bg-[#0d0d0d] p-6 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-heading font-black uppercase text-white tracking-wide flex items-center gap-2">
                  <CreditCard className="size-4 text-emerald-400" />
                  <span>Pasarela de Pago Mercado Pago Uruguay</span>
                </h2>
                <p className="text-xs text-neutral-400 mt-1">
                  Activá el cobro directo con tarjetas de débito/crédito y redes de cobranza (Abitab / RedPagos).
                </p>
              </div>

              <label className="flex items-center gap-2.5 cursor-pointer">
                <span className="text-xs font-bold text-neutral-300">
                  {config.mercadoPago.habilitado ? 'Habilitado' : 'Deshabilitado'}
                </span>
                <input
                  type="checkbox"
                  checked={config.mercadoPago.habilitado}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      mercadoPago: { ...config.mercadoPago, habilitado: e.target.checked },
                    })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-neutral-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500 relative"></div>
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                  Moneda de Procesamiento
                </label>
                <input
                  type="text"
                  disabled
                  value="UYU ($ Pesos Uruguayos)"
                  className="w-full px-4 py-3 rounded-xl bg-neutral-900/50 border border-neutral-800 text-sm text-neutral-400 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                  Public Key (Clave Pública)
                </label>
                <input
                  type="text"
                  value={config.mercadoPago.publicKey}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      mercadoPago: { ...config.mercadoPago, publicKey: e.target.value },
                    })
                  }
                  placeholder="APP_USR-xxxx..."
                  className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-none focus:border-emerald-500 transition"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                  Access Token (Token Privado)
                </label>
                <input
                  type="password"
                  value={config.mercadoPago.accessToken}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      mercadoPago: { ...config.mercadoPago, accessToken: e.target.value },
                    })
                  }
                  placeholder="APP_USR-xxxx..."
                  className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-none focus:border-emerald-500 transition"
                />
                <span className="text-[11px] text-neutral-500 mt-1 block">
                  También podés configurar estas claves en las variables de entorno de Vercel como MERCADO_PAGO_ACCESS_TOKEN.
                </span>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  )
}
