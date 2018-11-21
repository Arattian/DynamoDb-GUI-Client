
export interface RootState {
  dbModule: any;
  tableModule: any;
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
  tables: string[];
}

export interface DbModuleState {
  list: SingleDbState[];
  currentDb: CurrentDb;
  error: any;
  dbInstance: any;
  dbClient: any;
}

export interface TableModuleState {
  currentTable: string;
  loading: boolean;
  creatingTable: boolean;
}

export interface AddNewDatabaseState {
  visible: boolean;
  configs: DbConfigs;
  regionList: string[];
  status: string;
  isRemote: boolean;
}

export interface TableState {
  defaultJsonContent: any;
  jsonContent: any;
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
