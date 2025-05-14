import { Outlet } from 'react-router'
import Navbar from '../components/navbar'
import { Toaster } from '../components/ui/sonner'

const Layout = () => {
  return (
    <div className='px-10'>
      <Navbar />
      <Outlet />
      <Toaster richColors />
    </div>
  )
}

export default Layout