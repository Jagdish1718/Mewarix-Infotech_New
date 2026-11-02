import * as React from 'react';import {cn} from '@/lib/utils';
export const Card=({className,...p}:React.HTMLAttributes<HTMLDivElement>)=><div className={cn('rounded-2xl border bg-card text-card-foreground shadow-xl shadow-black/10 transition-all',className)} {...p}/>;
export const CardHeader=({className,...p}:React.HTMLAttributes<HTMLDivElement>)=><div className={cn('flex flex-col gap-2 p-6',className)} {...p}/>;
export const CardTitle=({className,...p}:React.HTMLAttributes<HTMLHeadingElement>)=><h3 className={cn('text-xl font-semibold leading-tight',className)} {...p}/>;
export const CardContent=({className,...p}:React.HTMLAttributes<HTMLDivElement>)=><div className={cn('p-6 pt-0',className)} {...p}/>;
