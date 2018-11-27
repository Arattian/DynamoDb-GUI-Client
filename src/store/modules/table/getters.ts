import { GetterTree } from 'vuex';
import { TableState } from './types';
import { RootState } from '@/store/types';

const creatingTable = (state: TableState) => state.creatingTable;
const newTableMeta = (state: TableState) => state.newTableMeta;
const deletingTable = (state: TableState) => state.deletingTable;
const tableMeta = (state: TableState) => state.tableMeta;

const getters: GetterTree<TableState, RootState> = {
  creatingTable,
  newTableMeta,
  deletingTable,
  tableMeta,
};
export default getters;
