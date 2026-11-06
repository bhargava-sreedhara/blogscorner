

import { useEffect, useState } from "react";
import { Link } from "react-router";

import { useAuth } from "./context/AuthContext";
import { deleteBlog, getBlogs, getBlogsByAuthor } from "./services/blogService";
import { toast, ToastContainer } from "react-toastify";

const MyBlogs = () => {

  const { currentUser } = useAuth();

  const [filteredBlogs, setFilteredBlogs] = useState([]);

  const loadBlogs = async () =>
  {
    let blogRes = null;
    if( currentUser && currentUser.role === "author" )
    {
        blogRes = await getBlogsByAuthor(currentUser.authorId);
    }
    else
    {
        blogRes = await getBlogs();
    }    

    setFilteredBlogs(blogRes.data);
  };

  const notify = () => {
    toast("Blog deleted !", {
      onClose: () => {
        loadBlogs();
      },
      autoClose: 3000,
    });
  };

  const deleteBlogAction = async (blogId) => {
    await deleteBlog(blogId);
    notify();
  }

  useEffect(() =>
  {
      loadBlogs();
  }, [currentUser]);

  return (

    <div className="p-4">

      <ToastContainer />
      <h3 className="mb-4">{currentUser && currentUser.role === "author" ? 'My' : 'All'}&nbsp;Blogs</h3>

      {filteredBlogs.map(blog => (

        <div key={blog.id} className="card mb-3">

          <div className="card-body">

            <h5>{blog.title}</h5>

            <p>{blog.summary}</p>

            <Link
                to={`/author-dashboard/edit-blog/${blog.id}`}
                className={`btn btn-sm btn-primary me-2 ${( currentUser && currentUser.role === "author" ) ? '':'d-none'}`}
              >
                Edit
            </Link>
            <Link
                to={`/admin-dashboard/edit-blog/${blog.id}`}
                className={`btn btn-sm btn-primary me-2 ${( currentUser && currentUser.role === "admin" ) ? '':'d-none'}`}
              >
                Edit
            </Link>
            
            <button onClick={()=>deleteBlogAction(blog.id)} className="btn btn-sm btn-danger">
              Delete
            </button>

          </div>

        </div>

      ))}

    </div>

  );

};

export default MyBlogs;
