const MiniCssExtractPlugin = require("mini-css-extract-plugin");

//By default development mode
let mode = "development";
let target = "web";

if (process.env.NODE_ENV === "production") {
    mode = "production";
    // Temporary workaround for 'browserslist' bug that is being patched in the near future
  target = "browserslist";
}

module.exports={
    mode:"development",
    target:target,

    plugins: [new MiniCssExtractPlugin()],

    module:{
        rules: [
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
                test:/\.jsx?$/,
                exclude:/node_module/,
                use:{
                    loader:"babel-loader"
                }
            }
        ]
    },

    //extention support automatically
    resolve: {
        extensions: [".js", ".jsx"],
    },

    //source maps
    devtool:"source-map",
    devServer:{
        contentBase:'./dist',
        //hot reloading - faster
        hot:true,
    }
};

