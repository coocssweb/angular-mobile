// Due to a bug in the ChromeDriver, Angular 2 keyboard events are not triggered by `sendKeys`
// during E2E tests when using dot notation such as `(keydown.rightArrow)`. To get around this,
// we are temporarily using a single (keydown) handler.
// See: https://github.com/angular/angular/issues/9419
export var UP_ARROW = 38;
export var DOWN_ARROW = 40;
export var RIGHT_ARROW = 39;
export var LEFT_ARROW = 37;
export var ENTER = 13;
export var TAB = 9;

//# sourceMappingURL=keycodes.js.map
