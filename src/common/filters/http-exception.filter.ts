import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { LoggerService } from '../../logger/logger.service';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private logger: LoggerService) {}
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const message = exception.message || '服务出错';
    this.logger.error(
      `${request.method} ${request.url}\n错误堆栈: ${exception.stack}`,
      '请求错误',
    );
    const error = {
      code: status,
      msg: message,
      timestamp: new Date().toISOString(),
      path: request.url,
    };
    response.status(HttpStatus.OK).json(error);
  }
}
