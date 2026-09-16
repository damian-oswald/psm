import{h as k,k as F,l as T}from"./chunk-OP4IZPFF.js";import{$ as x,$b as P,C as d,D as l,E as b,F as C,Ja as A,K as M,L as g,M as f,N as p,O as i,P as n,Q as v,Qa as S,aa as D,ia as w,ka as c,l as h,la as m,m as y,n as s,pa as _,va as u,za as I}from"./chunk-CJER2Q42.js";var N=["*"];var B=new y("MAT_CARD_CONFIG"),j=(()=>{class e{appearance;constructor(){let t=s(B,{optional:!0});this.appearance=t?.appearance||"raised"}static \u0275fac=function(a){return new(a||e)};static \u0275cmp=l({type:e,selectors:[["mat-card"]],hostAttrs:[1,"mat-mdc-card","mdc-card"],hostVars:8,hostBindings:function(a,o){a&2&&w("mat-mdc-card-outlined",o.appearance==="outlined")("mdc-card--outlined",o.appearance==="outlined")("mat-mdc-card-filled",o.appearance==="filled")("mdc-card--filled",o.appearance==="filled")},inputs:{appearance:"appearance"},exportAs:["matCard"],ngContentSelectors:N,decls:1,vars:0,template:function(a,o){a&1&&(x(),D(0))},styles:[`.mat-mdc-card {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  position: relative;
  border-style: solid;
  border-width: 0;
  background-color: var(--mat-card-elevated-container-color, var(--mat-sys-surface-container-low));
  border-color: var(--mat-card-elevated-container-color, var(--mat-sys-surface-container-low));
  border-radius: var(--mat-card-elevated-container-shape, var(--mat-sys-corner-medium));
  box-shadow: var(--mat-card-elevated-container-elevation, var(--mat-sys-level1));
}
.mat-mdc-card::after {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: solid 1px transparent;
  content: "";
  display: block;
  pointer-events: none;
  box-sizing: border-box;
  border-radius: var(--mat-card-elevated-container-shape, var(--mat-sys-corner-medium));
}

.mat-mdc-card-outlined {
  background-color: var(--mat-card-outlined-container-color, var(--mat-sys-surface));
  border-radius: var(--mat-card-outlined-container-shape, var(--mat-sys-corner-medium));
  border-width: var(--mat-card-outlined-outline-width, 1px);
  border-color: var(--mat-card-outlined-outline-color, var(--mat-sys-outline-variant));
  box-shadow: var(--mat-card-outlined-container-elevation, var(--mat-sys-level0));
}
.mat-mdc-card-outlined::after {
  border: none;
}

.mat-mdc-card-filled {
  background-color: var(--mat-card-filled-container-color, var(--mat-sys-surface-container-highest));
  border-radius: var(--mat-card-filled-container-shape, var(--mat-sys-corner-medium));
  box-shadow: var(--mat-card-filled-container-elevation, var(--mat-sys-level0));
}

.mdc-card__media {
  position: relative;
  box-sizing: border-box;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
.mdc-card__media::before {
  display: block;
  content: "";
}
.mdc-card__media:first-child {
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
}
.mdc-card__media:last-child {
  border-bottom-left-radius: inherit;
  border-bottom-right-radius: inherit;
}

.mat-mdc-card-actions {
  display: flex;
  flex-direction: row;
  align-items: center;
  box-sizing: border-box;
  min-height: 52px;
  padding: 8px;
}

.mat-mdc-card-title {
  font-family: var(--mat-card-title-text-font, var(--mat-sys-title-large-font));
  line-height: var(--mat-card-title-text-line-height, var(--mat-sys-title-large-line-height));
  font-size: var(--mat-card-title-text-size, var(--mat-sys-title-large-size));
  letter-spacing: var(--mat-card-title-text-tracking, var(--mat-sys-title-large-tracking));
  font-weight: var(--mat-card-title-text-weight, var(--mat-sys-title-large-weight));
}

.mat-mdc-card-subtitle {
  color: var(--mat-card-subtitle-text-color, var(--mat-sys-on-surface));
  font-family: var(--mat-card-subtitle-text-font, var(--mat-sys-title-medium-font));
  line-height: var(--mat-card-subtitle-text-line-height, var(--mat-sys-title-medium-line-height));
  font-size: var(--mat-card-subtitle-text-size, var(--mat-sys-title-medium-size));
  letter-spacing: var(--mat-card-subtitle-text-tracking, var(--mat-sys-title-medium-tracking));
  font-weight: var(--mat-card-subtitle-text-weight, var(--mat-sys-title-medium-weight));
}

.mat-mdc-card-title,
.mat-mdc-card-subtitle {
  display: block;
  margin: 0;
}
.mat-mdc-card-avatar ~ .mat-mdc-card-header-text .mat-mdc-card-title,
.mat-mdc-card-avatar ~ .mat-mdc-card-header-text .mat-mdc-card-subtitle {
  padding: 16px 16px 0;
}

.mat-mdc-card-header {
  display: flex;
  padding: 16px 16px 0;
}

.mat-mdc-card-content {
  display: block;
  padding: 0 16px;
}
.mat-mdc-card-content:first-child {
  padding-top: 16px;
}
.mat-mdc-card-content:last-child {
  padding-bottom: 16px;
}

.mat-mdc-card-title-group {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.mat-mdc-card-avatar {
  height: 40px;
  width: 40px;
  border-radius: 50%;
  flex-shrink: 0;
  margin-bottom: 16px;
  object-fit: cover;
}
.mat-mdc-card-avatar ~ .mat-mdc-card-header-text .mat-mdc-card-subtitle,
.mat-mdc-card-avatar ~ .mat-mdc-card-header-text .mat-mdc-card-title {
  line-height: normal;
}

.mat-mdc-card-sm-image {
  width: 80px;
  height: 80px;
}

.mat-mdc-card-md-image {
  width: 112px;
  height: 112px;
}

.mat-mdc-card-lg-image {
  width: 152px;
  height: 152px;
}

.mat-mdc-card-xl-image {
  width: 240px;
  height: 240px;
}

.mat-mdc-card-subtitle ~ .mat-mdc-card-title,
.mat-mdc-card-title ~ .mat-mdc-card-subtitle,
.mat-mdc-card-header .mat-mdc-card-header-text .mat-mdc-card-title,
.mat-mdc-card-header .mat-mdc-card-header-text .mat-mdc-card-subtitle,
.mat-mdc-card-title-group .mat-mdc-card-title,
.mat-mdc-card-title-group .mat-mdc-card-subtitle {
  padding-top: 0;
}

.mat-mdc-card-content > :last-child:not(.mat-mdc-card-footer) {
  margin-bottom: 0;
}

.mat-mdc-card-actions-align-end {
  justify-content: flex-end;
}
`],encapsulation:2,changeDetection:0})}return e})();var E=(()=>{class e{static \u0275fac=function(a){return new(a||e)};static \u0275dir=C({type:e,selectors:[["mat-card-content"]],hostAttrs:[1,"mat-mdc-card-content"]})}return e})();var z=(()=>{class e{static \u0275fac=function(a){return new(a||e)};static \u0275mod=b({type:e});static \u0275inj=h({imports:[S]})}return e})();var G=e=>["/products",e],H=(e,r)=>r.id;function V(e,r){if(e&1&&(i(0,"span",11),c(1,"\xB7"),n(),i(2,"span"),c(3),n()),e&2){let t=r.$implicit;d(3),m(t)}}function X(e,r){if(e&1&&v(0,"app-ghs-pictogram",10),e&2){let t=r.$implicit;p("code",t.code??"")("label",t.label)("size",28)}}var O=class e{registry=s(P);product=I.required();status=u(()=>k(this.product()));typeLabels=u(()=>{let r=this.registry.productTypes();return this.product().types.map(t=>r.get(t)?.label??t)});pictograms=u(()=>{let r=this.registry.labelElements();return this.product().labelElements.map(t=>r.get(t)).filter(t=>t?.kind==="HazardPictogram").map(t=>t).sort((t,a)=>(t.code??"").localeCompare(a.code??""))});static \u0275fac=function(t){return new(t||e)};static \u0275cmp=l({type:e,selectors:[["app-product-card"]],inputs:{product:[1,"product"]},decls:18,vars:8,consts:[[1,"ob-link-card","product-card",3,"routerLink"],["appearance","outlined"],[1,"product-card-head"],[1,"product-card-title"],[1,"product-card-name"],[1,"product-card-meta"],[1,"product-card-number","app-numeric"],[1,"product-card-status",3,"status","compact"],[1,"product-card-holder"],[1,"product-card-pictograms"],[3,"code","label","size"],["aria-hidden","true",1,"product-card-separator"]],template:function(t,a){t&1&&(i(0,"a",0)(1,"mat-card",1)(2,"mat-card-content")(3,"div",2)(4,"div",3)(5,"h2",4),c(6),n(),i(7,"p",5)(8,"span",6),c(9),n(),g(10,V,4,1,null,null,M),n()(),v(12,"app-status-badge",7),n(),i(13,"p",8),c(14),n(),i(15,"div",9),g(16,X,1,3,"app-ghs-pictogram",10,H),n()()()()),t&2&&(p("routerLink",_(6,G,a.product().id)),d(6),m(a.product().name),d(3),m(a.product().admissionNumber),d(),f(a.typeLabels()),d(2),p("status",a.status())("compact",!0),d(2),m(a.product().holderName),d(2),f(a.pictograms()))},dependencies:[F,z,j,E,A,T],styles:["[_nghost-%COMP%]{display:block}.product-card[_ngcontent-%COMP%]{display:block;height:100%;color:inherit}mat-card[_ngcontent-%COMP%]{height:100%;border-radius:var(--app-radius)}mat-card-content[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:.375rem;height:100%;padding:1rem 1.125rem .875rem}.product-card-head[_ngcontent-%COMP%]{display:flex;align-items:flex-start;justify-content:space-between;gap:.75rem}.product-card-title[_ngcontent-%COMP%]{min-width:0}.product-card-name[_ngcontent-%COMP%]{margin:0;font-size:1.0625rem;font-weight:700;line-height:1.3}.product-card-meta[_ngcontent-%COMP%]{margin:.125rem 0 0;font-size:.8125rem;color:var(--app-text-muted);word-break:normal;overflow-wrap:normal}.product-card-number[_ngcontent-%COMP%]{font-weight:600;white-space:nowrap}.product-card-separator[_ngcontent-%COMP%]{margin:0 .375rem}.product-card-holder[_ngcontent-%COMP%]{margin:0;font-size:.875rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.product-card-status[_ngcontent-%COMP%]{flex:none}.product-card-pictograms[_ngcontent-%COMP%]{display:flex;gap:.25rem;margin-top:auto;padding-top:.5rem;min-height:1.75rem}"],changeDetection:0})};export{O as a};
