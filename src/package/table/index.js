import Table from './src/table';
import TableCol from './src/table-col';

Table.install = function(Vue) {
  Vue.component(Table.name, Table);
};

TableCol.install = function(Vue) {
  Vue.component(TableCol.name, TableCol);
};

export {
  Table,
  TableCol
};