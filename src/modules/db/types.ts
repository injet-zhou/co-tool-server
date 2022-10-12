export interface TableOptions {
  autoIncrement: boolean;
  type: string;
}

export interface ColumnDef {
  name: string;
  type: string;
  length: number;
  nullable: boolean;
  defaultValue: any;
  comment: string;
  isPrimaryKey: boolean;
}
