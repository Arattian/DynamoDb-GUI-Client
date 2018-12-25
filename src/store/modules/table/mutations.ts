
import { MutationTree } from 'vuex';
import { TableState } from './types';

function setTableMeta(state: TableState, tableMeta: string) {
  state.tableMeta = tableMeta;
}

function setNewTableMeta(state: TableState, newTableMeta: string) {
  state.newTableMeta = newTableMeta;
}

function toggleCreateModal(state: TableState) {
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
  state.showCreateModal = !state.showCreateModal;
}

function toggleDeleteModal(state: TableState) {
  state.showDeleteModal = !state.showDeleteModal;
}

const mutations: MutationTree<TableState> = {
  setTableMeta,
  toggleCreateModal,
  toggleDeleteModal,
  setNewTableMeta,
};

export default mutations;
