import{a as ke,f as N,q as I,b as P,s as j,h as ze,N as ye,i as Q,y as i,g as _,j as Z,k as W,t as Pe,n as J,v as D,c as ee,B as Se,m as y,x as Ie,K as A,L as Be,M as Re,w as $e,V as _e,O as Le,P as He,Q as Oe}from"./Nav-CXt6Dq7E.js";import{h as b,d as V,t as oe,r as R,p as we,c as w,i as X,o as re,g as Te,f as ae,w as Ee,q as Me,s as je,x as Y,A as Fe,u as K,D as Ne,E as We,_ as Ve}from"./app-BqX8H2Kg.js";function U(e){return e.replace(/#|\(|\)|,|\s|\./g,"_")}const Ae=ke("close",b("svg",{viewBox:"0 0 12 12",version:"1.1",xmlns:"http://www.w3.org/2000/svg","aria-hidden":!0},b("g",{stroke:"none","stroke-width":"1",fill:"none","fill-rule":"evenodd"},b("g",{fill:"currentColor","fill-rule":"nonzero"},b("path",{d:"M2.08859116,2.2156945 L2.14644661,2.14644661 C2.32001296,1.97288026 2.58943736,1.95359511 2.7843055,2.08859116 L2.85355339,2.14644661 L6,5.293 L9.14644661,2.14644661 C9.34170876,1.95118446 9.65829124,1.95118446 9.85355339,2.14644661 C10.0488155,2.34170876 10.0488155,2.65829124 9.85355339,2.85355339 L6.707,6 L9.85355339,9.14644661 C10.0271197,9.32001296 10.0464049,9.58943736 9.91140884,9.7843055 L9.85355339,9.85355339 C9.67998704,10.0271197 9.41056264,10.0464049 9.2156945,9.91140884 L9.14644661,9.85355339 L6,6.707 L2.85355339,9.85355339 C2.65829124,10.0488155 2.34170876,10.0488155 2.14644661,9.85355339 C1.95118446,9.65829124 1.95118446,9.34170876 2.14644661,9.14644661 L5.293,6 L2.14644661,2.85355339 C1.97288026,2.67998704 1.95359511,2.41056264 2.08859116,2.2156945 L2.14644661,2.14644661 L2.08859116,2.2156945 Z"}))))),De=N("base-close",`
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
 `)])]),Ue=V({name:"BaseClose",props:{isButtonTag:{type:Boolean,default:!0},clsPrefix:{type:String,required:!0},disabled:{type:Boolean,default:void 0},focusable:{type:Boolean,default:!0},round:Boolean,onClick:Function,absolute:Boolean},setup(e){return ze("-base-close",De,oe(e,"clsPrefix")),()=>{const{clsPrefix:n,disabled:o,absolute:u,round:l,isButtonTag:s}=e;return b(s?"button":"div",{type:s?"button":void 0,tabindex:o||!e.focusable?-1:0,"aria-disabled":o,"aria-label":"close",role:s?void 0:"button",disabled:o,class:[`${n}-base-close`,u&&`${n}-base-close--absolute`,o&&`${n}-base-close--disabled`,l&&`${n}-base-close--round`],onMousedown:d=>{e.focusable||d.preventDefault()},onClick:e.onClick},b(ye,{clsPrefix:n},{default:()=>b(Ae,null)}))}}}),Ke={closeIconSizeTiny:"12px",closeIconSizeSmall:"12px",closeIconSizeMedium:"14px",closeIconSizeLarge:"14px",closeSizeTiny:"16px",closeSizeSmall:"16px",closeSizeMedium:"18px",closeSizeLarge:"18px",padding:"0 7px",closeMargin:"0 0 0 4px"};function qe(e){const{textColor2:n,primaryColorHover:o,primaryColorPressed:u,primaryColor:l,infoColor:s,successColor:c,warningColor:d,errorColor:h,baseColor:p,borderColor:C,opacityDisabled:g,tagColor:m,closeIconColor:a,closeIconColorHover:v,closeIconColorPressed:x,borderRadiusSmall:k,fontSizeMini:B,fontSizeTiny:r,fontSizeSmall:t,fontSizeMedium:f,heightMini:S,heightTiny:z,heightSmall:L,heightMedium:$,closeColorHover:H,closeColorPressed:T,buttonColor2Hover:E,buttonColor2Pressed:M,fontWeightStrong:O}=e;return Object.assign(Object.assign({},Ke),{closeBorderRadius:k,heightTiny:S,heightSmall:z,heightMedium:L,heightLarge:$,borderRadius:k,opacityDisabled:g,fontSizeTiny:B,fontSizeSmall:r,fontSizeMedium:t,fontSizeLarge:f,fontWeightStrong:O,textColorCheckable:n,textColorHoverCheckable:n,textColorPressedCheckable:n,textColorChecked:p,colorCheckable:"#0000",colorHoverCheckable:E,colorPressedCheckable:M,colorChecked:l,colorCheckedHover:o,colorCheckedPressed:u,border:`1px solid ${C}`,textColor:n,color:m,colorBordered:"rgb(250, 250, 252)",closeIconColor:a,closeIconColorHover:v,closeIconColorPressed:x,closeColorHover:H,closeColorPressed:T,borderPrimary:`1px solid ${i(l,{alpha:.3})}`,textColorPrimary:l,colorPrimary:i(l,{alpha:.12}),colorBorderedPrimary:i(l,{alpha:.1}),closeIconColorPrimary:l,closeIconColorHoverPrimary:l,closeIconColorPressedPrimary:l,closeColorHoverPrimary:i(l,{alpha:.12}),closeColorPressedPrimary:i(l,{alpha:.18}),borderInfo:`1px solid ${i(s,{alpha:.3})}`,textColorInfo:s,colorInfo:i(s,{alpha:.12}),colorBorderedInfo:i(s,{alpha:.1}),closeIconColorInfo:s,closeIconColorHoverInfo:s,closeIconColorPressedInfo:s,closeColorHoverInfo:i(s,{alpha:.12}),closeColorPressedInfo:i(s,{alpha:.18}),borderSuccess:`1px solid ${i(c,{alpha:.3})}`,textColorSuccess:c,colorSuccess:i(c,{alpha:.12}),colorBorderedSuccess:i(c,{alpha:.1}),closeIconColorSuccess:c,closeIconColorHoverSuccess:c,closeIconColorPressedSuccess:c,closeColorHoverSuccess:i(c,{alpha:.12}),closeColorPressedSuccess:i(c,{alpha:.18}),borderWarning:`1px solid ${i(d,{alpha:.35})}`,textColorWarning:d,colorWarning:i(d,{alpha:.15}),colorBorderedWarning:i(d,{alpha:.12}),closeIconColorWarning:d,closeIconColorHoverWarning:d,closeIconColorPressedWarning:d,closeColorHoverWarning:i(d,{alpha:.12}),closeColorPressedWarning:i(d,{alpha:.18}),borderError:`1px solid ${i(h,{alpha:.23})}`,textColorError:h,colorError:i(h,{alpha:.1}),colorBorderedError:i(h,{alpha:.08}),closeIconColorError:h,closeIconColorHoverError:h,closeIconColorPressedError:h,closeColorHoverError:i(h,{alpha:.12}),closeColorPressedError:i(h,{alpha:.18})})}const Ge={name:"Tag",common:Q,self:qe},Xe={color:Object,type:{type:String,default:"default"},round:Boolean,size:{type:String,default:"medium"},closable:Boolean,disabled:{type:Boolean,default:void 0}},Ye=N("tag",`
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
 `),_("border",`
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 border-radius: inherit;
 border: var(--n-border);
 transition: border-color .3s var(--n-bezier);
 `),_("icon",`
 display: flex;
 margin: 0 4px 0 0;
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 font-size: var(--n-avatar-size-override);
 `),_("avatar",`
 display: flex;
 margin: 0 6px 0 0;
 `),_("close",`
 margin: var(--n-close-margin);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `),I("round",`
 padding: 0 calc(var(--n-height) / 3);
 border-radius: calc(var(--n-height) / 2);
 `,[_("icon",`
 margin: 0 4px 0 calc((var(--n-height) - 8px) / -2);
 `),_("avatar",`
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
 `,[j("disabled",[P("&:hover","background-color: var(--n-color-checked-hover);"),P("&:active","background-color: var(--n-color-checked-pressed);")])])])]),Qe=Object.assign(Object.assign(Object.assign({},W.props),Xe),{bordered:{type:Boolean,default:void 0},checked:Boolean,checkable:Boolean,strong:Boolean,triggerClickOnClose:Boolean,onClose:[Array,Function],onMouseenter:Function,onMouseleave:Function,"onUpdate:checked":Function,onUpdateChecked:Function,internalCloseFocusable:{type:Boolean,default:!0},internalCloseIsButtonTag:{type:Boolean,default:!0},onCheckedChange:Function}),ne=ee("n-tag"),ho=V({name:"Tag",props:Qe,setup(e){const n=R(null),{mergedBorderedRef:o,mergedClsPrefixRef:u,inlineThemeDisabled:l,mergedRtlRef:s}=Z(e),c=W("Tag","-tag",Ye,Ge,e,u);we(ne,{roundRef:oe(e,"round")});function d(){if(!e.disabled&&e.checkable){const{checked:a,onCheckedChange:v,onUpdateChecked:x,"onUpdate:checked":k}=e;x&&x(!a),k&&k(!a),v&&v(!a)}}function h(a){if(e.triggerClickOnClose||a.stopPropagation(),!e.disabled){const{onClose:v}=e;v&&Se(v,a)}}const p={setTextContent(a){const{value:v}=n;v&&(v.textContent=a)}},C=Pe("Tag",s,u),g=w(()=>{const{type:a,size:v,color:{color:x,textColor:k}={}}=e,{common:{cubicBezierEaseInOut:B},self:{padding:r,closeMargin:t,borderRadius:f,opacityDisabled:S,textColorCheckable:z,textColorHoverCheckable:L,textColorPressedCheckable:$,textColorChecked:H,colorCheckable:T,colorHoverCheckable:E,colorPressedCheckable:M,colorChecked:O,colorCheckedHover:se,colorCheckedPressed:te,closeBorderRadius:ce,fontWeightStrong:ie,[y("colorBordered",a)]:de,[y("closeSize",v)]:he,[y("closeIconSize",v)]:ue,[y("fontSize",v)]:ve,[y("height",v)]:q,[y("color",a)]:ge,[y("textColor",a)]:be,[y("border",a)]:fe,[y("closeIconColor",a)]:G,[y("closeIconColorHover",a)]:pe,[y("closeIconColorPressed",a)]:Ce,[y("closeColorHover",a)]:me,[y("closeColorPressed",a)]:xe}}=c.value,F=Ie(t);return{"--n-font-weight-strong":ie,"--n-avatar-size-override":`calc(${q} - 8px)`,"--n-bezier":B,"--n-border-radius":f,"--n-border":fe,"--n-close-icon-size":ue,"--n-close-color-pressed":xe,"--n-close-color-hover":me,"--n-close-border-radius":ce,"--n-close-icon-color":G,"--n-close-icon-color-hover":pe,"--n-close-icon-color-pressed":Ce,"--n-close-icon-color-disabled":G,"--n-close-margin-top":F.top,"--n-close-margin-right":F.right,"--n-close-margin-bottom":F.bottom,"--n-close-margin-left":F.left,"--n-close-size":he,"--n-color":x||(o.value?de:ge),"--n-color-checkable":T,"--n-color-checked":O,"--n-color-checked-hover":se,"--n-color-checked-pressed":te,"--n-color-hover-checkable":E,"--n-color-pressed-checkable":M,"--n-font-size":ve,"--n-height":q,"--n-opacity-disabled":S,"--n-padding":r,"--n-text-color":k||be,"--n-text-color-checkable":z,"--n-text-color-checked":H,"--n-text-color-hover-checkable":L,"--n-text-color-pressed-checkable":$}}),m=l?J("tag",w(()=>{let a="";const{type:v,size:x,color:{color:k,textColor:B}={}}=e;return a+=v[0],a+=x[0],k&&(a+=`a${U(k)}`),B&&(a+=`b${U(B)}`),o.value&&(a+="c"),a}),g,e):void 0;return Object.assign(Object.assign({},p),{rtlEnabled:C,mergedClsPrefix:u,contentRef:n,mergedBordered:o,handleClick:d,handleCloseClick:h,cssVars:l?void 0:g,themeClass:m==null?void 0:m.themeClass,onRender:m==null?void 0:m.onRender})},render(){var e,n;const{mergedClsPrefix:o,rtlEnabled:u,closable:l,color:{borderColor:s}={},round:c,onRender:d,$slots:h}=this;d==null||d();const p=D(h.avatar,g=>g&&b("div",{class:`${o}-tag__avatar`},g)),C=D(h.icon,g=>g&&b("div",{class:`${o}-tag__icon`},g));return b("div",{class:[`${o}-tag`,this.themeClass,{[`${o}-tag--rtl`]:u,[`${o}-tag--strong`]:this.strong,[`${o}-tag--disabled`]:this.disabled,[`${o}-tag--checkable`]:this.checkable,[`${o}-tag--checked`]:this.checkable&&this.checked,[`${o}-tag--round`]:c,[`${o}-tag--avatar`]:p,[`${o}-tag--icon`]:C,[`${o}-tag--closable`]:l}],style:this.cssVars,onClick:this.handleClick,onMouseenter:this.onMouseenter,onMouseleave:this.onMouseleave},C||p,b("span",{class:`${o}-tag__content`,ref:"contentRef"},(n=(e=this.$slots).default)===null||n===void 0?void 0:n.call(e)),!this.checkable&&l?b(Ue,{clsPrefix:o,class:`${o}-tag__close`,disabled:this.disabled,onClick:this.handleCloseClick,focusable:this.internalCloseFocusable,round:c,isButtonTag:this.internalCloseIsButtonTag,absolute:!0}):null,!this.checkable&&this.mergedBordered?b("div",{class:`${o}-tag__border`,style:{borderColor:s}}):null)}});function Ze(e){const{borderRadius:n,avatarColor:o,cardColor:u,fontSize:l,heightTiny:s,heightSmall:c,heightMedium:d,heightLarge:h,heightHuge:p,modalColor:C,popoverColor:g}=e;return{borderRadius:n,fontSize:l,border:`2px solid ${u}`,heightTiny:s,heightSmall:c,heightMedium:d,heightLarge:h,heightHuge:p,color:A(u,o),colorModal:A(C,o),colorPopover:A(g,o)}}const Je={name:"Avatar",common:Q,self:Ze},eo=ee("n-avatar-group"),oo=N("avatar",`
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
`,[Be(P("&","--n-merged-color: var(--n-color-modal);")),Re(P("&","--n-merged-color: var(--n-color-popover);")),P("img",`
 width: 100%;
 height: 100%;
 `),_("text",`
 white-space: nowrap;
 display: inline-block;
 position: absolute;
 left: 50%;
 top: 50%;
 `),N("icon",`
 vertical-align: bottom;
 font-size: calc(var(--n-merged-size) - 6px);
 `),_("text","line-height: 1.25")]),ro=Object.assign(Object.assign({},W.props),{size:[String,Number],src:String,circle:{type:Boolean,default:void 0},objectFit:String,round:{type:Boolean,default:void 0},bordered:{type:Boolean,default:void 0},onError:Function,fallbackSrc:String,intersectionObserverOptions:Object,lazy:Boolean,onLoad:Function,renderPlaceholder:Function,renderFallback:Function,imgProps:Object,color:String}),ao=V({name:"Avatar",props:ro,setup(e){const{mergedClsPrefixRef:n,inlineThemeDisabled:o}=Z(e),u=R(!1);let l=null;const s=R(null),c=R(null),d=()=>{const{value:r}=s;if(r&&(l===null||l!==r.innerHTML)){l=r.innerHTML;const{value:t}=c;if(t){const{offsetWidth:f,offsetHeight:S}=t,{offsetWidth:z,offsetHeight:L}=r,$=.9,H=Math.min(f/z*$,S/L*$,1);r.style.transform=`translateX(-50%) translateY(-50%) scale(${H})`}}},h=X(eo,null),p=w(()=>{const{size:r}=e;if(r)return r;const{size:t}=h||{};return t||"medium"}),C=W("Avatar","-avatar",oo,Je,e,n),g=X(ne,null),m=w(()=>{if(h)return!0;const{round:r,circle:t}=e;return r!==void 0||t!==void 0?r||t:g?g.roundRef.value:!1}),a=w(()=>h?!0:e.bordered||!1),v=w(()=>{const r=p.value,t=m.value,f=a.value,{color:S}=e,{self:{borderRadius:z,fontSize:L,color:$,border:H,colorModal:T,colorPopover:E},common:{cubicBezierEaseInOut:M}}=C.value;let O;return typeof r=="number"?O=`${r}px`:O=C.value.self[y("height",r)],{"--n-font-size":L,"--n-border":f?H:"none","--n-border-radius":t?"50%":z,"--n-color":S||$,"--n-color-modal":S||T,"--n-color-popover":S||E,"--n-bezier":M,"--n-merged-size":`var(--n-avatar-size-override, ${O})`}}),x=o?J("avatar",w(()=>{const r=p.value,t=m.value,f=a.value,{color:S}=e;let z="";return r&&(typeof r=="number"?z+=`a${r}`:z+=r[0]),t&&(z+="b"),f&&(z+="c"),S&&(z+=U(S)),z}),v,e):void 0,k=R(!e.lazy);re(()=>{if(e.lazy&&e.intersectionObserverOptions){let r;const t=Te(()=>{r==null||r(),r=void 0,e.lazy&&(r=He(c.value,e.intersectionObserverOptions,k))});ae(()=>{t(),r==null||r()})}}),Ee(()=>{var r;return e.src||((r=e.imgProps)===null||r===void 0?void 0:r.src)},()=>{u.value=!1});const B=R(!e.lazy);return{textRef:s,selfRef:c,mergedRoundRef:m,mergedClsPrefix:n,fitTextTransform:d,cssVars:o?void 0:v,themeClass:x==null?void 0:x.themeClass,onRender:x==null?void 0:x.onRender,hasLoadError:u,shouldStartLoading:k,loaded:B,mergedOnError:r=>{if(!k.value)return;u.value=!0;const{onError:t,imgProps:{onError:f}={}}=e;t==null||t(r),f==null||f(r)},mergedOnLoad:r=>{const{onLoad:t,imgProps:{onLoad:f}={}}=e;t==null||t(r),f==null||f(r),B.value=!0}}},render(){var e,n;const{$slots:o,src:u,mergedClsPrefix:l,lazy:s,onRender:c,loaded:d,hasLoadError:h,imgProps:p={}}=this;c==null||c();let C;const g=!d&&!h&&(this.renderPlaceholder?this.renderPlaceholder():(n=(e=this.$slots).placeholder)===null||n===void 0?void 0:n.call(e));return this.hasLoadError?C=this.renderFallback?this.renderFallback():$e(o.fallback,()=>[b("img",{src:this.fallbackSrc,style:{objectFit:this.objectFit}})]):C=D(o.default,m=>{if(m)return b(_e,{onResize:this.fitTextTransform},{default:()=>b("span",{ref:"textRef",class:`${l}-avatar__text`},m)});if(u||p.src){const a=this.src||p.src;return b("img",Object.assign(Object.assign({},p),{loading:Le&&!this.intersectionObserverOptions&&s?"lazy":"eager",src:s&&this.intersectionObserverOptions?this.shouldStartLoading?a:void 0:a,"data-image-src":a,onLoad:this.mergedOnLoad,onError:this.mergedOnError,style:[p.style||"",{objectFit:this.objectFit},g?{height:"0",width:"0",visibility:"hidden",position:"absolute"}:""]}))}}),b("span",{ref:"selfRef",class:[`${l}-avatar`,this.themeClass],style:this.cssVars},C,s&&g)}}),le=e=>(Ne("data-v-9a498d9c"),e=e(),We(),e),no={class:"bg"},lo=le(()=>K("span",{class:"name"},"Bailey",-1)),so=le(()=>K("span",{class:"zym"},"读万卷书，行万里路",-1)),to=V({__name:"PageHead",setup(e){const n=R(!1);R(null);const o=R(null),u=new IntersectionObserver(([l])=>{l.intersectionRatio===0?n.value=!0:n.value=!1},{threshold:[0,1]});return re(()=>{o.value&&u.observe(o.value)}),ae(()=>{o.value&&u.unobserve(o.value)}),(l,s)=>(Me(),je("div",no,[Y(Fe(ao),{round:!0,size:100,src:"https://myblog-1257298572.cos.ap-shanghai.myqcloud.com/avatar.jpg",bordered:!0}),lo,so,K("div",{ref_key:"navPlaceholder",ref:o,class:"nav-placeholder"},null,512),Y(Oe,{expandNav:n.value},null,8,["expandNav"])]))}}),uo=Ve(to,[["__scopeId","data-v-9a498d9c"]]);export{ho as N,uo as P,Ue as a};
