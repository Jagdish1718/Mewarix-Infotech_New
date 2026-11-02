import type {Metadata} from 'next';import {site} from './site';
export const meta=(title:string,description:string,path:string):Metadata=>({title,description,alternates:{canonical:site.url+path},openGraph:{title,description,url:site.url+path,siteName:site.name,type:'website'}});
