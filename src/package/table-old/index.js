import TableColumn from './src/table-column';
import Table from './src/table';
/* istanbul ignore next */
Table.install = function(Vue) {
  Vue.component(Table.name, Table);
};
TableColumn.install = function(Vue) {
  Vue.component(TableColumn.name, TableColumn);
}
export {
  Table,
  TableColumn
}