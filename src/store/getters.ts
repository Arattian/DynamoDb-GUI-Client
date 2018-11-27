import { RootState } from './types';
import { GetterTree } from 'vuex';

const endpoint = (state: RootState) => state.endpoint;
const loading = (state: RootState) => state.loading;
const tables = (state: RootState) => state.tables;
const response = (state: RootState) => state.response;
const currentTable = (state: RootState) => state.currentTable;

const getters: GetterTree<RootState, RootState> = {
  endpoint,
  loading,
  tables,
  response,
  currentTable,
};
export default getters;
