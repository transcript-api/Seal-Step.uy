'use client'

import * as React from 'react'
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  type PanInfo,
  type MotionValue,
} from 'motion/react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'

export interface Slide {
  image: string
  title: string
  description: string
  badge: string
  href?: string
}

/**
 * =========================================================================
 * 🎡 CARRUSEL 1 (Inicio / Hero)
 * -------------------------------------------------------------------------
 * Para cambiar o actualizar las fotos y modelos de este carrusel, editá
 * directamente la lista `SLIDES_CARRUSEL_1` a continuación:
 * =========================================================================
 */
export const SLIDES_CARRUSEL_1: Slide[] = [
  {
    image: '/images/adidas-campus-gris-blanco/01.jpg',
    title: 'Adidas Campus',
    description: 'Gris y blanco en gamuza suave con cordones anchos.',
    badge: 'NUEVO INGRESO',
    href: '/producto/adidas-campus-gris-blanco',
  },
  {
    image: '/images/nike-dunk-low-azul/01.jpg',
    title: 'Nike Dunk Low Azul',
    description: 'Clásico diseño retro urbano en cuero premium.',
    badge: 'DESTACADO',
    href: '/producto/nike-dunk-low-azul',
  },
  {
    image: '/images/new-balance-9060/01.jpg',
    title: 'New Balance 9060',
    description: 'Silueta chunky en blanco, gris y off white.',
    badge: 'TENDENCIA',
    href: '/producto/new-balance-9060',
  },
  {
    image: '/images/nike-dunk-low-storm-off-latex/01.jpg',
    title: 'Dunk Storm Latex',
    description: 'Off white con suela de goma latex exclusiva.',
    badge: 'IMPORTADO',
    href: '/producto/nike-dunk-low-storm-off-latex',
  },
  {
    image: '/images/adidas-samba-blanco-negro/01.jpg',
    title: 'Adidas Samba Luxo',
    description: 'Silueta atemporal con acabados de primera calidad.',
    badge: 'LINHA LUXO',
    href: '/producto/adidas-samba-blanco-negro',
  },
  {
    image: '/images/new-balance-1000/01.jpg',
    title: 'New Balance 1000',
    description: 'Tonalidad Azul / Off White con confort superior.',
    badge: 'RETRO TECH',
    href: '/producto/new-balance-1000',
  },
]

interface CarouselConfig {
  distanceDivisor: number
  velocityDivisor: number
  sensitivity: number
  xMultiplier: number
  yMultiplier: number
  rotationMultiplier: number
  scaleReduction: number
}

const getCarouselConfig = (width: number): CarouselConfig => {
  if (width < 640) {
    return {
      distanceDivisor: 120,
      velocityDivisor: 500,
      sensitivity: 180,
      xMultiplier: 90,
      yMultiplier: 20,
      rotationMultiplier: 8,
      scaleReduction: 0.06,
    };
  }
  if (width < 1024) {
    return {
      distanceDivisor: 160,
      velocityDivisor: 650,
      sensitivity: 220,
      xMultiplier: 130,
      yMultiplier: 30,
      rotationMultiplier: 10,
      scaleReduction: 0.09,
    };
  }
  return {
    distanceDivisor: 200,
    velocityDivisor: 800,
    sensitivity: 250,
    xMultiplier: 170,
    yMultiplier: 40,
    rotationMultiplier: 12,
    scaleReduction: 0.12,
  };
};

export function CarouselStacked({ slides = SLIDES_CARRUSEL_1 }: { slides?: Slide[] }) {
  const scrollProgress = useMotionValue(0);
  const startProgress = React.useRef(0);
  const [windowWidth, setWindowWidth] = React.useState(0);

  const total = slides.length;

  React.useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const config = React.useMemo(
    () => getCarouselConfig(windowWidth),
    [windowWidth],
  );

  const handleDragStart = () => {
    startProgress.current = scrollProgress.get();
  };

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    const dragDistance = info.offset.x;
    const velocity = info.velocity.x;

    const distanceShift = -dragDistance / config.distanceDivisor;
    const velocityShift = -velocity / config.velocityDivisor;

    let totalShift = Math.round(distanceShift + velocityShift);
    totalShift = Math.max(-3, Math.min(3, totalShift));

    const target = Math.round(startProgress.current) + totalShift;

    animate(scrollProgress, target, {
      type: 'spring',
      stiffness: 200,
      damping: 30,
      mass: 1,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center w-full py-4 sm:py-6 overflow-hidden select-none">
      <div className="relative w-full max-w-full h-80 sm:h-104 lg:h-112 flex items-center justify-center">
        {/* Transparent Drag Surface */}
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragStart={handleDragStart}
          onDrag={(_, info) => {
            const delta = -info.delta.x / config.sensitivity;
            scrollProgress.set(scrollProgress.get() + delta);
          }}
          onDragEnd={handleDragEnd}
          className="absolute inset-0 z-50 cursor-grab active:cursor-grabbing"
        />

        {slides.map((slide, i) => (
          <Card
            key={i}
            slide={slide}
            index={i}
            total={total}
            progress={scrollProgress}
            config={config}
          />
        ))}
      </div>
      <p className="mt-2 text-[11px] font-medium uppercase tracking-widest text-muted-foreground/80 pointer-events-none">
        Deslizá para explorar modelos
      </p>
    </div>
  );
}

interface CardProps {
  slide: Slide
  index: number
  total: number
  progress: MotionValue<number>
  config: CarouselConfig
}

const Card = ({ slide, index, total, progress, config }: CardProps) => {
  const offset = useTransform(progress, (p) => {
    let diff = (index - p) % total;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  });

  const x = useTransform(offset, (o) => o * config.xMultiplier);
  const rotate = useTransform(offset, (o) => {
    const absO = Math.abs(o);
    if (absO < 0.05) return 0;
    return o * config.rotationMultiplier;
  });
  const y = useTransform(offset, (o) => {
    const absO = Math.abs(o);
    if (absO < 0.05) return 0;
    return absO * config.yMultiplier;
  });
  const scale = useTransform(
    offset,
    (o) => 1 - Math.abs(o) * config.scaleReduction,
  );
  const opacity = useTransform(
    offset,
    [-total / 2, -total / 2 + 0.5, 0, total / 2 - 0.5, total / 2],
    [0, 1, 1, 1, 0],
  );
  const zIndex = useTransform(offset, (o) =>
    Math.round(100 - Math.abs(o) * 10),
  );

  return (
    <motion.div
      style={{
        x,
        rotate,
        y,
        scale,
        opacity,
        zIndex,
      }}
      className={cn(
        'absolute rounded-2xl overflow-hidden bg-card border border-border/80 shadow-2xl shadow-black/60 group pointer-events-none transition-shadow',
        'w-48 h-64 sm:w-60 sm:h-80 lg:w-72 lg:h-96',
      )}
    >
      <img
        src={slide.image}
        alt={slide.title}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none transition-transform duration-700 group-hover:scale-105"
      />

      <motion.div
        style={{
          opacity: useTransform(
            offset,
            [-2, -0.5, 0, 0.5, 2],
            [0.5, 0.2, 0, 0.2, 0.5],
          ),
        }}
        className="absolute inset-0 bg-black pointer-events-none"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

      <Badge className="absolute top-3 right-3 sm:top-4 sm:right-4 px-2.5 py-0.5 rounded-full bg-white/95 backdrop-blur-md text-[10px] sm:text-xs font-bold uppercase tracking-wider text-black border-0 shadow-md">
        {slide.badge}
      </Badge>

      <div className="absolute bottom-4 left-3 right-3 sm:bottom-6 sm:left-5 sm:right-5 text-white text-left">
        <motion.p
          style={{
            opacity: useTransform(offset, [-0.5, 0, 0.5], [0, 1, 0]),
          }}
          className="text-base sm:text-lg lg:text-xl font-heading font-extrabold uppercase leading-tight mb-1 drop-shadow-md"
        >
          {slide.title}
        </motion.p>
        <motion.p
          style={{
            opacity: useTransform(offset, [-0.5, 0, 0.5], [0, 1, 0]),
          }}
          className="text-xs text-white/80 line-clamp-2 font-medium drop-shadow-sm"
        >
          {slide.description}
        </motion.p>
      </div>
    </motion.div>
  );
};

export default CarouselStacked;
