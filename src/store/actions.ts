import { ActionContext, ActionTree } from 'vuex';
import { RootState } from './types';

async function getCurrentDb(
  { commit, dispatch }: ActionContext<RootState, RootState>,
  name: string,
) {
  commit('setDBInstances', name);
  dispatch('getDbTables');
}

async function getDbTables(
  { state, commit, dispatch }: ActionContext<RootState, RootState>,
  tableToGet: string,
) {
  let data;
  try {
    data = await getTablesPaginated(state);
  } catch (err) {
    commit('showResponse', err);
    return;
  }
  if (data.TableNames && !data.TableNames.length) {
    commit('records/initialState');
    commit('table/setTableMeta', {});
  } else {
    commit('setTableNames', data.TableNames);
    tableToGet && dispatch('getCurrentTable', tableToGet);
  }
}

async function getTablesPaginated(state: any) {
  const params: any = {};
  const data: { TableNames: string[] } = { TableNames: [] };
  do {
    const chunk = await state.dbInstance.listTables(params).promise();
    if (chunk.LastEvaluatedTableName) {
      params.ExclusiveStartTableName = chunk.LastEvaluatedTableName;
    } else {
      delete params.ExclusiveStartTableName;
    }
    data.TableNames = [...data.TableNames, ...chunk.TableNames];
  } while (params.ExclusiveStartTableName);
  return data;
}

function deleteTableFromStore(
  { commit }: ActionContext<RootState, RootState>,
  tableName: string,
) {
  commit('deleteFromList', tableName);
  commit('records/initialState');
  commit('table/setTableMeta', '');
}

function getCurrentTable(
  { commit, dispatch }: ActionContext<RootState, RootState>,
  tableName: string,
) {
  commit('setCurrentTable', tableName);
  commit('records/initialState');
  commit('table/setTableMeta', '');
  dispatch('records/getRecords');
}

const actions: ActionTree<RootState, RootState> = {
  getCurrentDb,
  getCurrentTable,
  deleteTableFromStore,
  getDbTables,
};

export default actions;
