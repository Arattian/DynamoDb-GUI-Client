import { RootState } from './types';
import { GetterTree } from 'vuex';

const filteredTables = (state: RootState) => {
  return state.tables.filter((table: string) => {
    if (table.toLowerCase().includes(state.filterText.toLowerCase())) {
      return table;
    }
  });
};

const loading = (state: RootState) => state.loading;
const tables = (state: RootState) => state.tables;
const response = (state: RootState) => state.response;
const currentTable = (state: RootState) => state.currentTable;
const currentDb = (state: RootState) => state.currentDb;
const filterText = (state: RootState) => state.filterText;

const getters: GetterTree<RootState, RootState> = {
  loading,
  tables,
  response,
  currentTable,
  currentDb,
  filterText,
  filteredTables,
};
export default getters;
