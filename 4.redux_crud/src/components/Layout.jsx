/* Wrapper Component */
import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout = () => {
  return (
    <>
      <Header /> {/* < Header remains visible at the top on all pages */}

      <main className='App'>  {/* < Layout wrapper for all pages */}

          <Outlet /> {/* < Components here change dynamically */}

      </main>
    </>
  )
}

export default Layout