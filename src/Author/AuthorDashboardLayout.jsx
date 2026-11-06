
import { NavLink, Outlet } from "react-router";

import './AuthorDashboard.css';

const AuthorDashboardLayout = () => {

  return (

    <div className="container-fluid">

      <div className="row">

        <aside className="col-md-3 col-lg-2 bg-light vh-100 p-3">

          <h5 className="mb-4">Author Panel</h5>

          <ul className="nav flex-column">

            <li className="nav-item mb-2">
              <NavLink className="nav-link" to="manage-my-blogs">
                Manage My Blogs
              </NavLink>
              
            </li>

            <li className="nav-item mb-2">
              <NavLink className="nav-link" to="create-blog">
                Create Blog
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/blogs-view">
                View My Blogs
              </NavLink>
            </li>

          </ul>

        </aside>

        <main className="col-md-9 col-lg-10 p-0">

          <Outlet />

        </main>

      </div>

    </div>

  );

};

export default AuthorDashboardLayout;
