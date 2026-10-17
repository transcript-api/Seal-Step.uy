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
  Percent,
  Layers,
  Plus,
  Trash2,
  ShieldCheck,
  KeyRound,
  UserPlus,
  Eye,
  EyeOff,
  UserX,
} from 'lucide-react'
import { DEFAULT_SITE_CONFIG, type SiteConfig } from '@/lib/site-config'

type TabType = 'contacto' | 'metricas' | 'envios' | 'anuncios' | 'mercadopago' | 'mayorista' | 'seguridad'

type AdminUser = { email: string; nombre: string; creado: string }

export interface ReglaMayoristaUI {
  id?: string
  nombre: string
  cantidad_minima: number
  cantidad_maxima: number | null
  valor_descuento: number
}

export default function AdminConfiguracionPage() {
  const [config, setConfig] = useState<SiteConfig>(DEFAULT_SITE_CONFIG)
  const [activeTab, setActiveTab] = useState<TabType>('contacto')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [reglasMayorista, setReglasMayorista] = useState<ReglaMayoristaUI[]>([])
  const [savingMayorista, setSavingMayorista] = useState(false)

  // Estado para Seguridad & Admins
  const [admins, setAdmins] = useState<AdminUser[]>([])
  const [loadingAdmins, setLoadingAdmins] = useState(false)
  const [savingAdmin, setSavingAdmin] = useState(false)
  const [adminMsg, setAdminMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  // Cambio de contraseña maestra
  const [curPass, setCurPass] = useState('')
  const [newPass, setNewPass] = useState('')
  const [confPass, setConfPass] = useState('')
  const [showCurPass, setShowCurPass] = useState(false)
  const [showNewPass, setShowNewPass] = useState(false)
  // Nuevo admin
  const [newAdminEmail, setNewAdminEmail] = useState('')
  const [newAdminNombre, setNewAdminNombre] = useState('')
  const [newAdminPass, setNewAdminPass] = useState('')
  const [showNewAdminPass, setShowNewAdminPass] = useState(false)

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

    async function loadReglas() {
      try {
        const res = await fetch('/api/descuentos')
        const data = await res.json()
        if (data.reglas && Array.isArray(data.reglas)) {
          setReglasMayorista(data.reglas)
        }
      } catch (err) {
        console.error('Error al cargar reglas mayoristas:', err)
      }
    }

    loadConfig()
    loadReglas()
    loadAdmins()
  }, [])

  const loadAdmins = async () => {
    setLoadingAdmins(true)
    try {
      const res = await fetch('/api/admin/admins')
      const data = await res.json()
      if (data.success && data.admins) {
        setAdmins(data.admins.filter((a: AdminUser) => a.email !== '__master_password_hash__'))
      }
    } catch {}
    finally { setLoadingAdmins(false) }
  }

  const handleChangeMasterPassword = async () => {
    if (!curPass || !newPass || !confPass) {
      setAdminMsg({ type: 'error', text: 'Completá todos los campos de contraseña.' })
      return
    }
    if (newPass !== confPass) {
      setAdminMsg({ type: 'error', text: 'La contraseña nueva y su confirmación no coinciden.' })
      return
    }
    if (newPass.length < 8) {
      setAdminMsg({ type: 'error', text: 'La nueva contraseña debe tener al menos 8 caracteres.' })
      return
    }
    setSavingAdmin(true)
    setAdminMsg(null)
    try {
      const res = await fetch('/api/admin/admins', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'change_master_password', currentPassword: curPass, newPassword: newPass }),
      })
      const data = await res.json()
      if (data.success) {
        setAdminMsg({ type: 'success', text: data.message })
        setCurPass(''); setNewPass(''); setConfPass('')
      } else {
        setAdminMsg({ type: 'error', text: data.error || 'Error al cambiar la contraseña.' })
      }
    } catch {
      setAdminMsg({ type: 'error', text: 'Error de red.' })
    } finally {
      setSavingAdmin(false)
      setTimeout(() => setAdminMsg(null), 6000)
    }
  }

  const handleAddAdmin = async () => {
    if (!newAdminEmail || !newAdminNombre || !newAdminPass) {
      setAdminMsg({ type: 'error', text: 'Completá todos los campos del nuevo administrador.' })
      return
    }
    setSavingAdmin(true)
    setAdminMsg(null)
    try {
      const res = await fetch('/api/admin/admins', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'add_admin', email: newAdminEmail, nombre: newAdminNombre, password: newAdminPass }),
      })
      const data = await res.json()
      if (data.success) {
        setAdminMsg({ type: 'success', text: data.message })
        setNewAdminEmail(''); setNewAdminNombre(''); setNewAdminPass('')
        await loadAdmins()
      } else {
        setAdminMsg({ type: 'error', text: data.error || 'Error al agregar administrador.' })
      }
    } catch {
      setAdminMsg({ type: 'error', text: 'Error de red.' })
    } finally {
      setSavingAdmin(false)
      setTimeout(() => setAdminMsg(null), 6000)
    }
  }

  const handleDeleteAdmin = async (email: string, nombre: string) => {
    if (!confirm(`¿Eliminar al administrador "${nombre}" (${email})? Esta acción no se puede deshacer.`)) return
    setSavingAdmin(true)
    setAdminMsg(null)
    try {
      const res = await fetch('/api/admin/admins', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete_admin', email }),
      })
      const data = await res.json()
      if (data.success) {
        setAdminMsg({ type: 'success', text: data.message })
        await loadAdmins()
      } else {
        setAdminMsg({ type: 'error', text: data.error || 'Error al eliminar.' })
      }
    } catch {
      setAdminMsg({ type: 'error', text: 'Error de red.' })
    } finally {
      setSavingAdmin(false)
      setTimeout(() => setAdminMsg(null), 6000)
    }
  }

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

  const handleSaveMayorista = async () => {
    setSavingMayorista(true)
    setStatusMessage(null)
    try {
      const res = await fetch('/api/descuentos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reglas: reglasMayorista }),
      })
      const data = await res.json()
      if (data.success) {
        setStatusMessage({ type: 'success', text: '¡Escalas de descuento mayorista guardadas en Supabase con éxito!' })
      } else {
        setStatusMessage({ type: 'error', text: data.error || 'Error al guardar escalas.' })
      }
    } catch {
      setStatusMessage({ type: 'error', text: 'Error de red al guardar las escalas.' })
    } finally {
      setSavingMayorista(false)
      setTimeout(() => setStatusMessage(null), 5000)
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

        <button
          type="button"
          onClick={() => setActiveTab('mayorista')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition ${
            activeTab === 'mayorista'
              ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
              : 'bg-neutral-900/60 border border-transparent text-neutral-400 hover:text-white'
          }`}
        >
          <Percent className="size-4" />
          <span>Precios Mayoristas</span>
        </button>

        <button
          type="button"
          onClick={() => { setActiveTab('seguridad'); loadAdmins() }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition ${
            activeTab === 'seguridad'
              ? 'bg-red-500/10 border border-red-500/30 text-red-400'
              : 'bg-neutral-900/60 border border-transparent text-neutral-400 hover:text-white'
          }`}
        >
          <ShieldCheck className="size-4" />
          <span>Seguridad &amp; Admins</span>
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

        {/* PESTAÑA: Precios y Descuentos por Mayor (Supabase) */}
        {activeTab === 'mayorista' && (
          <div className="rounded-2xl border border-neutral-800 bg-[#0d0d0d] p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-base font-heading font-black uppercase text-white tracking-wide flex items-center gap-2">
                  <Percent className="size-4 text-emerald-400" />
                  <span>Escalas de Descuento por Cantidad de Pares (Mayorista)</span>
                </h2>
                <p className="text-xs text-neutral-400 mt-1">
                  Configurá el porcentaje de descuento automático según la cantidad total de pares en el carrito.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setReglasMayorista([
                      ...reglasMayorista,
                      {
                        nombre: `Escala ${reglasMayorista.length + 1}`,
                        cantidad_minima: 20,
                        cantidad_maxima: null,
                        valor_descuento: 35,
                      },
                    ])
                  }}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-700 text-neutral-200 text-xs font-bold uppercase tracking-wider hover:text-white transition"
                >
                  <Plus className="size-3.5" />
                  <span>Agregar Escala</span>
                </button>
                <button
                  type="button"
                  onClick={handleSaveMayorista}
                  disabled={savingMayorista}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-black uppercase tracking-wider transition shadow-lg shadow-emerald-500/20 disabled:opacity-50"
                >
                  {savingMayorista ? (
                    <span className="size-3.5 rounded-full border-2 border-black border-t-transparent animate-spin" />
                  ) : (
                    <Save className="size-3.5" />
                  )}
                  <span>Guardar en Supabase</span>
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {reglasMayorista.map((regla, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-neutral-800/80 bg-neutral-900/50 flex flex-col md:flex-row md:items-center gap-4 justify-between"
                >
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-4 gap-3">
                    <div className="sm:col-span-1">
                      <label className="block text-[10px] font-black uppercase tracking-wider text-neutral-500 mb-1">
                        Etiqueta / Nombre
                      </label>
                      <input
                        type="text"
                        value={regla.nombre}
                        onChange={(e) => {
                          const updated = [...reglasMayorista]
                          updated[idx].nombre = e.target.value
                          setReglasMayorista(updated)
                        }}
                        className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-wider text-neutral-500 mb-1">
                        Pares Mínimos
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={regla.cantidad_minima}
                        onChange={(e) => {
                          const updated = [...reglasMayorista]
                          updated[idx].cantidad_minima = parseInt(e.target.value) || 1
                          setReglasMayorista(updated)
                        }}
                        className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-wider text-neutral-500 mb-1">
                        Pares Máximos (vacío = sin límite)
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={regla.cantidad_maxima ?? ''}
                        placeholder="Sin límite (+)"
                        onChange={(e) => {
                          const updated = [...reglasMayorista]
                          const val = e.target.value.trim()
                          updated[idx].cantidad_maxima = val ? parseInt(val) : null
                          setReglasMayorista(updated)
                        }}
                        className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-wider text-neutral-500 mb-1">
                        % Descuento
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          min="0"
                          max="90"
                          value={regla.valor_descuento}
                          onChange={(e) => {
                            const updated = [...reglasMayorista]
                            updated[idx].valor_descuento = parseInt(e.target.value) || 0
                            setReglasMayorista(updated)
                          }}
                          className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-emerald-400 font-bold focus:outline-none focus:border-emerald-500 font-mono pr-8"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-neutral-500">%</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-end shrink-0 pt-2 md:pt-0">
                    <button
                      type="button"
                      onClick={() => {
                        setReglasMayorista(reglasMayorista.filter((_, i) => i !== idx))
                      }}
                      className="size-8 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white flex items-center justify-center transition"
                      title="Eliminar escala"
                    >
                      <Trash2 className="size-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-950/60 text-xs text-neutral-400 space-y-1">
              <p className="font-bold text-white flex items-center gap-1.5">
                <Sparkles className="size-3.5 text-emerald-400" />
                ¿Cómo calcula el checkout el precio mayorista?
              </p>
              <p>
                El cliente puede mezclar cualquier modelo, talle y color (Campus 00s, Bad Bunny, etc.).
                Si el carrito suma 8 pares o más, el sistema aplica automáticamente el 25% OFF sobre el total acumulado. Si suma 15 o más pares, aplica el 30% OFF. Si tiene un cupón con mayor descuento, siempre se le garantiza el mejor beneficio al cliente.
              </p>
            </div>
          </div>
        )}

        {/* PESTAÑA: Seguridad & Admins */}
        {activeTab === 'seguridad' && (
          <div className="space-y-8">

            {/* Mensaje de estado */}
            {adminMsg && (
              <div className={`p-4 rounded-2xl border text-xs font-bold flex items-center gap-3 animate-in fade-in duration-200 ${
                adminMsg.type === 'success'
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                  : 'bg-red-500/10 border-red-500/30 text-red-400'
              }`}>
                {adminMsg.type === 'success' ? <CheckCircle2 className="size-4 shrink-0" /> : <AlertCircle className="size-4 shrink-0" />}
                <span>{adminMsg.text}</span>
              </div>
            )}

            {/* ── Cambiar contraseña del admin maestro ── */}
            <div className="rounded-2xl border border-neutral-800 bg-[#0d0d0d] p-6 space-y-5">
              <h2 className="text-base font-heading font-black uppercase text-white tracking-wide flex items-center gap-2">
                <KeyRound className="size-4 text-yellow-400" />
                <span>Cambiar Contraseña Principal</span>
              </h2>
              <p className="text-xs text-neutral-400">
                Esta es la contraseña del acceso administrativo principal al panel. Podés actualizarla cuando desees por una clave segura.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Contraseña actual */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">Contraseña Actual</label>
                  <div className="relative">
                    <input
                      type={showCurPass ? 'text' : 'password'}
                      value={curPass}
                      onChange={(e) => setCurPass(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-4 py-3 pr-10 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-none focus:border-yellow-500 transition"
                    />
                    <button type="button" onClick={() => setShowCurPass(!showCurPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white transition">
                      {showCurPass ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                  </div>
                </div>
                {/* Nueva contraseña */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">Nueva Contraseña</label>
                  <div className="relative">
                    <input
                      type={showNewPass ? 'text' : 'password'}
                      value={newPass}
                      onChange={(e) => setNewPass(e.target.value)}
                      placeholder="Mín. 8 caracteres"
                      className="w-full px-4 py-3 pr-10 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-none focus:border-yellow-500 transition"
                    />
                    <button type="button" onClick={() => setShowNewPass(!showNewPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white transition">
                      {showNewPass ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                  </div>
                </div>
                {/* Confirmar contraseña */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">Confirmar Nueva</label>
                  <input
                    type="password"
                    value={confPass}
                    onChange={(e) => setConfPass(e.target.value)}
                    placeholder="Repetí la contraseña"
                    className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-none focus:border-yellow-500 transition"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleChangeMasterPassword}
                  disabled={savingAdmin}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-black text-xs font-black uppercase tracking-wider transition shadow-lg shadow-yellow-500/20 disabled:opacity-50"
                >
                  {savingAdmin ? <span className="size-4 rounded-full border-2 border-black border-t-transparent animate-spin" /> : <KeyRound className="size-4" />}
                  <span>Actualizar Contraseña</span>
                </button>
              </div>

              <div className="p-3 rounded-xl bg-yellow-500/5 border border-yellow-500/20 text-xs text-yellow-400/80">
                ⚠️ <strong>Importante:</strong> Luego de cambiar la contraseña, cerrá sesión y volvé a ingresar con la nueva contraseña para confirmar el cambio.
              </div>
            </div>

            {/* ── Gestión de administradores extra ── */}
            <div className="rounded-2xl border border-neutral-800 bg-[#0d0d0d] p-6 space-y-6">
              <div>
                <h2 className="text-base font-heading font-black uppercase text-white tracking-wide flex items-center gap-2">
                  <UserPlus className="size-4 text-emerald-400" />
                  <span>Administradores Autorizados</span>
                </h2>
                <p className="text-xs text-neutral-400 mt-1">
                  Agregá colaboradores que puedan acceder al panel con su propio correo y contraseña. Podés revocar o agregar nuevos accesos cuando lo necesites.
                </p>
              </div>

              {/* Formulario para agregar nuevo admin */}
              <div className="rounded-2xl border border-emerald-500/25 bg-emerald-500/[0.04] p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-black uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                    <UserPlus className="size-3.5" />
                    <span>+ Invitar Nuevo Administrador</span>
                  </p>
                  <span className="text-[11px] text-neutral-400">
                    Se enviará una invitación a su correo
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">Nombre Completo</label>
                    <input
                      type="text"
                      value={newAdminNombre}
                      onChange={(e) => setNewAdminNombre(e.target.value)}
                      placeholder="Ej: Carlos Silva"
                      className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-emerald-500 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">Correo Electrónico</label>
                    <input
                      type="email"
                      value={newAdminEmail}
                      onChange={(e) => setNewAdminEmail(e.target.value)}
                      placeholder="colaborador@ejemplo.com"
                      className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-emerald-500 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">Contraseña Asignada</label>
                    <div className="relative">
                      <input
                        type={showNewAdminPass ? 'text' : 'password'}
                        value={newAdminPass}
                        onChange={(e) => setNewAdminPass(e.target.value)}
                        placeholder="Mín. 6 caracteres"
                        className="w-full px-4 py-3 pr-10 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-emerald-500 transition"
                      />
                      <button type="button" onClick={() => setShowNewAdminPass(!showNewAdminPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white transition">
                        {showNewAdminPass ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                  <p className="text-[11px] text-neutral-400 flex items-center gap-1.5">
                    <span>📩</span>
                    <span>Al confirmar, la persona recibirá un correo electrónico con sus datos de ingreso y el enlace al panel.</span>
                  </p>

                  <button
                    type="button"
                    onClick={handleAddAdmin}
                    disabled={savingAdmin}
                    className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-black uppercase tracking-wider transition shadow-lg shadow-emerald-500/20 disabled:opacity-50 shrink-0"
                  >
                    {savingAdmin ? (
                      <span className="flex items-center gap-2">
                        <span className="size-4 rounded-full border-2 border-black border-t-transparent animate-spin" />
                        <span>Enviando invitación...</span>
                      </span>
                    ) : (
                      <>
                        <UserPlus className="size-4" />
                        <span>Invitar y Activar Acceso</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Lista de administradores activos */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between px-1">
                  <p className="text-xs font-black uppercase tracking-wider text-neutral-400">
                    Administradores con Acceso ({admins.length})
                  </p>
                  <button
                    type="button"
                    onClick={loadAdmins}
                    className="text-xs text-emerald-400 hover:text-emerald-300 font-bold transition flex items-center gap-1"
                  >
                    Actualizar lista ↻
                  </button>
                </div>

                {loadingAdmins ? (
                  <div className="flex items-center justify-center gap-2 text-neutral-500 text-xs py-8">
                    <span className="size-4 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin" />
                    <span>Cargando administradores desde la base de datos...</span>
                  </div>
                ) : admins.length === 0 ? (
                  <div className="text-center py-10 px-4 rounded-2xl border border-dashed border-neutral-800 bg-neutral-900/30">
                    <ShieldCheck className="size-10 mx-auto mb-2 text-neutral-600" />
                    <p className="text-sm font-bold text-neutral-300">No hay administradores adicionales todavía</p>
                    <p className="text-xs mt-1 text-neutral-500 max-w-sm mx-auto">
                      Usá el formulario de arriba para invitar a tus colaboradores y darles acceso seguro al panel.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {admins.map((admin) => (
                      <div
                        key={admin.email}
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl border border-neutral-800 bg-neutral-900/70 hover:border-neutral-700 transition gap-4"
                      >
                        <div className="flex items-center gap-3.5">
                          <div className="size-11 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
                            <ShieldCheck className="size-5 text-emerald-400" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <p className="text-sm font-black text-white">{admin.nombre}</p>
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                                <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                Activo
                              </span>
                            </div>
                            <p className="text-xs text-neutral-300 font-mono mt-0.5">{admin.email}</p>
                            <p className="text-[10px] text-neutral-500 mt-1">
                              Acceso creado el: {new Date(admin.creado).toLocaleDateString('es-UY', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-end">
                          <button
                            type="button"
                            onClick={() => handleDeleteAdmin(admin.email, admin.nombre)}
                            disabled={savingAdmin}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white text-xs font-bold transition disabled:opacity-30"
                            title="Revocar acceso inmediatamente"
                          >
                            <UserX className="size-4" />
                            <span>Revocar Acceso</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

          </div>
        )}
      </form>
    </div>
  )
}
