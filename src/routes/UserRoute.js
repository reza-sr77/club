import PostData from "../containers/PostData";
import ShowData from "../containers/ShowData";

export const userRoutes = [
  {
    pathName: "/message-list",
    baseName: "userMessages",
    apiName: "messages",
    component: ShowData
  }, {
    pathName: "/fis-list",
    baseName: "userFises",
    apiName: "fises",
    component: ShowData
  }, {
    pathName: "/profile",
    baseName: "userProfile",
    apiName: "users/me",
    component: ShowData
  },
  {
    pathName: "/change-password",
    baseName: "userProfile",
    component: PostData
  }, {
    pathName: "/package-list",
    baseName: "userPackages",
    apiName: "packages",
    component: ShowData
  }
];
