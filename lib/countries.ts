export interface CountryInfo {
  code: string // ISO 3166-1 alpha-2 (e.g., 'UY')
  name: string
  dialCode: string // e.g., '+598'
  flag: string
  placeholder: string
}

export const POPULAR_COUNTRIES: CountryInfo[] = [
  { code: 'UY', name: 'Uruguay', dialCode: '+598', flag: '🇺🇾', placeholder: '99 123 456' },
  { code: 'AR', name: 'Argentina', dialCode: '+54', flag: '🇦🇷', placeholder: '9 11 1234 5678' },
  { code: 'BR', name: 'Brasil', dialCode: '+55', flag: '🇧🇷', placeholder: '11 91234-5678' },
  { code: 'CL', name: 'Chile', dialCode: '+56', flag: '🇨🇱', placeholder: '9 1234 5678' },
  { code: 'PY', name: 'Paraguay', dialCode: '+595', flag: '🇵🇾', placeholder: '981 123456' },
  { code: 'CO', name: 'Colombia', dialCode: '+57', flag: '🇨🇴', placeholder: '300 123 4567' },
  { code: 'MX', name: 'México', dialCode: '+52', flag: '🇲🇽', placeholder: '55 1234 5678' },
  { code: 'PE', name: 'Perú', dialCode: '+51', flag: '🇵🇪', placeholder: '912 345 678' },
  { code: 'ES', name: 'España', dialCode: '+34', flag: '🇪🇸', placeholder: '612 34 56 78' },
  { code: 'US', name: 'Estados Unidos', dialCode: '+1', flag: '🇺🇸', placeholder: '(555) 123-4567' },
  { code: 'BO', name: 'Bolivia', dialCode: '+591', flag: '🇧🇴', placeholder: '71234567' },
  { code: 'EC', name: 'Ecuador', dialCode: '+593', flag: '🇪🇨', placeholder: '99 123 4567' },
  { code: 'VE', name: 'Venezuela', dialCode: '+58', flag: '🇻🇪', placeholder: '412 1234567' },
  { code: 'PA', name: 'Panamá', dialCode: '+507', flag: '🇵🇦', placeholder: '6123 4567' },
  { code: 'CR', name: 'Costa Rica', dialCode: '+506', flag: '🇨🇷', placeholder: '8123 4567' },
  { code: 'DO', name: 'Rep. Dominicana', dialCode: '+1', flag: '🇩🇴', placeholder: '809 123 4567' },
  { code: 'IT', name: 'Italia', dialCode: '+39', flag: '🇮🇹', placeholder: '312 345 6789' },
  { code: 'FR', name: 'Francia', dialCode: '+33', flag: '🇫🇷', placeholder: '6 12 34 56 78' },
  { code: 'DE', name: 'Alemania', dialCode: '+49', flag: '🇩🇪', placeholder: '151 23456789' },
  { code: 'GB', name: 'Reino Unido', dialCode: '+44', flag: '🇬🇧', placeholder: '7123 456789' },
  { code: 'CA', name: 'Canadá', dialCode: '+1', flag: '🇨🇦', placeholder: '(555) 123-4567' },
  { code: 'AU', name: 'Australia', dialCode: '+61', flag: '🇦🇺', placeholder: '412 345 678' },
  { code: 'PT', name: 'Portugal', dialCode: '+351', flag: '🇵🇹', placeholder: '912 345 678' },
]

export const DEFAULT_COUNTRY = POPULAR_COUNTRIES[0] // Uruguay
