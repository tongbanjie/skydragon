
import TimeLine from './src/timeline';
import TimeLineItem from './src/timeline-item';

TimeLine.install = function(vue) {
  Vue.component(TimeLine.name, TimeLine);
};
TimeLineItem.install = function(vue) {
  Vue.component(TimeLineItem.name, TimeLineItem);
};

export { 
  TimeLine, 
  TimeLineItem 
};