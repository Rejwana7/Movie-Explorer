const SearchBar = ({ query, onQueryChange, onSearch, onClear }) => {
  return (
    <form
      onSubmit={onSearch}
      className="mx-auto flex max-w-3xl flex-col gap-3 sm:flex-row"
      role="search"
    >
      <div className="relative flex-1">
        <label htmlFor="movie-search" className="sr-only">
          Search movies by title
        </label>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-white/40 sm:left-5"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" />
          <path strokeLinecap="round" d="m20 20-4-4" />
        </svg>

        <input
          id="movie-search"
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search for a movie or show..."
          autoComplete="off"
          className="h-12 w-full rounded-2xl border border-white/10 bg-white/5 pl-12 pr-8 text-base text-white outline-none transition placeholder:text-white/35 focus:border-red-500/70 focus:bg-white/[0.07] focus:ring-4 focus:ring-red-500/10 sm:h-16 sm:pl-14 sm:pr-14"
        />

        {query && (
          <button
            type="button"
            onClick={onClear}
            className="absolute right-3 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-full text-white/45 transition hover:bg-white/10 hover:text-white sm:right-4"
            aria-label="Clear search"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="size-5"
              aria-hidden="true"
            >
              <path strokeLinecap="round" d="m7 7 10 10M17 7 7 17" />
            </svg>
          </button>
        )}
      </div>

      <button
        type="submit"
        className="btn h-12 border-0 bg-red-600 p-6  text-base font-semibold text-white shadow-none hover:bg-red-500 sm:h-10 sm:min-h-10"
      >Search  </button>
    </form>
  )
}

export default SearchBar
