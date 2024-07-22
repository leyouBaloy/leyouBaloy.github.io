import{i as ne,w as te,f as ge,o as re,d as F,r as $,h as g,c as j,t as I,p as et,n as ue,m as Yt,F as q,g as qt,k as Jt,I as Kt,J as Qt,v as Zt,_ as $e,l as E,q as V,e as ea,B as O,C as ae,E as tt,G as at,K as ta,s as Y,A as J,u as U,H as ee,L as ce}from"./index-Bk5XpY85.js";import{c as aa,a as Oe,x as na,f as ra,b as oa,u as ia,y as nt,S as la,q as Ve,N as sa,t as Me,z as Se,m as da,h as Ne,V as Te,k as fe,d as ca,j as be,w as Fe}from"./Scrollbar-CUdJVEVy.js";import{u as fa,t as he,v as ba,d as l,m as h,g as Pe,f as rt,o as ua,n as ke,a as B,e as W,c as ot,h as me,j as it,w as pa,k as N,N as va}from"./Nav-BKDK3Ks9.js";import{k as lt,u as st,g as ha,r as ga,N as ma,o as xa}from"./Close-C1m2ETPN.js";function ya(e,t,a){const o=ne(e,null);o!==null&&(t in o||(o[t]=[]),o[t].push(a.value),te(a,(i,f)=>{const b=o[t],s=b.findIndex(x=>x===f);~s&&b.splice(s,1),b.push(i)}),ge(()=>{const i=o[t],f=i.findIndex(b=>b===a.value);~f&&i.splice(f,1)}))}function Ca(e,t,a){const o=ne(e,null);o!==null&&(t in o||(o[t]=[]),re(()=>{const i=a();i&&o[t].push(i)}),ge(()=>{const i=o[t],f=a(),b=i.findIndex(s=>s===f);~b&&i.splice(b,1)}))}const Sa=Oe(".v-x-scroll",{overflow:"auto",scrollbarWidth:"none"},[Oe("&::-webkit-scrollbar",{width:0,height:0})]),Ta=F({name:"XScroll",props:{disabled:Boolean,onScroll:Function},setup(){const e=$(null);function t(i){!(i.currentTarget.offsetWidth<i.currentTarget.scrollWidth)||i.deltaY===0||(i.currentTarget.scrollLeft+=i.deltaY+i.deltaX,i.preventDefault())}const a=fa();return Sa.mount({id:"vueuc/x-scroll",head:!0,anchorMetaName:aa,ssr:a}),Object.assign({selfRef:e,handleWheel:t},{scrollTo(...i){var f;(f=e.value)===null||f===void 0||f.scrollTo(...i)}})},render(){return g("div",{ref:"selfRef",onScroll:this.onScroll,onWheel:this.disabled?void 0:this.handleWheel,class:"v-x-scroll"},this.$slots)}});var wa=/\s/;function Ra(e){for(var t=e.length;t--&&wa.test(e.charAt(t)););return t}var ka=/^\s+/;function _a(e){return e&&e.slice(0,Ra(e)+1).replace(ka,"")}var Ge=NaN,$a=/^[-+]0x[0-9a-f]+$/i,Pa=/^0b[01]+$/i,Ba=/^0o[0-7]+$/i,za=parseInt;function De(e){if(typeof e=="number")return e;if(na(e))return Ge;if(he(e)){var t=typeof e.valueOf=="function"?e.valueOf():e;e=he(t)?t+"":t}if(typeof e!="string")return e===0?e:+e;e=_a(e);var a=Pa.test(e);return a||Ba.test(e)?za(e.slice(2),a?2:8):$a.test(e)?Ge:+e}var we=function(){return ba.Date.now()},La="Expected a function",Aa=Math.max,Ea=Math.min;function Wa(e,t,a){var o,i,f,b,s,x,v=0,m=!1,k=!1,P=!0;if(typeof e!="function")throw new TypeError(La);t=De(t)||0,he(a)&&(m=!!a.leading,k="maxWait"in a,f=k?Aa(De(a.maxWait)||0,t):f,P="trailing"in a?!!a.trailing:P);function R(u){var y=o,H=i;return o=i=void 0,v=u,b=e.apply(H,y),b}function S(u){return v=u,s=setTimeout(c,t),m?R(u):b}function C(u){var y=u-x,H=u-v,G=t-y;return k?Ea(G,f-H):G}function d(u){var y=u-x,H=u-v;return x===void 0||y>=t||y<0||k&&H>=f}function c(){var u=we();if(d(u))return _(u);s=setTimeout(c,C(u))}function _(u){return s=void 0,P&&o?R(u):(o=i=void 0,b)}function A(){s!==void 0&&clearTimeout(s),v=0,o=x=i=s=void 0}function z(){return s===void 0?b:_(we())}function w(){var u=we(),y=d(u);if(o=arguments,i=this,x=u,y){if(s===void 0)return S(x);if(k)return clearTimeout(s),s=setTimeout(c,t),R(x)}return s===void 0&&(s=setTimeout(c,t)),b}return w.cancel=A,w.flush=z,w}var ja="Expected a function";function pe(e,t,a){var o=!0,i=!0;if(typeof e!="function")throw new TypeError(ja);return he(a)&&(o="leading"in a?!!a.leading:o,i="trailing"in a?!!a.trailing:i),Wa(e,t,{leading:o,maxWait:t,trailing:i})}function Ha(e){return e instanceof HTMLElement?e.scrollTop:window.scrollY}function Ia(e){return e instanceof HTMLElement?e.getBoundingClientRect():{top:0,bottom:window.innerHeight}}const Oa=l("affix",[h("affixed",{position:"fixed"},[h("absolute-positioned",{position:"absolute"})])]),Be={listenTo:[String,Object,Function],top:Number,bottom:Number,triggerTop:Number,triggerBottom:Number,position:{type:String,default:"fixed"},offsetTop:{type:Number,validator:()=>!0,default:void 0},offsetBottom:{type:Number,validator:()=>!0,default:void 0},target:{type:Function,validator:()=>!0,default:void 0}},Va=lt(Be),Ma=F({name:"Affix",props:Be,setup(e){const{mergedClsPrefixRef:t}=Pe(e);ra("-affix",Oa,t);let a=null;const o=$(!1),i=$(!1),f=$(null),b=$(null),s=j(()=>i.value||o.value),x=j(()=>{var d,c;return(c=(d=e.triggerTop)!==null&&d!==void 0?d:e.offsetTop)!==null&&c!==void 0?c:e.top}),v=j(()=>{var d,c;return(c=(d=e.top)!==null&&d!==void 0?d:e.triggerTop)!==null&&c!==void 0?c:e.offsetTop}),m=j(()=>{var d,c;return(c=(d=e.bottom)!==null&&d!==void 0?d:e.triggerBottom)!==null&&c!==void 0?c:e.offsetBottom}),k=j(()=>{var d,c;return(c=(d=e.triggerBottom)!==null&&d!==void 0?d:e.offsetBottom)!==null&&c!==void 0?c:e.bottom}),P=$(null),R=()=>{const{target:d,listenTo:c}=e;d?a=d():c?a=st(c):a=document,a&&(a.addEventListener("scroll",S),S())};function S(){oa(C)}function C(){const{value:d}=P;if(!a||!d)return;const c=Ha(a);if(s.value){b.value!==null&&c<b.value&&(o.value=!1,b.value=null),f.value!==null&&c>f.value&&(i.value=!1,f.value=null);return}const _=Ia(a),A=d.getBoundingClientRect(),z=A.top-_.top,w=_.bottom-A.bottom,u=x.value,y=k.value;u!==void 0&&z<=u?(o.value=!0,b.value=c-(u-z)):(o.value=!1,b.value=null),y!==void 0&&w<=y?(i.value=!0,f.value=c+y-w):(i.value=!1,f.value=null)}return re(()=>{R()}),ge(()=>{a&&a.removeEventListener("scroll",S)}),{selfRef:P,affixed:s,mergedClsPrefix:t,mergedstyle:j(()=>{const d={};return o.value&&x.value!==void 0&&v.value!==void 0&&(d.top=`${v.value}px`),i.value&&k.value!==void 0&&m.value!==void 0&&(d.bottom=`${m.value}px`),d})}},render(){const{mergedClsPrefix:e}=this;return g("div",{ref:"selfRef",class:[`${e}-affix`,{[`${e}-affix--affixed`]:this.affixed,[`${e}-affix--absolute-positioned`]:this.position==="absolute"}],style:this.mergedstyle},this.$slots)}}),Na=F({name:"Add",render(){return g("svg",{width:"512",height:"512",viewBox:"0 0 512 512",fill:"none",xmlns:"http://www.w3.org/2000/svg"},g("path",{d:"M256 112V400M400 256H112",stroke:"currentColor","stroke-width":"32","stroke-linecap":"round","stroke-linejoin":"round"}))}}),Fa={linkFontSize:"13px",linkPadding:"0 0 0 16px",railWidth:"4px"},Ga=e=>{const{borderRadius:t,railColor:a,primaryColor:o,primaryColorHover:i,primaryColorPressed:f,textColor2:b}=e;return Object.assign(Object.assign({},Fa),{borderRadius:t,railColor:a,railColorActive:o,linkColor:ua(o,{alpha:.15}),linkTextColor:b,linkTextColorHover:i,linkTextColorPressed:f,linkTextColorActive:o})},Da={name:"Anchor",common:rt,self:Ga},Ua=l("anchor",`
 position: relative;
`,[ke("block",`
 padding-left: var(--n-rail-width);
 `,[l("anchor-link",[B("+, >",[l("anchor-link",`
 margin-top: .5em;
 `)])]),l("anchor-link-background",`
 max-width: 0;
 border-top-right-radius: 10.5px;
 border-bottom-right-radius: 10.5px;
 `),ke("show-rail",[B(">",[l("anchor-link","padding-left: 0;")])])]),h("block",[l("anchor-link",`
 margin-bottom: 4px;
 padding: 2px 8px;
 transition: background-color .3s var(--n-bezier);
 background-color: transparent;
 border-radius: var(--n-link-border-radius);
 `,[h("active",`
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
 `,[W("bar",`
 position: absolute;
 left: 0;
 width: var(--n-rail-width);
 height: 21px;
 background-color: #0000;
 transition: 
 top .15s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `,[h("active",{backgroundColor:"var(--n-rail-color-active)"})])]),l("anchor-link",`
 padding: var(--n-link-padding);
 position: relative;
 line-height: 1.5;
 font-size: var(--n-link-font-size);
 min-height: 1.5em;
 display: flex;
 flex-direction: column;
 `,[h("active",[B(">",[W("title",`
 color: var(--n-link-text-color-active);
 `)])]),W("title",`
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
 `,[B("&:hover, &:focus",`
 color: var(--n-link-text-color-hover);
 `),B("&:active",`
 color: var(--n-link-text-color-pressed);
 `)])])]),ve=ot("n-anchor"),Xa={title:String,href:String},Ue=F({name:"AnchorLink",props:Xa,setup(e,{slots:t}){const a=$(null),o=ne(ve),i=I(e,"href"),f=ia(()=>i.value&&i.value===o.activeHref.value);ya(ve,"collectedLinkHrefs",i),Ca(ve,"titleEls",()=>a.value),te(f,s=>{s&&a.value&&o.updateBarPosition(a.value)});function b(){e.href!==void 0&&o.setActiveHref(e.href)}return()=>{var s;const{value:x}=o.mergedClsPrefix;return g("div",{class:[`${x}-anchor-link`,f.value&&`${x}-anchor-link--active`]},g("a",{ref:a,class:[`${x}-anchor-link__title`],href:e.href,title:ha(e.title),onClick:b},e.title),(s=t.default)===null||s===void 0?void 0:s.call(t))}}});function Ya(e,t){const{top:a,height:o}=e.getBoundingClientRect(),i=t instanceof HTMLElement?t.getBoundingClientRect().top:0;return{top:a-i,height:o}}const ze={type:{type:String,default:"rail"},showRail:{type:Boolean,default:!0},showBackground:{type:Boolean,default:!0},bound:{type:Number,default:12},internalScrollable:Boolean,ignoreGap:Boolean,offsetTarget:[String,Object,Function]},qa=lt(ze),Ja=F({name:"BaseAnchor",props:Object.assign(Object.assign({},ze),{mergedClsPrefix:{type:String,required:!0}}),setup(e){const t=[],a=[],o=$(null),i=$(null),f=$(null),b=$(null),s=j(()=>e.type==="block"),x=j(()=>!s.value&&e.showRail);function v(){const{value:S}=f,{value:C}=i;S&&(S.style.transition="none"),C&&(C.style.transition="none"),a&&a.forEach(d=>{d.style.transition="none"}),ue(()=>{const{value:d}=f,{value:c}=i;d&&(d.offsetWidth,d.style.transition=""),c&&(c.offsetWidth,c.style.transition=""),a&&a.forEach(_=>{_.offsetWidth,_.style.transition=""})})}function m(S,C=!0){const{value:d}=f,{value:c}=i,{value:_}=b;if(!_||!d)return;C||(d.style.transition="none",c&&(c.style.transition="none"));const{offsetHeight:A,offsetWidth:z}=S,{top:w,left:u}=S.getBoundingClientRect(),{top:y,left:H}=_.getBoundingClientRect(),G=w-y,K=u-H;d.style.top=`${G}px`,d.style.height=`${A}px`,c&&(c.style.top=`${G}px`,c.style.height=`${A}px`,c.style.maxWidth=`${z+K}px`),d.offsetHeight,c&&c.offsetHeight,C||(d.style.transition="",c&&(c.style.transition=""))}function k(S,C=!0){const d=/^#([^#]+)$/.exec(S);if(!d)return;const c=document.getElementById(d[1]);c&&(o.value=S,c.scrollIntoView(),C||v(),P())}const P=pe(()=>{R(!0)},128);function R(S=!0){var C;const d=[],c=st((C=e.offsetTarget)!==null&&C!==void 0?C:document);t.forEach(u=>{const y=/#([^#]+)$/.exec(u);if(!y)return;const H=document.getElementById(y[1]);if(H&&c){const{top:G,height:K}=Ya(H,c);d.push({top:G,height:K,href:u})}}),d.sort((u,y)=>u.top>y.top?1:(u.top===y.top&&u.height<y.height,-1));const _=o.value,{bound:A,ignoreGap:z}=e,w=d.reduce((u,y)=>y.top+y.height<0?z?y:u:y.top<=A?u===null?y:y.top===u.top?y.href===_?y:u:y.top>u.top?y:u:u,null);S||v(),w?o.value=w.href:o.value=null}return et(ve,{activeHref:o,mergedClsPrefix:I(e,"mergedClsPrefix"),updateBarPosition:m,setActiveHref:k,collectedLinkHrefs:t,titleEls:a}),re(()=>{document.addEventListener("scroll",P,!0),k(window.location.hash),R(!1)}),nt(()=>{k(window.location.hash),R(!1)}),ge(()=>{document.removeEventListener("scroll",P,!0)}),te(o,S=>{if(S===null){const{value:C}=i;C&&!s.value&&(C.style.maxWidth="0")}}),{selfRef:b,barRef:f,slotRef:i,setActiveHref:k,activeHref:o,isBlockType:s,mergedShowRail:x}},render(){var e;const{mergedClsPrefix:t,mergedShowRail:a,isBlockType:o,$slots:i}=this,f=g("div",{class:[`${t}-anchor`,o&&`${t}-anchor--block`,a&&`${t}-anchor--show-rail`],ref:"selfRef"},a&&this.showBackground?g("div",{ref:"slotRef",class:`${t}-anchor-link-background`}):null,a?g("div",{class:`${t}-anchor-rail`},g("div",{ref:"barRef",class:[`${t}-anchor-rail__bar`,this.activeHref!==null&&`${t}-anchor-rail__bar--active`]})):null,(e=i.default)===null||e===void 0?void 0:e.call(i));return this.internalScrollable?g(la,null,{default:()=>f}):f}}),Ka=Object.assign(Object.assign(Object.assign(Object.assign({},me.props),{affix:Boolean}),Be),ze),Xe=F({name:"Anchor",props:Ka,setup(e,{slots:t}){const{mergedClsPrefixRef:a,inlineThemeDisabled:o}=Pe(e),i=me("Anchor","-anchor",Ua,Da,e,a),f=$(null),b=j(()=>{const{self:{railColor:x,linkColor:v,railColorActive:m,linkTextColor:k,linkTextColorHover:P,linkTextColorPressed:R,linkTextColorActive:S,linkFontSize:C,railWidth:d,linkPadding:c,borderRadius:_},common:{cubicBezierEaseInOut:A}}=i.value;return{"--n-link-border-radius":_,"--n-link-color":v,"--n-link-font-size":C,"--n-link-text-color":k,"--n-link-text-color-hover":P,"--n-link-text-color-active":S,"--n-link-text-color-pressed":R,"--n-link-padding":c,"--n-bezier":A,"--n-rail-color":x,"--n-rail-color-active":m,"--n-rail-width":d}}),s=o?it("anchor",void 0,b,e):void 0;return{scrollTo(x){var v;(v=f.value)===null||v===void 0||v.setActiveHref(x)},renderAnchor:()=>(s==null||s.onRender(),g(Ja,Object.assign({ref:f,style:o?void 0:b.value,class:s==null?void 0:s.themeClass.value},Ve(e,qa),{mergedClsPrefix:a.value}),t))}},render(){return this.affix?g(Ma,Object.assign({},Ve(this,Va)),{default:this.renderAnchor}):this.renderAnchor()}}),Qa={tabFontSizeSmall:"14px",tabFontSizeMedium:"14px",tabFontSizeLarge:"16px",tabGapSmallLine:"36px",tabGapMediumLine:"36px",tabGapLargeLine:"36px",tabGapSmallLineVertical:"8px",tabGapMediumLineVertical:"8px",tabGapLargeLineVertical:"8px",tabPaddingSmallLine:"6px 0",tabPaddingMediumLine:"10px 0",tabPaddingLargeLine:"14px 0",tabPaddingVerticalSmallLine:"6px 12px",tabPaddingVerticalMediumLine:"8px 16px",tabPaddingVerticalLargeLine:"10px 20px",tabGapSmallBar:"36px",tabGapMediumBar:"36px",tabGapLargeBar:"36px",tabGapSmallBarVertical:"8px",tabGapMediumBarVertical:"8px",tabGapLargeBarVertical:"8px",tabPaddingSmallBar:"4px 0",tabPaddingMediumBar:"6px 0",tabPaddingLargeBar:"10px 0",tabPaddingVerticalSmallBar:"6px 12px",tabPaddingVerticalMediumBar:"8px 16px",tabPaddingVerticalLargeBar:"10px 20px",tabGapSmallCard:"4px",tabGapMediumCard:"4px",tabGapLargeCard:"4px",tabGapSmallCardVertical:"4px",tabGapMediumCardVertical:"4px",tabGapLargeCardVertical:"4px",tabPaddingSmallCard:"8px 16px",tabPaddingMediumCard:"10px 20px",tabPaddingLargeCard:"12px 24px",tabPaddingSmallSegment:"4px 0",tabPaddingMediumSegment:"6px 0",tabPaddingLargeSegment:"8px 0",tabPaddingVerticalLargeSegment:"0 8px",tabPaddingVerticalSmallCard:"8px 12px",tabPaddingVerticalMediumCard:"10px 16px",tabPaddingVerticalLargeCard:"12px 20px",tabPaddingVerticalSmallSegment:"0 4px",tabPaddingVerticalMediumSegment:"0 6px",tabGapSmallSegment:"0",tabGapMediumSegment:"0",tabGapLargeSegment:"0",tabGapSmallSegmentVertical:"0",tabGapMediumSegmentVertical:"0",tabGapLargeSegmentVertical:"0",panePaddingSmall:"8px 0 0 0",panePaddingMedium:"12px 0 0 0",panePaddingLarge:"16px 0 0 0",closeSize:"18px",closeIconSize:"14px"},Za=e=>{const{textColor2:t,primaryColor:a,textColorDisabled:o,closeIconColor:i,closeIconColorHover:f,closeIconColorPressed:b,closeColorHover:s,closeColorPressed:x,tabColor:v,baseColor:m,dividerColor:k,fontWeight:P,textColor1:R,borderRadius:S,fontSize:C,fontWeightStrong:d}=e;return Object.assign(Object.assign({},Qa),{colorSegment:v,tabFontSizeCard:C,tabTextColorLine:R,tabTextColorActiveLine:a,tabTextColorHoverLine:a,tabTextColorDisabledLine:o,tabTextColorSegment:R,tabTextColorActiveSegment:t,tabTextColorHoverSegment:t,tabTextColorDisabledSegment:o,tabTextColorBar:R,tabTextColorActiveBar:a,tabTextColorHoverBar:a,tabTextColorDisabledBar:o,tabTextColorCard:R,tabTextColorHoverCard:R,tabTextColorActiveCard:a,tabTextColorDisabledCard:o,barColor:a,closeIconColor:i,closeIconColorHover:f,closeIconColorPressed:b,closeColorHover:s,closeColorPressed:x,closeBorderRadius:S,tabColor:v,tabColorSegment:m,tabBorderColor:k,tabFontWeightActive:P,tabFontWeight:P,tabBorderRadius:S,paneTextColor:t,fontWeightStrong:d})},en={name:"Tabs",common:rt,self:Za},Le=ot("n-tabs"),dt={tab:[String,Number,Object,Function],name:{type:[String,Number],required:!0},disabled:Boolean,displayDirective:{type:String,default:"if"},closable:{type:Boolean,default:void 0},tabProps:Object,label:[String,Number,Object,Function]},Ye=F({__TAB_PANE__:!0,name:"TabPane",alias:["TabPanel"],props:dt,setup(e){const t=ne(Le,null);return t||pa("tab-pane","`n-tab-pane` must be placed inside `n-tabs`."),{style:t.paneStyleRef,class:t.paneClassRef,mergedClsPrefix:t.mergedClsPrefixRef}},render(){return g("div",{class:[`${this.mergedClsPrefix}-tab-pane`,this.class],style:this.style},this.$slots)}}),tn=Object.assign({internalLeftPadded:Boolean,internalAddable:Boolean,internalCreatedByPane:Boolean},xa(dt,["displayDirective"])),_e=F({__TAB__:!0,inheritAttrs:!1,name:"Tab",props:tn,setup(e){const{mergedClsPrefixRef:t,valueRef:a,typeRef:o,closableRef:i,tabStyleRef:f,addTabStyleRef:b,tabClassRef:s,addTabClassRef:x,tabChangeIdRef:v,onBeforeLeaveRef:m,triggerRef:k,handleAdd:P,activateTab:R,handleClose:S}=ne(Le);return{trigger:k,mergedClosable:j(()=>{if(e.internalAddable)return!1;const{closable:C}=e;return C===void 0?i.value:C}),style:f,addStyle:b,tabClass:s,addTabClass:x,clsPrefix:t,value:a,type:o,handleClose(C){C.stopPropagation(),!e.disabled&&S(e.name)},activateTab(){if(e.disabled)return;if(e.internalAddable){P();return}const{name:C}=e,d=++v.id;if(C!==a.value){const{value:c}=m;c?Promise.resolve(c(e.name,a.value)).then(_=>{_&&v.id===d&&R(C)}):R(C)}}}},render(){const{internalAddable:e,clsPrefix:t,name:a,disabled:o,label:i,tab:f,value:b,mergedClosable:s,trigger:x,$slots:{default:v}}=this,m=i??f;return g("div",{class:`${t}-tabs-tab-wrapper`},this.internalLeftPadded?g("div",{class:`${t}-tabs-tab-pad`}):null,g("div",Object.assign({key:a,"data-name":a,"data-disabled":o?!0:void 0},Yt({class:[`${t}-tabs-tab`,b===a&&`${t}-tabs-tab--active`,o&&`${t}-tabs-tab--disabled`,s&&`${t}-tabs-tab--closable`,e&&`${t}-tabs-tab--addable`,e?this.addTabClass:this.tabClass],onClick:x==="click"?this.activateTab:void 0,onMouseenter:x==="hover"?this.activateTab:void 0,style:e?this.addStyle:this.style},this.internalCreatedByPane?this.tabProps||{}:this.$attrs)),g("span",{class:`${t}-tabs-tab__label`},e?g(q,null,g("div",{class:`${t}-tabs-tab__height-placeholder`}," "),g(sa,{clsPrefix:t},{default:()=>g(Na,null)})):v?v():typeof m=="object"?m:ga(m??a)),s&&this.type==="card"?g(ma,{clsPrefix:t,class:`${t}-tabs-tab__close`,onClick:this.handleClose,disabled:o}):null))}}),an=l("tabs",`
 box-sizing: border-box;
 width: 100%;
 display: flex;
 flex-direction: column;
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
`,[h("segment-type",[l("tabs-rail",[B("&.transition-disabled",[l("tabs-capsule",`
 transition: none;
 `)])])]),h("top",[l("tab-pane",`
 padding: var(--n-pane-padding-top) var(--n-pane-padding-right) var(--n-pane-padding-bottom) var(--n-pane-padding-left);
 `)]),h("left",[l("tab-pane",`
 padding: var(--n-pane-padding-right) var(--n-pane-padding-bottom) var(--n-pane-padding-left) var(--n-pane-padding-top);
 `)]),h("left, right",`
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
 `)]),h("right",`
 flex-direction: row-reverse;
 `,[l("tab-pane",`
 padding: var(--n-pane-padding-left) var(--n-pane-padding-top) var(--n-pane-padding-right) var(--n-pane-padding-bottom);
 `),l("tabs-bar",`
 left: 0;
 `)]),h("bottom",`
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
 `,[h("active",`
 font-weight: var(--n-font-weight-strong);
 color: var(--n-tab-text-color-active);
 `),B("&:hover",`
 color: var(--n-tab-text-color-hover);
 `)])])]),h("flex",[l("tabs-nav",`
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
 `,[W("prefix, suffix",`
 display: flex;
 align-items: center;
 `),W("prefix","padding-right: 16px;"),W("suffix","padding-left: 16px;")]),h("top, bottom",[l("tabs-nav-scroll-wrapper",[B("&::before",`
 top: 0;
 bottom: 0;
 left: 0;
 width: 20px;
 `),B("&::after",`
 top: 0;
 bottom: 0;
 right: 0;
 width: 20px;
 `),h("shadow-start",[B("&::before",`
 box-shadow: inset 10px 0 8px -8px rgba(0, 0, 0, .12);
 `)]),h("shadow-end",[B("&::after",`
 box-shadow: inset -10px 0 8px -8px rgba(0, 0, 0, .12);
 `)])])]),h("left, right",[l("tabs-nav-scroll-content",`
 flex-direction: column;
 `),l("tabs-nav-scroll-wrapper",[B("&::before",`
 top: 0;
 left: 0;
 right: 0;
 height: 20px;
 `),B("&::after",`
 bottom: 0;
 left: 0;
 right: 0;
 height: 20px;
 `),h("shadow-start",[B("&::before",`
 box-shadow: inset 0 10px 8px -8px rgba(0, 0, 0, .12);
 `)]),h("shadow-end",[B("&::after",`
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
 `,[B("&::-webkit-scrollbar",`
 width: 0;
 height: 0;
 `)]),B("&::before, &::after",`
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
 `,[h("disabled",{cursor:"not-allowed"}),W("close",`
 margin-left: 6px;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `),W("label",`
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
 `,[B("&.transition-disabled",`
 transition: none;
 `),h("disabled",`
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
 `,[B("&.next-transition-leave-active, &.prev-transition-leave-active, &.next-transition-enter-active, &.prev-transition-enter-active",`
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 transform .2s var(--n-bezier),
 opacity .2s var(--n-bezier);
 `),B("&.next-transition-leave-active, &.prev-transition-leave-active",`
 position: absolute;
 `),B("&.next-transition-enter-from, &.prev-transition-leave-to",`
 transform: translateX(32px);
 opacity: 0;
 `),B("&.next-transition-leave-to, &.prev-transition-enter-from",`
 transform: translateX(-32px);
 opacity: 0;
 `),B("&.next-transition-leave-from, &.next-transition-enter-to, &.prev-transition-leave-from, &.prev-transition-enter-to",`
 transform: translateX(0);
 opacity: 1;
 `)]),l("tabs-tab-pad",`
 box-sizing: border-box;
 width: var(--n-tab-gap);
 flex-grow: 0;
 flex-shrink: 0;
 `),h("line-type, bar-type",[l("tabs-tab",`
 font-weight: var(--n-tab-font-weight);
 box-sizing: border-box;
 vertical-align: bottom;
 `,[B("&:hover",{color:"var(--n-tab-text-color-hover)"}),h("active",`
 color: var(--n-tab-text-color-active);
 font-weight: var(--n-tab-font-weight-active);
 `),h("disabled",{color:"var(--n-tab-text-color-disabled)"})])]),l("tabs-nav",[h("line-type",[h("top",[W("prefix, suffix",`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),l("tabs-nav-scroll-content",`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),l("tabs-bar",`
 bottom: -1px;
 `)]),h("left",[W("prefix, suffix",`
 border-right: 1px solid var(--n-tab-border-color);
 `),l("tabs-nav-scroll-content",`
 border-right: 1px solid var(--n-tab-border-color);
 `),l("tabs-bar",`
 right: -1px;
 `)]),h("right",[W("prefix, suffix",`
 border-left: 1px solid var(--n-tab-border-color);
 `),l("tabs-nav-scroll-content",`
 border-left: 1px solid var(--n-tab-border-color);
 `),l("tabs-bar",`
 left: -1px;
 `)]),h("bottom",[W("prefix, suffix",`
 border-top: 1px solid var(--n-tab-border-color);
 `),l("tabs-nav-scroll-content",`
 border-top: 1px solid var(--n-tab-border-color);
 `),l("tabs-bar",`
 top: -1px;
 `)]),W("prefix, suffix",`
 transition: border-color .3s var(--n-bezier);
 `),l("tabs-nav-scroll-content",`
 transition: border-color .3s var(--n-bezier);
 `),l("tabs-bar",`
 border-radius: 0;
 `)]),h("card-type",[W("prefix, suffix",`
 transition: border-color .3s var(--n-bezier);
 border-bottom: 1px solid var(--n-tab-border-color);
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
 `,[h("addable",`
 padding-left: 8px;
 padding-right: 8px;
 font-size: 16px;
 `,[W("height-placeholder",`
 width: 0;
 font-size: var(--n-tab-font-size);
 `),ke("disabled",[B("&:hover",`
 color: var(--n-tab-text-color-hover);
 `)])]),h("closable","padding-right: 8px;"),h("active",`
 background-color: #0000;
 font-weight: var(--n-tab-font-weight-active);
 color: var(--n-tab-text-color-active);
 `),h("disabled","color: var(--n-tab-text-color-disabled);")]),l("tabs-scroll-padding","border-bottom: 1px solid var(--n-tab-border-color);")]),h("left, right",[l("tabs-wrapper",`
 flex-direction: column;
 `,[l("tabs-tab-wrapper",`
 flex-direction: column;
 `,[l("tabs-tab-pad",`
 height: var(--n-tab-gap-vertical);
 width: 100%;
 `)])])]),h("top",[h("card-type",[l("tabs-tab",`
 border-top-left-radius: var(--n-tab-border-radius);
 border-top-right-radius: var(--n-tab-border-radius);
 `,[h("active",`
 border-bottom: 1px solid #0000;
 `)]),l("tabs-tab-pad",`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),l("tabs-pad",`
 border-bottom: 1px solid var(--n-tab-border-color);
 `)])]),h("left",[h("card-type",[l("tabs-tab",`
 border-top-left-radius: var(--n-tab-border-radius);
 border-bottom-left-radius: var(--n-tab-border-radius);
 `,[h("active",`
 border-right: 1px solid #0000;
 `)]),l("tabs-tab-pad",`
 border-right: 1px solid var(--n-tab-border-color);
 `),l("tabs-pad",`
 border-right: 1px solid var(--n-tab-border-color);
 `)])]),h("right",[h("card-type",[l("tabs-tab",`
 border-top-right-radius: var(--n-tab-border-radius);
 border-bottom-right-radius: var(--n-tab-border-radius);
 `,[h("active",`
 border-left: 1px solid #0000;
 `)]),l("tabs-tab-pad",`
 border-left: 1px solid var(--n-tab-border-color);
 `),l("tabs-pad",`
 border-left: 1px solid var(--n-tab-border-color);
 `)])]),h("bottom",[h("card-type",[l("tabs-tab",`
 border-bottom-left-radius: var(--n-tab-border-radius);
 border-bottom-right-radius: var(--n-tab-border-radius);
 `,[h("active",`
 border-top: 1px solid #0000;
 `)]),l("tabs-tab-pad",`
 border-top: 1px solid var(--n-tab-border-color);
 `),l("tabs-pad",`
 border-top: 1px solid var(--n-tab-border-color);
 `)])])])]),nn=Object.assign(Object.assign({},me.props),{value:[String,Number],defaultValue:[String,Number],trigger:{type:String,default:"click"},type:{type:String,default:"bar"},closable:Boolean,justifyContent:String,size:{type:String,default:"medium"},placement:{type:String,default:"top"},tabStyle:[String,Object],tabClass:String,addTabStyle:[String,Object],addTabClass:String,barWidth:Number,paneClass:String,paneStyle:[String,Object],paneWrapperClass:String,paneWrapperStyle:[String,Object],addable:[Boolean,Object],tabsPadding:{type:Number,default:0},animated:Boolean,onBeforeLeave:Function,onAdd:Function,"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],onClose:[Function,Array],labelSize:String,activeName:[String,Number],onActiveNameChange:[Function,Array]}),rn=F({name:"Tabs",props:nn,setup(e,{slots:t}){var a,o,i,f;const{mergedClsPrefixRef:b,inlineThemeDisabled:s}=Pe(e),x=me("Tabs","-tabs",an,en,e,b),v=$(null),m=$(null),k=$(null),P=$(null),R=$(null),S=$(null),C=$(!0),d=$(!0),c=Me(e,["labelSize","size"]),_=Me(e,["activeName","value"]),A=$((o=(a=_.value)!==null&&a!==void 0?a:e.defaultValue)!==null&&o!==void 0?o:t.default?(f=(i=Se(t.default())[0])===null||i===void 0?void 0:i.props)===null||f===void 0?void 0:f.name:null),z=da(_,A),w={id:0},u=j(()=>{if(!(!e.justifyContent||e.type==="card"))return{display:"flex",justifyContent:e.justifyContent}});te(z,()=>{w.id=0,oe(),Ae()});function y(){var r;const{value:n}=z;return n===null?null:(r=v.value)===null||r===void 0?void 0:r.querySelector(`[data-name="${n}"]`)}function H(r){if(e.type==="card")return;const{value:n}=m;if(!n)return;const p=n.style.opacity==="0";if(r){const T=`${b.value}-tabs-bar--disabled`,{barWidth:L,placement:D}=e;if(r.dataset.disabled==="true"?n.classList.add(T):n.classList.remove(T),["top","bottom"].includes(D)){if(K(["top","maxHeight","height"]),typeof L=="number"&&r.offsetWidth>=L){const M=Math.floor((r.offsetWidth-L)/2)+r.offsetLeft;n.style.left=`${M}px`,n.style.maxWidth=`${L}px`}else n.style.left=`${r.offsetLeft}px`,n.style.maxWidth=`${r.offsetWidth}px`;n.style.width="8192px",p&&(n.style.transition="none"),n.offsetWidth,p&&(n.style.transition="",n.style.opacity="1")}else{if(K(["left","maxWidth","width"]),typeof L=="number"&&r.offsetHeight>=L){const M=Math.floor((r.offsetHeight-L)/2)+r.offsetTop;n.style.top=`${M}px`,n.style.maxHeight=`${L}px`}else n.style.top=`${r.offsetTop}px`,n.style.maxHeight=`${r.offsetHeight}px`;n.style.height="8192px",p&&(n.style.transition="none"),n.offsetHeight,p&&(n.style.transition="",n.style.opacity="1")}}}function G(){if(e.type==="card")return;const{value:r}=m;r&&(r.style.opacity="0")}function K(r){const{value:n}=m;if(n)for(const p of r)n.style[p]=""}function oe(){if(e.type==="card")return;const r=y();r?H(r):G()}function Ae(r){var n;const p=(n=R.value)===null||n===void 0?void 0:n.$el;if(!p)return;const T=y();if(!T)return;const{scrollLeft:L,offsetWidth:D}=p,{offsetLeft:M,offsetWidth:se}=T;L>M?p.scrollTo({top:0,left:M,behavior:"smooth"}):M+se>L+D&&p.scrollTo({top:0,left:M+se-D,behavior:"smooth"})}const ie=$(null);let xe=0,X=null;function ct(r){const n=ie.value;if(n){xe=r.getBoundingClientRect().height;const p=`${xe}px`,T=()=>{n.style.height=p,n.style.maxHeight=p};X?(T(),X(),X=null):X=T}}function ft(r){const n=ie.value;if(n){const p=r.getBoundingClientRect().height,T=()=>{document.body.offsetHeight,n.style.maxHeight=`${p}px`,n.style.height=`${Math.max(xe,p)}px`};X?(X(),X=null,T()):X=T}}function bt(){const r=ie.value;if(r){r.style.maxHeight="",r.style.height="";const{paneWrapperStyle:n}=e;if(typeof n=="string")r.style.cssText=n;else if(n){const{maxHeight:p,height:T}=n;p!==void 0&&(r.style.maxHeight=p),T!==void 0&&(r.style.height=T)}}}const Ee={value:[]},We=$("next");function ut(r){const n=z.value;let p="next";for(const T of Ee.value){if(T===n)break;if(T===r){p="prev";break}}We.value=p,pt(r)}function pt(r){const{onActiveNameChange:n,onUpdateValue:p,"onUpdate:value":T}=e;n&&fe(n,r),p&&fe(p,r),T&&fe(T,r),A.value=r}function vt(r){const{onClose:n}=e;n&&fe(n,r)}function je(){const{value:r}=m;if(!r)return;const n="transition-disabled";r.classList.add(n),oe(),r.classList.remove(n)}const Q=$(null);function ye({transitionDisabled:r}){const n=v.value;if(!n)return;r&&n.classList.add("transition-disabled");const p=y();p&&Q.value&&(Q.value.style.width=`${p.offsetWidth}px`,Q.value.style.height=`${p.offsetHeight}px`,Q.value.style.transform=`translateX(${p.offsetLeft-ca(getComputedStyle(n).paddingLeft)}px)`,r&&Q.value.offsetWidth),r&&n.classList.remove("transition-disabled")}te([z],()=>{e.type==="segment"&&ue(()=>{ye({transitionDisabled:!1})})}),re(()=>{e.type==="segment"&&ye({transitionDisabled:!0})});let He=0;function ht(r){var n;if(r.contentRect.width===0&&r.contentRect.height===0||He===r.contentRect.width)return;He=r.contentRect.width;const{type:p}=e;if((p==="line"||p==="bar")&&je(),p!=="segment"){const{placement:T}=e;Ce((T==="top"||T==="bottom"?(n=R.value)===null||n===void 0?void 0:n.$el:S.value)||null)}}const gt=pe(ht,64);te([()=>e.justifyContent,()=>e.size],()=>{ue(()=>{const{type:r}=e;(r==="line"||r==="bar")&&je()})});const le=$(!1);function mt(r){var n;const{target:p,contentRect:{width:T}}=r,L=p.parentElement.offsetWidth;if(!le.value)L<T&&(le.value=!0);else{const{value:D}=P;if(!D)return;L-T>D.$el.offsetWidth&&(le.value=!1)}Ce(((n=R.value)===null||n===void 0?void 0:n.$el)||null)}const xt=pe(mt,64);function yt(){const{onAdd:r}=e;r&&r(),ue(()=>{const n=y(),{value:p}=R;!n||!p||p.scrollTo({left:n.offsetLeft,top:0,behavior:"smooth"})})}function Ce(r){if(!r)return;const{placement:n}=e;if(n==="top"||n==="bottom"){const{scrollLeft:p,scrollWidth:T,offsetWidth:L}=r;C.value=p<=0,d.value=p+L>=T}else{const{scrollTop:p,scrollHeight:T,offsetHeight:L}=r;C.value=p<=0,d.value=p+L>=T}}const Ct=pe(r=>{Ce(r.target)},64);et(Le,{triggerRef:I(e,"trigger"),tabStyleRef:I(e,"tabStyle"),tabClassRef:I(e,"tabClass"),addTabStyleRef:I(e,"addTabStyle"),addTabClassRef:I(e,"addTabClass"),paneClassRef:I(e,"paneClass"),paneStyleRef:I(e,"paneStyle"),mergedClsPrefixRef:b,typeRef:I(e,"type"),closableRef:I(e,"closable"),valueRef:z,tabChangeIdRef:w,onBeforeLeaveRef:I(e,"onBeforeLeave"),activateTab:ut,handleClose:vt,handleAdd:yt}),nt(()=>{oe(),Ae()}),qt(()=>{const{value:r}=k;if(!r)return;const{value:n}=b,p=`${n}-tabs-nav-scroll-wrapper--shadow-start`,T=`${n}-tabs-nav-scroll-wrapper--shadow-end`;C.value?r.classList.remove(p):r.classList.add(p),d.value?r.classList.remove(T):r.classList.add(T)});const St={syncBarPosition:()=>{oe()}},Tt=()=>{ye({transitionDisabled:!0})},Ie=j(()=>{const{value:r}=c,{type:n}=e,p={card:"Card",bar:"Bar",line:"Line",segment:"Segment"}[n],T=`${r}${p}`,{self:{barColor:L,closeIconColor:D,closeIconColorHover:M,closeIconColorPressed:se,tabColor:wt,tabBorderColor:Rt,paneTextColor:kt,tabFontWeight:_t,tabBorderRadius:$t,tabFontWeightActive:Pt,colorSegment:Bt,fontWeightStrong:zt,tabColorSegment:Lt,closeSize:At,closeIconSize:Et,closeColorHover:Wt,closeColorPressed:jt,closeBorderRadius:Ht,[N("panePadding",r)]:de,[N("tabPadding",T)]:It,[N("tabPaddingVertical",T)]:Ot,[N("tabGap",T)]:Vt,[N("tabGap",`${T}Vertical`)]:Mt,[N("tabTextColor",n)]:Nt,[N("tabTextColorActive",n)]:Ft,[N("tabTextColorHover",n)]:Gt,[N("tabTextColorDisabled",n)]:Dt,[N("tabFontSize",r)]:Ut},common:{cubicBezierEaseInOut:Xt}}=x.value;return{"--n-bezier":Xt,"--n-color-segment":Bt,"--n-bar-color":L,"--n-tab-font-size":Ut,"--n-tab-text-color":Nt,"--n-tab-text-color-active":Ft,"--n-tab-text-color-disabled":Dt,"--n-tab-text-color-hover":Gt,"--n-pane-text-color":kt,"--n-tab-border-color":Rt,"--n-tab-border-radius":$t,"--n-close-size":At,"--n-close-icon-size":Et,"--n-close-color-hover":Wt,"--n-close-color-pressed":jt,"--n-close-border-radius":Ht,"--n-close-icon-color":D,"--n-close-icon-color-hover":M,"--n-close-icon-color-pressed":se,"--n-tab-color":wt,"--n-tab-font-weight":_t,"--n-tab-font-weight-active":Pt,"--n-tab-padding":It,"--n-tab-padding-vertical":Ot,"--n-tab-gap":Vt,"--n-tab-gap-vertical":Mt,"--n-pane-padding-left":be(de,"left"),"--n-pane-padding-right":be(de,"right"),"--n-pane-padding-top":be(de,"top"),"--n-pane-padding-bottom":be(de,"bottom"),"--n-font-weight-strong":zt,"--n-tab-color-segment":Lt}}),Z=s?it("tabs",j(()=>`${c.value[0]}${e.type[0]}`),Ie,e):void 0;return Object.assign({mergedClsPrefix:b,mergedValue:z,renderedNames:new Set,segmentCapsuleElRef:Q,tabsPaneWrapperRef:ie,tabsElRef:v,barElRef:m,addTabInstRef:P,xScrollInstRef:R,scrollWrapperElRef:k,addTabFixed:le,tabWrapperStyle:u,handleNavResize:gt,mergedSize:c,handleScroll:Ct,handleTabsResize:xt,cssVars:s?void 0:Ie,themeClass:Z==null?void 0:Z.themeClass,animationDirection:We,renderNameListRef:Ee,yScrollElRef:S,handleSegmentResize:Tt,onAnimationBeforeLeave:ct,onAnimationEnter:ft,onAnimationAfterEnter:bt,onRender:Z==null?void 0:Z.onRender},St)},render(){const{mergedClsPrefix:e,type:t,placement:a,addTabFixed:o,addable:i,mergedSize:f,renderNameListRef:b,onRender:s,paneWrapperClass:x,paneWrapperStyle:v,$slots:{default:m,prefix:k,suffix:P}}=this;s==null||s();const R=m?Se(m()).filter(w=>w.type.__TAB_PANE__===!0):[],S=m?Se(m()).filter(w=>w.type.__TAB__===!0):[],C=!S.length,d=t==="card",c=t==="segment",_=!d&&!c&&this.justifyContent;b.value=[];const A=()=>{const w=g("div",{style:this.tabWrapperStyle,class:[`${e}-tabs-wrapper`]},_?null:g("div",{class:`${e}-tabs-scroll-padding`,style:{width:`${this.tabsPadding}px`}}),C?R.map((u,y)=>(b.value.push(u.props.name),Re(g(_e,Object.assign({},u.props,{internalCreatedByPane:!0,internalLeftPadded:y!==0&&(!_||_==="center"||_==="start"||_==="end")}),u.children?{default:u.children.tab}:void 0)))):S.map((u,y)=>(b.value.push(u.props.name),Re(y!==0&&!_?Ke(u):u))),!o&&i&&d?Je(i,(C?R.length:S.length)!==0):null,_?null:g("div",{class:`${e}-tabs-scroll-padding`,style:{width:`${this.tabsPadding}px`}}));return g("div",{ref:"tabsElRef",class:`${e}-tabs-nav-scroll-content`},d&&i?g(Te,{onResize:this.handleTabsResize},{default:()=>w}):w,d?g("div",{class:`${e}-tabs-pad`}):null,d?null:g("div",{ref:"barElRef",class:`${e}-tabs-bar`}))},z=c?"top":a;return g("div",{class:[`${e}-tabs`,this.themeClass,`${e}-tabs--${t}-type`,`${e}-tabs--${f}-size`,_&&`${e}-tabs--flex`,`${e}-tabs--${z}`],style:this.cssVars},g("div",{class:[`${e}-tabs-nav--${t}-type`,`${e}-tabs-nav--${z}`,`${e}-tabs-nav`]},Ne(k,w=>w&&g("div",{class:`${e}-tabs-nav__prefix`},w)),c?g(Te,{onResize:this.handleSegmentResize},{default:()=>g("div",{class:`${e}-tabs-rail`,ref:"tabsElRef"},g("div",{class:`${e}-tabs-capsule`,ref:"segmentCapsuleElRef"},g("div",{class:`${e}-tabs-wrapper`},g("div",{class:`${e}-tabs-tab`}))),C?R.map((w,u)=>(b.value.push(w.props.name),g(_e,Object.assign({},w.props,{internalCreatedByPane:!0,internalLeftPadded:u!==0}),w.children?{default:w.children.tab}:void 0))):S.map((w,u)=>(b.value.push(w.props.name),u===0?w:Ke(w))))}):g(Te,{onResize:this.handleNavResize},{default:()=>g("div",{class:`${e}-tabs-nav-scroll-wrapper`,ref:"scrollWrapperElRef"},["top","bottom"].includes(z)?g(Ta,{ref:"xScrollInstRef",onScroll:this.handleScroll},{default:A}):g("div",{class:`${e}-tabs-nav-y-scroll`,onScroll:this.handleScroll,ref:"yScrollElRef"},A()))}),o&&i&&d?Je(i,!0):null,Ne(P,w=>w&&g("div",{class:`${e}-tabs-nav__suffix`},w))),C&&(this.animated&&(z==="top"||z==="bottom")?g("div",{ref:"tabsPaneWrapperRef",style:v,class:[`${e}-tabs-pane-wrapper`,x]},qe(R,this.mergedValue,this.renderedNames,this.onAnimationBeforeLeave,this.onAnimationEnter,this.onAnimationAfterEnter,this.animationDirection)):qe(R,this.mergedValue,this.renderedNames)))}});function qe(e,t,a,o,i,f,b){const s=[];return e.forEach(x=>{const{name:v,displayDirective:m,"display-directive":k}=x.props,P=S=>m===S||k===S,R=t===v;if(x.key!==void 0&&(x.key=v),R||P("show")||P("show:lazy")&&a.has(v)){a.has(v)||a.add(v);const S=!P("if");s.push(S?Jt(x,[[Zt,R]]):x)}}),b?g(Kt,{name:`${b}-transition`,onBeforeLeave:o,onEnter:i,onAfterEnter:f},{default:()=>s}):s}function Je(e,t){return g(_e,{ref:"addTabInstRef",key:"__addable",name:"__addable",internalCreatedByPane:!0,internalAddable:!0,internalLeftPadded:t,disabled:typeof e=="object"&&e.disabled})}function Ke(e){const t=Qt(e);return t.props?t.props.internalLeftPadded=!0:t.props={internalLeftPadded:!0},t}function Re(e){return Array.isArray(e.dynamicProps)?e.dynamicProps.includes("internalLeftPadded")||e.dynamicProps.push("internalLeftPadded"):e.dynamicProps=["internalLeftPadded"],e}const on={name:"Timeline"},ln={class:"timeline"};function sn(e,t,a,o,i,f){return E(),V("div",ln,[ea(e.$slots,"default",{},void 0,!0)])}const Qe=$e(on,[["render",sn],["__scopeId","data-v-dcc29abb"]]),dn={name:"TimelineItem",props:{content:{type:String,required:!0},time:{type:String,required:!0}},methods:{handleClick(){this.$emit("click")}}},cn=e=>(tt("data-v-b359483c"),e=e(),at(),e),fn={class:"timeline-item-content"},bn=cn(()=>O("span",{class:"circle"},null,-1));function un(e,t,a,o,i,f){return E(),V("div",{class:"timeline-item",onClick:t[0]||(t[0]=(...b)=>f.handleClick&&f.handleClick(...b))},[O("div",fn,[O("time",null,ae(a.time),1),O("div",null,ae(a.content),1)]),bn])}const Ze=$e(dn,[["render",un],["__scopeId","data-v-b359483c"]]),pn=e=>(tt("data-v-9ecfc535"),e=e(),at(),e),vn={class:"container"},hn=pn(()=>O("h1",null,"文章归档📚",-1)),gn={class:"xz"},mn=["id"],xn={class:"anchor"},yn=["id"],Cn={class:"anchor"},Sn=F({__name:"ArchiveView",setup(e){const t=$(0),a=$({}),o=$({}),i=ta(),f=async()=>{try{const s=await Fe.get("/markdown/metadata/posts_by_year.json");a.value=s.data;const x=await Fe.get("/markdown/metadata/posts_by_tag.json");o.value=x.data,t.value=Object.values(a.value).flat().length}catch(s){console.error("Error loading archives data:",s)}},b=j(()=>Object.keys(a.value).sort((s,x)=>Number(x)-Number(s)).map(s=>({year:s,posts:a.value[s]})));return re(()=>{f()}),(s,x)=>(E(),V(q,null,[Y(va,{expandNav:!0}),O("main",null,[O("div",vn,[hn,O("span",gn,"共发布 "+ae(t.value)+" 篇文章 📕",1),Y(U(rn),{type:"segment",animated:""},{default:J(()=>[Y(U(Ye),{name:"by-year",tab:"按照时间"},{default:J(()=>[(E(!0),V(q,null,ee(b.value,v=>(E(),V("div",{key:v.year},[O("h2",{id:v.year},ae(v.year),9,mn),Y(Qe,null,{default:J(()=>[(E(!0),V(q,null,ee(v.posts,m=>(E(),ce(Ze,{key:m.file,content:m.title,time:m.date,onClick:k=>U(i).push(`/post/${m.file}`)},null,8,["content","time","onClick"]))),128))]),_:2},1024)]))),128)),O("div",xn,[Y(U(Xe),{affix:"","trigger-top":24,top:88,style:{"z-index":"1"},"ignore-gap":""},{default:J(()=>[(E(!0),V(q,null,ee(b.value,v=>(E(),ce(U(Ue),{key:v.year,title:v.year,href:`#${v.year}`},null,8,["title","href"]))),128))]),_:1})])]),_:1}),Y(U(Ye),{name:"by-tag",tab:"按照类别"},{default:J(()=>[(E(!0),V(q,null,ee(o.value,(v,m)=>(E(),V("div",{key:m},[O("h2",{id:m},ae(m),9,yn),Y(Qe,null,{default:J(()=>[(E(!0),V(q,null,ee(v,k=>(E(),ce(Ze,{key:k.file,content:k.title,time:k.date,onClick:P=>U(i).push(`/post/${k.file}`)},null,8,["content","time","onClick"]))),128))]),_:2},1024)]))),128)),O("div",Cn,[Y(U(Xe),{affix:"","trigger-top":24,top:88,style:{"z-index":"1"},"ignore-gap":""},{default:J(()=>[(E(!0),V(q,null,ee(o.value,(v,m)=>(E(),ce(U(Ue),{key:m,title:m,href:`#${m}`},null,8,["title","href"]))),128))]),_:1})])]),_:1})]),_:1})])])],64))}}),_n=$e(Sn,[["__scopeId","data-v-9ecfc535"]]);export{_n as default};
