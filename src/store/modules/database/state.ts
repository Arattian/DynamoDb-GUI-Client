import { DatabaseModuleState } from './types';

const state: DatabaseModuleState = {
  list: [],
  regionList: [
    'us-east-1',
    'us-east-2',
    'us-west-1',
    'us-west-2',
    'ap-south-1',
    'ap-northeast-1',
    'ap-northeast-2',
    'ap-northeast-3',
    'ap-southeast-1',
    'ap-southeast-2',
    'ca-central-1',
    'cn-north-1',
    'cn-northwest-1',
    'eu-central-1',
    'eu-west-1',
    'eu-west-2',
    'eu-west-3',
    'eu-north-1',
    'sa-east-1',
    'me-south-1',
  ],
  submitForm: {
    configs: {
      accessKeyId: '',
      secretAccessKey: '',
      region: '',
      endpoint: '',
      maxRetries: 1,
      dynamoDbCrc32: false,
    },
    name: '',
    color: '#00f97c',
    createdAt: +new Date(),
  },
  showEditModal: false,
};

export default state;
