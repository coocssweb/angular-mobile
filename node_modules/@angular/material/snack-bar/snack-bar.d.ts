import { ModuleWithProviders } from '@angular/core';
import { ComponentType, Overlay, MdLiveAnnouncer } from '../core';
import { MdSnackBarConfig } from './snack-bar-config';
import { MdSnackBarRef } from './snack-bar-ref';
import { SimpleSnackBar } from './simple-snack-bar';
export { MdSnackBarRef } from './snack-bar-ref';
export { MdSnackBarConfig } from './snack-bar-config';
/**
 * Service to dispatch Material Design snack bar messages.
 */
export declare class MdSnackBar {
    private _overlay;
    private _live;
    /** A reference to the current snack bar in the view. */
    private _snackBarRef;
    constructor(_overlay: Overlay, _live: MdLiveAnnouncer);
    /**
     * Creates and dispatches a snack bar with a custom component for the content, removing any
     * currently opened snack bars.
     */
    openFromComponent<T>(component: ComponentType<T>, config: MdSnackBarConfig): MdSnackBarRef<T>;
    /**
     * Creates and dispatches a snack bar.
     */
    open(message: string, actionLabel: string, config: MdSnackBarConfig): MdSnackBarRef<SimpleSnackBar>;
    /**
     * Attaches the snack bar container component to the overlay.
     */
    private _attachSnackBarContainer(overlayRef, config);
    /**
     * Places a new component as the content of the snack bar container.
     */
    private _attachSnackbarContent<T>(component, container, overlayRef);
    /**
     * Creates a new overlay and places it in the correct location.
     */
    private _createOverlay();
}
export declare class MdSnackBarModule {
    static forRoot(): ModuleWithProviders;
}
