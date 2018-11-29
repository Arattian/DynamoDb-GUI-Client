import Vue from 'vue';
import Vuex, { StoreOptions, ModuleTree } from 'vuex';
import { RootState } from './types';
import database from './modules/database/index';
import records from './modules/records/index';
import table from './modules/table/index';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

Vue.use(Vuex);

const state = {
  dbInstance: {},
  dbClient: {},
  currentTable: '',
  currentDb: '',
  endpoint: '',
  tables: [],
  loading: false,
  response: {
    title: '',
    type: '',
    message: '',
  },
};

const modules: ModuleTree<RootState> = {
  database,
  table,
  records,
};

const store: StoreOptions<RootState> = {
  state,
  modules,
  actions,
  getters,
  mutations,
};

export default new Vuex.Store<RootState>(store);
