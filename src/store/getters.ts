import { RootState } from './types';
import { GetterTree } from 'vuex';

const endpoint = (state: RootState) => state.endpoint;
const loading = (state: RootState) => state.loading;
const tables = (state: RootState) => state.tables;
const error = (state: RootState) => state.error;
const currentTable = (state: RootState) => state.currentTable;

const getters: GetterTree<RootState, RootState> = {
  endpoint,
  loading,
  tables,
  error,
  currentTable,
};
export default getters;
