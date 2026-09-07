import { NextResponse } from 'next/server'
import { parsePhoneNumber, isValidPhoneNumber, isPossiblePhoneNumber, CountryCode } from 'libphonenumber-js'
import { POPULAR_COUNTRIES, DEFAULT_COUNTRY } from '@/lib/countries'

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({})) as { phone?: string; country?: string }
    return handleValidation(body.phone, body.country)
  } catch {
    return NextResponse.json({ valid: false, error: 'Error al procesar la solicitud' }, { status: 400 })
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const phone = searchParams.get('phone') || ''
  const country = searchParams.get('country') || 'UY'
  return handleValidation(phone, country)
}

function handleValidation(rawPhone?: string, countryCode?: string) {
  if (!rawPhone || !rawPhone.trim()) {
    return NextResponse.json(
      {
        valid: false,
        error: 'Debes proporcionar un número de teléfono.',
      },
      { status: 400 }
    )
  }

  const cleanPhone = rawPhone.trim()
  const targetCountry = (countryCode?.toUpperCase() || 'UY') as CountryCode
  const countryInfo = POPULAR_COUNTRIES.find(c => c.code === targetCountry) || DEFAULT_COUNTRY

  try {
    // Si no tiene prefijo '+', intentamos parsear con el país por defecto
    const phoneParsed = parsePhoneNumber(cleanPhone, targetCountry)

    if (!phoneParsed) {
      return NextResponse.json({
        valid: false,
        possible: false,
        error: `El formato del número no corresponde a un teléfono de ${countryInfo.name}.`,
      })
    }

    const isValid = phoneParsed.isValid()
    const isPossible = phoneParsed.isPossible()
    const detectedCountryCode = phoneParsed.country || targetCountry
    const detectedCountryInfo = POPULAR_COUNTRIES.find(c => c.code === detectedCountryCode) || {
      code: detectedCountryCode,
      name: detectedCountryCode,
      dialCode: `+${phoneParsed.countryCallingCode}`,
      flag: '🌐',
      placeholder: '',
    }

    const numberType = phoneParsed.getType() // e.g. 'MOBILE', 'FIXED_LINE', etc.
    let typeLabel = 'Línea telefónica'
    if (numberType === 'MOBILE') typeLabel = 'Móvil / WhatsApp'
    else if (numberType === 'FIXED_LINE') typeLabel = 'Teléfono Fijo'
    else if (numberType === 'FIXED_LINE_OR_MOBILE') typeLabel = 'Fijo / Celular'

    if (!isValid) {
      let errorReason = `El número no es válido para ${detectedCountryInfo.name}.`
      if (!isPossible) {
        errorReason = `El número tiene una cantidad de dígitos incorrecta para ${detectedCountryInfo.name}.`
      } else if (detectedCountryCode === 'UY' && !phoneParsed.nationalNumber.startsWith('9')) {
        errorReason = 'Los números celulares en Uruguay deben comenzar con 09X (ej: 099 123 456).'
      }

      return NextResponse.json({
        valid: false,
        possible: isPossible,
        country: detectedCountryCode,
        countryName: detectedCountryInfo.name,
        flag: detectedCountryInfo.flag,
        error: errorReason,
      })
    }

    return NextResponse.json({
      valid: true,
      possible: true,
      country: detectedCountryCode,
      countryName: detectedCountryInfo.name,
      flag: detectedCountryInfo.flag,
      dialCode: `+${phoneParsed.countryCallingCode}`,
      nationalNumber: phoneParsed.nationalNumber,
      formatE164: phoneParsed.number, // e.g. "+59891234567"
      formatInternational: phoneParsed.formatInternational(), // e.g. "+598 91 234 567"
      formatNational: phoneParsed.formatNational(), // e.g. "091 234 567"
      type: numberType || 'MOBILE',
      typeLabel,
    })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Número inválido'
    return NextResponse.json({
      valid: false,
      possible: false,
      error: `Formato no reconocido: ${message}`,
    })
  }
}
