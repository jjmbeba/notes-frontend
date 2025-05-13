import { Outlet } from 'react-router'
import Navbar from '../components/navbar'

const Layout = () => {
  return (
    <div>
        <Navbar />
        <Outlet />
    </div>
  )
}

export default Layout