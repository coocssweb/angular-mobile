// TODO(kara): prevent-close functionality
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Attribute, Component, ContentChildren, EventEmitter, Input, Output, QueryList, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { MdMenuInvalidPositionX, MdMenuInvalidPositionY } from './menu-errors';
import { MdMenuItem } from './menu-item';
import { UP_ARROW, DOWN_ARROW, TAB } from '../core';
export var MdMenu = (function () {
    function MdMenu(posX, posY) {
        this._showClickCatcher = false;
        this._focusedItemIndex = 0;
        this.positionX = 'after';
        this.positionY = 'below';
        this.close = new EventEmitter;
        if (posX) {
            this._setPositionX(posX);
        }
        if (posY) {
            this._setPositionY(posY);
        }
    }
    Object.defineProperty(MdMenu.prototype, "classList", {
        /**
         * This method takes classes set on the host md-menu element and applies them on the
         * menu template that displays in the overlay container.  Otherwise, it's difficult
         * to style the containing menu from outside the component.
         * @param classes list of class names
         */
        set: function (classes) {
            this._classList = classes.split(' ').reduce(function (obj, className) {
                obj[className] = true;
                return obj;
            }, {});
        },
        enumerable: true,
        configurable: true
    });
    /**
     * This function toggles the display of the menu's click catcher element.
     * This element covers the viewport when the menu is open to detect clicks outside the menu.
     * TODO: internal
     */
    MdMenu.prototype._setClickCatcher = function (bool) {
        this._showClickCatcher = bool;
    };
    /**
     * Focus the first item in the menu. This method is used by the menu trigger
     * to focus the first item when the menu is opened by the ENTER key.
     * TODO: internal
     */
    MdMenu.prototype._focusFirstItem = function () {
        this.items.first.focus();
    };
    // TODO(kara): update this when (keydown.downArrow) testability is fixed
    // TODO: internal
    MdMenu.prototype._handleKeydown = function (event) {
        if (event.keyCode === DOWN_ARROW) {
            this._focusNextItem();
        }
        else if (event.keyCode === UP_ARROW) {
            this._focusPreviousItem();
        }
        else if (event.keyCode === TAB) {
            this._emitCloseEvent();
        }
    };
    /**
     * This emits a close event to which the trigger is subscribed. When emitted, the
     * trigger will close the menu.
     */
    MdMenu.prototype._emitCloseEvent = function () {
        this._focusedItemIndex = 0;
        this.close.emit(null);
    };
    MdMenu.prototype._focusNextItem = function () {
        this._updateFocusedItemIndex(1);
        this.items.toArray()[this._focusedItemIndex].focus();
    };
    MdMenu.prototype._focusPreviousItem = function () {
        this._updateFocusedItemIndex(-1);
        this.items.toArray()[this._focusedItemIndex].focus();
    };
    /**
     * This method sets focus to the correct menu item, given a list of menu items and the delta
     * between the currently focused menu item and the new menu item to be focused. It will
     * continue to move down the list until it finds an item that is not disabled, and it will wrap
     * if it encounters either end of the menu.
     *
     * @param delta the desired change in focus index
     * @param menuItems the menu items that should be focused
     * @private
       */
    MdMenu.prototype._updateFocusedItemIndex = function (delta, menuItems) {
        if (menuItems === void 0) { menuItems = this.items.toArray(); }
        // when focus would leave menu, wrap to beginning or end
        this._focusedItemIndex = (this._focusedItemIndex + delta + this.items.length)
            % this.items.length;
        // skip all disabled menu items recursively until an active one
        // is reached or the menu closes for overreaching bounds
        while (menuItems[this._focusedItemIndex].disabled) {
            this._updateFocusedItemIndex(delta, menuItems);
        }
    };
    MdMenu.prototype._setPositionX = function (pos) {
        if (pos !== 'before' && pos !== 'after') {
            throw new MdMenuInvalidPositionX();
        }
        this.positionX = pos;
    };
    MdMenu.prototype._setPositionY = function (pos) {
        if (pos !== 'above' && pos !== 'below') {
            throw new MdMenuInvalidPositionY();
        }
        this.positionY = pos;
    };
    __decorate([
        ViewChild(TemplateRef), 
        __metadata('design:type', TemplateRef)
    ], MdMenu.prototype, "templateRef", void 0);
    __decorate([
        ContentChildren(MdMenuItem), 
        __metadata('design:type', QueryList)
    ], MdMenu.prototype, "items", void 0);
    __decorate([
        Input('class'), 
        __metadata('design:type', String), 
        __metadata('design:paramtypes', [String])
    ], MdMenu.prototype, "classList", null);
    __decorate([
        Output(), 
        __metadata('design:type', Object)
    ], MdMenu.prototype, "close", void 0);
    MdMenu = __decorate([
        Component({selector: 'md-menu',
            host: { 'role': 'menu' },
            template: "<template> <div class=\"md-menu\" [ngClass]=\"_classList\" (click)=\"_emitCloseEvent()\" (keydown)=\"_handleKeydown($event)\"> <ng-content></ng-content> </div> </template> <div class=\"md-menu-click-catcher\" *ngIf=\"_showClickCatcher\" (click)=\"_emitCloseEvent()\"></div>",
            styles: [".md-menu { box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12); min-width: 112px; max-width: 280px; max-height: calc(100vh + 48px); overflow: auto; -webkit-overflow-scrolling: touch; padding-top: 8px; padding-bottom: 8px; } [md-menu-item] { cursor: pointer; user-select: none; outline: none; border: none; white-space: nowrap; overflow-x: hidden; text-overflow: ellipsis; display: flex; flex-direction: row; align-items: center; height: 48px; padding: 0 16px; font-size: 16px; font-family: Roboto, \"Helvetica Neue\", sans-serif; text-align: start; text-decoration: none; } [md-menu-item][disabled] { cursor: default; } button[md-menu-item] { width: 100%; } .md-menu-click-catcher { position: fixed; top: 0; left: 0; right: 0; bottom: 0; } /*# sourceMappingURL=menu.css.map */ "],
            encapsulation: ViewEncapsulation.None,
            exportAs: 'mdMenu'
        }),
        __param(0, Attribute('x-position')),
        __param(1, Attribute('y-position')), 
        __metadata('design:paramtypes', [String, String])
    ], MdMenu);
    return MdMenu;
}());

//# sourceMappingURL=menu-directive.js.map
