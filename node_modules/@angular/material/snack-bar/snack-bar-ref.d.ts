import { OverlayRef } from '../core';
import { Observable } from 'rxjs/Observable';
/**
 * Reference to a snack bar dispatched from the snack bar service.
 */
export declare class MdSnackBarRef<T> {
    private _overlayRef;
    /** The instance of the component making up the content of the snack bar. */
    readonly instance: T;
    /** Subject for notifying the user that the snack bar has closed. */
    private _afterClosed;
    constructor(instance: T, _overlayRef: OverlayRef);
    /** Dismisses the snack bar. */
    dismiss(): void;
    /** Gets an observable that is notified when the snack bar is finished closing. */
    afterDismissed(): Observable<void>;
}
