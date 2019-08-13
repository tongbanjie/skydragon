

介绍
  用于图片轮播组件

使用方法
  1. 导入模块
     import { Switchable, SwitchableItem } from 'switchable';

  2. 使用模块
     <tb-switchable v-model="switchableValue1" :width=600 :height=200 arrow>
        <tb-switchable-item>
          <div style="width:600px; height:200px; float:left; background: #506b9e; line-height: 200px; font-size: 20px; text-align: center; color: #fff">1</div>
        </tb-switchable-item>
        <tb-switchable-item>
          <div style="width:600px; height:200px; float:left; background: #506b9e; line-height: 200px; font-size: 20px; text-align: center; color: #fff">2</div>
        </tb-switchable-item>
        <tb-switchable-item>
          <div style="width:600px; height:200px; float:left; background: #506b9e; line-height: 200px; font-size: 20px; text-align: center; color: #fff">3</div>
        </tb-switchable-item>
        <tb-switchable-item>
          <div style="width:600px; height:200px; float:left; background: #506b9e; line-height: 200px; font-size: 20px; text-align: center; color: #fff">4</div>
        </tb-switchable-item>
     </tb-switchable>

案例（请看http://localhost:8889/example/coltest.html)


组件API

属性                   说明                                           类型                 默认值
value                 当前值                                      Number | String         0
width                 当前图片的宽度(必填)，通过宽度控制父元素的宽度       Number               无
height                当前图片的高度(必填)，通过高度控制父元素的高度       Number               无
triggertype           触发类型 (可选 'click' 和 'mouseover')          String              'click'
autoplay              是否自动播放                                    Boolean             false
autospeed             自动播放的时间间隔                               Number              3000 (ms)
speed                 切换速度                                       Number               800（ms）
easing                动画的类型                                     String               'ease'
switchtoindex         切换到第几项，默认为第一项                     Number | String         0
pausehover            鼠标移动到容器内是否停止滚动， 默认停止             Boolean              true
arrow                 是否显示左右箭头, 默认不显示                      Boolean              false

事件(events)

事件名          说明                          返回值
change       每次切换图片的监听事件             当前被切换的索引值

