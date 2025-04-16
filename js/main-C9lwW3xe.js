(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))t(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&t(s)}).observe(document,{childList:!0,subtree:!0});function e(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function t(n){if(n.ep)return;n.ep=!0;const i=e(n);fetch(n.href,i)}})();function a(o){return typeof o=="object"&&"field"in o&&"message"in o}async function c(o,r={}){try{const e=await fetch(o,r);if(!e.ok){const t=await e.json();throw Array.isArray(t)&&t.every(n=>a(n))?t:a(t)?[t]:[{field:"unknown",message:"Unknown error"}]}return e.status===200?await e.json():void 0}catch(e){throw e instanceof TypeError?[{field:"network",message:"Could not connect to service."}]:e instanceof SyntaxError?[{field:"internal",message:"Failed to parse the response body. The response may be empty or the route may not be returning JSON as expected."}]:e}}class d{constructor(r){this.apiUrl=r}async getAll(){return await c(`${this.apiUrl}`)}async insert(r){const e={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)};await c(`${this.apiUrl}`,e)}async update(r,e){const t={method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)};await c(`${this.apiUrl}/${r}`,t)}async delete(r){const e={method:"DELETE"};await c(`${this.apiUrl}/${r}`,e)}}function f(o){const r=document.createDocumentFragment();return o.forEach(e=>{const t=document.createElement("article");t.dataset.id=String(e.id);const n=document.createElement("h2");n.innerText=e.jobTitle;const i=document.createElement("p");i.innerText=e.companyName;const s=document.createElement("p");s.innerText=e.workCityLocation;const l=document.createElement("p");l.innerText=e.startDate+" ⎯ "+e.endDate;const p=document.createElement("p");p.innerText=e.description,t.appendChild(n),t.appendChild(i),t.appendChild(s),t.appendChild(l),t.appendChild(p),r.appendChild(t)}),r}function m(o,r){const e=o.querySelector(".error");e&&e.remove();const t=document.createElement("p");t.setAttribute("class","error"),t.innerText=r,o.appendChild(t)}function u(o,r){for(const e of r)console.error(`${e.field}: ${e.message}`),e.field==="network"&&m(o,"Could not display any work experiences :(")}async function h(){const o=".work-experience-container",r=document.querySelector(o);try{if(!r)throw new Error(`DOM-element ${o} is missing.`);const t=await new d("http://localhost:4000/api/work-experience").getAll(),n=f(t);r.appendChild(n)}catch(e){Array.isArray(e)&&e.every(t=>a(t))&&r?u(r,e):console.error("Unexpected app error",e)}}async function y(){h()}y();
