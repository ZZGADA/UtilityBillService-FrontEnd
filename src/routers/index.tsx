import React, { lazy } from "react";
import lazyLoad from "./utils/lazyLoad";

export const rootRouter: any[] = [
  {
    path: "/login",
    element: lazyLoad(React.lazy(() => import("src/view/LogIn/index"))),
    meta: {
      requiresAuth: false,
      title: "登录页",
      key: "login",
    },
  },
];
