import { Link } from 'react-router'

const HomePage = () => {
  return (
    <section className="relative isolate flex min-h-[calc(100svh-5rem)] items-center justify-center overflow-hidden px-4 pb-14 pt-28 text-center sm:px-6 sm:pb-20 sm:pt-36 lg:px-8">
      <img
        src="/images/hero_section.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 -z-30 size-full object-cover object-center"
      />
      <div className="absolute inset-0 -z-20 bg-black/65" />
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-black/75 via-black/15 to-[#08090d]" />
      <div className="absolute left-1/2 top-1/2 -z-10 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/15 blur-3xl sm:h-120 sm:w-120" />

      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-black leading-[1.05] tracking-tight text-balance sm:text-6xl lg:text-7xl xl:text-8xl">
          Discover movies.
          <span className="mt-2 block text-red-500 sm:mt-3">
            Find your favorites.
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/70 sm:mt-8 sm:text-lg sm:leading-8">
          Explore memorable stories from around the world, search for the shows
          you love, and discover something new to watch.
        </p>

        <div className="mt-8 flex justify-center sm:mt-10">
          <Link
            to="/movies"
            className="btn h-12 min-h-12 border-0 bg-red-600 px-7 text-base font-bold text-white shadow-xl shadow-red-950/40 transition hover:-translate-y-0.5 hover:bg-red-500 sm:h-14 sm:min-h-14 sm:px-9"
          >
            Explore Movies
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="size-5"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 12h14m-6-6 6 6-6 6"
              />
            </svg>
          </Link>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs font-medium uppercase tracking-[0.16em] text-white/45 sm:mt-14 sm:text-sm">
          <span>Browse shows</span>
          <span className="size-1 rounded-full bg-red-500" />
          <span>Search instantly</span>
          <span className="size-1 rounded-full bg-red-500" />
          <span>View details</span>
        </div>
      </div>
    </section>
  )
}

export default HomePage
