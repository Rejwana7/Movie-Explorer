import { useEffect, useRef } from 'react'

const getPlainText = (html) => {
  if (!html) return 'No summary is available for this show.'

  const parsedDocument = new DOMParser().parseFromString(html, 'text/html')
  return parsedDocument.body.textContent || 'No summary is available for this show.'
}

const DetailItem = ({ label, value }) => (
  <div className="rounded-xl border border-white/10 bg-white/5 p-3">
    <dt className="text-xs uppercase tracking-wider text-white/40">{label}</dt>
    <dd className="mt-1 text-sm font-medium text-white/85">{value}</dd>
  </div>
)

const MovieModal = ({ movie, onClose }) => {
  const closeButtonRef = useRef(null)

  useEffect(() => {
    if (!movie) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [movie, onClose])

  if (!movie) return null

  const releaseDate = movie.premiered || 'Unknown'
  const rating = movie.rating?.average ?? 'N/A'
  const network = movie.network?.name || movie.webChannel?.name || 'Not available'
  const runtime = movie.averageRuntime || movie.runtime
  const genres = movie.genres?.length ? movie.genres.join(', ') : 'Not available'

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-3 backdrop-blur-sm sm:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
      role="presentation"
    >
      <article
        className="relative grid max-h-[92svh] w-full max-w-5xl overflow-y-auto rounded-2xl border border-white/10 bg-[#15161d] shadow-2xl shadow-black/70 md:grid-cols-[minmax(240px,0.85fr)_1.4fr]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="movie-modal-title"
      >
        <div className="relative min-h-72 bg-[#20212a] md:min-h-full">
          {movie.image?.original || movie.image?.medium ? (
            <img
              src={movie.image.original || movie.image.medium}
              alt={`${movie.name} poster`}
              className="absolute inset-0 size-full object-cover"
            />
          ) : (
            <div className="grid size-full min-h-72 place-items-center bg-linear-to-br from-[#292a35] to-[#111218] text-white/25">
              Poster unavailable
            </div>
          )}
          <div className="absolute inset-0 bg-linear-to-t from-[#15161d] via-transparent to-black/20 md:bg-linear-to-r md:from-transparent md:to-[#15161d]/30" />
        </div>

        <div className="p-6 sm:p-8 md:p-10">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wider text-red-400">
            <span>{movie.type || 'Show'}</span>
            <span className="size-1 rounded-full bg-red-500" />
            <span>{movie.status || 'Status unknown'}</span>
          </div>

          <h2
            id="movie-modal-title"
            className="mt-3 text-3xl font-black leading-tight text-white sm:text-4xl"
          >
            {movie.name}
          </h2>

          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
            <DetailItem label="Rating" value={`★ ${rating}`} />
            <DetailItem label="Premiered" value={releaseDate} />
            <DetailItem
              label="Runtime"
              value={runtime ? `${runtime} min` : 'Not available'}
            />
            <DetailItem label="Language" value={movie.language || 'Unknown'} />
            <DetailItem label="Network" value={network} />
            <DetailItem label="Genres" value={genres} />
          </div>

          <div className="mt-7">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white/80">
              Overview
            </h3>
            <p className="mt-3 text-sm leading-7 text-white/60 sm:text-base">
              {getPlainText(movie.summary)}
            </p>
          </div>

          <div className="mt-7 flex justify-end">
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              className="btn border-0 bg-red-600 px-7 font-semibold text-white shadow-none hover:bg-red-500"
            >
              Close
            </button>
          </div>
        </div>
      </article>
    </div>
  )
}

export default MovieModal
