import { ElementRef, EventEmitter, ViewContainerRef, AfterViewInit, OnDestroy, Renderer } from '@angular/core';
import { MdMenu } from './menu-directive';
import { Overlay } from '../core';
/**
 * This directive is intended to be used in conjunction with an md-menu tag.  It is
 * responsible for toggling the display of the provided menu instance.
 */
export declare class MdMenuTrigger implements AfterViewInit, OnDestroy {
    private _overlay;
    private _element;
    private _viewContainerRef;
    private _renderer;
    private _portal;
    private _overlayRef;
    private _menuOpen;
    private _openedFromKeyboard;
    menu: MdMenu;
    onMenuOpen: EventEmitter<{}>;
    onMenuClose: EventEmitter<{}>;
    constructor(_overlay: Overlay, _element: ElementRef, _viewContainerRef: ViewContainerRef, _renderer: Renderer);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    readonly menuOpen: boolean;
    toggleMenu(): void;
    openMenu(): void;
    closeMenu(): void;
    destroyMenu(): void;
    focus(): void;
    /**
     * This method sets the menu state to open and focuses the first item if
     * the menu was opened via the keyboard.
     */
    private _initMenu();
    /**
     * This method resets the menu when it's closed, most importantly restoring
     * focus to the menu trigger if the menu was opened via the keyboard.
     */
    private _resetMenu();
    private _setIsMenuOpen(isOpen);
    /**
     *  This method checks that a valid instance of MdMenu has been passed into
     *  md-menu-trigger-for.  If not, an exception is thrown.
     */
    private _checkMenu();
    /**
     *  This method creates the overlay from the provided menu's template and saves its
     *  OverlayRef so that it can be attached to the DOM when openMenu is called.
     */
    private _createOverlay();
    /**
     * This method builds the configuration object needed to create the overlay, the OverlayState.
     * @returns OverlayState
     */
    private _getOverlayConfig();
    /**
     * This method builds the position strategy for the overlay, so the menu is properly connected
     * to the trigger.
     * @returns ConnectedPositionStrategy
     */
    private _getPosition();
    _handleKeydown(event: KeyboardEvent): void;
}
