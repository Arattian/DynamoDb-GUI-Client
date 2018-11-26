import { ActionContext, ActionTree } from 'vuex';
import { RootState } from './types';

async function getCurrentDb({ commit, state, dispatch }: ActionContext<RootState, RootState>, configs: any) {
  commit('loading');
  commit('setDBInstances', configs);
  let data;
  try {
    data = await state.dbInstance.listTables().promise();
  } catch (err) {
    commit('responseError', err.message);
    commit('loading');
    return;
  }
  commit('loading');
  dispatch('getTableItemCounts');
  dispatch('getCurrentTable', data.TableNames[0]);
}

async function getTableItemCounts({ commit, state }: ActionContext<RootState, RootState>) {
  const { tables }: any = state.currentDb;
  const tableList = [];
  for (const table of tables) {
    const data = await state.dbInstance.scan({TableName: table.name}).promise();
    const newTable = {
      name: table.name,
      ItemCount: data.Count,
    };
    tableList.push(newTable);
  }
  commit('setTables', tableList);
}

function getNewTable({ commit, state, dispatch }: ActionContext<RootState, RootState>, tableName: string) {
  commit('deleteFromList', tableName);
  if (state.currentDb.tables) {
    const newTable: any = state.currentDb.tables[0][name];
    if (newTable) {
      dispatch('getCurrentTable', newTable);
    }
  }
}

function getCurrentTable({ commit, dispatch }: ActionContext<RootState, RootState>, tableName: string) {
  commit('setCurrentTable', tableName);
  dispatch('records/getRecords');
  dispatch('table/getMeta');
}

const actions: ActionTree<RootState, RootState> = {
  getCurrentDb,
  getTableItemCounts,
  getNewTable,
  getCurrentTable,
};

export default actions;
