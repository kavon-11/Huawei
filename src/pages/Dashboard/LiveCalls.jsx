import React, { useState, useEffect, useRef } from "react";
import {
  FaPhone,
  FaClock,
  FaStop,
  FaHeadphones,
  FaMicrophoneSlash,
  FaSync,
  FaUser,
  FaRobot,
  FaPlay,
  FaPause,
  FaTimes,
} from "react-icons/fa";
import DashboardCard from "../../components/DashboardCard";
import GradientText from "../../components/GradientText";

// Mock Data Generator
const generateMockTranscript = (count) => {
  const lines = [
    { speaker: "Caller", text: "Is there parking available?" },
    { speaker: "AI", text: "Yes, we have a free lot in the back." },
    { speaker: "Caller", text: "Great, thanks." },
    { speaker: "AI", text: "Is there anything else I can help with?" },
    { speaker: "Caller", text: "Actually, I'd like to book a table." },
    { speaker: "AI", text: "I can help with that. For how many people?" },
    { speaker: "Caller", text: "Just two of us." },
    { speaker: "AI", text: "And for what date and time?" },
  ];
  return lines[count % lines.length];
};

export default function LiveCalls() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeCalls, setActiveCalls] = useState([
    {
      id: 101,
      caller: "+1 (555) 123-4567",
      startTime: Date.now() - 135000, // started 2m 15s ago
      intent: "schedule_appointment",
      confidence: 94,
      lastCallerText: "I'd like to book an appointment",
      lastAiText: "Sure! What date works for you?",
      transcript: [
        { speaker: "Caller", text: "Hi, are you open?" },
        { speaker: "AI", text: "Yes, we are open until 9 PM." },
        { speaker: "Caller", text: "I'd like to book an appointment" },
        { speaker: "AI", text: "Sure! What date works for you?" },
      ],
    },
    {
      id: 102,
      caller: "Sarah Jenkins",
      startTime: Date.now() - 45000, // started 45s ago
      intent: "check_hours",
      confidence: 88,
      lastCallerText: "When do you close today?",
      lastAiText: "We close at 9 PM today.",
      transcript: [
        { speaker: "Caller", text: "Hello." },
        {
          speaker: "AI",
          text: "Hello! Thanks for calling SkyAlex Dental Clinic.",
        },
        { speaker: "Caller", text: "When do you close today?" },
        { speaker: "AI", text: "We close at 8 PM today." },
      ],
    },
  ]);

  const [monitoredCallId, setMonitoredCallId] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const transcriptEndRef = useRef(null);

  // Update current time
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Simulate live updates (duration tick & random transcript updates)
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCalls((prevCalls) =>
        prevCalls.map((call) => {
          // Randomly add transcript line to simulate conversation
          if (Math.random() > 0.7) {
            const newLine = generateMockTranscript(call.transcript.length);
            const updatedTranscript = [...call.transcript, newLine];
            return {
              ...call,
              transcript: updatedTranscript,
              lastCallerText:
                newLine.speaker === "Caller"
                  ? newLine.text
                  : call.lastCallerText,
              lastAiText:
                newLine.speaker === "AI" ? newLine.text : call.lastAiText,
            };
          }
          return call;
        })
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Auto-scroll transcript
  useEffect(() => {
    if (monitoredCallId && transcriptEndRef.current) {
      transcriptEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [activeCalls, monitoredCallId]);

  const formatDuration = (startTime) => {
    const diff = Math.floor((Date.now() - startTime) / 1000);
    const mins = Math.floor(diff / 60);
    const secs = diff % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleInterrupt = (id) => {
    alert(`Interrupted call ${id}. Taking over manual control.`);
    // Logic to switch to manual mode would go here
  };

  const handleMute = (id) => {
    alert(`Call ${id} muted.`);
  };

  const monitoredCall = activeCalls.find((c) => c.id === monitoredCallId);

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

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
    gap: "1.5rem",
  };

  const cardStyle = {
    backgroundColor: "#1e293b",
    borderRadius: "12px",
    padding: "1.5rem",
    border: "1px solid #334155",
    position: "relative",
    overflow: "hidden",
  };

  const activeIndicatorStyle = {
    position: "absolute",
    top: "1rem",
    right: "1rem",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    color: "#4ade80",
    fontSize: "0.8rem",
    fontWeight: "600",
  };

  const pulseStyle = {
    width: "8px",
    height: "8px",
    backgroundColor: "#4ade80",
    borderRadius: "50%",
    boxShadow: "0 0 0 0 rgba(74, 222, 128, 0.7)",
    animation: "pulse 2s infinite",
  };

  const buttonStyle = (variant = "primary") => ({
    padding: "0.5rem 1rem",
    backgroundColor:
      variant === "primary"
        ? "#3b82f6"
        : variant === "danger"
        ? "#ef4444"
        : "#334155",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "0.85rem",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    flex: 1,
    justifyContent: "center",
  });

  const transcriptContainerStyle = {
    backgroundColor: "#0f172a",
    borderRadius: "8px",
    padding: "1rem",
    height: "300px",
    overflowY: "auto",
    border: "1px solid #334155",
    marginTop: "1rem",
  };

  const messageStyle = (speaker) => ({
    marginBottom: "0.75rem",
    display: "flex",
    flexDirection: "column",
    alignItems: speaker === "AI" ? "flex-start" : "flex-end",
  });

  const bubbleStyle = (speaker) => ({
    backgroundColor: speaker === "AI" ? "#1e3a8a" : "#334155",
    color: "#e2e8f0",
    padding: "0.6rem 1rem",
    borderRadius: "12px",
    maxWidth: "85%",
    borderTopLeftRadius: speaker === "AI" ? "2px" : "12px",
    borderTopRightRadius: speaker === "Caller" ? "2px" : "12px",
    fontSize: "0.9rem",
  });

  return (
    <div style={containerStyle}>
      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(74, 222, 128, 0.7); }
            70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(74, 222, 128, 0); }
            100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(74, 222, 128, 0); }
          }
        `}
      </style>

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
            Live Call Monitoring
          </h1>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginTop: "0.5rem",
              color: "#94a3b8",
            }}
          >
            <FaClock />
            <span>{currentTime.toLocaleTimeString()}</span>
            <span>•</span>
            <span>{activeCalls.length} Active Calls</span>
          </div>
        </div>
        <button
          onClick={() => window.location.reload()}
          style={{ ...buttonStyle("secondary"), flex: "0 0 auto" }}
        >
          <FaSync /> Refresh
        </button>
      </header>

      {activeCalls.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "4rem",
            color: "#64748b",
            backgroundColor: "#1e293b",
            borderRadius: "12px",
            border: "1px solid #334155",
          }}
        >
          <FaPhone size={48} style={{ marginBottom: "1rem", opacity: 0.5 }} />
          <h3>No active calls right now</h3>
          <p>Last call ended 5 minutes ago.</p>
        </div>
      ) : (
        <div style={gridStyle}>
          {activeCalls.map((call) => (
            <div key={call.id} style={cardStyle}>
              <div style={activeIndicatorStyle}>
                <div style={pulseStyle} />
                LIVE
              </div>

              <div style={{ marginBottom: "1.5rem" }}>
                <h3
                  style={{
                    margin: "0 0 0.25rem 0",
                    color: "#f8fafc",
                    fontSize: "1.2rem",
                  }}
                >
                  {call.caller}
                </h3>
                <p style={{ margin: 0, color: "#94a3b8", fontSize: "0.9rem" }}>
                  Duration:{" "}
                  <span style={{ color: "#e2e8f0", fontWeight: "600" }}>
                    {formatDuration(call.startTime)}
                  </span>
                </p>
              </div>

              <div
                style={{
                  backgroundColor: "#0f172a",
                  padding: "1rem",
                  borderRadius: "8px",
                  marginBottom: "1.5rem",
                  fontSize: "0.9rem",
                }}
              >
                <div style={{ marginBottom: "0.75rem" }}>
                  <span
                    style={{
                      color: "#94a3b8",
                      fontSize: "0.75rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Caller just said:
                  </span>
                  <p style={{ margin: "0.25rem 0 0", color: "#e2e8f0" }}>
                    "{call.lastCallerText}"
                  </p>
                </div>
                <div>
                  <span
                    style={{
                      color: "#94a3b8",
                      fontSize: "0.75rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    AI Responding:
                  </span>
                  <p style={{ margin: "0.25rem 0 0", color: "#3b82f6" }}>
                    "{call.lastAiText}"
                  </p>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "1.5rem",
                  fontSize: "0.85rem",
                  flexWrap: "wrap",
                  gap: "0.5rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <span style={{ color: "#94a3b8" }}>Intent:</span>
                  <span
                    style={{
                      backgroundColor: "#334155",
                      padding: "0.2rem 0.5rem",
                      borderRadius: "4px",
                      color: "#cbd5f5",
                    }}
                  >
                    {formatIntentName(call.intent)}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <span style={{ color: "#94a3b8" }}>Confidence:</span>
                  <span
                    style={{
                      color: call.confidence > 90 ? "#4ade80" : "#fbbf24",
                      fontWeight: "600",
                    }}
                  >
                    {call.confidence}%
                  </span>
                </div>
              </div>

              <div
                style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}
              >
                <button
                  style={{ ...buttonStyle("primary"), flex: "1 1 auto" }}
                  onClick={() => setMonitoredCallId(call.id)}
                >
                  <FaHeadphones /> Monitor
                </button>
                <button
                  style={{ ...buttonStyle("danger"), flex: "1 1 auto" }}
                  onClick={() => handleInterrupt(call.id)}
                >
                  <FaStop /> Interrupt
                </button>
                <button
                  style={{ ...buttonStyle("secondary"), flex: "1 1 auto" }}
                  onClick={() => handleMute(call.id)}
                >
                  <FaMicrophoneSlash /> Mute
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Live Transcript Modal/Overlay */}
      {monitoredCall && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
            padding: "1rem",
          }}
        >
          <div
            style={{
              backgroundColor: "#1e293b",
              width: "100%",
              maxWidth: "600px",
              borderRadius: "12px",
              border: "1px solid #334155",
              display: "flex",
              flexDirection: "column",
              maxHeight: "90vh",
            }}
          >
            <div
              style={{
                padding: "1.5rem",
                borderBottom: "1px solid #334155",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <h3 style={{ margin: 0, color: "#f8fafc" }}>
                  Monitoring: {monitoredCall.caller}
                </h3>
                <p
                  style={{
                    margin: "0.25rem 0 0",
                    color: "#4ade80",
                    fontSize: "0.85rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <span style={pulseStyle} /> Live Audio Stream
                </p>
              </div>
              <button
                onClick={() => setMonitoredCallId(null)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#94a3b8",
                  cursor: "pointer",
                  fontSize: "1.2rem",
                }}
              >
                <FaTimes />
              </button>
            </div>

            <div style={{ padding: "1.5rem", overflowY: "auto", flex: 1 }}>
              {/* Audio Controls */}
              <div
                style={{
                  backgroundColor: "#0f172a",
                  padding: "1rem",
                  borderRadius: "8px",
                  marginBottom: "1.5rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    backgroundColor: "#3b82f6",
                    border: "none",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  {isPlaying ? (
                    <FaPause />
                  ) : (
                    <FaPlay style={{ marginLeft: "2px" }} />
                  )}
                </button>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      height: "4px",
                      backgroundColor: "#334155",
                      borderRadius: "2px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        backgroundColor: "#4ade80",
                        animation: isPlaying ? "pulse 1s infinite" : "none",
                      }}
                    />
                  </div>
                </div>
                <span
                  style={{
                    color: "#e2e8f0",
                    fontSize: "0.9rem",
                    fontWeight: "600",
                  }}
                >
                  {formatDuration(monitoredCall.startTime)}
                </span>
              </div>

              {/* Transcript */}
              <div style={{ display: "flex", flexDirection: "column" }}>
                {monitoredCall.transcript.map((line, idx) => (
                  <div key={idx} style={messageStyle(line.speaker)}>
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
                      {line.speaker === "AI" ? <FaRobot /> : <FaUser />}
                      {line.speaker}
                    </div>
                    <div style={bubbleStyle(line.speaker)}>{line.text}</div>
                  </div>
                ))}
                <div ref={transcriptEndRef} />
              </div>
            </div>

            <div
              style={{
                padding: "1.5rem",
                borderTop: "1px solid #334155",
                display: "flex",
                gap: "1rem",
                flexWrap: "wrap",
              }}
            >
              <button
                style={{ ...buttonStyle("danger"), flex: "1 1 auto" }}
                onClick={() => handleInterrupt(monitoredCall.id)}
              >
                <FaStop /> Take Over Call
              </button>
              <button
                style={{ ...buttonStyle("secondary"), flex: "1 1 auto" }}
                onClick={() => setMonitoredCallId(null)}
              >
                Stop Monitoring
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
