import{C as c,h as t,d,t as f}from"./index-DwtWgll2.js";import{d as b,m as i,a as r,n as v}from"./Nav-Nz7onVR8.js";import{e as p,f as g,N as h}from"./Scrollbar-BZGCAU_h.js";function B(e){return typeof e=="string"?document.querySelector(e):typeof e=="function"?e():e}function x(e,o=[],s){const l={};return Object.getOwnPropertyNames(e).forEach(n=>{o.includes(n)||(l[n]=e[n])}),Object.assign(l,s)}function z(e){return Object.keys(e)}function N(e,...o){return typeof e=="function"?e(...o):typeof e=="string"?c(e):typeof e=="number"?c(String(e)):null}function O(e){switch(typeof e){case"string":return e||void 0;case"number":return String(e);default:return}}const m=p("close",t("svg",{viewBox:"0 0 12 12",version:"1.1",xmlns:"http://www.w3.org/2000/svg","aria-hidden":!0},t("g",{stroke:"none","stroke-width":"1",fill:"none","fill-rule":"evenodd"},t("g",{fill:"currentColor","fill-rule":"nonzero"},t("path",{d:"M2.08859116,2.2156945 L2.14644661,2.14644661 C2.32001296,1.97288026 2.58943736,1.95359511 2.7843055,2.08859116 L2.85355339,2.14644661 L6,5.293 L9.14644661,2.14644661 C9.34170876,1.95118446 9.65829124,1.95118446 9.85355339,2.14644661 C10.0488155,2.34170876 10.0488155,2.65829124 9.85355339,2.85355339 L6.707,6 L9.85355339,9.14644661 C10.0271197,9.32001296 10.0464049,9.58943736 9.91140884,9.7843055 L9.85355339,9.85355339 C9.67998704,10.0271197 9.41056264,10.0464049 9.2156945,9.91140884 L9.14644661,9.85355339 L6,6.707 L2.85355339,9.85355339 C2.65829124,10.0488155 2.34170876,10.0488155 2.14644661,9.85355339 C1.95118446,9.65829124 1.95118446,9.34170876 2.14644661,9.14644661 L5.293,6 L2.14644661,2.85355339 C1.97288026,2.67998704 1.95359511,2.41056264 2.08859116,2.2156945 L2.14644661,2.14644661 L2.08859116,2.2156945 Z"}))))),y=b("base-close",`
 display: flex;
 align-items: center;
 justify-content: center;
 cursor: pointer;
 background-color: transparent;
 color: var(--n-close-icon-color);
 border-radius: var(--n-close-border-radius);
 height: var(--n-close-size);
 width: var(--n-close-size);
 font-size: var(--n-close-icon-size);
 outline: none;
 border: none;
 position: relative;
 padding: 0;
`,[i("absolute",`
 height: var(--n-close-icon-size);
 width: var(--n-close-icon-size);
 `),r("&::before",`
 content: "";
 position: absolute;
 width: var(--n-close-size);
 height: var(--n-close-size);
 left: 50%;
 top: 50%;
 transform: translateY(-50%) translateX(-50%);
 transition: inherit;
 border-radius: inherit;
 `),v("disabled",[r("&:hover",`
 color: var(--n-close-icon-color-hover);
 `),r("&:hover::before",`
 background-color: var(--n-close-color-hover);
 `),r("&:focus::before",`
 background-color: var(--n-close-color-hover);
 `),r("&:active",`
 color: var(--n-close-icon-color-pressed);
 `),r("&:active::before",`
 background-color: var(--n-close-color-pressed);
 `)]),i("disabled",`
 cursor: not-allowed;
 color: var(--n-close-icon-color-disabled);
 background-color: transparent;
 `),i("round",[r("&::before",`
 border-radius: 50%;
 `)])]),T=d({name:"BaseClose",props:{isButtonTag:{type:Boolean,default:!0},clsPrefix:{type:String,required:!0},disabled:{type:Boolean,default:void 0},focusable:{type:Boolean,default:!0},round:Boolean,onClick:Function,absolute:Boolean},setup(e){return g("-base-close",y,f(e,"clsPrefix")),()=>{const{clsPrefix:o,disabled:s,absolute:l,round:a,isButtonTag:n}=e;return t(n?"button":"div",{type:n?"button":void 0,tabindex:s||!e.focusable?-1:0,"aria-disabled":s,"aria-label":"close",role:n?void 0:"button",disabled:s,class:[`${o}-base-close`,l&&`${o}-base-close--absolute`,s&&`${o}-base-close--disabled`,a&&`${o}-base-close--round`],onMousedown:u=>{e.focusable||u.preventDefault()},onClick:e.onClick},t(h,{clsPrefix:o},{default:()=>t(m,null)}))}}});export{T as N,O as g,z as k,x as o,N as r,B as u};
