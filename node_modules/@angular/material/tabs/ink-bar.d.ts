import { Renderer, ElementRef } from '@angular/core';
/** The ink-bar is used to display and animate the line underneath the current active tab label. */
export declare class MdInkBar {
    private _renderer;
    private _elementRef;
    constructor(_renderer: Renderer, _elementRef: ElementRef);
    /**
     * Calculates the styles from the provided element in order to align the ink-bar to that element.
     * @param element
     */
    alignToElement(element: HTMLElement): void;
    /**
     * Generates the pixel distance from the left based on the provided element in string format.
     * @param element
     * @returns {string}
     */
    private _getLeftPosition(element);
    /**
     * Generates the pixel width from the provided element in string format.
     * @param element
     * @returns {string}
     */
    private _getElementWidth(element);
}
