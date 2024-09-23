import{a as xe,f as N,q as I,b as P,s as j,h as ke,N as ze,i as Q,y as i,g as L,j as Z,k as W,t as ye,n as J,v as U,c as ee,B as Pe,m as y,x as Se,K as A,L as Ie,M as Be,w as Re,V as $e,O as Le,P as He,Q as Oe}from"./Nav-BWyiPtfz.js";import{h as b,d as V,t as oe,r as R,p as we,c as T,i as X,o as re,g as Te,f as ne,w as Me,q as Ee,s as _e,x as Y,A as je,u as D,_ as Fe}from"./app-BG_iPlVX.js";function K(e){return e.replace(/#|\(|\)|,|\s|\./g,"_")}const Ne=xe("close",b("svg",{viewBox:"0 0 12 12",version:"1.1",xmlns:"http://www.w3.org/2000/svg","aria-hidden":!0},b("g",{stroke:"none","stroke-width":"1",fill:"none","fill-rule":"evenodd"},b("g",{fill:"currentColor","fill-rule":"nonzero"},b("path",{d:"M2.08859116,2.2156945 L2.14644661,2.14644661 C2.32001296,1.97288026 2.58943736,1.95359511 2.7843055,2.08859116 L2.85355339,2.14644661 L6,5.293 L9.14644661,2.14644661 C9.34170876,1.95118446 9.65829124,1.95118446 9.85355339,2.14644661 C10.0488155,2.34170876 10.0488155,2.65829124 9.85355339,2.85355339 L6.707,6 L9.85355339,9.14644661 C10.0271197,9.32001296 10.0464049,9.58943736 9.91140884,9.7843055 L9.85355339,9.85355339 C9.67998704,10.0271197 9.41056264,10.0464049 9.2156945,9.91140884 L9.14644661,9.85355339 L6,6.707 L2.85355339,9.85355339 C2.65829124,10.0488155 2.34170876,10.0488155 2.14644661,9.85355339 C1.95118446,9.65829124 1.95118446,9.34170876 2.14644661,9.14644661 L5.293,6 L2.14644661,2.85355339 C1.97288026,2.67998704 1.95359511,2.41056264 2.08859116,2.2156945 L2.14644661,2.14644661 L2.08859116,2.2156945 Z"}))))),We=N("base-close",`
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
`,[I("absolute",`
 height: var(--n-close-icon-size);
 width: var(--n-close-icon-size);
 `),P("&::before",`
 content: "";
 position: absolute;
 width: var(--n-close-size);
 height: var(--n-close-size);
 left: 50%;
 top: 50%;
 transform: translateY(-50%) translateX(-50%);
 transition: inherit;
 border-radius: inherit;
 `),j("disabled",[P("&:hover",`
 color: var(--n-close-icon-color-hover);
 `),P("&:hover::before",`
 background-color: var(--n-close-color-hover);
 `),P("&:focus::before",`
 background-color: var(--n-close-color-hover);
 `),P("&:active",`
 color: var(--n-close-icon-color-pressed);
 `),P("&:active::before",`
 background-color: var(--n-close-color-pressed);
 `)]),I("disabled",`
 cursor: not-allowed;
 color: var(--n-close-icon-color-disabled);
 background-color: transparent;
 `),I("round",[P("&::before",`
 border-radius: 50%;
 `)])]),Ve=V({name:"BaseClose",props:{isButtonTag:{type:Boolean,default:!0},clsPrefix:{type:String,required:!0},disabled:{type:Boolean,default:void 0},focusable:{type:Boolean,default:!0},round:Boolean,onClick:Function,absolute:Boolean},setup(e){return ke("-base-close",We,oe(e,"clsPrefix")),()=>{const{clsPrefix:a,disabled:o,absolute:u,round:s,isButtonTag:l}=e;return b(l?"button":"div",{type:l?"button":void 0,tabindex:o||!e.focusable?-1:0,"aria-disabled":o,"aria-label":"close",role:l?void 0:"button",disabled:o,class:[`${a}-base-close`,u&&`${a}-base-close--absolute`,o&&`${a}-base-close--disabled`,s&&`${a}-base-close--round`],onMousedown:d=>{e.focusable||d.preventDefault()},onClick:e.onClick},b(ze,{clsPrefix:a},{default:()=>b(Ne,null)}))}}}),Ae={closeIconSizeTiny:"12px",closeIconSizeSmall:"12px",closeIconSizeMedium:"14px",closeIconSizeLarge:"14px",closeSizeTiny:"16px",closeSizeSmall:"16px",closeSizeMedium:"18px",closeSizeLarge:"18px",padding:"0 7px",closeMargin:"0 0 0 4px"};function De(e){const{textColor2:a,primaryColorHover:o,primaryColorPressed:u,primaryColor:s,infoColor:l,successColor:c,warningColor:d,errorColor:h,baseColor:C,borderColor:m,opacityDisabled:g,tagColor:p,closeIconColor:n,closeIconColorHover:v,closeIconColorPressed:x,borderRadiusSmall:k,fontSizeMini:B,fontSizeTiny:r,fontSizeSmall:t,fontSizeMedium:f,heightMini:S,heightTiny:z,heightSmall:H,heightMedium:$,closeColorHover:O,closeColorPressed:M,buttonColor2Hover:E,buttonColor2Pressed:_,fontWeightStrong:w}=e;return Object.assign(Object.assign({},Ae),{closeBorderRadius:k,heightTiny:S,heightSmall:z,heightMedium:H,heightLarge:$,borderRadius:k,opacityDisabled:g,fontSizeTiny:B,fontSizeSmall:r,fontSizeMedium:t,fontSizeLarge:f,fontWeightStrong:w,textColorCheckable:a,textColorHoverCheckable:a,textColorPressedCheckable:a,textColorChecked:C,colorCheckable:"#0000",colorHoverCheckable:E,colorPressedCheckable:_,colorChecked:s,colorCheckedHover:o,colorCheckedPressed:u,border:`1px solid ${m}`,textColor:a,color:p,colorBordered:"rgb(250, 250, 252)",closeIconColor:n,closeIconColorHover:v,closeIconColorPressed:x,closeColorHover:O,closeColorPressed:M,borderPrimary:`1px solid ${i(s,{alpha:.3})}`,textColorPrimary:s,colorPrimary:i(s,{alpha:.12}),colorBorderedPrimary:i(s,{alpha:.1}),closeIconColorPrimary:s,closeIconColorHoverPrimary:s,closeIconColorPressedPrimary:s,closeColorHoverPrimary:i(s,{alpha:.12}),closeColorPressedPrimary:i(s,{alpha:.18}),borderInfo:`1px solid ${i(l,{alpha:.3})}`,textColorInfo:l,colorInfo:i(l,{alpha:.12}),colorBorderedInfo:i(l,{alpha:.1}),closeIconColorInfo:l,closeIconColorHoverInfo:l,closeIconColorPressedInfo:l,closeColorHoverInfo:i(l,{alpha:.12}),closeColorPressedInfo:i(l,{alpha:.18}),borderSuccess:`1px solid ${i(c,{alpha:.3})}`,textColorSuccess:c,colorSuccess:i(c,{alpha:.12}),colorBorderedSuccess:i(c,{alpha:.1}),closeIconColorSuccess:c,closeIconColorHoverSuccess:c,closeIconColorPressedSuccess:c,closeColorHoverSuccess:i(c,{alpha:.12}),closeColorPressedSuccess:i(c,{alpha:.18}),borderWarning:`1px solid ${i(d,{alpha:.35})}`,textColorWarning:d,colorWarning:i(d,{alpha:.15}),colorBorderedWarning:i(d,{alpha:.12}),closeIconColorWarning:d,closeIconColorHoverWarning:d,closeIconColorPressedWarning:d,closeColorHoverWarning:i(d,{alpha:.12}),closeColorPressedWarning:i(d,{alpha:.18}),borderError:`1px solid ${i(h,{alpha:.23})}`,textColorError:h,colorError:i(h,{alpha:.1}),colorBorderedError:i(h,{alpha:.08}),closeIconColorError:h,closeIconColorHoverError:h,closeIconColorPressedError:h,closeColorHoverError:i(h,{alpha:.12}),closeColorPressedError:i(h,{alpha:.18})})}const Ue={name:"Tag",common:Q,self:De},Ke={color:Object,type:{type:String,default:"default"},round:Boolean,size:{type:String,default:"medium"},closable:Boolean,disabled:{type:Boolean,default:void 0}},qe=N("tag",`
 --n-close-margin: var(--n-close-margin-top) var(--n-close-margin-right) var(--n-close-margin-bottom) var(--n-close-margin-left);
 white-space: nowrap;
 position: relative;
 box-sizing: border-box;
 cursor: default;
 display: inline-flex;
 align-items: center;
 flex-wrap: nowrap;
 padding: var(--n-padding);
 border-radius: var(--n-border-radius);
 color: var(--n-text-color);
 background-color: var(--n-color);
 transition: 
 border-color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 opacity .3s var(--n-bezier);
 line-height: 1;
 height: var(--n-height);
 font-size: var(--n-font-size);
`,[I("strong",`
 font-weight: var(--n-font-weight-strong);
 `),L("border",`
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 border-radius: inherit;
 border: var(--n-border);
 transition: border-color .3s var(--n-bezier);
 `),L("icon",`
 display: flex;
 margin: 0 4px 0 0;
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 font-size: var(--n-avatar-size-override);
 `),L("avatar",`
 display: flex;
 margin: 0 6px 0 0;
 `),L("close",`
 margin: var(--n-close-margin);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `),I("round",`
 padding: 0 calc(var(--n-height) / 3);
 border-radius: calc(var(--n-height) / 2);
 `,[L("icon",`
 margin: 0 4px 0 calc((var(--n-height) - 8px) / -2);
 `),L("avatar",`
 margin: 0 6px 0 calc((var(--n-height) - 8px) / -2);
 `),I("closable",`
 padding: 0 calc(var(--n-height) / 4) 0 calc(var(--n-height) / 3);
 `)]),I("icon, avatar",[I("round",`
 padding: 0 calc(var(--n-height) / 3) 0 calc(var(--n-height) / 2);
 `)]),I("disabled",`
 cursor: not-allowed !important;
 opacity: var(--n-opacity-disabled);
 `),I("checkable",`
 cursor: pointer;
 box-shadow: none;
 color: var(--n-text-color-checkable);
 background-color: var(--n-color-checkable);
 `,[j("disabled",[P("&:hover","background-color: var(--n-color-hover-checkable);",[j("checked","color: var(--n-text-color-hover-checkable);")]),P("&:active","background-color: var(--n-color-pressed-checkable);",[j("checked","color: var(--n-text-color-pressed-checkable);")])]),I("checked",`
 color: var(--n-text-color-checked);
 background-color: var(--n-color-checked);
 `,[j("disabled",[P("&:hover","background-color: var(--n-color-checked-hover);"),P("&:active","background-color: var(--n-color-checked-pressed);")])])])]),Ge=Object.assign(Object.assign(Object.assign({},W.props),Ke),{bordered:{type:Boolean,default:void 0},checked:Boolean,checkable:Boolean,strong:Boolean,triggerClickOnClose:Boolean,onClose:[Array,Function],onMouseenter:Function,onMouseleave:Function,"onUpdate:checked":Function,onUpdateChecked:Function,internalCloseFocusable:{type:Boolean,default:!0},internalCloseIsButtonTag:{type:Boolean,default:!0},onCheckedChange:Function}),le=ee("n-tag"),ao=V({name:"Tag",props:Ge,setup(e){const a=R(null),{mergedBorderedRef:o,mergedClsPrefixRef:u,inlineThemeDisabled:s,mergedRtlRef:l}=Z(e),c=W("Tag","-tag",qe,Ue,e,u);we(le,{roundRef:oe(e,"round")});function d(){if(!e.disabled&&e.checkable){const{checked:n,onCheckedChange:v,onUpdateChecked:x,"onUpdate:checked":k}=e;x&&x(!n),k&&k(!n),v&&v(!n)}}function h(n){if(e.triggerClickOnClose||n.stopPropagation(),!e.disabled){const{onClose:v}=e;v&&Pe(v,n)}}const C={setTextContent(n){const{value:v}=a;v&&(v.textContent=n)}},m=ye("Tag",l,u),g=T(()=>{const{type:n,size:v,color:{color:x,textColor:k}={}}=e,{common:{cubicBezierEaseInOut:B},self:{padding:r,closeMargin:t,borderRadius:f,opacityDisabled:S,textColorCheckable:z,textColorHoverCheckable:H,textColorPressedCheckable:$,textColorChecked:O,colorCheckable:M,colorHoverCheckable:E,colorPressedCheckable:_,colorChecked:w,colorCheckedHover:ae,colorCheckedPressed:se,closeBorderRadius:te,fontWeightStrong:ce,[y("colorBordered",n)]:ie,[y("closeSize",v)]:de,[y("closeIconSize",v)]:he,[y("fontSize",v)]:ue,[y("height",v)]:q,[y("color",n)]:ve,[y("textColor",n)]:ge,[y("border",n)]:be,[y("closeIconColor",n)]:G,[y("closeIconColorHover",n)]:fe,[y("closeIconColorPressed",n)]:Ce,[y("closeColorHover",n)]:me,[y("closeColorPressed",n)]:pe}}=c.value,F=Se(t);return{"--n-font-weight-strong":ce,"--n-avatar-size-override":`calc(${q} - 8px)`,"--n-bezier":B,"--n-border-radius":f,"--n-border":be,"--n-close-icon-size":he,"--n-close-color-pressed":pe,"--n-close-color-hover":me,"--n-close-border-radius":te,"--n-close-icon-color":G,"--n-close-icon-color-hover":fe,"--n-close-icon-color-pressed":Ce,"--n-close-icon-color-disabled":G,"--n-close-margin-top":F.top,"--n-close-margin-right":F.right,"--n-close-margin-bottom":F.bottom,"--n-close-margin-left":F.left,"--n-close-size":de,"--n-color":x||(o.value?ie:ve),"--n-color-checkable":M,"--n-color-checked":w,"--n-color-checked-hover":ae,"--n-color-checked-pressed":se,"--n-color-hover-checkable":E,"--n-color-pressed-checkable":_,"--n-font-size":ue,"--n-height":q,"--n-opacity-disabled":S,"--n-padding":r,"--n-text-color":k||ge,"--n-text-color-checkable":z,"--n-text-color-checked":O,"--n-text-color-hover-checkable":H,"--n-text-color-pressed-checkable":$}}),p=s?J("tag",T(()=>{let n="";const{type:v,size:x,color:{color:k,textColor:B}={}}=e;return n+=v[0],n+=x[0],k&&(n+=`a${K(k)}`),B&&(n+=`b${K(B)}`),o.value&&(n+="c"),n}),g,e):void 0;return Object.assign(Object.assign({},C),{rtlEnabled:m,mergedClsPrefix:u,contentRef:a,mergedBordered:o,handleClick:d,handleCloseClick:h,cssVars:s?void 0:g,themeClass:p==null?void 0:p.themeClass,onRender:p==null?void 0:p.onRender})},render(){var e,a;const{mergedClsPrefix:o,rtlEnabled:u,closable:s,color:{borderColor:l}={},round:c,onRender:d,$slots:h}=this;d==null||d();const C=U(h.avatar,g=>g&&b("div",{class:`${o}-tag__avatar`},g)),m=U(h.icon,g=>g&&b("div",{class:`${o}-tag__icon`},g));return b("div",{class:[`${o}-tag`,this.themeClass,{[`${o}-tag--rtl`]:u,[`${o}-tag--strong`]:this.strong,[`${o}-tag--disabled`]:this.disabled,[`${o}-tag--checkable`]:this.checkable,[`${o}-tag--checked`]:this.checkable&&this.checked,[`${o}-tag--round`]:c,[`${o}-tag--avatar`]:C,[`${o}-tag--icon`]:m,[`${o}-tag--closable`]:s}],style:this.cssVars,onClick:this.handleClick,onMouseenter:this.onMouseenter,onMouseleave:this.onMouseleave},m||C,b("span",{class:`${o}-tag__content`,ref:"contentRef"},(a=(e=this.$slots).default)===null||a===void 0?void 0:a.call(e)),!this.checkable&&s?b(Ve,{clsPrefix:o,class:`${o}-tag__close`,disabled:this.disabled,onClick:this.handleCloseClick,focusable:this.internalCloseFocusable,round:c,isButtonTag:this.internalCloseIsButtonTag,absolute:!0}):null,!this.checkable&&this.mergedBordered?b("div",{class:`${o}-tag__border`,style:{borderColor:l}}):null)}});function Xe(e){const{borderRadius:a,avatarColor:o,cardColor:u,fontSize:s,heightTiny:l,heightSmall:c,heightMedium:d,heightLarge:h,heightHuge:C,modalColor:m,popoverColor:g}=e;return{borderRadius:a,fontSize:s,border:`2px solid ${u}`,heightTiny:l,heightSmall:c,heightMedium:d,heightLarge:h,heightHuge:C,color:A(u,o),colorModal:A(m,o),colorPopover:A(g,o)}}const Ye={name:"Avatar",common:Q,self:Xe},Qe=ee("n-avatar-group"),Ze=N("avatar",`
 width: var(--n-merged-size);
 height: var(--n-merged-size);
 color: #FFF;
 font-size: var(--n-font-size);
 display: inline-flex;
 position: relative;
 overflow: hidden;
 text-align: center;
 border: var(--n-border);
 border-radius: var(--n-border-radius);
 --n-merged-color: var(--n-color);
 background-color: var(--n-merged-color);
 transition:
 border-color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
`,[Ie(P("&","--n-merged-color: var(--n-color-modal);")),Be(P("&","--n-merged-color: var(--n-color-popover);")),P("img",`
 width: 100%;
 height: 100%;
 `),L("text",`
 white-space: nowrap;
 display: inline-block;
 position: absolute;
 left: 50%;
 top: 50%;
 `),N("icon",`
 vertical-align: bottom;
 font-size: calc(var(--n-merged-size) - 6px);
 `),L("text","line-height: 1.25")]),Je=Object.assign(Object.assign({},W.props),{size:[String,Number],src:String,circle:{type:Boolean,default:void 0},objectFit:String,round:{type:Boolean,default:void 0},bordered:{type:Boolean,default:void 0},onError:Function,fallbackSrc:String,intersectionObserverOptions:Object,lazy:Boolean,onLoad:Function,renderPlaceholder:Function,renderFallback:Function,imgProps:Object,color:String}),eo=V({name:"Avatar",props:Je,setup(e){const{mergedClsPrefixRef:a,inlineThemeDisabled:o}=Z(e),u=R(!1);let s=null;const l=R(null),c=R(null),d=()=>{const{value:r}=l;if(r&&(s===null||s!==r.innerHTML)){s=r.innerHTML;const{value:t}=c;if(t){const{offsetWidth:f,offsetHeight:S}=t,{offsetWidth:z,offsetHeight:H}=r,$=.9,O=Math.min(f/z*$,S/H*$,1);r.style.transform=`translateX(-50%) translateY(-50%) scale(${O})`}}},h=X(Qe,null),C=T(()=>{const{size:r}=e;if(r)return r;const{size:t}=h||{};return t||"medium"}),m=W("Avatar","-avatar",Ze,Ye,e,a),g=X(le,null),p=T(()=>{if(h)return!0;const{round:r,circle:t}=e;return r!==void 0||t!==void 0?r||t:g?g.roundRef.value:!1}),n=T(()=>h?!0:e.bordered||!1),v=T(()=>{const r=C.value,t=p.value,f=n.value,{color:S}=e,{self:{borderRadius:z,fontSize:H,color:$,border:O,colorModal:M,colorPopover:E},common:{cubicBezierEaseInOut:_}}=m.value;let w;return typeof r=="number"?w=`${r}px`:w=m.value.self[y("height",r)],{"--n-font-size":H,"--n-border":f?O:"none","--n-border-radius":t?"50%":z,"--n-color":S||$,"--n-color-modal":S||M,"--n-color-popover":S||E,"--n-bezier":_,"--n-merged-size":`var(--n-avatar-size-override, ${w})`}}),x=o?J("avatar",T(()=>{const r=C.value,t=p.value,f=n.value,{color:S}=e;let z="";return r&&(typeof r=="number"?z+=`a${r}`:z+=r[0]),t&&(z+="b"),f&&(z+="c"),S&&(z+=K(S)),z}),v,e):void 0,k=R(!e.lazy);re(()=>{if(e.lazy&&e.intersectionObserverOptions){let r;const t=Te(()=>{r==null||r(),r=void 0,e.lazy&&(r=He(c.value,e.intersectionObserverOptions,k))});ne(()=>{t(),r==null||r()})}}),Me(()=>{var r;return e.src||((r=e.imgProps)===null||r===void 0?void 0:r.src)},()=>{u.value=!1});const B=R(!e.lazy);return{textRef:l,selfRef:c,mergedRoundRef:p,mergedClsPrefix:a,fitTextTransform:d,cssVars:o?void 0:v,themeClass:x==null?void 0:x.themeClass,onRender:x==null?void 0:x.onRender,hasLoadError:u,shouldStartLoading:k,loaded:B,mergedOnError:r=>{if(!k.value)return;u.value=!0;const{onError:t,imgProps:{onError:f}={}}=e;t==null||t(r),f==null||f(r)},mergedOnLoad:r=>{const{onLoad:t,imgProps:{onLoad:f}={}}=e;t==null||t(r),f==null||f(r),B.value=!0}}},render(){var e,a;const{$slots:o,src:u,mergedClsPrefix:s,lazy:l,onRender:c,loaded:d,hasLoadError:h,imgProps:C={}}=this;c==null||c();let m;const g=!d&&!h&&(this.renderPlaceholder?this.renderPlaceholder():(a=(e=this.$slots).placeholder)===null||a===void 0?void 0:a.call(e));return this.hasLoadError?m=this.renderFallback?this.renderFallback():Re(o.fallback,()=>[b("img",{src:this.fallbackSrc,style:{objectFit:this.objectFit}})]):m=U(o.default,p=>{if(p)return b($e,{onResize:this.fitTextTransform},{default:()=>b("span",{ref:"textRef",class:`${s}-avatar__text`},p)});if(u||C.src){const n=this.src||C.src;return b("img",Object.assign(Object.assign({},C),{loading:Le&&!this.intersectionObserverOptions&&l?"lazy":"eager",src:l&&this.intersectionObserverOptions?this.shouldStartLoading?n:void 0:n,"data-image-src":n,onLoad:this.mergedOnLoad,onError:this.mergedOnError,style:[C.style||"",{objectFit:this.objectFit},g?{height:"0",width:"0",visibility:"hidden",position:"absolute"}:""]}))}}),b("span",{ref:"selfRef",class:[`${s}-avatar`,this.themeClass],style:this.cssVars},m,l&&g)}}),oo={class:"bg"},ro=V({__name:"PageHead",setup(e){const a=R(!1);R(null);const o=R(null),u=new IntersectionObserver(([s])=>{s.intersectionRatio===0?a.value=!0:a.value=!1},{threshold:[0,1]});return re(()=>{o.value&&u.observe(o.value)}),ne(()=>{o.value&&u.unobserve(o.value)}),(s,l)=>(Ee(),_e("div",oo,[Y(je(eo),{round:!0,size:100,src:"https://myblog-1257298572.cos.ap-shanghai.myqcloud.com/avatar.jpg",bordered:!0}),l[0]||(l[0]=D("span",{class:"name"},"Bailey",-1)),l[1]||(l[1]=D("span",{class:"zym"},"读万卷书，行万里路",-1)),D("div",{ref_key:"navPlaceholder",ref:o,class:"nav-placeholder"},null,512),Y(Oe,{expandNav:a.value},null,8,["expandNav"])]))}}),so=Fe(ro,[["__scopeId","data-v-9a498d9c"]]);export{ao as N,so as P,Ve as a};
