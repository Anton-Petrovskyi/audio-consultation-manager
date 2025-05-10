'use client';

import { useState } from 'react';
import AudioRecorder from './AudioRecorder';
import { useTRPC } from '@/trpc/client';
import { useMutation, useQuery } from '@tanstack/react-query';

export default function ConsultationForm() {
  const trpc = useTRPC();
  const { data: patients } = useQuery(trpc.patient.list.queryOptions());
  const { refetch } = useQuery(trpc.consultation.list.queryOptions());
  const { mutate: createConsultation } = useMutation(
    trpc.consultation.create.mutationOptions()
  );

  const [title, setTitle] = useState('');
  const [patientId, setPatientId] = useState('');
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const audioBuffer = new Uint8Array(await audioBlob.arrayBuffer());
    const consultation = { title, patientId, audioBlob: audioBuffer };
    createConsultation(consultation, { onSuccess: refetch });

    setTitle('');
    setPatientId('');
    setAudioBlob(null);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 border-2 border-gray-800 p-4 rounded-lg shadow-md w-2xl"
    >
      <h2 className="text-2xl font-bold">Add Consultation</h2>

      <input
        required
        id="title"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        type="text"
      />

      <select
        required
        id="patientId"
        name="patientId"
        value={patientId}
        onChange={(e) => setPatientId(e.target.value)}
        className="border-2 border-gray-800 rounded-lg p-2"
      >
        <option value="" disabled>
          Select a patient
        </option>
        {patients?.map((patient) => (
          <option key={patient.id} value={patient.id}>
            {patient.name}
          </option>
        ))}
      </select>

      <AudioRecorder onAudioBlobChange={setAudioBlob} />

      <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200">
        Save
      </button>
    </form>
  );
}
