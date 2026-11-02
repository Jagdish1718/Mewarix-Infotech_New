'use client';
import * as React from 'react';import * as A from '@radix-ui/react-accordion';import {ChevronDown} from 'lucide-react';import {cn} from '@/lib/utils';
export const Accordion=A.Root;
export const AccordionItem=({className,...p}:React.ComponentProps<typeof A.Item>)=><A.Item className={cn('rounded-xl border bg-card/60 px-5',className)} {...p}/>;
export const AccordionTrigger=({className,children,...p}:React.ComponentProps<typeof A.Trigger>)=><A.Header><A.Trigger className={cn('flex w-full items-center justify-between gap-4 py-4 text-left font-semibold [&[data-state=open]>svg]:rotate-180',className)} {...p}>{children}<ChevronDown size={18} className="shrink-0 text-cyan transition-transform"/></A.Trigger></A.Header>;
export const AccordionContent=({className,children,...p}:React.ComponentProps<typeof A.Content>)=><A.Content className="overflow-hidden data-[state=closed]:animate-acc-up data-[state=open]:animate-acc-down" {...p}><div className={cn('pb-4 text-muted-foreground',className)}>{children}</div></A.Content>;
