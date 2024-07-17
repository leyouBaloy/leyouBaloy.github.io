import{C as y,r as f,h as n,d as z,t as B,g as Y,w as k,c as S,o as G,f as J,T as K,m as Q,n as W}from"./index-2W9OxRTD.js";import{d as v,m as g,a as c,n as ee,f as oe,g as ne,h as E,k as te,w as T}from"./Nav-B7HRfrnc.js";import{e as re,f as se,N as P,g as le,o as ae,i as ie,L as ce,k as de}from"./fade-in-scale-up.cssr-Bx-mDZ25.js";function ue(e){return e.nodeType===9?null:e.parentNode}function N(e){if(e===null)return null;const o=ue(e);if(o===null)return null;if(o.nodeType===9)return document.documentElement;if(o.nodeType===1){const{overflow:t,overflowX:l,overflowY:i}=getComputedStyle(o);if(/(auto|scroll|overlay)/.test(t+i+l))return o}return N(o)}function fe(e){return typeof e=="string"?document.querySelector(e):typeof e=="function"?e():e}function Se(e,o=[],t){const l={};return Object.getOwnPropertyNames(e).forEach(r=>{o.includes(r)||(l[r]=e[r])}),Object.assign(l,t)}function Te(e){return Object.keys(e)}const Re=(e,...o)=>typeof e=="function"?e(...o):typeof e=="string"?y(e):typeof e=="number"?y(String(e)):null;function ze(e){switch(typeof e){case"string":return e||void 0;case"number":return String(e);default:return}}const he=f("0px");function R(e){return e.nodeName==="#document"}const be=re("close",n("svg",{viewBox:"0 0 12 12",version:"1.1",xmlns:"http://www.w3.org/2000/svg","aria-hidden":!0},n("g",{stroke:"none","stroke-width":"1",fill:"none","fill-rule":"evenodd"},n("g",{fill:"currentColor","fill-rule":"nonzero"},n("path",{d:"M2.08859116,2.2156945 L2.14644661,2.14644661 C2.32001296,1.97288026 2.58943736,1.95359511 2.7843055,2.08859116 L2.85355339,2.14644661 L6,5.293 L9.14644661,2.14644661 C9.34170876,1.95118446 9.65829124,1.95118446 9.85355339,2.14644661 C10.0488155,2.34170876 10.0488155,2.65829124 9.85355339,2.85355339 L6.707,6 L9.85355339,9.14644661 C10.0271197,9.32001296 10.0464049,9.58943736 9.91140884,9.7843055 L9.85355339,9.85355339 C9.67998704,10.0271197 9.41056264,10.0464049 9.2156945,9.91140884 L9.14644661,9.85355339 L6,6.707 L2.85355339,9.85355339 C2.65829124,10.0488155 2.34170876,10.0488155 2.14644661,9.85355339 C1.95118446,9.65829124 1.95118446,9.34170876 2.14644661,9.14644661 L5.293,6 L2.14644661,2.85355339 C1.97288026,2.67998704 1.95359511,2.41056264 2.08859116,2.2156945 L2.14644661,2.14644661 L2.08859116,2.2156945 Z"}))))),ve=v("base-close",`
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
`,[g("absolute",`
 height: var(--n-close-icon-size);
 width: var(--n-close-icon-size);
 `),c("&::before",`
 content: "";
 position: absolute;
 width: var(--n-close-size);
 height: var(--n-close-size);
 left: 50%;
 top: 50%;
 transform: translateY(-50%) translateX(-50%);
 transition: inherit;
 border-radius: inherit;
 `),ee("disabled",[c("&:hover",`
 color: var(--n-close-icon-color-hover);
 `),c("&:hover::before",`
 background-color: var(--n-close-color-hover);
 `),c("&:focus::before",`
 background-color: var(--n-close-color-hover);
 `),c("&:active",`
 color: var(--n-close-icon-color-pressed);
 `),c("&:active::before",`
 background-color: var(--n-close-color-pressed);
 `)]),g("disabled",`
 cursor: not-allowed;
 color: var(--n-close-icon-color-disabled);
 background-color: transparent;
 `),g("round",[c("&::before",`
 border-radius: 50%;
 `)])]),Be=z({name:"BaseClose",props:{isButtonTag:{type:Boolean,default:!0},clsPrefix:{type:String,required:!0},disabled:{type:Boolean,default:void 0},focusable:{type:Boolean,default:!0},round:Boolean,onClick:Function,absolute:Boolean},setup(e){return se("-base-close",ve,B(e,"clsPrefix")),()=>{const{clsPrefix:o,disabled:t,absolute:l,round:i,isButtonTag:r}=e;return n(r?"button":"div",{type:r?"button":void 0,tabindex:t||!e.focusable?-1:0,"aria-disabled":t,"aria-label":"close",role:r?void 0:"button",disabled:t,class:[`${o}-base-close`,l&&`${o}-base-close--absolute`,t&&`${o}-base-close--disabled`,i&&`${o}-base-close--round`],onMousedown:b=>{e.focusable||b.preventDefault()},onClick:e.onClick},n(P,{clsPrefix:o},{default:()=>n(be,null)}))}}}),me={width:"44px",height:"44px",borderRadius:"22px",iconSize:"26px"},ge=e=>{const{popoverColor:o,textColor2:t,primaryColorHover:l,primaryColorPressed:i}=e;return Object.assign(Object.assign({},me),{color:o,textColor:t,iconColor:t,iconColorHover:l,iconColorPressed:i,boxShadow:"0 2px 8px 0px rgba(0, 0, 0, .12)",boxShadowHover:"0 2px 12px 0px rgba(0, 0, 0, .18)",boxShadowPressed:"0 2px 12px 0px rgba(0, 0, 0, .18)"})},pe={name:"BackTop",common:oe,self:ge},we=n("svg",{viewBox:"0 0 24 24",version:"1.1",xmlns:"http://www.w3.org/2000/svg",xlinkHref:"http://www.w3.org/1999/xlink"},n("g",{stroke:"none","stroke-width":"1","fill-rule":"evenodd"},n("g",{transform:"translate(-139.000000, -4423.000000)","fill-rule":"nonzero"},n("g",{transform:"translate(120.000000, 4285.000000)"},n("g",{transform:"translate(7.000000, 126.000000)"},n("g",{transform:"translate(24.000000, 24.000000) scale(1, -1) translate(-24.000000, -24.000000) translate(12.000000, 12.000000)"},n("g",{transform:"translate(4.000000, 2.000000)"},n("path",{d:"M8,0 C8.51283584,0 8.93550716,0.38604019 8.99327227,0.883378875 L9,1 L9,10.584 L12.2928932,7.29289322 C12.6834175,6.90236893 13.3165825,6.90236893 13.7071068,7.29289322 C14.0675907,7.65337718 14.0953203,8.22060824 13.7902954,8.61289944 L13.7071068,8.70710678 L8.70710678,13.7071068 L8.62544899,13.7803112 L8.618,13.784 L8.59530661,13.8036654 L8.4840621,13.8753288 L8.37133602,13.9287745 L8.22929083,13.9735893 L8.14346259,13.9897165 L8.03324678,13.9994506 L7.9137692,13.9962979 L7.77070917,13.9735893 L7.6583843,13.9401293 L7.57677845,13.9063266 L7.47929125,13.8540045 L7.4048407,13.8036865 L7.38131006,13.7856883 C7.35030318,13.7612383 7.32077858,13.7349921 7.29289322,13.7071068 L2.29289322,8.70710678 L2.20970461,8.61289944 C1.90467972,8.22060824 1.93240926,7.65337718 2.29289322,7.29289322 C2.65337718,6.93240926 3.22060824,6.90467972 3.61289944,7.20970461 L3.70710678,7.29289322 L7,10.585 L7,1 L7.00672773,0.883378875 C7.06449284,0.38604019 7.48716416,0 8,0 Z"}),n("path",{d:"M14.9333333,15.9994506 C15.5224371,15.9994506 16,16.4471659 16,16.9994506 C16,17.5122865 15.5882238,17.9349578 15.0577292,17.9927229 L14.9333333,17.9994506 L1.06666667,17.9994506 C0.477562934,17.9994506 0,17.5517354 0,16.9994506 C0,16.4866148 0.411776203,16.0639435 0.9422708,16.0061783 L1.06666667,15.9994506 L14.9333333,15.9994506 Z"})))))))),xe=v("back-top",`
 position: fixed;
 right: 40px;
 bottom: 40px;
 cursor: pointer;
 display: flex;
 align-items: center;
 justify-content: center;
 color: var(--n-text-color);
 transition:
 color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 border-radius: var(--n-border-radius);
 height: var(--n-height);
 min-width: var(--n-width);
 box-shadow: var(--n-box-shadow);
 background-color: var(--n-color);
`,[le(),g("transition-disabled",{transition:"none !important"}),v("base-icon",`
 font-size: var(--n-icon-size);
 color: var(--n-icon-color);
 transition: color .3s var(--n-bezier);
 `),c("svg",{pointerEvents:"none"}),c("&:hover",{boxShadow:"var(--n-box-shadow-hover)"},[v("base-icon",{color:"var(--n-icon-color-hover)"})]),c("&:active",{boxShadow:"var(--n-box-shadow-pressed)"},[v("base-icon",{color:"var(--n-icon-color-pressed)"})])]),Ce=Object.assign(Object.assign({},E.props),{show:{type:Boolean,default:void 0},right:{type:[Number,String],default:40},bottom:{type:[Number,String],default:40},to:{type:[String,Object],default:"body"},visibilityHeight:{type:Number,default:180},listenTo:[String,Object,Function],"onUpdate:show":{type:Function,default:()=>{}},target:Function,onShow:Function,onHide:Function}),Ee=z({name:"BackTop",inheritAttrs:!1,props:Ce,setup(e){const{mergedClsPrefixRef:o,inlineThemeDisabled:t}=ne(e),l=f(null),i=f(!1);Y(()=>{const{value:a}=l;if(a===null){i.value=!1;return}i.value=a>=e.visibilityHeight});const r=f(!1);k(i,a=>{var s;r.value&&((s=e["onUpdate:show"])===null||s===void 0||s.call(e,a))});const w=B(e,"show"),b=ae(w,i),p=f(!0),x=f(null),O=S(()=>({right:`calc(${T(e.right)} + ${he.value})`,bottom:T(e.bottom)}));let u,C;k(b,a=>{var s,d;r.value&&(a&&((s=e.onShow)===null||s===void 0||s.call(e)),(d=e.onHide)===null||d===void 0||d.call(e))});const H=E("BackTop","-back-top",xe,pe,e,o);function $(){var a;if(C)return;C=!0;const s=((a=e.target)===null||a===void 0?void 0:a.call(e))||fe(e.listenTo)||N(x.value);if(!s)return;u=s===document.documentElement?document:s;const{to:d}=e;typeof d=="string"&&document.querySelector(d),u.addEventListener("scroll",m),m()}function j(){(R(u)?document.documentElement:u).scrollTo({top:0,behavior:"smooth"})}function m(){l.value=(R(u)?document.documentElement:u).scrollTop,r.value||W(()=>{r.value=!0})}function M(){p.value=!1}G(()=>{$(),p.value=b.value}),J(()=>{u&&u.removeEventListener("scroll",m)});const L=S(()=>{const{self:{color:a,boxShadow:s,boxShadowHover:d,boxShadowPressed:D,iconColor:I,iconColorHover:F,iconColorPressed:A,width:V,height:_,iconSize:U,borderRadius:q,textColor:Z},common:{cubicBezierEaseInOut:X}}=H.value;return{"--n-bezier":X,"--n-border-radius":q,"--n-height":_,"--n-width":V,"--n-box-shadow":s,"--n-box-shadow-hover":d,"--n-box-shadow-pressed":D,"--n-color":a,"--n-icon-size":U,"--n-icon-color":I,"--n-icon-color-hover":F,"--n-icon-color-pressed":A,"--n-text-color":Z}}),h=t?te("back-top",void 0,L,e):void 0;return{placeholderRef:x,style:O,mergedShow:b,isMounted:ie(),scrollElement:f(null),scrollTop:l,DomInfoReady:r,transitionDisabled:p,mergedClsPrefix:o,handleAfterEnter:M,handleScroll:m,handleClick:j,cssVars:t?void 0:L,themeClass:h==null?void 0:h.themeClass,onRender:h==null?void 0:h.onRender}},render(){const{mergedClsPrefix:e}=this;return n("div",{ref:"placeholderRef",class:`${e}-back-top-placeholder`,style:"display: none","aria-hidden":!0},n(ce,{to:this.to,show:this.mergedShow},{default:()=>n(K,{name:"fade-in-scale-up-transition",appear:this.isMounted,onAfterEnter:this.handleAfterEnter},{default:()=>{var o;return(o=this.onRender)===null||o===void 0||o.call(this),this.mergedShow?n("div",Q(this.$attrs,{class:[`${e}-back-top`,this.themeClass,this.transitionDisabled&&`${e}-back-top--transition-disabled`],style:[this.style,this.cssVars],onClick:this.handleClick}),de(this.$slots.default,()=>[n(P,{clsPrefix:e},{default:()=>we})])):null}})}))}});export{Be as N,Ee as a,ze as g,Te as k,Se as o,Re as r,fe as u};
