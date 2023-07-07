import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { SkipAuthGuard } from 'src/guards/skip-auth.guard';

@Controller('login')
@UseGuards(AuthGuard)
export class LoginController {
  @Get()
  @SkipAuthGuard()
  public login() {
    console.log('LoginController get!');
    return 'login controller trigged';
  }
}
