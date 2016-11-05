var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, ElementRef, Input, Output, EventEmitter, HostListener, ViewContainerRef, Renderer } from '@angular/core';
import { MdMenu } from './menu-directive';
import { MdMenuMissingError } from './menu-errors';
import { ENTER, Overlay, OverlayState, TemplatePortal } from '../core';
/**
 * This directive is intended to be used in conjunction with an md-menu tag.  It is
 * responsible for toggling the display of the provided menu instance.
 */
export var MdMenuTrigger = (function () {
    function MdMenuTrigger(_overlay, _element, _viewContainerRef, _renderer) {
        this._overlay = _overlay;
        this._element = _element;
        this._viewContainerRef = _viewContainerRef;
        this._renderer = _renderer;
        this._menuOpen = false;
        // tracking input type is necessary so it's possible to only auto-focus
        // the first item of the list when the menu is opened via the keyboard
        this._openedFromKeyboard = false;
        this.onMenuOpen = new EventEmitter();
        this.onMenuClose = new EventEmitter();
    }
    MdMenuTrigger.prototype.ngAfterViewInit = function () {
        var _this = this;
        this._checkMenu();
        this.menu.close.subscribe(function () { return _this.closeMenu(); });
    };
    MdMenuTrigger.prototype.ngOnDestroy = function () { this.destroyMenu(); };
    Object.defineProperty(MdMenuTrigger.prototype, "menuOpen", {
        get: function () { return this._menuOpen; },
        enumerable: true,
        configurable: true
    });
    MdMenuTrigger.prototype.toggleMenu = function () {
        return this._menuOpen ? this.closeMenu() : this.openMenu();
    };
    MdMenuTrigger.prototype.openMenu = function () {
        this._createOverlay();
        this._overlayRef.attach(this._portal);
        this._initMenu();
    };
    MdMenuTrigger.prototype.closeMenu = function () {
        if (this._overlayRef) {
            this._overlayRef.detach();
            this._resetMenu();
        }
    };
    MdMenuTrigger.prototype.destroyMenu = function () {
        if (this._overlayRef) {
            this._overlayRef.dispose();
            this._overlayRef = null;
        }
    };
    MdMenuTrigger.prototype.focus = function () {
        this._renderer.invokeElementMethod(this._element.nativeElement, 'focus');
    };
    /**
     * This method sets the menu state to open and focuses the first item if
     * the menu was opened via the keyboard.
     */
    MdMenuTrigger.prototype._initMenu = function () {
        this._setIsMenuOpen(true);
        if (this._openedFromKeyboard) {
            this.menu._focusFirstItem();
        }
    };
    ;
    /**
     * This method resets the menu when it's closed, most importantly restoring
     * focus to the menu trigger if the menu was opened via the keyboard.
     */
    MdMenuTrigger.prototype._resetMenu = function () {
        this._setIsMenuOpen(false);
        if (this._openedFromKeyboard) {
            this.focus();
            this._openedFromKeyboard = false;
        }
    };
    // set state rather than toggle to support triggers sharing a menu
    MdMenuTrigger.prototype._setIsMenuOpen = function (isOpen) {
        this._menuOpen = isOpen;
        this.menu._setClickCatcher(isOpen);
        this._menuOpen ? this.onMenuOpen.emit(null) : this.onMenuClose.emit(null);
    };
    /**
     *  This method checks that a valid instance of MdMenu has been passed into
     *  md-menu-trigger-for.  If not, an exception is thrown.
     */
    MdMenuTrigger.prototype._checkMenu = function () {
        if (!this.menu || !(this.menu instanceof MdMenu)) {
            throw new MdMenuMissingError();
        }
    };
    /**
     *  This method creates the overlay from the provided menu's template and saves its
     *  OverlayRef so that it can be attached to the DOM when openMenu is called.
     */
    MdMenuTrigger.prototype._createOverlay = function () {
        if (!this._overlayRef) {
            this._portal = new TemplatePortal(this.menu.templateRef, this._viewContainerRef);
            this._overlayRef = this._overlay.create(this._getOverlayConfig());
        }
    };
    /**
     * This method builds the configuration object needed to create the overlay, the OverlayState.
     * @returns OverlayState
     */
    MdMenuTrigger.prototype._getOverlayConfig = function () {
        var overlayState = new OverlayState();
        overlayState.positionStrategy = this._getPosition();
        return overlayState;
    };
    /**
     * This method builds the position strategy for the overlay, so the menu is properly connected
     * to the trigger.
     * @returns ConnectedPositionStrategy
     */
    MdMenuTrigger.prototype._getPosition = function () {
        var positionX = this.menu.positionX === 'before' ? 'end' : 'start';
        var positionY = this.menu.positionY === 'above' ? 'bottom' : 'top';
        return this._overlay.position().connectedTo(this._element, { originX: positionX, originY: positionY }, { overlayX: positionX, overlayY: positionY });
    };
    // TODO: internal
    MdMenuTrigger.prototype._handleKeydown = function (event) {
        if (event.keyCode === ENTER) {
            this._openedFromKeyboard = true;
        }
    };
    __decorate([
        Input('md-menu-trigger-for'), 
        __metadata('design:type', MdMenu)
    ], MdMenuTrigger.prototype, "menu", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', Object)
    ], MdMenuTrigger.prototype, "onMenuOpen", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', Object)
    ], MdMenuTrigger.prototype, "onMenuClose", void 0);
    __decorate([
        HostListener('click'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], MdMenuTrigger.prototype, "toggleMenu", null);
    MdMenuTrigger = __decorate([
        Directive({
            selector: '[md-menu-trigger-for]',
            host: {
                'aria-haspopup': 'true',
                '(keydown)': '_handleKeydown($event)'
            },
            exportAs: 'mdMenuTrigger'
        }), 
        __metadata('design:paramtypes', [Overlay, ElementRef, ViewContainerRef, Renderer])
    ], MdMenuTrigger);
    return MdMenuTrigger;
}());

//# sourceMappingURL=menu-trigger.js.map
