import { ElementRef } from '@angular/core';
/** Used in the `md-tab-group` view to display tab labels */
export declare class MdTabLabelWrapper {
    elementRef: ElementRef;
    constructor(elementRef: ElementRef);
    /**
     * Sets focus on the wrapper element
     */
    focus(): void;
}
