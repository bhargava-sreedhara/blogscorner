
import { useEffect, useState } from "react";

import { useSearchParams } from "react-router";

import { getBlogs,getAuthors } from "./services/blogService";

import BlogCard from "./BlogCard";

import './BlogsView.css';
import { useAuth } from "./context/AuthContext";

const BlogsView = () => {

  const [blogPosts,setBlogPosts] = useState([]);
  const [authors, setAuthors] = useState([]);

  const [ isAuthor,setIsAuthor ] = useState(false);
  const [ isAdmin,setIsAdmin  ] = useState(false);

  const { currentUser } = useAuth();

  const [searchParams, setSearchParams] = useSearchParams();

  const pageFromUrl = Number(searchParams.get("page")) || 1;
  const categoryFromUrl = searchParams.get("category") || "";
  const authorFromUrl = searchParams.get("authorId") || "";

  const [currentPage, setCurrentPage] = useState(pageFromUrl);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    category: categoryFromUrl,
    authorId: authorFromUrl
  });

  const LIMIT = 2;

  useEffect(() =>
  {
    getAuthors().then(res => setAuthors(res.data));
  }, []);

useEffect(() => {
  const fetchBlogs = async () => {
    try {
      const activeFilters = {};

      if (filters.category)
        activeFilters.category = filters.category;

      if (filters.authorId)
        activeFilters.authorId = filters.authorId;

      let getBlogsParams = {
        _page: currentPage,
        _limit: LIMIT,
        _expand: "author",
        ...activeFilters
      };
      if( currentUser && currentUser.role === "author" )
      {
          getBlogsParams = { ...getBlogsParams,"authorId": currentUser.authorId }
          setIsAuthor(true);
      }
      else if( localStorage.getItem("user") )
      {
          const savedUser = JSON.parse(localStorage.getItem("user"));
          if( savedUser && savedUser.role === "author" )
          {
            getBlogsParams = { ...getBlogsParams,"authorId": savedUser.authorId }
            setIsAuthor(true);
          }
      }
      
      if( currentUser && currentUser.role === "admin" )
      {
          setIsAdmin(true);
      }
      else if( localStorage.getItem("user") )
      {
          const savedUser = JSON.parse(localStorage.getItem("user"));
          if( savedUser && savedUser.role === "admin" )
          {
              setIsAdmin(true);
          }
      }

      const response = await getBlogs(getBlogsParams);

      setBlogPosts(response.data);

      const totalCount = response.headers["x-total-count"];

      setTotalPages(
        Math.ceil(totalCount / LIMIT)
      );

    } catch (err) {
      console.error(err);
    }
  };

  fetchBlogs();
}, [currentPage, filters]);  

useEffect(() => {
  const params = {};

  if (currentPage > 1)
    params.page = currentPage;

  if (filters.category)
    params.category = filters.category;

  if (filters.authorId)
    params.authorId = filters.authorId;

  setSearchParams(params);

}, [currentPage, filters]);

  return (

          <div className="blogsScrollArea">

              <div className="container">

                <div className={`row mt-4 ${! isAuthor ? 'd-none':''}`}>
                  <div className="col-4">
                    <span className="text-bg-info rounded fw-bold p-2">View My Blogs</span>
                  </div>
                </div>
                <div className={`row mt-4 ${! isAdmin ? 'd-none':''}`}>
                  <div className="col-4">
                    <span className="text-bg-info rounded fw-bold p-2">View All Blogs</span>
                  </div>
                </div>
                  
                <div className="row flex-row justify-content-center mt-4 mb-3">

                    <div className="col-md-4">
                      <select
                        className="form-select"
                        value={filters.category}
                        onChange={(e) =>{
                              setFilters(prev => ({
                              ...prev,
                              category: e.target.value
                            }));
                            setCurrentPage(1);}
                        }
                    >
                        <option value="">All Categories</option>
                        <option value="React">React</option>
                        <option value="CSS">CSS</option>
                        <option value="Architecture">Architecture</option>
                    </select>
                    </div>

                    <div className={`col-md-4 ${isAuthor ? 'd-none':''}`}>
                      <select
                          className="form-select"
                          value={filters.authorId}
                          onChange={(e) => {
                            setFilters(prev => ({
                            ...prev,
                            authorId: e.target.value
                            }));
                            setCurrentPage(1);
                            }
                          }
                      >
                        <option value="">All Authors</option>

                        {authors.map(author => (
                          <option key={author.id} value={author.id}>
                            {author.name}
                          </option>
                        ))
                        }

                      </select>
                    </div>

                </div>

                <div className="row">

                  {
                    blogPosts.map(
                      (blogPost,index)=>(
                        <BlogCard key={index} index={index} blogPost={blogPost}/>
                    ))
                  }

                </div>

                <nav className="mt-5">
                  <ul className="pagination justify-content-center">

                    <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                      <button
                        className="page-link"
                        onClick={() => setCurrentPage(prev => prev - 1)}
                      >
                        Previous
                      </button>
                    </li>

                    {[...Array(totalPages)].map((_, index) => (
                      <li
                        key={index}
                        className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
                      >
                        <button
                          className="page-link"
                          onClick={() => setCurrentPage(index + 1)}
                        >
                          {index + 1}
                        </button>
                      </li>
                    ))}

                    <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                      <button
                        className="page-link"
                        onClick={() => setCurrentPage(prev => prev + 1)}
                      >
                        Next
                      </button>
                    </li>

                  </ul>
                </nav>

              </div>

          </div>
  )
}

export default BlogsView;