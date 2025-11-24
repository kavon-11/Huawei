import React from "react";

const STORAGE_KEY = "onboarding_step3";

const SAMPLE_FAQS = [
  {
    id: "sample-1",
    question: "What are your standard business hours?",
    answer:
      "We are open daily from 9:00 AM to 9:00 PM, with extended hours on weekends.",
    category: "General",
  },
  {
    id: "sample-2",
    question: "Do you accept walk-in guests without reservations?",
    answer:
      "Yes, we welcome walk-ins, though availability is limited during peak times.",
    category: "Reservations",
  },
  {
    id: "sample-3",
    question: "Can I modify my reservation online?",
    answer:
      "Absolutely. Use the confirmation email link or call us at least 2 hours prior to the booking.",
    category: "Reservations",
  },
  {
    id: "sample-4",
    question: "What payment methods do you support?",
    answer: "We accept cash, major credit cards, Apple Pay, and Google Pay.",
    category: "Payments",
  },
  {
    id: "sample-5",
    question: "Do you offer vegetarian or vegan menu options?",
    answer: "Yes, over 30% of our menu is vegetarian or vegan friendly.",
    category: "Menu",
  },
  {
    id: "sample-6",
    question: "Is delivery available outside the city center?",
    answer:
      "Delivery covers a 10-mile radius; beyond that we offer pickup only.",
    category: "Delivery",
  },
  {
    id: "sample-7",
    question: "How do you handle food allergies?",
    answer:
      "Please alert us when ordering; our team follows strict allergen procedures.",
    category: "Policies",
  },
  {
    id: "sample-8",
    question: "Do you provide catering for corporate events?",
    answer: "Yes, we cater groups up to 150 guests with customizable menus.",
    category: "Events",
  },
  {
    id: "sample-9",
    question: "Is there parking available on-site?",
    answer:
      "Complimentary parking is available in the lot behind the restaurant.",
    category: "General",
  },
  {
    id: "sample-10",
    question: "What is your cancellation policy?",
    answer:
      "Please cancel at least 12 hours before your reservation to avoid fees.",
    category: "Policies",
  },
  {
    id: "sample-11",
    question: "Do you have gift cards?",
    answer:
      "Digital and physical gift cards are available in any denomination.",
    category: "Sales",
  },
  {
    id: "sample-12",
    question: "Can I place a large group order in advance?",
    answer: "Yes, call us 24 hours ahead for group orders of 10+ meals.",
    category: "Ordering",
  },
];

const DEFAULT_CATEGORIES = Array.from(
  new Set(SAMPLE_FAQS.map((pair) => pair.category))
);

const createId = () =>
  `faq-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const buildSamplePreview = () =>
  SAMPLE_FAQS.slice(0, 5).map(({ question, answer, category }) => ({
    question,
    answer,
    category,
  }));

export default function Step3({ setStepValid }) {
  const [faqs, setFaqs] = React.useState(SAMPLE_FAQS);
  const [categories, setCategories] = React.useState(DEFAULT_CATEGORIES);
  const [activeTab, setActiveTab] = React.useState("upload");
  const [uploadedFile, setUploadedFile] = React.useState(null);
  const [uploadStatus, setUploadStatus] = React.useState("");
  const [previewPairs, setPreviewPairs] = React.useState([]);
  const [isDragging, setIsDragging] = React.useState(false);
  const [manualForm, setManualForm] = React.useState({
    question: "",
    answer: "",
    category: DEFAULT_CATEGORIES[0] || "General",
  });
  const [manualError, setManualError] = React.useState("");
  const [newCategory, setNewCategory] = React.useState("");
  const [editingId, setEditingId] = React.useState(null);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (!saved) return;
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed?.pairs) && parsed.pairs.length) {
        setFaqs(parsed.pairs);
      }
      if (Array.isArray(parsed?.categories) && parsed.categories.length) {
        setCategories(parsed.categories);
      }
    } catch (error) {
      console.warn("Failed to hydrate onboarding_step3 payload.", error);
    }
  }, []);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ pairs: faqs, categories })
    );
  }, [faqs, categories]);

  React.useEffect(() => {
    setStepValid?.(faqs.length > 0);
  }, [faqs, setStepValid]);

  React.useEffect(() => {
    if (!categories.length) return;
    setManualForm((prev) => {
      if (prev.category && categories.includes(prev.category)) {
        return prev;
      }
      return { ...prev, category: categories[0] };
    });
  }, [categories]);

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

  const tabBarStyle = {
    display: "flex",
    gap: "0.5rem",
    marginBottom: "1rem",
  };

  const tabButtonStyle = (active) => ({
    flex: 1,
    padding: "0.65rem 0.9rem",
    borderRadius: "8px",
    border: "1px solid #1f2937",
    backgroundColor: active ? "#1e3a8a" : "#111827",
    color: active ? "#e0f2fe" : "#cbd5f5",
    cursor: "pointer",
    fontWeight: 600,
    transition: "all 0.2s ease",
  });

  const sectionStyle = {
    backgroundColor: "#111827",
    borderRadius: "10px",
    border: "1px solid #1f2937",
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.85rem",
    marginBottom: "1rem",
  };

  const fieldStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "0.35rem",
  };

  const labelStyle = {
    fontWeight: 600,
    fontSize: "0.85rem",
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

  const textareaStyle = {
    ...inputStyle,
    minHeight: "110px",
    resize: "vertical",
  };

  const dropZoneStyle = {
    border: `2px dashed ${isDragging ? "#38bdf8" : "#1f2937"}`,
    borderRadius: "12px",
    padding: "1.25rem",
    backgroundColor: isDragging ? "rgba(14, 165, 233, 0.1)" : "#0b1220",
    textAlign: "center",
    color: "#93c5fd",
    cursor: "pointer",
    transition: "all 0.2s ease",
  };

  const actionButtonStyle = {
    padding: "0.55rem 1.1rem",
    borderRadius: "6px",
    border: "1px solid #1d4ed8",
    backgroundColor: "#1e3a8a",
    color: "#e0f2fe",
    cursor: "pointer",
    fontSize: "0.85rem",
    fontWeight: 600,
    transition: "transform 0.2s ease",
    alignSelf: "flex-start",
  };

  const secondaryButtonStyle = {
    padding: "0.45rem 0.9rem",
    borderRadius: "6px",
    border: "1px solid #334155",
    backgroundColor: "transparent",
    color: "#cbd5f5",
    cursor: "pointer",
    fontSize: "0.8rem",
    fontWeight: 500,
  };

  const tableWrapperStyle = {
    overflowX: "auto",
    borderRadius: "10px",
    border: "1px solid #1f2937",
    backgroundColor: "#0b1220",
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "0.85rem",
  };

  const thStyle = {
    textAlign: "left",
    padding: "0.75rem",
    color: "#93c5fd",
    borderBottom: "1px solid #1f2937",
    backgroundColor: "#111827",
  };

  const tdStyle = {
    padding: "0.75rem",
    color: "#e2e8f0",
    borderBottom: "1px solid #1f2937",
    verticalAlign: "top",
    maxWidth: "260px",
    wordBreak: "break-word",
  };

  const formatSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  };

  const parseFileContent = (text) => {
    if (!text) return [];
    const blocks = text
      .split(/\n\s*\n/)
      .map((chunk) => chunk.trim())
      .filter(Boolean);
    if (!blocks.length) return [];
    const pairs = blocks
      .map((block) => {
        const lines = block
          .split(/\r?\n/)
          .map((line) => line.trim())
          .filter(Boolean);
        if (!lines.length) return null;
        let question = "";
        let answer = "";
        lines.forEach((line) => {
          if (!question && /^q[:\-]/i.test(line)) {
            question = line.replace(/^q[:\-]\s*/i, "");
            return;
          }
          if (!answer && /^a[:\-]/i.test(line)) {
            answer = line.replace(/^a[:\-]\s*/i, "");
          }
        });
        if (!question) {
          question = lines[0];
        }
        if (!answer && lines.length > 1) {
          answer = lines.slice(1).join(" ");
        }
        if (!question) return null;
        return {
          question,
          answer: answer || "Answer pending",
          category: "General",
        };
      })
      .filter(Boolean);
    return pairs;
  };

  const processFile = (file) => {
    setUploadedFile(file);
    setUploadStatus("Reading file...");
    if (!file) return;
    const extension = file.name.split(".").pop()?.toLowerCase();
    if (!extension) {
      setPreviewPairs(buildSamplePreview());
      setUploadStatus(
        "File extension not detected; loaded template preview for review."
      );
      return;
    }

    if (["pdf", "doc", "docx"].includes(extension)) {
      setPreviewPairs(buildSamplePreview());
      setUploadStatus(
        "Preview generated from template; rich document parsing is coming soon."
      );
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result?.toString() ?? "";
      const parsed = parseFileContent(content);
      if (parsed.length) {
        setPreviewPairs(parsed);
        setUploadStatus("Review the extracted question-answer pairs.");
      } else {
        setPreviewPairs(buildSamplePreview());
        setUploadStatus(
          "No pairs detected; loaded sample pairs so you can edit before importing."
        );
      }
    };
    reader.onerror = () => {
      setUploadStatus(
        "Unable to read the selected file. Please try another format."
      );
    };
    reader.readAsText(file, "utf-8");
  };

  const handleFileSelect = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
    setIsDragging(false);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handlePreviewFieldChange = (index, field, value) => {
    setPreviewPairs((prev) =>
      prev.map((pair, idx) =>
        idx === index
          ? {
              ...pair,
              [field]: field === "category" ? value : value.slice(0, 500),
            }
          : pair
      )
    );
  };

  const handlePreviewRemove = (index) => {
    setPreviewPairs((prev) => prev.filter((_, idx) => idx !== index));
  };

  const confirmPreviewImport = () => {
    if (!previewPairs.length) {
      setUploadStatus(
        "No pairs to import. Please upload a file or adjust the preview."
      );
      return;
    }
    const normalized = previewPairs.map((pair) => ({
      id: createId(),
      question: pair.question.trim() || "Untitled question",
      answer: pair.answer.trim() || "Answer pending",
      category: categories.includes(pair.category)
        ? pair.category
        : categories[0] || "General",
    }));
    setFaqs((prev) => [...prev, ...normalized]);
    setPreviewPairs([]);
    setUploadedFile(null);
    setUploadStatus("Pairs added to the knowledge base.");
  };

  const handleManualChange = (event) => {
    const { name, value } = event.target;
    setManualForm((prev) => ({ ...prev, [name]: value }));
    if (manualError) {
      setManualError("");
    }
  };

  const resetManualForm = () => {
    setManualForm({
      question: "",
      answer: "",
      category: categories[0] || "General",
    });
    setEditingId(null);
    setManualError("");
  };

  const handleManualSubmit = () => {
    const trimmedQuestion = manualForm.question.trim();
    const trimmedAnswer = manualForm.answer.trim();
    if (!trimmedQuestion || !trimmedAnswer) {
      setManualError("Both question and answer are required.");
      return;
    }
    const normalizedCategory =
      manualForm.category || categories[0] || "General";
    if (editingId) {
      setFaqs((prev) =>
        prev.map((pair) =>
          pair.id === editingId
            ? {
                ...pair,
                question: trimmedQuestion,
                answer: trimmedAnswer,
                category: normalizedCategory,
              }
            : pair
        )
      );
    } else {
      setFaqs((prev) => [
        ...prev,
        {
          id: createId(),
          question: trimmedQuestion,
          answer: trimmedAnswer,
          category: normalizedCategory,
        },
      ]);
    }
    resetManualForm();
  };

  const handleEditPair = (pair) => {
    setManualForm({
      question: pair.question,
      answer: pair.answer,
      category: pair.category,
    });
    setEditingId(pair.id);
    setManualError("");
    setActiveTab("manual");
  };

  const handleDeletePair = (pairId) => {
    setFaqs((prev) => prev.filter((pair) => pair.id !== pairId));
    if (editingId === pairId) {
      resetManualForm();
    }
  };

  const handleAddCategory = () => {
    const trimmed = newCategory.trim();
    if (!trimmed) return;
    const exists = categories.find(
      (cat) => cat.toLowerCase() === trimmed.toLowerCase()
    );
    if (exists) {
      setManualForm((prev) => ({ ...prev, category: exists }));
      setNewCategory("");
      return;
    }
    setCategories((prev) => [...prev, trimmed]);
    setManualForm((prev) => ({ ...prev, category: trimmed }));
    setNewCategory("");
  };

  const uploadTab = (
    <>
      <section style={sectionStyle}>
        <h3 style={{ margin: 0, fontSize: "1rem", color: "#f1f5f9" }}>
          Upload FAQ / Training Data
        </h3>
        <p style={{ color: "#94a3b8", fontSize: "0.85rem" }}>
          Upload PDF, CSV, TXT, DOC, or DOCX files. We’ll extract
          question-answer pairs for review.
        </p>
        <div
          style={dropZoneStyle}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <strong>Drag &amp; drop files</strong>
          <p style={{ margin: "0.35rem 0", color: "#cbd5f5" }}>
            or click to browse
          </p>
          <input
            type="file"
            accept=".pdf,.csv,.txt,.doc,.docx"
            onChange={handleFileSelect}
            style={{ marginTop: "0.75rem", color: "#cbd5f5" }}
          />
        </div>
        {uploadedFile && (
          <div
            style={{
              marginTop: "0.75rem",
              padding: "0.75rem",
              borderRadius: "8px",
              backgroundColor: "#0b1220",
              border: "1px solid #1f2937",
            }}
          >
            <p style={{ margin: 0, color: "#e2e8f0", fontWeight: 600 }}>
              {uploadedFile.name}
            </p>
            <p
              style={{
                margin: "0.2rem 0 0",
                color: "#94a3b8",
                fontSize: "0.8rem",
              }}
            >
              {formatSize(uploadedFile.size)}
            </p>
          </div>
        )}
        {uploadStatus && (
          <p style={{ color: "#38bdf8", fontSize: "0.8rem", margin: 0 }}>
            {uploadStatus}
          </p>
        )}
      </section>

      {previewPairs.length > 0 && (
        <section style={sectionStyle}>
          <h4 style={{ margin: 0, fontSize: "0.95rem", color: "#f1f5f9" }}>
            Preview &amp; Edit Extracted Pairs
          </h4>
          <p
            style={{
              color: "#94a3b8",
              fontSize: "0.8rem",
              marginBottom: "0.5rem",
            }}
          >
            Adjust or remove any entries before adding them to your knowledge
            base.
          </p>
          {previewPairs.map((pair, index) => (
            <div
              key={`preview-${index}`}
              style={{
                border: "1px solid #1f2937",
                borderRadius: "10px",
                padding: "0.75rem",
                backgroundColor: "#0b1220",
                display: "flex",
                flexDirection: "column",
                gap: "0.6rem",
              }}
            >
              <div style={fieldStyle}>
                <span style={labelStyle}>Question</span>
                <textarea
                  value={pair.question}
                  onChange={(event) =>
                    handlePreviewFieldChange(
                      index,
                      "question",
                      event.target.value
                    )
                  }
                  style={textareaStyle}
                  maxLength={500}
                />
              </div>
              <div style={fieldStyle}>
                <span style={labelStyle}>Answer</span>
                <textarea
                  value={pair.answer}
                  onChange={(event) =>
                    handlePreviewFieldChange(
                      index,
                      "answer",
                      event.target.value
                    )
                  }
                  style={textareaStyle}
                  maxLength={500}
                />
              </div>
              <div style={fieldStyle}>
                <span style={labelStyle}>Category</span>
                <select
                  value={pair.category}
                  onChange={(event) =>
                    handlePreviewFieldChange(
                      index,
                      "category",
                      event.target.value
                    )
                  }
                  style={inputStyle}
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="button"
                onClick={() => handlePreviewRemove(index)}
                style={secondaryButtonStyle}
              >
                Remove Pair
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={confirmPreviewImport}
            style={actionButtonStyle}
          >
            Confirm &amp; Add to Knowledge Base
          </button>
        </section>
      )}
    </>
  );

  const manualTab = (
    <>
      <section style={sectionStyle}>
        <h3 style={{ margin: 0, fontSize: "1rem", color: "#f1f5f9" }}>
          Add Q&amp;A Pairs Manually
        </h3>
        <p style={{ color: "#94a3b8", fontSize: "0.85rem" }}>
          Capture frequent questions, best-practice answers, and categorize them
          for quick retrieval.
        </p>
        <div style={fieldStyle}>
          <label htmlFor="question" style={labelStyle}>
            Question *
          </label>
          <input
            id="question"
            name="question"
            type="text"
            value={manualForm.question}
            onChange={handleManualChange}
            style={inputStyle}
            placeholder="e.g., How can I update my reservation?"
            maxLength={200}
          />
        </div>
        <div style={fieldStyle}>
          <label htmlFor="answer" style={labelStyle}>
            Answer *
          </label>
          <textarea
            id="answer"
            name="answer"
            value={manualForm.answer}
            onChange={handleManualChange}
            style={textareaStyle}
            placeholder="Provide a concise, helpful response (max 500 characters)."
            maxLength={500}
          />
        </div>
        <div style={fieldStyle}>
          <label htmlFor="category" style={labelStyle}>
            Category
          </label>
          <select
            id="category"
            name="category"
            value={manualForm.category}
            onChange={handleManualChange}
            style={inputStyle}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <input
            type="text"
            value={newCategory}
            onChange={(event) => setNewCategory(event.target.value)}
            style={{ ...inputStyle, flex: "1 1 160px" }}
            placeholder="Add custom category"
            maxLength={40}
          />
          <button
            type="button"
            onClick={handleAddCategory}
            style={secondaryButtonStyle}
          >
            Add Category
          </button>
        </div>
        {manualError && (
          <p style={{ color: "#f87171", fontSize: "0.8rem", margin: 0 }}>
            {manualError}
          </p>
        )}
        <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
          <button
            type="button"
            onClick={handleManualSubmit}
            style={actionButtonStyle}
          >
            {editingId ? "Update Pair" : "Add Pair"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetManualForm}
              style={secondaryButtonStyle}
            >
              Cancel Edit
            </button>
          )}
        </div>
      </section>
    </>
  );

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
          Step 3 of 4
        </p>
        <h2
          style={{
            fontSize: "1.2rem",
            marginBottom: "0.25rem",
            color: "#f8fafc",
          }}
        >
          Knowledge Base Upload
        </h2>
        <p style={{ color: "#94a3b8", fontSize: "0.9rem" }}>
          Upload or craft FAQs so your AI can respond with accurate,
          brand-aligned information.
        </p>
      </header>

      <div style={tabBarStyle}>
        <button
          type="button"
          style={tabButtonStyle(activeTab === "upload")}
          onClick={() => setActiveTab("upload")}
        >
          Upload
        </button>
        <button
          type="button"
          style={tabButtonStyle(activeTab === "manual")}
          onClick={() => setActiveTab("manual")}
        >
          Manual Entry
        </button>
      </div>

      {activeTab === "upload" ? uploadTab : manualTab}

      <section style={sectionStyle}>
        <h3 style={{ margin: 0, fontSize: "1rem", color: "#f1f5f9" }}>
          Knowledge Base Overview
        </h3>
        <p style={{ color: "#94a3b8", fontSize: "0.85rem" }}>
          {faqs.length} FAQ pairs uploaded
        </p>
        <div style={tableWrapperStyle}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Question</th>
                <th style={thStyle}>Answer</th>
                <th style={thStyle}>Category</th>
                <th style={{ ...thStyle, width: "110px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {faqs.map((pair) => (
                <tr key={pair.id}>
                  <td style={tdStyle}>{pair.question}</td>
                  <td style={tdStyle}>{pair.answer}</td>
                  <td style={tdStyle}>{pair.category}</td>
                  <td
                    style={{
                      ...tdStyle,
                      display: "flex",
                      gap: "0.4rem",
                      flexWrap: "wrap",
                    }}
                  >
                    <button
                      type="button"
                      style={secondaryButtonStyle}
                      onClick={() => handleEditPair(pair)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      style={secondaryButtonStyle}
                      onClick={() => handleDeletePair(pair.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {!faqs.length && (
                <tr>
                  <td style={tdStyle} colSpan={4}>
                    No pairs added yet. Upload a file or add entries manually.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </section>
  );
}
