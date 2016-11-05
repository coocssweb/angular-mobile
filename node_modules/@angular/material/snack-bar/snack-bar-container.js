var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { BasePortalHost, PortalHostDirective } from '../core';
import { MdSnackBarContentAlreadyAttached } from './snack-bar-errors';
/**
 * Internal component that wraps user-provided snack bar content.
 */
export var MdSnackBarContainer = (function (_super) {
    __extends(MdSnackBarContainer, _super);
    function MdSnackBarContainer() {
        _super.apply(this, arguments);
    }
    /** Attach a portal as content to this snack bar container. */
    MdSnackBarContainer.prototype.attachComponentPortal = function (portal) {
        if (this._portalHost.hasAttached()) {
            throw new MdSnackBarContentAlreadyAttached();
        }
        return this._portalHost.attachComponentPortal(portal);
    };
    MdSnackBarContainer.prototype.attachTemplatePortal = function (portal) {
        throw Error('Not yet implemented');
    };
    __decorate([
        ViewChild(PortalHostDirective), 
        __metadata('design:type', PortalHostDirective)
    ], MdSnackBarContainer.prototype, "_portalHost", void 0);
    MdSnackBarContainer = __decorate([
        Component({selector: 'snack-bar-container',
            template: "<template portalHost></template>",
            styles: [":host { box-shadow: 0px 11px 15px -7px rgba(0, 0, 0, 0.2), 0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12); background: #323232; border-radius: 2px; display: block; height: 20px; max-width: 568px; min-width: 288px; overflow: hidden; padding: 14px 24px; } /*# sourceMappingURL=snack-bar-container.css.map */ "],
            host: {
                'role': 'alert'
            }
        }), 
        __metadata('design:paramtypes', [])
    ], MdSnackBarContainer);
    return MdSnackBarContainer;
}(BasePortalHost));

//# sourceMappingURL=snack-bar-container.js.map
