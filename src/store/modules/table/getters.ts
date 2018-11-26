import { GetterTree } from 'vuex';
import { TableState } from './types';
import { RootState } from '@/store/types';

const creatingTable = (state: TableState) => state.creatingTable;
const defaultJsonContent = (state: TableState) => state.defaultJsonContent;
const deletingTable = (state: TableState) => state.deletingTable;
const jsonContent = (state: TableState) => state.jsonContent;

const getters: GetterTree<TableState, RootState> = {
  creatingTable,
  defaultJsonContent,
  deletingTable,
  jsonContent,
};
export default getters;
