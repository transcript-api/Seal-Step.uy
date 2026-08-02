const ITEMS = [
  'Envíos a todo Uruguay',
  'Ventas por mayor',
  'Atención por WhatsApp',
  'Entregas en 24 a 72 hs',
  'Calidad-precio',
  'Compra segura',
]

export function Marquee() {
  return (
    <div className="border-b border-border bg-card/50 py-4">
      <div
        className="relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
        aria-hidden="true"
      >
        {[0, 1].map((group) => (
          <ul
            key={group}
            className="flex shrink-0 animate-[marquee_28s_linear_infinite] items-center gap-10 pr-10 motion-reduce:animate-none"
          >
            {ITEMS.map((item) => (
              <li
                key={item}
                className="flex items-center gap-10 font-heading text-xs font-bold tracking-[0.22em] whitespace-nowrap text-muted-foreground uppercase"
              >
                {item}
                <span className="size-1.5 rounded-full bg-muted-foreground/50" />
              </li>
            ))}
          </ul>
        ))}
      </div>
      <span className="sr-only">
        Envíos a todo Uruguay, ventas por mayor, atención por WhatsApp, entregas
        en 24 a 72 horas, buena relación calidad-precio y compra segura.
      </span>
    </div>
  )
}
