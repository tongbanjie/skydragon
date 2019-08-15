
介绍
  主要用于通知未读数的角标，提醒用户点击。

使用方法
  1. 先导入模块
     import Badge from 'badge'

  2. 使用模块
     <tb-badge count="100">
      <a href="#" style="width:42px; height: 42px; background: #eee; border-radius: 6px; display: inline-block"></a>
     </tb-badge>

案例 
  (请看http://localhost:8889/example/coltest.html)

组件API
  
  属性            说明                                                           类型              默认值
  count    显示的数字，如果大于 capCount 时，会显示 ${capCount}+ 当为0时，隐藏。       Number | String   0
  capCount  封顶的数字，默认为99                                                   Number | String   99
  dot      不显示数字，只有一个小红点，如果需要隐藏dot，请设置count为0即可               Boolean           false
  className  显示数字的自定义的类名                                                 String            ''