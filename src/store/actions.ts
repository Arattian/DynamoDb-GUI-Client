import { ActionContext, ActionTree } from 'vuex';
import { RootState } from './types';

async function getCurrentDb({ commit, dispatch }: ActionContext<RootState, RootState>, name: any) {
  commit('setDBInstances', name);
  dispatch('getDbTables');
}

async function getDbTables({ state, commit, dispatch }: ActionContext<RootState, RootState>, tableToGet: string) {
  commit('loading', true);
  let data;
  try {
    data = await state.dbInstance.listTables().promise();
  } catch (err) {
    commit('showResponse', err);
    commit('loading', false);
    return;
  }
  commit('loading', false);
  if (!data.TableNames.length) {
    commit('records/initialState');
    commit('table/setTableMeta', {});
  } else {
    commit('setTableNames', data.TableNames);
    tableToGet &&
      dispatch('getCurrentTable', tableToGet);
  }
}

function deleteTableFromStore({ commit }: ActionContext<RootState, RootState>, tableName: string) {
  commit('deleteFromList', tableName);
  commit('records/initialState');
  commit('table/setTableMeta', '');
}

function getCurrentTable({ commit, dispatch }: ActionContext<RootState, RootState>, tableName: string) {
  commit('setCurrentTable', tableName);
  commit('records/initialState');
  commit('table/setTableMeta', '');
  dispatch('records/getRecords');
  dispatch('table/getMeta');
}

const actions: ActionTree<RootState, RootState> = {
  getCurrentDb,
  getCurrentTable,
  deleteTableFromStore,
  getDbTables,
};

export default actions;
