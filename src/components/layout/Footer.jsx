const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-white/10 bg-[#08090d]">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-center text-sm text-white/50 sm:flex-row sm:px-6 sm:text-left lg:px-8">
        <p>
          <span className="font-semibold text-white text-lg">MovieExplorer</span>{' '}
          - stories worth watching.
        </p>
        <p className="font-medium text-white/20 ">Copyright {currentYear} MovieExplorer. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
