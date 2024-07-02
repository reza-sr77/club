import { useEffect, useState } from "react";

import { getApi } from "../../services/api/globalApi";

import ShowFis from "../../components/Fis/ShowFis";
import ShowMessage from "../../components/Message/ShowMessage";
import ShowProduct from "../../components/Product/ShowProduct";
import ShowUser from "../../components/User/ShowUser";
import ProductsReportage from "../../components/Reportages/ProductsReportage";
import UserReportage from "../../components/Reportages/UserReportage";
import FisReportage from "../../components/Reportages/FisReportages";
import Profile from "../../components/Profile/Profile";
import UserProfile from "../../components/UserPanel/UserProfile";
import UserShowFis from "../../components/UserPanel/UserShowFis";
import UserPackage from "../../components/UserPanel/UserPackage";
import UserShowMessage from "../../components/UserPanel/UserShowMessage";
import ShowPackage from "../../components/Package/ShowPackage";

const ShowData = ({ baseName, apiName }) => {

  const [newData, setNewData] = useState(null);
  const [filter, setFilter] = useState();
  const fetchData = async (params) => {
    try {
      const { data } = await getApi({ path: apiName, params: { ...params, limit: 12 } });

      console.log("showalldata", data.data);
      setNewData(data.data);

    } catch (error) {
      console.log("erorr", error);
    }
  };

  const againGetData = () => {
    fetchData()
  }

  const filterDataHandler = (newParams) => {
    setFilter({ ...filter, ...newParams });
    const allFilter = {
      ...filter,
      ...newParams,
    };
    console.log("filter", allFilter);
    fetchData(allFilter);
  };

  useEffect(() => {
    fetchData()
  }, [apiName]);

  // useEffect(() => {
  //   if (baseName) {
  //     setNewData(null)
  //   }
  // }, [baseName]);

  console.log(newData);
  const allProps = {
    newData,
    filterDataHandler,
    againGetData
  };

  const component = {
    users: <ShowUser {...allProps} />,
    products: <ShowProduct {...allProps} />,
    packages: <ShowPackage {...allProps} />,
    messages: <ShowMessage {...allProps} />,
    fises: <ShowFis {...allProps} />,
    productReportages: <ProductsReportage {...allProps} />,
    userReportages: <UserReportage {...allProps} />,
    fisReportages: <FisReportage {...allProps} />,
    profile: <Profile {...allProps} />,
    userProfile: <UserProfile {...allProps} />,
    userFises: <UserShowFis {...allProps} />,
    userPackages: <UserPackage {...allProps} />,
    userMessages: <UserShowMessage {...allProps} />,


  };
  return <>{component[baseName]}</>;
};

export default ShowData;
