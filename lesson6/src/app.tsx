import React, { Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import { mainRouterList } from "@/router";

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
         <Suspense fallback={<div>Loading...</div>}>{renderRoutes(mainRouterList)}</Suspense>
      </div>
    </Router>
  );
};

export default App;
