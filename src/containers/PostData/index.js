import { postApi } from "../../services/api/globalApi";
import { useState } from "react";

import UserManage from "../../components/User/Form";
import ProductManage from "../../components/Product/Form";
import { toast } from "react-toastify";
import ChangePassword from "../../components/Profile/ChangePassword";
import UserChangePassword from "../../components/UserPanel/UserChangePassword";
import FisManage from "../../components/Fis/Form";
import Message from "../../components/Message/Form";
import PackageManage from "../../components/Package/Form";


const PostData = ({ baseName }) => {
  const [refreshCategory, setRefreshCategory] = useState(false);
  const postDataHandler = async ({ path, body }) => {
    console.log(body);
    try {
      const data = await postApi({ path, body });
      toast.success("اطلاعات شما با موفقیت ثبت شد", {
        position: "top-right",
        closeOnClick: true
      });
      baseName === "categories" && setRefreshCategory(true);
      return data
    } catch (error) {
      toast.error(error.response.data.error, {
        position: "top-right",
        closeOnClick: true
      });
    }
  };
  const allProps = {
    postDataHandler,
    baseName,
  };
  const component = {
    users: <UserManage {...allProps} />,
    products: <ProductManage {...allProps} />,
    packages: <PackageManage {...allProps} />,
    messages: <Message {...allProps} />,
    fises: <FisManage {...allProps} />,
    profile: <ChangePassword {...allProps} />,
    userProfile: <UserChangePassword {...allProps} />,
    

  };

  return <>{component[baseName]}</>;
};

export default PostData;
