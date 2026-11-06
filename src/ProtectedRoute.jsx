
import { Navigate } from "react-router";
import { useAuth } from "./context/AuthContext";

const ProtectedRoute = ({ children, role }) => {

  const { currentUser, loading } = useAuth();

  if (loading) {
      return <div>Loading...</div>;
    }

  if(!currentUser){
    return <Navigate to="/login" />;
  }

  if(role && currentUser.role !== role){
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
