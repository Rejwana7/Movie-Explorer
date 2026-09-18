const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div
      className="mx-auto flex min-h-72 max-w-lg flex-col items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/5 p-8 text-center"
      role="alert"
    >
      <div className="grid size-12 place-items-center rounded-full bg-red-500/10 text-2xl text-red-400">
        !
      </div>
      <h2 className="mt-5 text-xl font-bold text-white">Unable to load movies</h2>
      <p className="mt-2 text-sm leading-6 text-white/60">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="btn mt-6 border-0 bg-red-600 px-6 text-white hover:bg-red-500"
      >
        Try Again
      </button>
    </div>
  )
}

export default ErrorMessage
