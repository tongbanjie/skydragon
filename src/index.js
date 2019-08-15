import Row from './package/row';
import Col from './package/col';
import Button from './package/button';
import Icon from './package/icon';
import ButtonGroup from './package/button-group';
import Checkbox from './package/checkbox';
import CheckboxGroup from './package/checkbox-group';
import Radio from './package/radio';
import RadioGroup from './package/radio-group';
import Input from './package/input';
import Select from './package/select';
import SelectOption from './package/select-option';
import Cascader from './package/cascader';
import { Card, CardHeader, CardBody, CardFooter } from './package/card';
import Code from './package/code';
import Switch from './package/switch';
import Alert from './package/alert';
import { TabPanel, TabOne } from './package/tab-panel';
import DatePicker from './package/date-picker';
import { Form, FormItem } from './package/form';
import Pagination from './package/pagination';
import Nav from './package/nav';
import { Menu, MenuItem } from './package/menu';
import Modal from './package/modal';
import Message from './package/message';
import Tooltip from './package/tooltip';
import Dialog from './package/dialog';
import Rate from './package/rate';
import { Accordion, AccordionItem } from './package/accordion';
import Collapse from './package/collapse';
import InputNumber from './package/input-number';
import Badge from './package/badge';
import { Carousel, CarouselItem } from './package/carousel';
import { Table, TableCol } from './package/table';
import { Breadcrumb, BreadcrumbOne } from './package/breadcrumb';
import Progress from './package/progress';
import ImgPreview from './package/img-preview';
import Loader from './package/loader';
import { Steps, Step } from './package/steps';

import './themes/theme-default/index.styl'

const components = [
  Row,
  Col,
  Button,
  Icon,
  ButtonGroup,
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
  Input,
  Select,
  SelectOption,
  Cascader,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Code,
  Switch,
  Alert,
  TabPanel,
  TabOne,
  DatePicker,
  Form,
  FormItem,
  Pagination,
  Nav,
  Menu,
  MenuItem,
  Modal,
  Rate,
  Accordion,
  AccordionItem,
  InputNumber,
  Badge,
  Carousel,
  CarouselItem,
  Table,
  TableCol,
  Collapse,
  Breadcrumb,
  BreadcrumbOne,
  Progress,
  Steps,
  Step
];

const install = function(Vue, opts = {}) {
  /* istanbul ignore if */
  if (install.installed) return;

  components.map(component => {
    Vue.component(component.name, component);
  });

  Vue.prototype.$Message = Message;
  Vue.prototype.$Tooltip = Tooltip;
  Vue.prototype.$ImgPreview = ImgPreview;
  Vue.prototype.$Dialog = Dialog;
  Vue.use(Loader);
};

// Vue.config.devtools = true;

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

module.exports = {
  version: '0.0.1',
  install,
  Row,
  Col,
  Button,
  Icon,
  ButtonGroup,
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
  Input,
  Select,
  SelectOption,
  Cascader,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Code,
  Switch,
  Alert,
  TabPanel,
  TabOne,
  DatePicker,
  Form,
  FormItem,
  Pagination,
  Nav,
  Menu,
  MenuItem,
  Modal,
  Message,
  Tooltip,
  ImgPreview,
  Dialog,
  Rate,
  Accordion,
  AccordionItem,
  InputNumber,
  Badge,
  Carousel,
  CarouselItem,
  Table,
  TableCol,
  Collapse,
  Breadcrumb,
  BreadcrumbOne,
  Progress,
  Steps,
  Step
};