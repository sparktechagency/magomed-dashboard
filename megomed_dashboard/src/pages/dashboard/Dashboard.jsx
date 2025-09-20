import { lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";

const Revenue = lazy(() => import("../../components/dashboard/Revenue"));

import { Skeleton } from "antd";
import AdminStatistics from "../../components/dashboard/AdminStatistics";

import ActiveProduct from "../../components/dashboard/ActiveProduct";
import DeliveryAcceptedChart from "../../components/dashboard/DeliveryAcceptedChart";
import FreelancersWorldMap from "../../components/dashboard/FreelancersWorldMap";
import WorldMap from "../WorldMap/WorldMap";
import WeeklyEarnings from "../../components/dashboard/WicklyEarning";
import { useGetDashboardDataQuery } from "../../features/dashboard/dashboardApi";

const Dashboard = () => {
  const navigate = useNavigate();

  const {
    data: dashboardData,
    isLoading,
    isError,
    error,
  } = useGetDashboardDataQuery();

  console.log("dashboardData", dashboardData);

  // Extract data with proper null checks
  const weeklyEarnings = dashboardData?.data?.last7DaysEarning || 0;
  const weeklyDeliveryAccepted =
    dashboardData?.data?.last7DaysTotalDeliveryAcceptProject || [];
  const totalActiveProject =
    dashboardData?.data?.totalActiveProjects?.length || 0;
  const totalFreelancer = dashboardData?.data?.totalFreelancer || 0;
  const totalClient = dashboardData?.data?.totalClient || 0;
  const totalProjectAccepted = dashboardData?.data?.totalAcceptProject || 0;
  const totalProjectDelivered = dashboardData?.data?.totalDeliveryProject || 0;
  const totalRevenue = dashboardData?.data?.totalRevenue || 0;
  const totalUsers = dashboardData?.data?.totalUsers || 0;

  const analysisCards = [
    {
      value: totalUsers,
      title: "Total Users",
      icon: "/icons/users.svg",
    },
    {
      value: `$${totalRevenue.toFixed(2)}`,
      title: "Total Revenue",
      icon: "/icons/order.svg",
      percentage: "Last Update",
    },
    {
      value: totalProjectAccepted,
      title: "Total Accepted Projects",
      icon: "/icons/sell.svg",
    },
    {
      value: totalProjectDelivered,
      title: "Total Delivered Projects",
      icon: "/icons/spot.svg",
    },
  ];

  return (
    <div className="flex flex-col gap-10">
      {/* Revenue and CustomerMap */}
      <div className="flex items-center justify-between gap-10">
        <div className="w-full">
          <Suspense fallback={<Skeleton active />}>
            <WeeklyEarnings weeklyEarnings={weeklyEarnings} />
          </Suspense>
        </div>
        <div className="w-full">
          <Suspense fallback={<Skeleton active />}>
            <DeliveryAcceptedChart
              weeklyDeliveryAccepted={weeklyDeliveryAccepted}
            />
          </Suspense>
        </div>

        <div className="w-full">
          <AdminStatistics
            totalUsers={totalUsers}
            totalEarning={totalRevenue}
            totalFreelancer={totalFreelancer}
            totalClient={totalClient}
            totalProjectAccepted={totalProjectAccepted}
            totalProjectDelivered={totalProjectDelivered}
          />
        </div>
      </div>

      <div className="flex items-center justify-between gap-10">
        <div className="w-8/12 ">
          <Suspense fallback={<Skeleton active />}>
            <Revenue />
          </Suspense>
        </div>

        <div className="w-4/12">
          <ActiveProduct />
        </div>
      </div>

      <div className="flex gap-5">
        <FreelancersWorldMap title={"Freelancers Region"} />
        <WorldMap title={"Clients Region"} />
      </div>
    </div>
  );
};

export default Dashboard;
