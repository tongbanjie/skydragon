
介绍：

input输入框只能输入数字的组件。支持鼠标点击和键盘上下键移动操作。可以设置最小值和最大值，及每次操作的步长。

使用方法：
  1. 先导入如下模块
    import InputNumber from 'input-number';
  2. 使用模块
     <tb-input-number :max="10" :min="1" v-model="inputNumber1"></tb-input-number>

案例 (请看http://localhost:8889/example/coltest.html)

组件API

属性            说明                                         类型                  默认值

max            设置input输入框输入的最大值                     Number                Infinity(正无穷大)
min            设置input输入框的最小值                        Number                 -Infinity (负无穷大)
step           每次操作的步长, 比如设置step=1.2,那么每次加1.2   Number | String        1
value          当前值                                       Number                 1
disabled       input输入框是否被禁用                          Boolean                false

events 

事件名          说明                     返回值
change         每次操作的触发事件监听      当前的值


