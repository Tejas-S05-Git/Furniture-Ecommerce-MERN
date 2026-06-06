import { motion } from "framer-motion";

import WelcomeCard from "../../components/dashboard/WelcomeCard";
import StatCard from "../../components/dashboard/StatCard";
import RevenueChart from "../../components/dashboard/RevenueChart";
import OrdersChart from "../../components/dashboard/OrdersChart";
import RecentOrdersTable from "../../components/dashboard/RecentOrdersTable";
import TopProductsTable from "../../components/dashboard/TopProductsTable";
import LowStockTable from "../../components/dashboard/LowStockTable";

import {
  statsData,
} from "../../data/dashboardData";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import QuickActions from "../../components/dashboard/QuickActions";
import TodaysSummary from "../../components/dashboard/TodaysSummary";
import RecentActivity from "../../components/dashboard/RecentActivity";

const Dashboard = () => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="space-y-8"
    >
      <DashboardHeader />
      <WelcomeCard />

      <div
        className="
        grid
        grid-cols-1
        sm:grid-cols-2
        xl:grid-cols-4
        gap-6
      "
      >
        {statsData.map((item) => (
          <StatCard
            key={item.title}
            {...item}
          />
        ))}
      </div>

      <div
        className="
        grid
        grid-cols-1
        xl:grid-cols-3
        gap-6
      "
      >
        <div className="xl:col-span-2">
          <RevenueChart />
        </div>

        <OrdersChart />
      </div>

      <div
        className="
        grid
        grid-cols-1
        2xl:grid-cols-2
        gap-6
      "
      >
        <RecentOrdersTable />
        <TopProductsTable />
      </div>

      <LowStockTable />
      <QuickActions />

      <TodaysSummary />

      <RecentActivity />
    </motion.div>
  );
};

export default Dashboard;