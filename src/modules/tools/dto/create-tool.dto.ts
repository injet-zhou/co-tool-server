import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateToolDto {}

export class TranslateDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  text: string;
  @ApiProperty()
  @IsString()
  from: string;
  @ApiProperty()
  @IsString()
  to: string;
}
