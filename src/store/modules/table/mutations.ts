
import { MutationTree } from 'vuex';
import { TableState } from './types';

function setTableMeta(state: TableState, tableMeta: string) {
  state.tableMeta = tableMeta;
}

function setNewTableMeta(state: TableState, newTableMeta: string) {
  state.newTableMeta = newTableMeta;
}

function createTableForm(state: TableState) {
  const defaultMeta = {
    AttributeDefinitions: [
      {
        AttributeName: '',
        AttributeType: 'S | N | B',
      },
    ],
    KeySchema: [
      {
        AttributeName: '',
        KeyType: 'HASH | RANGE',
      },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: '',
      WriteCapacityUnits: '',
    },
    TableName: '',
    GlobalSecondaryIndexes: [
      {
        IndexName: '',
        KeySchema: [
          {
            AttributeName: '',
            KeyType: 'HASH | RANGE',
          },
        ],
        Projection: {
          NonKeyAttributes: [
            '',
          ],
          ProjectionType: 'ALL | KEYS_ONLY | INCLUDE',
        },
        ProvisionedThroughput: {
          ReadCapacityUnits: 0,
          WriteCapacityUnits: 0,
        },
      },
    ],
    LocalSecondaryIndexes: [
      {
        IndexName: '',
        KeySchema: [
          {
            AttributeName: '',
            KeyType: 'HASH | RANGE',
          },
        ],
        Projection: {
          NonKeyAttributes: [
            '',
          ],
          ProjectionType: 'ALL | KEYS_ONLY | INCLUDE',
        },
      },
    ],
    SSESpecification: {
      Enabled: false,
      KMSMasterKeyId: '',
      SSEType: 'AES256 | KMS',
    },
    StreamSpecification: {
      StreamEnabled: false,
      StreamViewType: 'NEW_IMAGE | OLD_IMAGE | NEW_AND_OLD_IMAGES | KEYS_ONLY',
    },
  };
  state.newTableMeta = defaultMeta;
  state.creatingTable = !state.creatingTable;
}

function deleteTableForm(state: TableState) {
  state.deletingTable = !state.deletingTable;
}

const mutations: MutationTree<TableState> = {
  setTableMeta,
  createTableForm,
  deleteTableForm,
  setNewTableMeta,
};

export default mutations;
