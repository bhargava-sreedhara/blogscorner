import { useNavigate } from "react-router";

const BlogForm = ({ formData, setFormData, onSubmit,isEdit,role }) => {

  const navigateToMyBlogs = useNavigate();

  const cancelBlogForm = () =>
  {
      if( role === "author")
      {
          navigateToMyBlogs("/author-dashboard/manage-my-blogs");
      }
      else if( role === "admin")
      {
          navigateToMyBlogs("/admin-dashboard/manage-all-blogs");
      }
  }

  return (

    <form onSubmit={onSubmit}>

      <input
        className="form-control mb-3"
        placeholder="Title"
        value={formData.title || ''}
        onChange={(e) =>
          setFormData({ ...formData, title: e.target.value })
        }
      />

      <textarea
        className="form-control mb-3"
        placeholder="Summary"
        value={formData.summary || ''}
        onChange={(e) =>
          setFormData({ ...formData, summary: e.target.value })
        }
      />

      <input
          className="form-control mb-3"
          placeholder="Blog Image URL"
          value={formData.image || ''}
          onChange={(e)=>setFormData({...formData,image:e.target.value})}
      />

      <textarea
        className="form-control mb-3"
        placeholder="Content"
        rows="6"
        value={formData.content || ''}
        onChange={(e) =>
          setFormData({ ...formData, content: e.target.value })
        }
      />

      <button className={`btn ${ isEdit ? 'btn-warning':'btn-primary'} me-2`}>
        { isEdit ? 'Update' : 'Save'} Blog
      </button>

      <button type="button" onClick={()=>cancelBlogForm()} className="btn btn-secondary">Cancel</button>

    </form>

  );

};

export default BlogForm;