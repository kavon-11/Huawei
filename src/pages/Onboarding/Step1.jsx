import React from "react";
import "./step1.css";

const STORAGE_KEY = "onboarding_step1";

export default function Step1({ setStepValid }) {
  const mockData = {
    businessName: "Tasty Bites",
    businessType: "Restaurant",
    businessPhone: "+1 (555) 321-9876",
    businessEmail: "hello@tastybites.com",
    openTime: "09:00",
    closeTime: "17:00",
    timeZone: "America/New_York",
  };

  const [formData, setFormData] = React.useState(() => {
    if (typeof window !== "undefined") {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (error) {
          console.warn("Failed to parse onboarding_step1 payload.", error);
        }
      }
    }
    return mockData;
  });

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    }
    const isValid = Object.values(formData).every(
      (value) => value && value.toString().trim().length > 0
    );
    setStepValid?.(isValid);
  }, [formData, setStepValid]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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

  const headerStyle = {
    marginBottom: "1rem",
    textAlign: "center",
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  };

  const fieldStyle = {
    display: "flex",
    flexDirection: "column",
  };

  const labelStyle = {
    fontWeight: 600,
    fontSize: "0.85rem",
    marginBottom: "0.3rem",
    color: "#94a3b8",
  };

  const inputStyle = {
    padding: "0.65rem",
    borderRadius: "8px",
    border: "1px solid #1f2937",
    backgroundColor: "#111827",
    fontSize: "0.9rem",
    color: "#cbd5f5",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
    outline: "none",
  };

  const rowStyle = {
    display: "flex",
    gap: "0.75rem",
    flexWrap: "wrap",
  };

  const columnStyle = {
    flex: "1 1 180px",
  };

  return (
    <section className="step1-container" style={containerStyle}>
      <header style={headerStyle}>
        <p
          style={{
            color: "#64748b",
            fontSize: "0.85rem",
            marginBottom: "0.35rem",
          }}
        >
          Step 1 of 4
        </p>
        <h2
          style={{
            fontSize: "1.2rem",
            marginBottom: "0.25rem",
            color: "#f8fafc",
          }}
        >
          Business Information
        </h2>
        <p style={{ color: "#94a3b8", fontSize: "0.9rem" }}>
          Let’s start with the essentials so we can tailor your experience.
        </p>
      </header>

      <form onSubmit={(event) => event.preventDefault()} style={formStyle}>
        <div style={fieldStyle}>
          <label htmlFor="businessName" style={labelStyle}>
            Business Name *
          </label>
          <input
            id="businessName"
            name="businessName"
            type="text"
            value={formData.businessName}
            onChange={handleChange}
            style={inputStyle}
            placeholder="Enter business name"
            autoComplete="organization"
          />
        </div>

        <div style={fieldStyle}>
          <label htmlFor="businessType" style={labelStyle}>
            Business Type / Industry *
          </label>
          <select
            id="businessType"
            name="businessType"
            value={formData.businessType}
            onChange={handleChange}
            style={inputStyle}
          >
            <option value="">Select business type</option>
            <option value="Restaurant">Restaurant</option>
            <option value="Law Firm">Law Firm</option>
            <option value="Medical Clinic">Medical Clinic</option>
            <option value="Retail">Retail</option>
            <option value="Fitness Studio">Fitness Studio</option>
            <option value="Salon & Spa">Salon & Spa</option>
          </select>
        </div>

        <div style={rowStyle}>
          <div style={{ ...fieldStyle, ...columnStyle }}>
            <label htmlFor="businessPhone" style={labelStyle}>
              Business Phone Number *
            </label>
            <input
              id="businessPhone"
              name="businessPhone"
              type="tel"
              value={formData.businessPhone}
              onChange={handleChange}
              style={inputStyle}
              placeholder="+1 (555) 321-9876"
              autoComplete="tel"
            />
          </div>
          <div style={{ ...fieldStyle, ...columnStyle }}>
            <label htmlFor="businessEmail" style={labelStyle}>
              Business Email *
            </label>
            <input
              id="businessEmail"
              name="businessEmail"
              type="email"
              value={formData.businessEmail}
              onChange={handleChange}
              style={inputStyle}
              placeholder="hello@business.com"
              autoComplete="email"
            />
          </div>
        </div>

        <div>
          <p style={{ ...labelStyle, marginBottom: "0.75rem" }}>
            Business Hours *
          </p>
          <div style={rowStyle}>
            <div style={{ ...fieldStyle, ...columnStyle }}>
              <label
                htmlFor="openTime"
                style={{ ...labelStyle, fontWeight: 500 }}
              >
                Open Time
              </label>
              <input
                id="openTime"
                name="openTime"
                type="time"
                value={formData.openTime}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>
            <div style={{ ...fieldStyle, ...columnStyle }}>
              <label
                htmlFor="closeTime"
                style={{ ...labelStyle, fontWeight: 500 }}
              >
                Close Time
              </label>
              <input
                id="closeTime"
                name="closeTime"
                type="time"
                value={formData.closeTime}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>
          </div>
        </div>

        <div style={fieldStyle}>
          <label htmlFor="timeZone" style={labelStyle}>
            Time Zone *
          </label>
          <select
            id="timeZone"
            name="timeZone"
            value={formData.timeZone}
            onChange={handleChange}
            style={inputStyle}
          >
            <option value="">Select time zone</option>
            <option value="America/New_York">Eastern Time (UTC−05:00)</option>
            <option value="America/Chicago">Central Time (UTC−06:00)</option>
            <option value="America/Denver">Mountain Time (UTC−07:00)</option>
            <option value="America/Los_Angeles">
              Pacific Time (UTC−08:00)
            </option>
            <option value="UTC">Coordinated Universal Time (UTC)</option>
          </select>
        </div>
      </form>
    </section>
  );
}
