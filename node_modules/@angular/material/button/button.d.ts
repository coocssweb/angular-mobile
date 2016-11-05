import { ElementRef, Renderer, ModuleWithProviders } from '@angular/core';
export declare class MdButton {
    private _elementRef;
    private _renderer;
    private _color;
    /** Whether the button has focus from the keyboard (not the mouse). Used for class binding. */
    _isKeyboardFocused: boolean;
    /** Whether a mousedown has occurred on this element in the last 100ms. */
    _isMouseDown: boolean;
    /** Whether the ripple effect on click should be disabled. */
    disableRipple: boolean;
    constructor(_elementRef: ElementRef, _renderer: Renderer);
    color: string;
    _setMousedown(): void;
    _updateColor(newColor: string): void;
    _setElementColor(color: string, isAdd: boolean): void;
    _setKeyboardFocus(): void;
    _removeKeyboardFocus(): void;
    /** TODO(hansl): e2e test this function. */
    focus(): void;
    getHostElement(): any;
    isRoundButton(): any;
    isRippleEnabled(): boolean;
}
export declare class MdAnchor extends MdButton {
    _disabled: boolean;
    constructor(elementRef: ElementRef, renderer: Renderer);
    readonly tabIndex: number;
    readonly isAriaDisabled: string;
    disabled: boolean;
    _haltDisabledEvents(event: Event): void;
}
export declare class MdButtonModule {
    static forRoot(): ModuleWithProviders;
}
