'use client';

import { useEffect, useState } from 'react';

export default function Audio({ audioBuffer }: { audioBuffer: Uint8Array }) {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  useEffect(() => {
    const audioBlob = new Blob([audioBuffer], { type: 'audio/webm' });
    const url = URL.createObjectURL(audioBlob);
    setAudioUrl(url);

    // Clean up the URL when the component unmounts or audioBuffer changes
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [audioBuffer]);

  if (!audioUrl) {
    return null;
  }

  return <audio className="h-10" controls src={audioUrl} />;
}
