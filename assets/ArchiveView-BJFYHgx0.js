import{y as ie,a as re,b as xe,o as le,d as N,h as p,r as _,q as Me,c as j,t as H,z as at,n as pe,m as qt,F as J,w as Jt,A as Zt,B as Qt,C as Kt,D as ea,_ as Be,f as V,g as W,E as ta,i as F,p as oe,G as aa,j as X,l as q,u as U,s as ae,H as fe}from"./app-DGcbnNn7.js";import{c as Ve,b as ra,i as na,d as rt,e as oa,r as ia,N as nt,f as la,S as sa,o as ot,k as Fe,g as Te,h as Ne,u as da,j as be,l as ca,m as ue,a as Ge}from"./Scrollbar-BqaHFFGb.js";import{h as fa,i as he,j as ba,c as l,a as g,u as _e,b as R,k as me,d as it,l as ua,m as lt,n as A,e as ye,g as st,t as pa,o as De,V as ke,p as G,F as va}from"./Foot-DM2-IZtq.js";import{P as ga}from"./PageHead-CJ9Ryh2X.js";import{u as dt}from"./unwrap-element-CJbG4D_o.js";function ha(e,t,a){const n=ie(e,null);n!==null&&(t in n||(n[t]=[]),n[t].push(a.value),re(a,(i,d)=>{const b=n[t],s=b.findIndex(m=>m===d);~s&&b.splice(s,1),b.push(i)}),xe(()=>{const i=n[t],d=i.findIndex(b=>b===a.value);~d&&i.splice(d,1)}))}function ma(e,t,a){const n=ie(e,null);n!==null&&(t in n||(n[t]=[]),le(()=>{const i=a();i&&n[t].push(i)}),xe(()=>{const i=n[t],d=a(),b=i.findIndex(s=>s===d);~b&&i.splice(b,1)}))}const xa=Ve(".v-x-scroll",{overflow:"auto",scrollbarWidth:"none"},[Ve("&::-webkit-scrollbar",{width:0,height:0})]),ya=N({name:"XScroll",props:{disabled:Boolean,onScroll:Function},setup(){const e=_(null);function t(i){!(i.currentTarget.offsetWidth<i.currentTarget.scrollWidth)||i.deltaY===0||(i.currentTarget.scrollLeft+=i.deltaY+i.deltaX,i.preventDefault())}const a=fa();return xa.mount({id:"vueuc/x-scroll",head:!0,anchorMetaName:ra,ssr:a}),Object.assign({selfRef:e,handleWheel:t},{scrollTo(...i){var d;(d=e.value)===null||d===void 0||d.scrollTo(...i)}})},render(){return p("div",{ref:"selfRef",onScroll:this.onScroll,onWheel:this.disabled?void 0:this.handleWheel,class:"v-x-scroll"},this.$slots)}});function Ca(e){switch(typeof e){case"string":return e||void 0;case"number":return String(e);default:return}}function ct(e){return Object.keys(e)}function Sa(e,t=[],a){const n={};return Object.getOwnPropertyNames(e).forEach(d=>{t.includes(d)||(n[d]=e[d])}),Object.assign(n,a)}function wa(e,...t){return typeof e=="function"?e(...t):typeof e=="string"?Me(e):typeof e=="number"?Me(String(e)):null}var Ta=/\s/;function ka(e){for(var t=e.length;t--&&Ta.test(e.charAt(t)););return t}var Ra=/^\s+/;function Pa(e){return e&&e.slice(0,ka(e)+1).replace(Ra,"")}var Xe=NaN,$a=/^[-+]0x[0-9a-f]+$/i,Ba=/^0b[01]+$/i,_a=/^0o[0-7]+$/i,za=parseInt;function Ue(e){if(typeof e=="number")return e;if(na(e))return Xe;if(he(e)){var t=typeof e.valueOf=="function"?e.valueOf():e;e=he(t)?t+"":t}if(typeof e!="string")return e===0?e:+e;e=Pa(e);var a=Ba.test(e);return a||_a.test(e)?za(e.slice(2),a?2:8):$a.test(e)?Xe:+e}var Re=function(){return ba.Date.now()},La="Expected a function",Aa=Math.max,Ea=Math.min;function Wa(e,t,a){var n,i,d,b,s,m,h=0,x=!1,P=!1,B=!0;if(typeof e!="function")throw new TypeError(La);t=Ue(t)||0,he(a)&&(x=!!a.leading,P="maxWait"in a,d=P?Aa(Ue(a.maxWait)||0,t):d,B="trailing"in a?!!a.trailing:B);function k(u){var y=n,O=i;return n=i=void 0,h=u,b=e.apply(O,y),b}function S(u){return h=u,s=setTimeout(f,t),x?k(u):b}function C(u){var y=u-m,O=u-h,D=t-y;return P?Ea(D,d-O):D}function c(u){var y=u-m,O=u-h;return m===void 0||y>=t||y<0||P&&O>=d}function f(){var u=Re();if(c(u))return $(u);s=setTimeout(f,C(u))}function $(u){return s=void 0,B&&n?k(u):(n=i=void 0,b)}function E(){s!==void 0&&clearTimeout(s),h=0,n=m=i=s=void 0}function z(){return s===void 0?b:$(Re())}function T(){var u=Re(),y=c(u);if(n=arguments,i=this,m=u,y){if(s===void 0)return S(m);if(P)return clearTimeout(s),s=setTimeout(f,t),k(m)}return s===void 0&&(s=setTimeout(f,t)),b}return T.cancel=E,T.flush=z,T}var ja="Expected a function";function ve(e,t,a){var n=!0,i=!0;if(typeof e!="function")throw new TypeError(ja);return he(a)&&(n="leading"in a?!!a.leading:n,i="trailing"in a?!!a.trailing:i),Wa(e,t,{leading:n,maxWait:t,trailing:i})}const Ha=l("affix",[g("affixed",{position:"fixed"},[g("absolute-positioned",{position:"absolute"})])]);function Oa(e){return e instanceof HTMLElement?e.scrollTop:window.scrollY}function Ia(e){return e instanceof HTMLElement?e.getBoundingClientRect():{top:0,bottom:window.innerHeight}}const ze={listenTo:[String,Object,Function],top:Number,bottom:Number,triggerTop:Number,triggerBottom:Number,position:{type:String,default:"fixed"},offsetTop:{type:Number,validator:()=>!0,default:void 0},offsetBottom:{type:Number,validator:()=>!0,default:void 0},target:{type:Function,validator:()=>!0,default:void 0}},Ma=ct(ze),Va=N({name:"Affix",props:ze,setup(e){const{mergedClsPrefixRef:t}=_e(e);rt("-affix",Ha,t);let a=null;const n=_(!1),i=_(!1),d=_(null),b=_(null),s=j(()=>i.value||n.value),m=j(()=>{var c,f;return(f=(c=e.triggerTop)!==null&&c!==void 0?c:e.offsetTop)!==null&&f!==void 0?f:e.top}),h=j(()=>{var c,f;return(f=(c=e.top)!==null&&c!==void 0?c:e.triggerTop)!==null&&f!==void 0?f:e.offsetTop}),x=j(()=>{var c,f;return(f=(c=e.bottom)!==null&&c!==void 0?c:e.triggerBottom)!==null&&f!==void 0?f:e.offsetBottom}),P=j(()=>{var c,f;return(f=(c=e.triggerBottom)!==null&&c!==void 0?c:e.offsetBottom)!==null&&f!==void 0?f:e.bottom}),B=_(null),k=()=>{const{target:c,listenTo:f}=e;c?a=c():f?a=dt(f):a=document,a&&(a.addEventListener("scroll",S),S())};function S(){oa(C)}function C(){const{value:c}=B;if(!a||!c)return;const f=Oa(a);if(s.value){b.value!==null&&f<b.value&&(n.value=!1,b.value=null),d.value!==null&&f>d.value&&(i.value=!1,d.value=null);return}const $=Ia(a),E=c.getBoundingClientRect(),z=E.top-$.top,T=$.bottom-E.bottom,u=m.value,y=P.value;u!==void 0&&z<=u?(n.value=!0,b.value=f-(u-z)):(n.value=!1,b.value=null),y!==void 0&&T<=y?(i.value=!0,d.value=f+y-T):(i.value=!1,d.value=null)}return le(()=>{k()}),xe(()=>{a&&a.removeEventListener("scroll",S)}),{selfRef:B,affixed:s,mergedClsPrefix:t,mergedstyle:j(()=>{const c={};return n.value&&m.value!==void 0&&h.value!==void 0&&(c.top=`${h.value}px`),i.value&&P.value!==void 0&&x.value!==void 0&&(c.bottom=`${x.value}px`),c})}},render(){const{mergedClsPrefix:e}=this;return p("div",{ref:"selfRef",class:[`${e}-affix`,{[`${e}-affix--affixed`]:this.affixed,[`${e}-affix--absolute-positioned`]:this.position==="absolute"}],style:this.mergedstyle},this.$slots)}}),Fa=N({name:"Add",render(){return p("svg",{width:"512",height:"512",viewBox:"0 0 512 512",fill:"none",xmlns:"http://www.w3.org/2000/svg"},p("path",{d:"M256 112V400M400 256H112",stroke:"currentColor","stroke-width":"32","stroke-linecap":"round","stroke-linejoin":"round"}))}}),Na=ia("close",()=>p("svg",{viewBox:"0 0 12 12",version:"1.1",xmlns:"http://www.w3.org/2000/svg","aria-hidden":!0},p("g",{stroke:"none","stroke-width":"1",fill:"none","fill-rule":"evenodd"},p("g",{fill:"currentColor","fill-rule":"nonzero"},p("path",{d:"M2.08859116,2.2156945 L2.14644661,2.14644661 C2.32001296,1.97288026 2.58943736,1.95359511 2.7843055,2.08859116 L2.85355339,2.14644661 L6,5.293 L9.14644661,2.14644661 C9.34170876,1.95118446 9.65829124,1.95118446 9.85355339,2.14644661 C10.0488155,2.34170876 10.0488155,2.65829124 9.85355339,2.85355339 L6.707,6 L9.85355339,9.14644661 C10.0271197,9.32001296 10.0464049,9.58943736 9.91140884,9.7843055 L9.85355339,9.85355339 C9.67998704,10.0271197 9.41056264,10.0464049 9.2156945,9.91140884 L9.14644661,9.85355339 L6,6.707 L2.85355339,9.85355339 C2.65829124,10.0488155 2.34170876,10.0488155 2.14644661,9.85355339 C1.95118446,9.65829124 1.95118446,9.34170876 2.14644661,9.14644661 L5.293,6 L2.14644661,2.85355339 C1.97288026,2.67998704 1.95359511,2.41056264 2.08859116,2.2156945 L2.14644661,2.14644661 L2.08859116,2.2156945 Z"}))))),Ga=l("base-close",`
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
 `),R("&::before",`
 content: "";
 position: absolute;
 width: var(--n-close-size);
 height: var(--n-close-size);
 left: 50%;
 top: 50%;
 transform: translateY(-50%) translateX(-50%);
 transition: inherit;
 border-radius: inherit;
 `),me("disabled",[R("&:hover",`
 color: var(--n-close-icon-color-hover);
 `),R("&:hover::before",`
 background-color: var(--n-close-color-hover);
 `),R("&:focus::before",`
 background-color: var(--n-close-color-hover);
 `),R("&:active",`
 color: var(--n-close-icon-color-pressed);
 `),R("&:active::before",`
 background-color: var(--n-close-color-pressed);
 `)]),g("disabled",`
 cursor: not-allowed;
 color: var(--n-close-icon-color-disabled);
 background-color: transparent;
 `),g("round",[R("&::before",`
 border-radius: 50%;
 `)])]),Da=N({name:"BaseClose",props:{isButtonTag:{type:Boolean,default:!0},clsPrefix:{type:String,required:!0},disabled:{type:Boolean,default:void 0},focusable:{type:Boolean,default:!0},round:Boolean,onClick:Function,absolute:Boolean},setup(e){return rt("-base-close",Ga,H(e,"clsPrefix")),()=>{const{clsPrefix:t,disabled:a,absolute:n,round:i,isButtonTag:d}=e;return p(d?"button":"div",{type:d?"button":void 0,tabindex:a||!e.focusable?-1:0,"aria-disabled":a,"aria-label":"close",role:d?void 0:"button",disabled:a,class:[`${t}-base-close`,n&&`${t}-base-close--absolute`,a&&`${t}-base-close--disabled`,i&&`${t}-base-close--round`],onMousedown:s=>{e.focusable||s.preventDefault()},onClick:e.onClick},p(nt,{clsPrefix:t},{default:()=>p(Na,null)}))}}}),Xa={linkFontSize:"13px",linkPadding:"0 0 0 16px",railWidth:"4px"};function Ua(e){const{borderRadius:t,railColor:a,primaryColor:n,primaryColorHover:i,primaryColorPressed:d,textColor2:b}=e;return Object.assign(Object.assign({},Xa),{borderRadius:t,railColor:a,railColorActive:n,linkColor:ua(n,{alpha:.15}),linkTextColor:b,linkTextColorHover:i,linkTextColorPressed:d,linkTextColorActive:n})}const Ya={common:it,self:Ua},ge=lt("n-anchor"),qa={title:String,href:String},Ye=N({name:"AnchorLink",props:qa,setup(e,{slots:t}){const a=_(null),n=ie(ge),i=H(e,"href"),d=la(()=>i.value&&i.value===n.activeHref.value);ha(ge,"collectedLinkHrefs",i),ma(ge,"titleEls",()=>a.value),re(d,s=>{s&&a.value&&n.updateBarPosition(a.value)});function b(){e.href!==void 0&&n.setActiveHref(e.href)}return()=>{var s;const{value:m}=n.mergedClsPrefix;return p("div",{class:[`${m}-anchor-link`,d.value&&`${m}-anchor-link--active`]},p("a",{ref:a,class:[`${m}-anchor-link__title`],href:e.href,title:Ca(e.title),onClick:b},e.title),(s=t.default)===null||s===void 0?void 0:s.call(t))}}});function Ja(e,t){const{top:a,height:n}=e.getBoundingClientRect(),i=t instanceof HTMLElement?t.getBoundingClientRect().top:0;return{top:a-i,height:n}}const Le={type:{type:String,default:"rail"},showRail:{type:Boolean,default:!0},showBackground:{type:Boolean,default:!0},bound:{type:Number,default:12},internalScrollable:Boolean,ignoreGap:Boolean,offsetTarget:[String,Object,Function]},Za=ct(Le),Qa=N({name:"BaseAnchor",props:Object.assign(Object.assign({},Le),{mergedClsPrefix:{type:String,required:!0}}),setup(e){const t=[],a=[],n=_(null),i=_(null),d=_(null),b=_(null),s=j(()=>e.type==="block"),m=j(()=>!s.value&&e.showRail);function h(){const{value:S}=d,{value:C}=i;S&&(S.style.transition="none"),C&&(C.style.transition="none"),a&&a.forEach(c=>{c.style.transition="none"}),pe(()=>{const{value:c}=d,{value:f}=i;c&&(c.offsetWidth,c.style.transition=""),f&&(f.offsetWidth,f.style.transition=""),a&&a.forEach($=>{$.offsetWidth,$.style.transition=""})})}function x(S,C=!0){const{value:c}=d,{value:f}=i,{value:$}=b;if(!$||!c)return;C||(c.style.transition="none",f&&(f.style.transition="none"));const{offsetHeight:E,offsetWidth:z}=S,{top:T,left:u}=S.getBoundingClientRect(),{top:y,left:O}=$.getBoundingClientRect(),D=T-y,Z=u-O;c.style.top=`${D}px`,c.style.height=`${E}px`,f&&(f.style.top=`${D}px`,f.style.height=`${E}px`,f.style.maxWidth=`${z+Z}px`),c.offsetHeight,f&&f.offsetHeight,C||(c.style.transition="",f&&(f.style.transition=""))}const P=ve(()=>{k(!0)},128);function B(S,C=!0){const c=/^#([^#]+)$/.exec(S);if(!c)return;const f=document.getElementById(c[1]);f&&(n.value=S,f.scrollIntoView(),C||h(),P())}function k(S=!0){var C;const c=[],f=dt((C=e.offsetTarget)!==null&&C!==void 0?C:document);t.forEach(u=>{const y=/#([^#]+)$/.exec(u);if(!y)return;const O=document.getElementById(y[1]);if(O&&f){const{top:D,height:Z}=Ja(O,f);c.push({top:D,height:Z,href:u})}}),c.sort((u,y)=>u.top>y.top?1:(u.top===y.top&&u.height<y.height,-1));const $=n.value,{bound:E,ignoreGap:z}=e,T=c.reduce((u,y)=>y.top+y.height<0?z?y:u:y.top<=E?u===null?y:y.top===u.top?y.href===$?y:u:y.top>u.top?y:u:u,null);S||h(),T?n.value=T.href:n.value=null}return at(ge,{activeHref:n,mergedClsPrefix:H(e,"mergedClsPrefix"),updateBarPosition:x,setActiveHref:B,collectedLinkHrefs:t,titleEls:a}),le(()=>{document.addEventListener("scroll",P,!0),B(window.location.hash),k(!1)}),ot(()=>{B(window.location.hash),k(!1)}),xe(()=>{document.removeEventListener("scroll",P,!0)}),re(n,S=>{if(S===null){const{value:C}=i;C&&!s.value&&(C.style.maxWidth="0")}}),{selfRef:b,barRef:d,slotRef:i,setActiveHref:B,activeHref:n,isBlockType:s,mergedShowRail:m}},render(){var e;const{mergedClsPrefix:t,mergedShowRail:a,isBlockType:n,$slots:i}=this,d=p("div",{class:[`${t}-anchor`,n&&`${t}-anchor--block`,a&&`${t}-anchor--show-rail`],ref:"selfRef"},a&&this.showBackground?p("div",{ref:"slotRef",class:`${t}-anchor-link-background`}):null,a?p("div",{class:`${t}-anchor-rail`},p("div",{ref:"barRef",class:[`${t}-anchor-rail__bar`,this.activeHref!==null&&`${t}-anchor-rail__bar--active`]})):null,(e=i.default)===null||e===void 0?void 0:e.call(i));return this.internalScrollable?p(sa,null,{default:()=>d}):d}}),Ka=l("anchor",`
 position: relative;
`,[me("block",`
 padding-left: var(--n-rail-width);
 `,[l("anchor-link",[R("+, >",[l("anchor-link",`
 margin-top: .5em;
 `)])]),l("anchor-link-background",`
 max-width: 0;
 border-top-right-radius: 10.5px;
 border-bottom-right-radius: 10.5px;
 `),me("show-rail",[R(">",[l("anchor-link","padding-left: 0;")])])]),g("block",[l("anchor-link",`
 margin-bottom: 4px;
 padding: 2px 8px;
 transition: background-color .3s var(--n-bezier);
 background-color: transparent;
 border-radius: var(--n-link-border-radius);
 `,[g("active",`
 background-color: var(--n-link-color);
 `)])]),l("anchor-link-background",`
 position: absolute;
 left: calc(var(--n-rail-width) / 2);
 width: 100%;
 background-color: var(--n-link-color);
 transition:
 top .15s var(--n-bezier),
 max-width .15s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `),l("anchor-rail",`
 position: absolute;
 left: 0;
 top: 0;
 bottom: 0;
 width: var(--n-rail-width);
 border-radius: calc(var(--n-rail-width) / 2);
 overflow: hidden;
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-rail-color);
 `,[A("bar",`
 position: absolute;
 left: 0;
 width: var(--n-rail-width);
 height: 21px;
 background-color: #0000;
 transition: 
 top .15s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `,[g("active",{backgroundColor:"var(--n-rail-color-active)"})])]),l("anchor-link",`
 padding: var(--n-link-padding);
 position: relative;
 line-height: 1.5;
 font-size: var(--n-link-font-size);
 min-height: 1.5em;
 display: flex;
 flex-direction: column;
 `,[g("active",[R(">",[A("title",`
 color: var(--n-link-text-color-active);
 `)])]),A("title",`
 outline: none;
 max-width: 100%;
 text-decoration: none;
 white-space: nowrap;
 text-overflow: ellipsis;
 overflow: hidden;
 cursor: pointer;
 display: inline-block;
 padding-right: 16px;
 transition: color .3s var(--n-bezier);
 color: var(--n-link-text-color);
 `,[R("&:hover, &:focus",`
 color: var(--n-link-text-color-hover);
 `),R("&:active",`
 color: var(--n-link-text-color-pressed);
 `)])])]),er=Object.assign(Object.assign(Object.assign(Object.assign({},ye.props),{affix:Boolean}),ze),Le),qe=N({name:"Anchor",props:er,setup(e,{slots:t}){const{mergedClsPrefixRef:a,inlineThemeDisabled:n}=_e(e),i=ye("Anchor","-anchor",Ka,Ya,e,a),d=_(null),b=j(()=>{const{self:{railColor:m,linkColor:h,railColorActive:x,linkTextColor:P,linkTextColorHover:B,linkTextColorPressed:k,linkTextColorActive:S,linkFontSize:C,railWidth:c,linkPadding:f,borderRadius:$},common:{cubicBezierEaseInOut:E}}=i.value;return{"--n-link-border-radius":$,"--n-link-color":h,"--n-link-font-size":C,"--n-link-text-color":P,"--n-link-text-color-hover":B,"--n-link-text-color-active":S,"--n-link-text-color-pressed":k,"--n-link-padding":f,"--n-bezier":E,"--n-rail-color":m,"--n-rail-color-active":x,"--n-rail-width":c}}),s=n?st("anchor",void 0,b,e):void 0;return{scrollTo(m){var h;(h=d.value)===null||h===void 0||h.setActiveHref(m)},renderAnchor:()=>(s==null||s.onRender(),p(Qa,Object.assign({ref:d,style:n?void 0:b.value,class:s==null?void 0:s.themeClass.value},Fe(e,Za),{mergedClsPrefix:a.value}),t))}},render(){return this.affix?p(Va,Object.assign({},Fe(this,Ma)),{default:this.renderAnchor}):this.renderAnchor()}}),tr={tabFontSizeSmall:"14px",tabFontSizeMedium:"14px",tabFontSizeLarge:"16px",tabGapSmallLine:"36px",tabGapMediumLine:"36px",tabGapLargeLine:"36px",tabGapSmallLineVertical:"8px",tabGapMediumLineVertical:"8px",tabGapLargeLineVertical:"8px",tabPaddingSmallLine:"6px 0",tabPaddingMediumLine:"10px 0",tabPaddingLargeLine:"14px 0",tabPaddingVerticalSmallLine:"6px 12px",tabPaddingVerticalMediumLine:"8px 16px",tabPaddingVerticalLargeLine:"10px 20px",tabGapSmallBar:"36px",tabGapMediumBar:"36px",tabGapLargeBar:"36px",tabGapSmallBarVertical:"8px",tabGapMediumBarVertical:"8px",tabGapLargeBarVertical:"8px",tabPaddingSmallBar:"4px 0",tabPaddingMediumBar:"6px 0",tabPaddingLargeBar:"10px 0",tabPaddingVerticalSmallBar:"6px 12px",tabPaddingVerticalMediumBar:"8px 16px",tabPaddingVerticalLargeBar:"10px 20px",tabGapSmallCard:"4px",tabGapMediumCard:"4px",tabGapLargeCard:"4px",tabGapSmallCardVertical:"4px",tabGapMediumCardVertical:"4px",tabGapLargeCardVertical:"4px",tabPaddingSmallCard:"8px 16px",tabPaddingMediumCard:"10px 20px",tabPaddingLargeCard:"12px 24px",tabPaddingSmallSegment:"4px 0",tabPaddingMediumSegment:"6px 0",tabPaddingLargeSegment:"8px 0",tabPaddingVerticalLargeSegment:"0 8px",tabPaddingVerticalSmallCard:"8px 12px",tabPaddingVerticalMediumCard:"10px 16px",tabPaddingVerticalLargeCard:"12px 20px",tabPaddingVerticalSmallSegment:"0 4px",tabPaddingVerticalMediumSegment:"0 6px",tabGapSmallSegment:"0",tabGapMediumSegment:"0",tabGapLargeSegment:"0",tabGapSmallSegmentVertical:"0",tabGapMediumSegmentVertical:"0",tabGapLargeSegmentVertical:"0",panePaddingSmall:"8px 0 0 0",panePaddingMedium:"12px 0 0 0",panePaddingLarge:"16px 0 0 0",closeSize:"18px",closeIconSize:"14px"};function ar(e){const{textColor2:t,primaryColor:a,textColorDisabled:n,closeIconColor:i,closeIconColorHover:d,closeIconColorPressed:b,closeColorHover:s,closeColorPressed:m,tabColor:h,baseColor:x,dividerColor:P,fontWeight:B,textColor1:k,borderRadius:S,fontSize:C,fontWeightStrong:c}=e;return Object.assign(Object.assign({},tr),{colorSegment:h,tabFontSizeCard:C,tabTextColorLine:k,tabTextColorActiveLine:a,tabTextColorHoverLine:a,tabTextColorDisabledLine:n,tabTextColorSegment:k,tabTextColorActiveSegment:t,tabTextColorHoverSegment:t,tabTextColorDisabledSegment:n,tabTextColorBar:k,tabTextColorActiveBar:a,tabTextColorHoverBar:a,tabTextColorDisabledBar:n,tabTextColorCard:k,tabTextColorHoverCard:k,tabTextColorActiveCard:a,tabTextColorDisabledCard:n,barColor:a,closeIconColor:i,closeIconColorHover:d,closeIconColorPressed:b,closeColorHover:s,closeColorPressed:m,closeBorderRadius:S,tabColor:h,tabColorSegment:x,tabBorderColor:P,tabFontWeightActive:B,tabFontWeight:B,tabBorderRadius:S,paneTextColor:t,fontWeightStrong:c})}const rr={common:it,self:ar},Ae=lt("n-tabs"),ft={tab:[String,Number,Object,Function],name:{type:[String,Number],required:!0},disabled:Boolean,displayDirective:{type:String,default:"if"},closable:{type:Boolean,default:void 0},tabProps:Object,label:[String,Number,Object,Function]},Je=N({__TAB_PANE__:!0,name:"TabPane",alias:["TabPanel"],props:ft,slots:Object,setup(e){const t=ie(Ae,null);return t||pa("tab-pane","`n-tab-pane` must be placed inside `n-tabs`."),{style:t.paneStyleRef,class:t.paneClassRef,mergedClsPrefix:t.mergedClsPrefixRef}},render(){return p("div",{class:[`${this.mergedClsPrefix}-tab-pane`,this.class],style:this.style},this.$slots)}}),nr=Object.assign({internalLeftPadded:Boolean,internalAddable:Boolean,internalCreatedByPane:Boolean},Sa(ft,["displayDirective"])),$e=N({__TAB__:!0,inheritAttrs:!1,name:"Tab",props:nr,setup(e){const{mergedClsPrefixRef:t,valueRef:a,typeRef:n,closableRef:i,tabStyleRef:d,addTabStyleRef:b,tabClassRef:s,addTabClassRef:m,tabChangeIdRef:h,onBeforeLeaveRef:x,triggerRef:P,handleAdd:B,activateTab:k,handleClose:S}=ie(Ae);return{trigger:P,mergedClosable:j(()=>{if(e.internalAddable)return!1;const{closable:C}=e;return C===void 0?i.value:C}),style:d,addStyle:b,tabClass:s,addTabClass:m,clsPrefix:t,value:a,type:n,handleClose(C){C.stopPropagation(),!e.disabled&&S(e.name)},activateTab(){if(e.disabled)return;if(e.internalAddable){B();return}const{name:C}=e,c=++h.id;if(C!==a.value){const{value:f}=x;f?Promise.resolve(f(e.name,a.value)).then($=>{$&&h.id===c&&k(C)}):k(C)}}}},render(){const{internalAddable:e,clsPrefix:t,name:a,disabled:n,label:i,tab:d,value:b,mergedClosable:s,trigger:m,$slots:{default:h}}=this,x=i??d;return p("div",{class:`${t}-tabs-tab-wrapper`},this.internalLeftPadded?p("div",{class:`${t}-tabs-tab-pad`}):null,p("div",Object.assign({key:a,"data-name":a,"data-disabled":n?!0:void 0},qt({class:[`${t}-tabs-tab`,b===a&&`${t}-tabs-tab--active`,n&&`${t}-tabs-tab--disabled`,s&&`${t}-tabs-tab--closable`,e&&`${t}-tabs-tab--addable`,e?this.addTabClass:this.tabClass],onClick:m==="click"?this.activateTab:void 0,onMouseenter:m==="hover"?this.activateTab:void 0,style:e?this.addStyle:this.style},this.internalCreatedByPane?this.tabProps||{}:this.$attrs)),p("span",{class:`${t}-tabs-tab__label`},e?p(J,null,p("div",{class:`${t}-tabs-tab__height-placeholder`}," "),p(nt,{clsPrefix:t},{default:()=>p(Fa,null)})):h?h():typeof x=="object"?x:wa(x??a)),s&&this.type==="card"?p(Da,{clsPrefix:t,class:`${t}-tabs-tab__close`,onClick:this.handleClose,disabled:n}):null))}}),or=l("tabs",`
 box-sizing: border-box;
 width: 100%;
 display: flex;
 flex-direction: column;
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
`,[g("segment-type",[l("tabs-rail",[R("&.transition-disabled",[l("tabs-capsule",`
 transition: none;
 `)])])]),g("top",[l("tab-pane",`
 padding: var(--n-pane-padding-top) var(--n-pane-padding-right) var(--n-pane-padding-bottom) var(--n-pane-padding-left);
 `)]),g("left",[l("tab-pane",`
 padding: var(--n-pane-padding-right) var(--n-pane-padding-bottom) var(--n-pane-padding-left) var(--n-pane-padding-top);
 `)]),g("left, right",`
 flex-direction: row;
 `,[l("tabs-bar",`
 width: 2px;
 right: 0;
 transition:
 top .2s var(--n-bezier),
 max-height .2s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `),l("tabs-tab",`
 padding: var(--n-tab-padding-vertical); 
 `)]),g("right",`
 flex-direction: row-reverse;
 `,[l("tab-pane",`
 padding: var(--n-pane-padding-left) var(--n-pane-padding-top) var(--n-pane-padding-right) var(--n-pane-padding-bottom);
 `),l("tabs-bar",`
 left: 0;
 `)]),g("bottom",`
 flex-direction: column-reverse;
 justify-content: flex-end;
 `,[l("tab-pane",`
 padding: var(--n-pane-padding-bottom) var(--n-pane-padding-right) var(--n-pane-padding-top) var(--n-pane-padding-left);
 `),l("tabs-bar",`
 top: 0;
 `)]),l("tabs-rail",`
 position: relative;
 padding: 3px;
 border-radius: var(--n-tab-border-radius);
 width: 100%;
 background-color: var(--n-color-segment);
 transition: background-color .3s var(--n-bezier);
 display: flex;
 align-items: center;
 `,[l("tabs-capsule",`
 border-radius: var(--n-tab-border-radius);
 position: absolute;
 pointer-events: none;
 background-color: var(--n-tab-color-segment);
 box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .08);
 transition: transform 0.3s var(--n-bezier);
 `),l("tabs-tab-wrapper",`
 flex-basis: 0;
 flex-grow: 1;
 display: flex;
 align-items: center;
 justify-content: center;
 `,[l("tabs-tab",`
 overflow: hidden;
 border-radius: var(--n-tab-border-radius);
 width: 100%;
 display: flex;
 align-items: center;
 justify-content: center;
 `,[g("active",`
 font-weight: var(--n-font-weight-strong);
 color: var(--n-tab-text-color-active);
 `),R("&:hover",`
 color: var(--n-tab-text-color-hover);
 `)])])]),g("flex",[l("tabs-nav",`
 width: 100%;
 position: relative;
 `,[l("tabs-wrapper",`
 width: 100%;
 `,[l("tabs-tab",`
 margin-right: 0;
 `)])])]),l("tabs-nav",`
 box-sizing: border-box;
 line-height: 1.5;
 display: flex;
 transition: border-color .3s var(--n-bezier);
 `,[A("prefix, suffix",`
 display: flex;
 align-items: center;
 `),A("prefix","padding-right: 16px;"),A("suffix","padding-left: 16px;")]),g("top, bottom",[l("tabs-nav-scroll-wrapper",[R("&::before",`
 top: 0;
 bottom: 0;
 left: 0;
 width: 20px;
 `),R("&::after",`
 top: 0;
 bottom: 0;
 right: 0;
 width: 20px;
 `),g("shadow-start",[R("&::before",`
 box-shadow: inset 10px 0 8px -8px rgba(0, 0, 0, .12);
 `)]),g("shadow-end",[R("&::after",`
 box-shadow: inset -10px 0 8px -8px rgba(0, 0, 0, .12);
 `)])])]),g("left, right",[l("tabs-nav-scroll-content",`
 flex-direction: column;
 `),l("tabs-nav-scroll-wrapper",[R("&::before",`
 top: 0;
 left: 0;
 right: 0;
 height: 20px;
 `),R("&::after",`
 bottom: 0;
 left: 0;
 right: 0;
 height: 20px;
 `),g("shadow-start",[R("&::before",`
 box-shadow: inset 0 10px 8px -8px rgba(0, 0, 0, .12);
 `)]),g("shadow-end",[R("&::after",`
 box-shadow: inset 0 -10px 8px -8px rgba(0, 0, 0, .12);
 `)])])]),l("tabs-nav-scroll-wrapper",`
 flex: 1;
 position: relative;
 overflow: hidden;
 `,[l("tabs-nav-y-scroll",`
 height: 100%;
 width: 100%;
 overflow-y: auto; 
 scrollbar-width: none;
 `,[R("&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb",`
 width: 0;
 height: 0;
 display: none;
 `)]),R("&::before, &::after",`
 transition: box-shadow .3s var(--n-bezier);
 pointer-events: none;
 content: "";
 position: absolute;
 z-index: 1;
 `)]),l("tabs-nav-scroll-content",`
 display: flex;
 position: relative;
 min-width: 100%;
 min-height: 100%;
 width: fit-content;
 box-sizing: border-box;
 `),l("tabs-wrapper",`
 display: inline-flex;
 flex-wrap: nowrap;
 position: relative;
 `),l("tabs-tab-wrapper",`
 display: flex;
 flex-wrap: nowrap;
 flex-shrink: 0;
 flex-grow: 0;
 `),l("tabs-tab",`
 cursor: pointer;
 white-space: nowrap;
 flex-wrap: nowrap;
 display: inline-flex;
 align-items: center;
 color: var(--n-tab-text-color);
 font-size: var(--n-tab-font-size);
 background-clip: padding-box;
 padding: var(--n-tab-padding);
 transition:
 box-shadow .3s var(--n-bezier),
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `,[g("disabled",{cursor:"not-allowed"}),A("close",`
 margin-left: 6px;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `),A("label",`
 display: flex;
 align-items: center;
 z-index: 1;
 `)]),l("tabs-bar",`
 position: absolute;
 bottom: 0;
 height: 2px;
 border-radius: 1px;
 background-color: var(--n-bar-color);
 transition:
 left .2s var(--n-bezier),
 max-width .2s var(--n-bezier),
 opacity .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `,[R("&.transition-disabled",`
 transition: none;
 `),g("disabled",`
 background-color: var(--n-tab-text-color-disabled)
 `)]),l("tabs-pane-wrapper",`
 position: relative;
 overflow: hidden;
 transition: max-height .2s var(--n-bezier);
 `),l("tab-pane",`
 color: var(--n-pane-text-color);
 width: 100%;
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 opacity .2s var(--n-bezier);
 left: 0;
 right: 0;
 top: 0;
 `,[R("&.next-transition-leave-active, &.prev-transition-leave-active, &.next-transition-enter-active, &.prev-transition-enter-active",`
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 transform .2s var(--n-bezier),
 opacity .2s var(--n-bezier);
 `),R("&.next-transition-leave-active, &.prev-transition-leave-active",`
 position: absolute;
 `),R("&.next-transition-enter-from, &.prev-transition-leave-to",`
 transform: translateX(32px);
 opacity: 0;
 `),R("&.next-transition-leave-to, &.prev-transition-enter-from",`
 transform: translateX(-32px);
 opacity: 0;
 `),R("&.next-transition-leave-from, &.next-transition-enter-to, &.prev-transition-leave-from, &.prev-transition-enter-to",`
 transform: translateX(0);
 opacity: 1;
 `)]),l("tabs-tab-pad",`
 box-sizing: border-box;
 width: var(--n-tab-gap);
 flex-grow: 0;
 flex-shrink: 0;
 `),g("line-type, bar-type",[l("tabs-tab",`
 font-weight: var(--n-tab-font-weight);
 box-sizing: border-box;
 vertical-align: bottom;
 `,[R("&:hover",{color:"var(--n-tab-text-color-hover)"}),g("active",`
 color: var(--n-tab-text-color-active);
 font-weight: var(--n-tab-font-weight-active);
 `),g("disabled",{color:"var(--n-tab-text-color-disabled)"})])]),l("tabs-nav",[g("line-type",[g("top",[A("prefix, suffix",`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),l("tabs-nav-scroll-content",`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),l("tabs-bar",`
 bottom: -1px;
 `)]),g("left",[A("prefix, suffix",`
 border-right: 1px solid var(--n-tab-border-color);
 `),l("tabs-nav-scroll-content",`
 border-right: 1px solid var(--n-tab-border-color);
 `),l("tabs-bar",`
 right: -1px;
 `)]),g("right",[A("prefix, suffix",`
 border-left: 1px solid var(--n-tab-border-color);
 `),l("tabs-nav-scroll-content",`
 border-left: 1px solid var(--n-tab-border-color);
 `),l("tabs-bar",`
 left: -1px;
 `)]),g("bottom",[A("prefix, suffix",`
 border-top: 1px solid var(--n-tab-border-color);
 `),l("tabs-nav-scroll-content",`
 border-top: 1px solid var(--n-tab-border-color);
 `),l("tabs-bar",`
 top: -1px;
 `)]),A("prefix, suffix",`
 transition: border-color .3s var(--n-bezier);
 `),l("tabs-nav-scroll-content",`
 transition: border-color .3s var(--n-bezier);
 `),l("tabs-bar",`
 border-radius: 0;
 `)]),g("card-type",[A("prefix, suffix",`
 transition: border-color .3s var(--n-bezier);
 `),l("tabs-pad",`
 flex-grow: 1;
 transition: border-color .3s var(--n-bezier);
 `),l("tabs-tab-pad",`
 transition: border-color .3s var(--n-bezier);
 `),l("tabs-tab",`
 font-weight: var(--n-tab-font-weight);
 border: 1px solid var(--n-tab-border-color);
 background-color: var(--n-tab-color);
 box-sizing: border-box;
 position: relative;
 vertical-align: bottom;
 display: flex;
 justify-content: space-between;
 font-size: var(--n-tab-font-size);
 color: var(--n-tab-text-color);
 `,[g("addable",`
 padding-left: 8px;
 padding-right: 8px;
 font-size: 16px;
 justify-content: center;
 `,[A("height-placeholder",`
 width: 0;
 font-size: var(--n-tab-font-size);
 `),me("disabled",[R("&:hover",`
 color: var(--n-tab-text-color-hover);
 `)])]),g("closable","padding-right: 8px;"),g("active",`
 background-color: #0000;
 font-weight: var(--n-tab-font-weight-active);
 color: var(--n-tab-text-color-active);
 `),g("disabled","color: var(--n-tab-text-color-disabled);")])]),g("left, right",`
 flex-direction: column; 
 `,[A("prefix, suffix",`
 padding: var(--n-tab-padding-vertical);
 `),l("tabs-wrapper",`
 flex-direction: column;
 `),l("tabs-tab-wrapper",`
 flex-direction: column;
 `,[l("tabs-tab-pad",`
 height: var(--n-tab-gap-vertical);
 width: 100%;
 `)])]),g("top",[g("card-type",[l("tabs-scroll-padding","border-bottom: 1px solid var(--n-tab-border-color);"),A("prefix, suffix",`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),l("tabs-tab",`
 border-top-left-radius: var(--n-tab-border-radius);
 border-top-right-radius: var(--n-tab-border-radius);
 `,[g("active",`
 border-bottom: 1px solid #0000;
 `)]),l("tabs-tab-pad",`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),l("tabs-pad",`
 border-bottom: 1px solid var(--n-tab-border-color);
 `)])]),g("left",[g("card-type",[l("tabs-scroll-padding","border-right: 1px solid var(--n-tab-border-color);"),A("prefix, suffix",`
 border-right: 1px solid var(--n-tab-border-color);
 `),l("tabs-tab",`
 border-top-left-radius: var(--n-tab-border-radius);
 border-bottom-left-radius: var(--n-tab-border-radius);
 `,[g("active",`
 border-right: 1px solid #0000;
 `)]),l("tabs-tab-pad",`
 border-right: 1px solid var(--n-tab-border-color);
 `),l("tabs-pad",`
 border-right: 1px solid var(--n-tab-border-color);
 `)])]),g("right",[g("card-type",[l("tabs-scroll-padding","border-left: 1px solid var(--n-tab-border-color);"),A("prefix, suffix",`
 border-left: 1px solid var(--n-tab-border-color);
 `),l("tabs-tab",`
 border-top-right-radius: var(--n-tab-border-radius);
 border-bottom-right-radius: var(--n-tab-border-radius);
 `,[g("active",`
 border-left: 1px solid #0000;
 `)]),l("tabs-tab-pad",`
 border-left: 1px solid var(--n-tab-border-color);
 `),l("tabs-pad",`
 border-left: 1px solid var(--n-tab-border-color);
 `)])]),g("bottom",[g("card-type",[l("tabs-scroll-padding","border-top: 1px solid var(--n-tab-border-color);"),A("prefix, suffix",`
 border-top: 1px solid var(--n-tab-border-color);
 `),l("tabs-tab",`
 border-bottom-left-radius: var(--n-tab-border-radius);
 border-bottom-right-radius: var(--n-tab-border-radius);
 `,[g("active",`
 border-top: 1px solid #0000;
 `)]),l("tabs-tab-pad",`
 border-top: 1px solid var(--n-tab-border-color);
 `),l("tabs-pad",`
 border-top: 1px solid var(--n-tab-border-color);
 `)])])])]),ir=Object.assign(Object.assign({},ye.props),{value:[String,Number],defaultValue:[String,Number],trigger:{type:String,default:"click"},type:{type:String,default:"bar"},closable:Boolean,justifyContent:String,size:{type:String,default:"medium"},placement:{type:String,default:"top"},tabStyle:[String,Object],tabClass:String,addTabStyle:[String,Object],addTabClass:String,barWidth:Number,paneClass:String,paneStyle:[String,Object],paneWrapperClass:String,paneWrapperStyle:[String,Object],addable:[Boolean,Object],tabsPadding:{type:Number,default:0},animated:Boolean,onBeforeLeave:Function,onAdd:Function,"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],onClose:[Function,Array],labelSize:String,activeName:[String,Number],onActiveNameChange:[Function,Array]}),lr=N({name:"Tabs",props:ir,slots:Object,setup(e,{slots:t}){var a,n,i,d;const{mergedClsPrefixRef:b,inlineThemeDisabled:s}=_e(e),m=ye("Tabs","-tabs",or,rr,e,b),h=_(null),x=_(null),P=_(null),B=_(null),k=_(null),S=_(null),C=_(!0),c=_(!0),f=Ne(e,["labelSize","size"]),$=Ne(e,["activeName","value"]),E=_((n=(a=$.value)!==null&&a!==void 0?a:e.defaultValue)!==null&&n!==void 0?n:t.default?(d=(i=Te(t.default())[0])===null||i===void 0?void 0:i.props)===null||d===void 0?void 0:d.name:null),z=da($,E),T={id:0},u=j(()=>{if(!(!e.justifyContent||e.type==="card"))return{display:"flex",justifyContent:e.justifyContent}});re(z,()=>{T.id=0,se(),Ee()});function y(){var r;const{value:o}=z;return o===null?null:(r=h.value)===null||r===void 0?void 0:r.querySelector(`[data-name="${o}"]`)}function O(r){if(e.type==="card")return;const{value:o}=x;if(!o)return;const v=o.style.opacity==="0";if(r){const w=`${b.value}-tabs-bar--disabled`,{barWidth:L,placement:I}=e;if(r.dataset.disabled==="true"?o.classList.add(w):o.classList.remove(w),["top","bottom"].includes(I)){if(Z(["top","maxHeight","height"]),typeof L=="number"&&r.offsetWidth>=L){const M=Math.floor((r.offsetWidth-L)/2)+r.offsetLeft;o.style.left=`${M}px`,o.style.maxWidth=`${L}px`}else o.style.left=`${r.offsetLeft}px`,o.style.maxWidth=`${r.offsetWidth}px`;o.style.width="8192px",v&&(o.style.transition="none"),o.offsetWidth,v&&(o.style.transition="",o.style.opacity="1")}else{if(Z(["left","maxWidth","width"]),typeof L=="number"&&r.offsetHeight>=L){const M=Math.floor((r.offsetHeight-L)/2)+r.offsetTop;o.style.top=`${M}px`,o.style.maxHeight=`${L}px`}else o.style.top=`${r.offsetTop}px`,o.style.maxHeight=`${r.offsetHeight}px`;o.style.height="8192px",v&&(o.style.transition="none"),o.offsetHeight,v&&(o.style.transition="",o.style.opacity="1")}}}function D(){if(e.type==="card")return;const{value:r}=x;r&&(r.style.opacity="0")}function Z(r){const{value:o}=x;if(o)for(const v of r)o.style[v]=""}function se(){if(e.type==="card")return;const r=y();r?O(r):D()}function Ee(){var r;const o=(r=k.value)===null||r===void 0?void 0:r.$el;if(!o)return;const v=y();if(!v)return;const{scrollLeft:w,offsetWidth:L}=o,{offsetLeft:I,offsetWidth:M}=v;w>I?o.scrollTo({top:0,left:I,behavior:"smooth"}):I+M>w+L&&o.scrollTo({top:0,left:I+M-L,behavior:"smooth"})}const de=_(null);let Ce=0,Y=null;function bt(r){const o=de.value;if(o){Ce=r.getBoundingClientRect().height;const v=`${Ce}px`,w=()=>{o.style.height=v,o.style.maxHeight=v};Y?(w(),Y(),Y=null):Y=w}}function ut(r){const o=de.value;if(o){const v=r.getBoundingClientRect().height,w=()=>{document.body.offsetHeight,o.style.maxHeight=`${v}px`,o.style.height=`${Math.max(Ce,v)}px`};Y?(Y(),Y=null,w()):Y=w}}function pt(){const r=de.value;if(r){r.style.maxHeight="",r.style.height="";const{paneWrapperStyle:o}=e;if(typeof o=="string")r.style.cssText=o;else if(o){const{maxHeight:v,height:w}=o;v!==void 0&&(r.style.maxHeight=v),w!==void 0&&(r.style.height=w)}}}const We={value:[]},je=_("next");function vt(r){const o=z.value;let v="next";for(const w of We.value){if(w===o)break;if(w===r){v="prev";break}}je.value=v,gt(r)}function gt(r){const{onActiveNameChange:o,onUpdateValue:v,"onUpdate:value":w}=e;o&&ue(o,r),v&&ue(v,r),w&&ue(w,r),E.value=r}function ht(r){const{onClose:o}=e;o&&ue(o,r)}function He(){const{value:r}=x;if(!r)return;const o="transition-disabled";r.classList.add(o),se(),r.classList.remove(o)}const Q=_(null);function Se({transitionDisabled:r}){const o=h.value;if(!o)return;r&&o.classList.add("transition-disabled");const v=y();v&&Q.value&&(Q.value.style.width=`${v.offsetWidth}px`,Q.value.style.height=`${v.offsetHeight}px`,Q.value.style.transform=`translateX(${v.offsetLeft-ca(getComputedStyle(o).paddingLeft)}px)`,r&&Q.value.offsetWidth),r&&o.classList.remove("transition-disabled")}re([z],()=>{e.type==="segment"&&pe(()=>{Se({transitionDisabled:!1})})}),le(()=>{e.type==="segment"&&Se({transitionDisabled:!0})});let Oe=0;function mt(r){var o;if(r.contentRect.width===0&&r.contentRect.height===0||Oe===r.contentRect.width)return;Oe=r.contentRect.width;const{type:v}=e;if((v==="line"||v==="bar")&&He(),v!=="segment"){const{placement:w}=e;we((w==="top"||w==="bottom"?(o=k.value)===null||o===void 0?void 0:o.$el:S.value)||null)}}const xt=ve(mt,64);re([()=>e.justifyContent,()=>e.size],()=>{pe(()=>{const{type:r}=e;(r==="line"||r==="bar")&&He()})});const K=_(!1);function yt(r){var o;const{target:v,contentRect:{width:w,height:L}}=r,I=v.parentElement.parentElement.offsetWidth,M=v.parentElement.parentElement.offsetHeight,{placement:te}=e;if(!K.value)te==="top"||te==="bottom"?I<w&&(K.value=!0):M<L&&(K.value=!0);else{const{value:ne}=B;if(!ne)return;te==="top"||te==="bottom"?I-w>ne.$el.offsetWidth&&(K.value=!1):M-L>ne.$el.offsetHeight&&(K.value=!1)}we(((o=k.value)===null||o===void 0?void 0:o.$el)||null)}const Ct=ve(yt,64);function St(){const{onAdd:r}=e;r&&r(),pe(()=>{const o=y(),{value:v}=k;!o||!v||v.scrollTo({left:o.offsetLeft,top:0,behavior:"smooth"})})}function we(r){if(!r)return;const{placement:o}=e;if(o==="top"||o==="bottom"){const{scrollLeft:v,scrollWidth:w,offsetWidth:L}=r;C.value=v<=0,c.value=v+L>=w}else{const{scrollTop:v,scrollHeight:w,offsetHeight:L}=r;C.value=v<=0,c.value=v+L>=w}}const wt=ve(r=>{we(r.target)},64);at(Ae,{triggerRef:H(e,"trigger"),tabStyleRef:H(e,"tabStyle"),tabClassRef:H(e,"tabClass"),addTabStyleRef:H(e,"addTabStyle"),addTabClassRef:H(e,"addTabClass"),paneClassRef:H(e,"paneClass"),paneStyleRef:H(e,"paneStyle"),mergedClsPrefixRef:b,typeRef:H(e,"type"),closableRef:H(e,"closable"),valueRef:z,tabChangeIdRef:T,onBeforeLeaveRef:H(e,"onBeforeLeave"),activateTab:vt,handleClose:ht,handleAdd:St}),ot(()=>{se(),Ee()}),Jt(()=>{const{value:r}=P;if(!r)return;const{value:o}=b,v=`${o}-tabs-nav-scroll-wrapper--shadow-start`,w=`${o}-tabs-nav-scroll-wrapper--shadow-end`;C.value?r.classList.remove(v):r.classList.add(v),c.value?r.classList.remove(w):r.classList.add(w)});const Tt={syncBarPosition:()=>{se()}},kt=()=>{Se({transitionDisabled:!0})},Ie=j(()=>{const{value:r}=f,{type:o}=e,v={card:"Card",bar:"Bar",line:"Line",segment:"Segment"}[o],w=`${r}${v}`,{self:{barColor:L,closeIconColor:I,closeIconColorHover:M,closeIconColorPressed:te,tabColor:ne,tabBorderColor:Rt,paneTextColor:Pt,tabFontWeight:$t,tabBorderRadius:Bt,tabFontWeightActive:_t,colorSegment:zt,fontWeightStrong:Lt,tabColorSegment:At,closeSize:Et,closeIconSize:Wt,closeColorHover:jt,closeColorPressed:Ht,closeBorderRadius:Ot,[G("panePadding",r)]:ce,[G("tabPadding",w)]:It,[G("tabPaddingVertical",w)]:Mt,[G("tabGap",w)]:Vt,[G("tabGap",`${w}Vertical`)]:Ft,[G("tabTextColor",o)]:Nt,[G("tabTextColorActive",o)]:Gt,[G("tabTextColorHover",o)]:Dt,[G("tabTextColorDisabled",o)]:Xt,[G("tabFontSize",r)]:Ut},common:{cubicBezierEaseInOut:Yt}}=m.value;return{"--n-bezier":Yt,"--n-color-segment":zt,"--n-bar-color":L,"--n-tab-font-size":Ut,"--n-tab-text-color":Nt,"--n-tab-text-color-active":Gt,"--n-tab-text-color-disabled":Xt,"--n-tab-text-color-hover":Dt,"--n-pane-text-color":Pt,"--n-tab-border-color":Rt,"--n-tab-border-radius":Bt,"--n-close-size":Et,"--n-close-icon-size":Wt,"--n-close-color-hover":jt,"--n-close-color-pressed":Ht,"--n-close-border-radius":Ot,"--n-close-icon-color":I,"--n-close-icon-color-hover":M,"--n-close-icon-color-pressed":te,"--n-tab-color":ne,"--n-tab-font-weight":$t,"--n-tab-font-weight-active":_t,"--n-tab-padding":It,"--n-tab-padding-vertical":Mt,"--n-tab-gap":Vt,"--n-tab-gap-vertical":Ft,"--n-pane-padding-left":be(ce,"left"),"--n-pane-padding-right":be(ce,"right"),"--n-pane-padding-top":be(ce,"top"),"--n-pane-padding-bottom":be(ce,"bottom"),"--n-font-weight-strong":Lt,"--n-tab-color-segment":At}}),ee=s?st("tabs",j(()=>`${f.value[0]}${e.type[0]}`),Ie,e):void 0;return Object.assign({mergedClsPrefix:b,mergedValue:z,renderedNames:new Set,segmentCapsuleElRef:Q,tabsPaneWrapperRef:de,tabsElRef:h,barElRef:x,addTabInstRef:B,xScrollInstRef:k,scrollWrapperElRef:P,addTabFixed:K,tabWrapperStyle:u,handleNavResize:xt,mergedSize:f,handleScroll:wt,handleTabsResize:Ct,cssVars:s?void 0:Ie,themeClass:ee==null?void 0:ee.themeClass,animationDirection:je,renderNameListRef:We,yScrollElRef:S,handleSegmentResize:kt,onAnimationBeforeLeave:bt,onAnimationEnter:ut,onAnimationAfterEnter:pt,onRender:ee==null?void 0:ee.onRender},Tt)},render(){const{mergedClsPrefix:e,type:t,placement:a,addTabFixed:n,addable:i,mergedSize:d,renderNameListRef:b,onRender:s,paneWrapperClass:m,paneWrapperStyle:h,$slots:{default:x,prefix:P,suffix:B}}=this;s==null||s();const k=x?Te(x()).filter(T=>T.type.__TAB_PANE__===!0):[],S=x?Te(x()).filter(T=>T.type.__TAB__===!0):[],C=!S.length,c=t==="card",f=t==="segment",$=!c&&!f&&this.justifyContent;b.value=[];const E=()=>{const T=p("div",{style:this.tabWrapperStyle,class:`${e}-tabs-wrapper`},$?null:p("div",{class:`${e}-tabs-scroll-padding`,style:a==="top"||a==="bottom"?{width:`${this.tabsPadding}px`}:{height:`${this.tabsPadding}px`}}),C?k.map((u,y)=>(b.value.push(u.props.name),Pe(p($e,Object.assign({},u.props,{internalCreatedByPane:!0,internalLeftPadded:y!==0&&(!$||$==="center"||$==="start"||$==="end")}),u.children?{default:u.children.tab}:void 0)))):S.map((u,y)=>(b.value.push(u.props.name),Pe(y!==0&&!$?Ke(u):u))),!n&&i&&c?Qe(i,(C?k.length:S.length)!==0):null,$?null:p("div",{class:`${e}-tabs-scroll-padding`,style:{width:`${this.tabsPadding}px`}}));return p("div",{ref:"tabsElRef",class:`${e}-tabs-nav-scroll-content`},c&&i?p(ke,{onResize:this.handleTabsResize},{default:()=>T}):T,c?p("div",{class:`${e}-tabs-pad`}):null,c?null:p("div",{ref:"barElRef",class:`${e}-tabs-bar`}))},z=f?"top":a;return p("div",{class:[`${e}-tabs`,this.themeClass,`${e}-tabs--${t}-type`,`${e}-tabs--${d}-size`,$&&`${e}-tabs--flex`,`${e}-tabs--${z}`],style:this.cssVars},p("div",{class:[`${e}-tabs-nav--${t}-type`,`${e}-tabs-nav--${z}`,`${e}-tabs-nav`]},De(P,T=>T&&p("div",{class:`${e}-tabs-nav__prefix`},T)),f?p(ke,{onResize:this.handleSegmentResize},{default:()=>p("div",{class:`${e}-tabs-rail`,ref:"tabsElRef"},p("div",{class:`${e}-tabs-capsule`,ref:"segmentCapsuleElRef"},p("div",{class:`${e}-tabs-wrapper`},p("div",{class:`${e}-tabs-tab`}))),C?k.map((T,u)=>(b.value.push(T.props.name),p($e,Object.assign({},T.props,{internalCreatedByPane:!0,internalLeftPadded:u!==0}),T.children?{default:T.children.tab}:void 0))):S.map((T,u)=>(b.value.push(T.props.name),u===0?T:Ke(T))))}):p(ke,{onResize:this.handleNavResize},{default:()=>p("div",{class:`${e}-tabs-nav-scroll-wrapper`,ref:"scrollWrapperElRef"},["top","bottom"].includes(z)?p(ya,{ref:"xScrollInstRef",onScroll:this.handleScroll},{default:E}):p("div",{class:`${e}-tabs-nav-y-scroll`,onScroll:this.handleScroll,ref:"yScrollElRef"},E()))}),n&&i&&c?Qe(i,!0):null,De(B,T=>T&&p("div",{class:`${e}-tabs-nav__suffix`},T))),C&&(this.animated&&(z==="top"||z==="bottom")?p("div",{ref:"tabsPaneWrapperRef",style:h,class:[`${e}-tabs-pane-wrapper`,m]},Ze(k,this.mergedValue,this.renderedNames,this.onAnimationBeforeLeave,this.onAnimationEnter,this.onAnimationAfterEnter,this.animationDirection)):Ze(k,this.mergedValue,this.renderedNames)))}});function Ze(e,t,a,n,i,d,b){const s=[];return e.forEach(m=>{const{name:h,displayDirective:x,"display-directive":P}=m.props,B=S=>x===S||P===S,k=t===h;if(m.key!==void 0&&(m.key=h),k||B("show")||B("show:lazy")&&a.has(h)){a.has(h)||a.add(h);const S=!B("if");s.push(S?Zt(m,[[ea,k]]):m)}}),b?p(Qt,{name:`${b}-transition`,onBeforeLeave:n,onEnter:i,onAfterEnter:d},{default:()=>s}):s}function Qe(e,t){return p($e,{ref:"addTabInstRef",key:"__addable",name:"__addable",internalCreatedByPane:!0,internalAddable:!0,internalLeftPadded:t,disabled:typeof e=="object"&&e.disabled})}function Ke(e){const t=Kt(e);return t.props?t.props.internalLeftPadded=!0:t.props={internalLeftPadded:!0},t}function Pe(e){return Array.isArray(e.dynamicProps)?e.dynamicProps.includes("internalLeftPadded")||e.dynamicProps.push("internalLeftPadded"):e.dynamicProps=["internalLeftPadded"],e}const sr={name:"Timeline"},dr={class:"timeline"};function cr(e,t,a,n,i,d){return W(),V("div",dr,[ta(e.$slots,"default",{},void 0,!0)])}const et=Be(sr,[["render",cr],["__scopeId","data-v-dcc29abb"]]),fr={name:"TimelineItem",props:{content:{type:String,required:!0},time:{type:String,required:!0}},methods:{handleClick(){this.$emit("click")}}},br={class:"timeline-item-content"};function ur(e,t,a,n,i,d){return W(),V("div",{class:"timeline-item",onClick:t[0]||(t[0]=(...b)=>d.handleClick&&d.handleClick(...b))},[F("div",br,[F("time",null,oe(a.time),1),F("div",null,oe(a.content),1)]),t[1]||(t[1]=F("span",{class:"circle"},null,-1))])}const tt=Be(fr,[["render",ur],["__scopeId","data-v-b359483c"]]),pr={class:"container"},vr={class:"xz"},gr=["id"],hr={class:"anchor"},mr=["id"],xr={class:"anchor"},yr=N({__name:"ArchiveView",setup(e){const t=_(0),a=_({}),n=_({}),i=aa(),d=async()=>{try{const s=await Ge.get("/markdown/metadata/posts_by_year.json");a.value=s.data;const m=await Ge.get("/markdown/metadata/posts_by_tag.json");n.value=m.data,t.value=Object.values(a.value).flat().length}catch(s){console.error("Error loading archives data:",s)}},b=j(()=>Object.keys(a.value).sort((s,m)=>Number(m)-Number(s)).map(s=>({year:s,posts:a.value[s]})));return le(()=>{d()}),(s,m)=>(W(),V("main",null,[X(ga),F("div",pr,[m[0]||(m[0]=F("h1",null,"文章归档📚",-1)),F("span",vr,"共发布 "+oe(t.value)+" 篇文章 📕",1),X(U(lr),{type:"segment",animated:""},{default:q(()=>[X(U(Je),{name:"by-year",tab:"按照时间"},{default:q(()=>[(W(!0),V(J,null,ae(b.value,h=>(W(),V("div",{key:h.year},[F("h2",{id:h.year},oe(h.year),9,gr),X(et,null,{default:q(()=>[(W(!0),V(J,null,ae(h.posts,x=>(W(),fe(tt,{key:x.file,content:x.title,time:x.date,onClick:P=>U(i).push(`/post/${x.file}`)},null,8,["content","time","onClick"]))),128))]),_:2},1024)]))),128)),F("div",hr,[X(U(qe),{affix:"","trigger-top":24,top:88,style:{"z-index":"1"},"ignore-gap":""},{default:q(()=>[(W(!0),V(J,null,ae(b.value,h=>(W(),fe(U(Ye),{key:h.year,title:h.year,href:`#${h.year}`},null,8,["title","href"]))),128))]),_:1})])]),_:1}),X(U(Je),{name:"by-tag",tab:"按照类别"},{default:q(()=>[(W(!0),V(J,null,ae(n.value,(h,x)=>(W(),V("div",{key:x},[F("h2",{id:x},oe(x),9,mr),X(et,null,{default:q(()=>[(W(!0),V(J,null,ae(h,P=>(W(),fe(tt,{key:P.file,content:P.title,time:P.date,onClick:B=>U(i).push(`/post/${P.file}`)},null,8,["content","time","onClick"]))),128))]),_:2},1024)]))),128)),F("div",xr,[X(U(qe),{affix:"","trigger-top":24,top:88,style:{"z-index":"1"},"ignore-gap":""},{default:q(()=>[(W(!0),V(J,null,ae(n.value,(h,x)=>(W(),fe(U(Ye),{key:x,title:x,href:`#${x}`},null,8,["title","href"]))),128))]),_:1})])]),_:1})]),_:1})]),X(va)]))}}),Rr=Be(yr,[["__scopeId","data-v-9f1b6bbe"]]);export{Rr as default};
