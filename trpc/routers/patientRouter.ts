import { z } from 'zod';
import { createTRPCRouter, baseProcedure } from '@/trpc/init';
import { prisma } from '@/server/db';

export const patientRouter = createTRPCRouter({
  list: baseProcedure.query(async () => {
    const patients = await prisma.patient.findMany({
      orderBy: {
        name: 'asc',
      },
    });
    return patients;
  }),
  create: baseProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { name } = input;
      const patient = await prisma.patient.create({
        data: {
          name,
        },
      });
      return patient;
    }),
});
