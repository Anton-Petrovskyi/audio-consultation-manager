import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { ClientGreeting } from './client-greeting';
import { getQueryClient, trpc } from '@/trpc/server';

export default function Home() {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.hello.queryOptions({
      text: 'world',
    })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ClientGreeting />
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
          <h1 className="text-4xl font-bold text-center sm:text-left">
            Willy AI
          </h1>
          <p className="text-lg text-center sm:text-left">
            A simple and easy to use AI assistant for all your needs.
          </p>
          <div className="flex flex-col gap-4">
            <a
              href="/chat"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
            >
              Start Chatting
            </a>
          </div>
        </main>
      </div>
    </HydrationBoundary>
  );
}
