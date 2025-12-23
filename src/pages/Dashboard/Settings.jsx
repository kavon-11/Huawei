import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaUser,
  FaBuilding,
  FaPlug,
  FaUsers,
  FaCreditCard,
  FaSave,
  FaTrash,
  FaPlus,
  FaCheck,
  FaTimes,
  FaEdit,
  FaGoogle,
  FaSlack,
  FaEnvelope,
  FaLink,
  FaDownload,
  FaPhone,
  FaBell,
} from "react-icons/fa";
import DashboardCard from "../../components/DashboardCard";
import GradientText from "../../components/GradientText";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("account");

  // --- Tab 1: Account Settings State ---
  const [accountForm, setAccountForm] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [sessions, setSessions] = useState([
    {
      id: 1,
      device: "Chrome on Windows",
      location: "New York, USA",
      lastActive: "Active now",
    },
    {
      id: 2,
      device: "Safari on iPhone",
      location: "New York, USA",
      lastActive: "2 hours ago",
    },
  ]);

  // --- Tab 2: Business Settings State ---
  const [businessForm, setBusinessForm] = useState({
    name: "Tasty Bites",
    type: "Restaurant",
    phone: "+1 (555) 321-9876",
    email: "hello@tastybites.com",
    address: "123 Main St, New York, NY",
    timezone: "America/New_York",
    language: "English",
    emailNotifications: true,
    notificationEmail: "alerts@tastybites.com",
    notifyEscalation: true,
    notifyErrors: true,
    notifySummary: false,
  });

  // --- Tab 3: Integrations State ---
  const [integrations, setIntegrations] = useState([
    {
      id: "google",
      name: "Google Calendar",
      connected: true,
      lastSynced: "2 minutes ago",
      icon: <FaGoogle />,
    },
    { id: "slack", name: "Slack", connected: false, icon: <FaSlack /> },
    {
      id: "webhook",
      name: "CRM Webhook",
      connected: true,
      lastSynced: "5 minutes ago",
      url: "https://api.company.com/webhook",
      icon: <FaLink />,
    },
    {
      id: "email",
      name: "Email Notifications",
      connected: true,
      email: "john@example.com",
      verified: true,
      icon: <FaEnvelope />,
    },
  ]);

  // --- Tab 3b: Telephony Settings State (NEW) ---
  const [telephonySettings, setTelephonySettings] = useState({
    provider: "twilio", // "twilio" | "telnyx" | "other-sip"
    mainNumber: "+20100000000", // E.164 format
    additionalNumbers: ["+20200000001"], // Optional additional numbers
    allowSmsFollowUp: true,
  });

  // --- Tab 4: Team Management State ---
  const [teamMembers, setTeamMembers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "Admin",
      status: "Active",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "Editor",
      status: "Active",
    },
  ]);
  const [invitations, setInvitations] = useState([
    { id: 1, email: "mike@example.com", role: "Viewer", status: "Pending" },
  ]);
  const [newMember, setNewMember] = useState({ email: "", role: "Viewer" });

  // --- Tab 5b: Notifications & Webhooks (NEW) ---
  const [notificationsSettings, setNotificationsSettings] = useState({
    notifyOnNewLead: true,
    notifyOnNewBooking: true,
    notificationChannels: ["email"],
    outboundWebhookUrl: "",
    sendEventNewLead: true,
    sendEventNewAppointment: true,
    sendEventMissedCall: true,
  });

  // New state for editing
  const [editingMember, setEditingMember] = useState(null);
  const [isToastActive, setIsToastActive] = useState(false); // New state

  // Robust email regex matching strict criteria
  const emailPattern =
    /^[a-zA-Z0-9_%+-]+(\.[a-zA-Z0-9_%+-]+)*@[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  const isValidEmail = (email) => {
    return email && email.length <= 254 && emailPattern.test(email);
  };

  // --- Handlers ---
  const handleAccountChange = (e) => {
    const { name, value } = e.target;
    setAccountForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleBusinessChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBusinessForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // NEW: Telephony handler
  const handleTelephonyChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTelephonySettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // NEW: Notifications handler
  const handleNotificationsChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      // For multi-select channels
      if (name === "notificationChannels") {
        setNotificationsSettings((prev) => ({
          ...prev,
          notificationChannels: checked
            ? [...prev.notificationChannels, value]
            : prev.notificationChannels.filter((ch) => ch !== value),
        }));
      } else {
        setNotificationsSettings((prev) => ({
          ...prev,
          [name]: checked,
        }));
      }
    } else {
      setNotificationsSettings((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleInvite = (e) => {
    e.preventDefault();
    if (isToastActive) return;
    if (!newMember.email) return;

    if (!isValidEmail(newMember.email)) {
      setIsToastActive(true);
      toast.error("Please enter a valid email address.", {
        position: "top-center",
        onClose: () => setIsToastActive(false),
      });
      return;
    }

    setInvitations((prev) => [
      ...prev,
      {
        id: Date.now(),
        email: newMember.email,
        role: newMember.role,
        status: "Pending",
      },
    ]);
    setNewMember({ email: "", role: "Viewer" });
    setIsToastActive(true);
    toast.success("Invitation sent.", {
      position: "top-center",
      onClose: () => setIsToastActive(false),
    });
  };

  const saveAccountProfile = () => {
    if (isToastActive) return;
    if (!isValidEmail(accountForm.email)) {
      setIsToastActive(true);
      toast.error("Please enter a valid email address.", {
        position: "top-center",
        onClose: () => setIsToastActive(false),
      });
      return;
    }
    setIsToastActive(true);
    toast.success("Profile saved successfully.", {
      position: "top-center",
      onClose: () => setIsToastActive(false),
    });
  };

  const saveBusinessDetails = () => {
    if (isToastActive) return;
    if (!isValidEmail(businessForm.email)) {
      setIsToastActive(true);
      toast.error("Please enter a valid business email.", {
        position: "top-center",
        onClose: () => setIsToastActive(false),
      });
      return;
    }
    setIsToastActive(true);
    toast.success("Business details saved.", {
      position: "top-center",
      onClose: () => setIsToastActive(false),
    });
  };

  const saveNotificationPreferences = () => {
    if (isToastActive) return;
    if (
      businessForm.emailNotifications &&
      !isValidEmail(businessForm.notificationEmail)
    ) {
      setIsToastActive(true);
      toast.error("Please enter a valid notification email.", {
        position: "top-center",
        onClose: () => setIsToastActive(false),
      });
      return;
    }
    setIsToastActive(true);
    toast.success("Preferences saved.", {
      position: "top-center",
      onClose: () => setIsToastActive(false),
    });
  };

  const removeMember = (id) => {
    setTeamMembers((prev) => prev.filter((m) => m.id !== id));
  };

  const removeInvitation = (id) => {
    setInvitations((prev) => prev.filter((i) => i.id !== id));
  };

  const toggleIntegration = (id) => {
    setIntegrations((prev) =>
      prev.map((int) =>
        int.id === id ? { ...int, connected: !int.connected } : int
      )
    );
  };

  const startEditing = (member) => {
    setEditingMember({ ...member });
  };

  const cancelEditing = () => {
    setEditingMember(null);
  };

  const saveEditing = () => {
    if (isToastActive) return;

    if (!editingMember.name.trim()) {
      setIsToastActive(true);
      toast.error("Name cannot be empty.", {
        position: "top-center",
        onClose: () => setIsToastActive(false),
      });
      return;
    }
    if (!isValidEmail(editingMember.email)) {
      setIsToastActive(true);
      toast.error("Please enter a valid email address.", {
        position: "top-center",
        onClose: () => setIsToastActive(false),
      });
      return;
    }

    setTeamMembers((prev) =>
      prev.map((m) => (m.id === editingMember.id ? editingMember : m))
    );
    setEditingMember(null);
    setIsToastActive(true);
    toast.success("Member updated successfully.", {
      position: "top-center",
      onClose: () => setIsToastActive(false),
    });
  };

  const handleEditChange = (field, value) => {
    setEditingMember((prev) => ({ ...prev, [field]: value }));
  };

  // --- Styles ---
  const containerStyle = {
    padding: "1rem",
    backgroundColor: "#0f172a",
    minHeight: "100vh",
    color: "#e2e8f0",
    fontFamily: "'Inter', sans-serif",
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
    justifyContent: "flex-start",
    scrollbarWidth: "none",
  };

  const tabStyle = (isActive) => ({
    padding: "0.75rem 1rem",
    backgroundColor: isActive ? "#3b82f6" : "transparent",
    color: isActive ? "white" : "#94a3b8",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "0.9rem",
    transition: "all 0.2s",
    whiteSpace: "nowrap",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    flexShrink: 0,
  });

  const sectionStyle = {
    backgroundColor: "#1e293b",
    borderRadius: "12px",
    padding: "1.5rem",
    border: "1px solid #334155",
    width: "100%",
    maxWidth: "800px",
    boxSizing: "border-box",
    marginBottom: "1.5rem",
  };

  const fieldGroupStyle = {
    marginBottom: "1.5rem",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "0.5rem",
    fontWeight: "600",
    color: "#cbd5f5",
    fontSize: "0.9rem",
  };

  const inputStyle = {
    width: "100%",
    padding: "0.75rem",
    borderRadius: "8px",
    border: "1px solid #334155",
    backgroundColor: "#0f172a",
    color: "white",
    fontSize: "0.95rem",
    outline: "none",
    boxSizing: "border-box",
  };

  const buttonStyle = (variant = "primary") => ({
    padding: "0.6rem 1.2rem",
    backgroundColor:
      variant === "primary"
        ? "#3b82f6"
        : variant === "danger"
        ? "#ef4444"
        : "#334155",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "0.9rem",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    justifyContent: "center",
  });

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "0.9rem",
  };

  const thStyle = {
    textAlign: "left",
    padding: "0.75rem",
    color: "#94a3b8",
    borderBottom: "1px solid #334155",
    backgroundColor: "#1e293b",
  };

  const tdStyle = {
    padding: "0.75rem",
    borderBottom: "1px solid #334155",
    color: "#e2e8f0",
  };

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
          Settings
        </h1>
        <p style={{ color: "#94a3b8", marginTop: "0.5rem" }}>
          Manage your account, business details, and team.
        </p>
      </header>

      {/* Tabs */}
      <div style={tabContainerStyle}>
        <button
          style={tabStyle(activeTab === "account")}
          onClick={() => setActiveTab("account")}
        >
          <FaUser /> Account
        </button>
        <button
          style={tabStyle(activeTab === "business")}
          onClick={() => setActiveTab("business")}
        >
          <FaBuilding /> Business
        </button>
        <button
          style={tabStyle(activeTab === "telephony")}
          onClick={() => setActiveTab("telephony")}
        >
          <FaPhone /> Telephony
        </button>
        <button
          style={tabStyle(activeTab === "integrations")}
          onClick={() => setActiveTab("integrations")}
        >
          <FaPlug /> Integrations
        </button>
        <button
          style={tabStyle(activeTab === "notifications")}
          onClick={() => setActiveTab("notifications")}
        >
          <FaBell /> Notifications
        </button>
        <button
          style={tabStyle(activeTab === "team")}
          onClick={() => setActiveTab("team")}
        >
          <FaUsers /> Team
        </button>
        <button
          style={tabStyle(activeTab === "billing")}
          onClick={() => setActiveTab("billing")}
        >
          <FaCreditCard /> Billing
        </button>
      </div>

      {/* Tab Content */}
      <div style={{ width: "100%", maxWidth: "800px" }}>
        {/* --- Tab 1: Account Settings --- */}
        {activeTab === "account" && (
          <>
            <div style={sectionStyle}>
              <h3 style={{ margin: "0 0 1.5rem 0", color: "#f8fafc" }}>
                User Profile
              </h3>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                  gap: "1.5rem",
                }}
              >
                <div style={fieldGroupStyle}>
                  <label style={labelStyle}>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={accountForm.name}
                    onChange={handleAccountChange}
                    style={inputStyle}
                  />
                </div>
                <div style={fieldGroupStyle}>
                  <label style={labelStyle}>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={accountForm.email}
                    onChange={handleAccountChange}
                    style={inputStyle}
                  />
                </div>
                <div style={fieldGroupStyle}>
                  <label style={labelStyle}>Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={accountForm.phone}
                    onChange={handleAccountChange}
                    style={inputStyle}
                  />
                </div>
              </div>
              <button
                style={buttonStyle("primary")}
                onClick={saveAccountProfile}
                disabled={isToastActive}
              >
                <FaSave /> Save Profile
              </button>
            </div>

            <div style={sectionStyle}>
              <h3 style={{ margin: "0 0 1.5rem 0", color: "#f8fafc" }}>
                Change Password
              </h3>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                  gap: "1.5rem",
                }}
              >
                <div style={fieldGroupStyle}>
                  <label style={labelStyle}>Current Password</label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={accountForm.currentPassword}
                    onChange={handleAccountChange}
                    style={inputStyle}
                  />
                </div>
                <div style={fieldGroupStyle}>
                  <label style={labelStyle}>New Password</label>
                  <input
                    type="password"
                    name="newPassword"
                    value={accountForm.newPassword}
                    onChange={handleAccountChange}
                    style={inputStyle}
                  />
                </div>
                <div style={fieldGroupStyle}>
                  <label style={labelStyle}>Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={accountForm.confirmPassword}
                    onChange={handleAccountChange}
                    style={inputStyle}
                  />
                </div>
              </div>
              <button style={buttonStyle("primary")}>Change Password</button>
            </div>

            <div style={sectionStyle}>
              <h3 style={{ margin: "0 0 1.5rem 0", color: "#f8fafc" }}>
                Active Sessions
              </h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                {sessions.map((session) => (
                  <div
                    key={session.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "1rem",
                      backgroundColor: "#0f172a",
                      borderRadius: "8px",
                      border: "1px solid #334155",
                    }}
                  >
                    <div>
                      <p
                        style={{
                          margin: 0,
                          fontWeight: "600",
                          color: "#e2e8f0",
                        }}
                      >
                        {session.device}
                      </p>
                      <p
                        style={{
                          margin: "0.25rem 0 0",
                          fontSize: "0.8rem",
                          color: "#94a3b8",
                        }}
                      >
                        {session.location} • {session.lastActive}
                      </p>
                    </div>
                    <button
                      style={{
                        ...buttonStyle("secondary"),
                        padding: "0.4rem 0.8rem",
                        fontSize: "0.8rem",
                      }}
                    >
                      Sign Out
                    </button>
                  </div>
                ))}
              </div>
              <button style={{ ...buttonStyle("danger"), marginTop: "1.5rem" }}>
                Sign Out Everywhere
              </button>
            </div>
          </>
        )}

        {/* --- Tab 2: Business Settings --- */}
        {activeTab === "business" && (
          <>
            <div style={sectionStyle}>
              <h3 style={{ margin: "0 0 1.5rem 0", color: "#f8fafc" }}>
                Business Details
              </h3>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                  gap: "1.5rem",
                }}
              >
                <div style={fieldGroupStyle}>
                  <label style={labelStyle}>Business Name</label>
                  <input
                    type="text"
                    name="name"
                    value={businessForm.name}
                    onChange={handleBusinessChange}
                    style={inputStyle}
                  />
                </div>
                <div style={fieldGroupStyle}>
                  <label style={labelStyle}>Business Type</label>
                  <select
                    name="type"
                    value={businessForm.type}
                    onChange={handleBusinessChange}
                    style={inputStyle}
                  >
                    <option>Restaurant</option>
                    <option>Retail</option>
                    <option>Service</option>
                  </select>
                </div>
                <div style={fieldGroupStyle}>
                  <label style={labelStyle}>Business Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={businessForm.phone}
                    onChange={handleBusinessChange}
                    style={inputStyle}
                  />
                </div>
                <div style={fieldGroupStyle}>
                  <label style={labelStyle}>Business Email</label>
                  <input
                    type="email"
                    name="email"
                    value={businessForm.email}
                    onChange={handleBusinessChange}
                    style={inputStyle}
                  />
                </div>
                <div style={{ ...fieldGroupStyle, gridColumn: "1 / -1" }}>
                  <label style={labelStyle}>Address</label>
                  <input
                    type="text"
                    name="address"
                    value={businessForm.address}
                    onChange={handleBusinessChange}
                    style={inputStyle}
                  />
                </div>
                <div style={fieldGroupStyle}>
                  <label style={labelStyle}>Time Zone</label>
                  <select
                    name="timezone"
                    value={businessForm.timezone}
                    onChange={handleBusinessChange}
                    style={inputStyle}
                  >
                    <option value="America/New_York">Eastern Time</option>
                    <option value="America/Los_Angeles">Pacific Time</option>
                  </select>
                </div>
                <div style={fieldGroupStyle}>
                  <label style={labelStyle}>Language Preference</label>
                  <select
                    name="language"
                    value={businessForm.language}
                    onChange={handleBusinessChange}
                    style={inputStyle}
                  >
                    <option>English</option>
                    <option>Spanish</option>
                    <option>Arabic</option>
                  </select>
                </div>
              </div>
              <button
                style={buttonStyle("primary")}
                onClick={saveBusinessDetails}
                disabled={isToastActive}
              >
                <FaSave /> Save Changes
              </button>
            </div>

            <div style={sectionStyle}>
              <h3 style={{ margin: "0 0 1.5rem 0", color: "#f8fafc" }}>
                Notification Preferences
              </h3>
              <div style={fieldGroupStyle}>
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
                    name="emailNotifications"
                    checked={businessForm.emailNotifications}
                    onChange={handleBusinessChange}
                  />
                  Enable Email Notifications
                </label>
              </div>
              {businessForm.emailNotifications && (
                <div
                  style={{
                    paddingLeft: "1.5rem",
                    borderLeft: "2px solid #3b82f6",
                  }}
                >
                  <div style={fieldGroupStyle}>
                    <label style={labelStyle}>Notification Email</label>
                    <input
                      type="email"
                      name="notificationEmail"
                      value={businessForm.notificationEmail}
                      onChange={handleBusinessChange}
                      style={inputStyle}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.5rem",
                    }}
                  >
                    <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        color: "#cbd5f5",
                        fontSize: "0.9rem",
                      }}
                    >
                      <input
                        type="checkbox"
                        name="notifyEscalation"
                        checked={businessForm.notifyEscalation}
                        onChange={handleBusinessChange}
                      />
                      High Escalation Rate Alerts
                    </label>
                    <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        color: "#cbd5f5",
                        fontSize: "0.9rem",
                      }}
                    >
                      <input
                        type="checkbox"
                        name="notifyErrors"
                        checked={businessForm.notifyErrors}
                        onChange={handleBusinessChange}
                      />
                      System Error Alerts
                    </label>
                    <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        color: "#cbd5f5",
                        fontSize: "0.9rem",
                      }}
                    >
                      <input
                        type="checkbox"
                        name="notifySummary"
                        checked={businessForm.notifySummary}
                        onChange={handleBusinessChange}
                      />
                      Daily Summary
                    </label>
                  </div>
                </div>
              )}
              <button
                style={{ ...buttonStyle("primary"), marginTop: "1.5rem" }}
                onClick={saveNotificationPreferences}
                disabled={isToastActive}
              >
                <FaSave /> Save Preferences
              </button>
            </div>
          </>
        )}

        {/* --- Tab 3: Integrations --- */}
        {activeTab === "integrations" && (
          <div style={sectionStyle}>
            <h3 style={{ margin: "0 0 1.5rem 0", color: "#f8fafc" }}>
              Connected Integrations
            </h3>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              {integrations.map((int) => (
                <div
                  key={int.id}
                  style={{
                    padding: "1.5rem",
                    backgroundColor: "#0f172a",
                    borderRadius: "8px",
                    border: "1px solid #334155",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      flexWrap: "wrap",
                      gap: "1rem",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        gap: "1rem",
                        alignItems: "center",
                      }}
                    >
                      <div style={{ fontSize: "1.5rem", color: "#cbd5f5" }}>
                        {int.icon}
                      </div>
                      <div>
                        <h4 style={{ margin: 0, color: "#f8fafc" }}>
                          {int.name}
                        </h4>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            marginTop: "0.25rem",
                          }}
                        >
                          <span
                            style={{
                              width: "8px",
                              height: "8px",
                              borderRadius: "50%",
                              backgroundColor: int.connected
                                ? "#4ade80"
                                : "#94a3b8",
                            }}
                          />
                          <span
                            style={{
                              fontSize: "0.8rem",
                              color: int.connected ? "#4ade80" : "#94a3b8",
                            }}
                          >
                            {int.connected ? "Connected" : "Not Connected"}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleIntegration(int.id)}
                      style={{
                        ...buttonStyle(int.connected ? "secondary" : "primary"),
                        padding: "0.4rem 1rem",
                        fontSize: "0.85rem",
                      }}
                    >
                      {int.connected ? "Disconnect" : "Connect"}
                    </button>
                  </div>

                  {int.connected && (
                    <div
                      style={{
                        marginTop: "1rem",
                        paddingTop: "1rem",
                        borderTop: "1px solid #1e293b",
                        fontSize: "0.85rem",
                        color: "#94a3b8",
                      }}
                    >
                      {int.lastSynced && (
                        <p style={{ margin: "0 0 0.5rem 0" }}>
                          Last synced: {int.lastSynced}
                        </p>
                      )}
                      {int.url && (
                        <p style={{ margin: "0 0 0.5rem 0" }}>
                          Webhook URL: {int.url}
                        </p>
                      )}
                      {int.email && (
                        <p style={{ margin: "0 0 0.5rem 0" }}>
                          Email: {int.email} {int.verified && "(Verified)"}
                        </p>
                      )}
                      <div
                        style={{
                          display: "flex",
                          gap: "1rem",
                          marginTop: "0.5rem",
                        }}
                      >
                        <button
                          style={{
                            background: "none",
                            border: "none",
                            color: "#3b82f6",
                            cursor: "pointer",
                            padding: 0,
                          }}
                        >
                          Settings
                        </button>
                        {int.id === "webhook" && (
                          <button
                            style={{
                              background: "none",
                              border: "none",
                              color: "#3b82f6",
                              cursor: "pointer",
                              padding: 0,
                            }}
                          >
                            Test Webhook
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <button
              style={{
                ...buttonStyle("secondary"),
                marginTop: "1.5rem",
                width: "100%",
              }}
            >
              <FaPlus /> Add Custom Integration
            </button>
          </div>
        )}

        {/* --- NEW: Tab - Telephony --- */}
        {activeTab === "telephony" && (
          <div style={sectionStyle}>
            <h3 style={{ margin: "0 0 1.5rem 0", color: "#f8fafc" }}>
              Telephony Configuration
            </h3>
            <p
              style={{
                color: "#cbd5f5",
                marginBottom: "1.5rem",
                fontSize: "0.9rem",
              }}
            >
              Configure your phone numbers and telephony provider for incoming
              calls.
            </p>

            <div style={fieldGroupStyle}>
              <label style={labelStyle}>Telephony Provider</label>
              <select
                name="provider"
                value={telephonySettings.provider}
                onChange={handleTelephonyChange}
                style={inputStyle}
              >
                <option value="twilio">Twilio</option>
                <option value="telnyx">Telnyx</option>
                <option value="other-sip">Other (SIP)</option>
              </select>
              <p
                style={{
                  fontSize: "0.8rem",
                  color: "#94a3b8",
                  marginTop: "0.5rem",
                }}
              >
                Select your VoIP provider for call handling.
              </p>
            </div>

            <div style={fieldGroupStyle}>
              <label style={labelStyle}>Main Business Number</label>
              <input
                type="tel"
                name="mainNumber"
                placeholder="+20100000000"
                value={telephonySettings.mainNumber}
                onChange={handleTelephonyChange}
                style={inputStyle}
              />
              <p
                style={{
                  fontSize: "0.8rem",
                  color: "#94a3b8",
                  marginTop: "0.5rem",
                }}
              >
                Primary number in E.164 format (e.g., +20100000000)
              </p>
            </div>

            <div style={fieldGroupStyle}>
              <label style={labelStyle}>Webhook URL (Read-only)</label>
              <div
                style={{
                  padding: "0.75rem",
                  backgroundColor: "#1e293b",
                  borderRadius: "6px",
                  border: "1px solid #334155",
                  color: "#cbd5f5",
                  fontSize: "0.85rem",
                  wordBreak: "break-all",
                }}
              >
                https://api.echoai.local/webhooks/voice
              </div>
              <p
                style={{
                  fontSize: "0.8rem",
                  color: "#94a3b8",
                  marginTop: "0.5rem",
                }}
              >
                Configure your provider to send calls to this URL.
              </p>
            </div>

            <div style={fieldGroupStyle}>
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
                  name="allowSmsFollowUp"
                  checked={telephonySettings.allowSmsFollowUp}
                  onChange={handleTelephonyChange}
                />
                Allow SMS follow-up messages
              </label>
              <p
                style={{
                  fontSize: "0.8rem",
                  color: "#94a3b8",
                  marginTop: "0.5rem",
                }}
              >
                Enable sending SMS follow-ups to callers after voicemail or
                missed calls.
              </p>
            </div>

            <button
              style={{ ...buttonStyle("primary"), marginTop: "1.5rem" }}
              onClick={() => {
                if (isToastActive) return;
                setIsToastActive(true);
                toast.success("Telephony settings saved.", {
                  position: "top-center",
                  onClose: () => setIsToastActive(false),
                });
              }}
              disabled={isToastActive}
            >
              <FaSave /> Save Telephony Settings
            </button>
          </div>
        )}

        {/* --- NEW: Tab - Notifications & Webhooks --- */}
        {activeTab === "notifications" && (
          <div style={sectionStyle}>
            <h3 style={{ margin: "0 0 1.5rem 0", color: "#f8fafc" }}>
              Notifications & Webhooks
            </h3>
            <p
              style={{
                color: "#cbd5f5",
                marginBottom: "1.5rem",
                fontSize: "0.9rem",
              }}
            >
              Configure event notifications and webhook integrations for n8n
              automations.
            </p>

            <div>
              <h4 style={{ color: "#e2e8f0", marginBottom: "1rem" }}>
                Notification Events
              </h4>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
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
                    name="notifyOnNewLead"
                    checked={notificationsSettings.notifyOnNewLead}
                    onChange={handleNotificationsChange}
                  />
                  Notify on new lead captured
                </label>
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
                    name="notifyOnNewBooking"
                    checked={notificationsSettings.notifyOnNewBooking}
                    onChange={handleNotificationsChange}
                  />
                  Notify on new booking scheduled
                </label>
              </div>
            </div>

            <div style={{ marginTop: "1.5rem" }}>
              <h4 style={{ color: "#e2e8f0", marginBottom: "1rem" }}>
                Notification Channels
              </h4>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                }}
              >
                {["email", "sms", "whatsapp", "slack"].map((channel) => (
                  <label
                    key={channel}
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
                      name="notificationChannels"
                      value={channel}
                      checked={notificationsSettings.notificationChannels.includes(
                        channel
                      )}
                      onChange={handleNotificationsChange}
                    />
                    {channel.charAt(0).toUpperCase() + channel.slice(1)}
                  </label>
                ))}
              </div>
            </div>

            <div style={{ marginTop: "1.5rem" }}>
              <h4 style={{ color: "#e2e8f0", marginBottom: "1rem" }}>
                Webhook & n8n Integration
              </h4>
              <div style={fieldGroupStyle}>
                <label style={labelStyle}>Outbound Webhook URL</label>
                <input
                  type="url"
                  name="outboundWebhookUrl"
                  placeholder="https://webhook.n8n.io/webhook/..."
                  value={notificationsSettings.outboundWebhookUrl}
                  onChange={handleNotificationsChange}
                  style={inputStyle}
                />
                <p
                  style={{
                    fontSize: "0.8rem",
                    color: "#94a3b8",
                    marginTop: "0.5rem",
                  }}
                >
                  n8n webhook or custom endpoint for event triggers.
                </p>
              </div>

              <h4
                style={{
                  color: "#e2e8f0",
                  marginBottom: "1rem",
                  marginTop: "1.5rem",
                }}
              >
                Webhook Events
              </h4>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
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
                    name="sendEventNewLead"
                    checked={notificationsSettings.sendEventNewLead}
                    onChange={handleNotificationsChange}
                  />
                  Send event: New lead
                </label>
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
                    name="sendEventNewAppointment"
                    checked={notificationsSettings.sendEventNewAppointment}
                    onChange={handleNotificationsChange}
                  />
                  Send event: New appointment
                </label>
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
                    name="sendEventMissedCall"
                    checked={notificationsSettings.sendEventMissedCall}
                    onChange={handleNotificationsChange}
                  />
                  Send event: Missed call
                </label>
              </div>
            </div>

            <button
              style={{ ...buttonStyle("primary"), marginTop: "1.5rem" }}
              onClick={() => {
                if (isToastActive) return;
                setIsToastActive(true);
                toast.success("Notifications and webhooks saved.", {
                  position: "top-center",
                  onClose: () => setIsToastActive(false),
                });
              }}
              disabled={isToastActive}
            >
              <FaSave /> Save Settings
            </button>
          </div>
        )}

        {/* --- Tab 4: Team Management --- */}
        {activeTab === "team" && (
          <>
            <div style={sectionStyle}>
              <h3 style={{ margin: "0 0 1.5rem 0", color: "#f8fafc" }}>
                Team Members
              </h3>
              <div style={{ overflowX: "auto" }}>
                <table style={tableStyle}>
                  <thead>
                    <tr>
                      <th style={thStyle}>Name</th>
                      <th style={thStyle}>Email</th>
                      <th style={thStyle}>Role</th>
                      <th style={thStyle}>Status</th>
                      <th style={thStyle}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teamMembers.map((member) => (
                      <tr key={member.id}>
                        {editingMember?.id === member.id ? (
                          <>
                            <td style={tdStyle}>
                              <input
                                type="text"
                                value={editingMember.name}
                                onChange={(e) =>
                                  handleEditChange("name", e.target.value)
                                }
                                style={{
                                  ...inputStyle,
                                  padding: "0.4rem",
                                  fontSize: "0.85rem",
                                }}
                              />
                            </td>
                            <td style={tdStyle}>
                              <input
                                type="email"
                                value={editingMember.email}
                                onChange={(e) =>
                                  handleEditChange("email", e.target.value)
                                }
                                style={{
                                  ...inputStyle,
                                  padding: "0.4rem",
                                  fontSize: "0.85rem",
                                }}
                              />
                            </td>
                            <td style={tdStyle}>
                              <select
                                value={editingMember.role}
                                onChange={(e) =>
                                  handleEditChange("role", e.target.value)
                                }
                                style={{
                                  ...inputStyle,
                                  padding: "0.4rem",
                                  fontSize: "0.85rem",
                                }}
                              >
                                <option>Admin</option>
                                <option>Editor</option>
                                <option>Viewer</option>
                              </select>
                            </td>
                            <td style={tdStyle}>
                              <select
                                value={editingMember.status}
                                onChange={(e) =>
                                  handleEditChange("status", e.target.value)
                                }
                                style={{
                                  ...inputStyle,
                                  padding: "0.4rem",
                                  fontSize: "0.85rem",
                                }}
                              >
                                <option>Active</option>
                                <option>Inactive</option>
                              </select>
                            </td>
                            <td style={tdStyle}>
                              <div style={{ display: "flex", gap: "0.5rem" }}>
                                <button
                                  onClick={saveEditing}
                                  style={{
                                    background: "none",
                                    border: "none",
                                    color: isToastActive
                                      ? "#64748b"
                                      : "#4ade80",
                                    cursor: isToastActive
                                      ? "not-allowed"
                                      : "pointer",
                                  }}
                                  title="Save"
                                  disabled={isToastActive}
                                >
                                  <FaCheck />
                                </button>
                                <button
                                  onClick={cancelEditing}
                                  style={{
                                    background: "none",
                                    border: "none",
                                    color: isToastActive
                                      ? "#64748b"
                                      : "#ef4444",
                                    cursor: isToastActive
                                      ? "not-allowed"
                                      : "pointer",
                                  }}
                                  title="Cancel"
                                  disabled={isToastActive}
                                >
                                  <FaTimes />
                                </button>
                              </div>
                            </td>
                          </>
                        ) : (
                          <>
                            <td style={tdStyle}>{member.name}</td>
                            <td style={tdStyle}>{member.email}</td>
                            <td style={tdStyle}>{member.role}</td>
                            <td style={tdStyle}>
                              <span
                                style={{
                                  padding: "0.2rem 0.5rem",
                                  borderRadius: "4px",
                                  backgroundColor:
                                    member.status === "Active"
                                      ? "rgba(74, 222, 128, 0.1)"
                                      : "rgba(148, 163, 184, 0.1)",
                                  color:
                                    member.status === "Active"
                                      ? "#4ade80"
                                      : "#94a3b8",
                                  fontSize: "0.75rem",
                                }}
                              >
                                {member.status}
                              </span>
                            </td>
                            <td style={tdStyle}>
                              <div style={{ display: "flex", gap: "0.5rem" }}>
                                <button
                                  onClick={() => startEditing(member)}
                                  style={{
                                    background: "none",
                                    border: "none",
                                    color: "#3b82f6",
                                    cursor: "pointer",
                                  }}
                                >
                                  <FaEdit />
                                </button>
                                <button
                                  style={{
                                    background: "none",
                                    border: "none",
                                    color: "#ef4444",
                                    cursor: "pointer",
                                  }}
                                  onClick={() => removeMember(member.id)}
                                >
                                  <FaTrash />
                                </button>
                              </div>
                            </td>
                          </>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div style={sectionStyle}>
              <h3 style={{ margin: "0 0 1.5rem 0", color: "#f8fafc" }}>
                Invite New Member
              </h3>
              <form
                onSubmit={handleInvite}
                style={{
                  display: "flex",
                  gap: "1rem",
                  flexWrap: "wrap",
                  alignItems: "flex-end",
                }}
              >
                <div style={{ flex: "1 1 200px" }}>
                  <label style={labelStyle}>Email Address</label>
                  <input
                    type="email"
                    value={newMember.email}
                    onChange={(e) =>
                      setNewMember({ ...newMember, email: e.target.value })
                    }
                    style={inputStyle}
                    placeholder="colleague@example.com"
                    required
                  />
                </div>
                <div style={{ flex: "0 1 150px" }}>
                  <label style={labelStyle}>Role</label>
                  <select
                    value={newMember.role}
                    onChange={(e) =>
                      setNewMember({ ...newMember, role: e.target.value })
                    }
                    style={inputStyle}
                  >
                    <option>Admin</option>
                    <option>Editor</option>
                    <option>Viewer</option>
                  </select>
                </div>
                <button
                  type="submit"
                  style={{ ...buttonStyle("primary"), height: "42px" }}
                  disabled={isToastActive}
                >
                  Send Invitation
                </button>
              </form>
            </div>

            {invitations.length > 0 && (
              <div style={sectionStyle}>
                <h3 style={{ margin: "0 0 1.5rem 0", color: "#f8fafc" }}>
                  Pending Invitations
                </h3>
                <div style={{ overflowX: "auto" }}>
                  <table style={tableStyle}>
                    <thead>
                      <tr>
                        <th style={thStyle}>Email</th>
                        <th style={thStyle}>Role</th>
                        <th style={thStyle}>Status</th>
                        <th style={thStyle}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invitations.map((invite) => (
                        <tr key={invite.id}>
                          <td style={tdStyle}>{invite.email}</td>
                          <td style={tdStyle}>{invite.role}</td>
                          <td style={tdStyle}>
                            <span
                              style={{
                                padding: "0.2rem 0.5rem",
                                borderRadius: "4px",
                                backgroundColor: "rgba(251, 191, 36, 0.1)",
                                color: "#fbbf24",
                                fontSize: "0.75rem",
                              }}
                            >
                              {invite.status}
                            </span>
                          </td>
                          <td style={tdStyle}>
                            <button
                              style={{
                                background: "none",
                                border: "none",
                                color: "#ef4444",
                                cursor: "pointer",
                              }}
                              onClick={() => removeInvitation(invite.id)}
                            >
                              <FaTimes />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}

        {/* --- Tab 5: Billing --- */}
        {activeTab === "billing" && (
          <>
            <div style={sectionStyle}>
              <h3 style={{ margin: "0 0 1.5rem 0", color: "#f8fafc" }}>
                Current Plan
              </h3>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "1rem",
                  padding: "1.5rem",
                  backgroundColor: "#0f172a",
                  borderRadius: "8px",
                  border: "1px solid #334155",
                }}
              >
                <div>
                  <h2 style={{ margin: 0, color: "#f8fafc" }}>Startup Plan</h2>
                  <p style={{ margin: "0.5rem 0 0", color: "#94a3b8" }}>
                    $99/month • Billed monthly
                  </p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <span
                    style={{
                      padding: "0.25rem 0.75rem",
                      borderRadius: "999px",
                      backgroundColor: "#10b981",
                      color: "#064e3b",
                      fontWeight: "600",
                      fontSize: "0.85rem",
                    }}
                  >
                    Active
                  </span>
                  <p
                    style={{
                      margin: "0.5rem 0 0",
                      color: "#94a3b8",
                      fontSize: "0.85rem",
                    }}
                  >
                    Next billing: Oct 15, 2023
                  </p>
                </div>
              </div>

              <div style={{ marginTop: "2rem" }}>
                <h4 style={{ color: "#e2e8f0", marginBottom: "1rem" }}>
                  Usage This Month
                </h4>
                <div style={{ marginBottom: "1rem" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "0.5rem",
                      fontSize: "0.9rem",
                      color: "#cbd5f5",
                    }}
                  >
                    <span>Calls</span>
                    <span>245 / 500</span>
                  </div>
                  <div
                    style={{
                      height: "8px",
                      backgroundColor: "#334155",
                      borderRadius: "4px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: "49%",
                        height: "100%",
                        backgroundColor: "#3b82f6",
                      }}
                    />
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "0.5rem",
                      fontSize: "0.9rem",
                      color: "#cbd5f5",
                    }}
                  >
                    <span>Team Members</span>
                    <span>2 / 5</span>
                  </div>
                  <div
                    style={{
                      height: "8px",
                      backgroundColor: "#334155",
                      borderRadius: "4px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: "40%",
                        height: "100%",
                        backgroundColor: "#3b82f6",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div style={sectionStyle}>
              <h3 style={{ margin: "0 0 1.5rem 0", color: "#f8fafc" }}>
                Payment Method
              </h3>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  padding: "1rem",
                  backgroundColor: "#0f172a",
                  borderRadius: "8px",
                  border: "1px solid #334155",
                }}
              >
                <FaCreditCard size={24} color="#cbd5f5" />
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, color: "#e2e8f0", fontWeight: "600" }}>
                    •••• •••• •••• 1234
                  </p>
                  <p
                    style={{
                      margin: "0.25rem 0 0",
                      color: "#94a3b8",
                      fontSize: "0.85rem",
                    }}
                  >
                    Expires 12/2026
                  </p>
                </div>
                <button style={buttonStyle("secondary")}>Update</button>
              </div>
            </div>

            <div style={sectionStyle}>
              <h3 style={{ margin: "0 0 1.5rem 0", color: "#f8fafc" }}>
                Invoice History
              </h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                {[
                  {
                    id: 1,
                    date: "Sep 15, 2023",
                    amount: "$99.00",
                    status: "Paid",
                  },
                  {
                    id: 2,
                    date: "Aug 15, 2023",
                    amount: "$99.00",
                    status: "Paid",
                  },
                  {
                    id: 3,
                    date: "Jul 15, 2023",
                    amount: "$99.00",
                    status: "Paid",
                  },
                ].map((invoice) => (
                  <div
                    key={invoice.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "0.75rem",
                      borderBottom: "1px solid #334155",
                    }}
                  >
                    <div>
                      <p
                        style={{
                          margin: 0,
                          color: "#e2e8f0",
                          fontSize: "0.9rem",
                        }}
                      >
                        {invoice.date}
                      </p>
                      <p
                        style={{
                          margin: 0,
                          color: "#94a3b8",
                          fontSize: "0.8rem",
                        }}
                      >
                        {invoice.amount} • {invoice.status}
                      </p>
                    </div>
                    <button
                      style={{
                        background: "none",
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
          </>
        )}
      </div>
    </div>
  );
}
