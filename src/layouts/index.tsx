import { Outlet } from 'react-router'
import Navbar from '../components/navbar'

const Layout = () => {
  return (
    <div className='px-10'>
        <Navbar />
        <Outlet />
    </div>
  )
}

export default Layout