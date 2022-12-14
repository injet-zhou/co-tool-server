export interface TableOptions {
  autoIncrement: boolean;
  type: string;
  isDefaultID: boolean;
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
