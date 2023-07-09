import { INestApplication, Injectable } from '@nestjs/common';
import { z } from 'zod';
import * as trpcExpress from '@trpc/server/adapters/express';
import { TrpcService } from './trpc.service';

@Injectable()
export class TrpcRouter {
    constructor(private readonly trpc: TrpcService) { }

    appRouter = this.trpc.router({
        hello: this.trpc.procedure
            .input(
                z.object({
                    name: z.string().optional(),
                }),
            )
            .query(({ input }) => {
                const { name } = input;
                console.log(`Hello ${name ? name : ''}`)
                return {
                    greeting: `Hello ${name ? name : ''}`,
                };
            }),
    });

    async applyMiddleware(app: INestApplication) {
        app.use(
            `/trpc`,
            trpcExpress.createExpressMiddleware({
                router: this.appRouter,
            }),
        );
    }
}

export type AppRouter = TrpcRouter[`appRouter`];
