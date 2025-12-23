import React from "react";
import { useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { FaPhone, FaBullseye, FaCalendarAlt, FaUser } from "react-icons/fa";
import DashboardCard from "../../components/DashboardCard";
import Badge from "../../components/Badge";
import GradientText from "../../components/GradientText";

export default function OverView() {
  const navigate = useNavigate();
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const stats = [
    {
      label: "Calls Today",
      value: "24",
      icon: <FaPhone />,
      trend: "+15%",
      trendUp: true,
      detail: "from yesterday",
    },
    {
      label: "This Week's Calls",
      value: "156",
      icon: <FaPhone />,
      trend: "+12%",
      trendUp: true,
      detail: "from last week",
    },
    {
      label: "Success Rate",
      value: "87%",
      icon: <FaBullseye />,
      trend: "+3%",
      trendUp: true,
      detail: "AI accuracy & resolution",
    },
    {
      label: "Escalation Rate",
      value: "12.5%",
      icon: <FaUser />,
      detail: "3 of 24 calls today",
    },
    {
      label: "Appointments Booked",
      value: "8",
      icon: <FaCalendarAlt />,
      detail: "2 via AI, 6 manual",
    },
  ];

  const recentCalls = [
    {
      time: "2:15 PM",
      caller: "John Doe",
      intent: "Schedule Appointment",
      status: "Completed",
    },
    {
      time: "1:45 PM",
      caller: "+1 (555) 012-3456",
      intent: "Check Hours",
      status: "Completed",
    },
    {
      time: "1:10 PM",
      caller: "Sarah Smith",
      intent: "Complaint",
      status: "Escalated",
    },
    {
      time: "12:30 PM",
      caller: "Mike Johnson",
      intent: "Menu Inquiry",
      status: "Completed",
    },
    {
      time: "11:50 AM",
      caller: "+1 (555) 987-6543",
      intent: "Reservation",
      status: "Completed",
    },
  ];

  const upcomingAppointments = [
    {
      time: "3:00 PM",
      name: "Alice Brown",
      type: "Phone",
      status: "Confirmed",
    },
    { time: "4:30 PM", name: "Bob Wilson", type: "Online", status: "Pending" },
    {
      time: "Tomorrow, 9:00 AM",
      name: "Charlie Davis",
      type: "Phone",
      status: "Confirmed",
    },
    {
      time: "Tomorrow, 11:00 AM",
      name: "Diana Evans",
      type: "Online",
      status: "Confirmed",
    },
    {
      time: "Tomorrow, 2:00 PM",
      name: "Evan Wright",
      type: "Phone",
      status: "Pending",
    },
  ];

  const rawChartData = [65, 72, 68, 75, 82, 85, 87];
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const data = days.map((day, index) => ({
    name: day,
    accuracy: rawChartData[index],
  }));

  return (
    <div
      className="p-8 font-manrope"
      style={{ backgroundColor: "#060606", minHeight: "100vh" }}
    >
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
          Welcome back, <GradientText>User</GradientText>
        </h1>
        <p className="text-gray-400">{currentDate}</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <DashboardCard key={index}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
                <h2 className="text-3xl font-bold text-white">{stat.value}</h2>
              </div>
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-[#A93E17]/20 to-[#15399A]/20 text-[#A93E17] text-xl">
                {stat.icon}
              </div>
            </div>
            <div className="text-sm">
              {stat.trend && (
                <span
                  className={`font-semibold mr-1 ${
                    stat.trendUp ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {stat.trendUp ? "↑" : "↓"} {stat.trend}
                </span>
              )}
              <span className="text-gray-400">{stat.detail}</span>
            </div>
          </DashboardCard>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Recent Calls */}
        <DashboardCard className="lg:col-span-1 xl:col-span-2">
          <h3 className="text-xl font-semibold text-white mb-4">
            Recent Calls
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-white/10">
                  <th className="pb-3 text-gray-400 font-medium text-sm">
                    Time
                  </th>
                  <th className="pb-3 text-gray-400 font-medium text-sm">
                    Caller
                  </th>
                  <th className="pb-3 text-gray-400 font-medium text-sm">
                    Intent
                  </th>
                  <th className="pb-3 text-gray-400 font-medium text-sm">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentCalls.map((call, i) => (
                  <tr
                    key={i}
                    className="border-b border-white/5 hover:bg-white/5 cursor-pointer transition"
                    onClick={() => navigate("/dashboard/history")}
                  >
                    <td className="py-3 text-gray-300 text-sm">{call.time}</td>
                    <td className="py-3 text-gray-300 text-sm">
                      {call.caller}
                    </td>
                    <td className="py-3 text-gray-300 text-sm">
                      {call.intent}
                    </td>
                    <td className="py-3">
                      <Badge
                        variant={
                          call.status === "Completed" ? "success" : "danger"
                        }
                      >
                        {call.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DashboardCard>

        {/* Upcoming Appointments */}
        <DashboardCard>
          <h3 className="text-xl font-semibold text-white mb-4">
            Upcoming Appointments
          </h3>
          <div className="space-y-4">
            {upcomingAppointments.map((apt, i) => (
              <div
                key={i}
                className="flex justify-between items-center pb-4 border-b border-white/10 last:border-0"
              >
                <div>
                  <p className="font-semibold text-white">{apt.name}</p>
                  <p className="text-sm text-gray-400 mt-1">
                    {apt.time} • {apt.type}
                  </p>
                </div>
                <Badge
                  variant={apt.status === "Confirmed" ? "success" : "warning"}
                >
                  {apt.status}
                </Badge>
              </div>
            ))}
          </div>
        </DashboardCard>

        {/* AI Performance Chart */}
        <DashboardCard className="lg:col-span-2 xl:col-span-3">
          <h3 className="text-xl font-semibold text-white mb-4">
            AI Accuracy (Last 7 Days)
          </h3>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.1)"
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  stroke="rgba(255,255,255,0.3)"
                  tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="rgba(255,255,255,0.3)"
                  tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  domain={[0, 100]}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(6,6,6,0.95)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "12px",
                    color: "#fff",
                  }}
                  itemStyle={{ color: "#A93E17" }}
                  cursor={{ stroke: "rgba(255,255,255,0.1)", strokeWidth: 1 }}
                />
                <Line
                  type="monotone"
                  dataKey="accuracy"
                  stroke="url(#gradient)"
                  strokeWidth={3}
                  dot={{
                    fill: "#A93E17",
                    stroke: "#060606",
                    strokeWidth: 2,
                    r: 4,
                  }}
                  activeDot={{ r: 6, fill: "#A93E17" }}
                />
                <defs>
                  <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#15399A" />
                    <stop offset="100%" stopColor="#A93E17" />
                  </linearGradient>
                </defs>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </DashboardCard>
      </div>
    </div>
  );
}
