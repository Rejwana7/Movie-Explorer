const EmptyState = ({ query }) => {
  return (
    <div className="flex min-h-72 flex-col items-center justify-center px-4 text-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="size-14 text-white/25"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="7" />
        <path strokeLinecap="round" d="m20 20-4-4" />
      </svg>
      <h2 className="mt-5 text-xl font-bold text-white">No movies found</h2>
      <p className="mt-2 max-w-md text-sm leading-6 text-white/55">
        No results found for {query}. Try another movie or show title.
      </p>
    </div>
  )
}

export default EmptyState
