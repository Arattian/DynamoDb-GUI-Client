import { ActionTree, ActionContext } from 'vuex';
import { TableModuleState } from './types';
import { RootState } from '@/store/types';

async function createTable({
  commit,
  rootState,
  state,
  dispatch,
}: ActionContext<TableModuleState, RootState>) {
  const { dbInstance } = rootState;
  const params = state.newTableMeta;
  commit('loading', true, { root: true });
  try {
    await dbInstance.createTable(params).promise();
  } catch (err) {
    commit('showResponse', err, { root: true });
    commit('loading', false, { root: true });
    return;
  }
  commit('loading', false, { root: true });
  commit('toggleCreateModal');
  commit(
    'showResponse',
    'Table creating in process... Auto-refresh in 10 seconds...',
    { root: true },
  );
  setTimeout(() => {
    dispatch('getDbTables', params.TableName, { root: true });
  }, 12000);
}

async function getMeta({
  commit,
  rootState,
}: ActionContext<TableModuleState, RootState>) {
  const { dbInstance, currentTable } = rootState;
  commit('loading', true, { root: true });
  let data;
  try {
    data = await dbInstance
      .describeTable({ TableName: currentTable })
      .promise();
  } catch (err) {
    commit('showResponse', err, { root: true });
    commit('loading', false, { root: true });
    return;
  }
  commit('setTableMeta', data.Table);
  commit('records/extractKeys', data.Table, { root: true });
  commit('loading', false, { root: true });
}

async function updateTable({
  commit,
  rootState,
  state,
}: ActionContext<TableModuleState, RootState>) {
  const { dbInstance } = rootState;
  const { tableMeta } = state;
  commit('loading', true, { root: true });
  const params = {
    TableName: tableMeta.TableName,
    AttributeDefinitions: tableMeta.AttributeDefinitions,
    GlobalSecondaryIndexUpdates: tableMeta.GlobalSecondaryIndexUpdates,
    ProvisionedThroughput: {
      ReadCapacityUnits:
        tableMeta.ProvisionedThroughput &&
        tableMeta.ProvisionedThroughput.ReadCapacityUnits,
      WriteCapacityUnits:
        tableMeta.ProvisionedThroughput &&
        tableMeta.ProvisionedThroughput.WriteCapacityUnits,
    },
    SSESpecification: tableMeta.SSESpecification,
    StreamSpecification: tableMeta.StreamSpecification,
  };
  try {
    await dbInstance.updateTable(params).promise();
  } catch (err) {
    commit('showResponse', err, { root: true });
    commit('loading', false, { root: true });
    return;
  }
  commit('loading', false, { root: true });
  commit(
    'showResponse',
    'It will take a while before the change takes an effect',
    { root: true },
  );
}
async function deleteTable({
  commit,
  rootState,
  dispatch,
}: ActionContext<TableModuleState, RootState>) {
  const { dbInstance, currentTable } = rootState;
  commit('loading', true, { root: true });
  try {
    await dbInstance.deleteTable({ TableName: currentTable }).promise();
  } catch (err) {
    commit('showResponse', err, { root: true });
    commit('loading', false, { root: true });
    return;
  }
  commit('toggleDeleteModal');
  dispatch('deleteTableFromStore', currentTable, { root: true });
  commit('loading', false, { root: true });
  commit('showResponse', ' ', { root: true });
}

const actions: ActionTree<TableModuleState, RootState> = {
  createTable,
  getMeta,
  updateTable,
  deleteTable,
};

export default actions;
