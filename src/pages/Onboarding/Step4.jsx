import React from "react";

const STORAGE_KEY = "onboarding_step4";

const DEFAULT_STATE = {
  googleCalendar: { enabled: true, authorized: true },
  slack: { enabled: false, authorized: false },
  crmWebhook: {
    enabled: true,
    url: "https://hooks.example.com/tasty-bites/ai-handoff",
  },
  emailNotifications: { enabled: false, email: "" },
};

const statusBadgeStyle = (tone) => ({
  display: "inline-flex",
  alignItems: "center",
  padding: "0.15rem 0.55rem",
  borderRadius: "999px",
  fontSize: "0.75rem",
  fontWeight: 600,
  color: tone === "ok" ? "#0f172a" : "#e2e8f0",
  backgroundColor:
    tone === "ok" ? "#22c55e" : tone === "warn" ? "#f59e0b" : "#334155",
});

export default function Step4({ setStepValid }) {
  const [integrations, setIntegrations] = React.useState(() => {
    if (typeof window === "undefined") {
      return DEFAULT_STATE;
    }
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (!saved) return DEFAULT_STATE;
      const parsed = JSON.parse(saved);
      return {
        googleCalendar: {
          ...DEFAULT_STATE.googleCalendar,
          ...parsed.googleCalendar,
        },
        slack: { ...DEFAULT_STATE.slack, ...parsed.slack },
        crmWebhook: { ...DEFAULT_STATE.crmWebhook, ...parsed.crmWebhook },
        emailNotifications: {
          ...DEFAULT_STATE.emailNotifications,
          ...parsed.emailNotifications,
        },
      };
    } catch (error) {
      console.warn("Failed to hydrate onboarding_step4 payload.", error);
      return DEFAULT_STATE;
    }
  });

  const urlPattern = /^https?:\/\/[\w./?=&%\-#]+$/i;
  // Robust email regex matching strict criteria
  const emailPattern =
    /^[a-zA-Z0-9_%+-]+(\.[a-zA-Z0-9_%+-]+)*@[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  const validation = React.useMemo(() => {
    const issues = {
      googleCalendar:
        integrations.googleCalendar.enabled &&
        !integrations.googleCalendar.authorized,
      slack: integrations.slack.enabled && !integrations.slack.authorized,
      crmWebhook:
        integrations.crmWebhook.enabled &&
        !urlPattern.test(integrations.crmWebhook.url || ""),
      emailNotifications:
        integrations.emailNotifications.enabled &&
        (!integrations.emailNotifications.email ||
          integrations.emailNotifications.email.length > 254 ||
          !emailPattern.test(integrations.emailNotifications.email)),
    };
    return {
      issues,
      isValid: !Object.values(issues).some(Boolean),
    };
  }, [integrations, urlPattern, emailPattern]);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(integrations));
    }
  }, [integrations]);

  React.useEffect(() => {
    setStepValid?.(validation.isValid);
  }, [validation, setStepValid]);

  const toggleIntegration = (key) => {
    setIntegrations((prev) => {
      const current = prev[key];
      const nextEnabled = !current.enabled;
      if (key === "googleCalendar" || key === "slack") {
        return {
          ...prev,
          [key]: {
            ...current,
            enabled: nextEnabled,
            authorized: nextEnabled ? current.authorized : false,
          },
        };
      }
      return {
        ...prev,
        [key]: {
          ...current,
          enabled: nextEnabled,
        },
      };
    });
  };

  const handleAuthorize = (key) => {
    setIntegrations((prev) => ({
      ...prev,
      [key]: { ...prev[key], authorized: true },
    }));
  };

  const handleWebhookChange = (value) => {
    setIntegrations((prev) => ({
      ...prev,
      crmWebhook: { ...prev.crmWebhook, url: value },
    }));
  };

  const handleEmailChange = (value) => {
    setIntegrations((prev) => ({
      ...prev,
      emailNotifications: { ...prev.emailNotifications, email: value },
    }));
  };

  const cardStyle = {
    backgroundColor: "#111827",
    borderRadius: "12px",
    border: "1px solid #1f2937",
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
    flex: "1 1 240px",
    minWidth: "240px",
  };

  const containerStyle = {
    backgroundColor: "#0f172a",
    borderRadius: "12px",
    padding: "1.25rem",
    boxShadow: "0 18px 40px rgba(8, 15, 31, 0.35)",
    fontFamily: "'Inter', sans-serif",
    color: "#e2e8f0",
    maxHeight: "65vh",
    overflow: "auto",
  };

  const toggleStyle = (on) => ({
    width: "44px",
    height: "24px",
    borderRadius: "999px",
    backgroundColor: on ? "#22c55e" : "#334155",
    border: "1px solid #1f2937",
    display: "flex",
    alignItems: "center",
    padding: "2px",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
  });

  const knobStyle = (on) => ({
    width: "18px",
    height: "18px",
    borderRadius: "50%",
    backgroundColor: "#0f172a",
    transform: on ? "translateX(18px)" : "translateX(0)",
    transition: "transform 0.2s ease",
  });

  const descriptionStyle = {
    color: "#94a3b8",
    fontSize: "0.85rem",
    lineHeight: 1.4,
  };

  const inputStyle = {
    width: "100%",
    padding: "0.65rem",
    borderRadius: "8px",
    border: "1px solid #1f2937",
    backgroundColor: "#0b1220",
    color: "#cbd5f5",
    fontSize: "0.9rem",
    outline: "none",
  };

  const helperStyle = (isError) => ({
    fontSize: "0.75rem",
    color: isError ? "#f87171" : "#64748b",
    marginTop: "0.25rem",
  });

  const getStatus = (key) => {
    const state = integrations[key];
    const issue = validation.issues[key];
    if (!state.enabled) {
      return { label: "Not Connected", tone: "idle" };
    }
    if (issue) {
      return { label: "Action Required", tone: "warn" };
    }
    return { label: "Connected", tone: "ok" };
  };

  return (
    <section style={containerStyle}>
      <header style={{ marginBottom: "1rem", textAlign: "center" }}>
        <p
          style={{
            color: "#64748b",
            fontSize: "0.85rem",
            marginBottom: "0.35rem",
          }}
        >
          Step 4 of 4
        </p>
        <h2
          style={{
            fontSize: "1.2rem",
            marginBottom: "0.25rem",
            color: "#f8fafc",
          }}
        >
          Integration Selection
        </h2>
        <p style={{ color: "#94a3b8", fontSize: "0.9rem" }}>
          Decide which tools to connect so your AI can coordinate calendars,
          alerts, and hand-offs automatically.
        </p>
      </header>

      <div
        style={{
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >
        {/* Google Calendar */}
        <article style={cardStyle}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}
            >
              <span style={{ fontSize: "1.4rem" }}>📅</span>
              <div>
                <h3 style={{ margin: 0, fontSize: "1rem", color: "#f1f5f9" }}>
                  Google Calendar
                </h3>
                <p style={descriptionStyle}>
                  Sync bookings and availability automatically.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => toggleIntegration("googleCalendar")}
              style={toggleStyle(integrations.googleCalendar.enabled)}
            >
              <span style={knobStyle(integrations.googleCalendar.enabled)} />
            </button>
          </div>
          <span style={statusBadgeStyle(getStatus("googleCalendar").tone)}>
            {getStatus("googleCalendar").label}
          </span>
          {integrations.googleCalendar.enabled && (
            <>
              <button
                type="button"
                onClick={() => handleAuthorize("googleCalendar")}
                style={{
                  padding: "0.55rem 1rem",
                  borderRadius: "6px",
                  border: "1px solid #1d4ed8",
                  backgroundColor: "#1e3a8a",
                  color: "#e0f2fe",
                  cursor: "pointer",
                  fontSize: "0.85rem",
                  alignSelf: "flex-start",
                }}
              >
                {integrations.googleCalendar.authorized
                  ? "Re-authorize"
                  : "Click to authorize"}
              </button>
              {validation.issues.googleCalendar && (
                <p style={helperStyle(true)}>
                  Authorize Google Calendar to finish connecting.
                </p>
              )}
            </>
          )}
        </article>

        {/* Slack */}
        <article style={cardStyle}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}
            >
              <span style={{ fontSize: "1.4rem" }}>💬</span>
              <div>
                <h3 style={{ margin: 0, fontSize: "1rem", color: "#f1f5f9" }}>
                  Slack
                </h3>
                <p style={descriptionStyle}>
                  Send real-time notifications to your team.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => toggleIntegration("slack")}
              style={toggleStyle(integrations.slack.enabled)}
            >
              <span style={knobStyle(integrations.slack.enabled)} />
            </button>
          </div>
          <span style={statusBadgeStyle(getStatus("slack").tone)}>
            {getStatus("slack").label}
          </span>
          {integrations.slack.enabled && (
            <>
              <button
                type="button"
                onClick={() => handleAuthorize("slack")}
                style={{
                  padding: "0.55rem 1rem",
                  borderRadius: "6px",
                  border: "1px solid #1d4ed8",
                  backgroundColor: "#1e3a8a",
                  color: "#e0f2fe",
                  cursor: "pointer",
                  fontSize: "0.85rem",
                  alignSelf: "flex-start",
                }}
              >
                {integrations.slack.authorized
                  ? "Re-authorize"
                  : "Click to authorize"}
              </button>
              {validation.issues.slack && (
                <p style={helperStyle(true)}>
                  Authorize Slack to enable workspace notifications.
                </p>
              )}
            </>
          )}
        </article>

        {/* CRM Webhook */}
        <article style={cardStyle}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}
            >
              <span style={{ fontSize: "1.4rem" }}>🔗</span>
              <div>
                <h3 style={{ margin: 0, fontSize: "1rem", color: "#f1f5f9" }}>
                  CRM Webhook
                </h3>
                <p style={descriptionStyle}>
                  Push lead details to your CRM instantly.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => toggleIntegration("crmWebhook")}
              style={toggleStyle(integrations.crmWebhook.enabled)}
            >
              <span style={knobStyle(integrations.crmWebhook.enabled)} />
            </button>
          </div>
          <span style={statusBadgeStyle(getStatus("crmWebhook").tone)}>
            {getStatus("crmWebhook").label}
          </span>
          {integrations.crmWebhook.enabled && (
            <>
              <input
                type="url"
                placeholder="https://hooks.yourcrm.com/payload"
                value={integrations.crmWebhook.url}
                onChange={(event) => handleWebhookChange(event.target.value)}
                style={inputStyle}
              />
              <p style={helperStyle(validation.issues.crmWebhook)}>
                {validation.issues.crmWebhook
                  ? "Enter a valid HTTPS webhook URL."
                  : "Example: https://hooks.example.com/ai-hand-off"}
              </p>
            </>
          )}
        </article>

        {/* Email Notifications */}
        <article style={cardStyle}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}
            >
              <span style={{ fontSize: "1.4rem" }}>✉️</span>
              <div>
                <h3 style={{ margin: 0, fontSize: "1rem", color: "#f1f5f9" }}>
                  Email Notifications
                </h3>
                <p style={descriptionStyle}>
                  Get daily summaries delivered to your inbox.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => toggleIntegration("emailNotifications")}
              style={toggleStyle(integrations.emailNotifications.enabled)}
            >
              <span
                style={knobStyle(integrations.emailNotifications.enabled)}
              />
            </button>
          </div>
          <span style={statusBadgeStyle(getStatus("emailNotifications").tone)}>
            {getStatus("emailNotifications").label}
          </span>
          {integrations.emailNotifications.enabled && (
            <>
              <input
                type="email"
                placeholder="you@example.com"
                value={integrations.emailNotifications.email}
                onChange={(event) => handleEmailChange(event.target.value)}
                style={inputStyle}
              />
              <p style={helperStyle(validation.issues.emailNotifications)}>
                {validation.issues.emailNotifications
                  ? "Provide a valid email address."
                  : "We’ll send task summaries to this address."}
              </p>
            </>
          )}
        </article>
      </div>
    </section>
  );
}
