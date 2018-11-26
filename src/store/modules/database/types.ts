
export interface SingleDbState {
  name: string;
  accessKeyId: string;
  secretAccessKey: string;
  region: string;
}



export interface DbState {
  list: SingleDbState[];
  formVisible: boolean;
  configs: DbConfigs;
  regionList: string[];
  status: string;
  isRemote: boolean;
}

export interface DbConfigs {
  accessKeyId: string;
  secretAccessKey: string;
  region: string;
  name: string;
  endpoint: string;
}
