#### skydragon npm模块

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