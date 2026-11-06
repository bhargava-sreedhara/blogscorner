
import { useEffect, useState } from 'react';
import axios from 'axios';

import './AdminLanding.css';

const AdminLanding = () => {

  const [blogCount,setBlogCount] = useState(0);
  const [authorCount,setAuthorCount] = useState(0);
  const [commentCount,setCommentCount] = useState(0);

  const API = "http://localhost:5001";

  const loadStats = async () =>
  {
    const blogs = await axios.get(`${API}/blogs`);
    const authors = await axios.get(`${API}/authors`);
    const comments = await axios.get(`${API}/comments`);

    setBlogCount(blogs.data.length);
    setAuthorCount(authors.data.length);
    setCommentCount(comments.data.length);
  };

  useEffect(()=>
  {
      loadStats();
  },[]);

  return (
    <div className="adminHome container pt-5">
        <div className="row">

          <div className="col-12 col-md-6 col-lg-4 mb-4">

            <div className="card h-100 shadow text-center statsCard">
                <div className="card-header statsCardHeader">
                    Total Blogs
                </div>
                <div className="card-body statsCardBody">
                  <h3>{ blogCount }</h3>
                </div>
            </div>

          </div>

          <div className="col-12 col-md-6 col-lg-4 mb-4">

            <div className="card h-100 shadow text-center statsCard">
                <div className="card-header statsCardHeader">
                    Total Authors
                </div>
                <div className="card-body statsCardBody">
                  <h3>{ authorCount }</h3>
                </div>
            </div>

          </div>

          <div className="col-12 col-md-6 col-lg-4 mb-4">

            <div className="card h-100 shadow text-center statsCard">
                <div className="card-header statsCardHeader">
                    Total Comments
                </div>
                <div className="card-body statsCardBody">
                  <h3>{ commentCount }</h3>
                </div>
            </div>

          </div>

        </div>
    </div>
  )
}

export default AdminLanding;