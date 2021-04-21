//By default development mode
let mode = "development";

if (process.env.NODE_ENV === "production") {
    mode = "production";
}

module.exports={
    mode:"development",

    module:{
        rules: [
            {
                test:/\.js$/,
                exclude:/node_module/,
                use:{
                    loader:"babel-loader"
                }
            }
        ]
    },
    //source maps
    devtool:"source-map",
    devServer:{
        contentBase:'./dist'
    }
};

