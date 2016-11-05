import { AfterContentInit, SimpleChange, ElementRef, QueryList, OnChanges, ModuleWithProviders } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { MdError } from '../core';
import { Observable } from 'rxjs/Observable';
export declare const MD_INPUT_CONTROL_VALUE_ACCESSOR: any;
export declare class MdInputPlaceholderConflictError extends MdError {
    constructor();
}
export declare class MdInputUnsupportedTypeError extends MdError {
    constructor(type: string);
}
export declare class MdInputDuplicatedHintError extends MdError {
    constructor(align: string);
}
/**
 * The placeholder directive. The content can declare this to implement more
 * complex placeholders.
 */
export declare class MdPlaceholder {
}
/** The hint directive, used to tag content as hint labels (going under the input). */
export declare class MdHint {
    align: 'start' | 'end';
}
/**
 * Component that represents a text input. It encapsulates the <input> HTMLElement and
 * improve on its behaviour, along with styling it according to the Material Design.
 */
export declare class MdInput implements ControlValueAccessor, AfterContentInit, OnChanges {
    private _focused;
    private _value;
    /** Callback registered via registerOnTouched (ControlValueAccessor) */
    private _onTouchedCallback;
    /** Callback registered via registerOnChange (ControlValueAccessor) */
    private _onChangeCallback;
    /**
     * Aria related inputs.
     */
    ariaLabel: string;
    ariaLabelledBy: string;
    ariaDisabled: boolean;
    ariaRequired: boolean;
    ariaInvalid: boolean;
    /**
     * Content directives.
     */
    _placeholderChild: MdPlaceholder;
    _hintChildren: QueryList<MdHint>;
    /** Readonly properties. */
    readonly focused: boolean;
    readonly empty: boolean;
    readonly characterCount: number;
    readonly inputId: string;
    /**
     * Bindings.
     */
    align: 'start' | 'end';
    dividerColor: 'primary' | 'accent' | 'warn';
    floatingPlaceholder: boolean;
    hintLabel: string;
    autocomplete: string;
    autocorrect: string;
    autocapitalize: string;
    autofocus: boolean;
    disabled: boolean;
    id: string;
    list: string;
    max: string | number;
    maxlength: number;
    min: string | number;
    minlength: number;
    placeholder: string;
    readonly: boolean;
    required: boolean;
    spellcheck: boolean;
    step: number;
    tabindex: number;
    type: string;
    name: string;
    private _blurEmitter;
    private _focusEmitter;
    readonly onBlur: Observable<FocusEvent>;
    readonly onFocus: Observable<FocusEvent>;
    value: any;
    readonly _align: any;
    _inputElement: ElementRef;
    /** Set focus on input */
    focus(): void;
    _handleFocus(event: FocusEvent): void;
    _handleBlur(event: FocusEvent): void;
    _handleChange(event: Event): void;
    _hasPlaceholder(): boolean;
    /**
     * Implemented as part of ControlValueAccessor.
     * TODO: internal
     */
    writeValue(value: any): void;
    /**
     * Implemented as part of ControlValueAccessor.
     * TODO: internal
     */
    registerOnChange(fn: any): void;
    /**
     * Implemented as part of ControlValueAccessor.
     * TODO: internal
     */
    registerOnTouched(fn: any): void;
    /** TODO: internal */
    ngAfterContentInit(): void;
    /** TODO: internal */
    ngOnChanges(changes: {
        [key: string]: SimpleChange;
    }): void;
    /**
     * Convert the value passed in to a value that is expected from the type of the md-input.
     * This is normally performed by the *_VALUE_ACCESSOR in forms, but since the type is bound
     * on our internal input it won't work locally.
     * @private
     */
    private _convertValueForInputType(v);
    /**
     * Ensure that all constraints defined by the API are validated, or throw errors otherwise.
     * Constraints for now:
     *   - placeholder attribute and <md-placeholder> are mutually exclusive.
     *   - type attribute is not one of the forbidden types (see constant at the top).
     *   - Maximum one of each `<md-hint>` alignment specified, with the attribute being
     *     considered as align="start".
     * @private
     */
    private _validateConstraints();
}
export declare class MdInputModule {
    static forRoot(): ModuleWithProviders;
}
