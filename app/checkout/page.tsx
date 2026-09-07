'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  ShieldCheck,
  CreditCard,
  Building2,
  Banknote,
  Truck,
  CheckCircle2,
  AlertCircle,
  Tag,
  X,
  Lock,
  ArrowLeft,
  ChevronRight,
  Percent,
  TrendingUp,
  Package,
} from 'lucide-react'
import { useOrder } from '@/lib/order-context'
import { DEPARTAMENTOS_URUGUAY } from '@/lib/departamentos'
import { PhoneInput } from '@/components/phone-input'

function parsePrecioUYU(precioStr: string | null | undefined): number {
  if (!precioStr) return 2490
  const digitsOnly = precioStr.replace(/[^0-9]/g, '')
  const parsed = parseInt(digitsOnly, 10)
  return isNaN(parsed) || parsed <= 0 ? 2490 : parsed
}

const CUPONES_VALIDOS: Record<string, number> = {
  'BIENVENIDA10': 10,
  'SEALSTEP10': 10,
  'DESCUENTO15': 15,
}

const STORAGE_SAVED_INFO = 'sealstep_checkout_customer_v1'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, clearOrder, totalCount } = useOrder()

  // Contacto
  const [email, setEmail] = useState('')
  const [newsOptIn, setNewsOptIn] = useState(true)

  // Entrega
  const [pais, setPais] = useState('Uruguay')
  const [nombre, setNombre] = useState('')
  const [apellidos, setApellidos] = useState('')
  const [direccion, setDireccion] = useState('')
  const [apartamento, setApartamento] = useState('')
  const [codigoPostal, setCodigoPostal] = useState('')
  const [ciudad, setCiudad] = useState('')
  const [departamento, setDepartamento] = useState('Montevideo')
  const [telefono, setTelefono] = useState('')
  const [telefonoValido, setTelefonoValido] = useState(false)
  const [guardarInfo, setGuardarInfo] = useState(true)

  // Envíos
  const [metodoEnvio, setMetodoEnvio] = useState<'gratis' | 'cadeteria' | 'contra_entrega'>('gratis')

  // Pagos
  const [metodoPago, setMetodoPago] = useState<'mercadopago' | 'transferencia' | 'efectivo'>('mercadopago')

  // Facturación
  const [dirFacturacion, setDirFacturacion] = useState<'misma' | 'distinta'>('misma')

  // Cupones
  const [cupon, setCupon] = useState('')
  const [cuponAplicado, setCuponAplicado] = useState<string | null>(null)
  const [descuentoPorcentaje, setDescuentoPorcentaje] = useState(0)
  const [cuponError, setCuponError] = useState<string | null>(null)

  // Descuentos mayoristas (auto por cantidad)
  type ReglaMayorista = { id: string; nombre: string; cantidad_minima: number; cantidad_maxima: number | null; valor_descuento: number }
  const [reglasMayorista, setReglasMayorista] = useState<ReglaMayorista[]>([
    { id: '1', nombre: 'Precio Normal (1-7 pares)', cantidad_minima: 1, cantidad_maxima: 7, valor_descuento: 0 },
    { id: '2', nombre: 'Mayorista (8-14 pares)', cantidad_minima: 8, cantidad_maxima: 14, valor_descuento: 25 },
    { id: '3', nombre: 'Mayorista Grande (15+ pares)', cantidad_minima: 15, cantidad_maxima: null, valor_descuento: 30 },
  ])
  const [descuentoMayorista, setDescuentoMayorista] = useState(0)
  const [reglaActiva, setReglaActiva] = useState<ReglaMayorista | null>(null)

  // Estado de submit
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  // Cargar info guardada o sesión de cliente
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_SAVED_INFO)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (parsed.email) setEmail(parsed.email)
        if (parsed.nombre) setNombre(parsed.nombre)
        if (parsed.apellidos) setApellidos(parsed.apellidos)
        if (parsed.direccion) setDireccion(parsed.direccion)
        if (parsed.apartamento) setApartamento(parsed.apartamento)
        if (parsed.codigoPostal) setCodigoPostal(parsed.codigoPostal)
        if (parsed.ciudad) setCiudad(parsed.ciudad)
        if (parsed.departamento) setDepartamento(parsed.departamento)
        if (parsed.telefono) {
          setTelefono(parsed.telefono)
          setTelefonoValido(true)
        }
      }
    } catch {
      // ignore
    }
  }, [])

  // Cargar reglas de descuento mayoristas desde Supabase
  useEffect(() => {
    fetch('/api/descuentos')
      .then(r => r.json())
      .then(data => { if (data.reglas?.length > 0) setReglasMayorista(data.reglas) })
      .catch(() => {})
  }, [])

  // Auto-aplicar descuento mayorista según cantidad total de pares
  useEffect(() => {
    const cantidadTotal = items.reduce((acc, it) => acc + (it.cantidad || 1), 0)
    const reglasOrdenadas = [...reglasMayorista].sort((a, b) => b.cantidad_minima - a.cantidad_minima)
    let reglaEncontrada: ReglaMayorista | null = null
    for (const regla of reglasOrdenadas) {
      if (cantidadTotal >= regla.cantidad_minima && (regla.cantidad_maxima === null || cantidadTotal <= regla.cantidad_maxima)) {
        reglaEncontrada = regla
        break
      }
    }
    setDescuentoMayorista(reglaEncontrada?.valor_descuento || 0)
    setReglaActiva(reglaEncontrada?.valor_descuento ? reglaEncontrada : null)
  }, [items, reglasMayorista])

  // Totales
  const subtotal = items.reduce((acc, it) => {
    return acc + parsePrecioUYU(it.producto.precio) * (it.cantidad || 1)
  }, 0)
  const cantidadTotalPares = items.reduce((acc, it) => acc + (it.cantidad || 1), 0)

  // El descuento final es el MAYOR entre el cupón y el descuento mayorista automático
  const descuentoFinal = Math.max(descuentoPorcentaje, descuentoMayorista)
  const montoDescuento = descuentoFinal > 0 ? Math.round((subtotal * descuentoFinal) / 100) : 0
  const total = Math.max(0, subtotal - montoDescuento)

  // Próxima regla para mostrar al cliente
  const proximaRegla = reglasMayorista
    .filter(r => r.cantidad_minima > cantidadTotalPares)
    .sort((a, b) => a.cantidad_minima - b.cantidad_minima)[0] || null
  const paresParaProxima = proximaRegla ? proximaRegla.cantidad_minima - cantidadTotalPares : 0

  const aplicarCupon = () => {
    const code = cupon.trim().toUpperCase()
    if (!code) {
      setCuponError('Ingresá un código de cupón.')
      return
    }
    if (CUPONES_VALIDOS[code] !== undefined) {
      setCuponAplicado(code)
      setDescuentoPorcentaje(CUPONES_VALIDOS[code])
      setCuponError(null)
    } else if (code.startsWith('BIENVENIDA')) {
      // Acepta cualquier cupón generado de bienvenida
      setCuponAplicado(code)
      setDescuentoPorcentaje(10)
      setCuponError(null)
    } else {
      setCuponError('El código no es válido o está expirado.')
    }
  }

  const quitarCupon = () => {
    setCuponAplicado(null)
    setDescuentoPorcentaje(0)
    setCupon('')
    setCuponError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg(null)

    if (items.length === 0) {
      setErrorMsg('Tu carrito está vacío. Agregá championes para continuar.')
      return
    }

    if (!email || !nombre.trim() || !direccion.trim() || !ciudad.trim()) {
      setErrorMsg('Por favor completá los datos requeridos de contacto y entrega.')
      return
    }

    if (!telefono.trim() || (!telefonoValido && telefono.replace(/\D/g, '').length < 7)) {
      setErrorMsg('Por favor ingresá un número de teléfono / WhatsApp válido para coordinar el envío.')
      return
    }

    setLoading(true)

    // Guardar información en localStorage si está marcado
    if (guardarInfo) {
      try {
        localStorage.setItem(
          STORAGE_SAVED_INFO,
          JSON.stringify({
            email,
            nombre,
            apellidos,
            direccion,
            apartamento,
            codigoPostal,
            ciudad,
            departamento,
            telefono,
          })
        )
      } catch {
        // ignore
      }
    }

    try {
      const res = await fetch('/api/checkout/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contacto: { email, newsOptIn },
          entrega: {
            pais,
            nombre,
            apellidos,
            direccion,
            apartamento,
            codigoPostal,
            ciudad,
            departamento,
            telefono,
          },
          metodoEnvio:
            metodoEnvio === 'cadeteria'
              ? 'Cadetería en el día (Montevideo y Ciudad de la Costa)'
              : metodoEnvio === 'contra_entrega'
              ? 'Envío contra entrega (solo flete)'
              : 'DAC / UES / Mirtrans (Envío Gratis a todo Uruguay)',
          metodoPago,
          direccionFacturacion: dirFacturacion,
          items,
          cupon: cuponAplicado || (reglaActiva ? `MAYORISTA${descuentoMayorista}PCT` : null),
          descuentoPorcentaje: descuentoFinal,
        }),
      })

      const data = await res.json()

      if (!data.success) {
        setErrorMsg(data.error || 'No se pudo procesar tu pedido. Intentá de nuevo.')
        setLoading(false)
        return
      }

      // Vaciar carrito
      clearOrder()

      if (data.metodoPago === 'mercadopago' && data.initPoint) {
        // Redirigir al checkout de Mercado Pago
        window.location.assign(data.initPoint)
      } else if (data.redirectUrl) {
        window.location.assign(data.redirectUrl)
      } else {
        router.push(`/checkout/exito?order_id=${data.orderId}`)
      }
    } catch {
      setErrorMsg('Error de red al procesar tu pedido. Intentá de nuevo.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-neutral-200">
      {/* Top Header Barra de Seguridad */}
      <header className="border-b border-neutral-800/80 bg-neutral-950/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <span className="font-heading text-lg sm:text-xl font-black uppercase tracking-tight text-white group-hover:text-emerald-400 transition">
              SEAL STEP <span className="text-emerald-400">.</span>
            </span>
          </Link>
          <div className="flex items-center gap-2 text-xs font-semibold text-neutral-400">
            <ShieldCheck className="size-4 text-emerald-400" />
            <span className="hidden sm:inline">Checkout Seguro</span>
            <span className="text-neutral-600">•</span>
            <span className="text-emerald-400 font-mono">256-BIT SSL</span>
          </div>
        </div>
      </header>

      {/* Contenedor Principal en 2 Columnas estilo Shopify */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {items.length === 0 ? (
          <div className="max-w-md mx-auto text-center py-20 space-y-4">
            <div className="size-16 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center mx-auto text-neutral-500">
              <Truck className="size-7" />
            </div>
            <h2 className="text-2xl font-heading font-black uppercase text-white">Tu carrito está vacío</h2>
            <p className="text-sm text-neutral-400">
              No tenés championes agregados para finalizar la compra.
            </p>
            <Link
              href="/catalogo"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-heading font-bold text-xs uppercase tracking-wider hover:bg-neutral-200 transition mt-2"
            >
              Explorar Catálogo →
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Columna Izquierda: Formulario de Checkout */}
            <div className="lg:col-span-7 space-y-8">
              {/* Alerta de Error */}
              {errorMsg && (
                <div className="flex items-start gap-3 p-4 rounded-2xl bg-red-500/10 border border-red-500/25 text-red-400 text-sm">
                  <AlertCircle className="size-5 shrink-0 mt-0.5" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* SECCIÓN 1: CONTACTO */}
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-heading font-extrabold uppercase tracking-tight text-white">
                    Contacto
                  </h2>
                  <Link
                    href="/cuenta"
                    className="text-xs font-semibold text-emerald-400 hover:underline"
                  >
                    ¿Ya tenés cuenta? Iniciar sesión
                  </Link>
                </div>

                <div className="space-y-2">
                  <input
                    type="email"
                    required
                    placeholder="Email para confirmación de tu pedido"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-neutral-800 bg-neutral-900/90 px-4 py-3 text-sm text-white placeholder-neutral-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/30 transition"
                  />
                  <label className="flex items-center gap-2.5 cursor-pointer select-none text-xs text-neutral-400 pt-1">
                    <input
                      type="checkbox"
                      checked={newsOptIn}
                      onChange={e => setNewsOptIn(e.target.checked)}
                      className="size-4 rounded border-neutral-700 bg-neutral-800 text-emerald-500 focus:ring-0 focus:ring-offset-0 cursor-pointer accent-emerald-500"
                    />
                    <span>Enviarme novedades y ofertas exclusivas por correo electrónico</span>
                  </label>
                </div>
              </section>

              {/* SECCIÓN 2: ENTREGA */}
              <section className="space-y-4 pt-2">
                <h2 className="text-lg font-heading font-extrabold uppercase tracking-tight text-white">
                  Entrega
                </h2>

                <div className="space-y-3">
                  {/* País / Región */}
                  <div>
                    <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1">
                      País / Región
                    </label>
                    <select
                      value={pais}
                      onChange={e => setPais(e.target.value)}
                      className="w-full rounded-xl border border-neutral-800 bg-neutral-900/90 px-4 py-3 text-sm text-white focus:border-emerald-500 focus:outline-none transition cursor-pointer"
                    >
                      <option value="Uruguay">Uruguay 🇺🇾</option>
                      <option value="Argentina">Argentina 🇦🇷</option>
                      <option value="Brasil">Brasil 🇧🇷</option>
                      <option value="Chile">Chile 🇨🇱</option>
                      <option value="España">España 🇪🇸</option>
                      <option value="Estados Unidos">Estados Unidos 🇺🇸</option>
                    </select>
                  </div>

                  {/* Nombre y Apellidos */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="Nombre"
                      value={nombre}
                      onChange={e => setNombre(e.target.value)}
                      className="w-full rounded-xl border border-neutral-800 bg-neutral-900/90 px-4 py-3 text-sm text-white placeholder-neutral-500 focus:border-emerald-500 focus:outline-none transition"
                    />
                    <input
                      type="text"
                      required
                      placeholder="Apellidos"
                      value={apellidos}
                      onChange={e => setApellidos(e.target.value)}
                      className="w-full rounded-xl border border-neutral-800 bg-neutral-900/90 px-4 py-3 text-sm text-white placeholder-neutral-500 focus:border-emerald-500 focus:outline-none transition"
                    />
                  </div>

                  {/* Dirección */}
                  <input
                    type="text"
                    required
                    placeholder="Dirección (Calle y número de puerta)"
                    value={direccion}
                    onChange={e => setDireccion(e.target.value)}
                    className="w-full rounded-xl border border-neutral-800 bg-neutral-900/90 px-4 py-3 text-sm text-white placeholder-neutral-500 focus:border-emerald-500 focus:outline-none transition"
                  />

                  {/* Casa, apartamento, etc */}
                  <input
                    type="text"
                    placeholder="Casa, apartamento, piso, timbre (opcional)"
                    value={apartamento}
                    onChange={e => setApartamento(e.target.value)}
                    className="w-full rounded-xl border border-neutral-800 bg-neutral-900/90 px-4 py-3 text-sm text-white placeholder-neutral-500 focus:border-emerald-500 focus:outline-none transition"
                  />

                  {/* Código postal, Ciudad, Departamento */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <input
                      type="text"
                      placeholder="Código postal (opcional)"
                      value={codigoPostal}
                      onChange={e => setCodigoPostal(e.target.value)}
                      className="w-full rounded-xl border border-neutral-800 bg-neutral-900/90 px-4 py-3 text-sm text-white placeholder-neutral-500 focus:border-emerald-500 focus:outline-none transition"
                    />
                    <input
                      type="text"
                      required
                      placeholder="Ciudad / Localidad"
                      value={ciudad}
                      onChange={e => setCiudad(e.target.value)}
                      className="w-full rounded-xl border border-neutral-800 bg-neutral-900/90 px-4 py-3 text-sm text-white placeholder-neutral-500 focus:border-emerald-500 focus:outline-none transition"
                    />
                    <select
                      value={departamento}
                      onChange={e => setDepartamento(e.target.value)}
                      className="w-full rounded-xl border border-neutral-800 bg-neutral-900/90 px-4 py-3 text-sm text-white focus:border-emerald-500 focus:outline-none transition cursor-pointer"
                    >
                      {DEPARTAMENTOS_URUGUAY.map(dep => (
                        <option key={dep} value={dep}>
                          {dep}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Teléfono con Componente Internacional y Validación */}
                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                      Teléfono móvil / WhatsApp para coordinar despacho
                    </label>
                    <PhoneInput
                      id="checkout-tel"
                      value={telefono}
                      onChange={(formatted, isValid) => {
                        setTelefono(formatted)
                        setTelefonoValido(isValid)
                      }}
                      required
                      defaultCountryCode="UY"
                      placeholder="099 123 456"
                    />
                  </div>

                  {/* Guardar info checkbox */}
                  <label className="flex items-center gap-2.5 cursor-pointer select-none text-xs text-neutral-400 pt-1">
                    <input
                      type="checkbox"
                      checked={guardarInfo}
                      onChange={e => setGuardarInfo(e.target.checked)}
                      className="size-4 rounded border-neutral-700 bg-neutral-800 text-emerald-500 focus:ring-0 focus:ring-offset-0 cursor-pointer accent-emerald-500"
                    />
                    <span>Guardar mi información y consultar más rápidamente la próxima vez</span>
                  </label>
                </div>
              </section>

              {/* SECCIÓN 3: MÉTODOS DE ENVÍO */}
              <section className="space-y-3 pt-2">
                <h2 className="text-lg font-heading font-extrabold uppercase tracking-tight text-white">
                  Métodos de envío
                </h2>

                <div className="space-y-2.5">
                  <div
                    onClick={() => setMetodoEnvio('gratis')}
                    className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition ${
                      metodoEnvio === 'gratis'
                        ? 'border-emerald-500 bg-emerald-500/10'
                        : 'border-neutral-800 bg-neutral-900/60 hover:border-neutral-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="metodoEnvio"
                        checked={metodoEnvio === 'gratis'}
                        onChange={() => setMetodoEnvio('gratis')}
                        className="accent-emerald-500 size-4 cursor-pointer"
                      />
                      <div>
                        <p className="text-sm font-bold text-white">
                          Envío a todo Uruguay (DAC / UES / Mirtrans)
                        </p>
                        <p className="text-xs text-neutral-400">
                          Entrega en 24 a 48 hs hábiles directo en tu domicilio o retiro en agencia.
                        </p>
                      </div>
                    </div>
                    <span className="font-heading text-xs font-black text-emerald-400 uppercase tracking-wider">
                      GRATIS
                    </span>
                  </div>

                  <div
                    onClick={() => setMetodoEnvio('cadeteria')}
                    className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition ${
                      metodoEnvio === 'cadeteria'
                        ? 'border-emerald-500 bg-emerald-500/10'
                        : 'border-neutral-800 bg-neutral-900/60 hover:border-neutral-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="metodoEnvio"
                        checked={metodoEnvio === 'cadeteria'}
                        onChange={() => setMetodoEnvio('cadeteria')}
                        className="accent-emerald-500 size-4 cursor-pointer"
                      />
                      <div>
                        <p className="text-sm font-bold text-white">
                          Cadetería Express (Montevideo y Ciudad de la Costa)
                        </p>
                        <p className="text-xs text-neutral-400">
                          Comprando antes de las 14:00 hs lo recibís en el día.
                        </p>
                      </div>
                    </div>
                    <span className="font-heading text-xs font-black text-emerald-400 uppercase tracking-wider">
                      GRATIS
                    </span>
                  </div>

                  <div
                    onClick={() => setMetodoEnvio('contra_entrega')}
                    className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition ${
                      metodoEnvio === 'contra_entrega'
                        ? 'border-emerald-500 bg-emerald-500/10'
                        : 'border-neutral-800 bg-neutral-900/60 hover:border-neutral-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="metodoEnvio"
                        checked={metodoEnvio === 'contra_entrega'}
                        onChange={() => setMetodoEnvio('contra_entrega')}
                        className="accent-emerald-500 size-4 cursor-pointer"
                      />
                      <div>
                        <p className="text-sm font-bold text-white">
                          Envío contra entrega (solo flete)
                        </p>
                        <p className="text-xs text-neutral-400">
                          El costo del envío se abona al momento de la entrega, directamente al transportista.
                        </p>
                      </div>
                    </div>
                    <span className="font-heading text-[11px] font-bold text-neutral-400 uppercase">
                      A PAGAR EN DESTINO
                    </span>
                  </div>
                </div>
              </section>

              {/* SECCIÓN 4: PAGO */}
              <section className="space-y-3 pt-2">
                <div>
                  <h2 className="text-lg font-heading font-extrabold uppercase tracking-tight text-white">
                    Pago
                  </h2>
                  <p className="text-xs text-neutral-400">
                    Todas las transacciones son seguras y están encriptadas.
                  </p>
                </div>

                <div className="space-y-3">
                  {/* Mercado Pago */}
                  <div
                    onClick={() => setMetodoPago('mercadopago')}
                    className={`rounded-2xl border transition overflow-hidden cursor-pointer ${
                      metodoPago === 'mercadopago'
                        ? 'border-sky-500 bg-sky-500/5'
                        : 'border-neutral-800 bg-neutral-900/60 hover:border-neutral-700'
                    }`}
                  >
                    <div className="flex items-center justify-between p-4">
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="metodoPago"
                          checked={metodoPago === 'mercadopago'}
                          onChange={() => setMetodoPago('mercadopago')}
                          className="accent-sky-500 size-4 cursor-pointer"
                        />
                        <div className="flex items-center gap-2">
                          <CreditCard className="size-4 text-sky-400" />
                          <span className="text-sm font-bold text-white">
                            Mercado Pago (Tarjetas, Abitab, RedPagos)
                          </span>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-sky-500/20 text-sky-400 px-2 py-0.5 rounded-full border border-sky-500/30">
                        Hasta 12 cuotas
                      </span>
                    </div>

                    {metodoPago === 'mercadopago' && (
                      <div className="px-4 pb-4 pt-1 text-xs text-neutral-400 border-t border-sky-500/20 space-y-2">
                        <p>
                          Aceptamos Visa, Mastercard, OCA, Lider, Diners, prepagas y efectivo en redes Abitab o RedPagos de todo el país.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Transferencia Bancaria */}
                  <div
                    onClick={() => setMetodoPago('transferencia')}
                    className={`rounded-2xl border transition overflow-hidden cursor-pointer ${
                      metodoPago === 'transferencia'
                        ? 'border-emerald-500 bg-emerald-500/5'
                        : 'border-neutral-800 bg-neutral-900/60 hover:border-neutral-700'
                    }`}
                  >
                    <div className="flex items-center justify-between p-4">
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="metodoPago"
                          checked={metodoPago === 'transferencia'}
                          onChange={() => setMetodoPago('transferencia')}
                          className="accent-emerald-500 size-4 cursor-pointer"
                        />
                        <div className="flex items-center gap-2">
                          <Building2 className="size-4 text-emerald-400" />
                          <span className="text-sm font-bold text-white">
                            Transferencia Bancaria
                          </span>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/30">
                        Itaú / Santander / Prex
                      </span>
                    </div>

                    {metodoPago === 'transferencia' && (
                      <div className="px-4 pb-4 pt-2 text-xs text-neutral-300 border-t border-emerald-500/20 space-y-2.5 font-mono">
                        <div className="p-3 rounded-xl bg-neutral-950/80 border border-neutral-800 space-y-1">
                          <p className="text-white font-bold">Itaú 4704307</p>
                          <p className="text-neutral-400 text-[11px]">Ignacio Duarte (Caja de Ahorros UYU)</p>
                        </div>
                        <div className="p-3 rounded-xl bg-neutral-950/80 border border-neutral-800 space-y-1">
                          <p className="text-white font-bold">Santander 00000-1665111</p>
                          <p className="text-neutral-400 text-[11px]">Sucursal 26 - Tacuarembó • Moneda: UYU</p>
                        </div>
                        <div className="p-3 rounded-xl bg-neutral-950/80 border border-neutral-800 space-y-1">
                          <p className="text-white font-bold">Prex: 1158143</p>
                        </div>
                        <p className="text-neutral-400 font-sans text-[11px] pt-1">
                          Al hacer clic en &quot;Finalizar el pedido&quot;, te confirmaremos el número de orden para que puedas enviarnos el comprobante por WhatsApp.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Efectivo contra entrega */}
                  <div
                    onClick={() => setMetodoPago('efectivo')}
                    className={`rounded-2xl border transition overflow-hidden cursor-pointer ${
                      metodoPago === 'efectivo'
                        ? 'border-emerald-500 bg-emerald-500/5'
                        : 'border-neutral-800 bg-neutral-900/60 hover:border-neutral-700'
                    }`}
                  >
                    <div className="flex items-center justify-between p-4">
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="metodoPago"
                          checked={metodoPago === 'efectivo'}
                          onChange={() => setMetodoPago('efectivo')}
                          className="accent-emerald-500 size-4 cursor-pointer"
                        />
                        <div className="flex items-center gap-2">
                          <Banknote className="size-4 text-emerald-400" />
                          <span className="text-sm font-bold text-white">
                            Pago en Efectivo al Recibir
                          </span>
                        </div>
                      </div>
                    </div>

                    {metodoPago === 'efectivo' && (
                      <div className="px-4 pb-4 pt-1 text-xs text-neutral-400 border-t border-emerald-500/20">
                        Abonás en mano el total exacto al cadete o transportista cuando te entregue tu paquete.
                      </div>
                    )}
                  </div>
                </div>
              </section>

              {/* SECCIÓN 5: DIRECCIÓN DE FACTURACIÓN */}
              <section className="space-y-3 pt-2">
                <h2 className="text-lg font-heading font-extrabold uppercase tracking-tight text-white">
                  Dirección de facturación
                </h2>

                <div className="space-y-2 border border-neutral-800 rounded-2xl p-4 bg-neutral-900/60">
                  <label className="flex items-center gap-3 cursor-pointer select-none text-sm text-white">
                    <input
                      type="radio"
                      name="dirFacturacion"
                      checked={dirFacturacion === 'misma'}
                      onChange={() => setDirFacturacion('misma')}
                      className="accent-emerald-500 size-4"
                    />
                    <span>La misma dirección de envío</span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer select-none text-sm text-white pt-2 border-t border-neutral-800">
                    <input
                      type="radio"
                      name="dirFacturacion"
                      checked={dirFacturacion === 'distinta'}
                      onChange={() => setDirFacturacion('distinta')}
                      className="accent-emerald-500 size-4"
                    />
                    <span>Usar una dirección de facturación distinta</span>
                  </label>
                </div>
              </section>

              {/* BOTÓN FINALIZAR PEDIDO */}
              <div className="pt-4 space-y-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-heading font-black text-sm uppercase tracking-wider transition-all duration-300 hover:scale-[1.01] shadow-xl shadow-emerald-500/20 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <span className="size-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      <span>Procesando tu pedido...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="size-4" />
                      <span>Finalizar el pedido • ${total.toLocaleString('es-UY')} UYU</span>
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-2 text-xs text-neutral-500 pt-2">
                  <ShieldCheck className="size-4 text-emerald-400" />
                  <span>Compra protegida y respaldada por Seal Step Uruguay</span>
                </div>
              </div>

              {/* FOOTER DE ENLACES LEGALES */}
              <footer className="pt-6 border-t border-neutral-800/80 flex flex-wrap gap-x-4 gap-y-2 text-xs text-neutral-500">
                <Link href="/marca" className="hover:text-neutral-300 transition underline underline-offset-4">
                  Política de reembolso
                </Link>
                <Link href="/marca" className="hover:text-neutral-300 transition underline underline-offset-4">
                  Envío
                </Link>
                <Link href="/marca" className="hover:text-neutral-300 transition underline underline-offset-4">
                  Política de privacidad
                </Link>
                <Link href="/marca" className="hover:text-neutral-300 transition underline underline-offset-4">
                  Términos del servicio
                </Link>
                <Link href="/marca" className="hover:text-neutral-300 transition underline underline-offset-4">
                  Contacto
                </Link>
              </footer>
            </div>

            {/* Columna Derecha: Resumen del Pedido (Sidebar Sticky) */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl border border-neutral-800 bg-neutral-900/70 p-5 sm:p-6 space-y-6 sticky top-24 backdrop-blur-md">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
                  <h3 className="font-heading font-extrabold uppercase tracking-tight text-white text-base">
                    Resumen del pedido
                  </h3>
                  <span className="text-xs font-bold text-neutral-400">
                    {totalCount} {totalCount === 1 ? 'par' : 'pares'}
                  </span>
                </div>

                {/* Lista de productos */}
                <div className="space-y-3.5 max-h-80 overflow-y-auto pr-1 custom-scrollbar">
                  {items.map(item => {
                    const img = item.producto.imagenes[0]?.src || '/images/hero-sneaker.png'
                    const unitPrice = parsePrecioUYU(item.producto.precio)
                    const itemTotal = unitPrice * (item.cantidad || 1)

                    return (
                      <div key={item.id} className="flex items-center gap-3.5">
                        <div className="relative size-16 shrink-0 rounded-xl border border-neutral-800 bg-neutral-950 overflow-hidden">
                          <Image
                            src={img}
                            alt={item.producto.nombre}
                            fill
                            sizes="64px"
                            className="object-cover"
                          />
                          <span className="absolute -top-1 -right-1 size-5 rounded-full bg-neutral-800 border border-neutral-700 text-[10px] font-bold text-white flex items-center justify-center">
                            {item.cantidad}
                          </span>
                        </div>

                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-white uppercase tracking-tight truncate">
                            {item.producto.nombre}
                          </h4>
                          <p className="text-[11px] text-neutral-400">
                            Talle: <span className="text-white font-semibold">{item.talle}</span>
                            {item.color ? ` • ${item.color}` : ''}
                          </p>
                        </div>

                        <span className="text-xs font-mono font-bold text-white shrink-0">
                          ${itemTotal.toLocaleString('es-UY')}
                        </span>
                      </div>
                    )
                  })}
                </div>

                {/* Widget de Descuentos Mayoristas */}
                <div className="pt-2 border-t border-neutral-800 space-y-2">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                    <Package className="size-3.5" />
                    <span>Precio por cantidad</span>
                  </div>
                  <div className="space-y-1">
                    {reglasMayorista.map(regla => {
                      const isActive = cantidadTotalPares >= regla.cantidad_minima &&
                        (regla.cantidad_maxima === null || cantidadTotalPares <= regla.cantidad_maxima)
                      const label = regla.cantidad_maxima
                        ? `${regla.cantidad_minima}–${regla.cantidad_maxima} pares`
                        : `${regla.cantidad_minima}+ pares`
                      return (
                        <div key={regla.id} className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs transition ${
                          isActive
                            ? 'bg-emerald-500/15 border border-emerald-500/40'
                            : 'bg-neutral-950/60 border border-neutral-800/60'
                        }`}>
                          <div className="flex items-center gap-2">
                            {isActive && <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />}
                            <span className={isActive ? 'text-emerald-300 font-bold' : 'text-neutral-400'}>{label}</span>
                          </div>
                          <span className={`font-mono font-bold ${
                            regla.valor_descuento > 0
                              ? isActive ? 'text-emerald-400' : 'text-neutral-500'
                              : 'text-neutral-500'
                          }`}>
                            {regla.valor_descuento > 0 ? `${regla.valor_descuento}% OFF` : 'Precio normal'}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                  {proximaRegla && proximaRegla.valor_descuento > 0 && (
                    <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-[10px] text-amber-400">
                      <TrendingUp className="size-3 shrink-0" />
                      <span>Agregá <strong>{paresParaProxima} {paresParaProxima === 1 ? 'par' : 'pares'} más</strong> y obtenés {proximaRegla.valor_descuento}% OFF</span>
                    </div>
                  )}
                  {reglaActiva && descuentoMayorista > 0 && (
                    <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-400">
                      <Percent className="size-3.5 shrink-0" />
                      <span><strong>{descuentoMayorista}% OFF mayorista</strong> aplicado automáticamente</span>
                    </div>
                  )}
                </div>

                {/* Cupón de descuento (opcional - solo si es mayor que el descuento mayorista) */}
                <div className="pt-2 border-t border-neutral-800">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-2">
                    <Tag className="size-3.5" />
                    <span>Código de descuento</span>
                  </div>
                  {cuponAplicado ? (
                    <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs">
                      <Tag className="size-4 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <span className="font-bold font-mono">{cuponAplicado}</span>
                        <span className="text-neutral-400 ml-1">({descuentoPorcentaje}% OFF)</span>
                        {descuentoMayorista >= descuentoPorcentaje && (
                          <p className="text-amber-400/80 text-[10px] mt-0.5">El descuento mayorista es mayor y se aplica automáticamente</p>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={quitarCupon}
                        className="text-neutral-400 hover:text-red-400 transition"
                      >
                        <X className="size-3.5" />
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-1.5">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Código de descuento"
                          value={cupon}
                          onChange={e => {
                            setCupon(e.target.value.toUpperCase())
                            setCuponError(null)
                          }}
                          onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), aplicarCupon())}
                          className="flex-1 rounded-xl border border-neutral-800 bg-neutral-950 px-3 py-2.5 text-xs text-white placeholder-neutral-500 focus:border-emerald-500 focus:outline-none transition font-mono uppercase"
                        />
                        <button
                          type="button"
                          onClick={aplicarCupon}
                          className="px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-bold text-white transition"
                        >
                          Aplicar
                        </button>
                      </div>
                      {cuponError && (
                        <p className="text-red-400 text-[11px] font-medium pl-1">{cuponError}</p>
                      )}
                    </div>
                  )}
                </div>

                {/* Desglose de totales */}
                <div className="space-y-2.5 pt-2 border-t border-neutral-800 text-xs">
                  <div className="flex justify-between text-neutral-400">
                    <span>Subtotal</span>
                    <span className="font-mono text-white font-medium">
                      ${subtotal.toLocaleString('es-UY')}
                    </span>
                  </div>

                  {descuentoFinal > 0 && (
                    <div className="flex justify-between text-emerald-400 font-semibold">
                      <span>
                        {descuentoMayorista > descuentoPorcentaje
                          ? `Descuento mayorista (${descuentoFinal}%)`
                          : `Descuento cupón (${descuentoFinal}%)`
                        }
                      </span>
                      <span className="font-mono">-${montoDescuento.toLocaleString('es-UY')}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-neutral-400">
                    <span>Envío</span>
                    <span className="font-bold text-emerald-400 uppercase tracking-wider">
                      GRATIS
                    </span>
                  </div>

                  <div className="flex justify-between items-baseline pt-3 border-t border-neutral-800 text-base">
                    <span className="font-heading font-black text-white uppercase">Total</span>
                    <div className="text-right">
                      <span className="text-xs font-semibold text-neutral-400 mr-1.5">UYU</span>
                      <span className="font-heading text-2xl font-black text-white tracking-tight">
                        ${total.toLocaleString('es-UY')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Sellos de Confianza */}
                <div className="p-3.5 rounded-2xl bg-neutral-950/60 border border-neutral-800/80 space-y-2 text-[11px] text-neutral-400">
                  <div className="flex items-center gap-2 text-neutral-300">
                    <CheckCircle2 className="size-3.5 text-emerald-400 shrink-0" />
                    <span>Envíos seguros a todo Uruguay por DAC, UES y Mirtrans</span>
                  </div>
                  <div className="flex items-center gap-2 text-neutral-300">
                    <CheckCircle2 className="size-3.5 text-emerald-400 shrink-0" />
                    <span>Cambio de talle garantizado sin complicaciones</span>
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}
      </main>
    </div>
  )
}
