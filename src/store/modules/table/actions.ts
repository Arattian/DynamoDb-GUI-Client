import { ActionTree, ActionContext } from 'vuex';
import { TableState } from './types';
import { RootState } from '@/store/types';

async function createTable({ commit, rootState, state, dispatch }: ActionContext<TableState, RootState>) {
  const { dbInstance } = rootState;
  const params = state.newTableMeta;
  commit('loading', null, {root: true});
  try {
    await dbInstance.createTable(params).promise();
  } catch (err) {
    commit('showResponse', err, {root: true});
    commit('loading', null, {root: true});
    return;
  }
  commit('loading', null, {root: true});
  commit('createTableForm');
  commit('showResponse', 'Table creating in process... Auto-refresh in 10 seconds...', {root: true});
  setTimeout(() => {
    dispatch('getCurrentDb', null, {root: true});
  }, 10000);
}

async function getMeta({ commit, rootState }: ActionContext<TableState, RootState>) {
  const { dbInstance, currentTable } = rootState;
  commit('loading', null, {root: true});
  let data;
  try {
    data = await dbInstance.describeTable({TableName: currentTable}).promise();
  } catch (err) {
    commit('showResponse', err, {root: true});
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
    commit('showResponse', err, {root: true});
    commit('loading', null, {root: true});
    return;
  }
  commit('showResponse', 'It will take a while before the change takes an effect', {root: true});
}
async function deleteTable({ commit, rootState, dispatch }: ActionContext<TableState, RootState>) {
  const { dbInstance, currentTable } = rootState;
  commit('loading', null, {root: true});
  try {
    await dbInstance.deleteTable({TableName: currentTable}).promise();
  } catch (err) {
    commit('showResponse', err, {root: true});
    commit('loading', null, {root: true});
    return;
  }
  commit('deleteTableForm');
  dispatch('getNewTable', currentTable, {root: true});
  commit('loading', null, {root: true});
  commit('showResponse', ' ', {root: true});
}

const actions: ActionTree<TableState, RootState> = {
  createTable,
  getMeta,
  updateTable,
  deleteTable,
};

export default actions;
