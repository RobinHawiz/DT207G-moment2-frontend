import{W as s,i as c,d as l}from"./handleGlobalError-CotlrmK1.js";import{c as m,a as u,h as d}from"./createWorkExperiencePayload-DsIG5bRC.js";function p(){const e="edit-entry",o=localStorage.getItem(e);if(!o)return console.error(`[Storage] Missing key: ${e}`),null;try{return JSON.parse(o)}catch(r){return console.error("[Storage] Failed to parse edit-entry",r),null}}function f(e,o){for(const[r,t]of Object.entries(o)){if(r==="id")continue;const i=e.querySelector(`#${r}`);if(!i){console.warn(`Input element with id: ${r} does not exist.`);continue}i.value=String(t)}}function y(e){const o="form",r=document.querySelector(o);if(!r){console.error(`DOM-element ${o} is missing.`);return}f(r,e),r.addEventListener("submit",t=>E(t,e.id))}async function E(e,o){e.preventDefault(),console.log("Edit form");const r=e.target,t=new FormData(r),i=m(t);try{await new s("https://dt207g-moment2.azurewebsites.net/api/work-experience").update(o,i);const a=document.querySelectorAll("form input, form textarea");u(a),setTimeout(()=>{window.alert("Work experience has been updated!"),window.location.href="/DT207G-moment2-frontend/"},0)}catch(n){Array.isArray(n)&&n.every(a=>c(a))?d(n):console.error("Unexpected app error",n)}}function g(){const e=p();if(!e){l(document.body,"We couldn't load the work experience you wanted to edit. Please try again from the homepage.");return}y(e)}g();
