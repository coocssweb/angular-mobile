import { EventEmitter, QueryList, TemplateRef } from '@angular/core';
import { MenuPositionX, MenuPositionY } from './menu-positions';
import { MdMenuItem } from './menu-item';
export declare class MdMenu {
    _showClickCatcher: boolean;
    private _focusedItemIndex;
    _classList: Object;
    positionX: MenuPositionX;
    positionY: MenuPositionY;
    templateRef: TemplateRef<any>;
    items: QueryList<MdMenuItem>;
    constructor(posX: MenuPositionX, posY: MenuPositionY);
    /**
     * This method takes classes set on the host md-menu element and applies them on the
     * menu template that displays in the overlay container.  Otherwise, it's difficult
     * to style the containing menu from outside the component.
     * @param classes list of class names
     */
    classList: string;
    close: EventEmitter<{}>;
    /**
     * This function toggles the display of the menu's click catcher element.
     * This element covers the viewport when the menu is open to detect clicks outside the menu.
     * TODO: internal
     */
    _setClickCatcher(bool: boolean): void;
    /**
     * Focus the first item in the menu. This method is used by the menu trigger
     * to focus the first item when the menu is opened by the ENTER key.
     * TODO: internal
     */
    _focusFirstItem(): void;
    _handleKeydown(event: KeyboardEvent): void;
    /**
     * This emits a close event to which the trigger is subscribed. When emitted, the
     * trigger will close the menu.
     */
    private _emitCloseEvent();
    private _focusNextItem();
    private _focusPreviousItem();
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
    private _updateFocusedItemIndex(delta, menuItems?);
    private _setPositionX(pos);
    private _setPositionY(pos);
}
