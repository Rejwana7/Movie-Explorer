import { Link, NavLink } from 'react-router'
import logo from '../../assets/logo.png'

const Navbar = () => {
  const navLinkClasses = ({ isActive }) =>
    `inline-flex rounded-lg px-3 py-2 text-sm font-medium transition sm:px-4 ${
      isActive  ? 'bg-white/10 text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'
    }`

  return (
    <header className="absolute inset-x-0 top-0 z-20 border-b border-white/10 bg-black/20 backdrop-blur-md">
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <Link to="/" className="flex items-center gap-3" aria-label="Movie Explorer home" >
          <span className="grid size-10 place-items-center rounded-xl bg-white shadow-lg shadow-black/20 sm:size-11">
            <img src={logo} alt="Movie Explorer logo"
              className="size-8 object-contain sm:size-9"/>
          </span>

          <span className="text-base font-bold tracking-wide sm:text-lg">
            Movie<span className="text-red-500">Explorer</span>
          </span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <NavLink to="/" end className={navLinkClasses}> Home</NavLink>
          <NavLink  to="/movies"  className="btn btn-sm border-0 bg-red-600 px-4 text-sm font-semibold text-white shadow-none hover:bg-red-500 sm:btn-md sm:px-6">
            Movies </NavLink>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
