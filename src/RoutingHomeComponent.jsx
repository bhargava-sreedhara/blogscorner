
import { Route, Routes } from "react-router";

import HomeLanding from "./HomeLanding";

const RoutingHomeComponent = () => {
return (
    <div>

      <Routes>
          <Route path="/" element={ <HomeLanding /> } />
      </Routes>

    </div>
)
}

export default RoutingHomeComponent;
