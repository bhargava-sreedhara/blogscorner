
import { Route, Routes } from 'react-router'
import ProtectedRoute from './ProtectedRoute'
import AdminLayout from './Admin/AdminLayout'
import AdminLanding from './Admin/AdminLanding'
import MyBlogs from './MyBlogs'
import CreateBlog from './Author/CreateBlog'
import EditBlog from './Author/EditBlog'
import ManageAuthors from './Admin/ManageAuthors'

const AdminRouting = () => {
  return (
    <div>
        <Routes>

            <Route path="admin-dashboard"
                element={
                    <ProtectedRoute role="admin">
                        <AdminLayout />
                    </ProtectedRoute>
                }>

                    <Route index element={ <AdminLanding /> } />

                    <Route path="manage-all-blogs" element={ <MyBlogs /> }/>

                    <Route path="create-blog" element={ <CreateBlog /> } />
        
                    <Route path="edit-blog/:id" element={<EditBlog role="admin" />} />

                    <Route path="manage-all-authors" element={ <ManageAuthors /> }/>

            </Route>

        </Routes>
    </div>
  )
}

export default AdminRouting;
