export interface RootState {
  endpoint: string;
  tables: Array<{name: string, ItemCount: number}>;
  currentTable: any;
  dbInstance: any;
  dbClient: any;
  error: any;
  loading: boolean;
}
