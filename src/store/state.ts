import { RootState } from './types';

const state: RootState = {
  dbInstance: {},
  dbClient: {},
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
