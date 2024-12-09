import{i as ie,w as re,f as me,o as le,d as G,r as _,h,c as H,t as O,p as tt,n as pe,m as Ut,F as J,g as Xt,k as Yt,v as qt,E as Jt,G as Qt,_ as _e,q as W,s as M,e as Zt,u as F,z as oe,H as Kt,x as U,y as q,A as X,D as ae,I as fe}from"./app-VAtYFRKA.js";import{c as ea,a as Ve,b as ta,u as aa,i as at,S as ra,k as Me,f as Fe,j as Te,d as na,h as Ne}from"./Scrollbar-tU6NH4mS.js";import{u as oa,D as ia,E as he,G as la,f as l,q as g,k as Be,h as sa,j as rt,x as da,c as nt,s as Pe,b as B,g as A,l as xe,n as ot,H as ca,N as fa,v as Ge,V as we,A as be,d as ba,m as N,w as ue,F as ua}from"./Nav-t6ucqikO.js";import{a as pa,P as va}from"./PageHead-8ohv8QxQ.js";import{u as it,k as lt,g as ga,r as ha,o as ma}from"./render-Dh7ZLas9.js";function xa(e,t,a){const o=ie(e,null);o!==null&&(t in o||(o[t]=[]),o[t].push(a.value),re(a,(i,f)=>{const b=o[t],s=b.findIndex(m=>m===f);~s&&b.splice(s,1),b.push(i)}),me(()=>{const i=o[t],f=i.findIndex(b=>b===a.value);~f&&i.splice(f,1)}))}function ya(e,t,a){const o=ie(e,null);o!==null&&(t in o||(o[t]=[]),le(()=>{const i=a();i&&o[t].push(i)}),me(()=>{const i=o[t],f=a(),b=i.findIndex(s=>s===f);~b&&i.splice(b,1)}))}const Ca=Ve(".v-x-scroll",{overflow:"auto",scrollbarWidth:"none"},[Ve("&::-webkit-scrollbar",{width:0,height:0})]),Sa=G({name:"XScroll",props:{disabled:Boolean,onScroll:Function},setup(){const e=_(null);function t(i){!(i.currentTarget.offsetWidth<i.currentTarget.scrollWidth)||i.deltaY===0||(i.currentTarget.scrollLeft+=i.deltaY+i.deltaX,i.preventDefault())}const a=oa();return Ca.mount({id:"vueuc/x-scroll",head:!0,anchorMetaName:ea,ssr:a}),Object.assign({selfRef:e,handleWheel:t},{scrollTo(...i){var f;(f=e.value)===null||f===void 0||f.scrollTo(...i)}})},render(){return h("div",{ref:"selfRef",onScroll:this.onScroll,onWheel:this.disabled?void 0:this.handleWheel,class:"v-x-scroll"},this.$slots)}});var Ta=/\s/;function wa(e){for(var t=e.length;t--&&Ta.test(e.charAt(t)););return t}var Ra=/^\s+/;function ka(e){return e&&e.slice(0,wa(e)+1).replace(Ra,"")}var De=NaN,Pa=/^[-+]0x[0-9a-f]+$/i,$a=/^0b[01]+$/i,_a=/^0o[0-7]+$/i,Ba=parseInt;function Ue(e){if(typeof e=="number")return e;if(ia(e))return De;if(he(e)){var t=typeof e.valueOf=="function"?e.valueOf():e;e=he(t)?t+"":t}if(typeof e!="string")return e===0?e:+e;e=ka(e);var a=$a.test(e);return a||_a.test(e)?Ba(e.slice(2),a?2:8):Pa.test(e)?De:+e}var Re=function(){return la.Date.now()},za="Expected a function",La=Math.max,Aa=Math.min;function Ea(e,t,a){var o,i,f,b,s,m,v=0,x=!1,k=!1,$=!0;if(typeof e!="function")throw new TypeError(za);t=Ue(t)||0,he(a)&&(x=!!a.leading,k="maxWait"in a,f=k?La(Ue(a.maxWait)||0,t):f,$="trailing"in a?!!a.trailing:$);function R(u){var y=o,j=i;return o=i=void 0,v=u,b=e.apply(j,y),b}function S(u){return v=u,s=setTimeout(c,t),x?R(u):b}function C(u){var y=u-m,j=u-v,D=t-y;return k?Aa(D,f-j):D}function d(u){var y=u-m,j=u-v;return m===void 0||y>=t||y<0||k&&j>=f}function c(){var u=Re();if(d(u))return P(u);s=setTimeout(c,C(u))}function P(u){return s=void 0,$&&o?R(u):(o=i=void 0,b)}function E(){s!==void 0&&clearTimeout(s),v=0,o=m=i=s=void 0}function z(){return s===void 0?b:P(Re())}function w(){var u=Re(),y=d(u);if(o=arguments,i=this,m=u,y){if(s===void 0)return S(m);if(k)return clearTimeout(s),s=setTimeout(c,t),R(m)}return s===void 0&&(s=setTimeout(c,t)),b}return w.cancel=E,w.flush=z,w}var Wa="Expected a function";function ve(e,t,a){var o=!0,i=!0;if(typeof e!="function")throw new TypeError(Wa);return he(a)&&(o="leading"in a?!!a.leading:o,i="trailing"in a?!!a.trailing:i),Ea(e,t,{leading:o,maxWait:t,trailing:i})}const Ha=l("affix",[g("affixed",{position:"fixed"},[g("absolute-positioned",{position:"absolute"})])]);function ja(e){return e instanceof HTMLElement?e.scrollTop:window.scrollY}function Oa(e){return e instanceof HTMLElement?e.getBoundingClientRect():{top:0,bottom:window.innerHeight}}const ze={listenTo:[String,Object,Function],top:Number,bottom:Number,triggerTop:Number,triggerBottom:Number,position:{type:String,default:"fixed"},offsetTop:{type:Number,validator:()=>!0,default:void 0},offsetBottom:{type:Number,validator:()=>!0,default:void 0},target:{type:Function,validator:()=>!0,default:void 0}},Ia=lt(ze),Va=G({name:"Affix",props:ze,setup(e){const{mergedClsPrefixRef:t}=Be(e);sa("-affix",Ha,t);let a=null;const o=_(!1),i=_(!1),f=_(null),b=_(null),s=H(()=>i.value||o.value),m=H(()=>{var d,c;return(c=(d=e.triggerTop)!==null&&d!==void 0?d:e.offsetTop)!==null&&c!==void 0?c:e.top}),v=H(()=>{var d,c;return(c=(d=e.top)!==null&&d!==void 0?d:e.triggerTop)!==null&&c!==void 0?c:e.offsetTop}),x=H(()=>{var d,c;return(c=(d=e.bottom)!==null&&d!==void 0?d:e.triggerBottom)!==null&&c!==void 0?c:e.offsetBottom}),k=H(()=>{var d,c;return(c=(d=e.triggerBottom)!==null&&d!==void 0?d:e.offsetBottom)!==null&&c!==void 0?c:e.bottom}),$=_(null),R=()=>{const{target:d,listenTo:c}=e;d?a=d():c?a=it(c):a=document,a&&(a.addEventListener("scroll",S),S())};function S(){ta(C)}function C(){const{value:d}=$;if(!a||!d)return;const c=ja(a);if(s.value){b.value!==null&&c<b.value&&(o.value=!1,b.value=null),f.value!==null&&c>f.value&&(i.value=!1,f.value=null);return}const P=Oa(a),E=d.getBoundingClientRect(),z=E.top-P.top,w=P.bottom-E.bottom,u=m.value,y=k.value;u!==void 0&&z<=u?(o.value=!0,b.value=c-(u-z)):(o.value=!1,b.value=null),y!==void 0&&w<=y?(i.value=!0,f.value=c+y-w):(i.value=!1,f.value=null)}return le(()=>{R()}),me(()=>{a&&a.removeEventListener("scroll",S)}),{selfRef:$,affixed:s,mergedClsPrefix:t,mergedstyle:H(()=>{const d={};return o.value&&m.value!==void 0&&v.value!==void 0&&(d.top=`${v.value}px`),i.value&&k.value!==void 0&&x.value!==void 0&&(d.bottom=`${x.value}px`),d})}},render(){const{mergedClsPrefix:e}=this;return h("div",{ref:"selfRef",class:[`${e}-affix`,{[`${e}-affix--affixed`]:this.affixed,[`${e}-affix--absolute-positioned`]:this.position==="absolute"}],style:this.mergedstyle},this.$slots)}}),Ma=G({name:"Add",render(){return h("svg",{width:"512",height:"512",viewBox:"0 0 512 512",fill:"none",xmlns:"http://www.w3.org/2000/svg"},h("path",{d:"M256 112V400M400 256H112",stroke:"currentColor","stroke-width":"32","stroke-linecap":"round","stroke-linejoin":"round"}))}}),Fa={linkFontSize:"13px",linkPadding:"0 0 0 16px",railWidth:"4px"};function Na(e){const{borderRadius:t,railColor:a,primaryColor:o,primaryColorHover:i,primaryColorPressed:f,textColor2:b}=e;return Object.assign(Object.assign({},Fa),{borderRadius:t,railColor:a,railColorActive:o,linkColor:da(o,{alpha:.15}),linkTextColor:b,linkTextColorHover:i,linkTextColorPressed:f,linkTextColorActive:o})}const Ga={name:"Anchor",common:rt,self:Na},ge=nt("n-anchor"),Da={title:String,href:String},Xe=G({name:"AnchorLink",props:Da,setup(e,{slots:t}){const a=_(null),o=ie(ge),i=O(e,"href"),f=aa(()=>i.value&&i.value===o.activeHref.value);xa(ge,"collectedLinkHrefs",i),ya(ge,"titleEls",()=>a.value),re(f,s=>{s&&a.value&&o.updateBarPosition(a.value)});function b(){e.href!==void 0&&o.setActiveHref(e.href)}return()=>{var s;const{value:m}=o.mergedClsPrefix;return h("div",{class:[`${m}-anchor-link`,f.value&&`${m}-anchor-link--active`]},h("a",{ref:a,class:[`${m}-anchor-link__title`],href:e.href,title:ga(e.title),onClick:b},e.title),(s=t.default)===null||s===void 0?void 0:s.call(t))}}});function Ua(e,t){const{top:a,height:o}=e.getBoundingClientRect(),i=t instanceof HTMLElement?t.getBoundingClientRect().top:0;return{top:a-i,height:o}}const Le={type:{type:String,default:"rail"},showRail:{type:Boolean,default:!0},showBackground:{type:Boolean,default:!0},bound:{type:Number,default:12},internalScrollable:Boolean,ignoreGap:Boolean,offsetTarget:[String,Object,Function]},Xa=lt(Le),Ya=G({name:"BaseAnchor",props:Object.assign(Object.assign({},Le),{mergedClsPrefix:{type:String,required:!0}}),setup(e){const t=[],a=[],o=_(null),i=_(null),f=_(null),b=_(null),s=H(()=>e.type==="block"),m=H(()=>!s.value&&e.showRail);function v(){const{value:S}=f,{value:C}=i;S&&(S.style.transition="none"),C&&(C.style.transition="none"),a&&a.forEach(d=>{d.style.transition="none"}),pe(()=>{const{value:d}=f,{value:c}=i;d&&(d.offsetWidth,d.style.transition=""),c&&(c.offsetWidth,c.style.transition=""),a&&a.forEach(P=>{P.offsetWidth,P.style.transition=""})})}function x(S,C=!0){const{value:d}=f,{value:c}=i,{value:P}=b;if(!P||!d)return;C||(d.style.transition="none",c&&(c.style.transition="none"));const{offsetHeight:E,offsetWidth:z}=S,{top:w,left:u}=S.getBoundingClientRect(),{top:y,left:j}=P.getBoundingClientRect(),D=w-y,Q=u-j;d.style.top=`${D}px`,d.style.height=`${E}px`,c&&(c.style.top=`${D}px`,c.style.height=`${E}px`,c.style.maxWidth=`${z+Q}px`),d.offsetHeight,c&&c.offsetHeight,C||(d.style.transition="",c&&(c.style.transition=""))}const k=ve(()=>{R(!0)},128);function $(S,C=!0){const d=/^#([^#]+)$/.exec(S);if(!d)return;const c=document.getElementById(d[1]);c&&(o.value=S,c.scrollIntoView(),C||v(),k())}function R(S=!0){var C;const d=[],c=it((C=e.offsetTarget)!==null&&C!==void 0?C:document);t.forEach(u=>{const y=/#([^#]+)$/.exec(u);if(!y)return;const j=document.getElementById(y[1]);if(j&&c){const{top:D,height:Q}=Ua(j,c);d.push({top:D,height:Q,href:u})}}),d.sort((u,y)=>u.top>y.top?1:(u.top===y.top&&u.height<y.height,-1));const P=o.value,{bound:E,ignoreGap:z}=e,w=d.reduce((u,y)=>y.top+y.height<0?z?y:u:y.top<=E?u===null?y:y.top===u.top?y.href===P?y:u:y.top>u.top?y:u:u,null);S||v(),w?o.value=w.href:o.value=null}return tt(ge,{activeHref:o,mergedClsPrefix:O(e,"mergedClsPrefix"),updateBarPosition:x,setActiveHref:$,collectedLinkHrefs:t,titleEls:a}),le(()=>{document.addEventListener("scroll",k,!0),$(window.location.hash),R(!1)}),at(()=>{$(window.location.hash),R(!1)}),me(()=>{document.removeEventListener("scroll",k,!0)}),re(o,S=>{if(S===null){const{value:C}=i;C&&!s.value&&(C.style.maxWidth="0")}}),{selfRef:b,barRef:f,slotRef:i,setActiveHref:$,activeHref:o,isBlockType:s,mergedShowRail:m}},render(){var e;const{mergedClsPrefix:t,mergedShowRail:a,isBlockType:o,$slots:i}=this,f=h("div",{class:[`${t}-anchor`,o&&`${t}-anchor--block`,a&&`${t}-anchor--show-rail`],ref:"selfRef"},a&&this.showBackground?h("div",{ref:"slotRef",class:`${t}-anchor-link-background`}):null,a?h("div",{class:`${t}-anchor-rail`},h("div",{ref:"barRef",class:[`${t}-anchor-rail__bar`,this.activeHref!==null&&`${t}-anchor-rail__bar--active`]})):null,(e=i.default)===null||e===void 0?void 0:e.call(i));return this.internalScrollable?h(ra,null,{default:()=>f}):f}}),qa=l("anchor",`
 position: relative;
`,[Pe("block",`
 padding-left: var(--n-rail-width);
 `,[l("anchor-link",[B("+, >",[l("anchor-link",`
 margin-top: .5em;
 `)])]),l("anchor-link-background",`
 max-width: 0;
 border-top-right-radius: 10.5px;
 border-bottom-right-radius: 10.5px;
 `),Pe("show-rail",[B(">",[l("anchor-link","padding-left: 0;")])])]),g("block",[l("anchor-link",`
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
 `,[g("active",[B(">",[A("title",`
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
 `,[B("&:hover, &:focus",`
 color: var(--n-link-text-color-hover);
 `),B("&:active",`
 color: var(--n-link-text-color-pressed);
 `)])])]),Ja=Object.assign(Object.assign(Object.assign(Object.assign({},xe.props),{affix:Boolean}),ze),Le),Ye=G({name:"Anchor",props:Ja,setup(e,{slots:t}){const{mergedClsPrefixRef:a,inlineThemeDisabled:o}=Be(e),i=xe("Anchor","-anchor",qa,Ga,e,a),f=_(null),b=H(()=>{const{self:{railColor:m,linkColor:v,railColorActive:x,linkTextColor:k,linkTextColorHover:$,linkTextColorPressed:R,linkTextColorActive:S,linkFontSize:C,railWidth:d,linkPadding:c,borderRadius:P},common:{cubicBezierEaseInOut:E}}=i.value;return{"--n-link-border-radius":P,"--n-link-color":v,"--n-link-font-size":C,"--n-link-text-color":k,"--n-link-text-color-hover":$,"--n-link-text-color-active":S,"--n-link-text-color-pressed":R,"--n-link-padding":c,"--n-bezier":E,"--n-rail-color":m,"--n-rail-color-active":x,"--n-rail-width":d}}),s=o?ot("anchor",void 0,b,e):void 0;return{scrollTo(m){var v;(v=f.value)===null||v===void 0||v.setActiveHref(m)},renderAnchor:()=>(s==null||s.onRender(),h(Ya,Object.assign({ref:f,style:o?void 0:b.value,class:s==null?void 0:s.themeClass.value},Me(e,Xa),{mergedClsPrefix:a.value}),t))}},render(){return this.affix?h(Va,Object.assign({},Me(this,Ia)),{default:this.renderAnchor}):this.renderAnchor()}}),Qa={tabFontSizeSmall:"14px",tabFontSizeMedium:"14px",tabFontSizeLarge:"16px",tabGapSmallLine:"36px",tabGapMediumLine:"36px",tabGapLargeLine:"36px",tabGapSmallLineVertical:"8px",tabGapMediumLineVertical:"8px",tabGapLargeLineVertical:"8px",tabPaddingSmallLine:"6px 0",tabPaddingMediumLine:"10px 0",tabPaddingLargeLine:"14px 0",tabPaddingVerticalSmallLine:"6px 12px",tabPaddingVerticalMediumLine:"8px 16px",tabPaddingVerticalLargeLine:"10px 20px",tabGapSmallBar:"36px",tabGapMediumBar:"36px",tabGapLargeBar:"36px",tabGapSmallBarVertical:"8px",tabGapMediumBarVertical:"8px",tabGapLargeBarVertical:"8px",tabPaddingSmallBar:"4px 0",tabPaddingMediumBar:"6px 0",tabPaddingLargeBar:"10px 0",tabPaddingVerticalSmallBar:"6px 12px",tabPaddingVerticalMediumBar:"8px 16px",tabPaddingVerticalLargeBar:"10px 20px",tabGapSmallCard:"4px",tabGapMediumCard:"4px",tabGapLargeCard:"4px",tabGapSmallCardVertical:"4px",tabGapMediumCardVertical:"4px",tabGapLargeCardVertical:"4px",tabPaddingSmallCard:"8px 16px",tabPaddingMediumCard:"10px 20px",tabPaddingLargeCard:"12px 24px",tabPaddingSmallSegment:"4px 0",tabPaddingMediumSegment:"6px 0",tabPaddingLargeSegment:"8px 0",tabPaddingVerticalLargeSegment:"0 8px",tabPaddingVerticalSmallCard:"8px 12px",tabPaddingVerticalMediumCard:"10px 16px",tabPaddingVerticalLargeCard:"12px 20px",tabPaddingVerticalSmallSegment:"0 4px",tabPaddingVerticalMediumSegment:"0 6px",tabGapSmallSegment:"0",tabGapMediumSegment:"0",tabGapLargeSegment:"0",tabGapSmallSegmentVertical:"0",tabGapMediumSegmentVertical:"0",tabGapLargeSegmentVertical:"0",panePaddingSmall:"8px 0 0 0",panePaddingMedium:"12px 0 0 0",panePaddingLarge:"16px 0 0 0",closeSize:"18px",closeIconSize:"14px"};function Za(e){const{textColor2:t,primaryColor:a,textColorDisabled:o,closeIconColor:i,closeIconColorHover:f,closeIconColorPressed:b,closeColorHover:s,closeColorPressed:m,tabColor:v,baseColor:x,dividerColor:k,fontWeight:$,textColor1:R,borderRadius:S,fontSize:C,fontWeightStrong:d}=e;return Object.assign(Object.assign({},Qa),{colorSegment:v,tabFontSizeCard:C,tabTextColorLine:R,tabTextColorActiveLine:a,tabTextColorHoverLine:a,tabTextColorDisabledLine:o,tabTextColorSegment:R,tabTextColorActiveSegment:t,tabTextColorHoverSegment:t,tabTextColorDisabledSegment:o,tabTextColorBar:R,tabTextColorActiveBar:a,tabTextColorHoverBar:a,tabTextColorDisabledBar:o,tabTextColorCard:R,tabTextColorHoverCard:R,tabTextColorActiveCard:a,tabTextColorDisabledCard:o,barColor:a,closeIconColor:i,closeIconColorHover:f,closeIconColorPressed:b,closeColorHover:s,closeColorPressed:m,closeBorderRadius:S,tabColor:v,tabColorSegment:x,tabBorderColor:k,tabFontWeightActive:$,tabFontWeight:$,tabBorderRadius:S,paneTextColor:t,fontWeightStrong:d})}const Ka={name:"Tabs",common:rt,self:Za},Ae=nt("n-tabs"),st={tab:[String,Number,Object,Function],name:{type:[String,Number],required:!0},disabled:Boolean,displayDirective:{type:String,default:"if"},closable:{type:Boolean,default:void 0},tabProps:Object,label:[String,Number,Object,Function]},qe=G({__TAB_PANE__:!0,name:"TabPane",alias:["TabPanel"],props:st,setup(e){const t=ie(Ae,null);return t||ca("tab-pane","`n-tab-pane` must be placed inside `n-tabs`."),{style:t.paneStyleRef,class:t.paneClassRef,mergedClsPrefix:t.mergedClsPrefixRef}},render(){return h("div",{class:[`${this.mergedClsPrefix}-tab-pane`,this.class],style:this.style},this.$slots)}}),er=Object.assign({internalLeftPadded:Boolean,internalAddable:Boolean,internalCreatedByPane:Boolean},ma(st,["displayDirective"])),$e=G({__TAB__:!0,inheritAttrs:!1,name:"Tab",props:er,setup(e){const{mergedClsPrefixRef:t,valueRef:a,typeRef:o,closableRef:i,tabStyleRef:f,addTabStyleRef:b,tabClassRef:s,addTabClassRef:m,tabChangeIdRef:v,onBeforeLeaveRef:x,triggerRef:k,handleAdd:$,activateTab:R,handleClose:S}=ie(Ae);return{trigger:k,mergedClosable:H(()=>{if(e.internalAddable)return!1;const{closable:C}=e;return C===void 0?i.value:C}),style:f,addStyle:b,tabClass:s,addTabClass:m,clsPrefix:t,value:a,type:o,handleClose(C){C.stopPropagation(),!e.disabled&&S(e.name)},activateTab(){if(e.disabled)return;if(e.internalAddable){$();return}const{name:C}=e,d=++v.id;if(C!==a.value){const{value:c}=x;c?Promise.resolve(c(e.name,a.value)).then(P=>{P&&v.id===d&&R(C)}):R(C)}}}},render(){const{internalAddable:e,clsPrefix:t,name:a,disabled:o,label:i,tab:f,value:b,mergedClosable:s,trigger:m,$slots:{default:v}}=this,x=i??f;return h("div",{class:`${t}-tabs-tab-wrapper`},this.internalLeftPadded?h("div",{class:`${t}-tabs-tab-pad`}):null,h("div",Object.assign({key:a,"data-name":a,"data-disabled":o?!0:void 0},Ut({class:[`${t}-tabs-tab`,b===a&&`${t}-tabs-tab--active`,o&&`${t}-tabs-tab--disabled`,s&&`${t}-tabs-tab--closable`,e&&`${t}-tabs-tab--addable`,e?this.addTabClass:this.tabClass],onClick:m==="click"?this.activateTab:void 0,onMouseenter:m==="hover"?this.activateTab:void 0,style:e?this.addStyle:this.style},this.internalCreatedByPane?this.tabProps||{}:this.$attrs)),h("span",{class:`${t}-tabs-tab__label`},e?h(J,null,h("div",{class:`${t}-tabs-tab__height-placeholder`}," "),h(fa,{clsPrefix:t},{default:()=>h(Ma,null)})):v?v():typeof x=="object"?x:ha(x??a)),s&&this.type==="card"?h(pa,{clsPrefix:t,class:`${t}-tabs-tab__close`,onClick:this.handleClose,disabled:o}):null))}}),tr=l("tabs",`
 box-sizing: border-box;
 width: 100%;
 display: flex;
 flex-direction: column;
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
`,[g("segment-type",[l("tabs-rail",[B("&.transition-disabled",[l("tabs-capsule",`
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
 `),B("&:hover",`
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
 `),A("prefix","padding-right: 16px;"),A("suffix","padding-left: 16px;")]),g("top, bottom",[l("tabs-nav-scroll-wrapper",[B("&::before",`
 top: 0;
 bottom: 0;
 left: 0;
 width: 20px;
 `),B("&::after",`
 top: 0;
 bottom: 0;
 right: 0;
 width: 20px;
 `),g("shadow-start",[B("&::before",`
 box-shadow: inset 10px 0 8px -8px rgba(0, 0, 0, .12);
 `)]),g("shadow-end",[B("&::after",`
 box-shadow: inset -10px 0 8px -8px rgba(0, 0, 0, .12);
 `)])])]),g("left, right",[l("tabs-nav-scroll-content",`
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
 `),g("shadow-start",[B("&::before",`
 box-shadow: inset 0 10px 8px -8px rgba(0, 0, 0, .12);
 `)]),g("shadow-end",[B("&::after",`
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
 `,[B("&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb",`
 width: 0;
 height: 0;
 display: none;
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
 `,[B("&.transition-disabled",`
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
 `),g("line-type, bar-type",[l("tabs-tab",`
 font-weight: var(--n-tab-font-weight);
 box-sizing: border-box;
 vertical-align: bottom;
 `,[B("&:hover",{color:"var(--n-tab-text-color-hover)"}),g("active",`
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
 `),Pe("disabled",[B("&:hover",`
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
 `)])])])]),ar=Object.assign(Object.assign({},xe.props),{value:[String,Number],defaultValue:[String,Number],trigger:{type:String,default:"click"},type:{type:String,default:"bar"},closable:Boolean,justifyContent:String,size:{type:String,default:"medium"},placement:{type:String,default:"top"},tabStyle:[String,Object],tabClass:String,addTabStyle:[String,Object],addTabClass:String,barWidth:Number,paneClass:String,paneStyle:[String,Object],paneWrapperClass:String,paneWrapperStyle:[String,Object],addable:[Boolean,Object],tabsPadding:{type:Number,default:0},animated:Boolean,onBeforeLeave:Function,onAdd:Function,"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],onClose:[Function,Array],labelSize:String,activeName:[String,Number],onActiveNameChange:[Function,Array]}),rr=G({name:"Tabs",props:ar,setup(e,{slots:t}){var a,o,i,f;const{mergedClsPrefixRef:b,inlineThemeDisabled:s}=Be(e),m=xe("Tabs","-tabs",tr,Ka,e,b),v=_(null),x=_(null),k=_(null),$=_(null),R=_(null),S=_(null),C=_(!0),d=_(!0),c=Fe(e,["labelSize","size"]),P=Fe(e,["activeName","value"]),E=_((o=(a=P.value)!==null&&a!==void 0?a:e.defaultValue)!==null&&o!==void 0?o:t.default?(f=(i=Te(t.default())[0])===null||i===void 0?void 0:i.props)===null||f===void 0?void 0:f.name:null),z=na(P,E),w={id:0},u=H(()=>{if(!(!e.justifyContent||e.type==="card"))return{display:"flex",justifyContent:e.justifyContent}});re(z,()=>{w.id=0,se(),Ee()});function y(){var r;const{value:n}=z;return n===null?null:(r=v.value)===null||r===void 0?void 0:r.querySelector(`[data-name="${n}"]`)}function j(r){if(e.type==="card")return;const{value:n}=x;if(!n)return;const p=n.style.opacity==="0";if(r){const T=`${b.value}-tabs-bar--disabled`,{barWidth:L,placement:I}=e;if(r.dataset.disabled==="true"?n.classList.add(T):n.classList.remove(T),["top","bottom"].includes(I)){if(Q(["top","maxHeight","height"]),typeof L=="number"&&r.offsetWidth>=L){const V=Math.floor((r.offsetWidth-L)/2)+r.offsetLeft;n.style.left=`${V}px`,n.style.maxWidth=`${L}px`}else n.style.left=`${r.offsetLeft}px`,n.style.maxWidth=`${r.offsetWidth}px`;n.style.width="8192px",p&&(n.style.transition="none"),n.offsetWidth,p&&(n.style.transition="",n.style.opacity="1")}else{if(Q(["left","maxWidth","width"]),typeof L=="number"&&r.offsetHeight>=L){const V=Math.floor((r.offsetHeight-L)/2)+r.offsetTop;n.style.top=`${V}px`,n.style.maxHeight=`${L}px`}else n.style.top=`${r.offsetTop}px`,n.style.maxHeight=`${r.offsetHeight}px`;n.style.height="8192px",p&&(n.style.transition="none"),n.offsetHeight,p&&(n.style.transition="",n.style.opacity="1")}}}function D(){if(e.type==="card")return;const{value:r}=x;r&&(r.style.opacity="0")}function Q(r){const{value:n}=x;if(n)for(const p of r)n.style[p]=""}function se(){if(e.type==="card")return;const r=y();r?j(r):D()}function Ee(){var r;const n=(r=R.value)===null||r===void 0?void 0:r.$el;if(!n)return;const p=y();if(!p)return;const{scrollLeft:T,offsetWidth:L}=n,{offsetLeft:I,offsetWidth:V}=p;T>I?n.scrollTo({top:0,left:I,behavior:"smooth"}):I+V>T+L&&n.scrollTo({top:0,left:I+V-L,behavior:"smooth"})}const de=_(null);let ye=0,Y=null;function dt(r){const n=de.value;if(n){ye=r.getBoundingClientRect().height;const p=`${ye}px`,T=()=>{n.style.height=p,n.style.maxHeight=p};Y?(T(),Y(),Y=null):Y=T}}function ct(r){const n=de.value;if(n){const p=r.getBoundingClientRect().height,T=()=>{document.body.offsetHeight,n.style.maxHeight=`${p}px`,n.style.height=`${Math.max(ye,p)}px`};Y?(Y(),Y=null,T()):Y=T}}function ft(){const r=de.value;if(r){r.style.maxHeight="",r.style.height="";const{paneWrapperStyle:n}=e;if(typeof n=="string")r.style.cssText=n;else if(n){const{maxHeight:p,height:T}=n;p!==void 0&&(r.style.maxHeight=p),T!==void 0&&(r.style.height=T)}}}const We={value:[]},He=_("next");function bt(r){const n=z.value;let p="next";for(const T of We.value){if(T===n)break;if(T===r){p="prev";break}}He.value=p,ut(r)}function ut(r){const{onActiveNameChange:n,onUpdateValue:p,"onUpdate:value":T}=e;n&&be(n,r),p&&be(p,r),T&&be(T,r),E.value=r}function pt(r){const{onClose:n}=e;n&&be(n,r)}function je(){const{value:r}=x;if(!r)return;const n="transition-disabled";r.classList.add(n),se(),r.classList.remove(n)}const Z=_(null);function Ce({transitionDisabled:r}){const n=v.value;if(!n)return;r&&n.classList.add("transition-disabled");const p=y();p&&Z.value&&(Z.value.style.width=`${p.offsetWidth}px`,Z.value.style.height=`${p.offsetHeight}px`,Z.value.style.transform=`translateX(${p.offsetLeft-ba(getComputedStyle(n).paddingLeft)}px)`,r&&Z.value.offsetWidth),r&&n.classList.remove("transition-disabled")}re([z],()=>{e.type==="segment"&&pe(()=>{Ce({transitionDisabled:!1})})}),le(()=>{e.type==="segment"&&Ce({transitionDisabled:!0})});let Oe=0;function vt(r){var n;if(r.contentRect.width===0&&r.contentRect.height===0||Oe===r.contentRect.width)return;Oe=r.contentRect.width;const{type:p}=e;if((p==="line"||p==="bar")&&je(),p!=="segment"){const{placement:T}=e;Se((T==="top"||T==="bottom"?(n=R.value)===null||n===void 0?void 0:n.$el:S.value)||null)}}const gt=ve(vt,64);re([()=>e.justifyContent,()=>e.size],()=>{pe(()=>{const{type:r}=e;(r==="line"||r==="bar")&&je()})});const K=_(!1);function ht(r){var n;const{target:p,contentRect:{width:T,height:L}}=r,I=p.parentElement.parentElement.offsetWidth,V=p.parentElement.parentElement.offsetHeight,{placement:te}=e;if(!K.value)te==="top"||te==="bottom"?I<T&&(K.value=!0):V<L&&(K.value=!0);else{const{value:ne}=$;if(!ne)return;te==="top"||te==="bottom"?I-T>ne.$el.offsetWidth&&(K.value=!1):V-L>ne.$el.offsetHeight&&(K.value=!1)}Se(((n=R.value)===null||n===void 0?void 0:n.$el)||null)}const mt=ve(ht,64);function xt(){const{onAdd:r}=e;r&&r(),pe(()=>{const n=y(),{value:p}=R;!n||!p||p.scrollTo({left:n.offsetLeft,top:0,behavior:"smooth"})})}function Se(r){if(!r)return;const{placement:n}=e;if(n==="top"||n==="bottom"){const{scrollLeft:p,scrollWidth:T,offsetWidth:L}=r;C.value=p<=0,d.value=p+L>=T}else{const{scrollTop:p,scrollHeight:T,offsetHeight:L}=r;C.value=p<=0,d.value=p+L>=T}}const yt=ve(r=>{Se(r.target)},64);tt(Ae,{triggerRef:O(e,"trigger"),tabStyleRef:O(e,"tabStyle"),tabClassRef:O(e,"tabClass"),addTabStyleRef:O(e,"addTabStyle"),addTabClassRef:O(e,"addTabClass"),paneClassRef:O(e,"paneClass"),paneStyleRef:O(e,"paneStyle"),mergedClsPrefixRef:b,typeRef:O(e,"type"),closableRef:O(e,"closable"),valueRef:z,tabChangeIdRef:w,onBeforeLeaveRef:O(e,"onBeforeLeave"),activateTab:bt,handleClose:pt,handleAdd:xt}),at(()=>{se(),Ee()}),Xt(()=>{const{value:r}=k;if(!r)return;const{value:n}=b,p=`${n}-tabs-nav-scroll-wrapper--shadow-start`,T=`${n}-tabs-nav-scroll-wrapper--shadow-end`;C.value?r.classList.remove(p):r.classList.add(p),d.value?r.classList.remove(T):r.classList.add(T)});const Ct={syncBarPosition:()=>{se()}},St=()=>{Ce({transitionDisabled:!0})},Ie=H(()=>{const{value:r}=c,{type:n}=e,p={card:"Card",bar:"Bar",line:"Line",segment:"Segment"}[n],T=`${r}${p}`,{self:{barColor:L,closeIconColor:I,closeIconColorHover:V,closeIconColorPressed:te,tabColor:ne,tabBorderColor:Tt,paneTextColor:wt,tabFontWeight:Rt,tabBorderRadius:kt,tabFontWeightActive:Pt,colorSegment:$t,fontWeightStrong:_t,tabColorSegment:Bt,closeSize:zt,closeIconSize:Lt,closeColorHover:At,closeColorPressed:Et,closeBorderRadius:Wt,[N("panePadding",r)]:ce,[N("tabPadding",T)]:Ht,[N("tabPaddingVertical",T)]:jt,[N("tabGap",T)]:Ot,[N("tabGap",`${T}Vertical`)]:It,[N("tabTextColor",n)]:Vt,[N("tabTextColorActive",n)]:Mt,[N("tabTextColorHover",n)]:Ft,[N("tabTextColorDisabled",n)]:Nt,[N("tabFontSize",r)]:Gt},common:{cubicBezierEaseInOut:Dt}}=m.value;return{"--n-bezier":Dt,"--n-color-segment":$t,"--n-bar-color":L,"--n-tab-font-size":Gt,"--n-tab-text-color":Vt,"--n-tab-text-color-active":Mt,"--n-tab-text-color-disabled":Nt,"--n-tab-text-color-hover":Ft,"--n-pane-text-color":wt,"--n-tab-border-color":Tt,"--n-tab-border-radius":kt,"--n-close-size":zt,"--n-close-icon-size":Lt,"--n-close-color-hover":At,"--n-close-color-pressed":Et,"--n-close-border-radius":Wt,"--n-close-icon-color":I,"--n-close-icon-color-hover":V,"--n-close-icon-color-pressed":te,"--n-tab-color":ne,"--n-tab-font-weight":Rt,"--n-tab-font-weight-active":Pt,"--n-tab-padding":Ht,"--n-tab-padding-vertical":jt,"--n-tab-gap":Ot,"--n-tab-gap-vertical":It,"--n-pane-padding-left":ue(ce,"left"),"--n-pane-padding-right":ue(ce,"right"),"--n-pane-padding-top":ue(ce,"top"),"--n-pane-padding-bottom":ue(ce,"bottom"),"--n-font-weight-strong":_t,"--n-tab-color-segment":Bt}}),ee=s?ot("tabs",H(()=>`${c.value[0]}${e.type[0]}`),Ie,e):void 0;return Object.assign({mergedClsPrefix:b,mergedValue:z,renderedNames:new Set,segmentCapsuleElRef:Z,tabsPaneWrapperRef:de,tabsElRef:v,barElRef:x,addTabInstRef:$,xScrollInstRef:R,scrollWrapperElRef:k,addTabFixed:K,tabWrapperStyle:u,handleNavResize:gt,mergedSize:c,handleScroll:yt,handleTabsResize:mt,cssVars:s?void 0:Ie,themeClass:ee==null?void 0:ee.themeClass,animationDirection:He,renderNameListRef:We,yScrollElRef:S,handleSegmentResize:St,onAnimationBeforeLeave:dt,onAnimationEnter:ct,onAnimationAfterEnter:ft,onRender:ee==null?void 0:ee.onRender},Ct)},render(){const{mergedClsPrefix:e,type:t,placement:a,addTabFixed:o,addable:i,mergedSize:f,renderNameListRef:b,onRender:s,paneWrapperClass:m,paneWrapperStyle:v,$slots:{default:x,prefix:k,suffix:$}}=this;s==null||s();const R=x?Te(x()).filter(w=>w.type.__TAB_PANE__===!0):[],S=x?Te(x()).filter(w=>w.type.__TAB__===!0):[],C=!S.length,d=t==="card",c=t==="segment",P=!d&&!c&&this.justifyContent;b.value=[];const E=()=>{const w=h("div",{style:this.tabWrapperStyle,class:`${e}-tabs-wrapper`},P?null:h("div",{class:`${e}-tabs-scroll-padding`,style:a==="top"||a==="bottom"?{width:`${this.tabsPadding}px`}:{height:`${this.tabsPadding}px`}}),C?R.map((u,y)=>(b.value.push(u.props.name),ke(h($e,Object.assign({},u.props,{internalCreatedByPane:!0,internalLeftPadded:y!==0&&(!P||P==="center"||P==="start"||P==="end")}),u.children?{default:u.children.tab}:void 0)))):S.map((u,y)=>(b.value.push(u.props.name),ke(y!==0&&!P?Ze(u):u))),!o&&i&&d?Qe(i,(C?R.length:S.length)!==0):null,P?null:h("div",{class:`${e}-tabs-scroll-padding`,style:{width:`${this.tabsPadding}px`}}));return h("div",{ref:"tabsElRef",class:`${e}-tabs-nav-scroll-content`},d&&i?h(we,{onResize:this.handleTabsResize},{default:()=>w}):w,d?h("div",{class:`${e}-tabs-pad`}):null,d?null:h("div",{ref:"barElRef",class:`${e}-tabs-bar`}))},z=c?"top":a;return h("div",{class:[`${e}-tabs`,this.themeClass,`${e}-tabs--${t}-type`,`${e}-tabs--${f}-size`,P&&`${e}-tabs--flex`,`${e}-tabs--${z}`],style:this.cssVars},h("div",{class:[`${e}-tabs-nav--${t}-type`,`${e}-tabs-nav--${z}`,`${e}-tabs-nav`]},Ge(k,w=>w&&h("div",{class:`${e}-tabs-nav__prefix`},w)),c?h(we,{onResize:this.handleSegmentResize},{default:()=>h("div",{class:`${e}-tabs-rail`,ref:"tabsElRef"},h("div",{class:`${e}-tabs-capsule`,ref:"segmentCapsuleElRef"},h("div",{class:`${e}-tabs-wrapper`},h("div",{class:`${e}-tabs-tab`}))),C?R.map((w,u)=>(b.value.push(w.props.name),h($e,Object.assign({},w.props,{internalCreatedByPane:!0,internalLeftPadded:u!==0}),w.children?{default:w.children.tab}:void 0))):S.map((w,u)=>(b.value.push(w.props.name),u===0?w:Ze(w))))}):h(we,{onResize:this.handleNavResize},{default:()=>h("div",{class:`${e}-tabs-nav-scroll-wrapper`,ref:"scrollWrapperElRef"},["top","bottom"].includes(z)?h(Sa,{ref:"xScrollInstRef",onScroll:this.handleScroll},{default:E}):h("div",{class:`${e}-tabs-nav-y-scroll`,onScroll:this.handleScroll,ref:"yScrollElRef"},E()))}),o&&i&&d?Qe(i,!0):null,Ge($,w=>w&&h("div",{class:`${e}-tabs-nav__suffix`},w))),C&&(this.animated&&(z==="top"||z==="bottom")?h("div",{ref:"tabsPaneWrapperRef",style:v,class:[`${e}-tabs-pane-wrapper`,m]},Je(R,this.mergedValue,this.renderedNames,this.onAnimationBeforeLeave,this.onAnimationEnter,this.onAnimationAfterEnter,this.animationDirection)):Je(R,this.mergedValue,this.renderedNames)))}});function Je(e,t,a,o,i,f,b){const s=[];return e.forEach(m=>{const{name:v,displayDirective:x,"display-directive":k}=m.props,$=S=>x===S||k===S,R=t===v;if(m.key!==void 0&&(m.key=v),R||$("show")||$("show:lazy")&&a.has(v)){a.has(v)||a.add(v);const S=!$("if");s.push(S?Yt(m,[[qt,R]]):m)}}),b?h(Jt,{name:`${b}-transition`,onBeforeLeave:o,onEnter:i,onAfterEnter:f},{default:()=>s}):s}function Qe(e,t){return h($e,{ref:"addTabInstRef",key:"__addable",name:"__addable",internalCreatedByPane:!0,internalAddable:!0,internalLeftPadded:t,disabled:typeof e=="object"&&e.disabled})}function Ze(e){const t=Qt(e);return t.props?t.props.internalLeftPadded=!0:t.props={internalLeftPadded:!0},t}function ke(e){return Array.isArray(e.dynamicProps)?e.dynamicProps.includes("internalLeftPadded")||e.dynamicProps.push("internalLeftPadded"):e.dynamicProps=["internalLeftPadded"],e}const nr={name:"Timeline"},or={class:"timeline"};function ir(e,t,a,o,i,f){return W(),M("div",or,[Zt(e.$slots,"default",{},void 0,!0)])}const Ke=_e(nr,[["render",ir],["__scopeId","data-v-dcc29abb"]]),lr={name:"TimelineItem",props:{content:{type:String,required:!0},time:{type:String,required:!0}},methods:{handleClick(){this.$emit("click")}}},sr={class:"timeline-item-content"};function dr(e,t,a,o,i,f){return W(),M("div",{class:"timeline-item",onClick:t[0]||(t[0]=(...b)=>f.handleClick&&f.handleClick(...b))},[F("div",sr,[F("time",null,oe(a.time),1),F("div",null,oe(a.content),1)]),t[1]||(t[1]=F("span",{class:"circle"},null,-1))])}const et=_e(lr,[["render",dr],["__scopeId","data-v-b359483c"]]),cr={class:"container"},fr={class:"xz"},br=["id"],ur={class:"anchor"},pr=["id"],vr={class:"anchor"},gr=G({__name:"ArchiveView",setup(e){const t=_(0),a=_({}),o=_({}),i=Kt(),f=async()=>{try{const s=await Ne.get("/markdown/metadata/posts_by_year.json");a.value=s.data;const m=await Ne.get("/markdown/metadata/posts_by_tag.json");o.value=m.data,t.value=Object.values(a.value).flat().length}catch(s){console.error("Error loading archives data:",s)}},b=H(()=>Object.keys(a.value).sort((s,m)=>Number(m)-Number(s)).map(s=>({year:s,posts:a.value[s]})));return le(()=>{f()}),(s,m)=>(W(),M("main",null,[U(va),F("div",cr,[m[0]||(m[0]=F("h1",null,"文章归档📚",-1)),F("span",fr,"共发布 "+oe(t.value)+" 篇文章 📕",1),U(X(rr),{type:"segment",animated:""},{default:q(()=>[U(X(qe),{name:"by-year",tab:"按照时间"},{default:q(()=>[(W(!0),M(J,null,ae(b.value,v=>(W(),M("div",{key:v.year},[F("h2",{id:v.year},oe(v.year),9,br),U(Ke,null,{default:q(()=>[(W(!0),M(J,null,ae(v.posts,x=>(W(),fe(et,{key:x.file,content:x.title,time:x.date,onClick:k=>X(i).push(`/post/${x.file}`)},null,8,["content","time","onClick"]))),128))]),_:2},1024)]))),128)),F("div",ur,[U(X(Ye),{affix:"","trigger-top":24,top:88,style:{"z-index":"1"},"ignore-gap":""},{default:q(()=>[(W(!0),M(J,null,ae(b.value,v=>(W(),fe(X(Xe),{key:v.year,title:v.year,href:`#${v.year}`},null,8,["title","href"]))),128))]),_:1})])]),_:1}),U(X(qe),{name:"by-tag",tab:"按照类别"},{default:q(()=>[(W(!0),M(J,null,ae(o.value,(v,x)=>(W(),M("div",{key:x},[F("h2",{id:x},oe(x),9,pr),U(Ke,null,{default:q(()=>[(W(!0),M(J,null,ae(v,k=>(W(),fe(et,{key:k.file,content:k.title,time:k.date,onClick:$=>X(i).push(`/post/${k.file}`)},null,8,["content","time","onClick"]))),128))]),_:2},1024)]))),128)),F("div",vr,[U(X(Ye),{affix:"","trigger-top":24,top:88,style:{"z-index":"1"},"ignore-gap":""},{default:q(()=>[(W(!0),M(J,null,ae(o.value,(v,x)=>(W(),fe(X(Xe),{key:x,title:x,href:`#${x}`},null,8,["title","href"]))),128))]),_:1})])]),_:1})]),_:1})]),U(ua)]))}}),Sr=_e(gr,[["__scopeId","data-v-9f1b6bbe"]]);export{Sr as default};
