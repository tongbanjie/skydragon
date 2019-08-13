
介绍 
  快速返回顶部的操作

使用方法
  1. 先导入模块
     import Backtop from 'back-top'

  2. 使用模块
    2-1. 默认使用方式
      <tb-backtop></tb-backtop>

    2-2. 自定义内容样式
      <tb-backtop :height="100" :bottom="100" :right="50">
        <div style="padding:10px; background: rgba(0, 153, 229, .7); color: #fff; text-align: center; border-radius: 2px">自定义按钮返回顶端</div>
      </tb-backtop>

案例 (请看http://localhost:8889/example/coltest.html)


组件API

属性              说明                                                 类型                默认值
height        页面滚动高度达到该值时才显示 BackTop组件 默认为300px        Number | String       300
bottom        组件距离底部的距离 默认为30px                             Number | String       30
right         组件距离右边的距离 默认为30px                             Number | String       30 
duration      滚动动画持续时间 (毫秒) 默认为1秒                          Number | String       1000 (毫秒)

事件events

事件名          说明                      返回值

change         点菜滚动到顶部后的监听事件    无

