import { ElementRef, Renderer, AfterContentInit, ModuleWithProviders } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
export declare const MD_SLIDE_TOGGLE_VALUE_ACCESSOR: any;
export declare class MdSlideToggleChange {
    source: MdSlideToggle;
    checked: boolean;
}
export declare class MdSlideToggle implements AfterContentInit, ControlValueAccessor {
    private _elementRef;
    private _renderer;
    private onChange;
    private onTouched;
    private _uniqueId;
    private _checked;
    private _color;
    _hasFocus: boolean;
    private _isMousedown;
    private _slideRenderer;
    disabled: boolean;
    required: boolean;
    name: string;
    id: string;
    tabIndex: number;
    ariaLabel: string;
    ariaLabelledby: string;
    private _change;
    change: Observable<MdSlideToggleChange>;
    getInputId: () => string;
    constructor(_elementRef: ElementRef, _renderer: Renderer);
    /** TODO: internal */
    ngAfterContentInit(): void;
    /**
     * The onChangeEvent method will be also called on click.
     * This is because everything for the slide-toggle is wrapped inside of a label,
     * which triggers a onChange event on click.
     */
    _onChangeEvent(event: Event): void;
    _onInputClick(event: Event): void;
    _setMousedown(): void;
    _onInputFocus(): void;
    _onInputBlur(): void;
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
    checked: boolean;
    color: string;
    toggle(): void;
    private _updateColor(newColor);
    private _setElementColor(color, isAdd);
    /** Emits the change event to the `change` output EventEmitter */
    private _emitChangeEvent();
    /** TODO: internal */
    _onDragStart(): void;
    /** TODO: internal */
    _onDrag(event: HammerInput): void;
    /** TODO: internal */
    _onDragEnd(): void;
}
export declare class MdSlideToggleModule {
    static forRoot(): ModuleWithProviders;
}
