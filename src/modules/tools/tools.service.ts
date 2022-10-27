import { Injectable } from '@nestjs/common';
import { TranslateDto } from './dto/create-tool.dto';
import { translate } from '../../utils/translate';
import { LoggerService } from '../../logger/logger.service';

@Injectable()
export class ToolsService {
  constructor(private readonly logger: LoggerService) {}
  async translate(dto: TranslateDto) {
    const { text, from, to } = dto;
    const res = await translate({ q: text, from, to });
    const { trans_result } = res;
    if (!trans_result) {
      this.logger.error(
        `translate error: ${JSON.stringify(res)}`,
        'ToolsService',
      );
      return [];
    }
    return trans_result.map((item: any) => item.dst);
  }
}
