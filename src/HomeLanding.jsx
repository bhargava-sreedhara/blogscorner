
import { Link } from 'react-router';

const HomeLanding = () => {
    return (

      <div className="welcomeBanner">
          <Link to="blogs-view" className="btn btn-primary">View All Blog Posts</Link>
      </div>

    )
}

export default HomeLanding;