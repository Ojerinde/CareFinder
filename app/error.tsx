"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <section className="h-screen w-full flex flex-col justify-center items-center">
      <h2 className="text-2xl">{error.message}</h2>
      <button
        onClick={() => reset()}
        className="mt-4 text-lg border-2 border-primary_light_color py-4 px-10"
      >
        Try again
      </button>
    </section>
  );
}
