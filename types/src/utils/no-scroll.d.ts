export declare function getScrollbarSize(): number;
export declare function hasScrollbar(): boolean;
export declare function on(): void;
export declare function off(): void;
export declare function toggle(): void;
declare const noScroll: {
    on: typeof on;
    off: typeof off;
    toggle: typeof toggle;
};
export default noScroll;
