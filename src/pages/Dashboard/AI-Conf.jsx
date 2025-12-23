import React, { useState } from "react";
import {
  FaPlay,
  FaSave,
  FaEdit,
  FaTrash,
  FaPlus,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import DashboardCard from "../../components/DashboardCard";
import GradientText from "../../components/GradientText";

export default function AIConf() {
  const [activeTab, setActiveTab] = useState("basic");

  // --- Tab 1: Basic Settings State ---
  const [basicSettings, setBasicSettings] = useState({
    aiName: "Reception Bot",
    personality: "Professional",
    welcomeMessage: "Thank you for calling Restaurant XYZ, how can I help?",
    closingMessage: "Thank you for calling, have a great day!",
    afterHoursMessage: "We're currently closed. We'll reopen at 9 AM tomorrow.",
    businessHours: {
      monday: { open: "09:00", close: "17:00", active: true },
      tuesday: { open: "09:00", close: "17:00", active: true },
      wednesday: { open: "09:00", close: "17:00", active: true },
      thursday: { open: "09:00", close: "17:00", active: true },
      friday: { open: "09:00", close: "17:00", active: true },
      saturday: { open: "10:00", close: "15:00", active: true },
      sunday: { open: "09:00", close: "17:00", active: false },
    },
  });

  // --- Tab 2: Voice Settings State ---
  const [voiceSettings, setVoiceSettings] = useState({
    voice: "Female (American)",
    speed: 1, // 0.5 to 2
    language: "English (US)",
  });

  // --- Tab 3: Response Settings State ---
  const [intents, setIntents] = useState([
    {
      id: 1,
      name: "schedule_appointment",
      keywords: "book, appointment, reserve, schedule",
      response: "I can help schedule an appointment. What date works for you?",
      active: true,
      expanded: false,
    },
    {
      id: 2,
      name: "answer_faq",
      keywords: "hours, menu, price, location",
      response: "[Answer from knowledge base]",
      active: true,
      expanded: false,
    },
    {
      id: 3,
      name: "order_food",
      keywords: "order, delivery, takeout",
      response: "I can help with that. What would you like to order?",
      active: true,
      expanded: false,
    },
    {
      id: 4,
      name: "technical_support",
      keywords: "problem, issue, help, broken",
      response: "Let me connect you with our technical team.",
      active: true,
      expanded: false,
    },
    {
      id: 5,
      name: "callback",
      keywords: "call me back, speak to someone, human",
      response: "Of course! I'll have someone call you back shortly.",
      active: true,
      expanded: false,
    },
  ]);

  // --- Tab 4: Escalation Rules State ---
  const [escalationRules, setEscalationRules] = useState({
    confidenceThreshold: 70,
    escalationKeywords: "angry, complaint, rude, urgent",
    vipDetection: false,
    vipNumbers: "",
    callbackScheduling: "After 2 attempts",
    maxRetries: 2,
  });

  // --- NEW: Tab 5: Call Goals & Capture Rules State ---
  const [callGoals, setCallGoals] = useState({
    mainOutcomes: {
      leadCapture: true,
      appointmentBooking: false,
      supportTriage: false,
      faqsOnly: false,
    },
    requiredFields: {
      name: true,
      phone: true,
      email: false,
      reasonForCall: true,
      budget: false,
    },
    neverDoRules:
      "Do not provide medical advice, do not confirm financial terms without a manager.",
    escalationConditions: {
      angryCaller: true,
      legalIssue: true,
      emergency: true,
      vipNumbers: false,
    },
    vipNumbers: "+2010...",
  });

  // --- Handlers ---

  const handleBasicChange = (e) => {
    const { name, value } = e.target;
    setBasicSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleBusinessHoursChange = (day, field, value) => {
    setBasicSettings((prev) => ({
      ...prev,
      businessHours: {
        ...prev.businessHours,
        [day]: { ...prev.businessHours[day], [field]: value },
      },
    }));
  };

  const handleVoiceChange = (e) => {
    const { name, value } = e.target;
    setVoiceSettings((prev) => ({ ...prev, [name]: value }));
  };

  const toggleIntentExpand = (id) => {
    setIntents((prev) =>
      prev.map((intent) =>
        intent.id === id ? { ...intent, expanded: !intent.expanded } : intent
      )
    );
  };

  const handleIntentChange = (id, field, value) => {
    setIntents((prev) =>
      prev.map((intent) =>
        intent.id === id ? { ...intent, [field]: value } : intent
      )
    );
  };

  const deleteIntent = (id) => {
    setIntents((prev) => prev.filter((intent) => intent.id !== id));
  };

  const addIntent = () => {
    const newId = Math.max(...intents.map((i) => i.id), 0) + 1;
    setIntents((prev) => [
      ...prev,
      {
        id: newId,
        name: "New Intent",
        keywords: "",
        response: "",
        active: true,
        expanded: true,
      },
    ]);
  };

  const handleEscalationChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEscalationRules((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // NEW: Handler for call goals
  const handleCallGoalsChange = (section, key, value) => {
    if (
      section === "mainOutcomes" ||
      section === "requiredFields" ||
      section === "escalationConditions"
    ) {
      setCallGoals((prev) => ({
        ...prev,
        [section]: { ...prev[section], [key]: value },
      }));
    } else {
      setCallGoals((prev) => ({ ...prev, [section]: value }));
    }
  };

  const playPreview = (text) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = voiceSettings.speed;
      // Note: Actual voice selection requires matching available system voices
      window.speechSynthesis.speak(utterance);
    } else {
      alert(`Previewing: "${text}"`);
    }
  };

  // --- Styles ---
  const containerStyle = {
    padding: "1rem",
    backgroundColor: "#060606",
    minHeight: "100vh",
    color: "#e2e8f0",
    fontFamily: "'Manrope', sans-serif",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const headerStyle = {
    marginBottom: "2rem",
    textAlign: "center",
    width: "100%",
    maxWidth: "800px",
  };

  const tabContainerStyle = {
    display: "flex",
    gap: "0.5rem",
    marginBottom: "2rem",
    borderBottom: "1px solid #334155",
    paddingBottom: "0.5rem",
    overflowX: "auto",
    width: "100%",
    maxWidth: "800px",
    justifyContent: "flex-start", // Allow scrolling on mobile
    scrollbarWidth: "none", // Hide scrollbar for cleaner look
  };

  const tabStyle = (isActive) => ({
    padding: "0.75rem 1rem",
    background: isActive
      ? "linear-gradient(to right, #15399A, #A93E17)"
      : "transparent",
    color: isActive ? "white" : "#94a3b8",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "0.9rem",
    transition: "all 0.2s",
    whiteSpace: "nowrap",
    flexShrink: 0,
  });

  const sectionStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: "12px",
    padding: "1.5rem", // Reduced padding for mobile
    border: "1px solid rgba(255, 255, 255, 0.1)",
    width: "100%",
    maxWidth: "800px",
    boxSizing: "border-box",
    backdropFilter: "blur(12px)",
  };

  const fieldGroupStyle = {
    marginBottom: "1.5rem",
    width: "100%",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "0.5rem",
    fontWeight: "600",
    color: "#e2e8f0",
  };

  const inputStyle = {
    width: "100%",
    padding: "0.75rem",
    borderRadius: "8px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    color: "white",
    fontSize: "0.95rem",
    outline: "none",
  };

  const textAreaStyle = {
    ...inputStyle,
    minHeight: "100px",
    resize: "vertical",
  };

  const buttonStyle = {
    padding: "0.75rem 1.5rem",
    background: "linear-gradient(to right, #15399A, #A93E17)",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "0.9rem",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    marginTop: "1rem",
  };

  const previewButtonStyle = {
    ...buttonStyle,
    background: "rgba(255, 255, 255, 0.1)",
    fontSize: "0.8rem",
    padding: "0.5rem 1rem",
    marginTop: "0.5rem",
  };

  const rowStyle = {
    display: "flex",
    gap: "1rem",
    alignItems: "center",
    marginBottom: "0.5rem",
    flexWrap: "wrap", // Allow wrapping on small screens
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
          AI Configuration
        </h1>
        <p style={{ color: "#94a3b8", marginTop: "0.5rem" }}>
          Customize how your AI behaves, speaks, and handles calls.
        </p>
      </header>

      {/* Tabs */}
      <div style={tabContainerStyle}>
        {["basic", "voice", "response", "goals", "escalation"].map((tab) => (
          <button
            key={tab}
            style={tabStyle(activeTab === tab)}
            onClick={() => setActiveTab(tab)}
          >
            {tab === "goals"
              ? "Call Goals"
              : tab.charAt(0).toUpperCase() + tab.slice(1)}{" "}
            Settings
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div style={sectionStyle}>
        {/* --- Tab 1: Basic Settings --- */}
        {activeTab === "basic" && (
          <div>
            <div style={fieldGroupStyle}>
              <label style={labelStyle}>AI Name</label>
              <input
                type="text"
                name="aiName"
                value={basicSettings.aiName}
                onChange={handleBasicChange}
                style={inputStyle}
                placeholder="e.g., Reception Bot"
              />
              <p
                style={{
                  fontSize: "0.8rem",
                  color: "#94a3b8",
                  marginTop: "0.25rem",
                }}
              >
                What should your customers call your AI?
              </p>
            </div>

            <div style={fieldGroupStyle}>
              <label style={labelStyle}>AI Personality Tone</label>
              <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
                {["Professional", "Friendly", "Casual"].map((tone) => (
                  <label
                    key={tone}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      color: "#e2e8f0",
                      cursor: "pointer",
                    }}
                  >
                    <input
                      type="radio"
                      name="personality"
                      value={tone}
                      checked={basicSettings.personality === tone}
                      onChange={handleBasicChange}
                    />
                    {tone}
                  </label>
                ))}
              </div>
            </div>

            {[
              { key: "welcomeMessage", label: "Welcome Message" },
              { key: "closingMessage", label: "Closing Message" },
              { key: "afterHoursMessage", label: "After-Hours Message" },
            ].map((field) => (
              <div key={field.key} style={fieldGroupStyle}>
                <label style={labelStyle}>{field.label}</label>
                <textarea
                  name={field.key}
                  value={basicSettings[field.key]}
                  onChange={handleBasicChange}
                  style={textAreaStyle}
                  maxLength={300}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span style={{ fontSize: "0.8rem", color: "#94a3b8" }}>
                    {basicSettings[field.key].length}/300
                  </span>
                  <button
                    style={previewButtonStyle}
                    onClick={() => playPreview(basicSettings[field.key])}
                  >
                    <FaPlay /> Preview
                  </button>
                </div>
              </div>
            ))}

            <div style={fieldGroupStyle}>
              <label style={labelStyle}>Business Hours</label>
              {Object.entries(basicSettings.businessHours).map(
                ([day, hours]) => (
                  <div
                    key={day}
                    style={{
                      ...rowStyle,
                      justifyContent: "space-between",
                      padding: "0.5rem 0",
                      borderBottom: "1px solid #334155",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                        minWidth: "120px",
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={hours.active}
                        onChange={(e) =>
                          handleBusinessHoursChange(
                            day,
                            "active",
                            e.target.checked
                          )
                        }
                      />
                      <span
                        style={{
                          textTransform: "capitalize",
                          color: hours.active ? "#e2e8f0" : "#64748b",
                        }}
                      >
                        {day}
                      </span>
                    </div>
                    {hours.active ? (
                      <div
                        style={{
                          display: "flex",
                          gap: "0.5rem",
                          alignItems: "center",
                          flexWrap: "wrap",
                        }}
                      >
                        <input
                          type="time"
                          value={hours.open}
                          onChange={(e) =>
                            handleBusinessHoursChange(
                              day,
                              "open",
                              e.target.value
                            )
                          }
                          style={{
                            ...inputStyle,
                            width: "auto",
                            padding: "0.4rem",
                            minWidth: "100px",
                          }}
                        />
                        <span>to</span>
                        <input
                          type="time"
                          value={hours.close}
                          onChange={(e) =>
                            handleBusinessHoursChange(
                              day,
                              "close",
                              e.target.value
                            )
                          }
                          style={{
                            ...inputStyle,
                            width: "auto",
                            padding: "0.4rem",
                            minWidth: "100px",
                          }}
                        />
                      </div>
                    ) : (
                      <span style={{ color: "#64748b", fontStyle: "italic" }}>
                        Closed
                      </span>
                    )}
                  </div>
                )
              )}
            </div>

            <button style={buttonStyle}>
              <FaSave /> Save Changes
            </button>
          </div>
        )}

        {/* --- Tab 2: Voice Settings --- */}
        {activeTab === "voice" && (
          <div>
            <div style={fieldGroupStyle}>
              <label style={labelStyle}>Voice Selection</label>
              <select
                name="voice"
                value={voiceSettings.voice}
                onChange={handleVoiceChange}
                style={inputStyle}
              >
                <option>Male (American)</option>
                <option>Female (American)</option>
                <option>Male (British)</option>
                <option>Female (British)</option>
                <option>Neutral (Gender-neutral)</option>
              </select>
            </div>

            <div style={fieldGroupStyle}>
              <label style={labelStyle}>
                Voice Speed: {voiceSettings.speed}x
              </label>
              <input
                type="range"
                name="speed"
                min="0.5"
                max="2"
                step="0.1"
                value={voiceSettings.speed}
                onChange={handleVoiceChange}
                style={{ width: "100%", accentColor: "#3b82f6" }}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "0.8rem",
                  color: "#94a3b8",
                }}
              >
                <span>Slow</span>
                <span>Normal</span>
                <span>Fast</span>
              </div>
            </div>

            <div style={fieldGroupStyle}>
              <label style={labelStyle}>Language / Accent</label>
              <select
                name="language"
                value={voiceSettings.language}
                onChange={handleVoiceChange}
                style={inputStyle}
              >
                <option>English (US)</option>
                <option>English (UK)</option>
                <option>Arabic</option>
                <option>Spanish</option>
              </select>
            </div>

            <div
              style={{
                ...fieldGroupStyle,
                textAlign: "center",
                padding: "2rem",
                backgroundColor: "#0f172a",
                borderRadius: "8px",
              }}
            >
              <button
                style={{
                  ...buttonStyle,
                  margin: "0 auto",
                  fontSize: "1.1rem",
                  padding: "1rem 2rem",
                }}
                onClick={() =>
                  playPreview(
                    `Hello, this is ${basicSettings.aiName}. How can I help you today?`
                  )
                }
              >
                <FaPlay /> Click to hear a sample
              </button>
              <p style={{ marginTop: "1rem", color: "#94a3b8" }}>
                Plays greeting in selected voice and speed
              </p>
            </div>

            <button style={buttonStyle}>
              <FaSave /> Save Voice Settings
            </button>
          </div>
        )}

        {/* --- Tab 3: Response Settings --- */}
        {activeTab === "response" && (
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1.5rem",
              }}
            >
              <h3 style={{ margin: 0, color: "#f8fafc" }}>Intent Responses</h3>
              <button
                style={{ ...buttonStyle, marginTop: 0, padding: "0.5rem 1rem" }}
                onClick={addIntent}
              >
                <FaPlus /> Add Intent
              </button>
            </div>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              {intents.map((intent) => (
                <div
                  key={intent.id}
                  style={{
                    border: "1px solid #334155",
                    borderRadius: "8px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      padding: "1rem",
                      backgroundColor: "#0f172a",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      cursor: "pointer",
                      flexWrap: "wrap", // Allow wrapping
                      gap: "0.5rem",
                    }}
                    onClick={() => toggleIntentExpand(intent.id)}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                      }}
                    >
                      {intent.expanded ? <FaChevronUp /> : <FaChevronDown />}
                      <span style={{ fontWeight: "600", color: "#e2e8f0" }}>
                        {intent.name}
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "0.8rem",
                          color: intent.active ? "#4ade80" : "#94a3b8",
                        }}
                      >
                        {intent.active ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </div>

                  {intent.expanded && (
                    <div
                      style={{ padding: "1.5rem", backgroundColor: "#1e293b" }}
                    >
                      <div style={fieldGroupStyle}>
                        <label style={labelStyle}>Intent Name</label>
                        <input
                          type="text"
                          value={intent.name}
                          onChange={(e) =>
                            handleIntentChange(
                              intent.id,
                              "name",
                              e.target.value
                            )
                          }
                          style={inputStyle}
                        />
                      </div>
                      <div style={fieldGroupStyle}>
                        <label style={labelStyle}>
                          Keywords (comma-separated)
                        </label>
                        <input
                          type="text"
                          value={intent.keywords}
                          onChange={(e) =>
                            handleIntentChange(
                              intent.id,
                              "keywords",
                              e.target.value
                            )
                          }
                          style={inputStyle}
                        />
                      </div>
                      <div style={fieldGroupStyle}>
                        <label style={labelStyle}>Response Template</label>
                        <textarea
                          value={intent.response}
                          onChange={(e) =>
                            handleIntentChange(
                              intent.id,
                              "response",
                              e.target.value
                            )
                          }
                          style={textAreaStyle}
                        />
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginTop: "1rem",
                          flexWrap: "wrap",
                          gap: "1rem",
                        }}
                      >
                        <label
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            color: "#e2e8f0",
                            cursor: "pointer",
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={intent.active}
                            onChange={(e) =>
                              handleIntentChange(
                                intent.id,
                                "active",
                                e.target.checked
                              )
                            }
                          />
                          Enable this intent
                        </label>
                        <button
                          style={{
                            ...buttonStyle,
                            backgroundColor: "#ef4444",
                            marginTop: 0,
                            padding: "0.5rem 1rem",
                            fontSize: "0.8rem",
                          }}
                          onClick={() => deleteIntent(intent.id)}
                        >
                          <FaTrash /> Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <button style={buttonStyle}>
              <FaSave /> Save Intent Responses
            </button>
          </div>
        )}

        {/* --- NEW: Tab - Call Goals --- */}
        {activeTab === "goals" && (
          <div>
            <div style={fieldGroupStyle}>
              <h3 style={{ color: "#f8fafc", marginBottom: "1rem" }}>
                Main Call Outcomes
              </h3>
              <p
                style={{
                  fontSize: "0.85rem",
                  color: "#94a3b8",
                  marginBottom: "1rem",
                }}
              >
                Select what this agent should focus on during calls.
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                {[
                  "leadCapture",
                  "appointmentBooking",
                  "supportTriage",
                  "faqsOnly",
                ].map((outcome) => (
                  <label
                    key={outcome}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      padding: "0.75rem",
                      border: "1px solid #334155",
                      borderRadius: "6px",
                      cursor: "pointer",
                      color: "#e2e8f0",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={callGoals.mainOutcomes[outcome]}
                      onChange={(e) =>
                        handleCallGoalsChange(
                          "mainOutcomes",
                          outcome,
                          e.target.checked
                        )
                      }
                      style={{
                        width: "18px",
                        height: "18px",
                        cursor: "pointer",
                      }}
                    />
                    <span style={{ fontWeight: "500" }}>
                      {outcome === "leadCapture"
                        ? "Lead Capture"
                        : outcome === "appointmentBooking"
                        ? "Appointment Booking"
                        : outcome === "supportTriage"
                        ? "Support Triage"
                        : "FAQs Only"}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div style={fieldGroupStyle}>
              <h3 style={{ color: "#f8fafc", marginBottom: "1rem" }}>
                Required Fields to Collect
              </h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                {["name", "phone", "email", "reasonForCall", "budget"].map(
                  (field) => (
                    <label
                      key={field}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                        padding: "0.75rem",
                        border: "1px solid #334155",
                        borderRadius: "6px",
                        cursor: "pointer",
                        color: "#e2e8f0",
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={callGoals.requiredFields[field]}
                        onChange={(e) =>
                          handleCallGoalsChange(
                            "requiredFields",
                            field,
                            e.target.checked
                          )
                        }
                        style={{
                          width: "18px",
                          height: "18px",
                          cursor: "pointer",
                        }}
                      />
                      <span style={{ fontWeight: "500" }}>
                        {field === "reasonForCall"
                          ? "Reason for Call"
                          : field.charAt(0).toUpperCase() + field.slice(1)}
                      </span>
                    </label>
                  )
                )}
              </div>
              <p
                style={{
                  fontSize: "0.8rem",
                  color: "#94a3b8",
                  marginTop: "1rem",
                }}
              >
                The AI will ask for these fields during the call.
              </p>
            </div>

            <div style={fieldGroupStyle}>
              <label style={labelStyle}>Rules: Never Do (optional)</label>
              <textarea
                value={callGoals.neverDoRules}
                onChange={(e) =>
                  handleCallGoalsChange("neverDoRules", null, e.target.value)
                }
                style={textAreaStyle}
                rows={4}
                placeholder="Topics or actions the AI must avoid, e.g. 'Never offer discounts', 'Don't confirm medical diagnoses'"
              />
            </div>

            <div style={fieldGroupStyle}>
              <h3 style={{ color: "#f8fafc", marginBottom: "1rem" }}>
                Escalation Triggers
              </h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                {["angryCaller", "legalIssue", "emergency", "vipNumbers"].map(
                  (trigger) => (
                    <label
                      key={trigger}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                        padding: "0.75rem",
                        border: "1px solid #334155",
                        borderRadius: "6px",
                        cursor: "pointer",
                        color: "#e2e8f0",
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={callGoals.escalationConditions[trigger]}
                        onChange={(e) =>
                          handleCallGoalsChange(
                            "escalationConditions",
                            trigger,
                            e.target.checked
                          )
                        }
                        style={{
                          width: "18px",
                          height: "18px",
                          cursor: "pointer",
                        }}
                      />
                      <span style={{ fontWeight: "500" }}>
                        {trigger === "angryCaller"
                          ? "Angry Caller"
                          : trigger === "legalIssue"
                          ? "Legal Issue"
                          : trigger === "emergency"
                          ? "Emergency"
                          : "VIP Numbers"}
                      </span>
                    </label>
                  )
                )}
              </div>
            </div>

            {callGoals.escalationConditions.vipNumbers && (
              <div
                style={{
                  ...fieldGroupStyle,
                  paddingLeft: "1.5rem",
                  borderLeft: "2px solid #3b82f6",
                }}
              >
                <label style={labelStyle}>
                  VIP Phone Numbers (one per line)
                </label>
                <textarea
                  value={callGoals.vipNumbers}
                  onChange={(e) =>
                    handleCallGoalsChange("vipNumbers", null, e.target.value)
                  }
                  style={textAreaStyle}
                  rows={3}
                  placeholder="+2010...\n+201..."
                />
              </div>
            )}

            <button style={buttonStyle}>
              <FaSave /> Save Call Goals
            </button>
          </div>
        )}

        {/* --- Tab 5: Escalation Rules --- */}
        {activeTab === "escalation" && (
          <div>
            <div style={fieldGroupStyle}>
              <label style={labelStyle}>
                Confidence Threshold: {escalationRules.confidenceThreshold}%
              </label>
              <input
                type="range"
                name="confidenceThreshold"
                min="0"
                max="100"
                value={escalationRules.confidenceThreshold}
                onChange={handleEscalationChange}
                style={{ width: "100%", accentColor: "#3b82f6" }}
              />
              <p
                style={{
                  fontSize: "0.8rem",
                  color: "#94a3b8",
                  marginTop: "0.25rem",
                }}
              >
                Transfer to human if AI confidence falls below this percentage.
              </p>
            </div>

            <div style={fieldGroupStyle}>
              <label style={labelStyle}>Escalation Keywords</label>
              <textarea
                name="escalationKeywords"
                value={escalationRules.escalationKeywords}
                onChange={handleEscalationChange}
                style={textAreaStyle}
                placeholder="e.g., angry, complaint, rude, urgent"
              />
              <p
                style={{
                  fontSize: "0.8rem",
                  color: "#94a3b8",
                  marginTop: "0.25rem",
                }}
              >
                Any call containing these words will be immediately escalated.
              </p>
            </div>

            <div style={fieldGroupStyle}>
              <label
                style={{
                  ...labelStyle,
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  name="vipDetection"
                  checked={escalationRules.vipDetection}
                  onChange={handleEscalationChange}
                />
                Enable VIP Caller Handling
              </label>
              {escalationRules.vipDetection && (
                <div
                  style={{
                    marginTop: "1rem",
                    paddingLeft: "1.5rem",
                    borderLeft: "2px solid #3b82f6",
                  }}
                >
                  <label style={labelStyle}>
                    VIP Phone Numbers (comma-separated)
                  </label>
                  <textarea
                    name="vipNumbers"
                    value={escalationRules.vipNumbers}
                    onChange={handleEscalationChange}
                    style={textAreaStyle}
                    placeholder="+15550001111, +15550002222"
                  />
                  <p
                    style={{
                      fontSize: "0.8rem",
                      color: "#94a3b8",
                      marginTop: "0.25rem",
                    }}
                  >
                    Default response: "Connecting you to our manager..."
                  </p>
                </div>
              )}
            </div>

            <div style={fieldGroupStyle}>
              <label style={labelStyle}>Callback Scheduling</label>
              <select
                name="callbackScheduling"
                value={escalationRules.callbackScheduling}
                onChange={handleEscalationChange}
                style={inputStyle}
              >
                <option>Always</option>
                <option>Never</option>
                <option>After 2 attempts</option>
              </select>
              <p
                style={{
                  fontSize: "0.8rem",
                  color: "#94a3b8",
                  marginTop: "0.25rem",
                }}
              >
                When human agent is not available, offer a callback.
              </p>
            </div>

            <div style={fieldGroupStyle}>
              <label style={labelStyle}>
                Maximum Retries Before Escalation
              </label>
              <input
                type="number"
                name="maxRetries"
                value={escalationRules.maxRetries}
                onChange={handleEscalationChange}
                style={inputStyle}
                min="0"
                max="5"
              />
              <p
                style={{
                  fontSize: "0.8rem",
                  color: "#94a3b8",
                  marginTop: "0.25rem",
                }}
              >
                If AI can't understand caller, retry N times then escalate.
              </p>
            </div>

            <button style={buttonStyle}>
              <FaSave /> Save Escalation Rules
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
