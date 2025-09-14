import { lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";


const Revenue = lazy(() => import("../../components/dashboard/Revenue"));


import { Skeleton } from "antd";
import AdminStatistics from "../../components/dashboard/AdminStatistics";

import ActiveProduct from '../../components/dashboard/ActiveProduct';
import DeliveryAcceptedChart from '../../components/dashboard/DeliveryAcceptedChart';
import FreelancersWorldMap from '../../components/dashboard/FreelancersWorldMap';
import WeeklyEarnings from '../../components/dashboard/WicklyEarning';

const Dashboard = () => {
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (status === "rejected" && isError && queryError) {
  //     localStorage.removeItem("adminToken");
  //     navigate("/auth/login");
  //   }
  // }, [status, isError, queryError, navigate]);

  const analysisCards = [
    {
      // value: queryLoading ? <Spin size="small" /> : allShop?.data?.totalFoodSell,
      value: 32,
      title: "Total Food Sell",
      icon: "/icons/sell.svg",
      percentage: "4% (30 days)",
      // orderData: OrderData,
    },
    {
      // value: queryLoading ? <Spin size="small" /> : `$${allShop?.data?.totalRevenue?.toFixed(2)}`,
      value: "$632",
      title: "Total Revenue",
      icon: "/icons/order.svg",
      percentage: "12% (30 days)",
      // orderData: down,
    },
    {
      // value: queryLoading ? <Spin size="small" /> : allShop?.data?.totalUser || 0,
      value: 32,
      title: "Total User",
      icon: "/icons/users.svg",
    },
    {
      // value: queryLoading ? <Spin size="small" /> : allShop?.data?.totalShop || 0,
      value: 34,
      title: "Total Shop",
      icon: "/icons/spot.svg",
    },
  ];




  return (
    <div className="flex flex-col gap-10">

      {/* Revenue and CustomerMap */}
      <div className="flex items-center justify-between gap-10">
        <div className="w-full">
          <Suspense fallback={<Skeleton active />}>
            <WeeklyEarnings />
          </Suspense>
        </div>
        <div className="w-full">
          <Suspense fallback={<Skeleton active />}>
            <DeliveryAcceptedChart />
          </Suspense>
        </div>

        <div className="w-full">
          <AdminStatistics />
        </div>
      </div>

      <div className='flex items-center justify-between gap-10'>
        <div className="w-8/12 ">
          <Suspense fallback={<Skeleton active />}>
            <Revenue />
          </Suspense>
        </div>

        <div className='w-4/12'>
          <ActiveProduct />
        </div>
      </div>

      <div className='flex gap-5'>
        <FreelancersWorldMap title={"Freelancers Region"} />
        <FreelancersWorldMap title={"Clients Region"} />
      </div>

    </div>
  );
};

export default Dashboard;
