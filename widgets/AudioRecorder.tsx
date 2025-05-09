'use client';

import { useState, useRef } from 'react';

export default function AudioRecorder({
  onAudioBlobChange,
}: {
  onAudioBlobChange: (audioBlob: Blob | null) => void;
}) {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      // Stop and clean up any existing MediaRecorder instance
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stream
          .getTracks()
          .forEach((track) => track.stop());
        mediaRecorderRef.current = null;
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      // Clear audioChunks at the start of a new recording
      audioChunks.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunks.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setAudioURL(url);
        audioChunks.current = [];
        onAudioBlobChange(audioBlob);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream
        .getTracks()
        .forEach((track) => track.stop());
      mediaRecorderRef.current = null;
    }
    setIsRecording(false);
  };

  return (
    <div className="flex flex-col items-start gap-4">
      <div className="flex flex-row items-center justify-center gap-4 h-20">
        <div className="flex gap-4 w-24">
          {!isRecording ? (
            <button
              onClick={startRecording}
              className="bg-green-500 text-white w-full py-2 px-4 rounded hover:bg-green-600 transition duration-200"
            >
              Record
            </button>
          ) : (
            <button
              onClick={stopRecording}
              className="bg-red-500 text-white w-full py-2 px-4 rounded hover:bg-red-600 transition duration-200"
            >
              Stop
            </button>
          )}
        </div>
        {audioURL && <audio controls src={audioURL} className="h-10"></audio>}
      </div>
    </div>
  );
}
