import TabPanel from './src/tab-panel';
import TabOne from './src/tab-one';

TabPanel.install = function(Vue) {
  Vue.components(TabPanel.name, TabPanel);
};

TabOne.install = function(Vue) {
  Vue.components(TabOne.name, TabOne);
};

export {
  TabPanel,
  TabOne
};