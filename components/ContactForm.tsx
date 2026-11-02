'use client';
import {Button} from '@/components/ui/button';import {Input,Textarea,Label,NativeSelect} from '@/components/ui/form';import {useRouter} from 'next/navigation';import {useEffect,useState} from 'react';
const svc=['Custom Software Development','CRM Development','AI & Automation','Website Development','Web Application Development','API Development','Database Development','SaaS Development','Other'];
const bud=['Not decided yet','Below ₹50,000','₹50,000 – ₹1,00,000','₹1,00,000 – ₹3,00,000','₹3,00,000 – ₹5,00,000','Above ₹5,00,000','International project / Discuss'];
const tl=['Immediately','Within one month','Within three months','Just exploring'];
const key=process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
export default function ContactForm(){const r=useRouter();const [busy,setBusy]=useState(false);const [err,setErr]=useState('');const [fe,setFe]=useState<Record<string,string>>({});
useEffect(()=>{if(!key)return;const s=document.createElement('script');s.src='https://challenges.cloudflare.com/turnstile/v0/api.js';s.async=true;document.body.appendChild(s)},[]);
async function submit(e:React.FormEvent<HTMLFormElement>){e.preventDefault();if(busy)return;setBusy(true);setErr('');setFe({});
const f=new FormData(e.currentTarget);const q=new URLSearchParams(location.search);const body:Record<string,unknown>=Object.fromEntries(f.entries());body.privacyConsent=f.get('privacyConsent')==='on';body.source=q.get('utm_source')||document.referrer||'direct';body.utm={medium:q.get('utm_medium'),campaign:q.get('utm_campaign')};body.turnstileToken=f.get('cf-turnstile-response')||'';
try{const res=await fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});const d=await res.json().catch(()=>({}));
if(res.ok){r.push('/thank-you');return}setFe(d.fields||{});setErr(d.message||'Something went wrong. Please try again or email us directly.')}catch{setErr('Network error. Please check your connection and try again, or email us directly.')}setBusy(false)}
const L=({n,t,req}:{n:string;t:string;req?:boolean})=><Label htmlFor={n} className="mb-1.5 block">{t}{req&&<span className="text-amber"> *</span>}</Label>;
const E=({n}:{n:string})=>fe[n]?<p role="alert" className="mt-1 text-sm text-red-400">{fe[n]}</p>:null;
const S=({n,o,req}:{n:string;o:string[];req?:boolean})=><NativeSelect id={n} name={n} required={req} defaultValue=""><option value="" disabled>Select…</option>{o.map(x=><option key={x}>{x}</option>)}</NativeSelect>;
return <form onSubmit={submit} noValidate={false} className="space-y-4 rounded-2xl border bg-card/70 p-6 shadow-xl backdrop-blur md:p-8" aria-busy={busy}>
<div className="grid gap-4 md:grid-cols-2"><div><L n="fullName" t="Full Name" req/><Input id="fullName" name="fullName" required maxLength={100} autoComplete="name"/><E n="fullName"/></div>
<div><L n="businessEmail" t="Business Email" req/><Input id="businessEmail" name="businessEmail" type="email" required maxLength={200} autoComplete="email"/><E n="businessEmail"/></div>
<div><L n="companyName" t="Company Name"/><Input id="companyName" name="companyName" maxLength={150}/></div>
<div><L n="country" t="Country" req/><Input id="country" name="country" required maxLength={80} autoComplete="country-name"/><E n="country"/></div>
<div><L n="serviceRequired" t="Service Required" req/><S n="serviceRequired" o={svc} req/><E n="serviceRequired"/></div>
<div><L n="estimatedBudget" t="Estimated Project Budget"/><S n="estimatedBudget" o={bud}/></div></div>
<div><L n="expectedTimeline" t="Expected Timeline"/><S n="expectedTimeline" o={tl}/></div>
<div><L n="projectDescription" t="Project Description" req/><Textarea id="projectDescription" name="projectDescription" required minLength={20} maxLength={3000} rows={5}/><E n="projectDescription"/></div>
<input name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden"/>
<label className="flex items-start gap-2 text-sm"><input type="checkbox" name="privacyConsent" required className="mt-1"/><span>I agree to the processing of my details as described in the <a href="/privacy-policy" className="text-cyan underline">Privacy Policy</a>. <span className="text-amber">*</span></span></label><E n="privacyConsent"/>
{key&&<div className="cf-turnstile" data-sitekey={key}/>}
{err&&<p role="alert" className="rounded-lg bg-red-500/10 p-3 text-sm text-red-300">{err}</p>}
<Button size="lg" className="w-full" disabled={busy}>{busy?'Sending…':'Send Enquiry'}</Button></form>}
