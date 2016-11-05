import { ViewContainerRef } from '@angular/core';
import { AriaLivePoliteness } from '../core';
export declare class MdSnackBarConfig {
    /** The politeness level for the MdAriaLiveAnnouncer announcement. */
    politeness: AriaLivePoliteness;
    /** Message to be announced by the MdAriaLiveAnnouncer */
    announcementMessage: string;
    /** The view container to place the overlay for the snack bar into. */
    viewContainerRef: ViewContainerRef;
    constructor(viewContainerRef: ViewContainerRef);
}
