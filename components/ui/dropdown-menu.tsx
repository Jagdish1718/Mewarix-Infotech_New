'use client';
import * as React from 'react';import * as D from '@radix-ui/react-dropdown-menu';import {cn} from '@/lib/utils';
export const DropdownMenu=D.Root;export const DropdownMenuTrigger=D.Trigger;
export const DropdownMenuContent=({className,sideOffset=8,...p}:React.ComponentProps<typeof D.Content>)=><D.Portal><D.Content sideOffset={sideOffset} className={cn('z-50 w-80 rounded-xl border bg-popover p-2 text-popover-foreground shadow-2xl data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',className)} {...p}/></D.Portal>;
export const DropdownMenuItem=({className,...p}:React.ComponentProps<typeof D.Item>)=><D.Item className={cn('flex cursor-pointer select-none items-center gap-3 rounded-lg px-3 py-2.5 text-sm outline-none focus:bg-white/10',className)} {...p}/>;
