import{a as Fe}from"./chunk-EWSLQZK4.js";import{a as Ie,b as Se,c as ke,h as X,i as Me,j as Pe,l as Ee,m as Te}from"./chunk-OP4IZPFF.js";import{$ as dt,$a as Y,$b as J,A as It,Ab as ge,Bb as _e,C as c,Ca as pt,Cb as ve,D,Da as L,Db as fe,E as St,Ea as ht,Eb as ye,F as W,Fb as be,G as st,Gb as Ce,H as w,Ha as Lt,I as x,Ia as Vt,J as I,Ja as Z,K as $,L as A,Lb as we,M as R,Mb as xe,N as _,Na as mt,O as s,Oa as zt,P as d,Pa as Nt,Q as C,Qa as Ht,R as kt,Ra as qt,S as Mt,Sa as Kt,Ua as jt,Va as Gt,W as O,Wa as Qt,X as Pt,Xa as Ut,Y as v,Ya as Wt,Za as $t,_ as g,_a as Zt,a as z,aa as q,ab as Yt,b as N,ba as lt,bb as Xt,c as G,ca as Et,cb as Jt,da as S,db as te,ea as k,eb as ee,f as ot,gb as ie,h as Q,hb as ne,i as ft,ia as V,ib as ae,j as H,ja as Ft,jb as oe,ka as l,kb as ut,l as yt,la as m,lb as ce,m as F,ma as B,n as u,o as y,oa as K,p as b,pa as Tt,qa as Dt,qb as re,r as bt,ra as p,s as Ct,sa as h,sb as se,t as ct,ta as At,tb as de,u as wt,ua as Rt,ub as le,va as P,w as T,wb as pe,x as xt,xb as he,y as rt,ya as Ot,yb as me,z as U,za as Bt,zb as ue}from"./chunk-CJER2Q42.js";var Xe=["*",[["mat-chip-avatar"],["","matChipAvatar",""]],[["mat-chip-trailing-icon"],["","matChipRemove",""],["","matChipTrailingIcon",""]]],Je=["*","mat-chip-avatar, [matChipAvatar]","mat-chip-trailing-icon,[matChipRemove],[matChipTrailingIcon]"];function ti(e,a){e&1&&(s(0,"span",3),q(1,1),d())}function ei(e,a){e&1&&(s(0,"span",6),q(1,2),d())}var ii=["*"];var ni=new F("mat-chips-default-options",{providedIn:"root",factory:()=>({separatorKeyCodes:[13]})}),De=new F("MatChipAvatar"),Ae=new F("MatChipTrailingIcon"),Re=new F("MatChipEdit"),gt=new F("MatChipRemove"),Be=new F("MatChip"),Le=(()=>{class e{_elementRef=u(U);_parentChip=u(Be);_isPrimary=!0;_isLeading=!1;get disabled(){return this._disabled||this._parentChip?.disabled||!1}set disabled(t){this._disabled=t}_disabled=!1;tabIndex=-1;_allowFocusWhenDisabled=!1;_getDisabledAttribute(){return this.disabled&&!this._allowFocusWhenDisabled?"":null}constructor(){u(mt).load(ut),this._elementRef.nativeElement.nodeName==="BUTTON"&&this._elementRef.nativeElement.setAttribute("type","button")}focus(){this._elementRef.nativeElement.focus()}static \u0275fac=function(n){return new(n||e)};static \u0275dir=W({type:e,selectors:[["","matChipContent",""]],hostAttrs:[1,"mat-mdc-chip-action","mdc-evolution-chip__action","mdc-evolution-chip__action--presentational"],hostVars:8,hostBindings:function(n,i){n&2&&(w("disabled",i._getDisabledAttribute())("aria-disabled",i.disabled),V("mdc-evolution-chip__action--primary",i._isPrimary)("mdc-evolution-chip__action--secondary",!i._isPrimary)("mdc-evolution-chip__action--trailing",!i._isPrimary&&!i._isLeading))},inputs:{disabled:[2,"disabled","disabled",L],tabIndex:[2,"tabIndex","tabIndex",t=>t==null?-1:ht(t)],_allowFocusWhenDisabled:"_allowFocusWhenDisabled"}})}return e})(),Ve=(()=>{class e extends Le{_getTabindex(){return this.disabled&&!this._allowFocusWhenDisabled?null:this.tabIndex.toString()}_handleClick(t){!this.disabled&&this._isPrimary&&(t.preventDefault(),this._parentChip._handlePrimaryActionInteraction())}_handleKeydown(t){(t.keyCode===13||t.keyCode===32)&&!this.disabled&&this._isPrimary&&!this._parentChip._isEditing&&(t.preventDefault(),this._parentChip._handlePrimaryActionInteraction())}static \u0275fac=(()=>{let t;return function(i){return(t||(t=rt(e)))(i||e)}})();static \u0275dir=W({type:e,selectors:[["","matChipAction",""]],hostVars:3,hostBindings:function(n,i){n&1&&v("click",function(r){return i._handleClick(r)})("keydown",function(r){return i._handleKeydown(r)}),n&2&&(w("tabindex",i._getTabindex()),V("mdc-evolution-chip__action--presentational",!1))},features:[st]})}return e})();var ze=(()=>{class e extends Ve{_isPrimary=!1;_handleClick(t){this.disabled||(t.stopPropagation(),t.preventDefault(),this._parentChip.remove())}_handleKeydown(t){(t.keyCode===13||t.keyCode===32)&&!this.disabled&&(t.stopPropagation(),t.preventDefault(),this._parentChip.remove())}static \u0275fac=(()=>{let t;return function(i){return(t||(t=rt(e)))(i||e)}})();static \u0275dir=W({type:e,selectors:[["","matChipRemove",""]],hostAttrs:["role","button",1,"mat-mdc-chip-remove","mat-mdc-chip-trailing-icon","mat-focus-indicator","mdc-evolution-chip__icon","mdc-evolution-chip__icon--trailing"],hostVars:1,hostBindings:function(n,i){n&2&&w("aria-hidden",null)},features:[K([{provide:gt,useExisting:e}]),st]})}return e})(),j=(()=>{class e{_changeDetectorRef=u(pt);_elementRef=u(U);_tagName=u(Ot);_ngZone=u(wt);_focusMonitor=u(jt);_globalRippleOptions=u(ce,{optional:!0});_document=u(Ct);_onFocus=new G;_onBlur=new G;_isBasicChip=!1;role=null;_hasFocusInternal=!1;_pendingFocus=!1;_actionChanges;_animationsDisabled=Ut();_allLeadingIcons;_allTrailingIcons;_allEditIcons;_allRemoveIcons;_hasFocus(){return this._hasFocusInternal}id=u(Qt).getId("mat-mdc-chip-");ariaLabel=null;ariaDescription=null;_chipListDisabled=!1;_hadFocusOnRemove=!1;_textElement;get value(){return this._value!==void 0?this._value:this._textElement.textContent.trim()}set value(t){this._value=t}_value;color;removable=!0;highlighted=!1;disableRipple=!1;get disabled(){return this._disabled||this._chipListDisabled}set disabled(t){this._disabled=t}_disabled=!1;removed=new ct;destroyed=new ct;basicChipAttrName="mat-basic-chip";leadingIcon;editIcon;trailingIcon;removeIcon;primaryAction;_rippleLoader=u(he);_injector=u(bt);constructor(){let t=u(mt);t.load(ut),t.load(zt),this._monitorFocus(),this._rippleLoader?.configureRipple(this._elementRef.nativeElement,{className:"mat-mdc-chip-ripple",disabled:this._isRippleDisabled()})}ngOnInit(){this._isBasicChip=this._elementRef.nativeElement.hasAttribute(this.basicChipAttrName)||this._tagName.toLowerCase()===this.basicChipAttrName}ngAfterViewInit(){this._textElement=this._elementRef.nativeElement.querySelector(".mat-mdc-chip-action-label"),this._pendingFocus&&(this._pendingFocus=!1,this.focus())}ngAfterContentInit(){this._actionChanges=ot(this._allLeadingIcons.changes,this._allTrailingIcons.changes,this._allEditIcons.changes,this._allRemoveIcons.changes).subscribe(()=>this._changeDetectorRef.markForCheck())}ngDoCheck(){this._rippleLoader.setDisabled(this._elementRef.nativeElement,this._isRippleDisabled())}ngOnDestroy(){this._focusMonitor.stopMonitoring(this._elementRef),this._rippleLoader?.destroyRipple(this._elementRef.nativeElement),this._actionChanges?.unsubscribe(),this.destroyed.emit({chip:this}),this.destroyed.complete()}remove(){this.removable&&(this._hadFocusOnRemove=this._hasFocus(),this.removed.emit({chip:this}))}_isRippleDisabled(){return this.disabled||this.disableRipple||this._animationsDisabled||this._isBasicChip||!this._hasInteractiveActions()||!!this._globalRippleOptions?.disabled}_hasTrailingIcon(){return!!(this.trailingIcon||this.removeIcon)}_handleKeydown(t){(t.keyCode===8&&!t.repeat||t.keyCode===46)&&(t.preventDefault(),this.remove())}focus(){this.disabled||(this.primaryAction?this.primaryAction.focus():this._pendingFocus=!0)}_getSourceAction(t){return this._getActions().find(n=>{let i=n._elementRef.nativeElement;return i===t||i.contains(t)})}_getActions(){let t=[];return this.editIcon&&t.push(this.editIcon),this.primaryAction&&t.push(this.primaryAction),this.removeIcon&&t.push(this.removeIcon),t}_handlePrimaryActionInteraction(){}_hasInteractiveActions(){return this._getActions().length>0}_edit(t){}_monitorFocus(){this._focusMonitor.monitor(this._elementRef,!0).subscribe(t=>{let n=t!==null;n!==this._hasFocusInternal&&(this._hasFocusInternal=n,n?this._onFocus.next({chip:this}):(this._changeDetectorRef.markForCheck(),setTimeout(()=>this._ngZone.run(()=>this._onBlur.next({chip:this})))))})}static \u0275fac=function(n){return new(n||e)};static \u0275cmp=D({type:e,selectors:[["mat-basic-chip"],["","mat-basic-chip",""],["mat-chip"],["","mat-chip",""]],contentQueries:function(n,i,o){if(n&1&&lt(o,De,5)(o,Re,5)(o,Ae,5)(o,gt,5)(o,De,5)(o,Ae,5)(o,Re,5)(o,gt,5),n&2){let r;S(r=k())&&(i.leadingIcon=r.first),S(r=k())&&(i.editIcon=r.first),S(r=k())&&(i.trailingIcon=r.first),S(r=k())&&(i.removeIcon=r.first),S(r=k())&&(i._allLeadingIcons=r),S(r=k())&&(i._allTrailingIcons=r),S(r=k())&&(i._allEditIcons=r),S(r=k())&&(i._allRemoveIcons=r)}},viewQuery:function(n,i){if(n&1&&Et(Ve,5),n&2){let o;S(o=k())&&(i.primaryAction=o.first)}},hostAttrs:[1,"mat-mdc-chip"],hostVars:31,hostBindings:function(n,i){n&1&&v("keydown",function(r){return i._handleKeydown(r)}),n&2&&(Pt("id",i.id),w("role",i.role)("aria-label",i.ariaLabel),Ft("mat-"+(i.color||"primary")),V("mdc-evolution-chip",!i._isBasicChip)("mdc-evolution-chip--disabled",i.disabled)("mdc-evolution-chip--with-trailing-action",i._hasTrailingIcon())("mdc-evolution-chip--with-primary-graphic",i.leadingIcon)("mdc-evolution-chip--with-primary-icon",i.leadingIcon)("mdc-evolution-chip--with-avatar",i.leadingIcon)("mat-mdc-chip-with-avatar",i.leadingIcon)("mat-mdc-chip-highlighted",i.highlighted)("mat-mdc-chip-disabled",i.disabled)("mat-mdc-basic-chip",i._isBasicChip)("mat-mdc-standard-chip",!i._isBasicChip)("mat-mdc-chip-with-trailing-icon",i._hasTrailingIcon())("_mat-animation-noopable",i._animationsDisabled))},inputs:{role:"role",id:"id",ariaLabel:[0,"aria-label","ariaLabel"],ariaDescription:[0,"aria-description","ariaDescription"],value:"value",color:"color",removable:[2,"removable","removable",L],highlighted:[2,"highlighted","highlighted",L],disableRipple:[2,"disableRipple","disableRipple",L],disabled:[2,"disabled","disabled",L]},outputs:{removed:"removed",destroyed:"destroyed"},exportAs:["matChip"],features:[K([{provide:Be,useExisting:e}])],ngContentSelectors:Je,decls:8,vars:2,consts:[[1,"mat-mdc-chip-focus-overlay"],[1,"mdc-evolution-chip__cell","mdc-evolution-chip__cell--primary"],["matChipContent",""],[1,"mdc-evolution-chip__graphic","mat-mdc-chip-graphic"],[1,"mdc-evolution-chip__text-label","mat-mdc-chip-action-label"],[1,"mat-mdc-chip-primary-focus-indicator","mat-focus-indicator"],[1,"mdc-evolution-chip__cell","mdc-evolution-chip__cell--trailing"]],template:function(n,i){n&1&&(dt(Xe),C(0,"span",0),s(1,"span",1)(2,"span",2),x(3,ti,2,0,"span",3),s(4,"span",4),q(5),C(6,"span",5),d()()(),x(7,ei,2,0,"span",6)),n&2&&(c(3),I(i.leadingIcon?3:-1),c(4),I(i._hasTrailingIcon()?7:-1))},dependencies:[Le],styles:[`.mdc-evolution-chip,
.mdc-evolution-chip__cell,
.mdc-evolution-chip__action {
  display: inline-flex;
  align-items: center;
}

.mdc-evolution-chip {
  position: relative;
  max-width: 100%;
}

.mdc-evolution-chip__cell,
.mdc-evolution-chip__action {
  height: 100%;
}

.mdc-evolution-chip__cell--primary {
  flex-basis: 100%;
  overflow-x: hidden;
}

.mdc-evolution-chip__cell--trailing {
  flex: 1 0 auto;
}

.mdc-evolution-chip__action {
  align-items: center;
  background: none;
  border: none;
  box-sizing: content-box;
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  outline: none;
  padding: 0;
  text-decoration: none;
  color: inherit;
}

.mdc-evolution-chip__action--presentational {
  cursor: auto;
}

.mdc-evolution-chip--disabled,
.mdc-evolution-chip__action:disabled {
  pointer-events: none;
}
@media (forced-colors: active) {
  .mdc-evolution-chip--disabled,
  .mdc-evolution-chip__action:disabled {
    forced-color-adjust: none;
  }
}

.mdc-evolution-chip__action--primary {
  font: inherit;
  letter-spacing: inherit;
  white-space: inherit;
  overflow-x: hidden;
}
.mat-mdc-standard-chip .mdc-evolution-chip__action--primary::before {
  border-width: var(--mat-chip-outline-width, 1px);
  border-radius: var(--mat-chip-container-shape-radius, 8px);
  box-sizing: border-box;
  content: "";
  height: 100%;
  left: 0;
  position: absolute;
  pointer-events: none;
  top: 0;
  width: 100%;
  z-index: 1;
  border-style: solid;
}
.mat-mdc-standard-chip .mdc-evolution-chip__action--primary {
  padding-left: 12px;
  padding-right: 12px;
}
.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary {
  padding-left: 0;
  padding-right: 12px;
}
[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary {
  padding-left: 12px;
  padding-right: 0;
}
.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__action--primary::before {
  border-color: var(--mat-chip-outline-color, var(--mat-sys-outline));
}
.mdc-evolution-chip__action--primary:not(.mdc-evolution-chip__action--presentational):not(.mdc-ripple-upgraded):focus::before {
  border-color: var(--mat-chip-focus-outline-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__action--primary::before {
  border-color: var(--mat-chip-disabled-outline-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));
}
.mat-mdc-standard-chip.mdc-evolution-chip--selected .mdc-evolution-chip__action--primary::before {
  border-width: var(--mat-chip-flat-selected-outline-width, 0);
}
.mat-mdc-basic-chip .mdc-evolution-chip__action--primary {
  font: inherit;
}
.mat-mdc-standard-chip.mdc-evolution-chip--with-leading-action .mdc-evolution-chip__action--primary {
  padding-left: 0;
  padding-right: 12px;
}
[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-leading-action .mdc-evolution-chip__action--primary {
  padding-left: 12px;
  padding-right: 0;
}
.mat-mdc-standard-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary {
  padding-left: 12px;
  padding-right: 0;
}
[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary {
  padding-left: 0;
  padding-right: 12px;
}
.mat-mdc-standard-chip.mdc-evolution-chip--with-leading-action.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary {
  padding-left: 0;
  padding-right: 0;
}
.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary {
  padding-left: 0;
  padding-right: 0;
}
[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary {
  padding-left: 0;
  padding-right: 0;
}
.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary {
  padding-left: 0;
  padding-right: 12px;
}
[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary {
  padding-left: 12px;
  padding-right: 0;
}
.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary {
  padding-left: 0;
  padding-right: 0;
}
[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary {
  padding-left: 0;
  padding-right: 0;
}

.mdc-evolution-chip__action--secondary {
  position: relative;
  overflow: visible;
}
.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__action--secondary {
  color: var(--mat-chip-with-trailing-icon-trailing-icon-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__action--secondary {
  color: var(--mat-chip-with-trailing-icon-disabled-trailing-icon-color, var(--mat-sys-on-surface));
}
.mat-mdc-standard-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--secondary {
  padding-left: 8px;
  padding-right: 8px;
}
.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--secondary {
  padding-left: 8px;
  padding-right: 8px;
}
.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--secondary {
  padding-left: 8px;
  padding-right: 8px;
}
[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--secondary {
  padding-left: 8px;
  padding-right: 8px;
}

.mdc-evolution-chip__text-label {
  -webkit-user-select: none;
  user-select: none;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.mat-mdc-standard-chip .mdc-evolution-chip__text-label {
  font-family: var(--mat-chip-label-text-font, var(--mat-sys-label-large-font));
  line-height: var(--mat-chip-label-text-line-height, var(--mat-sys-label-large-line-height));
  font-size: var(--mat-chip-label-text-size, var(--mat-sys-label-large-size));
  font-weight: var(--mat-chip-label-text-weight, var(--mat-sys-label-large-weight));
  letter-spacing: var(--mat-chip-label-text-tracking, var(--mat-sys-label-large-tracking));
}
.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__text-label {
  color: var(--mat-chip-label-text-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-standard-chip.mdc-evolution-chip--selected:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__text-label {
  color: var(--mat-chip-selected-label-text-color, var(--mat-sys-on-secondary-container));
}
.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__text-label, .mat-mdc-standard-chip.mdc-evolution-chip--selected.mdc-evolution-chip--disabled .mdc-evolution-chip__text-label {
  color: var(--mat-chip-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}

.mdc-evolution-chip__graphic {
  align-items: center;
  display: inline-flex;
  justify-content: center;
  overflow: hidden;
  pointer-events: none;
  position: relative;
  flex: 1 0 auto;
}
.mat-mdc-standard-chip .mdc-evolution-chip__graphic {
  width: var(--mat-chip-with-avatar-avatar-size, 24px);
  height: var(--mat-chip-with-avatar-avatar-size, 24px);
  font-size: var(--mat-chip-with-avatar-avatar-size, 24px);
}
.mdc-evolution-chip--selecting .mdc-evolution-chip__graphic {
  transition: width 150ms 0ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mdc-evolution-chip--selectable:not(.mdc-evolution-chip--selected):not(.mdc-evolution-chip--with-primary-icon) .mdc-evolution-chip__graphic {
  width: 0;
}
.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic {
  padding-left: 6px;
  padding-right: 6px;
}
.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic {
  padding-left: 4px;
  padding-right: 8px;
}
[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic {
  padding-left: 8px;
  padding-right: 4px;
}
.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic {
  padding-left: 6px;
  padding-right: 6px;
}
.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic {
  padding-left: 4px;
  padding-right: 8px;
}
[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic {
  padding-left: 8px;
  padding-right: 4px;
}
.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-leading-action .mdc-evolution-chip__graphic {
  padding-left: 0;
}

.mdc-evolution-chip__checkmark {
  position: absolute;
  opacity: 0;
  top: 50%;
  left: 50%;
  height: 20px;
  width: 20px;
}
.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__checkmark {
  color: var(--mat-chip-with-icon-selected-icon-color, var(--mat-sys-on-secondary-container));
}
.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__checkmark {
  color: var(--mat-chip-with-icon-disabled-icon-color, var(--mat-sys-on-surface));
}
.mdc-evolution-chip--selecting .mdc-evolution-chip__checkmark {
  transition: transform 150ms 0ms cubic-bezier(0.4, 0, 0.2, 1);
  transform: translate(-75%, -50%);
}
.mdc-evolution-chip--selected .mdc-evolution-chip__checkmark {
  transform: translate(-50%, -50%);
  opacity: 1;
}

.mdc-evolution-chip__checkmark-svg {
  display: block;
}

.mdc-evolution-chip__checkmark-path {
  stroke-width: 2px;
  stroke-dasharray: 29.7833385;
  stroke-dashoffset: 29.7833385;
  stroke: currentColor;
}
.mdc-evolution-chip--selecting .mdc-evolution-chip__checkmark-path {
  transition: stroke-dashoffset 150ms 45ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mdc-evolution-chip--selected .mdc-evolution-chip__checkmark-path {
  stroke-dashoffset: 0;
}
@media (forced-colors: active) {
  .mdc-evolution-chip__checkmark-path {
    stroke: CanvasText !important;
  }
}

.mat-mdc-standard-chip .mdc-evolution-chip__icon--trailing {
  height: 18px;
  width: 18px;
  font-size: 18px;
}
.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--trailing.mat-mdc-chip-remove {
  opacity: calc(var(--mat-chip-trailing-action-opacity, 1) * var(--mat-chip-with-trailing-icon-disabled-trailing-icon-opacity, 0.38));
}
.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--trailing.mat-mdc-chip-remove:focus {
  opacity: calc(var(--mat-chip-trailing-action-focus-opacity, 1) * var(--mat-chip-with-trailing-icon-disabled-trailing-icon-opacity, 0.38));
}

.mat-mdc-standard-chip {
  border-radius: var(--mat-chip-container-shape-radius, 8px);
  height: var(--mat-chip-container-height, 32px);
}
.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) {
  background-color: var(--mat-chip-elevated-container-color, transparent);
}
.mat-mdc-standard-chip.mdc-evolution-chip--disabled {
  background-color: var(--mat-chip-elevated-disabled-container-color);
}
.mat-mdc-standard-chip.mdc-evolution-chip--selected:not(.mdc-evolution-chip--disabled) {
  background-color: var(--mat-chip-elevated-selected-container-color, var(--mat-sys-secondary-container));
}
.mat-mdc-standard-chip.mdc-evolution-chip--selected.mdc-evolution-chip--disabled {
  background-color: var(--mat-chip-flat-disabled-selected-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));
}
@media (forced-colors: active) {
  .mat-mdc-standard-chip {
    outline: solid 1px;
  }
}

.mat-mdc-standard-chip .mdc-evolution-chip__icon--primary {
  border-radius: var(--mat-chip-with-avatar-avatar-shape-radius, 24px);
  width: var(--mat-chip-with-icon-icon-size, 18px);
  height: var(--mat-chip-with-icon-icon-size, 18px);
  font-size: var(--mat-chip-with-icon-icon-size, 18px);
}
.mdc-evolution-chip--selected .mdc-evolution-chip__icon--primary {
  opacity: 0;
}
.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__icon--primary {
  color: var(--mat-chip-with-icon-icon-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--primary {
  color: var(--mat-chip-with-icon-disabled-icon-color, var(--mat-sys-on-surface));
}

.mat-mdc-chip-highlighted {
  --mat-chip-with-icon-icon-color: var(--mat-chip-with-icon-selected-icon-color, var(--mat-sys-on-secondary-container));
  --mat-chip-elevated-container-color: var(--mat-chip-elevated-selected-container-color, var(--mat-sys-secondary-container));
  --mat-chip-label-text-color: var(--mat-chip-selected-label-text-color, var(--mat-sys-on-secondary-container));
  --mat-chip-outline-width: var(--mat-chip-flat-selected-outline-width, 0);
}

.mat-mdc-chip-focus-overlay {
  background: var(--mat-chip-focus-state-layer-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-chip-selected .mat-mdc-chip-focus-overlay, .mat-mdc-chip-highlighted .mat-mdc-chip-focus-overlay {
  background: var(--mat-chip-selected-focus-state-layer-color, var(--mat-sys-on-secondary-container));
}
.mat-mdc-chip:hover .mat-mdc-chip-focus-overlay {
  background: var(--mat-chip-hover-state-layer-color, var(--mat-sys-on-surface-variant));
  opacity: var(--mat-chip-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-mdc-chip-focus-overlay .mat-mdc-chip-selected:hover, .mat-mdc-chip-highlighted:hover .mat-mdc-chip-focus-overlay {
  background: var(--mat-chip-selected-hover-state-layer-color, var(--mat-sys-on-secondary-container));
  opacity: var(--mat-chip-selected-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-mdc-chip.cdk-focused .mat-mdc-chip-focus-overlay {
  background: var(--mat-chip-focus-state-layer-color, var(--mat-sys-on-surface-variant));
  opacity: var(--mat-chip-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mat-mdc-chip-selected.cdk-focused .mat-mdc-chip-focus-overlay, .mat-mdc-chip-highlighted.cdk-focused .mat-mdc-chip-focus-overlay {
  background: var(--mat-chip-selected-focus-state-layer-color, var(--mat-sys-on-secondary-container));
  opacity: var(--mat-chip-selected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}

.mdc-evolution-chip--disabled:not(.mdc-evolution-chip--selected) .mat-mdc-chip-avatar {
  opacity: var(--mat-chip-with-avatar-disabled-avatar-opacity, 0.38);
}

.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--trailing {
  opacity: var(--mat-chip-with-trailing-icon-disabled-trailing-icon-opacity, 0.38);
}

.mdc-evolution-chip--disabled.mdc-evolution-chip--selected .mdc-evolution-chip__checkmark {
  opacity: var(--mat-chip-with-icon-disabled-icon-opacity, 0.38);
}

.mat-mdc-standard-chip.mdc-evolution-chip--disabled {
  opacity: var(--mat-chip-disabled-container-opacity, 1);
}
.mat-mdc-standard-chip.mdc-evolution-chip--selected .mdc-evolution-chip__icon--trailing, .mat-mdc-standard-chip.mat-mdc-chip-highlighted .mdc-evolution-chip__icon--trailing {
  color: var(--mat-chip-selected-trailing-icon-color, var(--mat-sys-on-secondary-container));
}
.mat-mdc-standard-chip.mdc-evolution-chip--selected.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--trailing, .mat-mdc-standard-chip.mat-mdc-chip-highlighted.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--trailing {
  color: var(--mat-chip-selected-disabled-trailing-icon-color, var(--mat-sys-on-surface));
}

.mat-mdc-chip-edit, .mat-mdc-chip-remove {
  opacity: var(--mat-chip-trailing-action-opacity, 1);
}
.mat-mdc-chip-edit:focus, .mat-mdc-chip-remove:focus {
  opacity: var(--mat-chip-trailing-action-focus-opacity, 1);
}
.mat-mdc-chip-edit::after, .mat-mdc-chip-remove::after {
  background-color: var(--mat-chip-trailing-action-state-layer-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-chip-edit:hover::after, .mat-mdc-chip-remove:hover::after {
  opacity: calc(var(--mat-chip-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity)) + var(--mat-chip-trailing-action-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity)));
}
.mat-mdc-chip-edit:focus::after, .mat-mdc-chip-remove:focus::after {
  opacity: calc(var(--mat-chip-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity)) + var(--mat-chip-trailing-action-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity)));
}

.mat-mdc-chip-selected .mat-mdc-chip-remove::after,
.mat-mdc-chip-highlighted .mat-mdc-chip-remove::after {
  background-color: var(--mat-chip-selected-trailing-action-state-layer-color, var(--mat-sys-on-secondary-container));
}

.mat-mdc-chip.cdk-focused .mat-mdc-chip-edit:focus::after, .mat-mdc-chip.cdk-focused .mat-mdc-chip-remove:focus::after {
  opacity: calc(var(--mat-chip-selected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity)) + var(--mat-chip-trailing-action-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity)));
}
.mat-mdc-chip.cdk-focused .mat-mdc-chip-edit:hover::after, .mat-mdc-chip.cdk-focused .mat-mdc-chip-remove:hover::after {
  opacity: calc(var(--mat-chip-selected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity)) + var(--mat-chip-trailing-action-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity)));
}

.mat-mdc-standard-chip {
  -webkit-tap-highlight-color: transparent;
}
.mat-mdc-standard-chip .mat-mdc-chip-graphic,
.mat-mdc-standard-chip .mat-mdc-chip-trailing-icon {
  box-sizing: content-box;
}
.mat-mdc-standard-chip._mat-animation-noopable,
.mat-mdc-standard-chip._mat-animation-noopable .mdc-evolution-chip__graphic,
.mat-mdc-standard-chip._mat-animation-noopable .mdc-evolution-chip__checkmark,
.mat-mdc-standard-chip._mat-animation-noopable .mdc-evolution-chip__checkmark-path {
  transition-duration: 1ms;
  animation-duration: 1ms;
}

.mat-mdc-chip-focus-overlay {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  pointer-events: none;
  opacity: 0;
  border-radius: inherit;
  transition: opacity 150ms linear;
}
._mat-animation-noopable .mat-mdc-chip-focus-overlay {
  transition: none;
}
.mat-mdc-basic-chip .mat-mdc-chip-focus-overlay {
  display: none;
}

.mat-mdc-chip .mat-ripple.mat-mdc-chip-ripple {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  pointer-events: none;
  border-radius: inherit;
}

.mat-mdc-chip-avatar {
  text-align: center;
  line-height: 1;
  color: var(--mat-chip-with-icon-icon-color, currentColor);
}

.mat-mdc-chip {
  position: relative;
  z-index: 0;
}

.mat-mdc-chip-action-label {
  text-align: left;
  z-index: 1;
}
[dir=rtl] .mat-mdc-chip-action-label {
  text-align: right;
}
.mat-mdc-chip.mdc-evolution-chip--with-trailing-action .mat-mdc-chip-action-label {
  position: relative;
}
.mat-mdc-chip-action-label .mat-mdc-chip-primary-focus-indicator {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  pointer-events: none;
}
.mat-mdc-chip-action-label .mat-focus-indicator::before {
  margin: calc(calc(var(--mat-focus-indicator-border-width, 3px) + 2px) * -1);
}

.mat-mdc-chip-edit::before, .mat-mdc-chip-remove::before {
  margin: calc(var(--mat-focus-indicator-border-width, 3px) * -1);
  left: 8px;
  right: 8px;
}
.mat-mdc-chip-edit::after, .mat-mdc-chip-remove::after {
  content: "";
  display: block;
  opacity: 0;
  position: absolute;
  top: -3px;
  bottom: -3px;
  left: 5px;
  right: 5px;
  border-radius: 50%;
  box-sizing: border-box;
  padding: 12px;
  margin: -12px;
  background-clip: content-box;
}
.mat-mdc-chip-edit .mat-icon, .mat-mdc-chip-remove .mat-icon {
  width: 18px;
  height: 18px;
  font-size: 18px;
  box-sizing: content-box;
}

.mat-chip-edit-input {
  cursor: text;
  display: inline-block;
  color: inherit;
  outline: 0;
}

@media (forced-colors: active) {
  .mat-mdc-chip-selected:not(.mat-mdc-chip-multiple) {
    outline-width: 3px;
  }
}

.mat-mdc-chip-action:focus-visible .mat-focus-indicator::before {
  content: "";
}

.mdc-evolution-chip__icon, .mat-mdc-chip-edit .mat-icon, .mat-mdc-chip-remove .mat-icon {
  min-height: fit-content;
}

img.mdc-evolution-chip__icon {
  min-height: 0;
}
`],encapsulation:2,changeDetection:0})}return e})();var tt=(()=>{class e{_elementRef=u(U);_changeDetectorRef=u(pt);_dir=u(Nt,{optional:!0});_lastDestroyedFocusedChipIndex=null;_keyManager;_destroyed=new G;_defaultRole="presentation";get chipFocusChanges(){return this._getChipStream(t=>t._onFocus)}get chipDestroyedChanges(){return this._getChipStream(t=>t.destroyed)}get chipRemovedChanges(){return this._getChipStream(t=>t.removed)}get disabled(){return this._disabled}set disabled(t){this._disabled=t,this._syncChipsState()}_disabled=!1;get empty(){return!this._chips||this._chips.length===0}get role(){return this._explicitRole?this._explicitRole:this.empty?null:this._defaultRole}tabIndex=0;set role(t){this._explicitRole=t}_explicitRole=null;get focused(){return this._hasFocusedChip()}_chips;_chipActions=new It;constructor(){}ngAfterViewInit(){this._setUpFocusManagement(),this._trackChipSetChanges(),this._trackDestroyedFocusedChip()}ngOnDestroy(){this._keyManager?.destroy(),this._chipActions.destroy(),this._destroyed.next(),this._destroyed.complete()}_hasFocusedChip(){return this._chips&&this._chips.some(t=>t._hasFocus())}_syncChipsState(){this._chips?.forEach(t=>{t._chipListDisabled=this._disabled,t._changeDetectorRef.markForCheck()})}focus(){}_handleKeydown(t){this._originatesFromChip(t)&&this._keyManager.onKeydown(t)}_isValidIndex(t){return t>=0&&t<this._chips.length}_allowFocusEscape(){let t=this._elementRef.nativeElement.tabIndex;t!==-1&&(this._elementRef.nativeElement.tabIndex=-1,setTimeout(()=>this._elementRef.nativeElement.tabIndex=t))}_getChipStream(t){return this._chips.changes.pipe(Q(null),ft(()=>ot(...this._chips.map(t))))}_originatesFromChip(t){let n=t.target;for(;n&&n!==this._elementRef.nativeElement;){if(n.classList.contains("mat-mdc-chip"))return!0;n=n.parentElement}return!1}_setUpFocusManagement(){this._chips.changes.pipe(Q(this._chips)).subscribe(t=>{let n=[];t.forEach(i=>i._getActions().forEach(o=>n.push(o))),this._chipActions.reset(n),this._chipActions.notifyOnChanges()}),this._keyManager=new Gt(this._chipActions).withVerticalOrientation().withHorizontalOrientation(this._dir?this._dir.value:"ltr").withHomeAndEnd().skipPredicate(t=>this._skipPredicate(t)),this.chipFocusChanges.pipe(H(this._destroyed)).subscribe(({chip:t})=>{let n=t._getSourceAction(document.activeElement);n&&this._keyManager.updateActiveItem(n)}),this._dir?.change.pipe(H(this._destroyed)).subscribe(t=>this._keyManager.withHorizontalOrientation(t))}_skipPredicate(t){return t.disabled}_trackChipSetChanges(){this._chips.changes.pipe(Q(null),H(this._destroyed)).subscribe(()=>{this.disabled&&Promise.resolve().then(()=>this._syncChipsState()),this._redirectDestroyedChipFocus()})}_trackDestroyedFocusedChip(){this.chipDestroyedChanges.pipe(H(this._destroyed)).subscribe(t=>{let i=this._chips.toArray().indexOf(t.chip),o=t.chip._hasFocus(),r=t.chip._hadFocusOnRemove&&this._keyManager.activeItem&&t.chip._getActions().includes(this._keyManager.activeItem),f=o||r;this._isValidIndex(i)&&f&&(this._lastDestroyedFocusedChipIndex=i)})}_redirectDestroyedChipFocus(){if(this._lastDestroyedFocusedChipIndex!=null){if(this._chips.length){let t=Math.min(this._lastDestroyedFocusedChipIndex,this._chips.length-1),n=this._chips.toArray()[t];n.disabled?this._chips.length===1?this.focus():this._keyManager.setPreviousItemActive():n.focus()}else this.focus();this._lastDestroyedFocusedChipIndex=null}}static \u0275fac=function(n){return new(n||e)};static \u0275cmp=D({type:e,selectors:[["mat-chip-set"]],contentQueries:function(n,i,o){if(n&1&&lt(o,j,5),n&2){let r;S(r=k())&&(i._chips=r)}},hostAttrs:[1,"mat-mdc-chip-set","mdc-evolution-chip-set"],hostVars:1,hostBindings:function(n,i){n&1&&v("keydown",function(r){return i._handleKeydown(r)}),n&2&&w("role",i.role)},inputs:{disabled:[2,"disabled","disabled",L],role:"role",tabIndex:[2,"tabIndex","tabIndex",t=>t==null?0:ht(t)]},ngContentSelectors:ii,decls:2,vars:0,consts:[["role","presentation",1,"mdc-evolution-chip-set__chips"]],template:function(n,i){n&1&&(dt(),kt(0,"div",0),q(1),Mt())},styles:[`.mat-mdc-chip-set {
  display: flex;
}
.mat-mdc-chip-set:focus {
  outline: none;
}
.mat-mdc-chip-set .mdc-evolution-chip-set__chips {
  min-width: 100%;
  margin-left: -8px;
  margin-right: 0;
}
.mat-mdc-chip-set .mdc-evolution-chip {
  margin: 4px 0 4px 8px;
}
[dir=rtl] .mat-mdc-chip-set .mdc-evolution-chip-set__chips {
  margin-left: 0;
  margin-right: -8px;
}
[dir=rtl] .mat-mdc-chip-set .mdc-evolution-chip {
  margin-left: 0;
  margin-right: 8px;
}

.mdc-evolution-chip-set__chips {
  display: flex;
  flex-flow: wrap;
  min-width: 0;
}

.mat-mdc-chip-set-stacked {
  flex-direction: column;
  align-items: flex-start;
}
.mat-mdc-chip-set-stacked .mat-mdc-chip {
  width: 100%;
}
.mat-mdc-chip-set-stacked .mdc-evolution-chip__graphic {
  flex-grow: 0;
}
.mat-mdc-chip-set-stacked .mdc-evolution-chip__action--primary {
  flex-basis: 100%;
  justify-content: start;
}

input.mat-mdc-chip-input {
  flex: 1 0 150px;
  margin-left: 8px;
}
[dir=rtl] input.mat-mdc-chip-input {
  margin-left: 0;
  margin-right: 8px;
}
.mat-mdc-form-field:not(.mat-form-field-hide-placeholder) input.mat-mdc-chip-input::placeholder {
  opacity: 1;
}
.mat-mdc-form-field:not(.mat-form-field-hide-placeholder) input.mat-mdc-chip-input::-moz-placeholder {
  opacity: 1;
}
.mat-mdc-form-field:not(.mat-form-field-hide-placeholder) input.mat-mdc-chip-input::-webkit-input-placeholder {
  opacity: 1;
}
.mat-mdc-form-field:not(.mat-form-field-hide-placeholder) input.mat-mdc-chip-input:-ms-input-placeholder {
  opacity: 1;
}
.mat-mdc-chip-set + input.mat-mdc-chip-input {
  margin-left: 0;
  margin-right: 0;
}
`],encapsulation:2,changeDetection:0})}return e})();var et=(()=>{class e{static \u0275fac=function(n){return new(n||e)};static \u0275mod=St({type:e});static \u0275inj=yt({providers:[de,{provide:ni,useValue:{separatorKeyCodes:[13]}}],imports:[re,Ht]})}return e})();var oi=e=>["/products",e],ci=(e,a)=>a.product.id;function ri(e,a){if(e&1&&(s(0,"mat-chip",7),l(1),d()),e&2){let t=a.$implicit;c(),m(t)}}function si(e,a){if(e&1&&(s(0,"tr")(1,"th",3)(2,"a",4),l(3),s(4,"span",5),l(5),d()()(),s(6,"td")(7,"mat-chip-set",6),A(8,ri,2,1,"mat-chip",7,$),d()(),s(10,"td"),l(11),d(),s(12,"td"),l(13),d(),s(14,"td"),C(15,"app-status-badge",8),d()()),e&2){let t=a.$implicit;c(2),_("routerLink",Tt(7,oi,t.product.id)),c(),B(" ",t.product.name," "),c(2),B("(",t.product.admissionNumber,")"),c(3),R(t.categories),c(3),m(t.product.holderName),c(2),m(t.activeSubstances),c(2),_("status",t.status)("compact",!0)}}var it=class e{registry=u(J);products=Bt.required();rows=P(()=>{let a=this.registry.productTypes(),t=this.registry.substances(),n=this.registry.activeSubstances();return this.products().map(i=>({product:i,status:X(i),categories:i.types.map(o=>a.get(o)?.label??o),activeSubstances:i.substances.filter(o=>n.has(o)).map(o=>t.get(o)?.label??o).sort((o,r)=>o.localeCompare(r)).join(", ")}))});static \u0275fac=function(t){return new(t||e)};static \u0275cmp=D({type:e,selectors:[["app-product-table"]],inputs:{products:[1,"products"]},decls:22,vars:15,consts:[[1,"app-scroll-x","product-table-scroll"],[1,"ob-table","ob-table-sm","product-table"],["scope","col"],["scope","row",1,"product-table-name"],[3,"routerLink"],[1,"product-table-number"],[1,"product-table-chips"],["disableRipple",""],[3,"status","compact"]],template:function(t,n){t&1&&(s(0,"div",0)(1,"table",1)(2,"thead")(3,"tr")(4,"th",2),l(5),p(6,"translate"),d(),s(7,"th",2),l(8),p(9,"translate"),d(),s(10,"th",2),l(11),p(12,"translate"),d(),s(13,"th",2),l(14),p(15,"translate"),d(),s(16,"th",2),l(17),p(18,"translate"),d()()(),s(19,"tbody"),A(20,si,16,9,"tr",null,ci),d()()()),t&2&&(c(5),m(h(6,5,"product.name")),c(3),m(h(9,7,"product.category")),c(3),m(h(12,9,"product.holder")),c(3),m(h(15,11,"product.activeSubstances")),c(3),m(h(18,13,"filter.status")),c(3),R(n.rows()))},dependencies:[et,j,tt,Z,Ee,Y],styles:["[_nghost-%COMP%]{display:block}.product-table-scroll[_ngcontent-%COMP%]{background:var(--app-surface);border:var(--app-border);border-radius:var(--app-radius)}.product-table[_ngcontent-%COMP%]{width:100%;margin:0;font-size:.875rem}.product-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], .product-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{vertical-align:middle}.product-table-name[_ngcontent-%COMP%]{font-weight:700}.product-table-number[_ngcontent-%COMP%]{font-weight:400;white-space:nowrap}.product-table-chips[_ngcontent-%COMP%]{word-break:normal;overflow-wrap:normal}.product-table-chips[_ngcontent-%COMP%]   mat-chip[_ngcontent-%COMP%]{--mat-chip-container-height: 1.375rem;--mat-chip-label-text-size: .75rem;margin:.125rem .25rem .125rem 0;pointer-events:none}"],changeDetection:0})};var E=["crops","pests","holders","substances","statuses"],Ke=["holders","statuses"],di=["holders","substances","statuses"],nt={text:"",crops:[],pests:[],holders:[],substances:[],statuses:[]};function je(e){return E.reduce((a,t)=>a+e[t].length,0)+(e.text?1:0)}function Ge(e,a){switch(a){case"holders":return e.holder?[e.holder]:[];case"substances":return e.substances;case"statuses":return[X(e)]}}function li(e,a,t){return!a.length&&!t.length?!0:a.length?t.length?a.every(n=>t.every(i=>e.uses.some(o=>o.crops.includes(n)&&o.pests.includes(i)))):a.every(n=>e.uses.some(i=>i.crops.includes(n))):t.every(n=>e.uses.some(i=>i.pests.includes(n)))}function pi(e,a){return a?a.toLowerCase().split(/\s+/u).every(t=>e.haystack.includes(t)):!0}function at(e,a,t){if(!pi(e,a.text))return!1;for(let n of di){if(n===t)continue;let i=Ge(e,n);if(!a[n].every(o=>i.includes(o)))return!1}return li(e,t==="crops"?[]:a.crops,t==="pests"?[]:a.pests)}function Qe(e,a,t){switch(a){case"crops":return He(t.pests,n=>mi(e,n).flatMap(i=>i.crops));case"pests":return He(t.crops,n=>hi(e,n).flatMap(i=>i.pests));default:return Ge(e,a)}}function hi(e,a){return a?e.uses.filter(t=>t.crops.includes(a)):e.uses}function mi(e,a){return a?e.uses.filter(t=>t.pests.includes(a)):e.uses}function He(e,a){let t;for(let n of e.length?e:[""]){let i=new Set(a(n));t=t?new Set([...t].filter(o=>i.has(o))):i}return[...t??[]]}function Ue(e,a,t,n){switch(t){case"name":return e.name.localeCompare(a.name);case"number":return e.admissionNumber.localeCompare(a.admissionNumber,void 0,{numeric:!0});case"holder":return(e.holderName??"").localeCompare(a.holderName??"")||e.name.localeCompare(a.name);case"relevance":return qe(a,n)-qe(e,n)||e.name.localeCompare(a.name)}}function qe(e,a){if(!a)return 0;let t=a.toLowerCase(),n=e.name.toLowerCase();return n===t||e.admissionNumber.toLowerCase()===t?4:n.startsWith(t)?3:n.includes(t)?2:1}function We(e,a,t,n="cards"){let i={};e.text&&(i.q=e.text);for(let o of E)e[o].length&&(i[o]=e[o].join("~"));return a!=="relevance"&&(i.sort=a),t>0&&(i.page=String(t+1)),n!=="cards"&&(i.view=n),i}function $e(e){let a=r=>typeof e[r]=="string"&&e[r]?e[r].split("~"):[],t=N(z({},nt),{text:typeof e.q=="string"?e.q:""});for(let r of E)t[r]=a(r);let n=["name","number","holder","relevance"].find(r=>r===e.sort)??"relevance",i=Math.max(0,Number(e.page??1)-1)||0,o=e.view==="table"?"table":"cards";return{filters:t,sort:n,page:i,view:o}}var ui=(e,a)=>({count:e,total:a}),gi=(e,a)=>a.facet+a.id,_i=(e,a)=>a.id;function vi(e,a){if(e&1&&(s(0,"ob-alert",2)(1,"p"),l(2),p(3,"translate"),d(),s(4,"p",5),l(5),d()()),e&2){let t=g();c(2),m(h(3,2,"common.error")),c(3),m(t.registry.error())}}function fi(e,a){e&1&&(s(0,"p",3),l(1),p(2,"translate"),d()),e&2&&(c(),m(h(2,1,"common.loading")))}function yi(e,a){if(e&1){let t=O();s(0,"button",34),v("click",function(){y(t);let i=g(2);return b(i.reset())}),l(1),p(2,"translate"),d()}e&2&&(c(),m(h(2,1,"common.clearAll")))}function bi(e,a){if(e&1){let t=O();s(0,"button",35),p(1,"translate"),v("click",function(){y(t);let i=g(2);return b(i.setText(""))}),C(2,"mat-icon",36),d()}e&2&&w("aria-label",h(1,1,"common.reset"))}function Ci(e,a){if(e&1&&(s(0,"mat-option",22),l(1),p(2,"translate"),d()),e&2){let t=a.$implicit;_("value",t),c(),m(h(2,2,"search.sort."+t))}}function wi(e,a){if(e&1&&(s(0,"span",30),l(1),d()),e&2){let t=g(2);c(),m(t.activeCount())}}function xi(e,a){if(e&1){let t=O();s(0,"mat-chip",39),v("removed",function(){let i=y(t).$implicit,o=g(3);return b(o.removeBadge(i.facet,i.id))}),s(1,"span",40),l(2),d(),l(3),s(4,"button",41),C(5,"mat-icon",36),d()()}if(e&2){let t=a.$implicit;_("title",t.facetLabel+": "+t.fullLabel),c(2),m(t.facetLabel),c(),B(" ",t.label," "),c(),w("aria-label",t.facetLabel+": "+t.fullLabel)}}function Ii(e,a){if(e&1&&(s(0,"div",31)(1,"span",37),l(2),p(3,"translate"),d(),s(4,"mat-chip-set"),A(5,xi,6,4,"mat-chip",38,gi),d()()),e&2){let t=g(2);c(2),m(h(3,1,"search.activeFilters")),c(3),R(t.activeBadges())}}function Si(e,a){if(e&1&&C(0,"app-product-table",42),e&2){let t=g(3);_("products",t.pageProducts())}}function ki(e,a){if(e&1&&C(0,"app-product-card",45),e&2){let t=a.$implicit;_("product",t)}}function Mi(e,a){if(e&1&&(s(0,"div",43),A(1,ki,1,1,"app-product-card",45,_i),d()),e&2){let t=g(3);c(),R(t.pageProducts())}}function Pi(e,a){if(e&1){let t=O();x(0,Si,1,1,"app-product-table",42)(1,Mi,3,0,"div",43),s(2,"mat-paginator",44),v("page",function(i){y(t);let o=g(2);return b(o.onPage(i))}),d()}if(e&2){let t=g(2);I(t.view()==="table"?0:1),c(2),_("length",t.matching().length)("pageIndex",t.page())("pageSize",t.pageSize())("pageSizeOptions",t.pageSizes)}}function Ei(e,a){if(e&1){let t=O();s(0,"div",33)(1,"p",46),l(2),p(3,"translate"),d(),s(4,"p"),l(5),p(6,"translate"),d(),s(7,"button",47),v("click",function(){y(t);let i=g(2);return b(i.reset())}),l(8),p(9,"translate"),d()()}e&2&&(c(2),m(h(3,3,"common.noResults")),c(3),m(h(6,5,"common.noResultsHint")),c(3),m(h(9,7,"common.clearAll")))}function Fi(e,a){if(e&1){let t=O();s(0,"div",4)(1,"aside",6)(2,"div",7)(3,"h2"),l(4),p(5,"translate"),d(),x(6,yi,3,3,"button",8),d(),s(7,"div",9)(8,"app-term-dropdown",10),v("selectedChange",function(i){y(t);let o=g();return b(o.setFacet("crops",i))}),d(),s(9,"app-term-dropdown",10),v("selectedChange",function(i){y(t);let o=g();return b(o.setFacet("pests",i))}),d(),s(10,"app-term-dropdown",11),v("selectedChange",function(i){y(t);let o=g();return b(o.setFacet("holders",i))}),d(),s(11,"app-term-dropdown",10),v("selectedChange",function(i){y(t);let o=g();return b(o.setFacet("substances",i))}),d(),s(12,"app-term-dropdown",11),v("selectedChange",function(i){y(t);let o=g();return b(o.setFacet("statuses",i))}),d()(),s(13,"p",12)(14,"a",13),l(15),p(16,"translate"),d()()(),s(17,"main",14)(18,"div",15)(19,"mat-form-field",16)(20,"mat-label"),l(21),p(22,"translate"),d(),C(23,"mat-icon",17),s(24,"input",18),p(25,"translate"),v("ngModelChange",function(i){y(t);let o=g();return b(o.setText(i))}),d(),x(26,bi,3,3,"button",19),d(),s(27,"mat-form-field",20)(28,"mat-label"),l(29),p(30,"translate"),d(),s(31,"mat-select",21),v("valueChange",function(i){y(t);let o=g();return b(o.sort.set(i))}),A(32,Ci,3,4,"mat-option",22,$),d()(),s(34,"mat-button-toggle-group",23),p(35,"translate"),v("change",function(i){y(t);let o=g();return b(o.view.set(i.value))}),s(36,"mat-button-toggle",24),p(37,"translate"),p(38,"translate"),C(39,"mat-icon",25),d(),s(40,"mat-button-toggle",26),p(41,"translate"),p(42,"translate"),C(43,"mat-icon",27),d()(),s(44,"button",28),v("click",function(){y(t);let i=g();return b(i.panelOpen.set(!i.panelOpen()))}),C(45,"mat-icon",29),l(46),p(47,"translate"),x(48,wi,2,1,"span",30),d()(),x(49,Ii,7,3,"div",31),s(50,"p",32),l(51),p(52,"translate"),d(),x(53,Pi,3,5)(54,Ei,10,9,"div",33),d()()}if(e&2){let t=g();c(),V("search-panel-closed",!t.panelOpen()),c(3),m(h(5,39,"search.filters")),c(2),I(t.activeCount()?6:-1),c(2),_("labelKey","filter.crop")("options",t.facetOptions().crops)("selected",t.filters().crops),c(),_("labelKey","filter.pest")("options",t.facetOptions().pests)("selected",t.filters().pests),c(),_("multiple",!1)("labelKey","filter.holder")("options",t.facetOptions().holders)("selected",t.filters().holders),c(),_("labelKey","filter.substance")("options",t.facetOptions().substances)("selected",t.filters().substances),c(),_("multiple",!1)("labelKey","filter.status")("options",t.facetOptions().statuses)("selected",t.filters().statuses),c(3),m(h(16,41,"search.moreFilters")),c(6),m(h(22,43,"search.label")),c(3),_("placeholder",h(25,45,"search.placeholder"))("ngModel",t.filters().text),c(2),I(t.filters().text?26:-1),c(3),m(h(30,47,"search.sortLabel")),c(2),_("value",t.sort()),c(),R(t.sortKeys),c(2),_("value",t.view()),w("aria-label",h(35,49,"search.viewLabel")),c(2),_("matTooltip",h(37,51,"search.view.cards")),w("aria-label",h(38,53,"search.view.cards")),c(4),_("matTooltip",h(41,55,"search.view.table")),w("aria-label",h(42,57,"search.view.table")),c(6),B(" ",h(47,59,t.panelOpen()?"search.closeFilters":"search.openFilters")," "),c(2),I(t.activeCount()?48:-1),c(),I(t.activeBadges().length?49:-1),c(2),B(" ",At(52,61,"search.results",Dt(64,ui,t.matching().length,t.registry.products().length))," "),c(2),I(t.matching().length?53:54)}}var Ti=[12,24,48,96],Di=12,Ze=class e{registry=u(J);router=u(Vt);route=u(Lt);translate=u(Zt);pageSizes=Ti;sortKeys=["relevance","name","number","holder"];filters=T(nt);sort=T("relevance");page=T(0);pageSize=T(Di);view=T("cards");panelOpen=T(typeof window>"u"||window.matchMedia("(min-width: 1100px)").matches);activeCount=P(()=>je(this.filters()));matching=P(()=>{let a=this.filters();return this.registry.products().filter(n=>at(n,a)).sort((n,i)=>Ue(n,i,this.sort(),a.text))});pageProducts=P(()=>{let a=this.page()*this.pageSize();return this.matching().slice(a,a+this.pageSize())});facetOptions=P(()=>{let a=this.filters(),t=this.registry.products(),n={},i=new Map(E.map(r=>[r,new Map])),o=(r,f)=>{let M=i.get(r);for(let vt of Qe(f,r,a))M.set(vt,(M.get(vt)??0)+1)};for(let r of t)if(at(r,a))for(let f of E)o(f,r);else for(let f of Ke)at(r,a,f)&&o(f,r);for(let r of E)n[r]=this.decorate(r,i.get(r),a[r]);return n});activeBadges=P(()=>{let a=this.filters(),t=this.facetOptions(),n=[];for(let i of E)for(let o of a[i]){let r=t[i].find(f=>f.id===o)??{id:o,label:o};n.push({facet:i,id:o,label:Me(r,34),fullLabel:Pe(r),facetLabel:this.translate.instant(Ai[i])})}return n});constructor(){let a=$e(this.route.snapshot.queryParams);this.filters.set(a.filters),this.sort.set(a.sort),this.page.set(a.page),this.view.set(a.view),xt(()=>{let t=We(this.filters(),this.sort(),this.page(),this.view());Rt(()=>{this.router.navigate([],{relativeTo:this.route,queryParams:t,replaceUrl:!0})})})}setText(a){this.filters.update(t=>N(z({},t),{text:a})),this.page.set(0)}setFacet(a,t){this.filters.update(n=>N(z({},n),{[a]:t})),this.page.set(0)}toggleValue(a,t,n){let i=this.filters()[a];this.setFacet(a,n?[...i,t]:i.filter(o=>o!==t))}removeBadge(a,t){this.toggleValue(a,t,!1)}reset(){this.filters.set(nt),this.sort.set("relevance"),this.page.set(0)}onPage(a){this.page.set(a.pageIndex),this.pageSize.set(a.pageSize)}trackProduct(a,t){return t.id}decorate(a,t,n){let i=this.labelSource(a);return[...new Set([...t.keys(),...n])].map(f=>{let M=i?.get(f);return{id:f,label:M?.label??this.fallbackLabel(a,f),code:M?.code,count:t.get(f)??0}}).sort((f,M)=>(M.count??0)-(f.count??0)||f.label.localeCompare(M.label))}labelSource(a){switch(a){case"crops":return this.registry.crops();case"pests":return this.registry.pests();case"holders":return this.registry.holders();case"substances":return this.registry.substances();case"statuses":return}}fallbackLabel(a,t){return a==="statuses"?this.translate.instant(`status.${t}`):t}static \u0275fac=function(t){return new(t||e)};static \u0275cmp=D({type:e,selectors:[["app-product-search"]],features:[K([{provide:_e,useClass:Ce}])],decls:12,vars:7,consts:[[1,"app-page","search"],[1,"app-page-header"],["type","error"],[1,"search-loading"],[1,"search-layout"],[1,"app-muted"],[1,"search-panel"],[1,"search-panel-head"],["mat-button","","type","button"],[1,"search-facets"],[3,"selectedChange","labelKey","options","selected"],[3,"selectedChange","multiple","labelKey","options","selected"],[1,"search-panel-more"],["routerLink","/query"],[1,"search-results"],[1,"search-bar","app-surface"],["subscriptSizing","dynamic",1,"search-field"],["matPrefix","","svgIcon","search"],["matInput","","type","search","name","query","autocomplete","off",3,"ngModelChange","placeholder","ngModel"],["matSuffix","","mat-icon-button","","type","button"],["subscriptSizing","dynamic",1,"search-sort"],[3,"valueChange","value"],[3,"value"],["hideSingleSelectionIndicator","",1,"search-view",3,"change","value"],["value","cards",3,"matTooltip"],["svgIcon","grid"],["value","table",3,"matTooltip"],["svgIcon","list"],["mat-stroked-button","","type","button",1,"search-panel-toggle",3,"click"],["svgIcon","filter"],[1,"search-panel-toggle-count"],[1,"search-badges"],[1,"search-count","app-muted"],[1,"app-empty","app-surface"],["mat-button","","type","button",3,"click"],["matSuffix","","mat-icon-button","","type","button",3,"click"],["svgIcon","xmark"],[1,"app-field-label"],[3,"title"],[3,"removed","title"],[1,"badge-facet"],["matChipRemove",""],[3,"products"],[1,"search-grid"],[3,"page","length","pageIndex","pageSize","pageSizeOptions"],[3,"product"],[1,"search-empty-title"],["mat-stroked-button","","type","button",3,"click"]],template:function(t,n){t&1&&(s(0,"div",0)(1,"header",1)(2,"div")(3,"h1"),l(4),p(5,"translate"),d(),s(6,"p"),l(7),p(8,"translate"),d()()(),x(9,vi,6,4,"ob-alert",2)(10,fi,3,3,"p",3)(11,Fi,55,67,"div",4),d()),t&2&&(c(4),m(h(5,3,"app.title")),c(3),m(h(8,5,"app.subtitle")),c(2),I(n.registry.status()==="error"?9:n.registry.status()==="loading"?10:11))},dependencies:[oe,ie,ne,ae,ge,ue,me,ke,Ie,Se,et,j,ze,tt,ee,te,Yt,Xt,Jt,Kt,qt,be,ye,fe,ve,pe,le,se,$t,Wt,xe,we,Z,Fe,it,Te,Y],styles:['.search-layout[_ngcontent-%COMP%]{display:grid;grid-template-columns:var(--app-panel-width) minmax(0,1fr);gap:24px;align-items:start}@media(max-width:1099px){.search-layout[_ngcontent-%COMP%]{grid-template-columns:minmax(0,1fr)}}.search-panel[_ngcontent-%COMP%]{position:sticky;top:5rem;max-height:calc(100vh - 7rem);overflow-y:auto;overscroll-behavior:contain;padding:16px 16px 24px;background:var(--app-surface);border:var(--app-border);border-radius:var(--app-radius)}@media(max-width:1099px){.search-panel[_ngcontent-%COMP%]{position:static;max-height:none;order:2}}.search-panel-closed[_ngcontent-%COMP%]{display:none}@media(min-width:1100px){.search-panel-closed[_ngcontent-%COMP%]{display:block}}.search-panel-head[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:8px}.search-panel-head[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{margin:0;font-size:1rem;font-weight:700}.search-facets[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:.75rem;padding-top:12px;border-top:var(--app-border)}.search-panel-more[_ngcontent-%COMP%]{margin:16px 0 0;padding-top:12px;border-top:var(--app-border);font-size:.875rem}.search-results[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:16px;min-width:0}.search-bar[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;align-items:flex-start;gap:12px;padding:12px}.search-field[_ngcontent-%COMP%]{flex:3 1 22rem}.search-sort[_ngcontent-%COMP%]{flex:1 1 12rem}.search-view[_ngcontent-%COMP%]{flex:none;align-self:flex-end;margin-bottom:-1px;--mat-button-toggle-height: 2.375rem;--mat-button-toggle-shape: var(--app-radius);--mat-button-toggle-selected-state-background-color: var(--app-control-active);--mat-button-toggle-selected-state-text-color: #fff}.search-view[_ngcontent-%COMP%]   .mat-icon[_ngcontent-%COMP%]{width:1.375rem;height:1.375rem;vertical-align:middle}.search-panel-toggle[_ngcontent-%COMP%]{align-self:center}@media(min-width:1100px){.search-panel-toggle[_ngcontent-%COMP%]{display:none}}.search-panel-toggle-count[_ngcontent-%COMP%]{display:inline-flex;align-items:center;justify-content:center;min-width:1.25rem;height:1.25rem;margin-left:.375rem;padding:0 .25rem;border-radius:999px;background:var(--app-accent);color:#fff;font-size:.6875rem;font-weight:700}.search-badges[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;align-items:center;gap:8px}.search-badges[_ngcontent-%COMP%]   .app-field-label[_ngcontent-%COMP%]{margin:0}.badge-facet[_ngcontent-%COMP%]{margin-right:.375rem;font-weight:700;opacity:.7}.badge-facet[_ngcontent-%COMP%]:after{content:":"}.search-count[_ngcontent-%COMP%]{margin:0;font-size:.875rem}.search-grid[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(auto-fill,minmax(19rem,1fr));gap:16px}.search-loading[_ngcontent-%COMP%]{padding:48px 0;color:var(--app-text-muted)}.search-empty-title[_ngcontent-%COMP%]{font-size:1.125rem;font-weight:700;color:#1c2834}'],changeDetection:0})},Ai={crops:"filter.crop",pests:"filter.pest",holders:"filter.holder",substances:"filter.substance",statuses:"filter.status"};export{Ze as ProductSearchPage};
