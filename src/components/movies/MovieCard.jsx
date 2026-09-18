const MovieCard = ({ movie, onSeeDetails }) => {
  const releaseYear = movie.premiered?.slice(0, 4) || 'Unknown'
  const rating = movie.rating?.average ?? 'N/A'
  const genres = movie.genres?.slice(0, 2) || []

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#15161d] shadow-lg shadow-black/10 transition duration-300 hover:-translate-y-1 hover:border-red-500/35 hover:shadow-2xl hover:shadow-red-950/20">
      <div className="relative aspect-5/7 overflow-hidden bg-[#20212a]">
        {movie.image?.medium ? (
          <img
            src={movie.image.medium}
            alt={`${movie.name} poster`}
            loading="lazy"
            className="size-full object-cover transition duration-500 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="grid size-full place-items-center bg-linear-to-br from-[#252631] to-[#111218] px-3 text-center text-white/25">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                className="mx-auto size-12"
                aria-hidden="true"
              >
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m8 5 2 4m4-4 2 4M3 10h18" />
              </svg>
              <p className="mt-3 text-sm">Poster unavailable</p>
            </div>
          </div>
        )}

        <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-[#15161d] to-transparent" />
        <span className="absolute right-3 top-3 rounded-full border border-white/10 bg-black/70 px-2.5 py-1 text-xs font-semibold text-amber-300 backdrop-blur-sm">
          <span aria-hidden="true">★</span> {rating}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h2 className="text-lg font-bold leading-snug text-white">{movie.name}</h2>

        <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-white/50">
          <span>{releaseYear}</span>
          <span className="size-1 rounded-full bg-red-500" />
          <span>{movie.language || 'Unknown language'}</span>
        </div>

        <div className="mt-4 flex min-h-6 flex-wrap gap-2">
          {genres.length > 0 ? (
            genres.map((genre) => (
              <span
                key={genre}
                className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-white/60"
              >
                {genre}
              </span>
            ))
          ) : (
            <span className="text-xs text-white/35">Genre not available</span>
          )}
        </div>

        <button
          type="button"
          onClick={() => onSeeDetails(movie)}
          className="btn btn-sm mt-4 w-full border border-white/10 bg-white/5 text-sm font-semibold text-white shadow-none hover:border-red-500 hover:bg-red-600"
        >
          See Details
        </button>
      </div>
    </article>
  )
}

export default MovieCard
