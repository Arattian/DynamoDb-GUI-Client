import { table } from './modules/table';
import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { database } from './modules/database';
import { RootState } from './types';
import { records } from './modules/records';
Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  modules: {
    database,
    table,
    records,
  },
};

export default new Vuex.Store<RootState>(store);
