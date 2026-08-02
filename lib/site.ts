export const WHATSAPP_NUMBER = '59895843091'
export const WHATSAPP_DISPLAY = '+598 95 843 091'

export function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

export const WA_LINKS = {
  general: whatsappLink(
    'Hola Seal Step! Quiero consultar modelos, talles y precios de championes.',
  ),
  catalogo: whatsappLink(
    'Hola Seal Step! Me gustaría ver el catálogo completo de championes disponibles.',
  ),
  mayorista: whatsappLink(
    'Hola Seal Step! Quiero información sobre precios por mayor para revender.',
  ),
  modelo: (modelo: string) =>
    whatsappLink(
      `Hola Seal Step! Me interesan los modelos ${modelo}. ¿Qué talles tienen disponibles?`,
    ),
}
