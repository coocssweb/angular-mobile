import { Subject } from 'rxjs/Subject';
// TODO(josephperrott): Implement onAction observable.
/**
 * Reference to a snack bar dispatched from the snack bar service.
 */
export var MdSnackBarRef = (function () {
    function MdSnackBarRef(instance, _overlayRef) {
        this._overlayRef = _overlayRef;
        /** Subject for notifying the user that the snack bar has closed. */
        this._afterClosed = new Subject();
        // Sets the readonly instance of the snack bar content component.
        this.instance = instance;
    }
    /** Dismisses the snack bar. */
    MdSnackBarRef.prototype.dismiss = function () {
        if (!this._afterClosed.closed) {
            this._overlayRef.dispose();
            this._afterClosed.complete();
        }
    };
    /** Gets an observable that is notified when the snack bar is finished closing. */
    MdSnackBarRef.prototype.afterDismissed = function () {
        return this._afterClosed.asObservable();
    };
    return MdSnackBarRef;
}());

//# sourceMappingURL=snack-bar-ref.js.map
