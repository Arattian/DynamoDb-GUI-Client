import { table } from './modules/table';

export interface RootState {
  database: any;
  table: any;
  records: any;
}

export interface SingleDbState {
  name: string;
  accessKeyId: string;
  secretAccessKey: string;
  region: string;
}

export interface DbConfigs {
  accessKeyId: string;
  secretAccessKey: string;
  region: string;
  name: string;
  endpoint: string;
}

export interface CurrentDb {
  endpoint: string;
  tables: Array<{name: string, ItemCount: number;}>;
  tableNames: string[];
}

export interface DbState {
  list: SingleDbState[];
  currentDb: CurrentDb;
  error: any;
  dbInstance: any;
  dbClient: any;
}

export interface AddDatabaseState {
  visible: boolean;
  configs: DbConfigs;
  regionList: string[];
  status: string;
  isRemote: boolean;
}

export interface TableState {
  defaultJsonContent: any;
  jsonContent: any;
  creatingTable: boolean;
  deletingTable: boolean;
  currentTable: string;
  loading: boolean;
}

export interface RecordState {
  visible: boolean;
  jsonContent: string;
  hashKey: string;
  hashKeyLabel: string;
  rangeKey: string;
  rangeKeyLabel: string;
  header: any[];
  data: any[];
}
