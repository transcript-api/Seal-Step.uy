export const ADMIN_COOKIE_NAME = 'sealstep_admin_session'

const DEFAULT_SECRET = 'seal-step-secret-session-token-key-2026'
const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || DEFAULT_SECRET

export const DEFAULT_ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@sealstep.uy'
export const DEFAULT_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'SealStep2026!'

function stringToUint8Array(str: string): Uint8Array {
  return new TextEncoder().encode(str)
}

function arrayBufferToBase64Url(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer)
  let binary = ''
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function base64UrlToString(b64: string): string {
  let str = b64.replace(/-/g, '+').replace(/_/g, '/')
  while (str.length % 4) {
    str += '='
  }
  return atob(str)
}

async function getHmacKey(): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    'raw',
    stringToUint8Array(SESSION_SECRET),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  )
}

/**
 * Genera un token firmado con HMAC-SHA256 (Web Crypto API, compatible con Edge y Node).
 */
export async function createAdminToken(email: string): Promise<string> {
  const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 días
  const json = JSON.stringify({ email, expiresAt })
  const payload = btoa(json).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')

  const key = await getHmacKey()
  const sigBuffer = await crypto.subtle.sign('HMAC', key, stringToUint8Array(payload))
  const signature = arrayBufferToBase64Url(sigBuffer)

  return `${payload}.${signature}`
}

/**
 * Valida la firma del token y su expiración.
 */
export async function verifyAdminToken(token: string | undefined | null): Promise<boolean> {
  if (!token) return false

  try {
    const parts = token.split('.')
    if (parts.length !== 2) return false

    const [payload, signature] = parts
    const key = await getHmacKey()

    const rawSigStr = base64UrlToString(signature)
    const sigBytes = new Uint8Array(rawSigStr.length)
    for (let i = 0; i < rawSigStr.length; i++) {
      sigBytes[i] = rawSigStr.charCodeAt(i)
    }

    const isValid = await crypto.subtle.verify(
      'HMAC',
      key,
      sigBytes,
      stringToUint8Array(payload)
    )

    if (!isValid) return false

    const data = JSON.parse(base64UrlToString(payload))
    if (!data.expiresAt || typeof data.expiresAt !== 'number') {
      return false
    }

    if (Date.now() > data.expiresAt) {
      return false
    }

    return true
  } catch {
    return false
  }
}
