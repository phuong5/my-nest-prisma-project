import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

export class ValidationException extends HttpException {
  constructor(errors: string[]) {
    super({ message: 'Validation failed', errors }, HttpStatus.BAD_REQUEST);
  }

  getError() {
    return 'fake error';
  }
}

@Catch(ValidationException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: ValidationException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();
    const errors = exception.getError();
    response.status(status).json({
      statusCode: status,
      errors,
    });
  }
}
