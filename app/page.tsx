import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient, trpc } from '@/trpc/server';
import ConsultationForm from '@/widgets/ConsultationForm';
import { caller } from '@/trpc/server';
import Audio from '@/components/audio';

export default async function Home() {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.hello.queryOptions({
      text: 'world',
    })
  );

  const consultations = await caller.consultation.list();
  const patients = await caller.patient.list();

  // Map of patients
  const patientsMap = patients.reduce((acc, patient) => {
    acc[patient.id] = patient.name;
    return acc;
  }, {});

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
          <h1 className="text-4xl font-bold text-center sm:text-left">
            Willy AI
          </h1>

          <ConsultationForm />

          <h2 className="text-2xl font-bold text-center sm:text-left">
            Consultations
          </h2>
          <div className="flex flex-col gap-10">
            {consultations.map((con) => {
              return (
                <div key={con.id} className="text-gray-800 ">
                  <p className="text-gray-500 text-lg">{con.title}</p>
                  <p className="mb-1 text-md">{patientsMap[con.patientId]}</p>
                  <Audio audioBuffer={con.audioBlob} />
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </HydrationBoundary>
  );
}
