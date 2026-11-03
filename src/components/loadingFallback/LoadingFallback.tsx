export function LoadingFallback() {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-dashboard"
      aria-busy="true"
      aria-label="Loading products"
    >
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="bg-brand-card rounded-brand border border-gray-200 p-card flex flex-col justify-between h-80 animate-pulse"
        >
          <div className="h-44 w-full bg-gray-200 rounded-brand mb-3" />
          <div className="space-y-2">
            <div className="h-4 w-1/3 bg-gray-200 rounded" />
            <div className="h-5 w-3/4 bg-gray-200 rounded" />
            <div className="h-6 w-1/4 bg-gray-200 rounded" />
          </div>
          <div className="h-9 w-full bg-gray-200 rounded-brand mt-4" />
        </div>
      ))}
    </div>
  );
}
