import Steps from './src/steps';
import Step from './src/step';

Steps.install = function(Vue) {
  Vue.component(Steps.name, Steps);
};

Step.install = function(Vue) {
  Vue.component(Step.name, Step);
};

export {
  Steps,
  Step
};