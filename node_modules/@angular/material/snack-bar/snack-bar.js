var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { NgModule, Injectable } from '@angular/core';
import { ComponentPortal, Overlay, OverlayModule, OverlayState, PortalModule, OVERLAY_PROVIDERS, MdLiveAnnouncer } from '../core';
import { CommonModule } from '@angular/common';
import { MdSnackBarRef } from './snack-bar-ref';
import { MdSnackBarContainer } from './snack-bar-container';
import { SimpleSnackBar } from './simple-snack-bar';
export { MdSnackBarRef } from './snack-bar-ref';
export { MdSnackBarConfig } from './snack-bar-config';
// TODO(josephperrott): Animate entrance and exit of snack bars.
// TODO(josephperrott): Automate dismiss after timeout.
/**
 * Service to dispatch Material Design snack bar messages.
 */
export var MdSnackBar = (function () {
    function MdSnackBar(_overlay, _live) {
        this._overlay = _overlay;
        this._live = _live;
    }
    /**
     * Creates and dispatches a snack bar with a custom component for the content, removing any
     * currently opened snack bars.
     */
    MdSnackBar.prototype.openFromComponent = function (component, config) {
        if (this._snackBarRef) {
            this._snackBarRef.dismiss();
        }
        var overlayRef = this._createOverlay();
        var snackBarContainer = this._attachSnackBarContainer(overlayRef, config);
        var mdSnackBarRef = this._attachSnackbarContent(component, snackBarContainer, overlayRef);
        this._live.announce(config.announcementMessage, config.politeness);
        return mdSnackBarRef;
    };
    /**
     * Creates and dispatches a snack bar.
     */
    MdSnackBar.prototype.open = function (message, actionLabel, config) {
        config.announcementMessage = message;
        var simpleSnackBarRef = this.openFromComponent(SimpleSnackBar, config);
        simpleSnackBarRef.instance.snackBarRef = simpleSnackBarRef;
        simpleSnackBarRef.instance.message = message;
        simpleSnackBarRef.instance.action = actionLabel;
        return simpleSnackBarRef;
    };
    /**
     * Attaches the snack bar container component to the overlay.
     */
    MdSnackBar.prototype._attachSnackBarContainer = function (overlayRef, config) {
        var containerPortal = new ComponentPortal(MdSnackBarContainer, config.viewContainerRef);
        var containerRef = overlayRef.attach(containerPortal);
        containerRef.instance.snackBarConfig = config;
        return containerRef.instance;
    };
    /**
     * Places a new component as the content of the snack bar container.
     */
    MdSnackBar.prototype._attachSnackbarContent = function (component, container, overlayRef) {
        var portal = new ComponentPortal(component);
        var contentRef = container.attachComponentPortal(portal);
        var snackBarRef = new MdSnackBarRef(contentRef.instance, overlayRef);
        this._snackBarRef = snackBarRef;
        return snackBarRef;
    };
    /**
     * Creates a new overlay and places it in the correct location.
     */
    MdSnackBar.prototype._createOverlay = function () {
        var state = new OverlayState();
        state.positionStrategy = this._overlay.position().global()
            .fixed()
            .centerHorizontally()
            .bottom('0');
        return this._overlay.create(state);
    };
    MdSnackBar = __decorate([
        Injectable(), 
        __metadata('design:paramtypes', [Overlay, MdLiveAnnouncer])
    ], MdSnackBar);
    return MdSnackBar;
}());
export var MdSnackBarModule = (function () {
    function MdSnackBarModule() {
    }
    MdSnackBarModule.forRoot = function () {
        return {
            ngModule: MdSnackBarModule,
            providers: [MdSnackBar, OVERLAY_PROVIDERS, MdLiveAnnouncer]
        };
    };
    MdSnackBarModule = __decorate([
        NgModule({
            imports: [OverlayModule, PortalModule, CommonModule],
            exports: [MdSnackBarContainer],
            declarations: [MdSnackBarContainer, SimpleSnackBar],
            entryComponents: [MdSnackBarContainer, SimpleSnackBar],
        }), 
        __metadata('design:paramtypes', [])
    ], MdSnackBarModule);
    return MdSnackBarModule;
}());

//# sourceMappingURL=snack-bar.js.map
