export interface RootState {
  endpoint: string;
  currentDb: CurrentDb;
  currentTable: any;
  dbInstance: any;
  dbClient: any;
  error: any;
  loading: boolean;
}

export interface CurrentDb {
  tables: Array<{name: string, ItemCount: number}>;
}
