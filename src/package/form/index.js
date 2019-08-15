import Form from './src/form';
import FormItem from './src/form-item';

Form.install = function(Vue) {
  Vue.component(Form.name, Form);
};

FormItem.install = function(Vue) {
  Vue.component(FormItem.name, FormItem);
};

export {
  Form,
  FormItem
};