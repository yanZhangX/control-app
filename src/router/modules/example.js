/** When your routing table is too long, you can split it into small modules **/

import Layout from "@/layout";

const userRouter = {
  path: "/example",
  component: Layout,
  redirect: "/example/index",
  name: "Table",
  children: [
    {
      path: "index",
      component: () => import("@/views/example/index"),
      name: "enjoyUser",
      meta: { title: "用户管理", icon: "user" }
    }
  ]
};
export default userRouter;
