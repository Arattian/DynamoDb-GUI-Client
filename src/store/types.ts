export interface RootState {
  endpoint: string;
  tables: Array<{name: string, ItemCount: number}>;
  currentTable: any;
  currentDb: string;
  dbInstance: any;
  dbClient: any;
  response: {
    title: string,
    type: string,
    message: string,
  };
  loading: boolean;
}
