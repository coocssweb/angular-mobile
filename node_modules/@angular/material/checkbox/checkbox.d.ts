import { ElementRef, EventEmitter, Renderer, ModuleWithProviders } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
/**
 * Provider Expression that allows md-checkbox to register as a ControlValueAccessor. This allows it
 * to support [(ngModel)].
 */
export declare const MD_CHECKBOX_CONTROL_VALUE_ACCESSOR: any;
/**
 * Represents the different states that require custom transitions between them.
 */
export declare enum TransitionCheckState {
    /** The initial state of the component before any user interaction. */
    Init = 0,
    /** The state representing the component when it's becoming checked. */
    Checked = 1,
    /** The state representing the component when it's becoming unchecked. */
    Unchecked = 2,
    /** The state representing the component when it's becoming indeterminate. */
    Indeterminate = 3,
}
export declare class MdCheckboxChange {
    source: MdCheckbox;
    checked: boolean;
}
/**
 * A material design checkbox component. Supports all of the functionality of an HTML5 checkbox,
 * and exposes a similar API. An MdCheckbox can be either checked, unchecked, indeterminate, or
 * disabled. Note that all additional accessibility attributes are taken care of by the component,
 * so there is no need to provide them yourself. However, if you want to omit a label and still
 * have the checkbox be accessible, you may supply an [aria-label] input.
 * See: https://www.google.com/design/spec/components/selection-controls.html
 */
export declare class MdCheckbox implements ControlValueAccessor {
    private _renderer;
    private _elementRef;
    /**
     * Attached to the aria-label attribute of the host element. In most cases, arial-labelledby will
     * take precedence so this may be omitted.
     */
    ariaLabel: string;
    /**
     * Users can specify the `aria-labelledby` attribute which will be forwarded to the input element
     */
    ariaLabelledby: string;
    /** A unique id for the checkbox. If one is not supplied, it is auto-generated. */
    id: string;
    /** ID to be applied to the `input` element */
    readonly inputId: string;
    /** Whether the checkbox is required or not. */
    required: boolean;
    /** Whether or not the checkbox should come before or after the label. */
    align: 'start' | 'end';
    /**
     * Whether the checkbox is disabled. When the checkbox is disabled it cannot be interacted with.
     * The correct ARIA attributes are applied to denote this to assistive technology.
     */
    disabled: boolean;
    /**
     * The tabindex attribute for the checkbox. Note that when the checkbox is disabled, the attribute
     * on the host element will be removed. It will be placed back when the checkbox is re-enabled.
     */
    tabindex: number;
    /** Name value will be applied to the input element if present */
    name: string;
    /** Event emitted when the checkbox's `checked` value changes. */
    change: EventEmitter<MdCheckboxChange>;
    /** Called when the checkbox is blurred. Needed to properly implement ControlValueAccessor. */
    onTouched: () => any;
    private _currentAnimationClass;
    private _currentCheckState;
    private _checked;
    private _indeterminate;
    private _controlValueAccessorChangeFn;
    hasFocus: boolean;
    constructor(_renderer: Renderer, _elementRef: ElementRef);
    /**
     * Whether the checkbox is checked. Note that setting `checked` will immediately set
     * `indeterminate` to false.
     */
    checked: boolean;
    /**
     * Whether the checkbox is indeterminate. This is also known as "mixed" mode and can be used to
     * represent a checkbox with three states, e.g. a checkbox that represents a nested list of
     * checkable items. Note that whenever `checked` is set, indeterminate is immediately set to
     * false. This differs from the web platform in that indeterminate state on native
     * checkboxes is only remove when the user manually checks the checkbox (rather than setting the
     * `checked` property programmatically). However, we feel that this behavior is more accommodating
     * to the way consumers would envision using this component.
     */
    indeterminate: boolean;
    /**
     * Implemented as part of ControlValueAccessor.
     * TODO: internal
     */
    writeValue(value: any): void;
    /**
     * Implemented as part of ControlValueAccessor.
     * TODO: internal
     */
    registerOnChange(fn: (value: any) => void): void;
    /**
     * Implemented as part of ControlValueAccessor.
     * TODO: internal
     */
    registerOnTouched(fn: any): void;
    private _transitionCheckState(newState);
    private _emitChangeEvent();
    /** Informs the component when the input has focus so that we can style accordingly */
    _onInputFocus(): void;
    /** Informs the component when we lose focus in order to style accordingly */
    _onInputBlur(): void;
    /**
     * Toggles the `checked` value between true and false
     */
    toggle(): void;
    /**
     * Event handler for checkbox input element.
     * Toggles checked state if element is not disabled.
     * @param event
     */
    _onInteractionEvent(event: Event): void;
    _onInputClick(event: Event): void;
    private _getAnimationClassForCheckStateTransition(oldState, newState);
}
export declare class MdCheckboxModule {
    static forRoot(): ModuleWithProviders;
}
