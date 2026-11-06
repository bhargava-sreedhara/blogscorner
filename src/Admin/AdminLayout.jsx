import { NavLink, Outlet } from "react-router";

const AdminLayout = () => {
  return (
    <div className="container-fluid">
        <div className="row">
            <aside className="col-md-3 col-lg-2 vh-100 bg-dark p-3">
                    <h5 className="mb-4 text-light">Admin Panel</h5>

                    <ul className="nav flex-column">
                        <li className="nav-item mb-2">
                            <NavLink className="nav-link text-light fw-bold" to="manage-all-blogs">
                                Manage All Blogs
                            </NavLink>
                        </li>

                        <li className="nav-item mb-2">
                        <NavLink className="nav-link text-light fw-bold" to="create-blog">
                            Create Blog
                        </NavLink>
                        </li>

                        <li className="nav-item mb-2">
                            <NavLink className="nav-link text-light fw-bold" to="/blogs-view">
                                View All Blogs
                            </NavLink>
                        </li>

                        <li className="nav-item mb-2">
                            <NavLink className="nav-link text-light fw-bold" to="manage-all-authors">
                                Manage All Authors
                            </NavLink>
                        </li>
                    </ul>
            </aside>
            <main className="col-md-9 col-lg-10 p-0">
                <Outlet />
            </main>
        </div>
    </div>
  )
}

export default AdminLayout;