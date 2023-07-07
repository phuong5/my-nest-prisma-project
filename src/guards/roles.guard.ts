import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { SKIP_AUTH_GUARD_KEY } from './skip-auth.guard';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const skipAuthGuard = this.reflector.get<boolean>(
      SKIP_AUTH_GUARD_KEY,
      context.getHandler(),
    );

    console.log('RolesGuard trigger');
    if (skipAuthGuard) {
      return true; // skip guard
    }
    // logic TOTO
    return true;
  }
}
