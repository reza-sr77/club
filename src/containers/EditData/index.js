import { useState } from "react";
import { toast } from "react-toastify";
import UserManage from "../../components/User/Form";
import { getApi, putApi } from "../../services/api/globalApi";
import ChangePsswordByAdmin from "../../components/User/ChangePsswordByAdmin";
import FisManage from "../../components/Fis/Form";
import PackageManage from "../../components/Package/Form";

const EditData = ({ baseName }) => {
  const [newData, setNewData] = useState({});
  const getDataWithIdHandler = async ({ path }) => {
    console.log(path);
    try {
      const { data } = await getApi({ path });
      console.log(data);
      setNewData(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const editdataHandler = async ({ path, body, redirectPath }) => {
    try {
      const data = await putApi({ path, body });
      toast.success("تغییرات با موفقیت اعمال شد", {
        position: "top-right",
        closeOnClick: true
      });
      return data
    } catch (error) {
      toast.error(error.response.data.error, {
        position: "top-right",
        closeOnClick: true
      });
    }
  };

  const allProps = {
    editdataHandler,
    getDataWithIdHandler,
    newData,
    baseName,
  };
  const component = {
    users: <UserManage {...allProps} />,
    packages: <PackageManage {...allProps} />,
    fises: <FisManage {...allProps} />,
    usersRegisterByAdmin: <ChangePsswordByAdmin {...allProps} />,

  };
  return <>{component[baseName]}</>;
};

export default EditData;
