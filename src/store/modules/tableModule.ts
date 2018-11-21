import { records } from './records';
import { TableModuleState, RootState } from '../types';
import { Module, MutationTree, ActionTree, ActionContext } from 'vuex';
import { table } from './table';

const namespaced: boolean = true;

export const state: TableModuleState = {
  currentTable: '',
  loading: false,
  creatingTable: false,
};

const modules = {
  records,
  table,
};

export const mutations: MutationTree<TableModuleState> = {
  setCurrentTable(state, tableName) {
    state.currentTable = tableName;
  },
  loading(state) {
    state.loading = !state.loading;
  },
  creatingTableToggle(state) {
    state.creatingTable = !state.creatingTable;
  },
};

export const actions: ActionTree<TableModuleState, RootState> = {

};

export const tableModule: Module<TableModuleState, RootState> = {
  namespaced,
  modules,
  state,
  mutations,
  actions,
};
