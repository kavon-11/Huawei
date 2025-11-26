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

export default function OverView() {
  const navigate = useNavigate();
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Mock Data
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
      label: "AI Accuracy",
      value: "87%",
      icon: <FaBullseye />,
      trend: "+3%",
      trendUp: true,
      detail: "from last week",
    },
    {
      label: "Appointments Booked",
      value: "8",
      icon: <FaCalendarAlt />,
      detail: "2 via AI, 6 manual",
    },
    {
      label: "Human Escalations",
      value: "3",
      icon: <FaUser />,
      detail: "12.5% of calls",
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

  // Styles
  const containerStyle = {
    padding: "2rem",
    backgroundColor: "#0f172a",
    minHeight: "100vh",
    color: "#e2e8f0",
    fontFamily: "'Inter', sans-serif",
  };

  const headerStyle = {
    marginBottom: "2rem",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "1.5rem",
    marginBottom: "2rem",
  };

  const cardStyle = {
    backgroundColor: "#1e293b",
    borderRadius: "12px",
    padding: "1.5rem",
    border: "1px solid #334155",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  };

  const buttonGridStyle = {
    display: "flex",
    gap: "1rem",
    flexWrap: "wrap",
    marginBottom: "2rem",
  };

  const actionButtonStyle = {
    padding: "0.75rem 1.5rem",
    backgroundColor: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "0.9rem",
    flex: "1 1 auto",
    textAlign: "center",
  };

  const widgetGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "1.5rem",
  };

  const widgetStyle = {
    backgroundColor: "#1e293b",
    borderRadius: "12px",
    padding: "1.5rem",
    border: "1px solid #334155",
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "0.85rem",
  };

  const thStyle = {
    textAlign: "left",
    padding: "0.75rem 0",
    color: "#94a3b8",
    borderBottom: "1px solid #334155",
  };

  const tdStyle = {
    padding: "0.75rem 0",
    borderBottom: "1px solid #334155",
    color: "#e2e8f0",
  };

  return (
    <div style={containerStyle}>
      <header style={headerStyle}>
        <h1
          style={{
            fontSize: "1.8rem",
            fontWeight: "700",
            color: "#f8fafc",
            margin: 0,
          }}
        >
          Welcome back, Business Owner
        </h1>
        <p style={{ color: "#94a3b8", marginTop: "0.5rem" }}>{currentDate}</p>
      </header>

      {/* Stats Grid */}
      <div style={gridStyle}>
        {stats.map((stat, index) => (
          <div key={index} style={cardStyle}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <div>
                <p style={{ color: "#94a3b8", fontSize: "0.85rem", margin: 0 }}>
                  {stat.label}
                </p>
                <h2
                  style={{
                    fontSize: "2rem",
                    fontWeight: "700",
                    margin: "0.5rem 0",
                    color: "#f8fafc",
                  }}
                >
                  {stat.value}
                </h2>
              </div>
              <span
                style={{
                  fontSize: "1.2rem",
                  backgroundColor: "#334155",
                  padding: "0.75rem",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#60a5fa",
                }}
              >
                {stat.icon}
              </span>
            </div>
            <div style={{ fontSize: "0.8rem", color: "#cbd5f5" }}>
              {stat.trend && (
                <span
                  style={{
                    color: stat.trendUp ? "#4ade80" : "#f87171",
                    fontWeight: "600",
                    marginRight: "0.25rem",
                  }}
                >
                  {stat.trendUp ? "↑" : "↓"} {stat.trend}
                </span>
              )}
              {stat.detail}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div style={buttonGridStyle}>
        <button
          style={actionButtonStyle}
          onClick={() => navigate("/dashboard/history")}
        >
          View Call History
        </button>
        <button
          style={actionButtonStyle}
          onClick={() => navigate("/dashboard/ai-config")}
        >
          Configure AI
        </button>
        <button
          style={actionButtonStyle}
          onClick={() => navigate("/dashboard/knowledge")}
        >
          Manage Knowledge Base
        </button>
        <button
          style={actionButtonStyle}
          onClick={() => navigate("/dashboard/analytics")}
        >
          View Analytics
        </button>
      </div>

      {/* Widgets */}
      <div style={widgetGridStyle}>
        {/* Recent Calls */}
        <div style={widgetStyle}>
          <h3 style={{ margin: "0 0 1rem 0", color: "#f8fafc" }}>
            Recent Calls
          </h3>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Time</th>
                <th style={thStyle}>Caller</th>
                <th style={thStyle}>Intent</th>
                <th style={thStyle}>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentCalls.map((call, i) => (
                <tr
                  key={i}
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/dashboard/history")}
                >
                  <td style={tdStyle}>{call.time}</td>
                  <td style={tdStyle}>{call.caller}</td>
                  <td style={tdStyle}>{call.intent}</td>
                  <td style={tdStyle}>
                    <span
                      style={{
                        padding: "0.2rem 0.5rem",
                        borderRadius: "4px",
                        backgroundColor:
                          call.status === "Completed"
                            ? "rgba(74, 222, 128, 0.1)"
                            : "rgba(248, 113, 113, 0.1)",
                        color:
                          call.status === "Completed" ? "#4ade80" : "#f87171",
                        fontSize: "0.75rem",
                      }}
                    >
                      {call.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Upcoming Appointments */}
        <div style={widgetStyle}>
          <h3 style={{ margin: "0 0 1rem 0", color: "#f8fafc" }}>
            Upcoming Appointments
          </h3>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            {upcomingAppointments.map((apt, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderBottom: "1px solid #334155",
                  paddingBottom: "0.75rem",
                }}
              >
                <div>
                  <p style={{ margin: 0, fontWeight: "600", color: "#e2e8f0" }}>
                    {apt.name}
                  </p>
                  <p
                    style={{
                      margin: "0.25rem 0 0",
                      fontSize: "0.8rem",
                      color: "#94a3b8",
                    }}
                  >
                    {apt.time} • {apt.type}
                  </p>
                </div>
                <span
                  style={{
                    fontSize: "0.75rem",
                    color: apt.status === "Confirmed" ? "#4ade80" : "#fbbf24",
                  }}
                >
                  {apt.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* AI Performance Chart */}
        <div style={widgetStyle}>
          <h3 style={{ margin: "0 0 1rem 0", color: "#f8fafc" }}>
            AI Accuracy (Last 7 Days)
          </h3>
          <div style={{ width: "100%", height: "200px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#334155"
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  stroke="#94a3b8"
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  dy={10}
                />
                <YAxis
                  stroke="#94a3b8"
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  domain={[0, 100]}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "1px solid #334155",
                    borderRadius: "8px",
                    color: "#f8fafc",
                  }}
                  itemStyle={{ color: "#3b82f6" }}
                  cursor={{ stroke: "#334155", strokeWidth: 1 }}
                />
                <Line
                  type="monotone"
                  dataKey="accuracy"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{
                    fill: "#3b82f6",
                    stroke: "#1e293b",
                    strokeWidth: 2,
                    r: 4,
                  }}
                  activeDot={{ r: 6, fill: "#3b82f6" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
