import { DbState } from './types';

const state: DbState = {
  list: [],
  formVisible: false,
  regionList: [
    'localhost',
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
    'sa-east-1',
  ],
  configs: {
    name: '',
    accessKeyId: '',
    secretAccessKey: '',
    region: '',
    endpoint: '',
  },
  status: '',
  isRemote: true,
};

export default state;
