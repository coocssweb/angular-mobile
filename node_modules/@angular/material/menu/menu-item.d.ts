import { ElementRef, Renderer } from '@angular/core';
/**
 * This directive is intended to be used inside an md-menu tag.
 * It exists mostly to set the role attribute.
 */
export declare class MdMenuItem {
    private _renderer;
    private _elementRef;
    _disabled: boolean;
    constructor(_renderer: Renderer, _elementRef: ElementRef);
    focus(): void;
    disabled: boolean;
    readonly isAriaDisabled: string;
    /**
     * TODO: internal
     */
    _checkDisabled(event: Event): void;
}
