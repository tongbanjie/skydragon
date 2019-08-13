#### skydragon npm模块

开发文档请访问 [http://skydragon.tecclass.cn/1.0/#/index](http://skydragon.tecclass.cn/1.0/#/index)

demo请访问:

Jugg: [http://jugg.tecclass.cn/views/](http://jugg.tecclass.cn/views/)

Luna: [http://luna.tecclass.cn/views/](http://luna.tecclass.cn/views/)

Lina: [http://lina.tecclass.cn/views/](http://lina.tecclass.cn/views/)

##### 使用方式

```
npm install skydragon
```

##### 加载方式

- 无打包，直接引用

```
<script src="./dist/<版本号>/business/index.js"></script>
<link href="./dist/<版本号>/business/index.css">
```

- 打包开发

```
import Sd from 'skydragon';
Vue.use(Sd)
```