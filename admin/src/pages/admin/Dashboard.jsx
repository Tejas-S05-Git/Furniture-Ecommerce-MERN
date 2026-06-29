import { motion } from "framer-motion";

import WelcomeCard from "../../components/dashboard/WelcomeCard";
import StatCard from "../../components/dashboard/StatCard";
import RevenueChart from "../../components/dashboard/RevenueChart";
import OrdersChart from "../../components/dashboard/OrdersChart";
import RecentOrdersTable from "../../components/dashboard/RecentOrdersTable";
import TopProductsTable from "../../components/dashboard/TopProductsTable";
import LowStockTable from "../../components/dashboard/LowStockTable";


import DashboardHeader from "../../components/dashboard/DashboardHeader";
import QuickActions from "../../components/dashboard/QuickActions";
import TodaysSummary from "../../components/dashboard/TodaysSummary";
import { useEffect, useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";
import { DollarSign, ShoppingCart, Users, Package, ShoppingBag } from "lucide-react";





const Dashboard = () => {

  const [dashboard, setDashboard] = useState(null);

  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {

    try {

      const res =
        await api.get("/dashboard");

      setDashboard(res.data);



    } catch (error) {

      console.log(error);

      toast.error("Unable to load dashboard");

    } finally {

      setLoading(false);

    }

  };
  useEffect(() => {

    fetchDashboard();

  }, []);
  if (loading) {

    return (
      <div className="p-10">
        Loading...
      </div>
    );

  }
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

        <StatCard
          title="Revenue"
          value={dashboard.stats.totalRevenue}
          icon={DollarSign}
        />

        <StatCard
          title="Orders"
          value={dashboard.stats.totalOrders}
          icon={ShoppingBag}
        />

        <StatCard
          title="Customers"
          value={dashboard.stats.totalCustomers}
          icon={Users}
        />

        <StatCard
          title="Products"
          value={dashboard.stats.totalProducts}
          icon={Package}
        />

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
          <RevenueChart
            data={dashboard.revenueChart}
          />
        </div>

        <OrdersChart
          data={dashboard.ordersChart}
        />
      </div>

      <div
        className="
        grid
        grid-cols-1
        2xl:grid-cols-2
        gap-6
      "
      >
        <RecentOrdersTable
          orders={dashboard.recentOrders}
        />

        <TopProductsTable
          products={dashboard.topProducts}
        />
      </div>

      <LowStockTable
        products={dashboard.lowStockProducts}
      />
      <QuickActions />

      <TodaysSummary
        summary={dashboard.todaySummary}
      />

    </motion.div>
  );
};

export default Dashboard;