const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

//By default development mode
let mode = "development";
let target = "web";

if (process.env.NODE_ENV === "production") {
    mode = "production";
    // Temporary workaround for 'browserslist' bug that is being patched in the near future
    target = "browserslist";
}

module.exports = {
    mode: "development",
    target: target,

    // This is unnecessary in Webpack 5, because it's the default.
    // However, react-refresh-webpack-plugin can't find the entry without it.
    entry: "./src/index.js",

    output: {
        // output path is required for `clean-webpack-plugin`
           path: path.resolve(__dirname, "dist"),
        // this places all images processed in an image folder
        assetModuleFilename: "images/[hash][ext][query]",
    },
    

    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin(), 
        new HtmlWebpackPlugin({template: "./src/index.html",})
    ],

    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                /**
                * The `type` setting replaces the need for "url-loader"
                * and "file-loader" in Webpack 5.
                *
                * setting `type` to "asset" will automatically pick between
                * outputing images to a file, or inlining them in the bundle as base64
                * with a default max inline size of 8kb
                */
                type: "asset",

                /**
                 * If you want to inline larger images, you can set
                 * a custom `maxSize` for inline like so:
                 */
                // parser: {
                //   dataUrlCondition: {
                //     maxSize: 30 * 1024,
                //   },
                // },
            },
            {
                test: /\.(s[ac]|c)ss$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        // This is required for asset imports in CSS, such as url()
                        options: { publicPath: "" },
                    },
                    "css-loader",
                    "postcss-loader",
                    // according to the docs, sass-loader should be at the bottom, which
                    // loads it first to avoid prefixes in your sourcemaps and other issues.
                    "sass-loader",
                ],
            },
            {
                test: /\.jsx?$/,
                exclude: /node_module/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    },

    //extention support automatically
    resolve: {
        extensions: [".js", ".jsx"],
    },

    //source maps
    devtool: "source-map",
    devServer: {
        contentBase: './dist',
        //hot reloading - faster
        hot: true,
    }
};

