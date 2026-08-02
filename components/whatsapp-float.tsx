import { WA_LINKS } from '@/lib/site'
import { WhatsAppIcon } from '@/components/whatsapp-icon'

export function WhatsAppFloat() {
  return (
    <a
      href={WA_LINKS.general}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribir por WhatsApp a Seal Step"
      className="group fixed right-4 bottom-4 z-50 flex items-center gap-3 rounded-full border border-border bg-foreground/95 px-4 py-3.5 text-background shadow-2xl shadow-black/60 backdrop-blur transition-transform duration-300 hover:scale-105 sm:right-6 sm:bottom-6"
    >
      <WhatsAppIcon className="size-6 shrink-0" />
      <span className="hidden font-heading text-sm font-bold tracking-wide sm:inline">
        Escribinos
      </span>
      <span className="absolute -top-1 -right-1 size-3 rounded-full bg-foreground">
        <span className="absolute inset-0 animate-ping rounded-full bg-foreground/70" />
      </span>
    </a>
  )
}
