import { ModuleWithProviders } from '@angular/core';
import { MdLiveAnnouncer } from './live-announcer';
import { InteractivityChecker } from './interactivity-checker';
export { FocusTrap } from './focus-trap';
export { MdLiveAnnouncer } from './live-announcer';
export { InteractivityChecker } from './interactivity-checker';
export declare const A11Y_PROVIDERS: (typeof InteractivityChecker | typeof MdLiveAnnouncer)[];
export declare class A11yModule {
    static forRoot(): ModuleWithProviders;
}
