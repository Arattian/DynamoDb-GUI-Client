import { TableState } from './types';

export const state: TableState = {
  defaultJsonContent: {
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
  },
  jsonContent: '',
  creatingTable: false,
  deletingTable: false,
};

export default state;
