import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // const ctx = context.switchToHttp();
    // const req = ctx.getRequest();
    return next.handle().pipe(
      map((data) => {
        return {
          code: 200,
          msg: 'succeed',
          data,
        };
      }),
    );
  }
}
