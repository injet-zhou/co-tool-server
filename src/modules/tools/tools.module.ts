import { Module } from '@nestjs/common';
import { ToolsService } from './tools.service';
import { ToolsController } from './tools.controller';
import { LoggerService } from '../../logger/logger.service';

@Module({
  imports: [],
  controllers: [ToolsController],
  providers: [ToolsService, LoggerService],
})
export class ToolsModule {}
