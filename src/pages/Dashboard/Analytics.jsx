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

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

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

  // Styles
  const containerStyle = {
    padding: "1rem",
    backgroundColor: "#0f172a",
    minHeight: "100vh",
    color: "#e2e8f0",
    fontFamily: "'Inter', sans-serif",
  };

  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "2rem",
    flexWrap: "wrap",
    gap: "1rem",
  };

  const controlGroupStyle = {
    display: "flex",
    gap: "1rem",
    alignItems: "center",
    backgroundColor: "#1e293b",
    padding: "0.5rem 1rem",
    borderRadius: "8px",
    border: "1px solid #334155",
  };

  const selectStyle = {
    backgroundColor: "#1e293b", // Changed from transparent to match control group
    color: "#e2e8f0",
    border: "none",
    outline: "none",
    fontSize: "0.9rem",
    cursor: "pointer",
    padding: "0.25rem", // Added padding
    borderRadius: "4px", // Added border radius
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

  const chartGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 500px), 1fr))",
    gap: "1.5rem",
    marginBottom: "2rem",
  };

  const chartCardStyle = {
    ...cardStyle,
    minHeight: "400px",
  };

  const sectionHeaderStyle = {
    fontSize: "1.2rem",
    fontWeight: "600",
    color: "#f8fafc",
    marginBottom: "1rem",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  };

  const statValueStyle = {
    fontSize: "2rem",
    fontWeight: "700",
    color: "#f8fafc",
    margin: "0.5rem 0",
  };

  const trendStyle = (isUp, isGood = true) => {
    const isPositive = isUp === isGood; // Up is good for accuracy, bad for escalation
    return {
      display: "flex",
      alignItems: "center",
      gap: "0.25rem",
      fontSize: "0.85rem",
      color: isPositive ? "#4ade80" : "#f87171",
      fontWeight: "600",
    };
  };

  const inputStyle = {
    padding: "0.6rem",
    borderRadius: "8px",
    border: "1px solid #334155",
    backgroundColor: "#0f172a",
    color: "white",
    fontSize: "0.9rem",
    outline: "none",
    width: "100%",
  };

  const buttonStyle = {
    padding: "0.6rem 1.2rem",
    backgroundColor: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "0.9rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
  };

  return (
    <div style={containerStyle}>
      <header style={headerStyle}>
        <div>
          <h1
            style={{
              fontSize: "1.8rem",
              fontWeight: "700",
              color: "#f8fafc",
              margin: 0,
            }}
          >
            Analytics & Reports
          </h1>
          <p style={{ color: "#94a3b8", marginTop: "0.5rem" }}>
            Track AI performance and business metrics.
          </p>
        </div>
        <div style={controlGroupStyle}>
          <FaCalendarAlt color="#94a3b8" />
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            style={selectStyle}
          >
            <option style={{ backgroundColor: "#1e293b" }}>Last 7 days</option>
            <option style={{ backgroundColor: "#1e293b" }}>Last 30 days</option>
            <option style={{ backgroundColor: "#1e293b" }}>Last 90 days</option>
            <option style={{ backgroundColor: "#1e293b" }}>Custom Range</option>
          </select>
        </div>
      </header>

      {/* Section 1: Performance Metrics Cards */}
      <div style={gridStyle}>
        {/* Card 1: AI Accuracy */}
        <div style={cardStyle}>
          <div>
            <p style={{ color: "#94a3b8", fontSize: "0.85rem", margin: 0 }}>
              Overall AI Accuracy
            </p>
            <div style={statValueStyle}>87%</div>
          </div>
          <div style={trendStyle(true, true)}>
            <FaArrowUp /> +3% from last period
          </div>
          <div
            style={{
              marginTop: "1rem",
              height: "4px",
              backgroundColor: "#334155",
              borderRadius: "2px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: "87%",
                height: "100%",
                backgroundColor: "#10b981",
              }}
            />
          </div>
        </div>

        {/* Card 2: Intent Distribution */}
        <div style={cardStyle}>
          <div>
            <p style={{ color: "#94a3b8", fontSize: "0.85rem", margin: 0 }}>
              Intents Detected
            </p>
            <div style={statValueStyle}>5</div>
          </div>
          <div
            style={{
              fontSize: "0.85rem",
              color: "#cbd5f5",
              display: "flex",
              flexDirection: "column",
              gap: "0.25rem",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Schedule:</span> <span>45%</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>FAQ:</span> <span>35%</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Callback:</span> <span>20%</span>
            </div>
          </div>
        </div>

        {/* Card 3: Call Volume */}
        <div style={cardStyle}>
          <div>
            <p style={{ color: "#94a3b8", fontSize: "0.85rem", margin: 0 }}>
              Total Calls
            </p>
            <div style={statValueStyle}>156</div>
          </div>
          <div style={trendStyle(true, true)}>
            <FaArrowUp /> +12 from last period
          </div>
          <p
            style={{
              fontSize: "0.8rem",
              color: "#94a3b8",
              marginTop: "0.5rem",
            }}
          >
            120 Completed, 36 Escalated
          </p>
        </div>

        {/* Card 4: Escalation Rate */}
        <div style={cardStyle}>
          <div>
            <p style={{ color: "#94a3b8", fontSize: "0.85rem", margin: 0 }}>
              Escalation Rate
            </p>
            <div style={statValueStyle}>23%</div>
          </div>
          <div style={trendStyle(false, true)}>
            {" "}
            {/* Down is good for escalation */}
            <FaArrowDown /> -2% from last period
          </div>
          <div
            style={{
              marginTop: "1rem",
              height: "4px",
              backgroundColor: "#334155",
              borderRadius: "2px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: "23%",
                height: "100%",
                backgroundColor: "#f59e0b",
              }}
            />
          </div>
        </div>
      </div>

      {/* Section 2: Charts */}
      <div style={chartGridStyle}>
        {/* Chart 1: Call Volume Trend */}
        <div style={chartCardStyle}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "1rem",
            }}
          >
            <h3 style={sectionHeaderStyle}>
              <FaChartLine /> Call Volume Trend
            </h3>
            <select
              style={{
                ...selectStyle,
                backgroundColor: "#0f172a",
                padding: "0.25rem",
                borderRadius: "4px",
              }}
            >
              <option>Daily</option>
              <option>Weekly</option>
              <option>Monthly</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={CALL_VOLUME_DATA}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#334155"
                vertical={false}
              />
              <XAxis
                dataKey="date"
                stroke="#94a3b8"
                tick={{ fill: "#94a3b8", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                dy={10}
              />
              <YAxis
                stroke="#94a3b8"
                tick={{ fill: "#94a3b8", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1e293b",
                  border: "1px solid #334155",
                  borderRadius: "8px",
                  color: "#f8fafc",
                }}
                itemStyle={{ color: "#3b82f6" }}
              />
              <Line
                type="monotone"
                dataKey="calls"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ r: 4, fill: "#3b82f6" }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Chart 2: Intent Distribution */}
        <div style={chartCardStyle}>
          <h3 style={sectionHeaderStyle}>
            <FaChartPie /> Intent Distribution
          </h3>
          <ResponsiveContainer width="100%" height="100%">
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
                  backgroundColor: "#1e293b",
                  border: "1px solid #334155",
                  borderRadius: "8px",
                  color: "#f8fafc",
                }}
              />
              <Legend verticalAlign="bottom" height={36} iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Chart 3: AI Accuracy by Intent */}
        <div style={chartCardStyle}>
          <h3 style={sectionHeaderStyle}>
            <FaChartBar /> Accuracy by Intent
          </h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={ACCURACY_DATA} layout="vertical">
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#334155"
                horizontal={false}
              />
              <XAxis
                type="number"
                domain={[0, 100]}
                stroke="#94a3b8"
                tick={{ fill: "#94a3b8", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                dataKey="name"
                type="category"
                width={80}
                stroke="#94a3b8"
                tick={{ fill: "#94a3b8", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                cursor={{ fill: "rgba(255,255,255,0.05)" }}
                contentStyle={{
                  backgroundColor: "#1e293b",
                  border: "1px solid #334155",
                  borderRadius: "8px",
                  color: "#f8fafc",
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
        </div>

        {/* Chart 4: Appointment Conversion Funnel */}
        <div style={chartCardStyle}>
          <h3 style={sectionHeaderStyle}>
            <FaFilter /> Appointment Funnel
          </h3>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
              justifyContent: "center",
              height: "100%",
            }}
          >
            {[
              {
                label: "Total Calls",
                value: 156,
                color: "#3b82f6",
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
                color: "#10b981",
                width: "55%",
              },
            ].map((step, i) => (
              <div key={i} style={{ position: "relative" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "0.5rem",
                    fontSize: "0.9rem",
                    color: "#e2e8f0",
                  }}
                >
                  <span>{step.label}</span>
                  <span style={{ fontWeight: "700" }}>{step.value}</span>
                </div>
                <div
                  style={{
                    height: "24px",
                    backgroundColor: "#334155",
                    borderRadius: "4px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: step.width,
                      height: "100%",
                      backgroundColor: step.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      paddingRight: "0.5rem",
                      fontSize: "0.75rem",
                      fontWeight: "600",
                    }}
                  >
                    {i === 2 && "71% Success"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section 3: Business Metrics Summary */}
      <div
        style={{
          ...cardStyle,
          marginBottom: "2rem",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: "2rem",
          alignItems: "center",
        }}
      >
        <div style={{ flex: "1 1 200px" }}>
          <h3 style={{ ...sectionHeaderStyle, marginBottom: "0.5rem" }}>
            Weekly Summary
          </h3>
          <p style={{ color: "#94a3b8", fontSize: "0.9rem", margin: 0 }}>
            Key performance indicators for this week.
          </p>
        </div>
        <div
          style={{
            display: "flex",
            gap: "2rem",
            flexWrap: "wrap",
            flex: "3 1 400px",
          }}
        >
          <div>
            <p style={{ color: "#94a3b8", fontSize: "0.8rem", margin: 0 }}>
              Appointments Booked
            </p>
            <p
              style={{
                fontSize: "1.2rem",
                fontWeight: "700",
                color: "#f8fafc",
                margin: "0.25rem 0",
              }}
            >
              62
            </p>
          </div>
          <div>
            <p style={{ color: "#94a3b8", fontSize: "0.8rem", margin: 0 }}>
              Customer Satisfaction
            </p>
            <p
              style={{
                fontSize: "1.2rem",
                fontWeight: "700",
                color: "#f8fafc",
                margin: "0.25rem 0",
              }}
            >
              87%
            </p>
          </div>
          <div>
            <p style={{ color: "#94a3b8", fontSize: "0.8rem", margin: 0 }}>
              Avg Call Duration
            </p>
            <p
              style={{
                fontSize: "1.2rem",
                fontWeight: "700",
                color: "#f8fafc",
                margin: "0.25rem 0",
              }}
            >
              2m 15s
            </p>
          </div>
          <div>
            <p style={{ color: "#94a3b8", fontSize: "0.8rem", margin: 0 }}>
              Peak Time
            </p>
            <p
              style={{
                fontSize: "1.2rem",
                fontWeight: "700",
                color: "#f8fafc",
                margin: "0.25rem 0",
              }}
            >
              2-3 PM
            </p>
          </div>
        </div>
      </div>

      {/* Section 4: Reports */}
      <div style={gridStyle}>
        {/* Generate Report Form */}
        <div style={cardStyle}>
          <h3 style={sectionHeaderStyle}>Generate Report</h3>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  color: "#cbd5f5",
                  fontSize: "0.9rem",
                }}
              >
                Report Type
              </label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                style={inputStyle}
              >
                <option>Weekly Summary</option>
                <option>Monthly Detailed</option>
                <option>Custom</option>
              </select>
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  color: "#cbd5f5",
                  fontSize: "0.9rem",
                }}
              >
                Format
              </label>
              <div style={{ display: "flex", gap: "1rem" }}>
                {["PDF", "CSV", "Email"].map((fmt) => (
                  <label
                    key={fmt}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      color: "#e2e8f0",
                      cursor: "pointer",
                      fontSize: "0.9rem",
                    }}
                  >
                    <input
                      type="radio"
                      name="format"
                      checked={reportFormat === fmt}
                      onChange={() => setReportFormat(fmt)}
                    />
                    {fmt}
                  </label>
                ))}
              </div>
            </div>
            <button style={{ ...buttonStyle, marginTop: "0.5rem" }}>
              <FaDownload /> Generate Report
            </button>
          </div>
        </div>

        {/* Previous Reports List */}
        <div style={cardStyle}>
          <h3 style={sectionHeaderStyle}>Recent Reports</h3>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
          >
            {REPORTS_HISTORY.map((report) => (
              <div
                key={report.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "0.75rem",
                  backgroundColor: "#0f172a",
                  borderRadius: "8px",
                  border: "1px solid #334155",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                  }}
                >
                  {report.type === "PDF" ? (
                    <FaFilePdf color="#ef4444" />
                  ) : (
                    <FaFileCsv color="#10b981" />
                  )}
                  <div>
                    <p
                      style={{
                        margin: 0,
                        color: "#e2e8f0",
                        fontSize: "0.9rem",
                        fontWeight: "500",
                      }}
                    >
                      {report.name}
                    </p>
                    <p
                      style={{
                        margin: 0,
                        color: "#94a3b8",
                        fontSize: "0.75rem",
                      }}
                    >
                      {report.date}
                    </p>
                  </div>
                </div>
                <button
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "#3b82f6",
                    cursor: "pointer",
                  }}
                >
                  <FaDownload />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
