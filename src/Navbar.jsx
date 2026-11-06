
import { NavLink, useNavigate } from "react-router";
import { useAuth } from "./context/AuthContext";

const Navbar = () => {

    const { currentUser, logout } = useAuth();
    const navigateToHome = useNavigate();

    const logoutAction = async() =>{
        await logout();
        navigateToHome("/");
    }

    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">

            <div className="container">

                <NavLink
                    className="navbar-brand" to="/">
                        <span className="fw-bold">Blogs<span className="text-danger">Corner</span></span>
                </NavLink>
                <button type="button" className="navbar-toggler"
                    data-bs-target="#bcNavbarMain" data-bs-toggle="collapse"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="bcNavbarMain">

                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">

                            <NavLink className="nav-link" to="/">Home</NavLink>
                            
                        </li>

                            {!currentUser && (
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/login">
                                Login
                                </NavLink>
                            </li>
                            )}

                            {currentUser && (
                            <>
                                <li className="nav-item">
                                <span className="nav-link">
                                    Hello <span className="text-info">{currentUser.name}</span>
                                </span>
                                </li>

                                { currentUser.role === "author" && 
                                (
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/author-dashboard">
                                    My Dashboard
                                    </NavLink>
                                </li>
                                )}
                                { currentUser.role === "admin" && 
                                (
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/admin-dashboard">
                                    My Dashboard
                                    </NavLink>
                                </li>
                                )}

                                <li className="nav-item">
                                <button type="button"
                                    className="btn btn-sm btn-outline-light ms-2 mt-1"
                                    onClick={()=>logoutAction()}
                                >
                                    Logout
                                </button>
                                </li>
                            </>
                            )}

                    </ul>

                </div>

            </div>

        </nav>
  )
}

export default Navbar;