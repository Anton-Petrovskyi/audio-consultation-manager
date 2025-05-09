'use server';
import { caller } from '@/trpc/server';
import { ActionResponse } from '@/types';
import { getErrorMessage } from '@/utils/getErrorMsg';

const persistConsultation = async (formData: {
  patientId: string;
  title: string;
  audioBlob: Blob | null;
}): Promise<ActionResponse> => {
  const { patientId, title, audioBlob } = formData;

  if (!patientId || !title || !audioBlob) {
    // TODO: better error handling
    return {
      success: false,
      message: 'Please fill in all fields.',
    };
  }

  const audioBuffer = Buffer.from(await audioBlob.arrayBuffer());

  try {
    await caller.consultation.create({
      title,
      patientId,
      audioBlob: audioBuffer,
    });

    return {
      success: true,
      message: 'Consultation saved successfully.',
    };
  } catch (error) {
    console.log('Error saving consultation: ', error);

    return {
      success: false,
      message: `${getErrorMessage(error)}`,
    };
  }
};

export default persistConsultation;
