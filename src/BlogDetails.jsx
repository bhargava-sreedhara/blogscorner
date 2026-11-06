
import { useEffect, useState } from "react";
import { getBlogById,getRelatedBlogs,getComments,addComment } from "./services/blogService";
import { useNavigate, useParams } from "react-router";

import { Link } from 'react-router';
import BlogCard from "./BlogCard";

import './BlogDetails.css';
import { BlogMeta } from "./BloMeta";
import { useAuth } from "./context/AuthContext";

function BlogDetails() {

    const { id } = useParams();

    const [ blogPost,setBlogPost ] = useState(null);

    const [ loading,setLoading ] = useState(true);
    const [error, setError] = useState(null);

    const [ relatedBlogs,setRelatedBlogs ] = useState([]);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    const { currentUser } = useAuth();

    const navigate = useNavigate();

    async function loadBlog()
    {
        try
        {
            const blogRes = await getBlogById(id);
            setBlogPost(blogRes.data);

            const related = await getRelatedBlogs(blogRes.data.category,id);
            setRelatedBlogs(related.slice(0,3));
        }
        catch (err)
        {
            setError("Failed to load blog.");
        }
        finally
        {
            setLoading(false);
        }
    }
    
    const loadComments = async () =>
    {
        const commentsRes = await getComments(id);
        setComments(commentsRes.data);
    };

    const handleAddComment = async () =>
    {
        if( ! newComment.trim() ) return;

        const comment = {
            blogId: Number(id),
            userId: currentUser.id,
            content: newComment,
            createdAt: new Date().toISOString()
        };

        await addComment(comment);

        setNewComment("");

        loadComments();

    };

    useEffect(() =>
    {
        loadBlog();
        loadComments();
    }, [id]);

    if (error)
        return (
            <div className="container mt-3 mb-2 text-danger">
                {error}
            </div>
        );

    if (loading)
    return (
        <div className="container mt-3 mb-2">

        <div className="placeholder-glow">
            <span className="placeholder col-6 mb-3"></span>
            <span className="placeholder col-4 mb-4"></span>
        </div>

        <div className="placeholder-glow">
            <span
            className="placeholder w-100"
            style={{ height: "300px" }}
            ></span>
        </div>

        <div className="placeholder-glow mt-3">
            <span className="placeholder col-12"></span>
            <span className="placeholder col-10"></span>
            <span className="placeholder col-8"></span>
        </div>

        </div>
    );

    if (!blogPost) return <p className="p-4">Blog not found.</p>;    

  return (
    <div>
        <nav className="ms-3 mt-1 mb-3">
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item">
                <Link to="/blogs-view">Blogs</Link>
                </li>
                <li className="breadcrumb-item active">
                {blogPost.title}
                </li>
            </ol>
        </nav>

        <button
            className="btn btn-outline-secondary ms-3 mt-2"
            onClick={() => navigate(-1)}
            >
            ← Back
        </button>

        <div className="container mt-2 mb-3 fade-in">

            <h2>{blogPost.title}</h2>

            <BlogMeta author={blogPost.author} createdAt={blogPost.createdAt} category={blogPost.category} />

            <img
                src={blogPost.image}
                alt={blogPost.title}
                className="img-fluid rounded my-3"
            />

            <p>{blogPost.content}</p>

            <div className="mt-5">

            <h4 className="mb-4">Comments</h4>

            {(comments.length === 0) && (
                <p className="text-muted fw-bold">No comments yet.</p>
            )}
            {comments.length > 0 && (
                <>
                <div className="row">
                    <div className="col-md-6 col-lg-2 ms-1"><p className="text-bg-primary ps-1">Number of Comments: { comments.length }.</p></div>
                </div>                
                </>
            )}

            {comments.map(comment => (

                <div key={comment.id} className="card mb-3 shadow-sm">

                <div className="card-body">

                    <div className="d-flex justify-content-between">

                    <strong>{comment.user?.name}</strong>

                    <small className="text-muted">
                        {new Date(comment.createdAt).toLocaleDateString()}
                    </small>

                    </div>

                    <p className="mt-2 mb-0">
                    {comment.content}
                    </p>

                </div>

                </div>

            ))}

            {currentUser && (

            <div className="card mt-4">

                <div className="card-body">

                <h5>Add Comment</h5>

                <textarea
                    className="form-control mb-3"
                    rows="3"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                />

                <button
                    className="btn btn-primary"
                    onClick={handleAddComment}
                >
                    Post Comment
                </button>

                </div>

            </div>

            )}

            {!currentUser && (
            <p className="text-muted mt-3">
                Please <Link to="/login">login</Link> to post a comment.
            </p>
            )}

            </div>

            <hr className="my-4" />
            <h4>Related Blogs</h4>
            <div className="row">
            {
                relatedBlogs.map((relatedBlog,index)=>(
                    <BlogCard key={index} blogPost={relatedBlog} index={index} />
                ))
            }
            </div>

        </div>


    </div>
  )
}

export default BlogDetails;