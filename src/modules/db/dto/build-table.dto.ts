import { ColumnDef, TableOptions } from '../types';
import { ApiProperty } from '@nestjs/swagger';

export class BuildTableDto {
  @ApiProperty()
  tableName: string;
  @ApiProperty()
  database: string;
  @ApiProperty({ description: 'table options', isArray: true })
  columns: ColumnDef[];
  @ApiProperty()
  options: TableOptions;
}
