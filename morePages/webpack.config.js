let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    mode:'development',
    entry:{
        home:'./src/index.js',
        other:'./src/other.js'
    },
    output:{
        //[name] 会分别产生两个出口文件
        filename:'[name].js',
        path:path.resolve(__dirname,'dist')
    },
    plugins:[
        //需要分别使用两次html-webpack-plugin插件，对index.html进行两次模板
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'home.html',
            chunks: ['home'],//指明当前模板段是谁的
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'other.html',
            chunks: ['other']
        })
    ],
    module:{
        rules:[

        ]
    }
}