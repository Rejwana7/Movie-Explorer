const LoadingSpinner = () => {
  return (
    <div
      className="flex min-h-72 flex-col items-center justify-center gap-4 text-center"
      role="status"
      aria-live="polite"
    >
      <span className="loading loading-spinner loading-lg text-red-500" />
      <p className="text-sm text-white/55">Finding great shows for you...</p>
    </div>
  )
}

export default LoadingSpinner
