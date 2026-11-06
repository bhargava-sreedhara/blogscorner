
import { Route, Routes } from "react-router";
import BlogsView from "./BlogsView";
import BlogDetails from "./BlogDetails";
import Login from "./Login";

function LayoutRouting() {
  return (
    <div>
        <Routes>
            <Route path="/blogs-view" element={<BlogsView />} />
            <Route path="blogs-view/:id" element={<BlogDetails />} />
            <Route path="login" element={<Login />} />
        </Routes>
    </div>
  )
}

export default LayoutRouting;