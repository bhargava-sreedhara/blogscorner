
import { useState } from "react";

import BlogForm from "../BlogForm";
import { createBlog } from "../services/blogService";
import { useAuth } from "../context/AuthContext";

import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router";

const CreateBlog = () => {

  const { currentUser } = useAuth();
  const navigateToMyBlogs = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    content: "",
    category: "",
    image: ""
  });

const notify = () => {
  toast("Blog Created !", {
    onClose: () => {
      if( currentUser && currentUser.role === "author" )
      {
          navigateToMyBlogs("/author-dashboard/manage-my-blogs");
      }
      if( currentUser && currentUser.role === "admin" )
      {
          navigateToMyBlogs("/admin-dashboard/manage-all-blogs");
      }
    },
    autoClose: 3000,
  });
};  
  const handleSubmit = async (e) => {

    e.preventDefault();

    await createBlog({
      ...formData,
      authorId: currentUser.authorId
    });

    notify();
  };

  return (

    <div className="p-4">

      <ToastContainer />
      <h3 className="mb-4">Create Blog</h3>

      <BlogForm
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        isEdit={false}
        role={ currentUser ? currentUser.role === "author" || currentUser.role === "admin" ? currentUser.role : 'none' : 'none' }
      />

    </div>

  );

};

export default CreateBlog;
