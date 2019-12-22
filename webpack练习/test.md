## webpack复习
### 初始化项目
```javascript
 npm init 
 会产生package.js（用于记录/管理项目中所有信息）
```
### 先安装node（webpack基于node写的）

### 在本地安装webpack webpack-cli
```javascript
npm install webpack webpack-cli -D
-D(表示当前时开发依赖，上线的时候不需要)
webpack -version
```

### webpack四个核心概念
- 入口(entry) （webpack的打包入口处）
- 输出(output) （webpack打包后生成的文件存放处配置）
- loader (将不是javascript的文件转成webpack能打包的文件)
- 插件(plugins)  （打包优化/压缩）

### webpack可以0配置(没有使用到webpack.config.js文件)
打包js文件 --》 输出打包后的文件（js模块）
```javascript
使用webpack 5.2.0 版本的npx 来打包模块
npx webpack ==>打包文件
npx 想要解决的主要问题，就是调用**项目内部**安装的模块
```

### 手动配置webpack
- 创建webpack.config.js文件
```javascript
let path = require('path');
//使用到了common.js的模块化开发
module.exports = {
    //mode ‘production=》生产’，‘development=》开发’
    mode:'development',//以开发的模式下打包（不将打包后的文件压缩）
    //打包的入口文件
    entry: './src/index.js',
    output: {
        //生成的文件名字
        filename: "bundle.js",
        //必须生成绝对路径
        path: path.resolve(__dirname,'dist')
    }
}
```
- 解析打包文件
   * webpack存在缓存（installedModule）
   * webpack内部实现递归
   * webpack是将所有 解析的模块变成一个对象
   ```javascript
      var module = installedModules[moduleId] = {
 			i: moduleId,
			     l: false,
			     exports: {}
	  };
   ```
    * webpack返回的结果是对象中的exports对象
    ```javascript
      return module.exports;
    ```
- 修改webpack的配置文件名（会不能运行）
  * 解决：
```javascript
npx webpack --config 配置文件的名字
--config 可以手动去指定的配置文件
```

- 配置脚本（package.js）来执行打包命令 (简化打包命令)
```javascript
'scripts' :{
    "build":'webpack --config 配置文件的名字'
}
```
- 最终在终端运行的命令行
```javascript
 npm run build
```

### [webpack-dev-server ](https://blog.csdn.net/u012045958/article/details/80544040)
> 提供了一个简单的web服务器，并且能够实时重新加载（live reloading）
作用:
* 动态监听文件的改变并实时打包，输出新bundle.js文件
* 刷新浏览器

> webpack-dev-server主要是启动了一个使用express的Http服务器。

>注意：你启动webpack-dev-server后，你在目标文件夹中是看不到编译后的文件的,实时编译后的文件都保存到了 ***内存*** 当中。
因此很多同学使用webpack-dev-server进行开发的时候都看不到编译后的文件

* 设置运行命令行
```javascript
  在package.json文件下的'scripts' 设置 "dev": "webpack-dev-server"

  最终运行命令行 npm run dev
```

#### 安装html插件 （使用 plugin:[] 是一个数组）
##### 1. html-webpack-plugin 
> 原因：我们有可能在打包的时候没有创建html文件，所以使用html-webpack-plugin插件将我们打包前的html模板一起打包
> 会再打包结束后，自动生成一个HTML文件，并把打包生成的js自动引入到这个html文件中。
```javascript
  npm install html-webpack-plugin -D
```

##### 2. mini-css-extract-plugin
>将css样式从html中抽离成单独的css文件
```javascript
npm install mini-css-extract-plugin -D

在plugin中使用
new MiniCssExtractPlugin({
    filename:'main.css'//导出的css文件名
})

在loader中使用
{
    test:/\.less$/,
    use:[
        MiniCssExtractPlugin.loader,
        'css-loader',
        'less-loader'
     ]
}
```

#### 使用loader
* css-loader
    > 用于css文件中解析 @import这种语句
* style-loader
    > 将css样式插入到head中
* less-loader
    > 解析less样式
* postcss-loader
    > 自动添加浏览器前缀
   ```javascript
      npm install --save-dev postcss-loader autoprefixer
   ```
   * 同时要在根目录新建postcss.config.js
   ```javascript
      // postcss.config.js
      module.exports = {
          plugins: [
              require('autoprefixer')
          ]
      }
    ```
* bable-loader @babel/core”（babel核心模块）和“@babel/preset-env”
  > 利用babel-loader等包实现es6转es5语法
  ```javascript
    npm install babel-loader @babel/core @babel/preset-en 
  ```

#### webpack打包图片
* 图片导入的几种情况
  * 使用js创建图片(需要使用到file-loader)
  ```javascript
      import avator from './avtor.jpg' //把图片引入，返回一个新的图片的地址
      let image = new Image();
      image.src = avator;
    
      //导入相关的样式文件 (不能放在文件最上面)
      require('./index.css')
      require('./aless.less')
    
    > 在webpack.config.js
      {
          test:/\.(png|jpg|gif|jpeg)$/,
          use:'file-loader'
      }
  ```
  > 遇到的问题: 
  > 由于 js文件里面到请求css文件，通常会把require('./index.css'),写在js文件的最上面；但是当我接着写js数据时候，
  却无法运行js数据，只有把require('./index.css')放在js文件最下边才能运行js数据
  * 使用background-image
     * 不需要添加loader，因为css-loader已经处理了
  * <img src=" alt='' />
     * 使用html-withimg-loader
     ```javascript
        npm install html-withimg-loader
        {
            test:/\.html$/,
            use:'html-withimg-loader'
        }
     ```
    * 使用url-loader做一个限制，当我们的图片 小玉多少k的时候 用base64来转换
    ```javascript
        use:{
            loader:'url-loader',
            options:{
                 //大小限制
                 limit:200*1024
            }
        }
    ```
