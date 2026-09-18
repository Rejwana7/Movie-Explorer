import { Link } from 'react-router'

const NotFoundPage = () => {
  return (
    <section className="relative isolate grid min-h-[calc(100svh-5rem)] place-items-center overflow-hidden bg-[#0d0e13] px-4 pb-16 pt-28 text-center sm:px-6 sm:pt-32">
      <div className="absolute left-1/2 top-1/2 -z-10 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/10 blur-3xl sm:size-96" />

      <div className="max-w-xl">
        <p className="text-8xl font-black leading-none text-red-500 sm:text-9xl">
          404
        </p>
        <h1 className="mt-6 text-3xl font-bold text-white sm:text-4xl">
          Page not found
        </h1>
        <p className="mx-auto mt-4 max-w-md text-base leading-7 text-white/60 sm:text-lg">
          The page you are looking for does not exist or may have been moved.
        </p>

        <Link
          to="/"
          className="btn mt-8 h-12 min-h-12 border-0 bg-red-600 px-7 text-base font-semibold text-white shadow-lg shadow-red-950/30 hover:bg-red-500"
        >
          Back to Home
        </Link>
      </div>
    </section>
  )
}

export default NotFoundPage
