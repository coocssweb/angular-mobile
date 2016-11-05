import * as tscWrapped from '@angular/tsc-wrapped/src/compiler_host';
import * as ts from 'typescript';
export declare class NgcWebpackCompilerHost extends tscWrapped.DelegatingHost {
    fileCache: Map<string, string>;
    constructor(delegate: ts.CompilerHost);
}
export declare function createCompilerHost(tsConfig: any): NgcWebpackCompilerHost;
