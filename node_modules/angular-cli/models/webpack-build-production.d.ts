declare module 'webpack' {
    interface LoaderOptionsPlugin {
    }
    interface LoaderOptionsPluginStatic {
        new (optionsObject: any): LoaderOptionsPlugin;
    }
    interface Webpack {
        LoaderOptionsPlugin: LoaderOptionsPluginStatic;
    }
}
export declare const getWebpackProdConfigPartial: (projectRoot: string, appConfig: any) => {
    devtool: string;
    output: {
        path: string;
        filename: string;
        sourceMapFilename: string;
        chunkFilename: string;
    };
    plugins: any[];
};
export {};
