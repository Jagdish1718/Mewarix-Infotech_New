import type {MetadataRoute} from 'next';import {services,site} from '@/lib/site';
export default function sitemap():MetadataRoute.Sitemap{return ['','/about','/services','/portfolio','/contact','/privacy-policy','/terms-and-conditions',...services.map(s=>`/services/${s.slug}`)].map(p=>({url:site.url+p,lastModified:new Date()}))}
