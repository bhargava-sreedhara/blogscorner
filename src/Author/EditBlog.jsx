
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import { toast, ToastContainer } from "react-toastify";

import BlogForm from "../BlogForm";

import { getBlogById, updateBlog } from "../services/blogService";

const EditBlog = ({role}) => {

  const { id } = useParams();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({});

  useEffect(() => {

    const loadBlog = async () => {

      const res = await getBlogById(id);

      setFormData(res.data);

    };

    loadBlog();

  }, [id]);

const notify = () => {
  toast("Blog Updated !", {
    onClose: () => {
      if( role === "author" )
      {
          navigate("/author-dashboard/manage-my-blogs");
      }
      else if( role === "admin" )
      {
          navigate("/admin-dashboard/manage-all-blogs");
      }
    },
    autoClose: 3000,
  });
};

  const handleSubmit = async (e) => {

    e.preventDefault();

    await updateBlog(id, formData);

    notify();
  };

  return (

    <div className="p-4">
      
      <ToastContainer />
      <h3 className="mb-4">Edit Blog</h3>

      <BlogForm
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        isEdit={true}
        role={role}
      />

    </div>

  );

};

export default EditBlog;
