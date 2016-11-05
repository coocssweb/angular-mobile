var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, Renderer, ViewEncapsulation, forwardRef, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BooleanFieldValue } from '../core';
/**
 * Monotonically increasing integer used to auto-generate unique ids for checkbox components.
 */
var nextId = 0;
/**
 * Provider Expression that allows md-checkbox to register as a ControlValueAccessor. This allows it
 * to support [(ngModel)].
 */
export var MD_CHECKBOX_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return MdCheckbox; }),
    multi: true
};
/**
 * Represents the different states that require custom transitions between them.
 */
export var TransitionCheckState;
(function (TransitionCheckState) {
    /** The initial state of the component before any user interaction. */
    TransitionCheckState[TransitionCheckState["Init"] = 0] = "Init";
    /** The state representing the component when it's becoming checked. */
    TransitionCheckState[TransitionCheckState["Checked"] = 1] = "Checked";
    /** The state representing the component when it's becoming unchecked. */
    TransitionCheckState[TransitionCheckState["Unchecked"] = 2] = "Unchecked";
    /** The state representing the component when it's becoming indeterminate. */
    TransitionCheckState[TransitionCheckState["Indeterminate"] = 3] = "Indeterminate";
})(TransitionCheckState || (TransitionCheckState = {}));
// A simple change event emitted by the MdCheckbox component.
export var MdCheckboxChange = (function () {
    function MdCheckboxChange() {
    }
    return MdCheckboxChange;
}());
/**
 * A material design checkbox component. Supports all of the functionality of an HTML5 checkbox,
 * and exposes a similar API. An MdCheckbox can be either checked, unchecked, indeterminate, or
 * disabled. Note that all additional accessibility attributes are taken care of by the component,
 * so there is no need to provide them yourself. However, if you want to omit a label and still
 * have the checkbox be accessible, you may supply an [aria-label] input.
 * See: https://www.google.com/design/spec/components/selection-controls.html
 */
export var MdCheckbox = (function () {
    function MdCheckbox(_renderer, _elementRef) {
        this._renderer = _renderer;
        this._elementRef = _elementRef;
        /**
         * Attached to the aria-label attribute of the host element. In most cases, arial-labelledby will
         * take precedence so this may be omitted.
         */
        this.ariaLabel = '';
        /**
         * Users can specify the `aria-labelledby` attribute which will be forwarded to the input element
         */
        this.ariaLabelledby = null;
        /** A unique id for the checkbox. If one is not supplied, it is auto-generated. */
        this.id = "md-checkbox-" + ++nextId;
        /** Whether the checkbox is required or not. */
        this.required = false;
        /** Whether or not the checkbox should come before or after the label. */
        this.align = 'start';
        /**
         * Whether the checkbox is disabled. When the checkbox is disabled it cannot be interacted with.
         * The correct ARIA attributes are applied to denote this to assistive technology.
         */
        this.disabled = false;
        /**
         * The tabindex attribute for the checkbox. Note that when the checkbox is disabled, the attribute
         * on the host element will be removed. It will be placed back when the checkbox is re-enabled.
         */
        this.tabindex = 0;
        /** Name value will be applied to the input element if present */
        this.name = null;
        /** Event emitted when the checkbox's `checked` value changes. */
        this.change = new EventEmitter();
        /** Called when the checkbox is blurred. Needed to properly implement ControlValueAccessor. */
        this.onTouched = function () { };
        this._currentAnimationClass = '';
        this._currentCheckState = TransitionCheckState.Init;
        this._checked = false;
        this._indeterminate = false;
        this._controlValueAccessorChangeFn = function (value) { };
        this.hasFocus = false;
    }
    Object.defineProperty(MdCheckbox.prototype, "inputId", {
        /** ID to be applied to the `input` element */
        get: function () {
            return "input-" + this.id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdCheckbox.prototype, "checked", {
        /**
         * Whether the checkbox is checked. Note that setting `checked` will immediately set
         * `indeterminate` to false.
         */
        get: function () {
            return this._checked;
        },
        set: function (checked) {
            if (checked != this.checked) {
                this._indeterminate = false;
                this._checked = checked;
                this._transitionCheckState(this._checked ? TransitionCheckState.Checked : TransitionCheckState.Unchecked);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdCheckbox.prototype, "indeterminate", {
        /**
         * Whether the checkbox is indeterminate. This is also known as "mixed" mode and can be used to
         * represent a checkbox with three states, e.g. a checkbox that represents a nested list of
         * checkable items. Note that whenever `checked` is set, indeterminate is immediately set to
         * false. This differs from the web platform in that indeterminate state on native
         * checkboxes is only remove when the user manually checks the checkbox (rather than setting the
         * `checked` property programmatically). However, we feel that this behavior is more accommodating
         * to the way consumers would envision using this component.
         */
        get: function () {
            return this._indeterminate;
        },
        set: function (indeterminate) {
            this._indeterminate = indeterminate;
            if (this._indeterminate) {
                this._transitionCheckState(TransitionCheckState.Indeterminate);
            }
            else {
                this._transitionCheckState(this.checked ? TransitionCheckState.Checked : TransitionCheckState.Unchecked);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Implemented as part of ControlValueAccessor.
     * TODO: internal
     */
    MdCheckbox.prototype.writeValue = function (value) {
        this.checked = !!value;
    };
    /**
     * Implemented as part of ControlValueAccessor.
     * TODO: internal
     */
    MdCheckbox.prototype.registerOnChange = function (fn) {
        this._controlValueAccessorChangeFn = fn;
    };
    /**
     * Implemented as part of ControlValueAccessor.
     * TODO: internal
     */
    MdCheckbox.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    MdCheckbox.prototype._transitionCheckState = function (newState) {
        var oldState = this._currentCheckState;
        var renderer = this._renderer;
        var elementRef = this._elementRef;
        if (oldState === newState) {
            return;
        }
        if (this._currentAnimationClass.length > 0) {
            renderer.setElementClass(elementRef.nativeElement, this._currentAnimationClass, false);
        }
        this._currentAnimationClass = this._getAnimationClassForCheckStateTransition(oldState, newState);
        this._currentCheckState = newState;
        if (this._currentAnimationClass.length > 0) {
            renderer.setElementClass(elementRef.nativeElement, this._currentAnimationClass, true);
        }
    };
    MdCheckbox.prototype._emitChangeEvent = function () {
        var event = new MdCheckboxChange();
        event.source = this;
        event.checked = this.checked;
        this._controlValueAccessorChangeFn(this.checked);
        this.change.emit(event);
    };
    /** Informs the component when the input has focus so that we can style accordingly */
    MdCheckbox.prototype._onInputFocus = function () {
        this.hasFocus = true;
    };
    /** Informs the component when we lose focus in order to style accordingly */
    MdCheckbox.prototype._onInputBlur = function () {
        this.hasFocus = false;
        this.onTouched();
    };
    /**
     * Toggles the `checked` value between true and false
     */
    MdCheckbox.prototype.toggle = function () {
        this.checked = !this.checked;
    };
    /**
     * Event handler for checkbox input element.
     * Toggles checked state if element is not disabled.
     * @param event
     */
    MdCheckbox.prototype._onInteractionEvent = function (event) {
        // We always have to stop propagation on the change event.
        // Otherwise the change event, from the input element, will bubble up and
        // emit its event object to the `change` output.
        event.stopPropagation();
        if (!this.disabled) {
            this.toggle();
            // Emit our custom change event if the native input emitted one.
            // It is important to only emit it, if the native input triggered one, because
            // we don't want to trigger a change event, when the `checked` variable changes for example.
            this._emitChangeEvent();
        }
    };
    MdCheckbox.prototype._onInputClick = function (event) {
        // We have to stop propagation for click events on the visual hidden input element.
        // By default, when a user clicks on a label element, a generated click event will be
        // dispatched on the associated input element. Since we are using a label element as our
        // root container, the click event on the `checkbox` will be executed twice.
        // The real click event will bubble up, and the generated click event also tries to bubble up.
        // This will lead to multiple click events.
        // Preventing bubbling for the second event will solve that issue.
        event.stopPropagation();
    };
    MdCheckbox.prototype._getAnimationClassForCheckStateTransition = function (oldState, newState) {
        var animSuffix;
        switch (oldState) {
            case TransitionCheckState.Init:
                // Handle edge case where user interacts with checkbox that does not have [(ngModel)] or
                // [checked] bound to it.
                if (newState === TransitionCheckState.Checked) {
                    animSuffix = 'unchecked-checked';
                }
                else {
                    return '';
                }
                break;
            case TransitionCheckState.Unchecked:
                animSuffix = newState === TransitionCheckState.Checked ?
                    'unchecked-checked' : 'unchecked-indeterminate';
                break;
            case TransitionCheckState.Checked:
                animSuffix = newState === TransitionCheckState.Unchecked ?
                    'checked-unchecked' : 'checked-indeterminate';
                break;
            case TransitionCheckState.Indeterminate:
                animSuffix = newState === TransitionCheckState.Checked ?
                    'indeterminate-checked' : 'indeterminate-unchecked';
        }
        return "md-checkbox-anim-" + animSuffix;
    };
    __decorate([
        Input('aria-label'), 
        __metadata('design:type', String)
    ], MdCheckbox.prototype, "ariaLabel", void 0);
    __decorate([
        Input('aria-labelledby'), 
        __metadata('design:type', String)
    ], MdCheckbox.prototype, "ariaLabelledby", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', String)
    ], MdCheckbox.prototype, "id", void 0);
    __decorate([
        Input(),
        BooleanFieldValue(), 
        __metadata('design:type', Boolean)
    ], MdCheckbox.prototype, "required", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], MdCheckbox.prototype, "align", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Boolean)
    ], MdCheckbox.prototype, "disabled", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Number)
    ], MdCheckbox.prototype, "tabindex", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', String)
    ], MdCheckbox.prototype, "name", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', EventEmitter)
    ], MdCheckbox.prototype, "change", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], MdCheckbox.prototype, "checked", null);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], MdCheckbox.prototype, "indeterminate", null);
    MdCheckbox = __decorate([
        Component({selector: 'md-checkbox',
            template: "<label class=\"md-checkbox-layout\"> <div class=\"md-checkbox-inner-container\"> <input class=\"md-checkbox-input md-visually-hidden\" type=\"checkbox\" [id]=\"inputId\" [required]=\"required\" [checked]=\"checked\" [disabled]=\"disabled\" [name]=\"name\" [tabIndex]=\"tabindex\" [indeterminate]=\"indeterminate\" [attr.aria-label]=\"ariaLabel\" [attr.aria-labelledby]=\"ariaLabelledby\" (focus)=\"_onInputFocus()\" (blur)=\"_onInputBlur()\" (change)=\"_onInteractionEvent($event)\" (click)=\"_onInputClick($event)\"> <div class=\"md-ink-ripple\"></div> <div class=\"md-checkbox-frame\"></div> <div class=\"md-checkbox-background\"> <svg version=\"1.1\" class=\"md-checkbox-checkmark\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" xml:space=\"preserve\"> <path class=\"md-checkbox-checkmark-path\" fill=\"none\" stroke=\"white\" d=\"M4.1,12.7 9,17.6 20.3,6.3\"/> </svg> <!-- Element for rendering the indeterminate state checkbox. --> <div class=\"md-checkbox-mixedmark\"></div> </div> </div> <span class=\"md-checkbox-label\"> <ng-content></ng-content> </span> </label> ",
            styles: ["@keyframes md-checkbox-fade-in-background { 0% { opacity: 0; } 50% { opacity: 1; } } @keyframes md-checkbox-fade-out-background { 0%, 50% { opacity: 1; } 100% { opacity: 0; } } @keyframes md-checkbox-unchecked-checked-checkmark-path { 0%, 50% { stroke-dashoffset: 22.91026; } 50% { animation-timing-function: cubic-bezier(0, 0, 0.2, 0.1); } 100% { stroke-dashoffset: 0; } } @keyframes md-checkbox-unchecked-indeterminate-mixedmark { 0%, 68.2% { transform: scaleX(0); } 68.2% { animation-timing-function: cubic-bezier(0, 0, 0, 1); } 100% { transform: scaleX(1); } } @keyframes md-checkbox-checked-unchecked-checkmark-path { from { animation-timing-function: cubic-bezier(0.4, 0, 1, 1); stroke-dashoffset: 0; } to { stroke-dashoffset: -22.91026; } } @keyframes md-checkbox-checked-indeterminate-checkmark { from { animation-timing-function: cubic-bezier(0, 0, 0.2, 0.1); opacity: 1; transform: rotate(0deg); } to { opacity: 0; transform: rotate(45deg); } } @keyframes md-checkbox-indeterminate-checked-checkmark { from { animation-timing-function: cubic-bezier(0.14, 0, 0, 1); opacity: 0; transform: rotate(45deg); } to { opacity: 1; transform: rotate(360deg); } } @keyframes md-checkbox-checked-indeterminate-mixedmark { from { animation-timing-function: cubic-bezier(0, 0, 0.2, 0.1); opacity: 0; transform: rotate(-45deg); } to { opacity: 1; transform: rotate(0deg); } } @keyframes md-checkbox-indeterminate-checked-mixedmark { from { animation-timing-function: cubic-bezier(0.14, 0, 0, 1); opacity: 1; transform: rotate(0deg); } to { opacity: 0; transform: rotate(315deg); } } @keyframes md-checkbox-indeterminate-unchecked-mixedmark { 0% { animation-timing-function: linear; opacity: 1; transform: scaleX(1); } 32.8%, 100% { opacity: 0; transform: scaleX(0); } } .md-checkbox-frame, .md-checkbox-background, .md-checkbox-checkmark { bottom: 0; left: 0; position: absolute; right: 0; top: 0; } .md-checkbox-checkmark, .md-checkbox-mixedmark { width: calc(100% - 4px); } .md-checkbox-frame, .md-checkbox-background { border-radius: 2px; box-sizing: border-box; pointer-events: none; } md-checkbox { cursor: pointer; } .md-checkbox-layout { cursor: inherit; align-items: baseline; display: inline-flex; } .md-checkbox-inner-container { display: inline-block; height: 20px; line-height: 0; margin: auto; margin-right: 8px; order: 0; position: relative; vertical-align: middle; white-space: nowrap; width: 20px; } [dir='rtl'] .md-checkbox-inner-container { margin-left: 8px; margin-right: auto; } .md-checkbox-layout .md-checkbox-label { line-height: 24px; } .md-checkbox-frame { background-color: transparent; border: 2px solid; transition: border-color 90ms cubic-bezier(0, 0, 0.2, 0.1); will-change: border-color; } .md-checkbox-background { align-items: center; display: inline-flex; justify-content: center; transition: background-color 90ms cubic-bezier(0, 0, 0.2, 0.1), opacity 90ms cubic-bezier(0, 0, 0.2, 0.1); will-change: background-color, opacity; } .md-checkbox-checkmark { width: 100%; } .md-checkbox-checkmark-path { stroke-dashoffset: 22.91026; stroke-dasharray: 22.91026; stroke-width: 2.66667px; } .md-checkbox-mixedmark { height: 2px; opacity: 0; transform: scaleX(0) rotate(0deg); } .md-checkbox-align-end .md-checkbox-inner-container { order: 1; margin-left: 8px; margin-right: auto; } [dir='rtl'] .md-checkbox-align-end .md-checkbox-inner-container { margin-left: auto; margin-right: 8px; } .md-checkbox-checked .md-checkbox-checkmark { opacity: 1; } .md-checkbox-checked .md-checkbox-checkmark-path { stroke-dashoffset: 0; } .md-checkbox-checked .md-checkbox-mixedmark { transform: scaleX(1) rotate(-45deg); } .md-checkbox-indeterminate .md-checkbox-checkmark { opacity: 0; transform: rotate(45deg); } .md-checkbox-indeterminate .md-checkbox-checkmark-path { stroke-dashoffset: 0; } .md-checkbox-indeterminate .md-checkbox-mixedmark { opacity: 1; transform: scaleX(1) rotate(0deg); } .md-checkbox-unchecked .md-checkbox-background { background-color: transparent; } .md-checkbox-disabled { cursor: default; } .md-checkbox-anim-unchecked-checked .md-checkbox-background { animation: 180ms linear 0ms md-checkbox-fade-in-background; } .md-checkbox-anim-unchecked-checked .md-checkbox-checkmark-path { animation: 180ms linear 0ms md-checkbox-unchecked-checked-checkmark-path; } .md-checkbox-anim-unchecked-indeterminate .md-checkbox-background { animation: 180ms linear 0ms md-checkbox-fade-in-background; } .md-checkbox-anim-unchecked-indeterminate .md-checkbox-mixedmark { animation: 90ms linear 0ms md-checkbox-unchecked-indeterminate-mixedmark; } .md-checkbox-anim-checked-unchecked .md-checkbox-background { animation: 180ms linear 0ms md-checkbox-fade-out-background; } .md-checkbox-anim-checked-unchecked .md-checkbox-checkmark-path { animation: 90ms linear 0ms md-checkbox-checked-unchecked-checkmark-path; } .md-checkbox-anim-checked-indeterminate .md-checkbox-checkmark { animation: 90ms linear 0ms md-checkbox-checked-indeterminate-checkmark; } .md-checkbox-anim-checked-indeterminate .md-checkbox-mixedmark { animation: 90ms linear 0ms md-checkbox-checked-indeterminate-mixedmark; } .md-checkbox-anim-indeterminate-checked .md-checkbox-checkmark { animation: 500ms linear 0ms md-checkbox-indeterminate-checked-checkmark; } .md-checkbox-anim-indeterminate-checked .md-checkbox-mixedmark { animation: 500ms linear 0ms md-checkbox-indeterminate-checked-mixedmark; } .md-checkbox-anim-indeterminate-unchecked .md-checkbox-background { animation: 180ms linear 0ms md-checkbox-fade-out-background; } .md-checkbox-anim-indeterminate-unchecked .md-checkbox-mixedmark { animation: 300ms linear 0ms md-checkbox-indeterminate-unchecked-mixedmark; } .md-checkbox-input { bottom: 0; left: 50%; } .md-ink-ripple { border-radius: 50%; opacity: 0; height: 48px; left: 50%; overflow: hidden; pointer-events: none; position: absolute; top: 50%; transform: translate(-50%, -50%); transition: opacity ease 280ms, background-color ease 280ms; width: 48px; } .md-checkbox-focused .md-ink-ripple { opacity: 1; } .md-checkbox-disabled .md-ink-ripple { background-color: #000; } /*# sourceMappingURL=checkbox.css.map */ "],
            host: {
                '[class.md-checkbox-indeterminate]': 'indeterminate',
                '[class.md-checkbox-checked]': 'checked',
                '[class.md-checkbox-disabled]': 'disabled',
                '[class.md-checkbox-align-end]': 'align == "end"',
                '[class.md-checkbox-focused]': 'hasFocus',
            },
            providers: [MD_CHECKBOX_CONTROL_VALUE_ACCESSOR],
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [Renderer, ElementRef])
    ], MdCheckbox);
    return MdCheckbox;
}());
export var MdCheckboxModule = (function () {
    function MdCheckboxModule() {
    }
    MdCheckboxModule.forRoot = function () {
        return {
            ngModule: MdCheckboxModule,
            providers: []
        };
    };
    MdCheckboxModule = __decorate([
        NgModule({
            exports: [MdCheckbox],
            declarations: [MdCheckbox],
        }), 
        __metadata('design:paramtypes', [])
    ], MdCheckboxModule);
    return MdCheckboxModule;
}());

//# sourceMappingURL=checkbox.js.map
