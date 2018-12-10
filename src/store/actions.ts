import { ActionContext, ActionTree } from 'vuex';
import { RootState } from './types';

async function getCurrentDb({ commit, dispatch }: ActionContext<RootState, RootState>, configs: any) {
  commit('setDBInstances', configs);
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
    dispatch('getTableItemCounts');
    tableToGet ?
      dispatch('getCurrentTable', tableToGet) :
      dispatch('getCurrentTable', data.TableNames[0]);
  }
}

async function getTableItemCounts({ commit, state }: ActionContext<RootState, RootState>) {
  const { tables } = state;
  const tableList = [];
  for (const table of tables) {
    const data = await state.dbInstance.scan({TableName: table.name}).promise();
    const newTable = {
      name: table.name,
      ItemCount: data.Count,
    };
    tableList.push(newTable);
  }
  commit('setTablesWithItemCount', tableList);
}

function getNewTable({ commit, state, dispatch }: ActionContext<RootState, RootState>, tableName: string) {
  commit('deleteFromList', tableName);
  commit('records/initialState');
  commit('table/setTableMeta', '');
  if (state.tables.length) {
    const newTable: any = state.tables[0];
    dispatch('getCurrentTable', newTable.name);
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
  getDbTables,
};

export default actions;
