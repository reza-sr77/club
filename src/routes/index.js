import PostData from "../containers/PostData";
import ShowData from "../containers/ShowData";
import EditData from "../containers/EditData";

export const routes = [
  {
    pathName: "/package-list",
    baseName: "packages",
    apiName: "packages",
    component: ShowData,
  }, {
    pathName: "/package-add",
    baseName: "packages",
    component: PostData
  }, {
    pathName: "/package-edit",
    baseName: "packages",
    component: EditData
  },
  {
    pathName: "/user-list",
    baseName: "users",
    apiName: "users",
    component: ShowData,
  },
  {
    pathName: "/user-chnage-password",
    baseName: "usersRegisterByAdmin",
    component: EditData,
  },
  {
    pathName: "/user-add",
    baseName: "users",
    component: PostData,
  }, {
    pathName: "/user-edit",
    baseName: "users",
    component: EditData,
  },
  {
    pathName: "/reportages-user",
    baseName: "userReportages",
    apiName: "reportages/users",
    component: ShowData,
  },
  {
    pathName: "/message",
    baseName: "messages",
    component: PostData,
  },
   {
    pathName: "/message-list",
    baseName: "messages",
    apiName: "messages",
    component: ShowData
  },
  {
    pathName: "/product-add",
    baseName: "products",
    component: PostData
  }, {
    pathName: "/product-list",
    baseName: "products",
    apiName: "products",
    component: ShowData
  },{
    pathName: "/reportages-product",
    baseName: "productReportages",
    apiName: "reportages/products",
    component: ShowData
  },  {
    pathName: "/fis-add",
    baseName: "fises",
    component: PostData
  }, {
    pathName: "/fis-edit",
    baseName: "fises",
    component: EditData
  }, {
    pathName: "/fis-list",
    baseName: "fises",
    apiName: "fises",
    component: ShowData
  }, {
    pathName: "/reportages-fis",
    baseName: "fisReportages",
    apiName: "reportages/fises",
    component: ShowData
  },{
    pathName: "/profile",
    baseName: "profile",
    apiName: "users/me",
    component: ShowData
  },
  {
    pathName: "/change-password",
    baseName: "profile",
    component: PostData
  },
];
