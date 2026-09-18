import MovieCard from './MovieCard'

const MovieGrid = ({ movies, onSeeDetails }) => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onSeeDetails={onSeeDetails}
        />
      ))}
    </div>
  )
}

export default MovieGrid
