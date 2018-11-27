import { ActionTree, ActionContext } from 'vuex';
import { TableState } from './types';
import { RootState } from '@/store/types';

async function createTable({ commit, rootState, state }: ActionContext<TableState, RootState>) {
  const { dbInstance } = rootState;
  const params = state.newTableMeta;
  commit('loading', null, {root: true});
  try {
    await dbInstance.createTable(params).promise();
  } catch (err) {
    commit('responseError', err.message, {root: true});
    commit('loading', null, {root: true});
    return;
  }
  commit('loading', null, {root: true});
  commit('createTableForm');
}

async function getMeta({ commit, rootState }: ActionContext<TableState, RootState>) {
  const { dbInstance, currentTable } = rootState;
  commit('loading', null, {root: true});
  let data;
  try {
    data = await dbInstance.describeTable({TableName: currentTable}).promise();
  } catch (err) {
    commit('responseError', err.message, {root: true});
    commit('loading', null, {root: true});
    return;
  }
  commit('setTableMeta', data.Table);
  commit('records/extractKeys', data.Table, {root: true});
  commit('loading', null, {root: true});
}

async function updateTable({ commit, rootState, state }: ActionContext<TableState, RootState>) {
  const { dbInstance } = rootState;
  const { tableMeta } = state;
  commit('loading', null, {root: true});
  const params = {
    TableName: tableMeta.TableName,
    AttributeDefinitions: tableMeta.AttributeDefinitions,
    GlobalSecondaryIndexUpdates: tableMeta.GlobalSecondaryIndexUpdates,
    ProvisionedThroughput: {
      ReadCapacityUnits: tableMeta.ProvisionedThroughput && tableMeta.ProvisionedThroughput.ReadCapacityUnits,
      WriteCapacityUnits: tableMeta.ProvisionedThroughput && tableMeta.ProvisionedThroughput.WriteCapacityUnits,
    },
    SSESpecification: tableMeta.SSESpecification,
    StreamSpecification: tableMeta.StreamSpecification,
  };
  try {
    await dbInstance.updateTable(params).promise();
    commit('loading', null, {root: true});
  } catch (err) {
    commit('responseError', err.message, {root: true});
    commit('loading', null, {root: true});
    return;
  }
}
async function deleteTable({ commit, rootState, dispatch }: ActionContext<TableState, RootState>) {
  const { dbInstance, currentTable } = rootState;
  commit('loading', null, {root: true});
  try {
    await dbInstance.deleteTable({TableName: currentTable}).promise();
  } catch (err) {
    commit('responseError', err.message, {root: true});
    commit('loading', null, {root: true});
    return;
  }
  commit('deleteTableForm');
  dispatch('getNewTable', currentTable, {root: true});
  commit('loading', null, {root: true});
}

const actions: ActionTree<TableState, RootState> = {
  createTable,
  getMeta,
  updateTable,
  deleteTable,
};

export default actions;
