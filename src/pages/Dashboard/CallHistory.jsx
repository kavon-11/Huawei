import React, { useState, useMemo } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaSearch,
  FaPlay,
  FaCheck,
  FaTimes,
  FaExclamationTriangle,
  FaChevronDown,
  FaChevronUp,
  FaUser,
  FaRobot,
} from "react-icons/fa";
import DashboardCard from "../../components/DashboardCard";
import GradientText from "../../components/GradientText";
import Badge from "../../components/Badge";

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
  const [isToastActive, setIsToastActive] = useState(false);
  const [filters, setFilters] = useState({
    search: "",
    status: "All",
    intent: "All",
    dateFrom: "",
    dateTo: "",
  });

  const [feedbackForm, setFeedbackForm] = useState({
    type: "",
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
      return matchesSearch && matchesStatus && matchesIntent;
    });
  }, [calls, filters]);

  const toggleExpand = (id) => {
    if (expandedCallId === id) {
      setExpandedCallId(null);
    } else {
      setExpandedCallId(id);
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
    setExpandedCallId(null);
  };

  const getConfidenceColor = (score) => {
    if (score >= 90) return "#10b981";
    if (score >= 70) return "#f59e0b";
    return "#ef4444";
  };

  const getStatusBadge = (status) => {
    if (status === "Completed")
      return <Badge variant="success">{status}</Badge>;
    if (status === "Escalated")
      return <Badge variant="warning">{status}</Badge>;
    if (status === "Error") return <Badge variant="danger">{status}</Badge>;
    return <Badge>{status}</Badge>;
  };

  return (
    <div
      className="p-8 font-manrope"
      style={{ backgroundColor: "#060606", minHeight: "100vh" }}
    >
      <ToastContainer theme="dark" limit={1} />
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
          Call <GradientText>History</GradientText>
        </h1>
        <p className="text-gray-400">
          Review transcripts, listen to recordings, and improve AI accuracy.
        </p>
      </header>

      {/* Filters */}
      <DashboardCard className="mb-6">
        <div className="flex gap-4 flex-wrap items-center">
          <div className="relative flex-1 min-w-[200px]">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search caller name or number..."
              value={filters.search}
              onChange={(e) =>
                setFilters({ ...filters, search: e.target.value })
              }
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-white/10 bg-[#060606] text-white text-sm outline-none focus:border-[#A93E17]"
            />
          </div>
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="px-4 py-2 rounded-lg border border-white/10 bg-[#060606] text-white text-sm outline-none cursor-pointer min-w-[150px]"
          >
            <option value="All">All Statuses</option>
            <option value="Completed">Completed</option>
            <option value="Escalated">Escalated</option>
            <option value="Error">Error</option>
          </select>
          <select
            value={filters.intent}
            onChange={(e) => setFilters({ ...filters, intent: e.target.value })}
            className="px-4 py-2 rounded-lg border border-white/10 bg-[#060606] text-white text-sm outline-none cursor-pointer min-w-[150px]"
          >
            <option value="All">All Intents</option>
            {INTENTS.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </div>
      </DashboardCard>

      {/* Call Table */}
      <DashboardCard>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left pb-3 text-gray-400 font-medium text-xs uppercase">
                  Time
                </th>
                <th className="text-left pb-3 text-gray-400 font-medium text-xs uppercase">
                  Caller
                </th>
                <th className="text-left pb-3 text-gray-400 font-medium text-xs uppercase">
                  Duration
                </th>
                <th className="text-left pb-3 text-gray-400 font-medium text-xs uppercase">
                  Intent
                </th>
                <th className="text-left pb-3 text-gray-400 font-medium text-xs uppercase">
                  Confidence
                </th>
                <th className="text-left pb-3 text-gray-400 font-medium text-xs uppercase">
                  Status
                </th>
                <th className="text-left pb-3 text-gray-400 font-medium text-xs uppercase">
                  Feedback
                </th>
                <th className="w-10"></th>
              </tr>
            </thead>
            <tbody>
              {filteredCalls.map((call) => (
                <React.Fragment key={call.id}>
                  <tr
                    className={`cursor-pointer border-b border-white/5 hover:bg-white/5 transition ${
                      expandedCallId === call.id ? "bg-white/5" : ""
                    }`}
                    onClick={() => toggleExpand(call.id)}
                  >
                    <td className="py-3 text-gray-300 text-sm">{call.time}</td>
                    <td className="py-3">
                      <div className="font-semibold text-white text-sm">
                        {call.caller}
                      </div>
                      <div className="text-xs text-gray-400">{call.phone}</div>
                    </td>
                    <td className="py-3 text-gray-300 text-sm">
                      {call.duration}
                    </td>
                    <td className="py-3 text-gray-300 text-sm">
                      {call.intent}
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full"
                            style={{
                              width: `${call.confidence}%`,
                              backgroundColor: getConfidenceColor(
                                call.confidence
                              ),
                            }}
                          />
                        </div>
                        <span
                          className="text-xs font-semibold"
                          style={{ color: getConfidenceColor(call.confidence) }}
                        >
                          {call.confidence}%
                        </span>
                      </div>
                    </td>
                    <td className="py-3">{getStatusBadge(call.status)}</td>
                    <td className="py-3">
                      {call.feedback === "correct" && (
                        <FaCheck className="text-green-400" />
                      )}
                      {call.feedback === "incorrect" && (
                        <FaTimes className="text-red-400" />
                      )}
                      {call.feedback === "partial" && (
                        <FaExclamationTriangle className="text-yellow-400" />
                      )}
                      {!call.feedback && (
                        <span className="text-gray-600">-</span>
                      )}
                    </td>
                    <td className="py-3">
                      {expandedCallId === call.id ? (
                        <FaChevronUp className="text-gray-400" />
                      ) : (
                        <FaChevronDown className="text-gray-400" />
                      )}
                    </td>
                  </tr>

                  {/* Expanded Detail View */}
                  {expandedCallId === call.id && (
                    <tr>
                      <td colSpan="8" className="p-0">
                        <div className="p-6 bg-black/30 border-b border-white/10">
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Left: Transcript */}
                            <div>
                              <h3 className="text-lg font-semibold text-white mb-4">
                                Call Transcript
                              </h3>

                              {/* Mock Audio Player */}
                              <div className="bg-white/5 border border-white/10 rounded-lg p-3 mb-4 flex items-center gap-4">
                                <button className="w-10 h-10 rounded-full bg-gradient-to-r from-[#15399A] to-[#A93E17] flex items-center justify-center text-white hover:opacity-90 transition">
                                  <FaPlay className="text-sm ml-0.5" />
                                </button>
                                <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                                  <div className="w-1/3 h-full bg-gradient-to-r from-[#15399A] to-[#A93E17]" />
                                </div>
                                <span className="text-xs text-gray-400">
                                  0:45 / {call.duration}
                                </span>
                              </div>

                              {/* Transcript */}
                              <div className="bg-white/5 border border-white/10 rounded-lg p-4 max-h-80 overflow-y-auto space-y-3">
                                {call.transcript.map((msg, i) => (
                                  <div
                                    key={i}
                                    className={`flex flex-col ${
                                      msg.speaker === "AI"
                                        ? "items-start"
                                        : "items-end"
                                    }`}
                                  >
                                    <div className="flex items-center gap-2 mb-1">
                                      {msg.speaker === "AI" ? (
                                        <FaRobot className="text-[#A93E17] text-xs" />
                                      ) : (
                                        <FaUser className="text-[#15399A] text-xs" />
                                      )}
                                      <span className="text-xs text-gray-400">
                                        {msg.speaker} • {msg.time}
                                      </span>
                                    </div>
                                    <div
                                      className={`max-w-[80%] px-4 py-2 rounded-lg text-sm ${
                                        msg.speaker === "AI"
                                          ? "bg-[#A93E17]/20 text-gray-200 rounded-tl-none"
                                          : "bg-[#15399A]/20 text-gray-200 rounded-tr-none"
                                      }`}
                                    >
                                      {msg.text}
                                    </div>
                                    {msg.meta && (
                                      <div className="text-xs text-gray-500 mt-1">
                                        Intent: {msg.meta.intent} (
                                        {msg.meta.confidence}%)
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Right: Review & Feedback */}
                            <div>
                              <h3 className="text-lg font-semibold text-white mb-4">
                                Review & Feedback
                              </h3>
                              <p className="text-sm text-gray-400 mb-4">
                                Was the AI response correct for this call?
                              </p>
                              <div className="space-y-3 mb-6">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setFeedbackForm({
                                      ...feedbackForm,
                                      type: "correct",
                                    });
                                  }}
                                  className={`w-full px-4 py-3 rounded-lg border flex items-center gap-3 transition ${
                                    feedbackForm.type === "correct"
                                      ? "bg-green-500/20 border-green-500 text-green-400"
                                      : "bg-transparent border-white/10 text-gray-400 hover:border-green-500/50"
                                  }`}
                                >
                                  <FaCheck /> Correct Response
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setFeedbackForm({
                                      ...feedbackForm,
                                      type: "incorrect",
                                    });
                                  }}
                                  className={`w-full px-4 py-3 rounded-lg border flex items-center gap-3 transition ${
                                    feedbackForm.type === "incorrect"
                                      ? "bg-red-500/20 border-red-500 text-red-400"
                                      : "bg-transparent border-white/10 text-gray-400 hover:border-red-500/50"
                                  }`}
                                >
                                  <FaTimes /> Incorrect Response
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setFeedbackForm({
                                      ...feedbackForm,
                                      type: "partial",
                                    });
                                  }}
                                  className={`w-full px-4 py-3 rounded-lg border flex items-center gap-3 transition ${
                                    feedbackForm.type === "partial"
                                      ? "bg-yellow-500/20 border-yellow-500 text-yellow-400"
                                      : "bg-transparent border-white/10 text-gray-400 hover:border-yellow-500/50"
                                  }`}
                                >
                                  <FaExclamationTriangle /> Partially Correct
                                </button>
                              </div>

                              {feedbackForm.type === "incorrect" && (
                                <div className="mb-4">
                                  <label className="block text-sm text-gray-300 mb-2">
                                    What should the correct intent be?
                                  </label>
                                  <select
                                    onClick={(e) => e.stopPropagation()}
                                    value={feedbackForm.correctIntent}
                                    onChange={(e) =>
                                      setFeedbackForm({
                                        ...feedbackForm,
                                        correctIntent: e.target.value,
                                      })
                                    }
                                    className="w-full px-3 py-2 rounded-lg border border-white/10 bg-[#060606] text-white text-sm outline-none"
                                  >
                                    <option value="">
                                      Select correct intent
                                    </option>
                                    {INTENTS.map((i) => (
                                      <option key={i} value={i}>
                                        {i}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              )}

                              <div className="mb-4">
                                <label className="block text-sm text-gray-300 mb-2">
                                  Additional notes (optional)
                                </label>
                                <textarea
                                  onClick={(e) => e.stopPropagation()}
                                  value={feedbackForm.details}
                                  onChange={(e) =>
                                    setFeedbackForm({
                                      ...feedbackForm,
                                      details: e.target.value,
                                    })
                                  }
                                  placeholder="Any additional feedback..."
                                  className="w-full px-3 py-2 rounded-lg border border-white/10 bg-[#060606] text-white text-sm outline-none min-h-[80px] resize-none"
                                />
                              </div>

                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleFeedbackSubmit(call.id);
                                }}
                                className="w-full px-6 py-3 rounded-full text-white font-semibold bg-gradient-to-r from-[#15399A] to-[#A93E17] hover:opacity-90 transition"
                              >
                                Submit Feedback
                              </button>
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
      </DashboardCard>
    </div>
  );
}
