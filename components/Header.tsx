'use client';
import Link from 'next/link';import {usePathname} from 'next/navigation';import {ChevronDown,Menu} from 'lucide-react';import {Button} from '@/components/ui/button';import {DropdownMenu,DropdownMenuContent,DropdownMenuItem,DropdownMenuTrigger} from '@/components/ui/dropdown-menu';import {Dialog,DialogClose,DialogContent,DialogTitle,DialogTrigger} from '@/components/ui/dialog';import {services} from '@/lib/site';import {cn} from '@/lib/utils';
const links=[['/','Home'],['/about','About Us'],['/portfolio','Portfolio'],['/contact','Contact Us']];
export default function Header(){const p=usePathname();const on=(h:string)=>h==='/'?p==='/':p.startsWith(h);
return <header className="sticky top-0 z-40 border-b border-white/10 bg-background/80 backdrop-blur-xl"><div className="wrap flex h-16 items-center justify-between">
<Link href="/" className="text-xl font-bold tracking-tight">Mewarix<span className="text-amber"> Infotech</span></Link>
<nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
{links.slice(0,2).map(([h,l])=><Button key={h} asChild variant="ghost"><Link href={h} className={cn(on(h)&&'text-cyan')}>{l}</Link></Button>)}
<DropdownMenu><DropdownMenuTrigger asChild><Button variant="ghost" className={cn(on('/services')&&'text-cyan')}>Services<ChevronDown size={14}/></Button></DropdownMenuTrigger><DropdownMenuContent>{services.map(s=><DropdownMenuItem key={s.slug} asChild><Link href={`/services/${s.slug}`}>{s.name}</Link></DropdownMenuItem>)}<DropdownMenuItem asChild><Link href="/services" className="border-t border-white/10 text-cyan">All services →</Link></DropdownMenuItem></DropdownMenuContent></DropdownMenu>
{links.slice(2).map(([h,l])=><Button key={h} asChild variant="ghost"><Link href={h} className={cn(on(h)&&'text-cyan')}>{l}</Link></Button>)}
<Button asChild className="ml-2"><Link href="/contact">Start Your Project</Link></Button></nav>
<Dialog><DialogTrigger asChild><Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu"><Menu/></Button></DialogTrigger>
<DialogContent><DialogTitle className="sr-only">Menu</DialogTitle><nav aria-label="Mobile" className="mt-10 flex flex-col gap-1">{[...links.slice(0,2),['/services','Services'],...links.slice(2)].map(([h,l])=><DialogClose asChild key={h}><Link href={h} className={cn('rounded-lg px-3 py-2.5 font-medium hover:bg-white/10',on(h)&&'text-cyan')}>{l}</Link></DialogClose>)}<DialogClose asChild><Button asChild className="mt-4"><Link href="/contact">Start Your Project</Link></Button></DialogClose></nav></DialogContent></Dialog></div></header>}
