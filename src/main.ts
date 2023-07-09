import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from './middlewares/console.middleware';
import { ValidationExceptionFilter } from './filters/validation-exception.filter';
import { AllExceptionsFilter } from './filters/all-exception.filter';
import { ValidationPipe } from './pipes/validation.pipe';
import { TrpcRouter } from './trpc/trpc.router';
// import { AuthGuard } from './guards/auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // global middle ware
  app.use(logger);

  app.useGlobalFilters(new ValidationExceptionFilter());
  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  // app.useGlobalGuards(new AuthGuard());

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors();
  const trpc = app.get(TrpcRouter);
  trpc.applyMiddleware(app);

  await app.listen(3000);
}

bootstrap();
