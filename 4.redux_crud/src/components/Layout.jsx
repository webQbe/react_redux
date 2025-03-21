/* Wrapper Component */
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <main className='App'> {/* < layout wrapper for all pages */}
        <Outlet /> {/* < Tells React Router where to render the nested route content */}
    </main>
  )
}

export default Layout