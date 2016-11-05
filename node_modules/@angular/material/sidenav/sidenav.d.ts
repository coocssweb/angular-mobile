import { ModuleWithProviders, AfterContentInit, ElementRef, QueryList, EventEmitter, Renderer } from '@angular/core';
import { Dir, MdError } from '../core';
/** Exception thrown when two MdSidenav are matching the same side. */
export declare class MdDuplicatedSidenavError extends MdError {
    constructor(align: string);
}
/**
 * <md-sidenav> component.
 *
 * This component corresponds to the drawer of the sidenav.
 *
 * Please refer to README.md for examples on how to use it.
 */
export declare class MdSidenav {
    private _elementRef;
    /** Alignment of the sidenav (direction neutral); whether 'start' or 'end'. */
    align: 'start' | 'end';
    /** Mode of the sidenav; whether 'over' or 'side'. */
    mode: 'over' | 'push' | 'side';
    /** Whether the sidenav is opened. */
    _opened: boolean;
    /** Event emitted when the sidenav is being opened. Use this to synchronize animations. */
    onOpenStart: EventEmitter<void>;
    /** Event emitted when the sidenav is fully opened. */
    onOpen: EventEmitter<void>;
    /** Event emitted when the sidenav is being closed. Use this to synchronize animations. */
    onCloseStart: EventEmitter<void>;
    /** Event emitted when the sidenav is fully closed. */
    onClose: EventEmitter<void>;
    /**
     * @param _elementRef The DOM element reference. Used for transition and width calculation.
     *     If not available we do not hook on transitions.
     */
    constructor(_elementRef: ElementRef);
    /**
     * Whether the sidenav is opened. We overload this because we trigger an event when it
     * starts or end.
     */
    opened: boolean;
    /** Open this sidenav, and return a Promise that will resolve when it's fully opened (or get
     * rejected if it didn't). */
    open(): Promise<void>;
    /**
     * Close this sidenav, and return a Promise that will resolve when it's fully closed (or get
     * rejected if it didn't).
     */
    close(): Promise<void>;
    /**
     * Toggle this sidenav. This is equivalent to calling open() when it's already opened, or
     * close() when it's closed.
     * @param isOpen
     */
    toggle(isOpen?: boolean): Promise<void>;
    /**
     * When transition has finished, set the internal state for classes and emit the proper event.
     * The event passed is actually of type TransitionEvent, but that type is not available in
     * Android so we use any.
     */
    _onTransitionEnd(transitionEvent: TransitionEvent): void;
    readonly _isClosing: boolean;
    readonly _isOpening: boolean;
    readonly _isClosed: boolean;
    readonly _isOpened: boolean;
    readonly _isEnd: boolean;
    readonly _modeSide: boolean;
    readonly _modeOver: boolean;
    readonly _modePush: boolean;
    /** TODO: internal (needed by MdSidenavLayout). */
    readonly _width: any;
    private _transition;
    private _openPromise;
    private _openPromiseResolve;
    private _openPromiseReject;
    private _closePromise;
    private _closePromiseResolve;
    private _closePromiseReject;
}
/**
 * <md-sidenav-layout> component.
 *
 * This is the parent component to one or two <md-sidenav>s that validates the state internally
 * and coordinate the backdrop and content styling.
 */
export declare class MdSidenavLayout implements AfterContentInit {
    private _dir;
    private _element;
    private _renderer;
    _sidenavs: QueryList<MdSidenav>;
    readonly start: MdSidenav;
    readonly end: MdSidenav;
    /** The sidenav at the start/end alignment, independent of direction. */
    private _start;
    private _end;
    /**
     * The sidenav at the left/right. When direction changes, these will change as well.
     * They're used as aliases for the above to set the left/right style properly.
     * In LTR, _left == _start and _right == _end.
     * In RTL, _left == _end and _right == _start.
     */
    private _left;
    private _right;
    constructor(_dir: Dir, _element: ElementRef, _renderer: Renderer);
    /** TODO: internal */
    ngAfterContentInit(): void;
    private _watchSidenavToggle(sidenav);
    private _setLayoutClass(sidenav, bool);
    /** Validate the state of the sidenav children components. */
    private _validateDrawers();
    _closeModalSidenav(): void;
    _isShowingBackdrop(): boolean;
    private _isSidenavOpen(side);
    /**
     * Return the width of the sidenav, if it's in the proper mode and opened.
     * This may relayout the view, so do not call this often.
     * @param sidenav
     * @param mode
     */
    private _getSidenavEffectiveWidth(sidenav, mode);
    _getMarginLeft(): number;
    _getMarginRight(): number;
    _getPositionLeft(): number;
    _getPositionRight(): number;
    /**
     * Returns the horizontal offset for the content area.  There should never be a value for both
     * left and right, so by subtracting the right value from the left value, we should always get
     * the appropriate offset.
     */
    _getPositionOffset(): number;
    /**
     * This is using [ngStyle] rather than separate [style...] properties because [style.transform]
     * doesn't seem to work right now.
     */
    _getStyles(): {
        marginLeft: string;
        marginRight: string;
        transform: string;
    };
}
export declare class MdSidenavModule {
    static forRoot(): ModuleWithProviders;
}
