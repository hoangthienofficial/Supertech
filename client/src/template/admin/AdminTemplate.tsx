import { Outlet } from 'react-router-dom'
import AdminSideBar from './Header/AdminSideBar'
import AdminHeader from './Header/AdminHeader'

function AdminTemplate() {
  return (
    <div className='roboto'><div className='flex'>
    <AdminSideBar/>
    <div className='flex-1'>
    <AdminHeader/>
    <Outlet />
    </div>
  

</div>
</div>

  )
}

export default AdminTemplate
