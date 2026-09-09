import{i as K,l as X,m as q}from"./chunk-ZWT43FEF.js";import{$ as T,$a as L,B as r,C as p,D as M,E as x,Ga as N,H as D,I as _,J as w,K as g,L as f,M as m,N as d,Na as j,O as i,P as h,X as I,Xa as z,Ya as O,Z as y,Zb as V,_ as S,ab as B,ga as P,ia as o,ja as c,k as b,l as C,m as v,na as F,pa as A,pb as $,qa as k,rb as R,sb as G,ta as l,tb as H,wa as u,ya as E}from"./chunk-F6EB5F6Q.js";var et=["*"];var at=new C("MAT_CARD_CONFIG"),Q=(()=>{class e{appearance;constructor(){let t=v(at,{optional:!0});this.appearance=t?.appearance||"raised"}static \u0275fac=function(a){return new(a||e)};static \u0275cmp=p({type:e,selectors:[["mat-card"]],hostAttrs:[1,"mat-mdc-card","mdc-card"],hostVars:8,hostBindings:function(a,s){a&2&&P("mat-mdc-card-outlined",s.appearance==="outlined")("mdc-card--outlined",s.appearance==="outlined")("mat-mdc-card-filled",s.appearance==="filled")("mdc-card--filled",s.appearance==="filled")},inputs:{appearance:"appearance"},exportAs:["matCard"],ngContentSelectors:et,decls:1,vars:0,template:function(a,s){a&1&&(S(),T(0))},styles:[`.mat-mdc-card {
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
`],encapsulation:2,changeDetection:0})}return e})();var U=(()=>{class e{static \u0275fac=function(a){return new(a||e)};static \u0275dir=x({type:e,selectors:[["mat-card-content"]],hostAttrs:[1,"mat-mdc-card-content"]})}return e})();var W=(()=>{class e{static \u0275fac=function(a){return new(a||e)};static \u0275mod=M({type:e});static \u0275inj=b({imports:[j]})}return e})();var it=e=>["/products",e],dt=(e,n)=>n.id;function ot(e,n){if(e&1&&(d(0,"span",11),o(1,"\xB7"),i(),d(2,"span"),o(3),i()),e&2){let t=n.$implicit;r(3),c(t)}}function ct(e,n){if(e&1&&h(0,"app-ghs-pictogram",10),e&2){let t=n.$implicit;m("code",t.code??"")("label",t.label)("size",28)}}var Y=class e{registry=v(V);product=u.required();status=l(()=>K(this.product()));typeLabels=l(()=>{let n=this.registry.productTypes();return this.product().types.map(t=>n.get(t)?.label??t)});pictograms=l(()=>{let n=this.registry.labelElements();return this.product().labelElements.map(t=>n.get(t)).filter(t=>t?.kind==="HazardPictogram").map(t=>t).sort((t,a)=>(t.code??"").localeCompare(a.code??""))});static \u0275fac=function(t){return new(t||e)};static \u0275cmp=p({type:e,selectors:[["app-product-card"]],inputs:{product:[1,"product"]},decls:18,vars:8,consts:[[1,"ob-link-card","product-card",3,"routerLink"],["appearance","outlined"],[1,"product-card-head"],[1,"product-card-title"],[1,"product-card-name"],[1,"product-card-meta"],[1,"product-card-number","app-numeric"],[1,"product-card-status",3,"status","compact"],[1,"product-card-holder"],[1,"product-card-pictograms"],[3,"code","label","size"],["aria-hidden","true",1,"product-card-separator"]],template:function(t,a){t&1&&(d(0,"a",0)(1,"mat-card",1)(2,"mat-card-content")(3,"div",2)(4,"div",3)(5,"h2",4),o(6),i(),d(7,"p",5)(8,"span",6),o(9),i(),g(10,ot,4,1,null,null,w),i()(),h(12,"app-status-badge",7),i(),d(13,"p",8),o(14),i(),d(15,"div",9),g(16,ct,1,3,"app-ghs-pictogram",10,dt),i()()()()),t&2&&(m("routerLink",F(6,it,a.product().id)),r(6),c(a.product().name),r(3),c(a.product().admissionNumber),r(),f(a.typeLabels()),r(2),m("status",a.status())("compact",!0),r(2),c(a.product().holderName),r(2),f(a.pictograms()))},dependencies:[X,W,Q,U,N,q],styles:["[_nghost-%COMP%]{display:block}.product-card[_ngcontent-%COMP%]{display:block;height:100%;color:inherit}mat-card[_ngcontent-%COMP%]{height:100%;border-radius:var(--app-radius)}mat-card-content[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:.375rem;height:100%;padding:1rem 1.125rem .875rem}.product-card-head[_ngcontent-%COMP%]{display:flex;align-items:flex-start;justify-content:space-between;gap:.75rem}.product-card-title[_ngcontent-%COMP%]{min-width:0}.product-card-name[_ngcontent-%COMP%]{margin:0;font-size:1.0625rem;font-weight:700;line-height:1.3}.product-card-meta[_ngcontent-%COMP%]{margin:.125rem 0 0;font-size:.8125rem;color:var(--app-text-muted);word-break:normal;overflow-wrap:normal}.product-card-number[_ngcontent-%COMP%]{font-weight:600;white-space:nowrap}.product-card-separator[_ngcontent-%COMP%]{margin:0 .375rem}.product-card-holder[_ngcontent-%COMP%]{margin:0;font-size:.875rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.product-card-status[_ngcontent-%COMP%]{flex:none}.product-card-pictograms[_ngcontent-%COMP%]{display:flex;gap:.25rem;margin-top:auto;padding-top:.5rem;min-height:1.75rem}"],changeDetection:0})};var mt=(e,n)=>n.id;function lt(e,n){if(e&1&&(d(0,"span",5),o(1),i()),e&2){let t=y().$implicit;r(),c(t.count)}}function st(e,n){if(e&1&&(d(0,"mat-option",2)(1,"span",3)(2,"span",4),o(3),i(),D(4,lt,2,1,"span",5),i()()),e&2){let t=n.$implicit,a=y();m("value",t.id)("disabled",t.count===0&&!a.selected().includes(t.id)),r(3),c(t.label),r(),_(t.count!==void 0?4:-1)}}var Z=class e{labelKey=u.required();options=u.required();selected=E([]);maxNamesInTrigger=u(2);byId=l(()=>new Map(this.options().map(n=>[n.id,n])));triggerLabel=l(()=>{let n=this.selected();return n.length>this.maxNamesInTrigger()?`${n.length}`:n.map(t=>this.byId().get(t)?.label??t).join(", ")});static \u0275fac=function(t){return new(t||e)};static \u0275cmp=p({type:e,selectors:[["app-term-multi-select"]],inputs:{labelKey:[1,"labelKey"],options:[1,"options"],selected:[1,"selected"],maxNamesInTrigger:[1,"maxNamesInTrigger"]},outputs:{selected:"selectedChange"},decls:9,vars:6,consts:[["subscriptSizing","dynamic"],["multiple","",3,"valueChange","value","panelClass"],[3,"value","disabled"],[1,"option"],[1,"option-label"],[1,"option-count","app-numeric"]],template:function(t,a){t&1&&(d(0,"mat-form-field",0)(1,"mat-label"),o(2),A(3,"translate"),i(),d(4,"mat-select",1),I("valueChange",function(tt){return a.selected.set(tt)}),d(5,"mat-select-trigger"),o(6),i(),g(7,st,5,4,"mat-option",2,mt),i()()),t&2&&(r(2),c(k(3,4,a.labelKey())),r(2),m("value",a.selected())("panelClass","ob-select-panel-sm"),r(2),c(a.triggerLabel()),r(),f(a.options()))},dependencies:[B,L,O,H,R,G,$,z],styles:["mat-form-field[_ngcontent-%COMP%]{width:100%}.option[_ngcontent-%COMP%]{display:flex;align-items:baseline;justify-content:space-between;gap:1rem}.option-count[_ngcontent-%COMP%]{color:var(--app-text-muted);font-size:.75rem}"],changeDetection:0})};export{Y as a,Z as b};
