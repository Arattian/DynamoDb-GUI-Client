import { DynamoDB } from 'aws-sdk/clients/all';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

export interface RootState {
  tables: string[];
  filterText: string;
  currentTable: any;
  currentDb: string;
  dbInstance: DynamoDB;
  dbClient: DocumentClient;
  response: {
    title: string;
    type: string;
    message: string;
  };
  loading: boolean;
}
