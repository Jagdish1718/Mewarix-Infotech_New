import {notFound} from 'next/navigation';import Cta,{Faq,Hero} from '@/components/Cta';import {meta} from '@/lib/seo';import {services,steps,site} from '@/lib/site';
export const generateStaticParams=()=>services.map(s=>({slug:s.slug}));
export const dynamicParams=false;
export const generateMetadata=({params}:{params:{slug:string}})=>{const s=services.find(x=>x.slug===params.slug);return s?meta(s.seo,s.desc,`/services/${s.slug}`):{}};
export default function Service({params}:{params:{slug:string}}){const s=services.find(x=>x.slug===params.slug);if(!s)notFound();
return <><Hero h={s.heading} p={s.desc}/><div className="wrap space-y-10 py-12">
<section><h2 className="text-2xl font-bold">Business problems we address</h2><ul className="mt-2 text-mist">{s.problems.map(p=><li key={p}>• {p}</li>)}</ul></section>
<section><h2 className="text-2xl font-bold">Our solution: features and capabilities</h2><div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{s.features.map(f=><div key={f} className="card py-4">{f}</div>)}</div></section>
<section><h2 className="text-2xl font-bold">Development approach</h2><p className="mt-2 text-mist">{steps.map(x=>x[0]).join(' → ')}</p></section>
<section><h2 className="text-2xl font-bold">Technologies used</h2><p className="mt-2 text-mist">{s.tech.join(' · ')}</p></section>
<section><h2 className="text-2xl font-bold">Related demo</h2><p className="mt-2 text-mist">{s.demo}. See the <a className="text-cyan underline" href="/portfolio">portfolio</a>.</p></section>
<section className="max-w-3xl"><h2 className="mb-3 text-2xl font-bold">FAQs</h2><Faq items={s.faq}/></section></div><Cta/>
<script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({'@context':'https://schema.org','@type':'Service',name:s.heading,description:s.desc,provider:{'@type':'Organization',name:site.name,url:site.url}})}}/></>}
