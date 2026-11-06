
import axios from "axios";

const API = "http://localhost:5001";

export const getBlogs = (params = {}) => {
    return axios.get(`${API}/blogs`,
    {
        params
    });
};

export const getAuthors = () => {
    return axios.get(`${API}/authors`);
};
export const getAuthorById = (id) =>{
    return axios.get(`${API}/authors/${id}`);
}
export const deleteAuthor = (id) => {
  return axios.delete(`${API}/authors/${id}`);
};
export const updateAuthor = (id, author) => {
  return axios.put(`${API}/authors/${id}`, author);
};

export const getBlogById = (id) => {
    return axios.get(`${API}/blogs/${id}?_expand=author`)
}

export const getRelatedBlogs = (category,excludedId) =>{
    return axios.get(`${API}/blogs`,
            {
                params: {
                    category: category
                }
            })
           .then(res=>res.data.filter(blog=>Number(blog.id) !== Number(excludedId)));

}

export const loginUser = (email, password) => {
  return axios.get(`${API}/users`, {
    params: { email, password }
  });
};

export const checkUserExists = (email) => {
  return axios.get(`${API}/users`, {
    params: { email }
  });
};

export const getComments = (blogId) =>{
    return axios.get(`${API}/comments`,{
        params: {
            blogId,
            _expand: "user"
        }
    })
}

export const addComment = (comment) => {
  return axios.post(`${API}/comments`, comment);
};

export const saveUser = ( authorUserInfo ) => {
  return axios.post( `${API}/users`,authorUserInfo );
}

export const saveAuthor = ( authorInfo ) => {
  return axios.post( `${API}/authors`,authorInfo );
}

export const getAuthorByUserId = ( authorUserId ) => {
  return axios.get(`${API}/authors`,
    {
      params: { userId:authorUserId }
    }
  )
}
export const getBlogsByAuthor = ( authorId ) => {
  return axios.get(`${API}/blogs`,
    {
      params: { authorId }
    }
  );
}

export const createBlog = (blog) => {
  return axios.post(`${API}/blogs`,blog)
}

export const updateBlog = (id,blog) => {
  return axios.put(`${API}/blogs/${id}`,blog);
}

export const deleteBlog = (id) => {
  return axios.delete(`${API}/blogs/${id}`);
}
