import { Controller, Post, Body } from '@nestjs/common';
import { ToolsService } from './tools.service';
import { TranslateDto } from './dto/create-tool.dto';
import { ApiBody } from '@nestjs/swagger';

@Controller('tools')
export class ToolsController {
  constructor(private readonly toolsService: ToolsService) {}

  @Post('translate')
  @ApiBody({ type: TranslateDto })
  translate(@Body() dto: TranslateDto) {
    return this.toolsService.translate(dto);
  }
}
