import{i as ne,w as te,f as ge,o as re,d as N,r as _,h,c as j,t as I,p as Ke,n as be,m as Ut,F as J,g as Xt,k as Yt,v as qt,E as Jt,G as Qt,_ as Pe,q as E,s as V,e as Zt,u as M,z as ae,H as Kt,x as D,y as q,A as U,D as ee,I as de}from"./app-yZaKnS01.js";import{c as ea,a as Ie,b as ta,u as aa,i as et,S as na,k as Oe,f as Ve,j as Ce,d as ra,h as Me}from"./Scrollbar-B0RebpqV.js";import{u as oa,E as ia,G as ve,H as la,f as l,q as g,j as $e,h as sa,i as tt,y as da,s as Re,b as B,g as W,c as at,k as he,n as nt,I as ca,N as fa,v as Fe,V as Se,B as ce,d as ba,m as F,x as fe,F as ua}from"./Nav-BFYhNHJJ.js";import{a as pa,P as va}from"./PageHead-DebSeF3v.js";import{u as rt,k as ot,g as ga,r as ha,o as ma}from"./attribute-zrLHOb1Z.js";function xa(e,t,a){const o=ne(e,null);o!==null&&(t in o||(o[t]=[]),o[t].push(a.value),te(a,(i,f)=>{const b=o[t],s=b.findIndex(m=>m===f);~s&&b.splice(s,1),b.push(i)}),ge(()=>{const i=o[t],f=i.findIndex(b=>b===a.value);~f&&i.splice(f,1)}))}function ya(e,t,a){const o=ne(e,null);o!==null&&(t in o||(o[t]=[]),re(()=>{const i=a();i&&o[t].push(i)}),ge(()=>{const i=o[t],f=a(),b=i.findIndex(s=>s===f);~b&&i.splice(b,1)}))}const Ca=Ie(".v-x-scroll",{overflow:"auto",scrollbarWidth:"none"},[Ie("&::-webkit-scrollbar",{width:0,height:0})]),Sa=N({name:"XScroll",props:{disabled:Boolean,onScroll:Function},setup(){const e=_(null);function t(i){!(i.currentTarget.offsetWidth<i.currentTarget.scrollWidth)||i.deltaY===0||(i.currentTarget.scrollLeft+=i.deltaY+i.deltaX,i.preventDefault())}const a=oa();return Ca.mount({id:"vueuc/x-scroll",head:!0,anchorMetaName:ea,ssr:a}),Object.assign({selfRef:e,handleWheel:t},{scrollTo(...i){var f;(f=e.value)===null||f===void 0||f.scrollTo(...i)}})},render(){return h("div",{ref:"selfRef",onScroll:this.onScroll,onWheel:this.disabled?void 0:this.handleWheel,class:"v-x-scroll"},this.$slots)}});var Ta=/\s/;function wa(e){for(var t=e.length;t--&&Ta.test(e.charAt(t)););return t}var Ra=/^\s+/;function ka(e){return e&&e.slice(0,wa(e)+1).replace(Ra,"")}var Ne=NaN,Pa=/^[-+]0x[0-9a-f]+$/i,$a=/^0b[01]+$/i,_a=/^0o[0-7]+$/i,Ba=parseInt;function Ge(e){if(typeof e=="number")return e;if(ia(e))return Ne;if(ve(e)){var t=typeof e.valueOf=="function"?e.valueOf():e;e=ve(t)?t+"":t}if(typeof e!="string")return e===0?e:+e;e=ka(e);var a=$a.test(e);return a||_a.test(e)?Ba(e.slice(2),a?2:8):Pa.test(e)?Ne:+e}var Te=function(){return la.Date.now()},za="Expected a function",La=Math.max,Aa=Math.min;function Ea(e,t,a){var o,i,f,b,s,m,p=0,x=!1,k=!1,$=!0;if(typeof e!="function")throw new TypeError(za);t=Ge(t)||0,ve(a)&&(x=!!a.leading,k="maxWait"in a,f=k?La(Ge(a.maxWait)||0,t):f,$="trailing"in a?!!a.trailing:$);function R(u){var y=o,H=i;return o=i=void 0,p=u,b=e.apply(H,y),b}function S(u){return p=u,s=setTimeout(c,t),x?R(u):b}function C(u){var y=u-m,H=u-p,G=t-y;return k?Aa(G,f-H):G}function d(u){var y=u-m,H=u-p;return m===void 0||y>=t||y<0||k&&H>=f}function c(){var u=Te();if(d(u))return P(u);s=setTimeout(c,C(u))}function P(u){return s=void 0,$&&o?R(u):(o=i=void 0,b)}function A(){s!==void 0&&clearTimeout(s),p=0,o=m=i=s=void 0}function z(){return s===void 0?b:P(Te())}function w(){var u=Te(),y=d(u);if(o=arguments,i=this,m=u,y){if(s===void 0)return S(m);if(k)return clearTimeout(s),s=setTimeout(c,t),R(m)}return s===void 0&&(s=setTimeout(c,t)),b}return w.cancel=A,w.flush=z,w}var Wa="Expected a function";function ue(e,t,a){var o=!0,i=!0;if(typeof e!="function")throw new TypeError(Wa);return ve(a)&&(o="leading"in a?!!a.leading:o,i="trailing"in a?!!a.trailing:i),Ea(e,t,{leading:o,maxWait:t,trailing:i})}function ja(e){return e instanceof HTMLElement?e.scrollTop:window.scrollY}function Ha(e){return e instanceof HTMLElement?e.getBoundingClientRect():{top:0,bottom:window.innerHeight}}const Ia=l("affix",[g("affixed",{position:"fixed"},[g("absolute-positioned",{position:"absolute"})])]),_e={listenTo:[String,Object,Function],top:Number,bottom:Number,triggerTop:Number,triggerBottom:Number,position:{type:String,default:"fixed"},offsetTop:{type:Number,validator:()=>!0,default:void 0},offsetBottom:{type:Number,validator:()=>!0,default:void 0},target:{type:Function,validator:()=>!0,default:void 0}},Oa=ot(_e),Va=N({name:"Affix",props:_e,setup(e){const{mergedClsPrefixRef:t}=$e(e);sa("-affix",Ia,t);let a=null;const o=_(!1),i=_(!1),f=_(null),b=_(null),s=j(()=>i.value||o.value),m=j(()=>{var d,c;return(c=(d=e.triggerTop)!==null&&d!==void 0?d:e.offsetTop)!==null&&c!==void 0?c:e.top}),p=j(()=>{var d,c;return(c=(d=e.top)!==null&&d!==void 0?d:e.triggerTop)!==null&&c!==void 0?c:e.offsetTop}),x=j(()=>{var d,c;return(c=(d=e.bottom)!==null&&d!==void 0?d:e.triggerBottom)!==null&&c!==void 0?c:e.offsetBottom}),k=j(()=>{var d,c;return(c=(d=e.triggerBottom)!==null&&d!==void 0?d:e.offsetBottom)!==null&&c!==void 0?c:e.bottom}),$=_(null),R=()=>{const{target:d,listenTo:c}=e;d?a=d():c?a=rt(c):a=document,a&&(a.addEventListener("scroll",S),S())};function S(){ta(C)}function C(){const{value:d}=$;if(!a||!d)return;const c=ja(a);if(s.value){b.value!==null&&c<b.value&&(o.value=!1,b.value=null),f.value!==null&&c>f.value&&(i.value=!1,f.value=null);return}const P=Ha(a),A=d.getBoundingClientRect(),z=A.top-P.top,w=P.bottom-A.bottom,u=m.value,y=k.value;u!==void 0&&z<=u?(o.value=!0,b.value=c-(u-z)):(o.value=!1,b.value=null),y!==void 0&&w<=y?(i.value=!0,f.value=c+y-w):(i.value=!1,f.value=null)}return re(()=>{R()}),ge(()=>{a&&a.removeEventListener("scroll",S)}),{selfRef:$,affixed:s,mergedClsPrefix:t,mergedstyle:j(()=>{const d={};return o.value&&m.value!==void 0&&p.value!==void 0&&(d.top=`${p.value}px`),i.value&&k.value!==void 0&&x.value!==void 0&&(d.bottom=`${x.value}px`),d})}},render(){const{mergedClsPrefix:e}=this;return h("div",{ref:"selfRef",class:[`${e}-affix`,{[`${e}-affix--affixed`]:this.affixed,[`${e}-affix--absolute-positioned`]:this.position==="absolute"}],style:this.mergedstyle},this.$slots)}}),Ma=N({name:"Add",render(){return h("svg",{width:"512",height:"512",viewBox:"0 0 512 512",fill:"none",xmlns:"http://www.w3.org/2000/svg"},h("path",{d:"M256 112V400M400 256H112",stroke:"currentColor","stroke-width":"32","stroke-linecap":"round","stroke-linejoin":"round"}))}}),Fa={linkFontSize:"13px",linkPadding:"0 0 0 16px",railWidth:"4px"};function Na(e){const{borderRadius:t,railColor:a,primaryColor:o,primaryColorHover:i,primaryColorPressed:f,textColor2:b}=e;return Object.assign(Object.assign({},Fa),{borderRadius:t,railColor:a,railColorActive:o,linkColor:da(o,{alpha:.15}),linkTextColor:b,linkTextColorHover:i,linkTextColorPressed:f,linkTextColorActive:o})}const Ga={name:"Anchor",common:tt,self:Na},Da=l("anchor",`
 position: relative;
`,[Re("block",`
 padding-left: var(--n-rail-width);
 `,[l("anchor-link",[B("+, >",[l("anchor-link",`
 margin-top: .5em;
 `)])]),l("anchor-link-background",`
 max-width: 0;
 border-top-right-radius: 10.5px;
 border-bottom-right-radius: 10.5px;
 `),Re("show-rail",[B(">",[l("anchor-link","padding-left: 0;")])])]),g("block",[l("anchor-link",`
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
 `,[W("bar",`
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
 `,[g("active",[B(">",[W("title",`
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
 `)])])]),pe=at("n-anchor"),Ua={title:String,href:String},De=N({name:"AnchorLink",props:Ua,setup(e,{slots:t}){const a=_(null),o=ne(pe),i=I(e,"href"),f=aa(()=>i.value&&i.value===o.activeHref.value);xa(pe,"collectedLinkHrefs",i),ya(pe,"titleEls",()=>a.value),te(f,s=>{s&&a.value&&o.updateBarPosition(a.value)});function b(){e.href!==void 0&&o.setActiveHref(e.href)}return()=>{var s;const{value:m}=o.mergedClsPrefix;return h("div",{class:[`${m}-anchor-link`,f.value&&`${m}-anchor-link--active`]},h("a",{ref:a,class:[`${m}-anchor-link__title`],href:e.href,title:ga(e.title),onClick:b},e.title),(s=t.default)===null||s===void 0?void 0:s.call(t))}}});function Xa(e,t){const{top:a,height:o}=e.getBoundingClientRect(),i=t instanceof HTMLElement?t.getBoundingClientRect().top:0;return{top:a-i,height:o}}const Be={type:{type:String,default:"rail"},showRail:{type:Boolean,default:!0},showBackground:{type:Boolean,default:!0},bound:{type:Number,default:12},internalScrollable:Boolean,ignoreGap:Boolean,offsetTarget:[String,Object,Function]},Ya=ot(Be),qa=N({name:"BaseAnchor",props:Object.assign(Object.assign({},Be),{mergedClsPrefix:{type:String,required:!0}}),setup(e){const t=[],a=[],o=_(null),i=_(null),f=_(null),b=_(null),s=j(()=>e.type==="block"),m=j(()=>!s.value&&e.showRail);function p(){const{value:S}=f,{value:C}=i;S&&(S.style.transition="none"),C&&(C.style.transition="none"),a&&a.forEach(d=>{d.style.transition="none"}),be(()=>{const{value:d}=f,{value:c}=i;d&&(d.offsetWidth,d.style.transition=""),c&&(c.offsetWidth,c.style.transition=""),a&&a.forEach(P=>{P.offsetWidth,P.style.transition=""})})}function x(S,C=!0){const{value:d}=f,{value:c}=i,{value:P}=b;if(!P||!d)return;C||(d.style.transition="none",c&&(c.style.transition="none"));const{offsetHeight:A,offsetWidth:z}=S,{top:w,left:u}=S.getBoundingClientRect(),{top:y,left:H}=P.getBoundingClientRect(),G=w-y,Q=u-H;d.style.top=`${G}px`,d.style.height=`${A}px`,c&&(c.style.top=`${G}px`,c.style.height=`${A}px`,c.style.maxWidth=`${z+Q}px`),d.offsetHeight,c&&c.offsetHeight,C||(d.style.transition="",c&&(c.style.transition=""))}const k=ue(()=>{R(!0)},128);function $(S,C=!0){const d=/^#([^#]+)$/.exec(S);if(!d)return;const c=document.getElementById(d[1]);c&&(o.value=S,c.scrollIntoView(),C||p(),k())}function R(S=!0){var C;const d=[],c=rt((C=e.offsetTarget)!==null&&C!==void 0?C:document);t.forEach(u=>{const y=/#([^#]+)$/.exec(u);if(!y)return;const H=document.getElementById(y[1]);if(H&&c){const{top:G,height:Q}=Xa(H,c);d.push({top:G,height:Q,href:u})}}),d.sort((u,y)=>u.top>y.top?1:(u.top===y.top&&u.height<y.height,-1));const P=o.value,{bound:A,ignoreGap:z}=e,w=d.reduce((u,y)=>y.top+y.height<0?z?y:u:y.top<=A?u===null?y:y.top===u.top?y.href===P?y:u:y.top>u.top?y:u:u,null);S||p(),w?o.value=w.href:o.value=null}return Ke(pe,{activeHref:o,mergedClsPrefix:I(e,"mergedClsPrefix"),updateBarPosition:x,setActiveHref:$,collectedLinkHrefs:t,titleEls:a}),re(()=>{document.addEventListener("scroll",k,!0),$(window.location.hash),R(!1)}),et(()=>{$(window.location.hash),R(!1)}),ge(()=>{document.removeEventListener("scroll",k,!0)}),te(o,S=>{if(S===null){const{value:C}=i;C&&!s.value&&(C.style.maxWidth="0")}}),{selfRef:b,barRef:f,slotRef:i,setActiveHref:$,activeHref:o,isBlockType:s,mergedShowRail:m}},render(){var e;const{mergedClsPrefix:t,mergedShowRail:a,isBlockType:o,$slots:i}=this,f=h("div",{class:[`${t}-anchor`,o&&`${t}-anchor--block`,a&&`${t}-anchor--show-rail`],ref:"selfRef"},a&&this.showBackground?h("div",{ref:"slotRef",class:`${t}-anchor-link-background`}):null,a?h("div",{class:`${t}-anchor-rail`},h("div",{ref:"barRef",class:[`${t}-anchor-rail__bar`,this.activeHref!==null&&`${t}-anchor-rail__bar--active`]})):null,(e=i.default)===null||e===void 0?void 0:e.call(i));return this.internalScrollable?h(na,null,{default:()=>f}):f}}),Ja=Object.assign(Object.assign(Object.assign(Object.assign({},he.props),{affix:Boolean}),_e),Be),Ue=N({name:"Anchor",props:Ja,setup(e,{slots:t}){const{mergedClsPrefixRef:a,inlineThemeDisabled:o}=$e(e),i=he("Anchor","-anchor",Da,Ga,e,a),f=_(null),b=j(()=>{const{self:{railColor:m,linkColor:p,railColorActive:x,linkTextColor:k,linkTextColorHover:$,linkTextColorPressed:R,linkTextColorActive:S,linkFontSize:C,railWidth:d,linkPadding:c,borderRadius:P},common:{cubicBezierEaseInOut:A}}=i.value;return{"--n-link-border-radius":P,"--n-link-color":p,"--n-link-font-size":C,"--n-link-text-color":k,"--n-link-text-color-hover":$,"--n-link-text-color-active":S,"--n-link-text-color-pressed":R,"--n-link-padding":c,"--n-bezier":A,"--n-rail-color":m,"--n-rail-color-active":x,"--n-rail-width":d}}),s=o?nt("anchor",void 0,b,e):void 0;return{scrollTo(m){var p;(p=f.value)===null||p===void 0||p.setActiveHref(m)},renderAnchor:()=>(s==null||s.onRender(),h(qa,Object.assign({ref:f,style:o?void 0:b.value,class:s==null?void 0:s.themeClass.value},Oe(e,Ya),{mergedClsPrefix:a.value}),t))}},render(){return this.affix?h(Va,Object.assign({},Oe(this,Oa)),{default:this.renderAnchor}):this.renderAnchor()}}),Qa={tabFontSizeSmall:"14px",tabFontSizeMedium:"14px",tabFontSizeLarge:"16px",tabGapSmallLine:"36px",tabGapMediumLine:"36px",tabGapLargeLine:"36px",tabGapSmallLineVertical:"8px",tabGapMediumLineVertical:"8px",tabGapLargeLineVertical:"8px",tabPaddingSmallLine:"6px 0",tabPaddingMediumLine:"10px 0",tabPaddingLargeLine:"14px 0",tabPaddingVerticalSmallLine:"6px 12px",tabPaddingVerticalMediumLine:"8px 16px",tabPaddingVerticalLargeLine:"10px 20px",tabGapSmallBar:"36px",tabGapMediumBar:"36px",tabGapLargeBar:"36px",tabGapSmallBarVertical:"8px",tabGapMediumBarVertical:"8px",tabGapLargeBarVertical:"8px",tabPaddingSmallBar:"4px 0",tabPaddingMediumBar:"6px 0",tabPaddingLargeBar:"10px 0",tabPaddingVerticalSmallBar:"6px 12px",tabPaddingVerticalMediumBar:"8px 16px",tabPaddingVerticalLargeBar:"10px 20px",tabGapSmallCard:"4px",tabGapMediumCard:"4px",tabGapLargeCard:"4px",tabGapSmallCardVertical:"4px",tabGapMediumCardVertical:"4px",tabGapLargeCardVertical:"4px",tabPaddingSmallCard:"8px 16px",tabPaddingMediumCard:"10px 20px",tabPaddingLargeCard:"12px 24px",tabPaddingSmallSegment:"4px 0",tabPaddingMediumSegment:"6px 0",tabPaddingLargeSegment:"8px 0",tabPaddingVerticalLargeSegment:"0 8px",tabPaddingVerticalSmallCard:"8px 12px",tabPaddingVerticalMediumCard:"10px 16px",tabPaddingVerticalLargeCard:"12px 20px",tabPaddingVerticalSmallSegment:"0 4px",tabPaddingVerticalMediumSegment:"0 6px",tabGapSmallSegment:"0",tabGapMediumSegment:"0",tabGapLargeSegment:"0",tabGapSmallSegmentVertical:"0",tabGapMediumSegmentVertical:"0",tabGapLargeSegmentVertical:"0",panePaddingSmall:"8px 0 0 0",panePaddingMedium:"12px 0 0 0",panePaddingLarge:"16px 0 0 0",closeSize:"18px",closeIconSize:"14px"};function Za(e){const{textColor2:t,primaryColor:a,textColorDisabled:o,closeIconColor:i,closeIconColorHover:f,closeIconColorPressed:b,closeColorHover:s,closeColorPressed:m,tabColor:p,baseColor:x,dividerColor:k,fontWeight:$,textColor1:R,borderRadius:S,fontSize:C,fontWeightStrong:d}=e;return Object.assign(Object.assign({},Qa),{colorSegment:p,tabFontSizeCard:C,tabTextColorLine:R,tabTextColorActiveLine:a,tabTextColorHoverLine:a,tabTextColorDisabledLine:o,tabTextColorSegment:R,tabTextColorActiveSegment:t,tabTextColorHoverSegment:t,tabTextColorDisabledSegment:o,tabTextColorBar:R,tabTextColorActiveBar:a,tabTextColorHoverBar:a,tabTextColorDisabledBar:o,tabTextColorCard:R,tabTextColorHoverCard:R,tabTextColorActiveCard:a,tabTextColorDisabledCard:o,barColor:a,closeIconColor:i,closeIconColorHover:f,closeIconColorPressed:b,closeColorHover:s,closeColorPressed:m,closeBorderRadius:S,tabColor:p,tabColorSegment:x,tabBorderColor:k,tabFontWeightActive:$,tabFontWeight:$,tabBorderRadius:S,paneTextColor:t,fontWeightStrong:d})}const Ka={name:"Tabs",common:tt,self:Za},ze=at("n-tabs"),it={tab:[String,Number,Object,Function],name:{type:[String,Number],required:!0},disabled:Boolean,displayDirective:{type:String,default:"if"},closable:{type:Boolean,default:void 0},tabProps:Object,label:[String,Number,Object,Function]},Xe=N({__TAB_PANE__:!0,name:"TabPane",alias:["TabPanel"],props:it,setup(e){const t=ne(ze,null);return t||ca("tab-pane","`n-tab-pane` must be placed inside `n-tabs`."),{style:t.paneStyleRef,class:t.paneClassRef,mergedClsPrefix:t.mergedClsPrefixRef}},render(){return h("div",{class:[`${this.mergedClsPrefix}-tab-pane`,this.class],style:this.style},this.$slots)}}),en=Object.assign({internalLeftPadded:Boolean,internalAddable:Boolean,internalCreatedByPane:Boolean},ma(it,["displayDirective"])),ke=N({__TAB__:!0,inheritAttrs:!1,name:"Tab",props:en,setup(e){const{mergedClsPrefixRef:t,valueRef:a,typeRef:o,closableRef:i,tabStyleRef:f,addTabStyleRef:b,tabClassRef:s,addTabClassRef:m,tabChangeIdRef:p,onBeforeLeaveRef:x,triggerRef:k,handleAdd:$,activateTab:R,handleClose:S}=ne(ze);return{trigger:k,mergedClosable:j(()=>{if(e.internalAddable)return!1;const{closable:C}=e;return C===void 0?i.value:C}),style:f,addStyle:b,tabClass:s,addTabClass:m,clsPrefix:t,value:a,type:o,handleClose(C){C.stopPropagation(),!e.disabled&&S(e.name)},activateTab(){if(e.disabled)return;if(e.internalAddable){$();return}const{name:C}=e,d=++p.id;if(C!==a.value){const{value:c}=x;c?Promise.resolve(c(e.name,a.value)).then(P=>{P&&p.id===d&&R(C)}):R(C)}}}},render(){const{internalAddable:e,clsPrefix:t,name:a,disabled:o,label:i,tab:f,value:b,mergedClosable:s,trigger:m,$slots:{default:p}}=this,x=i??f;return h("div",{class:`${t}-tabs-tab-wrapper`},this.internalLeftPadded?h("div",{class:`${t}-tabs-tab-pad`}):null,h("div",Object.assign({key:a,"data-name":a,"data-disabled":o?!0:void 0},Ut({class:[`${t}-tabs-tab`,b===a&&`${t}-tabs-tab--active`,o&&`${t}-tabs-tab--disabled`,s&&`${t}-tabs-tab--closable`,e&&`${t}-tabs-tab--addable`,e?this.addTabClass:this.tabClass],onClick:m==="click"?this.activateTab:void 0,onMouseenter:m==="hover"?this.activateTab:void 0,style:e?this.addStyle:this.style},this.internalCreatedByPane?this.tabProps||{}:this.$attrs)),h("span",{class:`${t}-tabs-tab__label`},e?h(J,null,h("div",{class:`${t}-tabs-tab__height-placeholder`}," "),h(fa,{clsPrefix:t},{default:()=>h(Ma,null)})):p?p():typeof x=="object"?x:ha(x??a)),s&&this.type==="card"?h(pa,{clsPrefix:t,class:`${t}-tabs-tab__close`,onClick:this.handleClose,disabled:o}):null))}}),tn=l("tabs",`
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
 `,[W("prefix, suffix",`
 display: flex;
 align-items: center;
 `),W("prefix","padding-right: 16px;"),W("suffix","padding-left: 16px;")]),g("top, bottom",[l("tabs-nav-scroll-wrapper",[B("&::before",`
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
 `,[g("disabled",{cursor:"not-allowed"}),W("close",`
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
 `),g("disabled",{color:"var(--n-tab-text-color-disabled)"})])]),l("tabs-nav",[g("line-type",[g("top",[W("prefix, suffix",`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),l("tabs-nav-scroll-content",`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),l("tabs-bar",`
 bottom: -1px;
 `)]),g("left",[W("prefix, suffix",`
 border-right: 1px solid var(--n-tab-border-color);
 `),l("tabs-nav-scroll-content",`
 border-right: 1px solid var(--n-tab-border-color);
 `),l("tabs-bar",`
 right: -1px;
 `)]),g("right",[W("prefix, suffix",`
 border-left: 1px solid var(--n-tab-border-color);
 `),l("tabs-nav-scroll-content",`
 border-left: 1px solid var(--n-tab-border-color);
 `),l("tabs-bar",`
 left: -1px;
 `)]),g("bottom",[W("prefix, suffix",`
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
 `)]),g("card-type",[W("prefix, suffix",`
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
 `,[g("addable",`
 padding-left: 8px;
 padding-right: 8px;
 font-size: 16px;
 `,[W("height-placeholder",`
 width: 0;
 font-size: var(--n-tab-font-size);
 `),Re("disabled",[B("&:hover",`
 color: var(--n-tab-text-color-hover);
 `)])]),g("closable","padding-right: 8px;"),g("active",`
 background-color: #0000;
 font-weight: var(--n-tab-font-weight-active);
 color: var(--n-tab-text-color-active);
 `),g("disabled","color: var(--n-tab-text-color-disabled);")]),l("tabs-scroll-padding","border-bottom: 1px solid var(--n-tab-border-color);")]),g("left, right",[l("tabs-wrapper",`
 flex-direction: column;
 `,[l("tabs-tab-wrapper",`
 flex-direction: column;
 `,[l("tabs-tab-pad",`
 height: var(--n-tab-gap-vertical);
 width: 100%;
 `)])])]),g("top",[g("card-type",[l("tabs-tab",`
 border-top-left-radius: var(--n-tab-border-radius);
 border-top-right-radius: var(--n-tab-border-radius);
 `,[g("active",`
 border-bottom: 1px solid #0000;
 `)]),l("tabs-tab-pad",`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),l("tabs-pad",`
 border-bottom: 1px solid var(--n-tab-border-color);
 `)])]),g("left",[g("card-type",[l("tabs-tab",`
 border-top-left-radius: var(--n-tab-border-radius);
 border-bottom-left-radius: var(--n-tab-border-radius);
 `,[g("active",`
 border-right: 1px solid #0000;
 `)]),l("tabs-tab-pad",`
 border-right: 1px solid var(--n-tab-border-color);
 `),l("tabs-pad",`
 border-right: 1px solid var(--n-tab-border-color);
 `)])]),g("right",[g("card-type",[l("tabs-tab",`
 border-top-right-radius: var(--n-tab-border-radius);
 border-bottom-right-radius: var(--n-tab-border-radius);
 `,[g("active",`
 border-left: 1px solid #0000;
 `)]),l("tabs-tab-pad",`
 border-left: 1px solid var(--n-tab-border-color);
 `),l("tabs-pad",`
 border-left: 1px solid var(--n-tab-border-color);
 `)])]),g("bottom",[g("card-type",[l("tabs-tab",`
 border-bottom-left-radius: var(--n-tab-border-radius);
 border-bottom-right-radius: var(--n-tab-border-radius);
 `,[g("active",`
 border-top: 1px solid #0000;
 `)]),l("tabs-tab-pad",`
 border-top: 1px solid var(--n-tab-border-color);
 `),l("tabs-pad",`
 border-top: 1px solid var(--n-tab-border-color);
 `)])])])]),an=Object.assign(Object.assign({},he.props),{value:[String,Number],defaultValue:[String,Number],trigger:{type:String,default:"click"},type:{type:String,default:"bar"},closable:Boolean,justifyContent:String,size:{type:String,default:"medium"},placement:{type:String,default:"top"},tabStyle:[String,Object],tabClass:String,addTabStyle:[String,Object],addTabClass:String,barWidth:Number,paneClass:String,paneStyle:[String,Object],paneWrapperClass:String,paneWrapperStyle:[String,Object],addable:[Boolean,Object],tabsPadding:{type:Number,default:0},animated:Boolean,onBeforeLeave:Function,onAdd:Function,"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],onClose:[Function,Array],labelSize:String,activeName:[String,Number],onActiveNameChange:[Function,Array]}),nn=N({name:"Tabs",props:an,setup(e,{slots:t}){var a,o,i,f;const{mergedClsPrefixRef:b,inlineThemeDisabled:s}=$e(e),m=he("Tabs","-tabs",tn,Ka,e,b),p=_(null),x=_(null),k=_(null),$=_(null),R=_(null),S=_(null),C=_(!0),d=_(!0),c=Ve(e,["labelSize","size"]),P=Ve(e,["activeName","value"]),A=_((o=(a=P.value)!==null&&a!==void 0?a:e.defaultValue)!==null&&o!==void 0?o:t.default?(f=(i=Ce(t.default())[0])===null||i===void 0?void 0:i.props)===null||f===void 0?void 0:f.name:null),z=ra(P,A),w={id:0},u=j(()=>{if(!(!e.justifyContent||e.type==="card"))return{display:"flex",justifyContent:e.justifyContent}});te(z,()=>{w.id=0,oe(),Le()});function y(){var n;const{value:r}=z;return r===null?null:(n=p.value)===null||n===void 0?void 0:n.querySelector(`[data-name="${r}"]`)}function H(n){if(e.type==="card")return;const{value:r}=x;if(!r)return;const v=r.style.opacity==="0";if(n){const T=`${b.value}-tabs-bar--disabled`,{barWidth:L,placement:O}=e;if(n.dataset.disabled==="true"?r.classList.add(T):r.classList.remove(T),["top","bottom"].includes(O)){if(Q(["top","maxHeight","height"]),typeof L=="number"&&n.offsetWidth>=L){const Y=Math.floor((n.offsetWidth-L)/2)+n.offsetLeft;r.style.left=`${Y}px`,r.style.maxWidth=`${L}px`}else r.style.left=`${n.offsetLeft}px`,r.style.maxWidth=`${n.offsetWidth}px`;r.style.width="8192px",v&&(r.style.transition="none"),r.offsetWidth,v&&(r.style.transition="",r.style.opacity="1")}else{if(Q(["left","maxWidth","width"]),typeof L=="number"&&n.offsetHeight>=L){const Y=Math.floor((n.offsetHeight-L)/2)+n.offsetTop;r.style.top=`${Y}px`,r.style.maxHeight=`${L}px`}else r.style.top=`${n.offsetTop}px`,r.style.maxHeight=`${n.offsetHeight}px`;r.style.height="8192px",v&&(r.style.transition="none"),r.offsetHeight,v&&(r.style.transition="",r.style.opacity="1")}}}function G(){if(e.type==="card")return;const{value:n}=x;n&&(n.style.opacity="0")}function Q(n){const{value:r}=x;if(r)for(const v of n)r.style[v]=""}function oe(){if(e.type==="card")return;const n=y();n?H(n):G()}function Le(){var n;const r=(n=R.value)===null||n===void 0?void 0:n.$el;if(!r)return;const v=y();if(!v)return;const{scrollLeft:T,offsetWidth:L}=r,{offsetLeft:O,offsetWidth:Y}=v;T>O?r.scrollTo({top:0,left:O,behavior:"smooth"}):O+Y>T+L&&r.scrollTo({top:0,left:O+Y-L,behavior:"smooth"})}const ie=_(null);let me=0,X=null;function lt(n){const r=ie.value;if(r){me=n.getBoundingClientRect().height;const v=`${me}px`,T=()=>{r.style.height=v,r.style.maxHeight=v};X?(T(),X(),X=null):X=T}}function st(n){const r=ie.value;if(r){const v=n.getBoundingClientRect().height,T=()=>{document.body.offsetHeight,r.style.maxHeight=`${v}px`,r.style.height=`${Math.max(me,v)}px`};X?(X(),X=null,T()):X=T}}function dt(){const n=ie.value;if(n){n.style.maxHeight="",n.style.height="";const{paneWrapperStyle:r}=e;if(typeof r=="string")n.style.cssText=r;else if(r){const{maxHeight:v,height:T}=r;v!==void 0&&(n.style.maxHeight=v),T!==void 0&&(n.style.height=T)}}}const Ae={value:[]},Ee=_("next");function ct(n){const r=z.value;let v="next";for(const T of Ae.value){if(T===r)break;if(T===n){v="prev";break}}Ee.value=v,ft(n)}function ft(n){const{onActiveNameChange:r,onUpdateValue:v,"onUpdate:value":T}=e;r&&ce(r,n),v&&ce(v,n),T&&ce(T,n),A.value=n}function bt(n){const{onClose:r}=e;r&&ce(r,n)}function We(){const{value:n}=x;if(!n)return;const r="transition-disabled";n.classList.add(r),oe(),n.classList.remove(r)}const Z=_(null);function xe({transitionDisabled:n}){const r=p.value;if(!r)return;n&&r.classList.add("transition-disabled");const v=y();v&&Z.value&&(Z.value.style.width=`${v.offsetWidth}px`,Z.value.style.height=`${v.offsetHeight}px`,Z.value.style.transform=`translateX(${v.offsetLeft-ba(getComputedStyle(r).paddingLeft)}px)`,n&&Z.value.offsetWidth),n&&r.classList.remove("transition-disabled")}te([z],()=>{e.type==="segment"&&be(()=>{xe({transitionDisabled:!1})})}),re(()=>{e.type==="segment"&&xe({transitionDisabled:!0})});let je=0;function ut(n){var r;if(n.contentRect.width===0&&n.contentRect.height===0||je===n.contentRect.width)return;je=n.contentRect.width;const{type:v}=e;if((v==="line"||v==="bar")&&We(),v!=="segment"){const{placement:T}=e;ye((T==="top"||T==="bottom"?(r=R.value)===null||r===void 0?void 0:r.$el:S.value)||null)}}const pt=ue(ut,64);te([()=>e.justifyContent,()=>e.size],()=>{be(()=>{const{type:n}=e;(n==="line"||n==="bar")&&We()})});const le=_(!1);function vt(n){var r;const{target:v,contentRect:{width:T}}=n,L=v.parentElement.offsetWidth;if(!le.value)L<T&&(le.value=!0);else{const{value:O}=$;if(!O)return;L-T>O.$el.offsetWidth&&(le.value=!1)}ye(((r=R.value)===null||r===void 0?void 0:r.$el)||null)}const gt=ue(vt,64);function ht(){const{onAdd:n}=e;n&&n(),be(()=>{const r=y(),{value:v}=R;!r||!v||v.scrollTo({left:r.offsetLeft,top:0,behavior:"smooth"})})}function ye(n){if(!n)return;const{placement:r}=e;if(r==="top"||r==="bottom"){const{scrollLeft:v,scrollWidth:T,offsetWidth:L}=n;C.value=v<=0,d.value=v+L>=T}else{const{scrollTop:v,scrollHeight:T,offsetHeight:L}=n;C.value=v<=0,d.value=v+L>=T}}const mt=ue(n=>{ye(n.target)},64);Ke(ze,{triggerRef:I(e,"trigger"),tabStyleRef:I(e,"tabStyle"),tabClassRef:I(e,"tabClass"),addTabStyleRef:I(e,"addTabStyle"),addTabClassRef:I(e,"addTabClass"),paneClassRef:I(e,"paneClass"),paneStyleRef:I(e,"paneStyle"),mergedClsPrefixRef:b,typeRef:I(e,"type"),closableRef:I(e,"closable"),valueRef:z,tabChangeIdRef:w,onBeforeLeaveRef:I(e,"onBeforeLeave"),activateTab:ct,handleClose:bt,handleAdd:ht}),et(()=>{oe(),Le()}),Xt(()=>{const{value:n}=k;if(!n)return;const{value:r}=b,v=`${r}-tabs-nav-scroll-wrapper--shadow-start`,T=`${r}-tabs-nav-scroll-wrapper--shadow-end`;C.value?n.classList.remove(v):n.classList.add(v),d.value?n.classList.remove(T):n.classList.add(T)});const xt={syncBarPosition:()=>{oe()}},yt=()=>{xe({transitionDisabled:!0})},He=j(()=>{const{value:n}=c,{type:r}=e,v={card:"Card",bar:"Bar",line:"Line",segment:"Segment"}[r],T=`${n}${v}`,{self:{barColor:L,closeIconColor:O,closeIconColorHover:Y,closeIconColorPressed:Ct,tabColor:St,tabBorderColor:Tt,paneTextColor:wt,tabFontWeight:Rt,tabBorderRadius:kt,tabFontWeightActive:Pt,colorSegment:$t,fontWeightStrong:_t,tabColorSegment:Bt,closeSize:zt,closeIconSize:Lt,closeColorHover:At,closeColorPressed:Et,closeBorderRadius:Wt,[F("panePadding",n)]:se,[F("tabPadding",T)]:jt,[F("tabPaddingVertical",T)]:Ht,[F("tabGap",T)]:It,[F("tabGap",`${T}Vertical`)]:Ot,[F("tabTextColor",r)]:Vt,[F("tabTextColorActive",r)]:Mt,[F("tabTextColorHover",r)]:Ft,[F("tabTextColorDisabled",r)]:Nt,[F("tabFontSize",n)]:Gt},common:{cubicBezierEaseInOut:Dt}}=m.value;return{"--n-bezier":Dt,"--n-color-segment":$t,"--n-bar-color":L,"--n-tab-font-size":Gt,"--n-tab-text-color":Vt,"--n-tab-text-color-active":Mt,"--n-tab-text-color-disabled":Nt,"--n-tab-text-color-hover":Ft,"--n-pane-text-color":wt,"--n-tab-border-color":Tt,"--n-tab-border-radius":kt,"--n-close-size":zt,"--n-close-icon-size":Lt,"--n-close-color-hover":At,"--n-close-color-pressed":Et,"--n-close-border-radius":Wt,"--n-close-icon-color":O,"--n-close-icon-color-hover":Y,"--n-close-icon-color-pressed":Ct,"--n-tab-color":St,"--n-tab-font-weight":Rt,"--n-tab-font-weight-active":Pt,"--n-tab-padding":jt,"--n-tab-padding-vertical":Ht,"--n-tab-gap":It,"--n-tab-gap-vertical":Ot,"--n-pane-padding-left":fe(se,"left"),"--n-pane-padding-right":fe(se,"right"),"--n-pane-padding-top":fe(se,"top"),"--n-pane-padding-bottom":fe(se,"bottom"),"--n-font-weight-strong":_t,"--n-tab-color-segment":Bt}}),K=s?nt("tabs",j(()=>`${c.value[0]}${e.type[0]}`),He,e):void 0;return Object.assign({mergedClsPrefix:b,mergedValue:z,renderedNames:new Set,segmentCapsuleElRef:Z,tabsPaneWrapperRef:ie,tabsElRef:p,barElRef:x,addTabInstRef:$,xScrollInstRef:R,scrollWrapperElRef:k,addTabFixed:le,tabWrapperStyle:u,handleNavResize:pt,mergedSize:c,handleScroll:mt,handleTabsResize:gt,cssVars:s?void 0:He,themeClass:K==null?void 0:K.themeClass,animationDirection:Ee,renderNameListRef:Ae,yScrollElRef:S,handleSegmentResize:yt,onAnimationBeforeLeave:lt,onAnimationEnter:st,onAnimationAfterEnter:dt,onRender:K==null?void 0:K.onRender},xt)},render(){const{mergedClsPrefix:e,type:t,placement:a,addTabFixed:o,addable:i,mergedSize:f,renderNameListRef:b,onRender:s,paneWrapperClass:m,paneWrapperStyle:p,$slots:{default:x,prefix:k,suffix:$}}=this;s==null||s();const R=x?Ce(x()).filter(w=>w.type.__TAB_PANE__===!0):[],S=x?Ce(x()).filter(w=>w.type.__TAB__===!0):[],C=!S.length,d=t==="card",c=t==="segment",P=!d&&!c&&this.justifyContent;b.value=[];const A=()=>{const w=h("div",{style:this.tabWrapperStyle,class:[`${e}-tabs-wrapper`]},P?null:h("div",{class:`${e}-tabs-scroll-padding`,style:{width:`${this.tabsPadding}px`}}),C?R.map((u,y)=>(b.value.push(u.props.name),we(h(ke,Object.assign({},u.props,{internalCreatedByPane:!0,internalLeftPadded:y!==0&&(!P||P==="center"||P==="start"||P==="end")}),u.children?{default:u.children.tab}:void 0)))):S.map((u,y)=>(b.value.push(u.props.name),we(y!==0&&!P?Je(u):u))),!o&&i&&d?qe(i,(C?R.length:S.length)!==0):null,P?null:h("div",{class:`${e}-tabs-scroll-padding`,style:{width:`${this.tabsPadding}px`}}));return h("div",{ref:"tabsElRef",class:`${e}-tabs-nav-scroll-content`},d&&i?h(Se,{onResize:this.handleTabsResize},{default:()=>w}):w,d?h("div",{class:`${e}-tabs-pad`}):null,d?null:h("div",{ref:"barElRef",class:`${e}-tabs-bar`}))},z=c?"top":a;return h("div",{class:[`${e}-tabs`,this.themeClass,`${e}-tabs--${t}-type`,`${e}-tabs--${f}-size`,P&&`${e}-tabs--flex`,`${e}-tabs--${z}`],style:this.cssVars},h("div",{class:[`${e}-tabs-nav--${t}-type`,`${e}-tabs-nav--${z}`,`${e}-tabs-nav`]},Fe(k,w=>w&&h("div",{class:`${e}-tabs-nav__prefix`},w)),c?h(Se,{onResize:this.handleSegmentResize},{default:()=>h("div",{class:`${e}-tabs-rail`,ref:"tabsElRef"},h("div",{class:`${e}-tabs-capsule`,ref:"segmentCapsuleElRef"},h("div",{class:`${e}-tabs-wrapper`},h("div",{class:`${e}-tabs-tab`}))),C?R.map((w,u)=>(b.value.push(w.props.name),h(ke,Object.assign({},w.props,{internalCreatedByPane:!0,internalLeftPadded:u!==0}),w.children?{default:w.children.tab}:void 0))):S.map((w,u)=>(b.value.push(w.props.name),u===0?w:Je(w))))}):h(Se,{onResize:this.handleNavResize},{default:()=>h("div",{class:`${e}-tabs-nav-scroll-wrapper`,ref:"scrollWrapperElRef"},["top","bottom"].includes(z)?h(Sa,{ref:"xScrollInstRef",onScroll:this.handleScroll},{default:A}):h("div",{class:`${e}-tabs-nav-y-scroll`,onScroll:this.handleScroll,ref:"yScrollElRef"},A()))}),o&&i&&d?qe(i,!0):null,Fe($,w=>w&&h("div",{class:`${e}-tabs-nav__suffix`},w))),C&&(this.animated&&(z==="top"||z==="bottom")?h("div",{ref:"tabsPaneWrapperRef",style:p,class:[`${e}-tabs-pane-wrapper`,m]},Ye(R,this.mergedValue,this.renderedNames,this.onAnimationBeforeLeave,this.onAnimationEnter,this.onAnimationAfterEnter,this.animationDirection)):Ye(R,this.mergedValue,this.renderedNames)))}});function Ye(e,t,a,o,i,f,b){const s=[];return e.forEach(m=>{const{name:p,displayDirective:x,"display-directive":k}=m.props,$=S=>x===S||k===S,R=t===p;if(m.key!==void 0&&(m.key=p),R||$("show")||$("show:lazy")&&a.has(p)){a.has(p)||a.add(p);const S=!$("if");s.push(S?Yt(m,[[qt,R]]):m)}}),b?h(Jt,{name:`${b}-transition`,onBeforeLeave:o,onEnter:i,onAfterEnter:f},{default:()=>s}):s}function qe(e,t){return h(ke,{ref:"addTabInstRef",key:"__addable",name:"__addable",internalCreatedByPane:!0,internalAddable:!0,internalLeftPadded:t,disabled:typeof e=="object"&&e.disabled})}function Je(e){const t=Qt(e);return t.props?t.props.internalLeftPadded=!0:t.props={internalLeftPadded:!0},t}function we(e){return Array.isArray(e.dynamicProps)?e.dynamicProps.includes("internalLeftPadded")||e.dynamicProps.push("internalLeftPadded"):e.dynamicProps=["internalLeftPadded"],e}const rn={name:"Timeline"},on={class:"timeline"};function ln(e,t,a,o,i,f){return E(),V("div",on,[Zt(e.$slots,"default",{},void 0,!0)])}const Qe=Pe(rn,[["render",ln],["__scopeId","data-v-dcc29abb"]]),sn={name:"TimelineItem",props:{content:{type:String,required:!0},time:{type:String,required:!0}},methods:{handleClick(){this.$emit("click")}}},dn={class:"timeline-item-content"};function cn(e,t,a,o,i,f){return E(),V("div",{class:"timeline-item",onClick:t[0]||(t[0]=(...b)=>f.handleClick&&f.handleClick(...b))},[M("div",dn,[M("time",null,ae(a.time),1),M("div",null,ae(a.content),1)]),t[1]||(t[1]=M("span",{class:"circle"},null,-1))])}const Ze=Pe(sn,[["render",cn],["__scopeId","data-v-b359483c"]]),fn={class:"container"},bn={class:"xz"},un=["id"],pn={class:"anchor"},vn=["id"],gn={class:"anchor"},hn=N({__name:"ArchiveView",setup(e){const t=_(0),a=_({}),o=_({}),i=Kt(),f=async()=>{try{const s=await Me.get("/markdown/metadata/posts_by_year.json");a.value=s.data;const m=await Me.get("/markdown/metadata/posts_by_tag.json");o.value=m.data,t.value=Object.values(a.value).flat().length}catch(s){console.error("Error loading archives data:",s)}},b=j(()=>Object.keys(a.value).sort((s,m)=>Number(m)-Number(s)).map(s=>({year:s,posts:a.value[s]})));return re(()=>{f()}),(s,m)=>(E(),V("main",null,[D(va),M("div",fn,[m[0]||(m[0]=M("h1",null,"文章归档📚",-1)),M("span",bn,"共发布 "+ae(t.value)+" 篇文章 📕",1),D(U(nn),{type:"segment",animated:""},{default:q(()=>[D(U(Xe),{name:"by-year",tab:"按照时间"},{default:q(()=>[(E(!0),V(J,null,ee(b.value,p=>(E(),V("div",{key:p.year},[M("h2",{id:p.year},ae(p.year),9,un),D(Qe,null,{default:q(()=>[(E(!0),V(J,null,ee(p.posts,x=>(E(),de(Ze,{key:x.file,content:x.title,time:x.date,onClick:k=>U(i).push(`/post/${x.file}`)},null,8,["content","time","onClick"]))),128))]),_:2},1024)]))),128)),M("div",pn,[D(U(Ue),{affix:"","trigger-top":24,top:88,style:{"z-index":"1"},"ignore-gap":""},{default:q(()=>[(E(!0),V(J,null,ee(b.value,p=>(E(),de(U(De),{key:p.year,title:p.year,href:`#${p.year}`},null,8,["title","href"]))),128))]),_:1})])]),_:1}),D(U(Xe),{name:"by-tag",tab:"按照类别"},{default:q(()=>[(E(!0),V(J,null,ee(o.value,(p,x)=>(E(),V("div",{key:x},[M("h2",{id:x},ae(x),9,vn),D(Qe,null,{default:q(()=>[(E(!0),V(J,null,ee(p,k=>(E(),de(Ze,{key:k.file,content:k.title,time:k.date,onClick:$=>U(i).push(`/post/${k.file}`)},null,8,["content","time","onClick"]))),128))]),_:2},1024)]))),128)),M("div",gn,[D(U(Ue),{affix:"","trigger-top":24,top:88,style:{"z-index":"1"},"ignore-gap":""},{default:q(()=>[(E(!0),V(J,null,ee(o.value,(p,x)=>(E(),de(U(De),{key:x,title:x,href:`#${x}`},null,8,["title","href"]))),128))]),_:1})])]),_:1})]),_:1})]),D(ua)]))}}),Tn=Pe(hn,[["__scopeId","data-v-9f1b6bbe"]]);export{Tn as default};
