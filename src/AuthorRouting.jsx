
import { Route, Routes } from "react-router";

import CreateBlog from "./Author/CreateBlog";
import EditBlog from "./Author/EditBlog";
import AuthorDashboardLayout from "./Author/AuthorDashboardLayout";

import ProtectedRoute from './ProtectedRoute';
import AuthorLanding from "./Author/AuthorLanding";
import MyBlogs from "./MyBlogs";

const AuthorRouting = () =>{

return (
    <div>

<Routes>

    <Route path="author-dashboard"
            element={
                <ProtectedRoute role="author">
                    <AuthorDashboardLayout />
                </ProtectedRoute>
            }
            >

            <Route index element={<AuthorLanding />} />

            <Route path="manage-my-blogs" element={<MyBlogs /> } />

            <Route path="create-blog" element={<CreateBlog />} />

            <Route path="edit-blog/:id" element={<EditBlog role="author" />} />

    </Route>

</Routes>
    </div>
)}

export default AuthorRouting;
