import React, { lazy } from "react";

export const mainRouterList = [
  {
    path: "/app",
    component: lazy(() => import("../pages/Test"))
  }
];
