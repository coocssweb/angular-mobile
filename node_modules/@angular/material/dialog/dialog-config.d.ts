import { ViewContainerRef } from '@angular/core';
/** Valid ARIA roles for a dialog element. */
export declare type DialogRole = 'dialog' | 'alertdialog';
/**
 * Configuration for opening a modal dialog with the MdDialog service.
 */
export declare class MdDialogConfig {
    viewContainerRef: ViewContainerRef;
    /** The ARIA role of the dialog element. */
    role: DialogRole;
}
