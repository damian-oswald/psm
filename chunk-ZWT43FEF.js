import{$ as S,A as gi,Aa as I,B as s,Ba as ei,C as _,D as vi,E as B,F as Z,G as d,H as g,I as v,K as fi,Ka as ni,L as yi,La as Si,M as L,Ma as Di,N as m,Na as Ai,O as f,Oa as Fi,P as E,Pa as Ti,Pb as K,Q as y,Qa as Ri,R as b,Ra as Pi,S as z,Sa as Oi,Ta as Bi,V as N,W as k,X as w,Xa as j,Y as bi,Z as l,_ as X,aa as Y,ba as Ci,c as F,ca as h,cb as Li,da as p,ea as wi,f as q,fa as xi,fb as zi,ga as H,h as T,ha as V,i as di,ia as x,j as M,ja as J,jb as Ni,k as li,ka as G,kb as ai,l as C,lb as Hi,m as r,ma as ii,n as R,o as P,ob as Vi,p as W,pa as D,q as hi,qa as A,qb as Gi,r as pi,s as $,t as mi,ta as Q,ua as Ii,ub as Qi,v as ui,va as ki,wa as u,x as U,xa as Mi,y as O,ya as Ei,z as _i,za as ti}from"./chunk-F6EB5F6Q.js";var st=["*",[["mat-chip-avatar"],["","matChipAvatar",""]],[["mat-chip-trailing-icon"],["","matChipRemove",""],["","matChipTrailingIcon",""]]],dt=["*","mat-chip-avatar, [matChipAvatar]","mat-chip-trailing-icon,[matChipRemove],[matChipTrailingIcon]"];function lt(t,a){t&1&&(m(0,"span",3),S(1,1),f())}function ht(t,a){t&1&&(m(0,"span",6),S(1,2),f())}var pt=["*"];var mt=new C("mat-chips-default-options",{providedIn:"root",factory:()=>({separatorKeyCodes:[13]})}),ji=new C("MatChipAvatar"),Ki=new C("MatChipTrailingIcon"),qi=new C("MatChipEdit"),oi=new C("MatChipRemove"),Wi=new C("MatChip"),$i=(()=>{class t{_elementRef=r(O);_parentChip=r(Wi);_isPrimary=!0;_isLeading=!1;get disabled(){return this._disabled||this._parentChip?.disabled||!1}set disabled(i){this._disabled=i}_disabled=!1;tabIndex=-1;_allowFocusWhenDisabled=!1;_getDisabledAttribute(){return this.disabled&&!this._allowFocusWhenDisabled?"":null}constructor(){r(ni).load(ai),this._elementRef.nativeElement.nodeName==="BUTTON"&&this._elementRef.nativeElement.setAttribute("type","button")}focus(){this._elementRef.nativeElement.focus()}static \u0275fac=function(e){return new(e||t)};static \u0275dir=B({type:t,selectors:[["","matChipContent",""]],hostAttrs:[1,"mat-mdc-chip-action","mdc-evolution-chip__action","mdc-evolution-chip__action--presentational"],hostVars:8,hostBindings:function(e,n){e&2&&(d("disabled",n._getDisabledAttribute())("aria-disabled",n.disabled),H("mdc-evolution-chip__action--primary",n._isPrimary)("mdc-evolution-chip__action--secondary",!n._isPrimary)("mdc-evolution-chip__action--trailing",!n._isPrimary&&!n._isLeading))},inputs:{disabled:[2,"disabled","disabled",I],tabIndex:[2,"tabIndex","tabIndex",i=>i==null?-1:ei(i)],_allowFocusWhenDisabled:"_allowFocusWhenDisabled"}})}return t})(),Ui=(()=>{class t extends $i{_getTabindex(){return this.disabled&&!this._allowFocusWhenDisabled?null:this.tabIndex.toString()}_handleClick(i){!this.disabled&&this._isPrimary&&(i.preventDefault(),this._parentChip._handlePrimaryActionInteraction())}_handleKeydown(i){(i.keyCode===13||i.keyCode===32)&&!this.disabled&&this._isPrimary&&!this._parentChip._isEditing&&(i.preventDefault(),this._parentChip._handlePrimaryActionInteraction())}static \u0275fac=(()=>{let i;return function(n){return(i||(i=U(t)))(n||t)}})();static \u0275dir=B({type:t,selectors:[["","matChipAction",""]],hostVars:3,hostBindings:function(e,n){e&1&&w("click",function(c){return n._handleClick(c)})("keydown",function(c){return n._handleKeydown(c)}),e&2&&(d("tabindex",n._getTabindex()),H("mdc-evolution-chip__action--presentational",!1))},features:[Z]})}return t})();var Zi=(()=>{class t extends Ui{_isPrimary=!1;_handleClick(i){this.disabled||(i.stopPropagation(),i.preventDefault(),this._parentChip.remove())}_handleKeydown(i){(i.keyCode===13||i.keyCode===32)&&!this.disabled&&(i.stopPropagation(),i.preventDefault(),this._parentChip.remove())}static \u0275fac=(()=>{let i;return function(n){return(i||(i=U(t)))(n||t)}})();static \u0275dir=B({type:t,selectors:[["","matChipRemove",""]],hostAttrs:["role","button",1,"mat-mdc-chip-remove","mat-mdc-chip-trailing-icon","mat-focus-indicator","mdc-evolution-chip__icon","mdc-evolution-chip__icon--trailing"],hostVars:1,hostBindings:function(e,n){e&2&&d("aria-hidden",null)},features:[ii([{provide:oi,useExisting:t}]),Z]})}return t})(),si=(()=>{class t{_changeDetectorRef=r(ti);_elementRef=r(O);_tagName=r(ki);_ngZone=r(mi);_focusMonitor=r(Ri);_globalRippleOptions=r(Hi,{optional:!0});_document=r(pi);_onFocus=new F;_onBlur=new F;_isBasicChip=!1;role=null;_hasFocusInternal=!1;_pendingFocus=!1;_actionChanges;_animationsDisabled=Bi();_allLeadingIcons;_allTrailingIcons;_allEditIcons;_allRemoveIcons;_hasFocus(){return this._hasFocusInternal}id=r(Oi).getId("mat-mdc-chip-");ariaLabel=null;ariaDescription=null;_chipListDisabled=!1;_hadFocusOnRemove=!1;_textElement;get value(){return this._value!==void 0?this._value:this._textElement.textContent.trim()}set value(i){this._value=i}_value;color;removable=!0;highlighted=!1;disableRipple=!1;get disabled(){return this._disabled||this._chipListDisabled}set disabled(i){this._disabled=i}_disabled=!1;removed=new $;destroyed=new $;basicChipAttrName="mat-basic-chip";leadingIcon;editIcon;trailingIcon;removeIcon;primaryAction;_rippleLoader=r(Qi);_injector=r(hi);constructor(){let i=r(ni);i.load(ai),i.load(Si),this._monitorFocus(),this._rippleLoader?.configureRipple(this._elementRef.nativeElement,{className:"mat-mdc-chip-ripple",disabled:this._isRippleDisabled()})}ngOnInit(){this._isBasicChip=this._elementRef.nativeElement.hasAttribute(this.basicChipAttrName)||this._tagName.toLowerCase()===this.basicChipAttrName}ngAfterViewInit(){this._textElement=this._elementRef.nativeElement.querySelector(".mat-mdc-chip-action-label"),this._pendingFocus&&(this._pendingFocus=!1,this.focus())}ngAfterContentInit(){this._actionChanges=q(this._allLeadingIcons.changes,this._allTrailingIcons.changes,this._allEditIcons.changes,this._allRemoveIcons.changes).subscribe(()=>this._changeDetectorRef.markForCheck())}ngDoCheck(){this._rippleLoader.setDisabled(this._elementRef.nativeElement,this._isRippleDisabled())}ngOnDestroy(){this._focusMonitor.stopMonitoring(this._elementRef),this._rippleLoader?.destroyRipple(this._elementRef.nativeElement),this._actionChanges?.unsubscribe(),this.destroyed.emit({chip:this}),this.destroyed.complete()}remove(){this.removable&&(this._hadFocusOnRemove=this._hasFocus(),this.removed.emit({chip:this}))}_isRippleDisabled(){return this.disabled||this.disableRipple||this._animationsDisabled||this._isBasicChip||!this._hasInteractiveActions()||!!this._globalRippleOptions?.disabled}_hasTrailingIcon(){return!!(this.trailingIcon||this.removeIcon)}_handleKeydown(i){(i.keyCode===8&&!i.repeat||i.keyCode===46)&&(i.preventDefault(),this.remove())}focus(){this.disabled||(this.primaryAction?this.primaryAction.focus():this._pendingFocus=!0)}_getSourceAction(i){return this._getActions().find(e=>{let n=e._elementRef.nativeElement;return n===i||n.contains(i)})}_getActions(){let i=[];return this.editIcon&&i.push(this.editIcon),this.primaryAction&&i.push(this.primaryAction),this.removeIcon&&i.push(this.removeIcon),i}_handlePrimaryActionInteraction(){}_hasInteractiveActions(){return this._getActions().length>0}_edit(i){}_monitorFocus(){this._focusMonitor.monitor(this._elementRef,!0).subscribe(i=>{let e=i!==null;e!==this._hasFocusInternal&&(this._hasFocusInternal=e,e?this._onFocus.next({chip:this}):(this._changeDetectorRef.markForCheck(),setTimeout(()=>this._ngZone.run(()=>this._onBlur.next({chip:this})))))})}static \u0275fac=function(e){return new(e||t)};static \u0275cmp=_({type:t,selectors:[["mat-basic-chip"],["","mat-basic-chip",""],["mat-chip"],["","mat-chip",""]],contentQueries:function(e,n,o){if(e&1&&Y(o,ji,5)(o,qi,5)(o,Ki,5)(o,oi,5)(o,ji,5)(o,Ki,5)(o,qi,5)(o,oi,5),e&2){let c;h(c=p())&&(n.leadingIcon=c.first),h(c=p())&&(n.editIcon=c.first),h(c=p())&&(n.trailingIcon=c.first),h(c=p())&&(n.removeIcon=c.first),h(c=p())&&(n._allLeadingIcons=c),h(c=p())&&(n._allTrailingIcons=c),h(c=p())&&(n._allEditIcons=c),h(c=p())&&(n._allRemoveIcons=c)}},viewQuery:function(e,n){if(e&1&&Ci(Ui,5),e&2){let o;h(o=p())&&(n.primaryAction=o.first)}},hostAttrs:[1,"mat-mdc-chip"],hostVars:31,hostBindings:function(e,n){e&1&&w("keydown",function(c){return n._handleKeydown(c)}),e&2&&(k("id",n.id),d("role",n.role)("aria-label",n.ariaLabel),V("mat-"+(n.color||"primary")),H("mdc-evolution-chip",!n._isBasicChip)("mdc-evolution-chip--disabled",n.disabled)("mdc-evolution-chip--with-trailing-action",n._hasTrailingIcon())("mdc-evolution-chip--with-primary-graphic",n.leadingIcon)("mdc-evolution-chip--with-primary-icon",n.leadingIcon)("mdc-evolution-chip--with-avatar",n.leadingIcon)("mat-mdc-chip-with-avatar",n.leadingIcon)("mat-mdc-chip-highlighted",n.highlighted)("mat-mdc-chip-disabled",n.disabled)("mat-mdc-basic-chip",n._isBasicChip)("mat-mdc-standard-chip",!n._isBasicChip)("mat-mdc-chip-with-trailing-icon",n._hasTrailingIcon())("_mat-animation-noopable",n._animationsDisabled))},inputs:{role:"role",id:"id",ariaLabel:[0,"aria-label","ariaLabel"],ariaDescription:[0,"aria-description","ariaDescription"],value:"value",color:"color",removable:[2,"removable","removable",I],highlighted:[2,"highlighted","highlighted",I],disableRipple:[2,"disableRipple","disableRipple",I],disabled:[2,"disabled","disabled",I]},outputs:{removed:"removed",destroyed:"destroyed"},exportAs:["matChip"],features:[ii([{provide:Wi,useExisting:t}])],ngContentSelectors:dt,decls:8,vars:2,consts:[[1,"mat-mdc-chip-focus-overlay"],[1,"mdc-evolution-chip__cell","mdc-evolution-chip__cell--primary"],["matChipContent",""],[1,"mdc-evolution-chip__graphic","mat-mdc-chip-graphic"],[1,"mdc-evolution-chip__text-label","mat-mdc-chip-action-label"],[1,"mat-mdc-chip-primary-focus-indicator","mat-focus-indicator"],[1,"mdc-evolution-chip__cell","mdc-evolution-chip__cell--trailing"]],template:function(e,n){e&1&&(X(st),E(0,"span",0),m(1,"span",1)(2,"span",2),g(3,lt,2,0,"span",3),m(4,"span",4),S(5),E(6,"span",5),f()()(),g(7,ht,2,0,"span",6)),e&2&&(s(3),v(n.leadingIcon?3:-1),s(4),v(n._hasTrailingIcon()?7:-1))},dependencies:[$i],styles:[`.mdc-evolution-chip,
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
`],encapsulation:2,changeDetection:0})}return t})();var Xi=(()=>{class t{_elementRef=r(O);_changeDetectorRef=r(ti);_dir=r(Di,{optional:!0});_lastDestroyedFocusedChipIndex=null;_keyManager;_destroyed=new F;_defaultRole="presentation";get chipFocusChanges(){return this._getChipStream(i=>i._onFocus)}get chipDestroyedChanges(){return this._getChipStream(i=>i.destroyed)}get chipRemovedChanges(){return this._getChipStream(i=>i.removed)}get disabled(){return this._disabled}set disabled(i){this._disabled=i,this._syncChipsState()}_disabled=!1;get empty(){return!this._chips||this._chips.length===0}get role(){return this._explicitRole?this._explicitRole:this.empty?null:this._defaultRole}tabIndex=0;set role(i){this._explicitRole=i}_explicitRole=null;get focused(){return this._hasFocusedChip()}_chips;_chipActions=new _i;constructor(){}ngAfterViewInit(){this._setUpFocusManagement(),this._trackChipSetChanges(),this._trackDestroyedFocusedChip()}ngOnDestroy(){this._keyManager?.destroy(),this._chipActions.destroy(),this._destroyed.next(),this._destroyed.complete()}_hasFocusedChip(){return this._chips&&this._chips.some(i=>i._hasFocus())}_syncChipsState(){this._chips?.forEach(i=>{i._chipListDisabled=this._disabled,i._changeDetectorRef.markForCheck()})}focus(){}_handleKeydown(i){this._originatesFromChip(i)&&this._keyManager.onKeydown(i)}_isValidIndex(i){return i>=0&&i<this._chips.length}_allowFocusEscape(){let i=this._elementRef.nativeElement.tabIndex;i!==-1&&(this._elementRef.nativeElement.tabIndex=-1,setTimeout(()=>this._elementRef.nativeElement.tabIndex=i))}_getChipStream(i){return this._chips.changes.pipe(T(null),di(()=>q(...this._chips.map(i))))}_originatesFromChip(i){let e=i.target;for(;e&&e!==this._elementRef.nativeElement;){if(e.classList.contains("mat-mdc-chip"))return!0;e=e.parentElement}return!1}_setUpFocusManagement(){this._chips.changes.pipe(T(this._chips)).subscribe(i=>{let e=[];i.forEach(n=>n._getActions().forEach(o=>e.push(o))),this._chipActions.reset(e),this._chipActions.notifyOnChanges()}),this._keyManager=new Pi(this._chipActions).withVerticalOrientation().withHorizontalOrientation(this._dir?this._dir.value:"ltr").withHomeAndEnd().skipPredicate(i=>this._skipPredicate(i)),this.chipFocusChanges.pipe(M(this._destroyed)).subscribe(({chip:i})=>{let e=i._getSourceAction(document.activeElement);e&&this._keyManager.updateActiveItem(e)}),this._dir?.change.pipe(M(this._destroyed)).subscribe(i=>this._keyManager.withHorizontalOrientation(i))}_skipPredicate(i){return i.disabled}_trackChipSetChanges(){this._chips.changes.pipe(T(null),M(this._destroyed)).subscribe(()=>{this.disabled&&Promise.resolve().then(()=>this._syncChipsState()),this._redirectDestroyedChipFocus()})}_trackDestroyedFocusedChip(){this.chipDestroyedChanges.pipe(M(this._destroyed)).subscribe(i=>{let n=this._chips.toArray().indexOf(i.chip),o=i.chip._hasFocus(),c=i.chip._hadFocusOnRemove&&this._keyManager.activeItem&&i.chip._getActions().includes(this._keyManager.activeItem),ct=o||c;this._isValidIndex(n)&&ct&&(this._lastDestroyedFocusedChipIndex=n)})}_redirectDestroyedChipFocus(){if(this._lastDestroyedFocusedChipIndex!=null){if(this._chips.length){let i=Math.min(this._lastDestroyedFocusedChipIndex,this._chips.length-1),e=this._chips.toArray()[i];e.disabled?this._chips.length===1?this.focus():this._keyManager.setPreviousItemActive():e.focus()}else this.focus();this._lastDestroyedFocusedChipIndex=null}}static \u0275fac=function(e){return new(e||t)};static \u0275cmp=_({type:t,selectors:[["mat-chip-set"]],contentQueries:function(e,n,o){if(e&1&&Y(o,si,5),e&2){let c;h(c=p())&&(n._chips=c)}},hostAttrs:[1,"mat-mdc-chip-set","mdc-evolution-chip-set"],hostVars:1,hostBindings:function(e,n){e&1&&w("keydown",function(c){return n._handleKeydown(c)}),e&2&&d("role",n.role)},inputs:{disabled:[2,"disabled","disabled",I],role:"role",tabIndex:[2,"tabIndex","tabIndex",i=>i==null?0:ei(i)]},ngContentSelectors:pt,decls:2,vars:0,consts:[["role","presentation",1,"mdc-evolution-chip-set__chips"]],template:function(e,n){e&1&&(X(),y(0,"div",0),S(1),b())},styles:[`.mat-mdc-chip-set {
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
`],encapsulation:2,changeDetection:0})}return t})();var Yi=(()=>{class t{static \u0275fac=function(e){return new(e||t)};static \u0275mod=vi({type:t});static \u0275inj=li({providers:[Gi,{provide:mt,useValue:{separatorKeyCodes:[13]}}],imports:[Vi,Ai]})}return t})();var Ji={PERCENT:"%","GM-PER-L":"g/l",DAY:"unit.day",WK:"unit.week"};function Yt(t){return!!t&&(Ji[t]??"").startsWith("unit.")}function Jt(t){return t?Ji[t]??t:""}function ie(t,a){let i=t[`${a}Value`],e=t[`${a}Min`],n=t[`${a}Max`],o=t[`${a}Unit`];if(!(i===void 0&&e===void 0&&n===void 0))return{value:i===void 0?void 0:Number(i),min:e===void 0?void 0:Number(e),max:n===void 0?void 0:Number(n),unit:o}}function te(t,a){let i=e=>new Intl.NumberFormat(a,{maximumFractionDigits:4}).format(e);return t.min!==void 0&&t.max!==void 0?`${i(t.min)}\u2013${i(t.max)}`:t.min!==void 0?`\u2265 ${i(t.min)}`:t.max!==void 0?`\u2264 ${i(t.max)}`:t.value===void 0?"":i(t.value)}function ee(t,a=new Date){return t.exhaustionDeadline?new Date(t.exhaustionDeadline)<a?"expired":"expiring":"authorised"}function _t(t,a){if(t.length<=a)return t;let i=t.slice(0,a),e=i.lastIndexOf(" ");return`${(e>a*.6?i.slice(0,e):i).trimEnd()}\u2026`}function it(t,a=28){let i=t.code??"";return i.length>0&&i.length<=8&&/[a-z]/iu.test(i)?i:_t(t.label,a)}function tt(t){return t.code?`${t.code} \u2014 ${t.label}`:t.label}function gt(t,a){if(t&1&&(W(),y(0,"svg",0)(1,"title"),x(2),b(),z(3,"path",2),y(4,"text",3),x(5),b()()),t&2){let i=l();d("width",i.size())("height",i.size())("aria-label",i.label()),s(2),J(i.label()),s(3),J(i.code())}}function vt(t,a){if(t&1){let i=N();y(0,"img",4),bi("error",function(){R(i);let n=l();return P(n.failed.set(!0))}),b()}if(t&2){let i=l();k("src",i.source(),gi)("width",i.size())("height",i.size())("alt",i.label())("title",i.label())}}var ft="assets/ghs",et=class t{code=u.required();label=u("");size=u(48);failed=Ii({source:this.code,computation:()=>!1});source(){return`${ft}/${encodeURIComponent(this.code())}.svg`}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=_({type:t,selectors:[["app-ghs-pictogram"]],inputs:{code:[1,"code"],label:[1,"label"],size:[1,"size"]},decls:2,vars:1,consts:[["viewBox","0 0 100 100","role","img"],["loading","lazy","decoding","async",1,"pictogram",3,"src","width","height","alt","title"],["d","M50 2 98 50 50 98 2 50Z",1,"frame"],["x","50","y","50","text-anchor","middle","dominant-baseline","central",1,"code"],["loading","lazy","decoding","async",1,"pictogram",3,"error","src","width","height","alt","title"]],template:function(i,e){i&1&&g(0,gt,6,5,":svg:svg",0)(1,vt,1,5,"img",1),i&2&&v(e.failed()?0:1)},styles:["[_nghost-%COMP%]{display:inline-flex;flex:none}.pictogram[_ngcontent-%COMP%]{display:block;object-fit:contain}.frame[_ngcontent-%COMP%]{fill:#fff;stroke:#d0021b;stroke-width:7;stroke-linejoin:miter}.code[_ngcontent-%COMP%]{fill:#1c2834;font-size:20px;font-weight:700}"],changeDetection:0})};function yt(t,a){if(t&1&&(y(0,"span",1),D(1,"translate"),z(2,"span",2),x(3),D(4,"translate"),b()),t&2){let i=l();V("status-"+i.status()),k("title",A(1,4,"status."+i.status())),s(3),G(" ",A(4,6,(i.compact()?"status.short.":"status.")+i.status())," ")}}var at=class t{status=u.required();compact=u(!1);static \u0275fac=function(i){return new(i||t)};static \u0275cmp=_({type:t,selectors:[["app-status-badge"]],inputs:{status:[1,"status"],compact:[1,"compact"]},decls:1,vars:1,consts:[[1,"status",3,"class","title"],[1,"status",3,"title"],["aria-hidden","true",1,"status-dot"]],template:function(i,e){i&1&&g(0,yt,5,8,"span",0),i&2&&v(e.status()!=="authorised"||!e.compact()?0:-1)},dependencies:[j],styles:[".status[_ngcontent-%COMP%]{display:inline-flex;align-items:center;gap:.375rem;padding:.125rem .5rem .125rem .375rem;border-radius:999px;border:1px solid currentcolor;font-size:.75rem;font-weight:600;line-height:1.4;white-space:nowrap}.status-dot[_ngcontent-%COMP%]{width:.5rem;height:.5rem;border-radius:50%;background:currentcolor}.status-authorised[_ngcontent-%COMP%]{color:#047857}.status-expiring[_ngcontent-%COMP%]{color:#c2410c}.status-expired[_ngcontent-%COMP%]{color:#99191e}"],changeDetection:0})};var bt=(t,a)=>a.id;function Ct(t,a){if(t&1){let i=N();m(0,"mat-chip",4),w("removed",function(){let n=R(i).$implicit,o=l(2);return P(o.remove(n.id))}),x(1),m(2,"button",5),E(3,"mat-icon",6),f()()}if(t&2){let i=a.$implicit,e=l(2);L("title",e.fullLabel(i)),s(),G(" ",e.chipLabel(i)," "),s(),d("aria-label",e.fullLabel(i))}}function wt(t,a){if(t&1&&(m(0,"mat-chip-set",2),D(1,"translate"),fi(2,Ct,4,3,"mat-chip",3,bt),f()),t&2){let i=l();d("aria-label",A(1,1,i.labelKey())),s(2),yi(i.selectedTerms())}}var xt=60,ot=class t{labelKey=u.required();options=u.required();selected=Ei([]);autocomplete=Mi.required(K);search=ui("");byId=Q(()=>new Map(this.options().map(a=>[a.id,a])));selectedTerms=Q(()=>this.selected().map(a=>this.byId().get(a)??{id:a,label:a}));autocompleteOptions=Q(()=>{let a=this.search().trim().toLowerCase(),i=new Set(this.selected()),e=this.options().filter(o=>!i.has(o.id));return(a?e.filter(o=>this.display(o).toLowerCase().includes(a)):e).slice(0,xt).map(o=>({label:o}))});display=a=>!a||typeof a=="string"?"":a.code?`${a.code} \xB7 ${a.label}`:a.label;chipLabel(a){return it(a)}fullLabel(a){return tt(a)}onInput(a){this.search.set(typeof a=="string"?a:"")}add(a){let i=a.label.id;this.selected().includes(i)||this.selected.update(e=>[...e,i]),this.clearInput()}remove(a){this.selected.update(i=>i.filter(e=>e!==a))}clearInput(){this.search.set(""),this.autocomplete().writeValue(null)}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=_({type:t,selectors:[["app-term-select"]],viewQuery:function(i,e){i&1&&wi(e.autocomplete,K,5),i&2&&xi()},inputs:{labelKey:[1,"labelKey"],options:[1,"options"],selected:[1,"selected"]},outputs:{selected:"selectedChange"},decls:3,vars:7,consts:[[1,"term-select"],[3,"ngModelChange","selectedOptionChange","inputLabelKey","noResultKey","autocompleteOptions","displayWith","ngModel","name"],[1,"term-select-chips"],[3,"title"],[3,"removed","title"],["matChipRemove",""],["svgIcon","xmark"]],template:function(i,e){i&1&&(m(0,"div",0)(1,"ob-autocomplete",1),w("ngModelChange",function(o){return e.onInput(o)})("selectedOptionChange",function(o){return e.add(o)}),f(),g(2,wt,4,3,"mat-chip-set",2),f()),i&2&&(s(),L("inputLabelKey",e.labelKey())("noResultKey","common.noOption")("autocompleteOptions",e.autocompleteOptions())("displayWith",e.display)("ngModel",null)("name",e.labelKey()),s(),v(e.selectedTerms().length?2:-1))},dependencies:[Ni,Li,zi,Yi,si,Zi,Xi,Ti,Fi,K,j],styles:[".term-select[_ngcontent-%COMP%]{display:block}.term-select-chips[_ngcontent-%COMP%]{margin-top:.25rem}mat-chip[_ngcontent-%COMP%]{font-size:.8125rem}"],changeDetection:0})};export{Zi as a,si as b,Xi as c,Yi as d,Yt as e,Jt as f,ie as g,te as h,ee as i,it as j,tt as k,et as l,at as m,ot as n};
