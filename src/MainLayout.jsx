
import './HomeLanding.css';

import Navbar from './Navbar';
import FooterComponent from './FooterComponent';

import RoutingHomeComponent from './RoutingHomeComponent';
import LayoutRouting from './LayoutRouting';
import AuthorRouting from './AuthorRouting';
import AdminRouting from './AdminRouting';

function MainLayout() {

    return (
        <div>

            <div className="hero">

                <Navbar />

                <div className="mainContentPlaceholder">
                    <RoutingHomeComponent />
                    <LayoutRouting />
                    <AuthorRouting />
                    <AdminRouting />
                </div>

                <FooterComponent />

            </div>

        </div>
    )
}

export default MainLayout;