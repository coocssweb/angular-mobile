import { ComponentRef } from '@angular/core';
import { BasePortalHost, ComponentPortal, TemplatePortal, PortalHostDirective } from '../core';
import { MdSnackBarConfig } from './snack-bar-config';
/**
 * Internal component that wraps user-provided snack bar content.
 */
export declare class MdSnackBarContainer extends BasePortalHost {
    /** The portal host inside of this container into which the snack bar content will be loaded. */
    _portalHost: PortalHostDirective;
    /** The snack bar configuration. */
    snackBarConfig: MdSnackBarConfig;
    /** Attach a portal as content to this snack bar container. */
    attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T>;
    attachTemplatePortal(portal: TemplatePortal): Map<string, any>;
}
