'use client'

import { useState, useRef, useEffect } from 'react'
import { AsYouType, isValidPhoneNumber, parsePhoneNumber, CountryCode } from 'libphonenumber-js'
import { POPULAR_COUNTRIES, CountryInfo, DEFAULT_COUNTRY } from '@/lib/countries'
import { ChevronDown, CheckCircle2, AlertCircle, Search } from 'lucide-react'

interface PhoneInputProps {
  id?: string
  value: string
  onChange: (formattedValue: string, isValid: boolean, country: CountryInfo) => void
  required?: boolean
  disabled?: boolean
  className?: string
  placeholder?: string
  defaultCountryCode?: string
}

export function PhoneInput({
  id = 'phone-input',
  value,
  onChange,
  required = false,
  disabled = false,
  className = '',
  placeholder,
  defaultCountryCode = 'UY',
}: PhoneInputProps) {
  const [selectedCountry, setSelectedCountry] = useState<CountryInfo>(() => {
    return POPULAR_COUNTRIES.find(c => c.code === defaultCountryCode) || DEFAULT_COUNTRY
  })
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [nationalDigits, setNationalDigits] = useState('')
  const [touched, setTouched] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Sincronizar valor externo si cambia
  useEffect(() => {
    if (!value) {
      setNationalDigits('')
      return
    }
    // Si viene con dial code
    if (value.startsWith('+')) {
      // Tratar de inferir el país
      const matched = POPULAR_COUNTRIES.find(c => value.startsWith(c.dialCode))
      if (matched && matched.code !== selectedCountry.code) {
        setSelectedCountry(matched)
        const digits = value.replace(matched.dialCode, '').trim()
        setNationalDigits(digits)
        return
      }
    }
  }, [value, selectedCountry.code])

  // Cerrar dropdown al hacer click afuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Filtrar países
  const filteredCountries = POPULAR_COUNTRIES.filter(c => {
    const q = searchQuery.toLowerCase().trim()
    if (!q) return true
    return (
      c.name.toLowerCase().includes(q) ||
      c.dialCode.includes(q) ||
      c.code.toLowerCase().includes(q)
    )
  })

  // Helper para validar número
  const checkValidity = (digits: string, country: CountryInfo) => {
    const clean = digits.trim()
    if (!clean || clean.replace(/\D/g, '').length < 4) {
      return { valid: false, formattedFull: '' }
    }
    try {
      const parsed = parsePhoneNumber(clean, country.code as CountryCode)
      if (parsed && parsed.isValid()) {
        return { valid: true, formattedFull: parsed.formatInternational() }
      }
    } catch {
      // Ignorar error de parsing y probar fallback
    }
    const testE164 = `${country.dialCode}${clean.replace(/\D/g, '')}`
    const valid = isValidPhoneNumber(testE164, country.code as CountryCode)
    return { valid, formattedFull: `${country.dialCode} ${clean}` }
  }

  const { valid: isValid } = checkValidity(nationalDigits, selectedCountry)

  const handleInputChange = (raw: string) => {
    setTouched(true)
    const formatter = new AsYouType(selectedCountry.code as CountryCode)
    const formatted = formatter.input(raw)
    setNationalDigits(formatted)

    const result = checkValidity(raw, selectedCountry)
    onChange(result.formattedFull || (raw ? `${selectedCountry.dialCode} ${raw}` : ''), result.valid, selectedCountry)
  }

  const handleSelectCountry = (country: CountryInfo) => {
    setSelectedCountry(country)
    setIsOpen(false)
    setSearchQuery('')

    const formatter = new AsYouType(country.code as CountryCode)
    const formatted = formatter.input(nationalDigits)
    setNationalDigits(formatted)

    const result = checkValidity(nationalDigits, country)
    onChange(result.formattedFull || (nationalDigits ? `${country.dialCode} ${nationalDigits}` : ''), result.valid, country)
    setTimeout(() => inputRef.current?.focus(), 50)
  }

  return (
    <div className={`space-y-1.5 ${className}`}>
      <div className="relative flex rounded-xl border border-neutral-700/80 bg-neutral-800/60 focus-within:border-emerald-500/80 focus-within:ring-1 focus-within:ring-emerald-500/30 transition-all duration-200">
        {/* Selector de País */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            disabled={disabled}
            onClick={() => setIsOpen(p => !p)}
            className="flex items-center gap-1.5 h-full px-3 py-3 border-r border-neutral-700/60 hover:bg-neutral-700/40 text-sm font-medium text-white transition rounded-l-xl select-none"
            aria-label="Seleccionar código de país"
          >
            <span className="text-lg leading-none" role="img" aria-label={selectedCountry.name}>
              {selectedCountry.flag}
            </span>
            <span className="text-xs font-mono font-bold text-neutral-300">
              {selectedCountry.dialCode}
            </span>
            <ChevronDown className={`size-3 text-neutral-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Menú desplegable con buscador */}
          {isOpen && (
            <div className="absolute top-full left-0 z-50 mt-1.5 w-72 rounded-2xl border border-neutral-700 bg-neutral-900/98 backdrop-blur-xl shadow-2xl p-2 animate-in fade-in zoom-in-95 duration-150">
              {/* Buscador de países */}
              <div className="relative mb-2">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Buscar país o prefijo..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full bg-neutral-800/90 border border-neutral-700/70 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder:text-neutral-500 outline-none focus:border-emerald-500/60"
                  autoFocus
                />
              </div>

              {/* Lista scrolleable */}
              <div className="max-h-56 overflow-y-auto space-y-0.5 pr-1 custom-scrollbar">
                {filteredCountries.length === 0 ? (
                  <p className="text-xs text-neutral-500 py-3 text-center">No se encontraron países</p>
                ) : (
                  filteredCountries.map(c => {
                    const isSelected = c.code === selectedCountry.code
                    return (
                      <button
                        key={c.code}
                        type="button"
                        onClick={() => handleSelectCountry(c)}
                        className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs transition ${
                          isSelected
                            ? 'bg-emerald-500/20 text-emerald-400 font-bold'
                            : 'text-neutral-300 hover:bg-neutral-800 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <span className="text-base">{c.flag}</span>
                          <span className="truncate">{c.name}</span>
                        </div>
                        <span className="font-mono text-[11px] font-semibold text-neutral-400 shrink-0 ml-2">
                          {c.dialCode}
                        </span>
                      </button>
                    )
                  })
                )}
              </div>
            </div>
          )}
        </div>

        {/* Campo del número de teléfono */}
        <div className="relative flex-1">
          <input
            ref={inputRef}
            id={id}
            type="tel"
            autoComplete="tel-national"
            required={required}
            disabled={disabled}
            placeholder={placeholder || selectedCountry.placeholder}
            value={nationalDigits}
            onChange={e => handleInputChange(e.target.value)}
            className="w-full h-full bg-transparent py-3 pl-3 pr-10 text-sm text-white placeholder-neutral-500 outline-none font-mono"
          />

          {/* Badge de validación en vivo */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
            {touched && nationalDigits.replace(/\D/g, '').length >= 4 && (
              isValid ? (
                <div className="flex items-center gap-1 text-emerald-400" title="Número real válido">
                  <CheckCircle2 className="size-4 animate-in zoom-in-75 duration-200" />
                </div>
              ) : (
                <div className="flex items-center gap-1 text-amber-400/80" title="Verificá los dígitos">
                  <AlertCircle className="size-4" />
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* Mensaje de ayuda / validación en tiempo real */}
      {touched && nationalDigits.trim() && (
        <div className="flex items-center justify-between text-[11px] px-1">
          {isValid ? (
            <span className="text-emerald-400 flex items-center gap-1 font-medium">
              <span>✓ Teléfono de {selectedCountry.name} verificado y válido</span>
            </span>
          ) : nationalDigits.replace(/\D/g, '').length >= 4 ? (
            <span className="text-amber-400/90 flex items-center gap-1 font-medium">
              <span>⚠️ Formato incompleto para {selectedCountry.name} (ej: {selectedCountry.placeholder})</span>
            </span>
          ) : null}
        </div>
      )}
    </div>
  )
}
