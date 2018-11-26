import mutations from './mutations';
import state from './state';
import getters from './getters';
import actions from './actions';

const namespaced: boolean = true;

export default {
  namespaced,
  state,
  getters,
  mutations,
  actions,
};
