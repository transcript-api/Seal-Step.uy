'use client'

import React, { useState, Suspense } from 'react'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { Lock, Mail, Eye, EyeOff, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectPath = searchParams.get('redirect') || '/admin'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok || !data.success) {
        setError(data.error || 'No se pudo iniciar sesión. Verificá tus datos.')
        setLoading(false)
        return
      }

      router.push(redirectPath)
      router.refresh()
    } catch {
      setError('Error de conexión con el servidor. Intentá de nuevo.')
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md p-6 sm:p-8 rounded-3xl border border-neutral-800 bg-[#0d0d0d]/90 shadow-2xl backdrop-blur-xl">
      {/* Encabezado */}
      <div className="flex flex-col items-center text-center space-y-3 mb-8">
        <div className="relative h-12 w-44">
          <Image
            src="/images/seal-step-logo.png"
            alt="Seal Step"
            fill
            className="object-contain"
            priority
          />
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-black uppercase tracking-wider">
          <ShieldCheck className="size-3.5" />
          <span>Acceso Administrativo</span>
        </div>
        <h1 className="text-xl font-heading font-black uppercase text-white tracking-tight">
          Iniciar Sesión
        </h1>
        <p className="text-xs text-neutral-400 max-w-xs">
          Ingresá con tus credenciales de dueño o administrador para gestionar la tienda.
        </p>
      </div>

      {/* Alerta de Error */}
      {error && (
        <div className="mb-6 flex items-center gap-3 p-3.5 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs animate-in fade-in duration-200">
          <AlertCircle className="size-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
            Correo Electrónico
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
              <Mail className="size-4" />
            </div>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@sealstep.uy"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500 transition"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
            Contraseña
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
              <Lock className="size-4" />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full pl-10 pr-11 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500 transition"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-neutral-400 hover:text-neutral-200 transition"
            >
              {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-2 flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 active:scale-[0.99] text-black font-heading font-black text-sm uppercase tracking-wider transition shadow-lg shadow-emerald-500/20 disabled:opacity-50 disabled:pointer-events-none"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="size-4 rounded-full border-2 border-black border-t-transparent animate-spin" />
              Verificando...
            </span>
          ) : (
            <>
              <span>Entrar al Panel</span>
              <ArrowRight className="size-4" />
            </>
          )}
        </button>
      </form>

      {/* Pie con ayuda */}
      <div className="mt-8 pt-6 border-t border-neutral-800/80 text-center">
        <p className="text-[11px] text-neutral-500">
          Seal Step · Panel Comercial Seguro
        </p>
      </div>
    </div>
  )
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Luz ambiental de fondo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-emerald-500/5 blur-[140px]"
      />
      <Suspense fallback={<div className="text-white text-sm">Cargando acceso...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  )
}
