import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { DbService } from './db.service';
import { BuildTableDto } from './dto/build-table.dto';
import { ApiBody } from '@nestjs/swagger';

@Controller('db')
export class DbController {
  constructor(private readonly dbService: DbService) {}

  @Post('createTbl')
  @HttpCode(200)
  @ApiBody({ type: BuildTableDto })
  create(@Body() createDbDto: BuildTableDto) {
    return this.dbService.create(createDbDto);
  }
}
