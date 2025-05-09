'use client';

import { useState } from 'react';
import persistConsultation from '@/actions/persistConsultation';
import AudioRecorder from './AudioRecorder';

export default function ConsultationForm() {
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);

  const [title, setTitle] = useState('');
  const [patientId, setPatientId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('patientId', patientId);
    if (audioBlob) {
      formData.append('audioBlob', audioBlob);
    }

    persistConsultation({
      title,
      patientId,
      audioBlob,
    });
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
        value={title} // Controlled input
        onChange={(e) => setTitle(e.target.value)} // Update state on change
        placeholder="Title"
        type="text"
      />
      <input
        required
        id="patientId"
        name="patientId"
        value={patientId} // Controlled input
        onChange={(e) => setPatientId(e.target.value)} // Update state on change
        placeholder="Patient Id"
        type="text"
      />

      <AudioRecorder onAudioBlobChange={setAudioBlob} />

      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
      >
        Save
      </button>
    </form>
  );
}
