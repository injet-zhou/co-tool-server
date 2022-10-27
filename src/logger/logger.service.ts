import { ConsoleLogger, Injectable, Scope } from '@nestjs/common';
import { Logger as log4jsLogger, configure, getLogger } from 'log4js';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService extends ConsoleLogger {
  log4js: log4jsLogger;
  constructor(logDir: string) {
    super();
    configure({
      appenders: {
        all: {
          // 日志输出文件
          filename: `${logDir}/nestjs.server.log`,
          // 日志输出格式
          type: 'dateFile',
          // 日期格式
          pattern: 'yyyy-MM-dd',
          // 回滚旧的日志文件时，保证以 .log 结尾 （只有在 alwaysIncludePattern 为 false 生效）
          keepFileExt: true,
          // 输出的日志文件名是都始终包含 pattern 日期结尾
          alwaysIncludePattern: true,
          // 指定日志保留的天数
          numBackups: 10,
        },
      },
      categories: { default: { appenders: ['all'], level: 'all' } },
    });
    this.log4js = getLogger();
  }

  log(message: any, trace: string) {
    super.log(message, trace);
    this.log4js.info(trace, message);
  }

  error(message: any, trace: string) {
    super.error(message, trace);
    this.log4js.error(trace, message);
  }

  warn(message: any, trace: string) {
    super.warn(message, trace);
    this.log4js.warn(trace, message);
  }

  debug(message: any, trace: string) {
    super.debug(message, trace);
    this.log4js.debug(trace, message);
  }

  verbose(message: any, trace: string) {
    super.verbose(message, trace);
    this.log4js.info(trace, message);
  }
}
