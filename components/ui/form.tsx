import * as React from 'react';import * as L from '@radix-ui/react-label';import {cn} from '@/lib/utils';
const field='flex w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring';
export const Input=React.forwardRef<HTMLInputElement,React.InputHTMLAttributes<HTMLInputElement>>(({className,...p},r)=><input ref={r} className={cn(field,'h-11',className)} {...p}/>);Input.displayName='Input';
export const Textarea=React.forwardRef<HTMLTextAreaElement,React.TextareaHTMLAttributes<HTMLTextAreaElement>>(({className,...p},r)=><textarea ref={r} className={cn(field,className)} {...p}/>);Textarea.displayName='Textarea';
export const NativeSelect=React.forwardRef<HTMLSelectElement,React.SelectHTMLAttributes<HTMLSelectElement>>(({className,...p},r)=><select ref={r} className={cn(field,'h-11 [&>option]:bg-card',className)} {...p}/>);NativeSelect.displayName='NativeSelect';
export const Label=({className,...p}:React.ComponentProps<typeof L.Root>)=><L.Root className={cn('text-sm font-medium',className)} {...p}/>;
