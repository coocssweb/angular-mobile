import * as ts from 'typescript';
/**
 * Option Constants
 */
export interface AotPluginOptions {
    tsConfigPath: string;
    basePath?: string;
    entryModule?: string;
    genDir?: string;
    mainPath?: string;
    typeChecking?: boolean;
}
export declare class ModuleRoute {
    readonly path: string;
    readonly className: string;
    constructor(path: string, className?: string);
    toString(): string;
    static fromString(entry: string): ModuleRoute;
}
export declare class AotPlugin {
    private _entryModule;
    private _compilerOptions;
    private _angularCompilerOptions;
    private _program;
    private _reflector;
    private _reflectorHost;
    private _rootFilePath;
    private _compilerHost;
    private _resourceLoader;
    private _lazyRoutes;
    private _donePromise;
    private _compiler;
    private _compilation;
    private _typeCheck;
    constructor(options: AotPluginOptions);
    readonly basePath: string;
    readonly compilation: any;
    readonly compilerOptions: ts.CompilerOptions;
    readonly done: Promise<void>;
    readonly entryModule: ModuleRoute;
    readonly genDir: string;
    readonly program: ts.Program;
    readonly typeCheck: boolean;
    private _setupOptions(options);
    apply(compiler: any): void;
    private _make(compilation, cb);
    private _resolveModule(module, containingFile);
    private _processNgModule(module, containingFile);
    private getNgModuleMetadata(staticSymbol);
    private extractLoadChildren(ngModuleDecorator);
    private collectRoutes(providers);
    private collectLoadChildren(routes);
}
