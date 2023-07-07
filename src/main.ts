import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from './middlewares/console.middleware';
import { ValidationExceptionFilter } from './filters/validation-exception.filter';
import { AllExceptionsFilter } from './filters/all-exception.filter';
// import { AuthGuard } from './guards/auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // global middle ware
  app.use(logger);

  app.useGlobalFilters(new ValidationExceptionFilter());
  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  // app.useGlobalGuards(new AuthGuard());

  await app.listen(3000);
}
bootstrap();
