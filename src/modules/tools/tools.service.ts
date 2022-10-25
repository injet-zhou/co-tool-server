import { Injectable } from '@nestjs/common';
import { TranslateDto } from './dto/create-tool.dto';
import { UpdateToolDto } from './dto/update-tool.dto';
import { en2zh, zh2en, translate } from '../../utils/translate';

@Injectable()
export class ToolsService {
  translate(dto: TranslateDto) {
    const { text, from, to } = dto;
    if (from && to) {
      if (from === 'zh' && to === 'en') {
        return zh2en(text);
      }
      if (from === 'en' && to === 'zh') {
        return en2zh(text);
      }
    }
    return translate({ q: text, from, to });
  }
}
