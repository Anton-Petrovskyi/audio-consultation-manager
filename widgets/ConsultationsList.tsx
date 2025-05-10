'use client';

import { useTRPC } from '@/trpc/client';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

const ConsultationList = () => {
  const trpc = useTRPC();
  const { data: consultations } = useQuery(
    trpc.consultation.list.queryOptions()
  );

  const [audioUrls, setAudioUrls] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (consultations) {
      const urls: { [key: string]: string } = {};
      consultations.forEach((con) => {
        const audioBlob = new Blob([con.audioBlob], { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        urls[con.id] = url;
      });

      setAudioUrls(urls);

      // Cleanup function to revoke object URLs when the component unmounts or consultations change
      return () => {
        Object.values(urls).forEach((url) => URL.revokeObjectURL(url));
      };
    }
  }, [consultations]);

  return (
    <div className="flex flex-col gap-10">
      {!consultations ? (
        <div>Loading...</div>
      ) : (
        consultations?.map((con) => {
          const audioUrl = audioUrls[con.id];
          return (
            <div key={con.id} className="text-gray-800 ">
              <p className="text-gray-500 text-lg">{con.title}</p>
              <p className="mb-1 text-md">{con.Patient.name}</p>
              {audioUrl && <audio className="h-10" controls src={audioUrl} />}
            </div>
          );
        })
      )}
    </div>
  );
};

export default ConsultationList;
