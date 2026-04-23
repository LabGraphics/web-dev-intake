import { StepRenderer } from "@/components/StepRenderer";

export default function Home() {
  return (
    <div className="min-h-screen bg-brand-offwhite dark:bg-black flex flex-col items-center justify-center p-4 py-12">
      <main className="w-full max-w-4xl flex flex-col items-center justify-center">
        <StepRenderer />
      </main>
    </div>
  );
}
