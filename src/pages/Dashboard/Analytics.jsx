import React, { useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  FaArrowUp,
  FaArrowDown,
  FaCalendarAlt,
  FaDownload,
  FaFilePdf,
  FaFileCsv,
  FaEnvelope,
  FaChartPie,
  FaChartLine,
  FaChartBar,
  FaFilter,
} from "react-icons/fa";
import DashboardCard from "../../components/DashboardCard";
import GradientText from "../../components/GradientText";

// Mock Data
const CALL_VOLUME_DATA = [
  { date: "Mon", calls: 12 },
  { date: "Tue", calls: 19 },
  { date: "Wed", calls: 15 },
  { date: "Thu", calls: 25 },
  { date: "Fri", calls: 32 },
  { date: "Sat", calls: 28 },
  { date: "Sun", calls: 25 },
];

const INTENT_DATA = [
  { name: "Schedule Appointment", value: 45 },
  { name: "Answer FAQ", value: 35 },
  { name: "Callback", value: 20 },
];

const ACCURACY_DATA = [
  { name: "Schedule", accuracy: 92 },
  { name: "FAQ", accuracy: 88 },
  { name: "Order", accuracy: 65 },
  { name: "Support", accuracy: 75 },
  { name: "Callback", accuracy: 95 },
];

const COLORS = ["#15399A", "#A93E17", "#10b981", "#f59e0b", "#8b5cf6"];

const REPORTS_HISTORY = [
  {
    id: 1,
    name: "Weekly Summary (Oct 1 - Oct 7)",
    date: "Oct 8, 2023",
    type: "PDF",
  },
  {
    id: 2,
    name: "Monthly Detailed (September)",
    date: "Oct 1, 2023",
    type: "CSV",
  },
];

export default function Analytics() {
  const [dateRange, setDateRange] = useState("Last 7 days");
  const [reportType, setReportType] = useState("Weekly Summary");
  const [reportFormat, setReportFormat] = useState("PDF");

  return (
    <div
      className="p-8 font-manrope"
      style={{ backgroundColor: "#060606", minHeight: "100vh" }}
    >
      <header className="flex justify-between items-center mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Analytics & <GradientText>Reports</GradientText>
          </h1>
          <p className="text-gray-400">
            Track AI performance and business metrics.
          </p>
        </div>
        <div className="flex gap-4 items-center rounded-full border border-white/10 bg-white/5 backdrop-blur-xl px-6 py-3">
          <FaCalendarAlt className="text-gray-400" />
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="bg-transparent text-white border-none outline-none cursor-pointer"
          >
            <option className="bg-[#060606]">Last 7 days</option>
            <option className="bg-[#060606]">Last 30 days</option>
            <option className="bg-[#060606]">Last 90 days</option>
            <option className="bg-[#060606]">Custom Range</option>
          </select>
        </div>
      </header>

      {/* Section 1: Performance Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Card 1: AI Accuracy */}
        <DashboardCard>
          <div>
            <p className="text-gray-400 text-sm mb-1">Overall AI Accuracy</p>
            <div className="text-4xl font-bold text-white my-2">87%</div>
          </div>
          <div className="flex items-center gap-1 text-sm text-green-400 font-semibold">
            <FaArrowUp /> +3% from last period
          </div>
          <div className="mt-4 h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#15399A] to-[#A93E17]"
              style={{ width: "87%" }}
            />
          </div>
        </DashboardCard>

        {/* Card 2: Intent Distribution */}
        <DashboardCard>
          <div>
            <p className="text-gray-400 text-sm mb-1">Intents Detected</p>
            <div className="text-4xl font-bold text-white my-2">5</div>
          </div>
          <div className="text-sm text-gray-300 flex flex-col gap-1 mt-4">
            <div className="flex justify-between">
              <span>Schedule:</span> <span>45%</span>
            </div>
            <div className="flex justify-between">
              <span>FAQ:</span> <span>35%</span>
            </div>
            <div className="flex justify-between">
              <span>Callback:</span> <span>20%</span>
            </div>
          </div>
        </DashboardCard>

        {/* Card 3: Call Volume */}
        <DashboardCard>
          <div>
            <p className="text-gray-400 text-sm mb-1">Total Calls</p>
            <div className="text-4xl font-bold text-white my-2">156</div>
          </div>
          <div className="flex items-center gap-1 text-sm text-green-400 font-semibold">
            <FaArrowUp /> +12 from last period
          </div>
          <p className="text-sm text-gray-400 mt-4">
            120 Completed, 36 Escalated
          </p>
        </DashboardCard>

        {/* Card 4: Escalation Rate */}
        <DashboardCard>
          <div>
            <p className="text-gray-400 text-sm mb-1">Escalation Rate</p>
            <div className="text-4xl font-bold text-white my-2">23%</div>
          </div>
          <div className="flex items-center gap-1 text-sm text-green-400 font-semibold">
            <FaArrowDown /> -2% from last period
          </div>
          <div className="mt-4 h-1 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-yellow-500" style={{ width: "23%" }} />
          </div>
        </DashboardCard>
      </div>

      {/* Section 2: Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Chart 1: Call Volume Trend */}
        <DashboardCard className="min-h-[400px]">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-white flex items-center gap-2">
              <FaChartLine /> Call Volume Trend
            </h3>
            <select className="bg-transparent text-white border border-white/10 rounded-lg px-3 py-1 text-sm outline-none cursor-pointer">
              <option className="bg-[#060606]">Daily</option>
              <option className="bg-[#060606]">Weekly</option>
              <option className="bg-[#060606]">Monthly</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={CALL_VOLUME_DATA}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.1)"
                vertical={false}
              />
              <XAxis
                dataKey="date"
                stroke="rgba(255,255,255,0.3)"
                tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                stroke="rgba(255,255,255,0.3)"
                tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(6,6,6,0.95)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "12px",
                  color: "#fff",
                }}
              />
              <Line
                type="monotone"
                dataKey="calls"
                stroke="url(#gradientLine)"
                strokeWidth={3}
                dot={{ r: 4, fill: "#A93E17" }}
                activeDot={{ r: 6 }}
              />
              <defs>
                <linearGradient id="gradientLine" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#15399A" />
                  <stop offset="100%" stopColor="#A93E17" />
                </linearGradient>
              </defs>
            </LineChart>
          </ResponsiveContainer>
        </DashboardCard>

        {/* Chart 2: Intent Distribution */}
        <DashboardCard className="min-h-[400px]">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <FaChartPie /> Intent Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={INTENT_DATA}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {INTENT_DATA.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(6,6,6,0.95)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "12px",
                  color: "#fff",
                }}
              />
              <Legend verticalAlign="bottom" height={36} iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        </DashboardCard>

        {/* Chart 3: AI Accuracy by Intent */}
        <DashboardCard className="min-h-[400px]">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <FaChartBar /> Accuracy by Intent
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={ACCURACY_DATA} layout="vertical">
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.1)"
                horizontal={false}
              />
              <XAxis
                type="number"
                domain={[0, 100]}
                stroke="rgba(255,255,255,0.3)"
                tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                dataKey="name"
                type="category"
                width={80}
                stroke="rgba(255,255,255,0.3)"
                tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                cursor={{ fill: "rgba(255,255,255,0.05)" }}
                contentStyle={{
                  backgroundColor: "rgba(6,6,6,0.95)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "12px",
                  color: "#fff",
                }}
              />
              <Bar dataKey="accuracy" radius={[0, 4, 4, 0]} barSize={20}>
                {ACCURACY_DATA.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      entry.accuracy > 90
                        ? "#10b981"
                        : entry.accuracy > 70
                        ? "#f59e0b"
                        : "#ef4444"
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </DashboardCard>

        {/* Chart 4: Appointment Conversion Funnel */}
        <DashboardCard className="min-h-[400px]">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <FaFilter /> Appointment Funnel
          </h3>
          <div className="flex flex-col gap-6 justify-center h-full">
            {[
              {
                label: "Total Calls",
                value: 156,
                color: "#15399A",
                width: "100%",
              },
              {
                label: "Requests Appointment",
                value: 87,
                color: "#8b5cf6",
                width: "75%",
              },
              {
                label: "Booked by AI",
                value: 62,
                color: "#A93E17",
                width: "55%",
              },
            ].map((step, i) => (
              <div key={i}>
                <div className="flex justify-between mb-2 text-sm text-gray-300">
                  <span>{step.label}</span>
                  <span className="font-bold">{step.value}</span>
                </div>
                <div className="h-6 bg-white/10 rounded-lg overflow-hidden">
                  <div
                    className="h-full flex items-center justify-end pr-2 text-xs font-semibold"
                    style={{
                      width: step.width,
                      backgroundColor: step.color,
                    }}
                  >
                    {i === 2 && "71% Success"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </DashboardCard>
      </div>

      {/* Section 3: Business Metrics Summary */}
      <DashboardCard className="mb-8 flex flex-row flex-wrap gap-8 items-center">
        <div className="flex-1 min-w-[200px]">
          <h3 className="text-xl font-semibold text-white mb-2">
            Weekly Summary
          </h3>
          <p className="text-gray-400 text-sm">
            Key performance indicators for this week.
          </p>
        </div>
        <div className="flex gap-8 flex-wrap flex-[3_1_400px]">
          <div>
            <p className="text-gray-400 text-sm mb-1">Appointments Booked</p>
            <p className="text-2xl font-bold text-white">62</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm mb-1">Customer Satisfaction</p>
            <p className="text-2xl font-bold text-white">87%</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm mb-1">Avg Call Duration</p>
            <p className="text-2xl font-bold text-white">2m 15s</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm mb-1">Peak Time</p>
            <p className="text-2xl font-bold text-white">2-3 PM</p>
          </div>
        </div>
      </DashboardCard>

      {/* Section 4: Reports */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Generate Report Form */}
        <DashboardCard>
          <h3 className="text-xl font-semibold text-white mb-4">
            Generate Report
          </h3>
          <div className="flex flex-col gap-4">
            <div>
              <label className="block mb-2 text-gray-300 text-sm">
                Report Type
              </label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-white/10 bg-[#060606] text-white text-sm outline-none"
              >
                <option>Weekly Summary</option>
                <option>Monthly Detailed</option>
                <option>Custom</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 text-gray-300 text-sm">Format</label>
              <div className="flex gap-4">
                {["PDF", "CSV", "Email"].map((fmt) => (
                  <label
                    key={fmt}
                    className="flex items-center gap-2 text-gray-300 cursor-pointer text-sm"
                  >
                    <input
                      type="radio"
                      name="format"
                      checked={reportFormat === fmt}
                      onChange={() => setReportFormat(fmt)}
                      className="accent-[#A93E17]"
                    />
                    {fmt}
                  </label>
                ))}
              </div>
            </div>
            <button className="mt-2 px-6 py-3 rounded-full text-white font-semibold flex items-center justify-center gap-2 bg-gradient-to-r from-[#15399A] to-[#A93E17] hover:opacity-90 transition">
              <FaDownload /> Generate Report
            </button>
          </div>
        </DashboardCard>

        {/* Previous Reports List */}
        <DashboardCard>
          <h3 className="text-xl font-semibold text-white mb-4">
            Recent Reports
          </h3>
          <div className="flex flex-col gap-3">
            {REPORTS_HISTORY.map((report) => (
              <div
                key={report.id}
                className="flex justify-between items-center p-3 bg-[#060606] rounded-lg border border-white/10"
              >
                <div className="flex items-center gap-3">
                  {report.type === "PDF" ? (
                    <FaFilePdf className="text-red-500 text-xl" />
                  ) : (
                    <FaFileCsv className="text-green-500 text-xl" />
                  )}
                  <div>
                    <p className="text-gray-200 text-sm font-medium">
                      {report.name}
                    </p>
                    <p className="text-gray-400 text-xs">{report.date}</p>
                  </div>
                </div>
                <button className="text-[#A93E17] hover:text-[#15399A] transition">
                  <FaDownload />
                </button>
              </div>
            ))}
          </div>
        </DashboardCard>
      </div>
    </div>
  );
}
