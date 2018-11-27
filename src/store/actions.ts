import { ActionContext, ActionTree } from 'vuex';
import { RootState } from './types';

async function getCurrentDb({ commit, state, dispatch }: ActionContext<RootState, RootState>, configs: any) {
  commit('loading');
  configs && commit('setDBInstances', configs);
  let data;
  try {
    data = await state.dbInstance.listTables().promise();
  } catch (err) {
    commit('showResponse', err);
    commit('loading');
    return;
  }
  commit('loading');
  commit('setTableNames', data.TableNames);
  dispatch('getTableItemCounts');
  dispatch('getCurrentTable', data.TableNames[0]);
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
  if (state.tables) {
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
};

export default actions;
