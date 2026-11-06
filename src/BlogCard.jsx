
import { Link } from 'react-router';

function BlogCard({blogPost,index}) {
  return (
        <div key={index} className="col-md-6 col-lg-4 mt-4 d-flex">

            <Link to={`/blogs-view/${blogPost.id}`} className="text-decoration-none text-dark w-100">

                <div className="card shadow h-100 d-flex flex-column">

                    <img src={blogPost.image} className="card-img-top" alt="A Blog Post Image." />

                    <div className="card-body d-flex flex-column">
                        <h6 className="card-title">
                            {blogPost.title}
                        </h6>
                        <p className="card-text">{blogPost.summary}</p>
                    </div>

                </div>

            </Link>

        </div>
  )
}

export default BlogCard;