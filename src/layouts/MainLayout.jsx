import { Outlet } from 'react-router'
import Footer from '../components/layout/Footer'
import Navbar from '../components/layout/Navbar'

const MainLayout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-[#08090d] text-white">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout
