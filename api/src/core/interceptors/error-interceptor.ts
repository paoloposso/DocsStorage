import { Injectable, NestInterceptor, ExecutionContext, BadGatewayException, CallHandler, BadRequestException } from '@nestjs/common';
import { MongooseError } from 'mongoose';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        let result = error;
        if (error.name === 'MongoServerError' && error.code === 11000) {
          result = new BadRequestException(error.message);
        }
        throw result;
      }),
    );
  }
}
