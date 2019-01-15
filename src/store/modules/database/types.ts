
export interface SingleDbState {
  name: string;
  accessKeyId: string;
  secretAccessKey: string;
  region: string;
  maxRetries: number;
}



export interface DbState {
  list: SingleDbState[];
  submitForm: {
    configs: DbConfigs;
    name: string;
    color: string;
    port: string;
    createdAt: number;
  };
  regionList: string[];
}

export interface DbConfigs {
  accessKeyId: string;
  secretAccessKey: string;
  region: string;
  endpoint: string;
  maxRetries: number;
}
