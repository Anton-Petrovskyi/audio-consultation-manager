import { z } from 'zod';
import { createTRPCRouter, baseProcedure } from '@/trpc/init';
import { prisma } from '@/server/db';

export const consultationRouter = createTRPCRouter({
  list: baseProcedure.query(async () => {
    const consultations = await prisma.consultation.findMany();
    return consultations;
  }),
  create: baseProcedure
    .input(
      z.object({
        title: z.string(),
        patientId: z.string(),
        audioBlob: z.instanceof(Buffer),
      })
    )
    .mutation(async ({ input }) => {
      const { title, patientId, audioBlob } = input;
      const consultation = await prisma.consultation.create({
        data: {
          patientId,
          title,
          audioBlob,
        },
      });

      return consultation;
    }),
});
