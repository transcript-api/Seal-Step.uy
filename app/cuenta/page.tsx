'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  LogOut,
  Copy,
  Check,
  Sparkles,
  ShoppingBag,
  ArrowRight,
  Shield,
} from 'lucide-react'
import { PhoneInput } from '@/components/phone-input'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
)

type Tab = 'login' | 'register' | 'forgot' | 'reset'

interface ClienteSession {
  id: string
  email: string
  nombre: string
  telefono?: string
  accessToken?: string
}

function parseClienteSession(): ClienteSession | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(/sealstep_cliente_session=([^;]+)/)
  if (!match) return null
  try {
    return JSON.parse(decodeURIComponent(match[1])) as ClienteSession
  } catch {
    return null
  }
}

export default function CuentaPage() {
  const [tab, setTab] = useState<Tab>('login')
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [cliente, setCliente] = useState<ClienteSession | null>(null)
  const [cuponCopiado, setCuponCopiado] = useState(false)
  const [cuponRegistro, setCuponRegistro] = useState<string | null>(null)

  // Form states
  const [formLogin, setFormLogin] = useState({ email: '', password: '' })
  const [formRegister, setFormRegister] = useState({ nombre: '', email: '', telefono: '', password: '' })
  const [phoneValid, setPhoneValid] = useState(false)
  const [forgotEmail, setForgotEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')

  useEffect(() => {
    // Detectar si viene de enlace de recuperación de contraseña
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      if (params.get('tab') === 'reset' || window.location.hash.includes('type=recovery')) {
        setTab('reset')
      }
    }

    // Verificar sesión existente
    const session = parseClienteSession()
    if (session) {
      setCliente(session)
    }

    // Verificar si viene de OAuth de Google
    supabase.auth.getSession().then(({ data }) => {
      if (data.session?.user) {
        const user = data.session.user
        const nombre = user.user_metadata?.full_name || user.email?.split('@')[0] || 'Cliente'
        setCliente({
          id: user.id,
          email: user.email || '',
          nombre,
          accessToken: data.session.access_token,
        })
      }
    })
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/auth/login-unified', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formLogin),
      })
      const data = await res.json() as {
        success?: boolean
        rol?: string
        redirect?: string
        message?: string
        error?: string
      }

      if (data.success) {
        setSuccess(data.message || '¡Sesión iniciada!')
        if (data.rol === 'admin') {
          setTimeout(() => { window.location.href = '/admin' }, 800)
        } else {
          setTimeout(() => { window.location.reload() }, 800)
        }
      } else {
        setError(data.error || 'Error al iniciar sesión.')
      }
    } catch {
      setError('Error de conexión. Intentá de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (formRegister.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.')
      setLoading(false)
      return
    }

    if (!phoneValid) {
      setError('Por favor ingresá un número de teléfono real y válido para el país seleccionado.')
      setLoading(false)
      return
    }

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formRegister),
      })
      const data = await res.json() as {
        success?: boolean
        cupon?: string
        message?: string
        error?: string
      }

      if (data.success) {
        setCuponRegistro(data.cupon || null)
        setSuccess(data.message || '¡Cuenta creada!')
        // Auto-login después del registro
        setTimeout(() => {
          fetch('/api/auth/login-unified', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: formRegister.email, password: formRegister.password }),
          }).then(() => window.location.reload())
        }, 2000)
      } else {
        setError(data.error || 'No se pudo crear la cuenta.')
      }
    } catch {
      setError('Error de conexión. Intentá de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: forgotEmail }),
      })
      const data = await res.json()
      if (data.success) {
        setSuccess('¡Listo! Te enviamos las instrucciones a tu correo para restablecer tu contraseña. Revisá tu bandeja de entrada o spam.')
      } else {
        setError(data.error || 'No se pudo enviar el correo.')
      }
    } catch {
      setError('Error de conexión. Intentá nuevamente.')
    } finally {
      setLoading(false)
    }
  }

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newPassword.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.')
      return
    }
    setLoading(true)
    setError(null)
    try {
      const { error: updateError } = await supabase.auth.updateUser({ password: newPassword })
      if (updateError) {
        setError('El enlace de recuperación venció o es inválido. Solicitá uno nuevo.')
      } else {
        setSuccess('¡Contraseña actualizada con éxito! Ya podés iniciar sesión con tu nueva clave.')
        setTimeout(() => {
          setTab('login')
        }, 1500)
      }
    } catch {
      setError('Error al actualizar la contraseña.')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setGoogleLoading(true)
    setError(null)
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/cuenta`,
      },
    })
    if (error) {
      setError('No se pudo iniciar sesión con Google. Intentá más tarde.')
      setGoogleLoading(false)
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    document.cookie = 'sealstep_cliente_session=; Max-Age=0; path=/'
    document.cookie = 'sealstep_admin_session=; Max-Age=0; path=/'
    setCliente(null)
    setSuccess('Sesión cerrada correctamente.')
  }

  const copiarCupon = (code: string) => {
    navigator.clipboard.writeText(code).then(() => {
      setCuponCopiado(true)
      setTimeout(() => setCuponCopiado(false), 2000)
    })
  }

  // ─── VISTA: YA TIENE SESIÓN ───
  if (cliente) {
    const cupon = cuponRegistro || 'BIENVENIDA10'
    return (
      <main className="min-h-screen bg-[#0a0a0a] text-white pt-24 pb-16 px-4">
        <div className="mx-auto max-w-lg space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="flex size-16 items-center justify-center rounded-3xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 mx-auto">
              <User className="size-8" />
            </div>
            <h1 className="text-2xl font-black tracking-tight">
              Hola, {cliente.nombre.split(' ')[0]} 👋
            </h1>
            <p className="text-neutral-400 text-sm">{cliente.email}</p>
          </div>

          {/* Cupón de bienvenida */}
          <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent p-6">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="size-4 text-emerald-400" />
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Tu cupón exclusivo</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex-1 rounded-xl border border-emerald-500/40 bg-black/40 px-4 py-3 font-mono font-black text-lg text-emerald-300 tracking-widest">
                {cupon}
              </div>
              <button
                onClick={() => copiarCupon(cupon)}
                className="flex size-11 items-center justify-center rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black transition"
                title="Copiar cupón"
              >
                {cuponCopiado ? <Check className="size-5" /> : <Copy className="size-5" />}
              </button>
            </div>
            <p className="mt-2 text-xs text-emerald-300/70">
              10% de descuento en tu primera compra · Ingresalo en el carrito
            </p>
          </div>

          {/* Accesos rápidos */}
          <div className="grid grid-cols-2 gap-3">
            <Link
              href="/catalogo"
              className="flex flex-col items-center gap-2 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-5 text-center hover:border-neutral-700 transition group"
            >
              <ShoppingBag className="size-6 text-emerald-400 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold">Ver Catálogo</span>
            </Link>
            <Link
              href="/#productos"
              className="flex flex-col items-center gap-2 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-5 text-center hover:border-neutral-700 transition group"
            >
              <ArrowRight className="size-6 text-neutral-400 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold">Ir a la Tienda</span>
            </Link>
          </div>

          {/* Info de cuenta */}
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-neutral-400 uppercase tracking-wider">
              <Shield className="size-3.5" />
              Mi cuenta
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-neutral-500">Email</span>
                <span className="text-white font-medium">{cliente.email}</span>
              </div>
              {cliente.telefono && (
                <div className="flex justify-between">
                  <span className="text-neutral-500">Teléfono</span>
                  <span className="text-white font-medium">{cliente.telefono}</span>
                </div>
              )}
            </div>
          </div>

          {/* Cerrar sesión */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-full border border-neutral-800 text-neutral-400 hover:text-red-400 hover:border-red-500/30 text-sm font-bold transition"
          >
            <LogOut className="size-4" />
            Cerrar sesión
          </button>

          <Link href="/" className="block text-center text-xs text-neutral-500 hover:text-white transition">
            ← Volver a la tienda
          </Link>
        </div>
      </main>
    )
  }

  // ─── VISTA: FORMULARIOS DE LOGIN / REGISTRO ───
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white pt-24 pb-16 px-4">
      <div className="mx-auto max-w-md space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <Link href="/" className="inline-block">
            <Image
              src="/images/seal-step-logo.png"
              alt="Seal Step"
              width={200}
              height={42}
              className="h-10 w-auto object-contain mx-auto"
            />
          </Link>
          <h1 className="text-2xl font-black tracking-tight">
            {tab === 'login' ? 'Iniciá sesión' : 'Creá tu cuenta'}
          </h1>
          <p className="text-neutral-400 text-sm">
            {tab === 'login'
              ? 'Accedé a tu cuenta y gestioná tus pedidos.'
              : tab === 'register'
              ? 'Recibí tu cupón de bienvenida con 10% OFF.'
              : 'Te ayudamos a recuperar el acceso a tu cuenta.'}
          </p>
        </div>

        {/* Card principal */}
        <div className="rounded-3xl border border-neutral-800 bg-neutral-900/60 overflow-hidden">
          {/* Tabs Selector */}
          {tab !== 'forgot' && tab !== 'reset' && (
            <div className="grid grid-cols-2 border-b border-neutral-800">
              <button
                onClick={() => { setTab('login'); setError(null); setSuccess(null) }}
                className={`py-4 text-sm font-bold transition-colors ${
                  tab === 'login'
                    ? 'bg-emerald-500/10 text-emerald-400 border-b-2 border-emerald-500'
                    : 'text-neutral-500 hover:text-white'
                }`}
              >
                Iniciar Sesión
              </button>
              <button
                onClick={() => { setTab('register'); setError(null); setSuccess(null) }}
                className={`py-4 text-sm font-bold transition-colors ${
                  tab === 'register'
                    ? 'bg-emerald-500/10 text-emerald-400 border-b-2 border-emerald-500'
                    : 'text-neutral-500 hover:text-white'
                }`}
              >
                Crear Cuenta
              </button>
            </div>
          )}

          <div className="p-6 space-y-5">
            {/* Botón Google solo para login y registro */}
            {(tab === 'login' || tab === 'register') && (
              <>
                <button
                  onClick={handleGoogleLogin}
                  disabled={googleLoading}
                  className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-neutral-700 bg-neutral-800/60 text-sm font-bold text-white hover:bg-neutral-700 transition disabled:opacity-50"
                >
                  {googleLoading ? (
                    <span className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <svg className="size-4" viewBox="0 0 24 24" fill="none">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                  )}
                  Continuar con Google
                </button>

                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px bg-neutral-800" />
                  <span className="text-xs text-neutral-500 font-medium">o con email</span>
                  <div className="flex-1 h-px bg-neutral-800" />
                </div>
              </>
            )}

            {/* Alertas */}
            {error && (
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                <AlertCircle className="size-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}
            {success && (
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm">
                <CheckCircle2 className="size-4 shrink-0 mt-0.5" />
                <span>{success}</span>
              </div>
            )}

            {/* Formulario de Login */}
            {tab === 'login' && (
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider" htmlFor="login-email">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-neutral-500" />
                    <input
                      id="login-email"
                      type="email"
                      autoComplete="email"
                      required
                      placeholder="tu@email.com"
                      value={formLogin.email}
                      onChange={e => setFormLogin(p => ({ ...p, email: e.target.value }))}
                      className="w-full rounded-xl border border-neutral-700 bg-neutral-800/60 py-3 pl-10 pr-4 text-sm text-white placeholder-neutral-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/30 transition"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider" htmlFor="login-pass">
                      Contraseña
                    </label>
                    <button
                      type="button"
                      onClick={() => { setTab('forgot'); setError(null); setSuccess(null) }}
                      className="text-xs text-neutral-400 hover:text-emerald-400 transition"
                    >
                      ¿Olvidaste tu contraseña?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-neutral-500" />
                    <input
                      id="login-pass"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      required
                      placeholder="Tu contraseña"
                      value={formLogin.password}
                      onChange={e => setFormLogin(p => ({ ...p, password: e.target.value }))}
                      className="w-full rounded-xl border border-neutral-700 bg-neutral-800/60 py-3 pl-10 pr-10 text-sm text-white placeholder-neutral-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/30 transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(p => !p)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white transition"
                    >
                      {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-full bg-white text-black font-black text-sm uppercase tracking-wider hover:bg-neutral-100 transition-all hover:scale-[1.02] disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <span className="size-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  ) : null}
                  Iniciar sesión
                </button>
              </form>
            )}

            {/* Vista Recuperar Contraseña */}
            {tab === 'forgot' && (
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <div className="text-left space-y-1">
                  <h3 className="text-base font-bold text-white">Recuperá tu contraseña</h3>
                  <p className="text-xs text-neutral-400">
                    Ingresá el correo asociado a tu cuenta y te enviaremos un enlace seguro para restablecerla.
                  </p>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider" htmlFor="forgot-email">
                    Correo electrónico
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-neutral-500" />
                    <input
                      id="forgot-email"
                      type="email"
                      required
                      placeholder="tu@email.com"
                      value={forgotEmail}
                      onChange={e => setForgotEmail(e.target.value)}
                      className="w-full rounded-xl border border-neutral-700 bg-neutral-800/60 py-3 pl-10 pr-4 text-sm text-white placeholder-neutral-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/30 transition"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-black text-sm uppercase tracking-wider transition-all hover:scale-[1.02] disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
                >
                  {loading ? <span className="size-4 border-2 border-black/30 border-t-black rounded-full animate-spin" /> : null}
                  Enviar enlace de recuperación
                </button>

                <button
                  type="button"
                  onClick={() => { setTab('login'); setError(null); setSuccess(null) }}
                  className="w-full text-center text-xs text-neutral-400 hover:text-white transition py-2 font-semibold"
                >
                  ← Volver a Iniciar Sesión
                </button>
              </form>
            )}

            {/* Vista Establecer Nueva Contraseña */}
            {tab === 'reset' && (
              <form onSubmit={handleResetPassword} className="space-y-4">
                <div className="text-left space-y-1">
                  <h3 className="text-base font-bold text-white">Nueva contraseña</h3>
                  <p className="text-xs text-neutral-400">
                    Ingresá tu nueva clave para acceder a tu cuenta de Seal Step.
                  </p>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider" htmlFor="reset-new-pass">
                    Nueva contraseña (mín. 6 caracteres)
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-neutral-500" />
                    <input
                      id="reset-new-pass"
                      type="password"
                      required
                      minLength={6}
                      placeholder="Nueva contraseña segura"
                      value={newPassword}
                      onChange={e => setNewPassword(e.target.value)}
                      className="w-full rounded-xl border border-neutral-700 bg-neutral-800/60 py-3 pl-10 pr-4 text-sm text-white placeholder-neutral-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/30 transition"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-black text-sm uppercase tracking-wider transition-all hover:scale-[1.02] disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
                >
                  {loading ? <span className="size-4 border-2 border-black/30 border-t-black rounded-full animate-spin" /> : null}
                  Guardar nueva contraseña
                </button>

                <button
                  type="button"
                  onClick={() => { setTab('login'); setError(null); setSuccess(null) }}
                  className="w-full text-center text-xs text-neutral-400 hover:text-white transition py-2 font-semibold"
                >
                  ← Volver a Iniciar Sesión
                </button>
              </form>
            )}

            {/* Formulario de Registro */}
            {tab === 'register' && (
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider" htmlFor="reg-nombre">
                      Nombre completo
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-neutral-500" />
                      <input
                        id="reg-nombre"
                        type="text"
                        autoComplete="name"
                        required
                        placeholder="Juan García"
                        value={formRegister.nombre}
                        onChange={e => setFormRegister(p => ({ ...p, nombre: e.target.value }))}
                        className="w-full rounded-xl border border-neutral-700 bg-neutral-800/60 py-3 pl-10 pr-4 text-sm text-white placeholder-neutral-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/30 transition"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider" htmlFor="reg-email">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-neutral-500" />
                      <input
                        id="reg-email"
                        type="email"
                        autoComplete="email"
                        required
                        placeholder="tu@email.com"
                        value={formRegister.email}
                        onChange={e => setFormRegister(p => ({ ...p, email: e.target.value }))}
                        className="w-full rounded-xl border border-neutral-700 bg-neutral-800/60 py-3 pl-10 pr-4 text-sm text-white placeholder-neutral-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/30 transition"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider" htmlFor="reg-tel">
                      WhatsApp / Teléfono Móvil
                    </label>
                    <PhoneInput
                      id="reg-tel"
                      value={formRegister.telefono}
                      onChange={(formattedValue, isValid) => {
                        setFormRegister(p => ({ ...p, telefono: formattedValue }))
                        setPhoneValid(isValid)
                      }}
                      required
                      defaultCountryCode="UY"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider" htmlFor="reg-pass">
                      Contraseña (mín. 6 caracteres)
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-neutral-500" />
                      <input
                        id="reg-pass"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="new-password"
                        required
                        minLength={6}
                        placeholder="Elegí una contraseña segura"
                        value={formRegister.password}
                        onChange={e => setFormRegister(p => ({ ...p, password: e.target.value }))}
                        className="w-full rounded-xl border border-neutral-700 bg-neutral-800/60 py-3 pl-10 pr-10 text-sm text-white placeholder-neutral-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/30 transition"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(p => !p)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white transition"
                      >
                        {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Preview del beneficio */}
                <div className="flex items-center gap-3 p-3 rounded-xl bg-emerald-500/8 border border-emerald-500/20">
                  <Sparkles className="size-4 text-emerald-400 shrink-0" />
                  <p className="text-xs text-emerald-300">
                    Al registrarte recibís un <strong>cupón exclusivo de 10% OFF</strong> en tu primera compra directamente en tu correo.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-black text-sm uppercase tracking-wider transition-all hover:scale-[1.02] disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <span className="size-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  ) : null}
                  {loading ? 'Creando tu cuenta...' : 'Crear cuenta y recibir cupón'}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Info de seguridad */}
        <div className="flex items-center justify-center gap-2 text-xs text-neutral-600">
          <Shield className="size-3.5" />
          <span>Tus datos están protegidos con Supabase Auth y cifrado de extremo a extremo.</span>
        </div>

        <Link href="/" className="block text-center text-xs text-neutral-500 hover:text-white transition">
          ← Volver a la tienda
        </Link>
      </div>
    </main>
  )
}
