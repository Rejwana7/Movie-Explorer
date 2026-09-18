import { useCallback, useState } from 'react'
import EmptyState from '../components/common/EmptyState'
import ErrorMessage from '../components/common/ErrorMessage'
import LoadingSpinner from '../components/common/LoadingSpinner'
import MovieGrid from '../components/movies/MovieGrid'
import MovieModal from '../components/movies/MovieModal'
import Pagination from '../components/movies/Pagination'
import SearchBar from '../components/movies/SearchBar'
import useMovies from '../hooks/useMovies'

const MOVIES_PER_PAGE = 12

const MoviesPage = () => {
  const [query, setQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedMovie, setSelectedMovie] = useState(null)
  const { movies, isLoading, error, activeQuery, loadMovies, retry } =
    useMovies()

  const totalPages = Math.ceil(movies.length / MOVIES_PER_PAGE)
  const firstMovieIndex = (currentPage - 1) * MOVIES_PER_PAGE
  const visibleMovies = movies.slice( firstMovieIndex, firstMovieIndex + MOVIES_PER_PAGE )

  const handleQueryChange = (nextQuery) => {
    setQuery(nextQuery)
  }

  const handleSearch = (event) => {
    event.preventDefault()
    setCurrentPage(1)
    loadMovies(query)
  }

  const handleClearSearch = () => {
    setQuery('')
    setCurrentPage(1)
    loadMovies('')
  }

  const handlePageChange = (nextPage) => {
    setCurrentPage(nextPage)

    window.requestAnimationFrame(() => {
      document
        .getElementById('movie-results')
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  const closeModal = useCallback(() => {
    setSelectedMovie(null)
  }, [])

  return (
    <section className="relative min-h-[calc(100svh-5rem)] overflow-hidden bg-[#0d0e13] px-4 pb-20 pt-28 sm:px-6 sm:pt-32 lg:px-8">
      <div className="pointer-events-none absolute left-1/2 top-20 z-0 h-72 w-2xl max-w-full -translate-x-1/2 rounded-full bg-red-600/5 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-500">
            Movie Explorer
          </p>
          <h1 className="mt-3 text-3xl font-black text-white sm:text-4xl lg:text-5xl">
            Find something worth watching
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-white/55 sm:text-base">
            Browse popular shows or search by title to discover your next
            favorite story.
          </p>
        </div>

        <div className="mt-8 sm:mt-10">
          <SearchBar
            query={query}
            onQueryChange={handleQueryChange}
            onSearch={handleSearch}
            onClear={handleClearSearch}
          />
        </div>

        <div id="movie-results" className="scroll-mt-24 pt-12 sm:pt-14">
          {!isLoading && !error && movies.length > 0 && (
            <div className="flex flex-col gap-2 pb-8 sm:flex-row sm:items-end sm:justify-between sm:pb-10">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-red-400">
                  {activeQuery ? 'Search results' : 'Popular shows'}
                </p>
                <h2 className="mt-1 text-2xl font-bold text-white">
                  {activeQuery ? `Results for “${activeQuery}”` : 'Explore all shows'}
                </h2>
              </div>
              <p className=" text-sm text-white/45">
                {movies.length} {movies.length === 1 ? 'title' : 'titles'} found
              </p>
            </div>
          )}

          {isLoading && <LoadingSpinner />}

          {!isLoading && error && (
            <ErrorMessage message={error} onRetry={retry} />
          )}

          {!isLoading && !error && movies.length === 0 && (
            <EmptyState query={activeQuery || query} />
          )}

          {!isLoading && !error && visibleMovies.length > 0 && (
            <>
              <MovieGrid
                movies={visibleMovies}
                onSeeDetails={setSelectedMovie}
              />
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </div>

     
      </div>

      <MovieModal movie={selectedMovie} onClose={closeModal} />
    </section>
  )
}

export default MoviesPage
