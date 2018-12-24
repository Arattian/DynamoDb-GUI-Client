export interface RootState {
  tables: string[];
  filterText: string;
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
