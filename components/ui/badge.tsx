import * as React from 'react';import {cn} from '@/lib/utils';
export const Badge=({className,...p}:React.HTMLAttributes<HTMLSpanElement>)=><span className={cn('inline-flex items-center rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-medium text-cyan',className)} {...p}/>;
