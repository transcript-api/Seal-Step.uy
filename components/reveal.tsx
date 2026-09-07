'use client'

import { cn } from '@/lib/utils'

type RevealProps = {
  children: React.ReactNode
  className?: string
  delay?: number
  as?: 'div' | 'section' | 'li' | 'article' | 'header'
}

export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = 'div',
}: RevealProps) {
  return (
    <Tag
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={cn('transition-all duration-700 ease-out', className)}
    >
      {children}
    </Tag>
  )
}
