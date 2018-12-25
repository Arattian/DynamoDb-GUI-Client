import { GetterTree } from 'vuex';
import { TableState } from './types';
import { RootState } from '@/store/types';

const showCreateModal = (state: TableState) => state.showCreateModal;
const newTableMeta = (state: TableState) => state.newTableMeta;
const showDeleteModal = (state: TableState) => state.showDeleteModal;
const tableMeta = (state: TableState) => state.tableMeta;
const itemCount = (state: TableState) => state.tableMeta.ItemCount;

const getters: GetterTree<TableState, RootState> = {
  showCreateModal,
  newTableMeta,
  showDeleteModal,
  tableMeta,
  itemCount,
};
export default getters;
