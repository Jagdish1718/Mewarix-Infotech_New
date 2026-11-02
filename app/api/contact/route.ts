import {NextResponse} from 'next/server';
export const runtime='nodejs';
const hits=new Map<string,number[]>();
const clean=(v:unknown,max:number)=>String(v??'').replace(/<[^>]*>/g,'').replace(/[\u0000-\u001f\u007f]/g,' ').trim().slice(0,max);
const esc=(s:string)=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!));
const SVC=['Custom Software Development','CRM Development','AI & Automation','Website Development','Web Application Development','API Development','Database Development','SaaS Development','Other'];
const fail=(status:number,message:string,fields?:Record<string,string>)=>NextResponse.json({ok:false,message,fields},{status});
export async function POST(req:Request){
const ip=(req.headers.get('x-forwarded-for')||'unknown').split(',')[0].trim();const now=Date.now();
const recent=(hits.get(ip)||[]).filter(t=>now-t<3600_000);if(recent.length>=5)return fail(429,'Too many requests. Please try again later.');hits.set(ip,[...recent,now]);
let b:Record<string,any>;try{b=await req.json()}catch{return fail(400,'Invalid request.')}
if(b.website)return NextResponse.json({ok:true});
const d={fullName:clean(b.fullName,100),businessEmail:clean(b.businessEmail,200).toLowerCase(),companyName:clean(b.companyName,150),country:clean(b.country,80),serviceRequired:clean(b.serviceRequired,60),estimatedBudget:clean(b.estimatedBudget,60),projectDescription:clean(b.projectDescription,3000),expectedTimeline:clean(b.expectedTimeline,40),source:clean(b.source,200)||'direct'};
const f:Record<string,string>={};
if(d.fullName.length<2)f.fullName='Please enter your name.';
if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.businessEmail))f.businessEmail='Please enter a valid email address.';
if(!d.country)f.country='Please enter your country.';
if(!SVC.includes(d.serviceRequired))f.serviceRequired='Please select a service.';
if(d.projectDescription.length<20)f.projectDescription='Please describe your project (at least 20 characters).';
if(b.privacyConsent!==true)f.privacyConsent='Consent is required.';
if(Object.keys(f).length)return fail(400,'Please correct the highlighted fields.',f);
const ts=process.env.TURNSTILE_SECRET_KEY;
if(ts){const r=await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify',{method:'POST',body:new URLSearchParams({secret:ts,response:String(b.turnstileToken||''),remoteip:ip})}).then(r=>r.json()).catch(()=>null);if(!r?.success)return fail(400,'Spam check failed. Please try again.')}
else if(process.env.NODE_ENV==='production')return fail(503,'Form temporarily unavailable. Please email us directly.');
const url=process.env.SUPABASE_URL,key=process.env.SUPABASE_SERVICE_ROLE_KEY;
if(!url||!key)return fail(503,'Form temporarily unavailable. Please email us directly.');
const row={full_name:d.fullName,business_email:d.businessEmail,company_name:d.companyName||null,country:d.country,service_required:d.serviceRequired,estimated_budget:d.estimatedBudget||null,project_description:d.projectDescription,expected_timeline:d.expectedTimeline||null,privacy_consent:true,source:d.source,utm:b.utm||null};
try{const r=await fetch(`${url}/rest/v1/contact_enquiries`,{method:'POST',headers:{apikey:key,Authorization:`Bearer ${key}`,'Content-Type':'application/json',Prefer:'return=minimal'},body:JSON.stringify(row)});if(!r.ok)throw new Error(`db ${r.status}`)}
catch(e){console.error('Enquiry DB error',e);return fail(500,'We could not save your enquiry. Please try again or email us directly.')}
const rk=process.env.RESEND_API_KEY,to=process.env.NOTIFICATION_EMAIL||'jagdishaudichya123@gmail.com',from=process.env.EMAIL_FROM||'Mewarix Infotech <onboarding@resend.dev>';
if(rk){const send=(p:object)=>fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${rk}`,'Content-Type':'application/json'},body:JSON.stringify({from,...p})});
const lines=[['Name',d.fullName],['Email',d.businessEmail],['Company',d.companyName],['Country',d.country],['Service',d.serviceRequired],['Budget',d.estimatedBudget],['Timeline',d.expectedTimeline],['Description',d.projectDescription],['Source',d.source],['Date',new Date().toISOString()]];
const results=await Promise.allSettled([send({to:[to],reply_to:d.businessEmail,subject:`New Project Enquiry – ${d.fullName}`,html:lines.map(([k,v])=>`<p><b>${k}:</b> ${esc(v||'-')}</p>`).join('')}),
send({to:[d.businessEmail],subject:'We received your project enquiry | Mewarix Infotech',html:`<p>Hello ${esc(d.fullName)},</p><p>Thank you for contacting Mewarix Infotech.</p><p>We have successfully received your project enquiry. Our team will review your requirements and get back to you within one business day.</p><p>We appreciate your interest in working with us.</p><p>Best regards,<br>Mewarix Infotech<br>Building Intelligent Digital Solutions.</p>`})]);
results.forEach(r=>{if(r.status==='rejected'||!r.value.ok)console.error('Email send failed')})}
return NextResponse.json({ok:true,message:'Enquiry received.'})}
