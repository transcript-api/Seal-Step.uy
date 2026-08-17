import { WA_LINKS } from '@/lib/site'
import { WhatsAppIcon } from '@/components/whatsapp-icon'

export function WhatsAppFloat({ isHidden = false }: { isHidden?: boolean }) {
  return (
    <a
      href={WA_LINKS.general}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribir por WhatsApp a Seal Step"
      className={[
        'group z-40 flex h-11 items-center gap-2 rounded-full border border-neutral-300 bg-white px-3 text-black shadow-xl shadow-black/70 transition-all duration-300 hover:scale-[1.02] hover:bg-neutral-100 sm:h-12 animate-[float-soft_4.5s_ease-in-out_infinite]',
        isHidden ? 'pointer-events-none opacity-0' : 'opacity-100',
      ].join(' ')}
    >
      <div className="relative flex size-6 items-center justify-center rounded-full bg-black/5 sm:size-7">
        <WhatsAppIcon className="size-3.5 shrink-0 text-black sm:size-4" />
      </div>
      <span className="font-heading text-[10px] font-bold uppercase tracking-wider text-black sm:text-[11px]">
        Escribinos
      </span>
    </a>
  )
}


