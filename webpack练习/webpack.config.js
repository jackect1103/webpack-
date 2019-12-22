let path = require('path');
let htmlWebpackPlugin = require('html-webpack-plugin');
let MiniCssExtractPlugin = require('mini-css-extract-plugin')
//使用到了common.js的模块化开发
module.exports = {
    //mode ‘production=>生产’，‘development=》开发’
    mode:'development',//以开发的模式下打包（不将打包后的文件压缩）
    //打包的入口文件
    entry: './src/index.js',
    output: {
        //生成的文件名字
        // filename: "bundle.[hash].js",
        filename: "bundle.js",
        //必须生成绝对路径
        path: path.resolve(__dirname,'dist'),
        //在输出路径的时候在前面添加该域名(在这里设置是全局的)
        publicPath: "http://www.baidu.com"
    },
    devServer: {//开发服务器配置
        port:8080, //设置端口
        progress:true,//进度条
        contentBase:'./dist', // 指定打开那个目录文件
        compress:true//启动所有js压缩
    },
    plugins: [//是一个数组 放着webpack所有插件
        new htmlWebpackPlugin({
            template: "./src/index.html",
            filename: "index.html",//要打包输出的文件名
            minify: {//对打包的文件进行压缩或者折行
                removeAttributeQuotes:true,//去掉双引号
                collapseWhitespace:true,
            },
            hash:true, //文件带有哈希值
        }),
        //将css样式从html中抽离成单独的css文件
        new MiniCssExtractPlugin({
            filename:'main.css'//导出的css文件名
        })
    ],
    module: {
        rules: [
            {
                test:/\.(htm|html)$/i,
                use:'html-withimg-loader'
            },
            {
                test:/\.(png|jpg|gif|jpeg)$/,
                //图片很大的时候用file-loader
                // use:'file-loader',
                //做一个限制，当我们的图片 小玉多少k的时候 用base64来转换
                use:{
                    loader:'url-loader',
                    options:{
                        //大小限制
                        limit:200*1024,
                        //将图片输入到指定的文件下，进行分类
                        outputPath:'/img/',
                        //只做用于图片的路径
                        publicPath:'http://www.baidu.com'
                    }
                }

            },

            //规则 css-loader 用于css文件中解析 @import这种语句
            //style-loader 将css样式插入到head中
            //loader 特点：单一
            //loader有顺序的，从右往左,从下向上
            {
                 test:/\.css$/,
                 use: [{
                      loader: 'style-loader',
                      options: {
                        //可以自己添加样式，并且插入到
                        insert:'top'
                       }
                  },'css-loader','postcss-loader']
            },
            {
                test:/\.less$/,
                use:[
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'less-loader'
                ]
            }
        ]
    }
}