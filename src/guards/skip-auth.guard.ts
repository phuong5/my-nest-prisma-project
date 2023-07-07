import { SetMetadata } from '@nestjs/common';

export const SKIP_AUTH_GUARD_KEY = 'skipAuthGuard';

export const SkipAuthGuard = () => SetMetadata(SKIP_AUTH_GUARD_KEY, true);
