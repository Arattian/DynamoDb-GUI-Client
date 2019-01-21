import { RootState } from './types';
import { DynamoDB } from 'aws-sdk/clients/all';

const state: RootState = {
  dbInstance: new DynamoDB(),
  dbClient: new DynamoDB.DocumentClient(),
  currentTable: '',
  currentDb: '',
  tables: [],
  filterText: '',
  loading: false,
  response: {
    title: '',
    type: '',
    message: '',
  },
};

export default state;
