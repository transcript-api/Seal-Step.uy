import { Star, Quote } from 'lucide-react'
import { AshText } from '@/components/ash-text'

const TESTIMONIALS = [
  {text:'Brotan esas Dnk negras, ya las qiero.',name:'Matías R.',role:'Cliente · Montevideo',img:'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&h=120&fit=crop&crop=faces'},
  {text:'Llegaron en 2 dias a Paysandú, 10 puntos.',name:'Bruno M.',role:'Cliente · Paysandú',img:'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=faces'},
  {text:'Por el precio que tienen no esperava que sean tan buenos.',name:'Facundo P.',role:'Cliente · Canelones',img:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=faces'},
  {text:'Le compré las Gazelle beige a mi novia y le encantaron.',name:'Joaquín S.',role:'Cliente · Maldonado',img:'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&h=120&fit=crop&crop=faces'},
  {text:'Pedí un par a las 9 de la noche y al otro día ya me contestaron, unos capos.',name:'Micaela D.',role:'Cliente · Rivera',img:'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=faces'},
  {text:'Muy buen precio, la verdad que no esperaba esa calidad.',name:'Agustín F.',role:'Cliente · Salto',img:'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=faces'},
  {text:'Ya les compré por tercera vez, no me fallan nunca.',name:'Lucas T.',role:'Cliente · Montevideo',img:'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=120&h=120&fit=crop&crop=faces'},
  {text:'Buen servicio, buena onda. Gracias por responder todas las dudas.',name:'Camila R.',role:'Cliente · Colonia',img:'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&h=120&fit=crop&crop=faces'},
  {text:'Más baratas que en las tiendas del centro y son las mismas.',name:'Valentina G.',role:'Cliente · Montevideo',img:'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&crop=faces'},
  {text:'Las Dunk Panda me llegaron impecables, igual que en las fotos. Las uso todos los días ya.',name:'Julieta L.',role:'Cliente · Montevideo',img:'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=120&h=120&fit=crop&crop=faces'},
  {text:'Las Air Force blancas que pedí me quedaron de diez, me dijeron que pidiera medio talle más y anduvo perfecto.',name:'Rodrigo N.',role:'Cliente · Tacuarembó',img:'https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?w=120&h=120&fit=crop&crop=faces'},
  {text:'Las Adidas Samba negras que tenían hace poco eran una locura, me las compré y mi hermano también en el pedido mayorista.',name:'Paula V.',role:'Revendedora · Canelones',img:'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=120&h=120&fit=crop&crop=faces'},
  {text:'Las NB 550 que encargué me llegaron en el tiempo que me dijeron. Yo dudaba un poco por comprar por Instagram pero salió todo bien.',name:'Santiago M.',role:'Cliente · Maldonado',img:'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=faces'},
  {text:'Me pedí las Court Vision blancas, son igual a las que venden en el local pero la mitad de precio, lo juro.',name:'Martina C.',role:'Cliente · Montevideo',img:'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop&crop=faces'},
  {text:'Las Puma Suede que me llegaron son cómodas, ya las usé dos salidas y siguen como nuevas.',name:'Esteban R.',role:'Cliente · Paysandú',img:'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&h=120&fit=crop&crop=faces'},
  {text:'Las Gazelle beige son la mejor compra que hice este año, combinan con todo.',name:'Lucía P.',role:'Cliente · Montevideo',img:'https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?w=120&h=120&fit=crop&crop=faces'},
  {text:'Encargué unas Vans Knu Skool que no encontraba en ningún lado y las trajeron al toque.',name:'Federico B.',role:'Cliente · Salto',img:'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=120&h=120&fit=crop&crop=faces'},
  {text:'Las Nike Dunk low que estaban en stock son otro nivel, la suela es gruesa y muy cómoda.',name:'Sofía A.',role:'Cliente · Montevideo',img:'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=120&h=120&fit=crop&crop=faces'},
  {text:'Las Adidas Handball Spezial que me llegaron son tal cual las fotos, me sorprendió lo bien que venían empaquetadas.',name:'Diego L.',role:'Cliente · Rocha',img:'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=120&h=120&fit=crop&crop=faces'},
  {text:'Las Air Max 97 me quedaron justas, pregunté por talle antes y me aconsejaron muy bien.',name:'Victoria Q.',role:'Cliente · Canelones',img:'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&h=120&fit=crop&crop=faces'},
  {text:'Compré las New Balance 9060 para usar en la facultad, no me canso ni de ir caminando todos los días.',name:'Nicolás F.',role:'Cliente · Montevideo',img:'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=120&h=120&fit=crop&crop=faces'},
  {text:'Unas Asics que me compré andan barbaro para correr, no pensé que a ese precio me iban a salir tan buenas.',name:'Emiliano P.',role:'Cliente · Rivera',img:'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=120&h=120&fit=crop&crop=faces'},
  {text:'Las Samba rosa las compré para mi hija de 15 y salió loca de contenta, pensó que se las había traído de Buenos Aires.',name:'Ana María T.',role:'Cliente · Florida',img:'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=120&h=120&fit=crop&crop=faces'},
  {text:'Yo soy de Artigas y me llegaron en 3 días pensé que demoraba más. Bien ahí.',name:'Franco B.',role:'Cliente · Artigas',img:'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&h=120&fit=crop&crop=faces'},
  {text:'Hice el pedido desde Durazno, pagué por transferencia y llegó rápido, sin vueltas.',name:'Mariana S.',role:'Cliente · Durazno',img:'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&h=120&fit=crop&crop=faces'},
  {text:'Soy de Treinta y Tres, la verdad que me dio cosa comprar por WhatsApp pero me mandaron foto del paquete antes de enviar. Todo serio.',name:'Mathías C.',role:'Cliente · Treinta y Tres',img:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=faces'},
  {text:'Envío a Cerro Largo y llegaron intactas, bien empaquetadas. Esperaba menos.',name:'Federica R.',role:'Cliente · Melo',img:'https://images.unsplash.com/photo-1554151228-14d9def656e4?w=120&h=120&fit=crop&crop=faces'},
  {text:'Pedí desde Soriano, me mantuvieron al tanto de todo el envío. Cero problema.',name:'Marcos G.',role:'Cliente · Mercedes',img:'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120&h=120&fit=crop&crop=faces'},
  {text:'Soy de Río Negro, me llegaron igual que en la publicación. Las fotos son de verdad, sin filtros raros.',name:'Noelia P.',role:'Cliente · Fray Bentos',img:'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=120&h=120&fit=crop&crop=faces'},
  {text:'Compré un lote de 12 pares para mi local en Paysandú, se me vendieron casi todos en una semana.',name:'Martín G.',role:'Local de indumentaria',img:'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=120&h=120&fit=crop&crop=faces'},
  {text:'Revendo en ferias y ya voy por el cuarto pedido con ellos. Los precios para revender son los mejores que encontré.',name:'Carolina B.',role:'Revendedora · Salto',img:'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&h=120&fit=crop&crop=faces'},
  {text:'Pedí para empezar a vender en Instagram y me fue bárbaro, ya les pedí otro lote. Incluso me dieron una mano para elegir qué modelos traer.',name:'Lautaro M.',role:'Emprendedor · Canelones',img:'https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=120&h=120&fit=crop&crop=faces'},
  {text:'Hice mi primer pedido mayorista hace dos meses, ya es mi proveedor fijo.',name:'Jorge P.',role:'Revendedor · Montevideo',img:'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=120&h=120&fit=crop&crop=faces'},
  {text:'Los lotes que mandan son siempre los modelos que están saliendo, no te mandan nada viejo para sacarse de encima.',name:'Florencia R.',role:'Revendedora · Maldonado',img:'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=120&h=120&fit=crop&crop=faces'},
  {text:'Compré por mayor para el local de mi familia, tuvimos muy buena respuesta, la gente volvió por más.',name:'Ignacio T.',role:'Local · Rivera',img:'https://images.unsplash.com/photo-1463453091185-61582044d556?w=120&h=120&fit=crop&crop=faces'},
  {text:'Empecé vendiéndole a mis amigos y ahora ya tengo mi propio emprendimiento, gracias a Seal que me dio bola desde el primer pedido chico.',name:'Yamila F.',role:'Emprendedora · Tacuarembó',img:'https://images.unsplash.com/photo-1548142813-c348350df52b?w=120&h=120&fit=crop&crop=faces'},
  {text:'La verdad yo desconfiaba un montón de comprar zapatillas por redes, pero me mandaron todas las fotos que pedí, incluso de la suela y la etiqueta. Salí contentísima.',name:'Sofía M.',role:'Cliente · Montevideo',img:'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=120&h=120&fit=crop&crop=faces'},
  {text:'Leí los comentarios y me animé. Tenía razón, son los mismos que en las fotos y el servicio es buenísimo.',name:'Maximiliano R.',role:'Cliente · Canelones',img:'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=120&h=120&fit=crop&crop=faces'},
  {text:'Me contestaron a las 11 de la noche, pensé que al otro día recién me hablaban. Muy buena atención.',name:'Agustina L.',role:'Cliente · San José',img:'https://images.unsplash.com/photo-1506863530036-1efeddceb993?w=120&h=120&fit=crop&crop=faces'},
  {text:'Yo pregunté como 15 veces por los talles y nunca me contestaron de mala manera, una masa.',name:'Bautista S.',role:'Cliente · Montevideo',img:'https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?w=120&h=120&fit=crop&crop=faces'},
  {text:'Tuve un problema con el talle y me lo solucionaron al toque, cosa que en otros lados ni te contestan.',name:'Magdalena O.',role:'Cliente · Piriápolis',img:'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=120&h=120&fit=crop&crop=faces'},
  {text:'Pedí un modelo que no estaba en stock, lo encargaron y me llegó en una semana y media, tal cual me dijeron.',name:'Sebastián N.',role:'Cliente · Montevideo',img:'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&h=120&fit=crop&crop=faces'},
  {text:'Los uso todos los días para ir al trabajo, salen barbaro con jean y con jogger.',name:'Rodrigo B.',role:'Cliente · Montevideo',img:'https://images.unsplash.com/photo-1463453091185-61582044d556?w=120&h=120&fit=crop&crop=faces'},
  {text:'Los championes que compré son super cómodos, soy de estar parado 8 horas y no me duelen los pies.',name:'Gastón P.',role:'Cliente · Canelones',img:'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=faces'},
  {text:'Compré un par para ir al gimnasio y me sorprendió lo bien que andan, pensé que iban a ser incómodas.',name:'Ivana L.',role:'Cliente · Salto',img:'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&h=120&fit=crop&crop=faces'},
  {text:'Son muy cómodas, la plantilla es de las buenas, no como esas que al mes ya se marcan.',name:'Tomás R.',role:'Cliente · Montevideo',img:'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=120&h=120&fit=crop&crop=faces'},
  {text:'Las uso para salir con los amigos, son duras. Ya pasé varias fiestas y aguantaron como campeonas.',name:'Braian S.',role:'Cliente · Paysandú',img:'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&h=120&fit=crop&crop=faces'},
  {text:'Me encantan para el día a día, no me complican con nada y combinan con toda la ropa que tengo.',name:'Juliana T.',role:'Cliente · Montevideo',img:'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=120&h=120&fit=crop&crop=faces'},
  {text:'Compré para mi hijo que arranca el liceo, le quedaron genial y me salieron la mitad que en el shopping.',name:'Mariela F.',role:'Cliente · Las Piedras',img:'https://images.unsplash.com/photo-1554151228-14d9def656e4?w=120&h=120&fit=crop&crop=faces'},
  {text:'Me llegó hasta una bolsita linda con el logo, detalle que ni esperaba.',name:'Fiorella G.',role:'Cliente · Montevideo',img:'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=120&h=120&fit=crop&crop=faces'},
  {text:'Se veían tan bien en la caja que me dió cosa sacarlas, posta que estaban impecables.',name:'Nicol P.',role:'Cliente · Canelones',img:'https://images.unsplash.com/photo-1548142813-c348350df52b?w=120&h=120&fit=crop&crop=faces'},
  {text:'Compré un par de las más baratas para probar y me sorprendieron, se sienten sólidas, no parecen baratas.',name:'Kevin A.',role:'Cliente · Montevideo',img:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=faces'},
  {text:'La gente me pregunta si son originales, están tan bien hechas que la gente no cree lo que pagué.',name:'Lucía B.',role:'Cliente · Maldonado',img:'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop&crop=faces'},
  {text:'Pedí las del color más raro que tenían y me llegaron iguales a la foto, ni un detalle.',name:'Santino R.',role:'Cliente · Rivera',img:'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=120&h=120&fit=crop&crop=faces'},
  {text:'La atención es muy cercana, no te hablan como una marca grande que te responde con mensajes prearmados.',name:'Antonella P.',role:'Cliente · Montevideo',img:'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&h=120&fit=crop&crop=faces'},
]

type Testimonial = typeof TESTIMONIALS[number]

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-3.5 sm:p-5 transition-colors duration-300 hover:border-white/25">
      <Quote className="mb-2 sm:mb-3 size-3.5 sm:size-5 text-white/30" />
      <p className="text-xs sm:text-sm leading-relaxed font-light text-muted-foreground line-clamp-4 sm:line-clamp-none">
        {t.text}
      </p>
      <div className="mt-3 sm:mt-4 flex items-center gap-2 sm:gap-3">
        <img
          src={t.img}
          alt={t.name}
          width={40}
          height={40}
          loading="lazy"
          className="size-7 sm:size-10 shrink-0 rounded-full border border-border object-cover"
        />
        <div className="min-w-0 flex-1">
          <p className="font-heading text-[0.7rem] sm:text-[0.78rem] font-bold uppercase tracking-wide text-foreground truncate">
            {t.name}
          </p>
          <p className="text-[0.62rem] sm:text-[0.7rem] text-muted-foreground truncate">{t.role}</p>
        </div>
        <div className="hidden xs:flex shrink-0 gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="size-2.5 sm:size-3 fill-foreground text-foreground" />
          ))}
        </div>
      </div>
    </div>
  )
}

// Construir las 3 columnas intercalando testimonios
const cols: Testimonial[][] = [[], [], []]
for (let i = 0; i < TESTIMONIALS.length; i++) {
  cols[i % 3].push(TESTIMONIALS[i])
}

// col 0 → sube (55s) (móvil y desktop), col 1 → baja (65s) (móvil y desktop), col 2 → sube (60s) (desktop)
const colConfig = [
  { dir: 'up',   duration: '55s', hiddenClass: '' },
  { dir: 'down', duration: '65s', hiddenClass: '' },
  { dir: 'up',   duration: '60s', hiddenClass: 'hidden lg:block' },
] as const

export default function Testimonials() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-card/30 py-16 lg:py-24">
      {/* Encabezado */}
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-medium text-muted-foreground">
          <Star className="size-3.5 fill-foreground text-foreground" />
          Testimonios
        </span>
        <h2 className="mt-4 font-heading text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
          <AshText as="span">LO QUE DICEN NUESTROS CLIENTES</AshText>
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
          Opiniones reales de clientes que ya compraron al por menor y al por mayor
          en todo Uruguay. Fotos reales, envíos rápidos y atención por WhatsApp.
        </p>
        <div className="mt-4 flex items-center justify-center gap-1.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="size-4 fill-foreground text-foreground" />
          ))}
          <span className="ml-2 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
            +500 clientes satisfechos
          </span>
        </div>
      </div>

      {/* Marquee de columnas (2 en móvil, 3 en pantallas grandes) */}
      <div
        className="relative mt-8 max-h-[720px] overflow-hidden t-track-container"
        style={{
          maskImage:
            'linear-gradient(to bottom, transparent 0%, #000 10%, #000 90%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to bottom, transparent 0%, #000 10%, #000 90%, transparent 100%)',
        }}
      >
        <div className="mx-auto flex max-w-5xl justify-center gap-2.5 sm:gap-4 px-2 sm:px-6 lg:px-8">
          {cols.map((group, ci) => {
            const { dir, duration, hiddenClass } = colConfig[ci]
            const looped = [...group, ...group]
            return (
              <div key={ci} className={`w-[calc(50vw-1rem)] max-w-[288px] sm:w-72 flex-shrink-0 ${hiddenClass}`}>
                <div
                  className={`flex flex-col gap-2.5 sm:gap-4 pb-4 ${dir === 'up' ? 't-track-up' : 't-track-down'}`}
                  style={{ animationDuration: duration }}
                >
                  {looped.map((t, idx) => (
                    <TestimonialCard key={`${ci}-${idx}`} t={t} />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}