import Scene from '@/src/components/Scene';

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <Scene />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* <h1 className="text-6xl font-bold text-white text-center">
          Welcome
        </h1> */}
      </div>
    </main>
  );
} 