'use strict';

var _row = require('./package/row');

var _row2 = _interopRequireDefault(_row);

var _col = require('./package/col');

var _col2 = _interopRequireDefault(_col);

var _button = require('./package/button');

var _button2 = _interopRequireDefault(_button);

var _icon = require('./package/icon');

var _icon2 = _interopRequireDefault(_icon);

var _buttonGroup = require('./package/button-group');

var _buttonGroup2 = _interopRequireDefault(_buttonGroup);

var _checkbox = require('./package/checkbox');

var _checkbox2 = _interopRequireDefault(_checkbox);

var _checkboxGroup = require('./package/checkbox-group');

var _checkboxGroup2 = _interopRequireDefault(_checkboxGroup);

var _radio = require('./package/radio');

var _radio2 = _interopRequireDefault(_radio);

var _radioGroup = require('./package/radio-group');

var _radioGroup2 = _interopRequireDefault(_radioGroup);

var _input = require('./package/input');

var _input2 = _interopRequireDefault(_input);

var _select = require('./package/select');

var _select2 = _interopRequireDefault(_select);

var _selectOption = require('./package/select-option');

var _selectOption2 = _interopRequireDefault(_selectOption);

var _cascader = require('./package/cascader');

var _cascader2 = _interopRequireDefault(_cascader);

var _card = require('./package/card');

var _code = require('./package/code');

var _code2 = _interopRequireDefault(_code);

var _Switch = require('./package/Switch');

var _Switch2 = _interopRequireDefault(_Switch);

var _Alert = require('./package/Alert');

var _Alert2 = _interopRequireDefault(_Alert);

var _tabPanel = require('./package/tab-panel');

var _datePicker = require('./package/date-picker');

var _datePicker2 = _interopRequireDefault(_datePicker);

var _form = require('./package/form');

var _pagination = require('./package/pagination');

var _pagination2 = _interopRequireDefault(_pagination);

var _nav = require('./package/nav');

var _nav2 = _interopRequireDefault(_nav);

var _menu = require('./package/menu');

var _modal = require('./package/modal');

var _modal2 = _interopRequireDefault(_modal);

var _message = require('./package/message');

var _message2 = _interopRequireDefault(_message);

var _tooltip = require('./package/tooltip');

var _tooltip2 = _interopRequireDefault(_tooltip);

var _dialog = require('./package/dialog');

var _dialog2 = _interopRequireDefault(_dialog);

var _rate = require('./package/rate');

var _rate2 = _interopRequireDefault(_rate);

var _accordion = require('./package/accordion');

var _collapse = require('./package/collapse');

var _collapse2 = _interopRequireDefault(_collapse);

var _inputNumber = require('./package/input-number');

var _inputNumber2 = _interopRequireDefault(_inputNumber);

var _badge = require('./package/badge');

var _badge2 = _interopRequireDefault(_badge);

var _carousel = require('./package/carousel');

var _table = require('./package/table');

var _breadcrumb = require('./package/breadcrumb');

var _progress = require('./package/progress');

var _progress2 = _interopRequireDefault(_progress);

var _imgPreview = require('./package/img-preview');

var _imgPreview2 = _interopRequireDefault(_imgPreview);

var _loader = require('./package/loader');

var _loader2 = _interopRequireDefault(_loader);

var _steps = require('./package/steps');

require('./themes/theme-default/index.styl');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var components = [_row2.default, _col2.default, _button2.default, _icon2.default, _buttonGroup2.default, _checkbox2.default, _checkboxGroup2.default, _radio2.default, _radioGroup2.default, _input2.default, _select2.default, _selectOption2.default, _cascader2.default, _card.Card, _card.CardHeader, _card.CardBody, _card.CardFooter, _code2.default, _Switch2.default, _Alert2.default, _tabPanel.TabPanel, _tabPanel.TabOne, _datePicker2.default, _form.Form, _form.FormItem, _pagination2.default, _nav2.default, _menu.Menu, _menu.MenuItem, _modal2.default, _rate2.default, _accordion.Accordion, _accordion.AccordionItem, _inputNumber2.default, _badge2.default, _carousel.Carousel, _carousel.CarouselItem, _table.Table, _table.TableCol, _collapse2.default, _breadcrumb.Breadcrumb, _breadcrumb.BreadcrumbOne, _progress2.default, _steps.Steps, _steps.Step];

var install = function install(Vue) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  /* istanbul ignore if */
  if (install.installed) return;

  components.map(function (component) {
    Vue.component(component.name, component);
  });

  Vue.prototype.$Message = _message2.default;
  Vue.prototype.$Tooltip = _tooltip2.default;
  Vue.prototype.$ImgPreview = _imgPreview2.default;
  Vue.prototype.$Dialog = _dialog2.default;
  Vue.use(_loader2.default);
};

// Vue.config.devtools = true;

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

module.exports = {
  version: '0.0.1',
  install: install,
  Row: _row2.default,
  Col: _col2.default,
  Button: _button2.default,
  Icon: _icon2.default,
  ButtonGroup: _buttonGroup2.default,
  Checkbox: _checkbox2.default,
  CheckboxGroup: _checkboxGroup2.default,
  Radio: _radio2.default,
  RadioGroup: _radioGroup2.default,
  Input: _input2.default,
  Select: _select2.default,
  SelectOption: _selectOption2.default,
  Cascader: _cascader2.default,
  Card: _card.Card,
  CardHeader: _card.CardHeader,
  CardBody: _card.CardBody,
  CardFooter: _card.CardFooter,
  Code: _code2.default,
  Switch: _Switch2.default,
  Alert: _Alert2.default,
  TabPanel: _tabPanel.TabPanel,
  TabOne: _tabPanel.TabOne,
  DatePicker: _datePicker2.default,
  Form: _form.Form,
  FormItem: _form.FormItem,
  Pagination: _pagination2.default,
  Nav: _nav2.default,
  Menu: _menu.Menu,
  MenuItem: _menu.MenuItem,
  Modal: _modal2.default,
  Message: _message2.default,
  Tooltip: _tooltip2.default,
  ImgPreview: _imgPreview2.default,
  Dialog: _dialog2.default,
  Rate: _rate2.default,
  Accordion: _accordion.Accordion,
  AccordionItem: _accordion.AccordionItem,
  InputNumber: _inputNumber2.default,
  Badge: _badge2.default,
  Carousel: _carousel.Carousel,
  CarouselItem: _carousel.CarouselItem,
  Table: _table.Table,
  TableCol: _table.TableCol,
  Collapse: _collapse2.default,
  Breadcrumb: _breadcrumb.Breadcrumb,
  BreadcrumbOne: _breadcrumb.BreadcrumbOne,
  Progress: _progress2.default,
  Steps: _steps.Steps,
  Step: _steps.Step
};