
import { Outlet } from 'react-router-dom'
import Header from '../Component/Header/Header'
import Footer from '../Component/Footer/Footer'

import { Suspense } from 'react'
import useScrollToTop from '../../hooks/UseSrollTop'
import BackToTopButton from '../../components/backToTop/BackToTop'






function UserTemplate() {

  useScrollToTop()
  return (
    <div className='roboto bg-[#ececec]'>
 

         <div className=''>
        <Header/>
        <Suspense >
  <Outlet />
  <BackToTopButton/>
</Suspense>

      <Footer />
    </div>
    </div>
 
  )
}

export default UserTemplate
