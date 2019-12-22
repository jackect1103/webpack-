let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode:'production',
    entry:{
        home:'./src/index.js'
    },
    output:{
        filename:'[name].js',
        path:path.resolve(__dirname,'dist')
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html'
        })
    ],
    module:{
        rules:[
            {
                test:/\.js$/,
                use:{
                    loader:'babel-loader',
                    options:{
                        presets:['@babel/preset-env']
                    }
                }
            }
        ]
    },
    // 1）源码映射文件，会单独生成一个source-map文件， 出错了会标识 单前错的列和行
    // devtool:'source-map',//增加映射文件，可以帮助我们调试文件
    // 2) 不会产生单独的源码映射文件，但会标识错误的行和列
    // devtool:'eval-source-map'
    // 3）会产生单独的源码文件，但不会标识错误的列
    devtool:'cheap-module-source-map'
}