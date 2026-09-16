import{$ as ie,$a as R,Aa as ve,B as q,Ba as Q,C as r,Ca as H,D as T,Da as v,E as ee,F as te,H as x,I as b,J as h,L as ne,M as oe,N as y,Na as ye,O as l,P as d,Pa as xe,Q as E,Qa as Ce,R as S,Ra as ke,S as I,Sa as Te,T as P,Ta as Me,Ua as we,W as B,Wa as j,X as N,Xa as Se,Y as C,Ya as Ie,Z as ae,Za as De,_ as s,aa as re,ab as Ee,ba as le,ca as se,da as z,db as Be,ea as $,eb as Oe,fa as de,fb as Ge,ga as ce,ha as ue,ia as U,ja as ge,k as Z,ka as p,kb as Pe,l as Y,la as f,m as V,ma as pe,mb as Ne,n as m,o as M,oa as me,p as w,pa as be,pb as Re,q as J,qb as Ae,ra as c,rb as Le,sa as g,sb as Fe,t as O,ta as he,ub as Ve,va as k,vb as ze,w as G,wa as fe,wb as $e,xa as _e,z as X,za as _}from"./chunk-CJER2Q42.js";var it=["button"],rt=["*"];function lt(t,a){if(t&1&&(l(0,"div",2),E(1,"mat-pseudo-checkbox",6),d()),t&2){let e=s();r(),y("disabled",e.disabled)}}var Ue=new V("MAT_BUTTON_TOGGLE_DEFAULT_OPTIONS",{providedIn:"root",factory:()=>({hideSingleSelectionIndicator:!1,hideMultipleSelectionIndicator:!1,disabledInteractive:!1})}),Qe=new V("MatButtonToggleGroup"),st={provide:Ge,useExisting:Z(()=>W),multi:!0},A=class{source;value;constructor(a,e){this.source=a,this.value=e}},W=(()=>{class t{_changeDetector=m(H);_dir=m(xe,{optional:!0});_multiple=!1;_disabled=!1;_disabledInteractive=!1;_selectionModel;_rawValue;_controlValueAccessorChangeFn=()=>{};_onTouched=()=>{};_buttonToggles;appearance;get name(){return this._name}set name(e){this._name=e,this._markButtonsForCheck()}_name=m(j).getId("mat-button-toggle-group-");vertical=!1;get value(){let e=this._selectionModel?this._selectionModel.selected:[];return this.multiple?e.map(o=>o.value):e[0]?e[0].value:void 0}set value(e){this._setSelectionByValue(e),this.valueChange.emit(this.value)}valueChange=new O;get selected(){let e=this._selectionModel?this._selectionModel.selected:[];return this.multiple?e:e[0]||null}get multiple(){return this._multiple}set multiple(e){this._multiple=e,this._markButtonsForCheck()}get disabled(){return this._disabled}set disabled(e){this._disabled=e,this._markButtonsForCheck()}get disabledInteractive(){return this._disabledInteractive}set disabledInteractive(e){this._disabledInteractive=e,this._markButtonsForCheck()}get dir(){return this._dir&&this._dir.value==="rtl"?"rtl":"ltr"}change=new O;get hideSingleSelectionIndicator(){return this._hideSingleSelectionIndicator}set hideSingleSelectionIndicator(e){this._hideSingleSelectionIndicator=e,this._markButtonsForCheck()}_hideSingleSelectionIndicator;get hideMultipleSelectionIndicator(){return this._hideMultipleSelectionIndicator}set hideMultipleSelectionIndicator(e){this._hideMultipleSelectionIndicator=e,this._markButtonsForCheck()}_hideMultipleSelectionIndicator;constructor(){let e=m(Ue,{optional:!0});this.appearance=e&&e.appearance?e.appearance:"standard",this._hideSingleSelectionIndicator=e?.hideSingleSelectionIndicator??!1,this._hideMultipleSelectionIndicator=e?.hideMultipleSelectionIndicator??!1}ngOnInit(){this._selectionModel=new Re(this.multiple,void 0,!1)}ngAfterContentInit(){this._selectionModel.select(...this._buttonToggles.filter(e=>e.checked)),this.multiple||this._initializeTabIndex()}writeValue(e){this.value=e,this._changeDetector.markForCheck()}registerOnChange(e){this._controlValueAccessorChangeFn=e}registerOnTouched(e){this._onTouched=e}setDisabledState(e){this.disabled=e}_keydown(e){if(this.multiple||this.disabled||Me(e))return;let n=e.target.id,i=this._buttonToggles.toArray().findIndex(D=>D.buttonId===n),u=null;switch(e.keyCode){case 32:case 13:u=this._buttonToggles.get(i)||null;break;case 38:u=this._getNextButton(i,-1);break;case 37:u=this._getNextButton(i,this.dir==="ltr"?-1:1);break;case 40:u=this._getNextButton(i,1);break;case 39:u=this._getNextButton(i,this.dir==="ltr"?1:-1);break;default:return}u&&(e.preventDefault(),u._onButtonClick(),u.focus())}_emitChangeEvent(e){let o=new A(e,this.value);this._rawValue=o.value,this._controlValueAccessorChangeFn(o.value),this.change.emit(o)}_syncButtonToggle(e,o,n=!1,i=!1){!this.multiple&&this.selected&&!e.checked&&(this.selected.checked=!1),this._selectionModel?o?this._selectionModel.select(e):this._selectionModel.deselect(e):i=!0,i?Promise.resolve().then(()=>this._updateModelValue(e,n)):this._updateModelValue(e,n)}_isSelected(e){return this._selectionModel&&this._selectionModel.isSelected(e)}_isPrechecked(e){return typeof this._rawValue>"u"?!1:this.multiple&&Array.isArray(this._rawValue)?this._rawValue.some(o=>e.value!=null&&o===e.value):e.value===this._rawValue}_initializeTabIndex(){if(this._buttonToggles.forEach(e=>{e.tabIndex=-1}),this.selected)this.selected.tabIndex=0;else for(let e=0;e<this._buttonToggles.length;e++){let o=this._buttonToggles.get(e);if(!o.disabled){o.tabIndex=0;break}}}_getNextButton(e,o){let n=this._buttonToggles;for(let i=1;i<=n.length;i++){let u=(e+o*i+n.length)%n.length,D=n.get(u);if(D&&!D.disabled)return D}return null}_setSelectionByValue(e){if(this._rawValue=e,!this._buttonToggles)return;let o=this._buttonToggles.toArray();if(this.multiple&&e?(Array.isArray(e),this._clearSelection(),e.forEach(n=>this._selectValue(n,o))):(this._clearSelection(),this._selectValue(e,o)),!this.multiple&&o.every(n=>n.tabIndex===-1)){for(let n of o)if(!n.disabled){n.tabIndex=0;break}}}_clearSelection(){this._selectionModel.clear(),this._buttonToggles.forEach(e=>{e.checked=!1,this.multiple||(e.tabIndex=-1)})}_selectValue(e,o){for(let n of o)if(n.value===e){n.checked=!0,this._selectionModel.select(n),this.multiple||(n.tabIndex=0);break}}_updateModelValue(e,o){o&&this._emitChangeEvent(e),this.valueChange.emit(this.value)}_markButtonsForCheck(){this._buttonToggles?.forEach(e=>e._markForCheck())}static \u0275fac=function(o){return new(o||t)};static \u0275dir=te({type:t,selectors:[["mat-button-toggle-group"]],contentQueries:function(o,n,i){if(o&1&&le(i,L,5),o&2){let u;z(u=$())&&(n._buttonToggles=u)}},hostAttrs:[1,"mat-button-toggle-group"],hostVars:6,hostBindings:function(o,n){o&1&&C("keydown",function(u){return n._keydown(u)}),o&2&&(x("role",n.multiple?"group":"radiogroup")("aria-disabled",n.disabled),U("mat-button-toggle-vertical",n.vertical)("mat-button-toggle-group-appearance-standard",n.appearance==="standard"))},inputs:{appearance:"appearance",name:"name",vertical:[2,"vertical","vertical",v],value:"value",multiple:[2,"multiple","multiple",v],disabled:[2,"disabled","disabled",v],disabledInteractive:[2,"disabledInteractive","disabledInteractive",v],hideSingleSelectionIndicator:[2,"hideSingleSelectionIndicator","hideSingleSelectionIndicator",v],hideMultipleSelectionIndicator:[2,"hideMultipleSelectionIndicator","hideMultipleSelectionIndicator",v]},outputs:{valueChange:"valueChange",change:"change"},exportAs:["matButtonToggleGroup"],features:[me([st,{provide:Qe,useExisting:t}])]})}return t})(),L=(()=>{class t{_changeDetectorRef=m(H);_elementRef=m(X);_focusMonitor=m(we);_idGenerator=m(j);_animationDisabled=Se();_checked=!1;ariaLabel;ariaLabelledby=null;_buttonElement;buttonToggleGroup;get buttonId(){return`${this.id}-button`}id;name;value;get tabIndex(){return this._tabIndex()}set tabIndex(e){this._tabIndex.set(e)}_tabIndex;disableRipple=!1;get appearance(){return this.buttonToggleGroup?this.buttonToggleGroup.appearance:this._appearance}set appearance(e){this._appearance=e}_appearance;get checked(){return this.buttonToggleGroup?this.buttonToggleGroup._isSelected(this):this._checked}set checked(e){e!==this._checked&&(this._checked=e,this.buttonToggleGroup&&this.buttonToggleGroup._syncButtonToggle(this,this._checked),this._changeDetectorRef.markForCheck())}get disabled(){return this._disabled||this.buttonToggleGroup&&this.buttonToggleGroup.disabled}set disabled(e){this._disabled=e}_disabled=!1;get disabledInteractive(){return this._disabledInteractive||this.buttonToggleGroup!==null&&this.buttonToggleGroup.disabledInteractive}set disabledInteractive(e){this._disabledInteractive=e}_disabledInteractive;change=new O;constructor(){m(ye).load(Pe);let e=m(Qe,{optional:!0}),o=m(new _e("tabindex"),{optional:!0})||"",n=m(Ue,{optional:!0});this._tabIndex=G(parseInt(o)||0),this.buttonToggleGroup=e,this._appearance=n&&n.appearance?n.appearance:"standard",this._disabledInteractive=n?.disabledInteractive??!1}ngOnInit(){let e=this.buttonToggleGroup;this.id=this.id||this._idGenerator.getId("mat-button-toggle-"),e&&(e._isPrechecked(this)?this.checked=!0:e._isSelected(this)!==this._checked&&e._syncButtonToggle(this,this._checked))}ngAfterViewInit(){this._animationDisabled||this._elementRef.nativeElement.classList.add("mat-button-toggle-animations-enabled"),this._focusMonitor.monitor(this._elementRef,!0)}ngOnDestroy(){let e=this.buttonToggleGroup;this._focusMonitor.stopMonitoring(this._elementRef),e&&e._isSelected(this)&&e._syncButtonToggle(this,!1,!1,!0)}focus(e){this._buttonElement.nativeElement.focus(e)}_onButtonClick(){if(this.disabled)return;let e=this.isSingleSelector()?!0:!this._checked;if(e!==this._checked&&(this._checked=e,this.buttonToggleGroup&&(this.buttonToggleGroup._syncButtonToggle(this,this._checked,!0),this.buttonToggleGroup._onTouched())),this.isSingleSelector()){let o=this.buttonToggleGroup._buttonToggles.find(n=>n.tabIndex===0);o&&(o.tabIndex=-1),this.tabIndex=0}this.change.emit(new A(this,this.value))}_markForCheck(){this._changeDetectorRef.markForCheck()}_getButtonName(){return this.isSingleSelector()?this.buttonToggleGroup.name:this.name||null}isSingleSelector(){return this.buttonToggleGroup&&!this.buttonToggleGroup.multiple}static \u0275fac=function(o){return new(o||t)};static \u0275cmp=T({type:t,selectors:[["mat-button-toggle"]],viewQuery:function(o,n){if(o&1&&se(it,5),o&2){let i;z(i=$())&&(n._buttonElement=i.first)}},hostAttrs:["role","presentation",1,"mat-button-toggle"],hostVars:14,hostBindings:function(o,n){o&1&&C("focus",function(){return n.focus()}),o&2&&(x("aria-label",null)("aria-labelledby",null)("id",n.id)("name",null),U("mat-button-toggle-standalone",!n.buttonToggleGroup)("mat-button-toggle-checked",n.checked)("mat-button-toggle-disabled",n.disabled)("mat-button-toggle-disabled-interactive",n.disabledInteractive)("mat-button-toggle-appearance-standard",n.appearance==="standard"))},inputs:{ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],id:"id",name:"name",value:"value",tabIndex:"tabIndex",disableRipple:[2,"disableRipple","disableRipple",v],appearance:"appearance",checked:[2,"checked","checked",v],disabled:[2,"disabled","disabled",v],disabledInteractive:[2,"disabledInteractive","disabledInteractive",v]},outputs:{change:"change"},exportAs:["matButtonToggle"],ngContentSelectors:rt,decls:7,vars:13,consts:[["button",""],["type","button",1,"mat-button-toggle-button","mat-focus-indicator",3,"click","id","disabled"],[1,"mat-button-toggle-checkbox-wrapper"],[1,"mat-button-toggle-label-content"],[1,"mat-button-toggle-focus-overlay"],["matRipple","",1,"mat-button-toggle-ripple",3,"matRippleTrigger","matRippleDisabled"],["state","checked","aria-hidden","true","appearance","minimal",3,"disabled"]],template:function(o,n){if(o&1&&(ie(),l(0,"button",1,0),C("click",function(){return n._onButtonClick()}),b(2,lt,2,1,"div",2),l(3,"span",3),re(4),d()(),E(5,"span",4)(6,"span",5)),o&2){let i=ue(1);y("id",n.buttonId)("disabled",n.disabled&&!n.disabledInteractive||null),x("role",n.isSingleSelector()?"radio":"button")("tabindex",n.disabled&&!n.disabledInteractive?-1:n.tabIndex)("aria-pressed",n.isSingleSelector()?null:n.checked)("aria-checked",n.isSingleSelector()?n.checked:null)("name",n._getButtonName())("aria-label",n.ariaLabel)("aria-labelledby",n.ariaLabelledby)("aria-disabled",n.disabled&&n.disabledInteractive?"true":null),r(2),h(n.buttonToggleGroup&&(!n.buttonToggleGroup.multiple&&!n.buttonToggleGroup.hideSingleSelectionIndicator||n.buttonToggleGroup.multiple&&!n.buttonToggleGroup.hideMultipleSelectionIndicator)?2:-1),r(4),y("matRippleTrigger",i)("matRippleDisabled",n.disableRipple||n.disabled)}},dependencies:[Ne,Le],styles:[`.mat-button-toggle-standalone,
.mat-button-toggle-group {
  position: relative;
  display: inline-flex;
  flex-direction: row;
  white-space: nowrap;
  overflow: hidden;
  -webkit-tap-highlight-color: transparent;
  border-radius: var(--mat-button-toggle-legacy-shape);
  transform: translateZ(0);
}
.mat-button-toggle-standalone:not([class*=mat-elevation-z]),
.mat-button-toggle-group:not([class*=mat-elevation-z]) {
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
}
@media (forced-colors: active) {
  .mat-button-toggle-standalone,
  .mat-button-toggle-group {
    outline: solid 1px;
  }
}

.mat-button-toggle-standalone.mat-button-toggle-appearance-standard,
.mat-button-toggle-group-appearance-standard {
  border-radius: var(--mat-button-toggle-shape, var(--mat-sys-corner-extra-large));
  border: solid 1px var(--mat-button-toggle-divider-color, var(--mat-sys-outline));
}
.mat-button-toggle-standalone.mat-button-toggle-appearance-standard .mat-pseudo-checkbox,
.mat-button-toggle-group-appearance-standard .mat-pseudo-checkbox {
  --mat-pseudo-checkbox-minimal-selected-checkmark-color: var(--mat-button-toggle-selected-state-text-color, var(--mat-sys-on-secondary-container));
}
.mat-button-toggle-standalone.mat-button-toggle-appearance-standard:not([class*=mat-elevation-z]),
.mat-button-toggle-group-appearance-standard:not([class*=mat-elevation-z]) {
  box-shadow: none;
}
@media (forced-colors: active) {
  .mat-button-toggle-standalone.mat-button-toggle-appearance-standard,
  .mat-button-toggle-group-appearance-standard {
    outline: 0;
  }
}

.mat-button-toggle-vertical {
  flex-direction: column;
}
.mat-button-toggle-vertical .mat-button-toggle-label-content {
  display: block;
}

.mat-button-toggle {
  white-space: nowrap;
  position: relative;
  color: var(--mat-button-toggle-legacy-text-color);
  font-family: var(--mat-button-toggle-legacy-label-text-font);
  font-size: var(--mat-button-toggle-legacy-label-text-size);
  line-height: var(--mat-button-toggle-legacy-label-text-line-height);
  font-weight: var(--mat-button-toggle-legacy-label-text-weight);
  letter-spacing: var(--mat-button-toggle-legacy-label-text-tracking);
  --mat-pseudo-checkbox-minimal-selected-checkmark-color: var(--mat-button-toggle-legacy-selected-state-text-color);
}
.mat-button-toggle.cdk-keyboard-focused .mat-button-toggle-focus-overlay {
  opacity: var(--mat-button-toggle-legacy-focus-state-layer-opacity);
}
.mat-button-toggle .mat-icon svg {
  vertical-align: top;
}

.mat-button-toggle-checkbox-wrapper {
  display: inline-block;
  justify-content: flex-start;
  align-items: center;
  width: 0;
  height: 18px;
  line-height: 18px;
  overflow: hidden;
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 16px;
  transform: translate3d(0, -50%, 0);
}
[dir=rtl] .mat-button-toggle-checkbox-wrapper {
  left: auto;
  right: 16px;
}
.mat-button-toggle-appearance-standard .mat-button-toggle-checkbox-wrapper {
  left: 12px;
}
[dir=rtl] .mat-button-toggle-appearance-standard .mat-button-toggle-checkbox-wrapper {
  left: auto;
  right: 12px;
}
.mat-button-toggle-checked .mat-button-toggle-checkbox-wrapper {
  width: 18px;
}
.mat-button-toggle-animations-enabled .mat-button-toggle-checkbox-wrapper {
  transition: width 150ms 45ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-button-toggle-vertical .mat-button-toggle-checkbox-wrapper {
  transition: none;
}

.mat-button-toggle-checked {
  color: var(--mat-button-toggle-legacy-selected-state-text-color);
  background-color: var(--mat-button-toggle-legacy-selected-state-background-color);
}

.mat-button-toggle-disabled {
  pointer-events: none;
  color: var(--mat-button-toggle-legacy-disabled-state-text-color);
  background-color: var(--mat-button-toggle-legacy-disabled-state-background-color);
  --mat-pseudo-checkbox-minimal-disabled-selected-checkmark-color: var(--mat-button-toggle-legacy-disabled-state-text-color);
}
.mat-button-toggle-disabled.mat-button-toggle-checked {
  background-color: var(--mat-button-toggle-legacy-disabled-selected-state-background-color);
}

.mat-button-toggle-disabled-interactive {
  pointer-events: auto;
}

.mat-button-toggle-appearance-standard {
  color: var(--mat-button-toggle-text-color, var(--mat-sys-on-surface));
  background-color: var(--mat-button-toggle-background-color, transparent);
  font-family: var(--mat-button-toggle-label-text-font, var(--mat-sys-label-large-font));
  font-size: var(--mat-button-toggle-label-text-size, var(--mat-sys-label-large-size));
  line-height: var(--mat-button-toggle-label-text-line-height, var(--mat-sys-label-large-line-height));
  font-weight: var(--mat-button-toggle-label-text-weight, var(--mat-sys-label-large-weight));
  letter-spacing: var(--mat-button-toggle-label-text-tracking, var(--mat-sys-label-large-tracking));
}
.mat-button-toggle-group-appearance-standard .mat-button-toggle-appearance-standard + .mat-button-toggle-appearance-standard {
  border-left: solid 1px var(--mat-button-toggle-divider-color, var(--mat-sys-outline));
}
[dir=rtl] .mat-button-toggle-group-appearance-standard .mat-button-toggle-appearance-standard + .mat-button-toggle-appearance-standard {
  border-left: none;
  border-right: solid 1px var(--mat-button-toggle-divider-color, var(--mat-sys-outline));
}
.mat-button-toggle-group-appearance-standard.mat-button-toggle-vertical .mat-button-toggle-appearance-standard + .mat-button-toggle-appearance-standard {
  border-left: none;
  border-right: none;
  border-top: solid 1px var(--mat-button-toggle-divider-color, var(--mat-sys-outline));
}
.mat-button-toggle-appearance-standard.mat-button-toggle-checked {
  color: var(--mat-button-toggle-selected-state-text-color, var(--mat-sys-on-secondary-container));
  background-color: var(--mat-button-toggle-selected-state-background-color, var(--mat-sys-secondary-container));
}
.mat-button-toggle-appearance-standard.mat-button-toggle-disabled {
  color: var(--mat-button-toggle-disabled-state-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
  background-color: var(--mat-button-toggle-disabled-state-background-color, transparent);
}
.mat-button-toggle-appearance-standard.mat-button-toggle-disabled .mat-pseudo-checkbox {
  --mat-pseudo-checkbox-minimal-disabled-selected-checkmark-color: var(--mat-button-toggle-disabled-selected-state-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-button-toggle-appearance-standard.mat-button-toggle-disabled.mat-button-toggle-checked {
  color: var(--mat-button-toggle-disabled-selected-state-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
  background-color: var(--mat-button-toggle-disabled-selected-state-background-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));
}
.mat-button-toggle-appearance-standard .mat-button-toggle-focus-overlay {
  background-color: var(--mat-button-toggle-state-layer-color, var(--mat-sys-on-surface));
}
.mat-button-toggle-appearance-standard:hover .mat-button-toggle-focus-overlay {
  opacity: var(--mat-button-toggle-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-button-toggle-appearance-standard.cdk-keyboard-focused .mat-button-toggle-focus-overlay {
  opacity: var(--mat-button-toggle-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
@media (hover: none) {
  .mat-button-toggle-appearance-standard:hover .mat-button-toggle-focus-overlay {
    display: none;
  }
}

.mat-button-toggle-label-content {
  -webkit-user-select: none;
  user-select: none;
  display: inline-block;
  padding: 0 16px;
  line-height: var(--mat-button-toggle-legacy-height);
  position: relative;
}
.mat-button-toggle-appearance-standard .mat-button-toggle-label-content {
  padding: 0 12px;
  line-height: var(--mat-button-toggle-height, 40px);
}

.mat-button-toggle-label-content > * {
  vertical-align: middle;
}

.mat-button-toggle-focus-overlay {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  border-radius: inherit;
  pointer-events: none;
  opacity: 0;
  background-color: var(--mat-button-toggle-legacy-state-layer-color);
}

@media (forced-colors: active) {
  .mat-button-toggle-checked .mat-button-toggle-focus-overlay {
    border-bottom: solid 500px;
    opacity: 0.5;
    height: 0;
  }
  .mat-button-toggle-checked:hover .mat-button-toggle-focus-overlay {
    opacity: 0.6;
  }
  .mat-button-toggle-checked.mat-button-toggle-appearance-standard .mat-button-toggle-focus-overlay {
    border-bottom: solid 500px;
  }
}
.mat-button-toggle .mat-button-toggle-ripple {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  pointer-events: none;
}

.mat-button-toggle-button {
  border: 0;
  background: none;
  color: inherit;
  padding: 0;
  margin: 0;
  font: inherit;
  outline: none;
  width: 100%;
  cursor: pointer;
}
.mat-button-toggle-animations-enabled .mat-button-toggle-button {
  transition: padding 150ms 45ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-button-toggle-vertical .mat-button-toggle-button {
  transition: none;
}
.mat-button-toggle-disabled .mat-button-toggle-button {
  cursor: default;
}
.mat-button-toggle-button::-moz-focus-inner {
  border: 0;
}
.mat-button-toggle-checked .mat-button-toggle-button:has(.mat-button-toggle-checkbox-wrapper) {
  padding-left: 30px;
}
[dir=rtl] .mat-button-toggle-checked .mat-button-toggle-button:has(.mat-button-toggle-checkbox-wrapper) {
  padding-left: 0;
  padding-right: 30px;
}

.mat-button-toggle-standalone.mat-button-toggle-appearance-standard {
  --mat-focus-indicator-border-radius: var(--mat-button-toggle-shape, var(--mat-sys-corner-extra-large));
}

.mat-button-toggle-group-appearance-standard:not(.mat-button-toggle-vertical) .mat-button-toggle:last-of-type .mat-button-toggle-button::before {
  border-top-right-radius: var(--mat-button-toggle-shape, var(--mat-sys-corner-extra-large));
  border-bottom-right-radius: var(--mat-button-toggle-shape, var(--mat-sys-corner-extra-large));
}
.mat-button-toggle-group-appearance-standard:not(.mat-button-toggle-vertical) .mat-button-toggle:first-of-type .mat-button-toggle-button::before {
  border-top-left-radius: var(--mat-button-toggle-shape, var(--mat-sys-corner-extra-large));
  border-bottom-left-radius: var(--mat-button-toggle-shape, var(--mat-sys-corner-extra-large));
}

.mat-button-toggle-group-appearance-standard.mat-button-toggle-vertical .mat-button-toggle:last-of-type .mat-button-toggle-button::before {
  border-bottom-right-radius: var(--mat-button-toggle-shape, var(--mat-sys-corner-extra-large));
  border-bottom-left-radius: var(--mat-button-toggle-shape, var(--mat-sys-corner-extra-large));
}
.mat-button-toggle-group-appearance-standard.mat-button-toggle-vertical .mat-button-toggle:first-of-type .mat-button-toggle-button::before {
  border-top-right-radius: var(--mat-button-toggle-shape, var(--mat-sys-corner-extra-large));
  border-top-left-radius: var(--mat-button-toggle-shape, var(--mat-sys-corner-extra-large));
}
`],encapsulation:2,changeDetection:0})}return t})(),He=(()=>{class t{static \u0275fac=function(o){return new(o||t)};static \u0275mod=ee({type:t});static \u0275inj=Y({imports:[Ae,L,Ce]})}return t})();var je={PERCENT:"%","GM-PER-L":"g/l",DAY:"unit.day",WK:"unit.week"};function jt(t){return!!t&&(je[t]??"").startsWith("unit.")}function Kt(t){return t?je[t]??t:""}function Wt(t,a){let e=t[`${a}Value`],o=t[`${a}Min`],n=t[`${a}Max`],i=t[`${a}Unit`];if(!(e===void 0&&o===void 0&&n===void 0))return{value:e===void 0?void 0:Number(e),min:o===void 0?void 0:Number(o),max:n===void 0?void 0:Number(n),unit:i}}function Zt(t,a){let e=o=>new Intl.NumberFormat(a,{maximumFractionDigits:4}).format(o);return t.min!==void 0&&t.max!==void 0?`${e(t.min)}\u2013${e(t.max)}`:t.min!==void 0?`\u2265 ${e(t.min)}`:t.max!==void 0?`\u2264 ${e(t.max)}`:t.value===void 0?"":e(t.value)}function Yt(t,a=new Date){return t.exhaustionDeadline?new Date(t.exhaustionDeadline)<a?"expired":"expiring":"authorised"}function ct(t,a){if(t.length<=a)return t;let e=t.slice(0,a),o=e.lastIndexOf(" ");return`${(o>a*.6?e.slice(0,o):e).trimEnd()}\u2026`}function Jt(t,a=28){return F(t)??ct(t.label,a)}function F(t){let a=t.code??"";return a.length>0&&a.length<=8&&/[a-z]/iu.test(a)?a:void 0}function Ke(t){return t.code?`${t.code} \u2014 ${t.label}`:t.label}function ut(t,a){if(t&1&&(J(),S(0,"svg",0)(1,"title"),p(2),I(),P(3,"path",2),S(4,"text",3),p(5),I()()),t&2){let e=s();x("width",e.size())("height",e.size())("aria-label",e.label()),r(2),f(e.label()),r(3),f(e.code())}}function gt(t,a){if(t&1){let e=B();S(0,"img",4),ae("error",function(){M(e);let n=s();return w(n.failed.set(!0))}),I()}if(t&2){let e=s();N("src",e.source(),q)("width",e.size())("height",e.size())("alt",e.label())("title",e.label())}}var pt="assets/ghs",We=class t{code=_.required();label=_("");size=_(48);failed=fe({source:this.code,computation:()=>!1});source(){return`${pt}/${encodeURIComponent(this.code())}.svg`}static \u0275fac=function(e){return new(e||t)};static \u0275cmp=T({type:t,selectors:[["app-ghs-pictogram"]],inputs:{code:[1,"code"],label:[1,"label"],size:[1,"size"]},decls:2,vars:1,consts:[["viewBox","0 0 100 100","role","img"],["loading","lazy","decoding","async",1,"pictogram",3,"src","width","height","alt","title"],["d","M50 2 98 50 50 98 2 50Z",1,"frame"],["x","50","y","50","text-anchor","middle","dominant-baseline","central",1,"code"],["loading","lazy","decoding","async",1,"pictogram",3,"error","src","width","height","alt","title"]],template:function(e,o){e&1&&b(0,ut,6,5,":svg:svg",0)(1,gt,1,5,"img",1),e&2&&h(o.failed()?0:1)},styles:["[_nghost-%COMP%]{display:inline-flex;flex:none}.pictogram[_ngcontent-%COMP%]{display:block;object-fit:contain}.frame[_ngcontent-%COMP%]{fill:#fff;stroke:#d0021b;stroke-width:7;stroke-linejoin:miter}.code[_ngcontent-%COMP%]{fill:#1c2834;font-size:20px;font-weight:700}"],changeDetection:0})};function mt(t,a){if(t&1&&(S(0,"span",1),c(1,"translate"),P(2,"span",2),p(3),c(4,"translate"),I()),t&2){let e=s();ge("status-"+e.status()),N("title",g(1,4,"status."+e.status())),r(3),pe(" ",g(4,6,(e.compact()?"status.short.":"status.")+e.status())," ")}}var Ye=class t{status=_.required();compact=_(!1);static \u0275fac=function(e){return new(e||t)};static \u0275cmp=T({type:t,selectors:[["app-status-badge"]],inputs:{status:[1,"status"],compact:[1,"compact"]},decls:1,vars:1,consts:[[1,"status",3,"class","title"],[1,"status",3,"title"],["aria-hidden","true",1,"status-dot"]],template:function(e,o){e&1&&b(0,mt,5,8,"span",0),e&2&&h(o.status()!=="authorised"||!o.compact()?0:-1)},dependencies:[R],styles:[".status[_ngcontent-%COMP%]{display:inline-flex;align-items:center;gap:.375rem;padding:.125rem .5rem .125rem .375rem;border-radius:999px;border:1px solid currentcolor;font-size:.75rem;font-weight:600;line-height:1.4;white-space:nowrap}.status-dot[_ngcontent-%COMP%]{width:.5rem;height:.5rem;border-radius:50%;background:currentcolor}.status-authorised[_ngcontent-%COMP%]{color:#047857}.status-expiring[_ngcontent-%COMP%]{color:#c2410c}.status-expired[_ngcontent-%COMP%]{color:#99191e}"],changeDetection:0})};var bt=["searchField"],ht=t=>({count:t}),ft=(t,a)=>a.id;function _t(t,a){if(t&1){let e=B();l(0,"div",9),C("click",function(n){return n.stopPropagation()}),E(1,"mat-icon",10),l(2,"input",11,0),c(4,"translate"),c(5,"translate"),C("input",function(n){M(e);let i=s();return w(i.onSearch(n))})("keydown",function(n){M(e);let i=s();return w(i.onSearchKey(n))}),d()()}if(t&2){let e=s();r(2),y("placeholder",g(4,3,"common.filterOptions"))("value",e.search()),x("aria-label",g(5,5,"common.filterOptions"))}}function vt(t,a){t&1&&(l(0,"mat-option",5),p(1),c(2,"translate"),d()),t&2&&(r(),f(g(2,1,"filter.any")))}function yt(t,a){if(t&1&&(l(0,"span",14),p(1),d()),t&2){let e=s().$implicit;r(),f(e.count)}}function xt(t,a){if(t&1&&(l(0,"mat-option",6)(1,"span",12)(2,"span",13),p(3),d(),b(4,yt,2,1,"span",14),d()()),t&2){let e=a.$implicit,o=s();y("value",e.id)("title",e.label)("disabled",e.count===0&&!o.selected().includes(e.id)),r(3),f(o.optionLabel(e)),r(),h(e.count!==void 0?4:-1)}}function Ct(t,a){if(t&1&&(l(0,"mat-option",7)(1,"span",15),p(2),c(3,"translate"),d()()),t&2){let e=s();r(2),f(he(3,1,"common.moreOptions",be(4,ht,e.hiddenCount())))}}function kt(t,a){if(t&1){let e=B();l(0,"span",8),c(1,"translate"),l(2,"mat-button-toggle-group",16),c(3,"translate"),c(4,"translate"),C("change",function(n){M(e);let i=s();return w(i.combination.set(n.value))}),l(5,"mat-button-toggle",17),p(6),c(7,"translate"),d(),l(8,"mat-button-toggle",18),p(9),c(10,"translate"),d()()()}if(t&2){let e=s();y("matTooltip",g(1,6,"filter.combinationHint")),r(2),y("value",e.combination())("disabled",e.selected().length<2),x("aria-label",g(3,8,"filter.combination")+": "+g(4,10,e.labelKey())),r(4),f(g(7,12,"filter.and")),r(3),f(g(10,14,"filter.or"))}}var Tt=12,Je=100,Xe=class t{labelKey=_.required();options=_.required();selected=Q([]);multiple=_(!0);combination=Q(void 0);search=G("");searchField=ve("searchField");byId=k(()=>new Map(this.options().map(a=>[a.id,a])));searchable=k(()=>this.options().length>Tt);combinable=k(()=>this.multiple()&&this.combination()!==void 0);value=k(()=>this.multiple()?this.selected():this.selected()[0]??"");triggerLabel=k(()=>this.selected().map(a=>{let e=this.byId().get(a)??{id:a,label:a};return F(e)??e.label}).join(", "));matchingOptions=k(()=>{let a=this.search().trim().toLowerCase();return a?this.options().filter(e=>this.optionLabel(e).toLowerCase().includes(a)):this.options()});visibleOptions=k(()=>{let a=this.matchingOptions().slice(0,Je),e=new Set(a.map(n=>n.id)),o=this.selected().filter(n=>!e.has(n)).map(n=>this.byId().get(n)??{id:n,label:n});return[...a,...o]});hiddenCount=k(()=>Math.max(0,this.matchingOptions().length-Je));optionLabel(a){let e=F(a);return e?`${e} \xB7 ${a.label}`:a.label}fullLabel(a){return Ke(a)}onValue(a){this.selected.set(typeof a=="string"?a?[a]:[]:a)}onSearch(a){this.search.set(a.target.value)}onSearchKey(a){["ArrowDown","ArrowUp","Enter","Escape","Tab"].includes(a.key)||a.stopPropagation()}onOpened(a){this.search.set(""),a&&setTimeout(()=>this.searchField()?.nativeElement.focus())}static \u0275fac=function(e){return new(e||t)};static \u0275cmp=T({type:t,selectors:[["app-term-dropdown"]],viewQuery:function(e,o){e&1&&de(o.searchField,bt,5),e&2&&ce()},inputs:{labelKey:[1,"labelKey"],options:[1,"options"],selected:[1,"selected"],multiple:[1,"multiple"],combination:[1,"combination"]},outputs:{selected:"selectedChange",combination:"combinationChange"},decls:16,vars:16,consts:[["searchField",""],[1,"term-dropdown"],["subscriptSizing","dynamic","floatLabel","always"],[3,"valueChange","openedChange","multiple","placeholder","value","panelClass"],[1,"term-search"],["value",""],[3,"value","title","disabled"],["disabled",""],[1,"term-combination",3,"matTooltip"],[1,"term-search",3,"click"],["svgIcon","search"],["type","text","autocomplete","off",3,"input","keydown","placeholder","value"],[1,"option"],[1,"option-label"],[1,"option-count","app-numeric"],[1,"option-more"],["hideSingleSelectionIndicator","",3,"change","value","disabled"],["value","and"],["value","or"]],template:function(e,o){e&1&&(l(0,"div",1)(1,"mat-form-field",2)(2,"mat-label"),p(3),c(4,"translate"),d(),l(5,"mat-select",3),c(6,"translate"),C("valueChange",function(i){return o.onValue(i)})("openedChange",function(i){return o.onOpened(i)}),l(7,"mat-select-trigger"),p(8),c(9,"translate"),d(),b(10,_t,6,7,"div",4),b(11,vt,3,3,"mat-option",5),ne(12,xt,5,5,"mat-option",6,ft),b(14,Ct,4,6,"mat-option",7),d()(),b(15,kt,11,16,"span",8),d()),e&2&&(r(3),f(g(4,10,o.labelKey())),r(2),y("multiple",o.multiple())("placeholder",g(6,12,"filter.any"))("value",o.value())("panelClass","ob-select-panel-sm app-term-panel"),r(3),f(o.triggerLabel()||g(9,14,"filter.any")),r(2),h(o.searchable()?10:-1),r(),h(o.multiple()?-1:11),r(),oe(o.visibleOptions()),r(2),h(o.hiddenCount()?14:-1),r(),h(o.combinable()?15:-1))},dependencies:[He,W,L,Oe,Be,Ee,Te,ke,$e,Ve,ze,Fe,De,Ie,R],styles:[".term-dropdown[_ngcontent-%COMP%]{display:flex;align-items:center;gap:.5rem}mat-form-field[_ngcontent-%COMP%]{flex:1 1 auto;min-width:0;width:100%}.term-combination[_ngcontent-%COMP%]{flex:0 0 auto;--mat-button-toggle-height: 2.5rem;--mat-button-toggle-shape: var(--app-radius);--mat-button-toggle-label-text-size: .75rem;--mat-button-toggle-label-text-weight: 700;--mat-button-toggle-selected-state-background-color: var(--app-control-active);--mat-button-toggle-selected-state-text-color: #fff}.term-search[_ngcontent-%COMP%]{position:sticky;top:0;z-index:1;display:flex;align-items:center;gap:.5rem;margin:-.5rem 0 .25rem;padding:.5rem .75rem;background:var(--app-surface, #fff);border-bottom:var(--app-border)}.term-search[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{flex:1;min-width:0;border:0;background:none;font:inherit;color:inherit}.term-search[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus{outline:none}.term-search[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{flex-shrink:0;color:var(--app-text-muted)}.option[_ngcontent-%COMP%]{display:flex;align-items:baseline;justify-content:space-between;gap:1rem}.option-label[_ngcontent-%COMP%]{min-width:0}.option-count[_ngcontent-%COMP%]{flex:0 0 auto;color:var(--app-text-muted);font-size:.75rem}.option-more[_ngcontent-%COMP%]{color:var(--app-text-muted);font-size:.75rem;font-style:italic}"],changeDetection:0})};export{W as a,L as b,He as c,jt as d,Kt as e,Wt as f,Zt as g,Yt as h,Jt as i,Ke as j,We as k,Ye as l,Xe as m};
