import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { dbModule } from './modules/dbModule';
import { RootState } from './types';
import { tableModule } from './modules/tableModule';
Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  modules: {
    dbModule,
    tableModule,
  },
};

export default new Vuex.Store<RootState>(store);
