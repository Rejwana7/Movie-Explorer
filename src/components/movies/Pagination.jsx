const getVisiblePages = (currentPage, totalPages) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1)
  }

  const pages = [1]
  let start = Math.max(2, currentPage - 1)
  let end = Math.min(totalPages - 1, currentPage + 1)

  if (currentPage <= 4) end = 5
  if (currentPage >= totalPages - 3) start = totalPages - 4

  if (start > 2) pages.push('left-ellipsis')

  for (let page = start; page <= end; page += 1) {
    pages.push(page)
  }

  if (end < totalPages - 1) pages.push('right-ellipsis')
  pages.push(totalPages)

  return pages
}

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null

  const visiblePages = getVisiblePages(currentPage, totalPages)

  return (
    <nav
      className="mt-12 flex flex-wrap items-center justify-center gap-2"
      aria-label="Movie results pagination"
    >
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="btn btn-square border border-white/10 bg-white/5 text-white shadow-none hover:border-red-500 hover:bg-red-600 disabled:border-white/5 disabled:bg-white/[0.03] disabled:text-white/20"
        aria-label="Previous page"
      >
        <span aria-hidden="true">&larr;</span>
      </button>

      {visiblePages.map((page) =>
        typeof page === 'number' ? (
          <button
            type="button"
            key={page}
            onClick={() => onPageChange(page)}
            className={`btn btn-square border shadow-none ${
              page === currentPage
                ? 'border-red-500 bg-red-600 text-white hover:bg-red-500'
                : 'border-white/10 bg-white/5 text-white/70 hover:border-red-500 hover:bg-red-600 hover:text-white'
            }`}
            aria-label={`Go to page ${page}`}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </button>
        ) : (
          <span
            key={page}
            className="grid size-12 place-items-center text-white/35"
            aria-hidden="true"
          >
            &hellip;
          </span>
        ),
      )}

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="btn btn-square border border-white/10 bg-white/5 text-white shadow-none hover:border-red-500 hover:bg-red-600 disabled:border-white/5 disabled:bg-white/[0.03] disabled:text-white/20"
        aria-label="Next page"
      >
        <span aria-hidden="true">&rarr;</span>
      </button>
    </nav>
  )
}

export default Pagination
