import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { UsersController } from './users/users.controller';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { LoginModule } from './login/login.module';
import { RolesGuard } from './guards/roles.guard';

@Module({
  imports: [UsersModule, LoginModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude('login')
      .forRoutes(UsersController);
  }
}
