import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ToolsService } from './tools.service';
import { TranslateDto } from './dto/create-tool.dto';
import { ApiBody } from '@nestjs/swagger';
import { ThrottlerGuard } from '@nestjs/throttler';

@Controller('tools')
export class ToolsController {
  constructor(private readonly toolsService: ToolsService) {}

  @Post('translate')
  @UseGuards(ThrottlerGuard)
  @ApiBody({ type: TranslateDto })
  translate(@Body() dto: TranslateDto) {
    return this.toolsService.translate(dto).then((res) => {
      console.log(res);
      return res;
    });
  }
}
