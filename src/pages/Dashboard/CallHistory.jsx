import React, { useState, useMemo } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaSearch,
  FaFilter,
  FaPlay,
  FaCheck,
  FaTimes,
  FaExclamationTriangle,
  FaChevronDown,
  FaChevronUp,
  FaUser,
  FaRobot,
} from "react-icons/fa";

// Mock Data
const MOCK_CALLS = [
  {
    id: 1,
    time: "Today, 2:15 PM",
    caller: "John Smith",
    phone: "+1 (555) 123-4567",
    duration: "2m 30s",
    intent: "schedule_appointment",
    confidence: 92,
    status: "Completed",
    feedback: null,
    transcript: [
      {
        speaker: "Caller",
        time: "2:15 PM",
        text: "Hi, I'd like to book an appointment",
      },
      {
        speaker: "AI",
        time: "2:15 PM",
        text: "Of course! What date works for you?",
        meta: { intent: "schedule_appointment", confidence: 95 },
      },
      { speaker: "Caller", time: "2:16 PM", text: "Tomorrow at 3 PM" },
      {
        speaker: "AI",
        time: "2:16 PM",
        text: "Great! I've booked you for tomorrow at 3 PM. Your name please?",
        meta: { intent: "date_parsing", confidence: 88 },
      },
      { speaker: "Caller", time: "2:17 PM", text: "John Smith" },
      {
        speaker: "AI",
        time: "2:17 PM",
        text: "Perfect! Your appointment is confirmed for tomorrow at 3 PM, John.",
        meta: { intent: "name_capture", confidence: 97 },
      },
    ],
  },
  {
    id: 2,
    time: "Today, 1:45 PM",
    caller: "+1 (555) 987-6543",
    phone: "+1 (555) 987-6543",
    duration: "1m 15s",
    intent: "check_hours",
    confidence: 98,
    status: "Completed",
    feedback: "correct",
    transcript: [
      { speaker: "Caller", time: "1:45 PM", text: "Are you open right now?" },
      {
        speaker: "AI",
        time: "1:45 PM",
        text: "Yes, we are open today until 10 PM.",
        meta: { intent: "check_hours", confidence: 99 },
      },
    ],
  },
  {
    id: 3,
    time: "Today, 11:20 AM",
    caller: "Sarah Connor",
    phone: "+1 (555) 555-5555",
    duration: "4m 10s",
    intent: "complaint",
    confidence: 65,
    status: "Escalated",
    feedback: null,
    transcript: [
      {
        speaker: "Caller",
        time: "11:20 AM",
        text: "I want to speak to a manager, my order was wrong.",
      },
      {
        speaker: "AI",
        time: "11:20 AM",
        text: "I apologize for the inconvenience. Could you tell me what was missing?",
        meta: { intent: "complaint", confidence: 70 },
      },
      {
        speaker: "Caller",
        time: "11:21 AM",
        text: "Everything! Just get me a human!",
      },
      {
        speaker: "AI",
        time: "11:21 AM",
        text: "I understand. Connecting you to a manager now.",
        meta: { intent: "escalation", confidence: 95 },
      },
    ],
  },
  {
    id: 4,
    time: "Yesterday, 4:30 PM",
    caller: "Mike Ross",
    phone: "+1 (555) 222-3333",
    duration: "0m 45s",
    intent: "order_food",
    confidence: 45,
    status: "Error",
    feedback: "incorrect",
    transcript: [
      {
        speaker: "Caller",
        time: "4:30 PM",
        text: "I want the big deal special.",
      },
      {
        speaker: "AI",
        time: "4:30 PM",
        text: "I'm sorry, I didn't catch that. Could you repeat?",
        meta: { intent: "unknown", confidence: 40 },
      },
      { speaker: "Caller", time: "4:30 PM", text: "The big deal special!" },
      {
        speaker: "AI",
        time: "4:30 PM",
        text: "I am having trouble understanding. Let me transfer you.",
        meta: { intent: "escalation", confidence: 50 },
      },
    ],
  },
];

const INTENTS = [
  "schedule_appointment",
  "check_hours",
  "complaint",
  "order_food",
  "technical_support",
];

export default function CallHistory() {
  const [calls, setCalls] = useState(MOCK_CALLS);
  const [expandedCallId, setExpandedCallId] = useState(null);
  const [isToastActive, setIsToastActive] = useState(false); // New state
  const [filters, setFilters] = useState({
    search: "",
    status: "All",
    intent: "All",
    dateFrom: "",
    dateTo: "",
  });

  // Feedback Form State
  const [feedbackForm, setFeedbackForm] = useState({
    type: "", // correct, incorrect, partial
    correctIntent: "",
    details: "",
    partialIssues: [],
  });

  const filteredCalls = useMemo(() => {
    return calls.filter((call) => {
      const matchesSearch =
        call.caller.toLowerCase().includes(filters.search.toLowerCase()) ||
        call.phone.includes(filters.search);
      const matchesStatus =
        filters.status === "All" || call.status === filters.status;
      const matchesIntent =
        filters.intent === "All" || call.intent === filters.intent;
      // Date filtering logic omitted for mock simplicity
      return matchesSearch && matchesStatus && matchesIntent;
    });
  }, [calls, filters]);

  const toggleExpand = (id) => {
    if (expandedCallId === id) {
      setExpandedCallId(null);
    } else {
      setExpandedCallId(id);
      // Reset feedback form or load existing
      const call = calls.find((c) => c.id === id);
      setFeedbackForm({
        type: call.feedback || "",
        correctIntent: "",
        details: "",
        partialIssues: [],
      });
    }
  };

  const handleFeedbackSubmit = (callId) => {
    if (!feedbackForm.type) {
      if (!isToastActive) {
        setIsToastActive(true);
        toast.error(
          "Please select a feedback option (Correct, Incorrect, or Partial).",
          {
            position: "top-center",
            onClose: () => setIsToastActive(false),
          }
        );
      }
      return;
    }

    if (isToastActive) return;

    setCalls((prev) =>
      prev.map((c) =>
        c.id === callId ? { ...c, feedback: feedbackForm.type } : c
      )
    );
    setIsToastActive(true);
    toast.success("Feedback saved! Thank you for helping improve the AI.", {
      position: "top-center",
      onClose: () => setIsToastActive(false),
    });
    setExpandedCallId(null); // Close the review part automatically
  };

  const getConfidenceColor = (score) => {
    if (score >= 90) return "#4ade80"; // Green
    if (score >= 70) return "#fbbf24"; // Yellow
    return "#f87171"; // Red
  };

  const getStatusBadge = (status) => {
    let bg = "#334155";
    let color = "#e2e8f0";
    if (status === "Completed") {
      bg = "rgba(74, 222, 128, 0.1)";
      color = "#4ade80";
    }
    if (status === "Escalated") {
      bg = "rgba(251, 191, 36, 0.1)";
      color = "#fbbf24";
    }
    if (status === "Error") {
      bg = "rgba(248, 113, 113, 0.1)";
      color = "#f87171";
    }

    return (
      <span
        style={{
          padding: "0.2rem 0.5rem",
          borderRadius: "4px",
          backgroundColor: bg,
          color: color,
          fontSize: "0.75rem",
          fontWeight: "600",
        }}
      >
        {status}
      </span>
    );
  };

  // Styles
  const containerStyle = {
    padding: "1rem", // Reduced padding for mobile
    backgroundColor: "#0f172a",
    minHeight: "100vh",
    color: "#e2e8f0",
    fontFamily: "'Inter', sans-serif",
  };

  const headerStyle = {
    marginBottom: "2rem",
  };

  const filterContainerStyle = {
    display: "flex",
    gap: "1rem",
    marginBottom: "1.5rem",
    flexWrap: "wrap",
    backgroundColor: "#1e293b",
    padding: "1rem",
    borderRadius: "12px",
    border: "1px solid #334155",
    alignItems: "center",
  };

  const inputStyle = {
    padding: "0.6rem",
    borderRadius: "8px",
    border: "1px solid #334155",
    backgroundColor: "#0f172a",
    color: "white",
    fontSize: "0.9rem",
    outline: "none",
    minWidth: "150px",
    flex: "1 1 auto", // Allow growing
  };

  const tableCardStyle = {
    backgroundColor: "#1e293b",
    borderRadius: "12px",
    border: "1px solid #334155",
    overflow: "hidden",
  };

  const tableHeaderStyle = {
    textAlign: "left",
    padding: "1rem",
    color: "#94a3b8",
    borderBottom: "1px solid #334155",
    backgroundColor: "#1e293b",
    fontSize: "0.8rem",
    textTransform: "uppercase",
    whiteSpace: "nowrap",
  };

  const tableCellStyle = {
    padding: "1rem",
    borderBottom: "1px solid #334155",
    color: "#e2e8f0",
    fontSize: "0.9rem",
  };

  const detailViewStyle = {
    padding: "1.5rem",
    backgroundColor: "#0b1220",
    borderBottom: "1px solid #334155",
  };

  const transcriptStyle = {
    backgroundColor: "#1e293b",
    borderRadius: "8px",
    padding: "1rem",
    marginTop: "1rem",
    maxHeight: "300px",
    overflowY: "auto",
  };

  const messageStyle = (speaker) => ({
    marginBottom: "1rem",
    display: "flex",
    flexDirection: "column",
    alignItems: speaker === "AI" ? "flex-start" : "flex-end",
  });

  const bubbleStyle = (speaker) => ({
    backgroundColor: speaker === "AI" ? "#1e3a8a" : "#334155",
    color: "#e2e8f0",
    padding: "0.75rem",
    borderRadius: "8px",
    maxWidth: "80%",
    borderTopLeftRadius: speaker === "AI" ? "0" : "8px",
    borderTopRightRadius: speaker === "Caller" ? "0" : "8px",
  });

  const buttonStyle = (active, color = "#3b82f6") => ({
    padding: "0.5rem 1rem",
    backgroundColor: active ? color : "transparent",
    color: active ? "white" : "#94a3b8",
    border: `1px solid ${active ? color : "#334155"}`,
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "0.85rem",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    transition: "all 0.2s",
  });

  return (
    <div style={containerStyle}>
      <ToastContainer theme="dark" limit={1} />
      <header style={headerStyle}>
        <h1
          style={{
            fontSize: "1.8rem",
            fontWeight: "700",
            color: "#f8fafc",
            margin: 0,
          }}
        >
          Call History
        </h1>
        <p style={{ color: "#94a3b8", marginTop: "0.5rem" }}>
          Review transcripts, listen to recordings, and improve AI accuracy.
        </p>
      </header>

      {/* Filters */}
      <div style={filterContainerStyle}>
        <div style={{ position: "relative", flex: "1 1 200px", width: "100%" }}>
          <FaSearch
            style={{
              position: "absolute",
              left: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#94a3b8",
            }}
          />
          <input
            type="text"
            placeholder="Search caller name or number..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            style={{ ...inputStyle, paddingLeft: "2.5rem", width: "100%" }}
          />
        </div>
        <select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          style={inputStyle}
        >
          <option value="All">All Statuses</option>
          <option value="Completed">Completed</option>
          <option value="Escalated">Escalated</option>
          <option value="Error">Error</option>
        </select>
        <select
          value={filters.intent}
          onChange={(e) => setFilters({ ...filters, intent: e.target.value })}
          style={inputStyle}
        >
          <option value="All">All Intents</option>
          {INTENTS.map((i) => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </select>
        <div
          style={{
            display: "flex",
            gap: "1rem",
            alignItems: "center",
            color: "#94a3b8",
            fontSize: "0.9rem",
            flexWrap: "wrap",
            flex: "1 1 auto",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span>From :</span>
            <input type="date" style={{ ...inputStyle, minWidth: "auto" }} />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span>To :</span>
            <input type="date" style={{ ...inputStyle, minWidth: "auto" }} />
          </div>
        </div>
      </div>

      {/* Call Table */}
      <div style={tableCardStyle}>
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              minWidth: "800px",
            }}
          >
            <thead>
              <tr>
                <th style={tableHeaderStyle}>Time</th>
                <th style={tableHeaderStyle}>Caller</th>
                <th style={tableHeaderStyle}>Duration</th>
                <th style={tableHeaderStyle}>Intent</th>
                <th style={tableHeaderStyle}>Confidence</th>
                <th style={tableHeaderStyle}>Status</th>
                <th style={tableHeaderStyle}>Feedback</th>
                <th style={{ ...tableHeaderStyle, width: "40px" }}></th>
              </tr>
            </thead>
            <tbody>
              {filteredCalls.map((call) => (
                <React.Fragment key={call.id}>
                  <tr
                    style={{
                      cursor: "pointer",
                      backgroundColor:
                        expandedCallId === call.id ? "#0f172a" : "transparent",
                      borderBottom:
                        expandedCallId === call.id
                          ? "none"
                          : "1px solid #334155",
                    }}
                    onClick={() => toggleExpand(call.id)}
                  >
                    <td style={tableCellStyle}>{call.time}</td>
                    <td style={tableCellStyle}>
                      <div style={{ fontWeight: "600" }}>{call.caller}</div>
                      <div style={{ fontSize: "0.8rem", color: "#94a3b8" }}>
                        {call.phone}
                      </div>
                    </td>
                    <td style={tableCellStyle}>{call.duration}</td>
                    <td style={tableCellStyle}>{call.intent}</td>
                    <td style={tableCellStyle}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                        }}
                      >
                        <div
                          style={{
                            width: "60px",
                            height: "6px",
                            backgroundColor: "#334155",
                            borderRadius: "3px",
                            overflow: "hidden",
                          }}
                        >
                          <div
                            style={{
                              width: `${call.confidence}%`,
                              height: "100%",
                              backgroundColor: getConfidenceColor(
                                call.confidence
                              ),
                            }}
                          />
                        </div>
                        <span
                          style={{
                            fontSize: "0.8rem",
                            color: getConfidenceColor(call.confidence),
                          }}
                        >
                          {call.confidence}%
                        </span>
                      </div>
                    </td>
                    <td style={tableCellStyle}>
                      {getStatusBadge(call.status)}
                    </td>
                    <td style={tableCellStyle}>
                      {call.feedback === "correct" && (
                        <FaCheck color="#4ade80" />
                      )}
                      {call.feedback === "incorrect" && (
                        <FaTimes color="#f87171" />
                      )}
                      {call.feedback === "partial" && (
                        <FaExclamationTriangle color="#fbbf24" />
                      )}
                      {!call.feedback && (
                        <span style={{ color: "#64748b" }}>-</span>
                      )}
                    </td>
                    <td style={tableCellStyle}>
                      {expandedCallId === call.id ? (
                        <FaChevronUp color="#94a3b8" />
                      ) : (
                        <FaChevronDown color="#94a3b8" />
                      )}
                    </td>
                  </tr>

                  {/* Expanded Detail View */}
                  {expandedCallId === call.id && (
                    <tr>
                      <td colSpan="8" style={{ padding: 0 }}>
                        <div style={detailViewStyle}>
                          <div
                            style={{
                              display: "grid",
                              gridTemplateColumns:
                                "repeat(auto-fit, minmax(300px, 1fr))",
                              gap: "2rem",
                            }}
                          >
                            {/* Left: Transcript & Audio */}
                            <div style={{ minWidth: "0" }}>
                              {" "}
                              {/* minWidth 0 prevents grid blowout */}
                              <h3
                                style={{
                                  margin: "0 0 1rem 0",
                                  color: "#f8fafc",
                                }}
                              >
                                Call Transcript
                              </h3>
                              {/* Mock Audio Player */}
                              <div
                                style={{
                                  backgroundColor: "#1e293b",
                                  padding: "0.75rem",
                                  borderRadius: "8px",
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "1rem",
                                  marginBottom: "1rem",
                                }}
                              >
                                <button
                                  style={{
                                    backgroundColor: "#3b82f6",
                                    border: "none",
                                    borderRadius: "50%",
                                    width: "36px",
                                    height: "36px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "white",
                                    cursor: "pointer",
                                  }}
                                >
                                  <FaPlay
                                    size={12}
                                    style={{ marginLeft: "2px" }}
                                  />
                                </button>
                                <div
                                  style={{
                                    flex: 1,
                                    height: "4px",
                                    backgroundColor: "#334155",
                                    borderRadius: "2px",
                                  }}
                                >
                                  <div
                                    style={{
                                      width: "30%",
                                      height: "100%",
                                      backgroundColor: "#94a3b8",
                                      borderRadius: "2px",
                                    }}
                                  />
                                </div>
                                <span
                                  style={{
                                    fontSize: "0.8rem",
                                    color: "#94a3b8",
                                  }}
                                >
                                  0:45 / {call.duration}
                                </span>
                              </div>
                              <div style={transcriptStyle}>
                                {call.transcript.map((msg, idx) => (
                                  <div
                                    key={idx}
                                    style={messageStyle(msg.speaker)}
                                  >
                                    <div
                                      style={{
                                        fontSize: "0.75rem",
                                        color: "#94a3b8",
                                        marginBottom: "0.25rem",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "0.4rem",
                                      }}
                                    >
                                      {msg.speaker === "AI" ? (
                                        <FaRobot />
                                      ) : (
                                        <FaUser />
                                      )}
                                      {msg.speaker} • {msg.time}
                                    </div>
                                    <div style={bubbleStyle(msg.speaker)}>
                                      {msg.text}
                                    </div>
                                    {msg.meta && (
                                      <div
                                        style={{
                                          marginTop: "0.25rem",
                                          fontSize: "0.7rem",
                                          color: "#64748b",
                                        }}
                                      >
                                        Intent:{" "}
                                        <span style={{ color: "#cbd5f5" }}>
                                          {msg.meta.intent}
                                        </span>{" "}
                                        • Confidence:{" "}
                                        <span
                                          style={{
                                            color: getConfidenceColor(
                                              msg.meta.confidence
                                            ),
                                          }}
                                        >
                                          {msg.meta.confidence}%
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Right: Feedback & Metadata */}
                            <div style={{ minWidth: "0" }}>
                              <h3
                                style={{
                                  margin: "0 0 1rem 0",
                                  color: "#f8fafc",
                                }}
                              >
                                Feedback & Review
                              </h3>
                              <div
                                style={{
                                  backgroundColor: "#1e293b",
                                  padding: "1.5rem",
                                  borderRadius: "12px",
                                  border: "1px solid #334155",
                                }}
                              >
                                <p
                                  style={{
                                    marginTop: 0,
                                    color: "#cbd5f5",
                                    fontSize: "0.9rem",
                                  }}
                                >
                                  Was the AI's handling of this call correct?
                                </p>

                                <div
                                  style={{
                                    display: "flex",
                                    gap: "0.5rem",
                                    marginBottom: "1.5rem",
                                    flexWrap: "wrap",
                                  }}
                                >
                                  <button
                                    style={{
                                      ...buttonStyle(
                                        feedbackForm.type === "correct",
                                        "#22c55e"
                                      ),
                                      flex: "1 1 auto",
                                      justifyContent: "center",
                                    }}
                                    onClick={() =>
                                      setFeedbackForm({
                                        ...feedbackForm,
                                        type: "correct",
                                      })
                                    }
                                  >
                                    <FaCheck /> Correct
                                  </button>
                                  <button
                                    style={{
                                      ...buttonStyle(
                                        feedbackForm.type === "incorrect",
                                        "#ef4444"
                                      ),
                                      flex: "1 1 auto",
                                      justifyContent: "center",
                                    }}
                                    onClick={() =>
                                      setFeedbackForm({
                                        ...feedbackForm,
                                        type: "incorrect",
                                      })
                                    }
                                  >
                                    <FaTimes /> Incorrect
                                  </button>
                                  <button
                                    style={{
                                      ...buttonStyle(
                                        feedbackForm.type === "partial",
                                        "#f59e0b"
                                      ),
                                      flex: "1 1 auto",
                                      justifyContent: "center",
                                    }}
                                    onClick={() =>
                                      setFeedbackForm({
                                        ...feedbackForm,
                                        type: "partial",
                                      })
                                    }
                                  >
                                    <FaExclamationTriangle /> Partial
                                  </button>
                                </div>

                                {feedbackForm.type === "incorrect" && (
                                  <div style={{ marginBottom: "1rem" }}>
                                    <label
                                      style={{
                                        display: "block",
                                        marginBottom: "0.5rem",
                                        fontSize: "0.85rem",
                                        color: "#94a3b8",
                                      }}
                                    >
                                      What was the correct intent?
                                    </label>
                                    <select
                                      style={{ ...inputStyle, width: "100%" }}
                                      value={feedbackForm.correctIntent}
                                      onChange={(e) =>
                                        setFeedbackForm({
                                          ...feedbackForm,
                                          correctIntent: e.target.value,
                                        })
                                      }
                                    >
                                      <option value="">
                                        Select correct intent...
                                      </option>
                                      {INTENTS.map((i) => (
                                        <option key={i} value={i}>
                                          {i}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                )}

                                {feedbackForm.type === "partial" && (
                                  <div style={{ marginBottom: "1rem" }}>
                                    <label
                                      style={{
                                        display: "block",
                                        marginBottom: "0.5rem",
                                        fontSize: "0.85rem",
                                        color: "#94a3b8",
                                      }}
                                    >
                                      Which parts were incorrect?
                                    </label>
                                    <div
                                      style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "0.5rem",
                                      }}
                                    >
                                      {[
                                        "Intent Recognition",
                                        "Entity Extraction",
                                        "Response Quality",
                                        "Voice Tone",
                                      ].map((issue) => (
                                        <label
                                          key={issue}
                                          style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "0.5rem",
                                            color: "#e2e8f0",
                                            fontSize: "0.9rem",
                                          }}
                                        >
                                          <input
                                            type="checkbox"
                                            checked={feedbackForm.partialIssues.includes(
                                              issue
                                            )}
                                            onChange={(e) => {
                                              const newIssues = e.target.checked
                                                ? [
                                                    ...feedbackForm.partialIssues,
                                                    issue,
                                                  ]
                                                : feedbackForm.partialIssues.filter(
                                                    (i) => i !== issue
                                                  );
                                              setFeedbackForm({
                                                ...feedbackForm,
                                                partialIssues: newIssues,
                                              });
                                            }}
                                          />
                                          {issue}
                                        </label>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {(feedbackForm.type === "incorrect" ||
                                  feedbackForm.type === "partial") && (
                                  <div style={{ marginBottom: "1rem" }}>
                                    <label
                                      style={{
                                        display: "block",
                                        marginBottom: "0.5rem",
                                        fontSize: "0.85rem",
                                        color: "#94a3b8",
                                      }}
                                    >
                                      Additional Details
                                    </label>
                                    <textarea
                                      style={{
                                        ...inputStyle,
                                        width: "100%",
                                        minHeight: "80px",
                                        resize: "vertical",
                                      }}
                                      placeholder="Describe what went wrong..."
                                      value={feedbackForm.details}
                                      onChange={(e) =>
                                        setFeedbackForm({
                                          ...feedbackForm,
                                          details: e.target.value,
                                        })
                                      }
                                    />
                                  </div>
                                )}

                                <button
                                  style={{
                                    ...buttonStyle(true, "#3b82f6"),
                                    width: "100%",
                                    justifyContent: "center",
                                    marginTop: "0.5rem",
                                  }}
                                  onClick={() => handleFeedbackSubmit(call.id)}
                                  disabled={isToastActive} // Disable button
                                >
                                  Save Feedback
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
