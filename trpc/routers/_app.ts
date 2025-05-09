import { z } from 'zod';
import { baseProcedure, createTRPCRouter } from '../init';
import { patientRouter } from './patientRouter';
import { consultationRouter } from './consultationRouter';

export const appRouter = createTRPCRouter({
  consultation: consultationRouter,
  patient: patientRouter,
  hello: baseProcedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .query((opts) => {
      return {
        greeting: `hello ${opts.input.text}`,
      };
    }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
