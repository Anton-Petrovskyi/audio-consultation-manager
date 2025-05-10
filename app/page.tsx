import ConsultationForm from '@/widgets/ConsultationForm';
import ConsultationList from '@/widgets/ConsultationsList';

export const dynamic = 'force-dynamic';

export default async function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold text-center sm:text-left">
          Willy AI
        </h1>

        <ConsultationForm />
        <h2 className="text-2xl font-bold text-center sm:text-left">
          Consultations
        </h2>
        <ConsultationList />
      </main>
    </div>
  );
}
