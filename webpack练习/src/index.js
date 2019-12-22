console.log('agoni')
// import './index.css'

import avator from './avtor.jpg' //把图片引入，返回一个新的图片的地址
console.log('avator:',avator)
let image = new Image();
image.src = avator
console.log('sss')
document.body.appendChild(image)

//导入相关的样式文件 (不能放在文件最上面)
require('./index.css')
require('./aless.less')

