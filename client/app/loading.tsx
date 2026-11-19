
export default function Loading() {
  return (
    <div className="min-h-[calc(100dvh-4.5rem)] bg-background text-foreground">
      <main id="main-content" className="mx-auto w-full max-w-[90rem] px-5 pb-28 pt-14 sm:px-8 sm:pt-20 lg:px-12">
        <div className="grid gap-10 pb-20 sm:pb-28 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-14">
          <div className="space-y-5">
            <div className="h-5 w-52 animate-pulse rounded bg-muted motion-reduce:animate-none" />
            <div className="h-24 w-4/5 max-w-2xl animate-pulse rounded-lg bg-muted motion-reduce:animate-none sm:h-32" />
            <div className="h-5 w-full max-w-md animate-pulse rounded bg-muted motion-reduce:animate-none" />
            <div className="h-12 w-44 animate-pulse rounded-md bg-muted motion-reduce:animate-none" />
          </div>
          <div>
            <div className="aspect-[16/10] animate-pulse rounded-lg bg-muted motion-reduce:animate-none" />
            <div className="mt-5 h-5 w-48 animate-pulse rounded bg-muted motion-reduce:animate-none" />
          </div>
        </div>
        <div className="mb-9 flex items-end justify-between gap-3 border-b pb-5">
          <div className="mb-1 h-10 w-72 animate-pulse rounded bg-muted motion-reduce:animate-none" />
          <div className="mb-1 h-4 w-12 animate-pulse rounded bg-muted motion-reduce:animate-none" />
        </div>
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 aspect-[16/10] animate-pulse rounded-lg bg-muted motion-reduce:animate-none sm:col-span-6 lg:col-span-4" />
          <div className="col-span-12 aspect-[16/10] animate-pulse rounded-lg bg-muted motion-reduce:animate-none sm:col-span-6 lg:col-span-4" />
          <div className="col-span-12 aspect-[16/10] animate-pulse rounded-lg bg-muted motion-reduce:animate-none sm:col-span-6 lg:col-span-4" />
        </div>
      </main>
    </div>
  );
}
