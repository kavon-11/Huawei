import React from "react";

const STORAGE_KEY = "onboarding_step2";

export default function Step2({ setStepValid }) {
  const mockData = {
    aiName: "Alex",
    tone: "friendly",
    customToneDescription: "",
    welcomeMessage:
      "Thank you for calling Tasty Bites! This is Alex, how can I help you today?",
    closingMessage:
      "Thanks for calling Tasty Bites. We look forward to serving you again soon!",
    afterHoursMessage:
      "We're currently closed, but we'll be back at 9 AM tomorrow. Please leave a message and we'll reach out promptly.",
    voiceSelection: "neutral",
  };

  const [formData, setFormData] = React.useState(() => {
    if (typeof window !== "undefined") {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (error) {
          console.warn("Failed to parse onboarding_step2 payload.", error);
        }
      }
    }
    return mockData;
  });

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    }
    const hasTone =
      formData.tone &&
      (formData.tone !== "custom"
        ? true
        : formData.customToneDescription.trim().length > 0);
    const isValid =
      hasTone &&
      formData.welcomeMessage.trim().length > 0 &&
      formData.closingMessage.trim().length > 0 &&
      formData.afterHoursMessage.trim().length > 0 &&
      formData.voiceSelection.trim().length > 0;
    setStepValid?.(isValid);
  }, [formData, setStepValid]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTextareaChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value.slice(0, 500) }));
  };

  const handleToneChange = (event) => {
    const tone = event.target.value;
    setFormData((prev) => ({
      ...prev,
      tone,
      customToneDescription:
        tone === "custom" ? prev.customToneDescription : "",
    }));
  };

  const handleVoicePreview = () => {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      return;
    }
    const synth = window.speechSynthesis;
    if (synth.speaking) {
      synth.cancel();
    }
    const nameSnippet = formData.aiName.trim()
      ? formData.aiName.trim()
      : "your virtual assistant";
    const utterance = new SpeechSynthesisUtterance(
      `Hello, this is ${nameSnippet}.`
    );
    const voices = synth.getVoices();
    const desired = formData.voiceSelection;
    const match =
      voices.find((voice) => {
        const lower = voice.name.toLowerCase();
        if (desired === "male")
          return lower.includes("male") || lower.includes("man");
        if (desired === "female")
          return lower.includes("female") || lower.includes("woman");
        return lower.includes("neutral") || lower.includes("default");
      }) || voices[0];
    if (match) {
      utterance.voice = match;
    }
    synth.speak(utterance);
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

  const sectionStyle = {
    backgroundColor: "#111827",
    borderRadius: "10px",
    border: "1px solid #1f2937",
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.85rem",
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
    backgroundColor: "#0b1220",
    fontSize: "0.9rem",
    color: "#cbd5f5",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
    outline: "none",
  };

  const textAreaStyle = {
    ...inputStyle,
    minHeight: "110px",
    resize: "vertical",
  };

  const charCountStyle = {
    alignSelf: "flex-end",
    fontSize: "0.75rem",
    color: "#64748b",
  };

  const toneOptions = [
    { value: "professional", label: "Professional (formal, business-like)" },
    { value: "friendly", label: "Friendly (warm, conversational)" },
    { value: "casual", label: "Casual (relaxed, informal)" },
    { value: "custom", label: "Custom (describe your own tone)" },
  ];

  return (
    <section style={containerStyle}>
      <header style={headerStyle}>
        <p
          style={{
            color: "#64748b",
            fontSize: "0.85rem",
            marginBottom: "0.35rem",
          }}
        >
          Step 2 of 4
        </p>
        <h2
          style={{
            fontSize: "1.2rem",
            marginBottom: "0.25rem",
            color: "#f8fafc",
          }}
        >
          AI Personality Setup
        </h2>
        <p style={{ color: "#94a3b8", fontSize: "0.9rem" }}>
          Shape how your AI greets callers, responds, and signs off.
        </p>
      </header>

      <form onSubmit={(event) => event.preventDefault()} style={formStyle}>
        <section style={sectionStyle}>
          <h3 style={{ margin: 0, fontSize: "1rem", color: "#f1f5f9" }}>
            Personality Basics
          </h3>
          <div style={fieldStyle}>
            <label htmlFor="aiName" style={labelStyle}>
              AI Name (optional)
            </label>
            <input
              id="aiName"
              name="aiName"
              type="text"
              value={formData.aiName}
              onChange={handleInputChange}
              style={inputStyle}
              placeholder="e.g., Alex or Reception Bot"
              autoComplete="nickname"
            />
          </div>

          <div style={fieldStyle}>
            <span style={labelStyle}>AI Tone *</span>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              {toneOptions.map((option) => (
                <label
                  key={option.value}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    fontSize: "0.9rem",
                  }}
                >
                  <input
                    type="radio"
                    name="tone"
                    value={option.value}
                    checked={formData.tone === option.value}
                    onChange={handleToneChange}
                    style={{ accentColor: "#0ea5e9" }}
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {formData.tone === "custom" && (
            <div style={fieldStyle}>
              <label htmlFor="customToneDescription" style={labelStyle}>
                Describe the custom tone *
              </label>
              <textarea
                id="customToneDescription"
                name="customToneDescription"
                value={formData.customToneDescription}
                onChange={handleTextareaChange}
                style={textAreaStyle}
                placeholder="How should the AI sound? (max 500 characters)"
                maxLength={500}
              />
              <span style={charCountStyle}>
                {formData.customToneDescription.length}/500
              </span>
            </div>
          )}
        </section>

        <section style={sectionStyle}>
          <h3 style={{ margin: 0, fontSize: "1rem", color: "#f1f5f9" }}>
            Call Scripts
          </h3>

          <div style={fieldStyle}>
            <label htmlFor="welcomeMessage" style={labelStyle}>
              Welcome Message *
            </label>
            <textarea
              id="welcomeMessage"
              name="welcomeMessage"
              value={formData.welcomeMessage}
              onChange={handleTextareaChange}
              style={textAreaStyle}
              placeholder="Example: Thank you for calling Restaurant XYZ..."
              maxLength={500}
            />
            <span style={charCountStyle}>
              {formData.welcomeMessage.length}/500
            </span>
          </div>

          <div style={fieldStyle}>
            <label htmlFor="closingMessage" style={labelStyle}>
              Closing Message *
            </label>
            <textarea
              id="closingMessage"
              name="closingMessage"
              value={formData.closingMessage}
              onChange={handleTextareaChange}
              style={textAreaStyle}
              placeholder="Example: Thank you for calling, have a great day!"
              maxLength={500}
            />
            <span style={charCountStyle}>
              {formData.closingMessage.length}/500
            </span>
          </div>

          <div style={fieldStyle}>
            <label htmlFor="afterHoursMessage" style={labelStyle}>
              After-Hours Message *
            </label>
            <textarea
              id="afterHoursMessage"
              name="afterHoursMessage"
              value={formData.afterHoursMessage}
              onChange={handleTextareaChange}
              style={textAreaStyle}
              placeholder="Example: We're currently closed, but we'll reopen at 9 AM."
              maxLength={500}
            />
            <span style={charCountStyle}>
              {formData.afterHoursMessage.length}/500
            </span>
          </div>
        </section>

        <section style={sectionStyle}>
          <h3 style={{ margin: 0, fontSize: "1rem", color: "#f1f5f9" }}>
            Voice Settings
          </h3>

          <div style={fieldStyle}>
            <label htmlFor="voiceSelection" style={labelStyle}>
              Voice Selection *
            </label>
            <select
              id="voiceSelection"
              name="voiceSelection"
              value={formData.voiceSelection}
              onChange={handleInputChange}
              style={inputStyle}
            >
              <option value="">Select a voice</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="neutral">Neutral</option>
            </select>
          </div>

          <button
            type="button"
            onClick={handleVoicePreview}
            style={{
              alignSelf: "flex-start",
              padding: "0.6rem 1.2rem",
              borderRadius: "6px",
              border: "1px solid #1d4ed8",
              backgroundColor: "#1e3a8a",
              color: "#e0f2fe",
              cursor: "pointer",
              fontSize: "0.9rem",
              transition: "transform 0.2s ease",
            }}
          >
            Preview Voice
          </button>
        </section>
      </form>
    </section>
  );
}
