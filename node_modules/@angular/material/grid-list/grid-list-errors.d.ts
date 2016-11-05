import { MdError } from '../core';
/**
 * Exception thrown when cols property is missing from grid-list
 */
export declare class MdGridListColsError extends MdError {
    constructor();
}
/**
 * Exception thrown when a tile's colspan is longer than the number of cols in list
 */
export declare class MdGridTileTooWideError extends MdError {
    constructor(cols: number, listLength: number);
}
/**
 * Exception thrown when an invalid ratio is passed in as a rowHeight
 */
export declare class MdGridListBadRatioError extends MdError {
    constructor(value: string);
}
