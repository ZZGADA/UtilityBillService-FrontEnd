import { Navigate, useRoutes } from "react-router-dom";
import lazyLoad from "@/routers/utils/lazyLoad";
import React from "react";
// import { kebabCase } from 'lodash'

// * 导入所有router
// const metaRouters: any = import.meta.glob("./modules/*.tsx", { eager: true });

// * 处理路由
// export const routerArray: RouteObject[] = []
// Object.keys(metaRouters).forEach(item => {
// 	Object.keys(metaRouters[item]).forEach((key: any) => {
// 		console.log('路由渲染 key', key)
// 		routerArray.push(...metaRouters[item][key])
// 	})
// })

export const rootRouter: any[] = [
  {
    path: "/login",
    element: lazyLoad(React.lazy(() => import("@/view/LogIn/index"))),
    meta: {
      requiresAuth: false,
      title: "登录页",
      key: "Login"
    },
  },
  {
    path: "/signUp",
    element: lazyLoad(React.lazy(() => import("@/view/SignUp/index"))),
    meta: {
      requiesAuth: false,
      title: "注册页",
      key: "SignUp",
    },
  },
  // ...routerArray,
  // {
  // 	path: '*',
  // 	element: <Navigate to="/404" />
  // }
];

const Router = () => {
  const routes = useRoutes(rootRouter);
  return routes;
};

export  default Router;
