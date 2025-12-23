import React, { useState, useMemo } from "react";
import {
  FaSearch,
  FaFilter,
  FaPlus,
  FaEdit,
  FaTrash,
  FaUpload,
  FaFileCsv,
  FaCheck,
  FaTimes,
  FaArrowLeft,
  FaCloudUploadAlt,
} from "react-icons/fa";
import DashboardCard from "../../components/DashboardCard";
import GradientText from "../../components/GradientText";

// Mock Data
const INITIAL_FAQS = [
  {
    id: 1,
    question: "What are your opening hours?",
    answer:
      "We are open Mon-Fri from 9 AM to 10 PM, and weekends from 10 AM to 11 PM.",
    category: "General",
    intent: "answer_faq",
    active: true,
    usageCount: 145,
  },
  {
    id: 2,
    question: "Do you offer vegan options?",
    answer: "Yes, we have a dedicated vegan section on our menu.",
    category: "Menu",
    intent: "answer_faq",
    active: true,
    usageCount: 89,
  },
  {
    id: 3,
    question: "How can I book a table?",
    answer:
      "You can book a table through our website or by asking me right now.",
    category: "Reservations",
    intent: "schedule_appointment",
    active: true,
    usageCount: 210,
  },
  {
    id: 4,
    question: "Is there parking nearby?",
    answer: "Yes, there is a free parking lot behind the building.",
    category: "Location",
    intent: "answer_faq",
    active: false,
    usageCount: 12,
  },
  {
    id: 5,
    question: "Do you do delivery?",
    answer: "We deliver within a 5-mile radius via our partners.",
    category: "Services",
    intent: "order_food",
    active: true,
    usageCount: 300,
  },
];

const CATEGORIES = [
  "General",
  "Menu",
  "Reservations",
  "Location",
  "Services",
  "Technical",
];
const INTENTS = [
  "answer_faq",
  "schedule_appointment",
  "order_food",
  "technical_support",
  "callback",
];

export default function KnowledgeBase() {
  // State
  const [faqs, setFaqs] = useState(INITIAL_FAQS);
  const [viewMode, setViewMode] = useState("manage"); // 'manage' or 'upload'
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [editingFaq, setEditingFaq] = useState(null); // null = adding new
  const [selectedIds, setSelectedIds] = useState([]);

  // Editor Form State
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    category: CATEGORIES[0],
    intent: INTENTS[0],
    active: true,
  });

  // Upload State
  const [uploadFile, setUploadFile] = useState(null);
  const [previewData, setPreviewData] = useState([]);

  // --- Logic ---

  const filteredFaqs = useMemo(() => {
    return faqs.filter((faq) => {
      const matchesSearch =
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        filterCategory === "All" || faq.category === filterCategory;
      return matchesSearch && matchesCategory;
    });
  }, [faqs, searchQuery, filterCategory]);

  const handleEditClick = (faq) => {
    setEditingFaq(faq);
    setFormData({
      question: faq.question,
      answer: faq.answer,
      category: faq.category,
      intent: faq.intent,
      active: faq.active,
    });
    // Scroll to editor on mobile
    if (window.innerWidth < 1024) {
      document
        .getElementById("faq-editor")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleAddNewClick = () => {
    setEditingFaq(null);
    setFormData({
      question: "",
      answer: "",
      category: CATEGORIES[0],
      intent: INTENTS[0],
      active: true,
    });
    if (window.innerWidth < 1024) {
      document
        .getElementById("faq-editor")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (editingFaq) {
      setFaqs((prev) =>
        prev.map((f) => (f.id === editingFaq.id ? { ...f, ...formData } : f))
      );
    } else {
      const newId = Math.max(...faqs.map((f) => f.id), 0) + 1;
      setFaqs((prev) => [...prev, { id: newId, ...formData, usageCount: 0 }]);
    }
    handleAddNewClick(); // Reset form
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this FAQ?")) {
      setFaqs((prev) => prev.filter((f) => f.id !== id));
      if (editingFaq?.id === id) handleAddNewClick();
    }
  };

  const handleBulkDelete = () => {
    if (window.confirm(`Delete ${selectedIds.length} selected FAQs?`)) {
      setFaqs((prev) => prev.filter((f) => !selectedIds.includes(f.id)));
      setSelectedIds([]);
    }
  };

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadFile(file);
      // Mock parsing
      setTimeout(() => {
        setPreviewData([
          {
            question: "What is your return policy?",
            answer: "30 days with receipt.",
            category: "Policies",
          },
          {
            question: "Do you ship internationally?",
            answer: "Yes, shipping fees apply.",
            category: "Shipping",
          },
        ]);
      }, 1000);
    }
  };

  const confirmUpload = () => {
    const newFaqs = previewData.map((item, idx) => ({
      id: Date.now() + idx,
      ...item,
      intent: "answer_faq",
      active: true,
      usageCount: 0,
    }));
    setFaqs((prev) => [...prev, ...newFaqs]);
    setUploadFile(null);
    setPreviewData([]);
    setViewMode("manage");
  };

  // --- Styles ---
  const containerStyle = {
    padding: "1rem", // Reduced padding for mobile
    backgroundColor: "#0f172a",
    minHeight: "100vh",
    color: "#e2e8f0",
    fontFamily: "'Inter', sans-serif",
  };

  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start", // Align to top for wrapping
    marginBottom: "2rem",
    flexDirection: "column", // Stack on mobile by default
    gap: "1rem",
  };

  // Media query logic isn't directly available in inline styles without a hook or CSS-in-JS library.
  // However, using flex-wrap and min-width in grid helps.
  // I will adjust gridLayout to be more responsive.

  const gridLayout = {
    display: "grid",
    gridTemplateColumns: "1fr", // Default to single column (mobile first)
    gap: "2rem",
    // We will use a style block or class for desktop media query if possible,
    // but since we are using inline styles, let's rely on the fact that
    // on desktop we want side-by-side.
    // A common trick with inline styles for responsive grid is minmax.
    // gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" is already good,
    // but let's ensure the container doesn't overflow.
    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 400px), 1fr))",
  };

  const cardStyle = {
    backgroundColor: "#1e293b",
    borderRadius: "12px",
    border: "1px solid #334155",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    height: "fit-content",
    width: "100%", // Ensure it takes full width of grid cell
  };

  const inputStyle = {
    width: "100%",
    padding: "0.75rem",
    borderRadius: "8px",
    border: "1px solid #334155",
    backgroundColor: "#0f172a",
    color: "white",
    fontSize: "0.9rem",
    outline: "none",
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
  });

  const tableHeaderStyle = {
    textAlign: "left",
    padding: "0.75rem", // Reduced padding
    color: "#94a3b8",
    borderBottom: "1px solid #334155",
    backgroundColor: "#1e293b",
    fontSize: "0.75rem", // Smaller font
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    whiteSpace: "nowrap", // Prevent wrapping in headers
  };

  const tableCellStyle = {
    padding: "0.75rem", // Reduced padding
    borderBottom: "1px solid #334155",
    color: "#e2e8f0",
    fontSize: "0.85rem", // Smaller font
  };

  // --- Render ---

  if (viewMode === "upload") {
    return (
      <div style={containerStyle}>
        <button
          style={{ ...buttonStyle("secondary"), marginBottom: "1.5rem" }}
          onClick={() => setViewMode("manage")}
        >
          <FaArrowLeft /> Back to List
        </button>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h2 style={{ color: "#f8fafc", marginBottom: "1rem" }}>
            Bulk Upload FAQs
          </h2>
          <div
            style={{
              border: "2px dashed #3b82f6",
              borderRadius: "12px",
              padding: "3rem",
              textAlign: "center",
              backgroundColor: "rgba(59, 130, 246, 0.1)",
              marginBottom: "2rem",
            }}
          >
            <FaCloudUploadAlt
              size={48}
              color="#3b82f6"
              style={{ marginBottom: "1rem" }}
            />
            <h3 style={{ margin: "0 0 0.5rem 0", color: "#e2e8f0" }}>
              Drag & Drop files here
            </h3>
            <p style={{ color: "#94a3b8", marginBottom: "1.5rem" }}>
              CSV, PDF, DOCX (Max 10MB)
            </p>
            <input
              type="file"
              id="file-upload"
              style={{ display: "none" }}
              onChange={handleFileUpload}
              accept=".csv,.pdf,.docx,.txt"
            />
            <label htmlFor="file-upload" style={buttonStyle("primary")}>
              Browse Files
            </label>
          </div>

          {uploadFile && (
            <div style={cardStyle}>
              <div
                style={{
                  padding: "1rem",
                  borderBottom: "1px solid #334155",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span style={{ fontWeight: "600", color: "#e2e8f0" }}>
                  Preview: {uploadFile.name}
                </span>
              </div>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr>
                      <th style={tableHeaderStyle}>Question</th>
                      <th style={tableHeaderStyle}>Answer</th>
                      <th style={tableHeaderStyle}>Category</th>
                    </tr>
                  </thead>
                  <tbody>
                    {previewData.map((row, i) => (
                      <tr key={i}>
                        <td style={tableCellStyle}>{row.question}</td>
                        <td style={tableCellStyle}>{row.answer}</td>
                        <td style={tableCellStyle}>{row.category}</td>
                      </tr>
                    ))}
                    {previewData.length === 0 && (
                      <tr>
                        <td
                          colSpan="3"
                          style={{
                            ...tableCellStyle,
                            textAlign: "center",
                            color: "#94a3b8",
                          }}
                        >
                          Processing file...
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              {previewData.length > 0 && (
                <div
                  style={{
                    padding: "1rem",
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: "1rem",
                  }}
                >
                  <button
                    style={buttonStyle("secondary")}
                    onClick={() => {
                      setUploadFile(null);
                      setPreviewData([]);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    style={buttonStyle("primary")}
                    onClick={confirmUpload}
                  >
                    Confirm Upload
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <header style={headerStyle}>
        <div style={{ width: "100%" }}>
          <h1
            style={{
              fontSize: "1.5rem",
              fontWeight: "700",
              color: "#f8fafc",
              margin: 0,
            }}
          >
            Knowledge Base
          </h1>
          <p
            style={{
              color: "#94a3b8",
              marginTop: "0.5rem",
              fontSize: "0.9rem",
            }}
          >
            Manage the FAQs your AI uses to answer customer questions.
          </p>
        </div>
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            width: "100%",
            flexWrap: "wrap",
          }}
        >
          <button
            style={{
              ...buttonStyle("secondary"),
              flex: "1 1 auto",
              justifyContent: "center",
            }}
            onClick={() => setViewMode("upload")}
          >
            <FaUpload /> Bulk Upload
          </button>
          <button
            style={{
              ...buttonStyle("primary"),
              flex: "1 1 auto",
              justifyContent: "center",
            }}
            onClick={handleAddNewClick}
          >
            <FaPlus /> Add New FAQ
          </button>
        </div>
      </header>

      <div style={gridLayout}>
        {/* --- Left Column: FAQ List --- */}
        <div style={cardStyle}>
          {/* Toolbar */}
          <div
            style={{
              padding: "1rem",
              borderBottom: "1px solid #334155",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <div style={{ position: "relative", width: "100%" }}>
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
                placeholder="Search FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ ...inputStyle, paddingLeft: "2.5rem" }}
              />
            </div>
            <div style={{ position: "relative", width: "100%" }}>
              <FaFilter
                style={{
                  position: "absolute",
                  left: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#94a3b8",
                }}
              />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                style={{
                  ...inputStyle,
                  paddingLeft: "2.5rem",
                  appearance: "none",
                }}
              >
                <option value="All">All Categories</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedIds.length > 0 && (
            <div
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: "rgba(239, 68, 68, 0.1)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ color: "#f87171", fontSize: "0.9rem" }}>
                {selectedIds.length} selected
              </span>
              <button
                style={{
                  ...buttonStyle("danger"),
                  padding: "0.4rem 0.8rem",
                  fontSize: "0.8rem",
                }}
                onClick={handleBulkDelete}
              >
                Delete Selected
              </button>
            </div>
          )}

          {/* List */}
          <div style={{ overflowX: "auto", maxWidth: "100%" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                minWidth: "600px",
              }}
            >
              <thead>
                <tr>
                  <th style={{ ...tableHeaderStyle, width: "40px" }}>
                    <input
                      type="checkbox"
                      onChange={(e) =>
                        setSelectedIds(
                          e.target.checked ? filteredFaqs.map((f) => f.id) : []
                        )
                      }
                      checked={
                        selectedIds.length === filteredFaqs.length &&
                        filteredFaqs.length > 0
                      }
                    />
                  </th>
                  <th style={tableHeaderStyle}>Question</th>
                  <th style={tableHeaderStyle}>Category</th>
                  <th style={tableHeaderStyle}>Status</th>
                  <th style={{ ...tableHeaderStyle, textAlign: "right" }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredFaqs.map((faq) => (
                  <tr
                    key={faq.id}
                    style={{
                      backgroundColor:
                        editingFaq?.id === faq.id
                          ? "rgba(59, 130, 246, 0.1)"
                          : "transparent",
                    }}
                  >
                    <td style={tableCellStyle}>
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(faq.id)}
                        onChange={() => toggleSelect(faq.id)}
                      />
                    </td>
                    <td style={tableCellStyle}>
                      <div
                        style={{ fontWeight: "600", marginBottom: "0.25rem" }}
                      >
                        {faq.question}
                      </div>
                      <div
                        style={{
                          fontSize: "0.8rem",
                          color: "#94a3b8",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          maxWidth: "200px",
                        }}
                      >
                        {faq.answer}
                      </div>
                    </td>
                    <td style={tableCellStyle}>
                      <span
                        style={{
                          padding: "0.2rem 0.5rem",
                          borderRadius: "4px",
                          backgroundColor: "#334155",
                          fontSize: "0.75rem",
                        }}
                      >
                        {faq.category}
                      </span>
                    </td>
                    <td style={tableCellStyle}>
                      {faq.active ? (
                        <span
                          style={{
                            color: "#4ade80",
                            display: "flex",
                            alignItems: "center",
                            gap: "0.25rem",
                            fontSize: "0.8rem",
                          }}
                        >
                          <FaCheck size={10} /> Active
                        </span>
                      ) : (
                        <span
                          style={{
                            color: "#94a3b8",
                            display: "flex",
                            alignItems: "center",
                            gap: "0.25rem",
                            fontSize: "0.8rem",
                          }}
                        >
                          <FaTimes size={10} /> Inactive
                        </span>
                      )}
                    </td>
                    <td style={{ ...tableCellStyle, textAlign: "right" }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          gap: "0.5rem",
                        }}
                      >
                        <button
                          style={{
                            padding: "0.4rem",
                            backgroundColor: "transparent",
                            border: "1px solid #334155",
                            borderRadius: "4px",
                            color: "#3b82f6",
                            cursor: "pointer",
                          }}
                          onClick={() => handleEditClick(faq)}
                        >
                          <FaEdit />
                        </button>
                        <button
                          style={{
                            padding: "0.4rem",
                            backgroundColor: "transparent",
                            border: "1px solid #334155",
                            borderRadius: "4px",
                            color: "#ef4444",
                            cursor: "pointer",
                          }}
                          onClick={() => handleDelete(faq.id)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredFaqs.length === 0 && (
                  <tr>
                    <td
                      colSpan="5"
                      style={{
                        padding: "2rem",
                        textAlign: "center",
                        color: "#94a3b8",
                      }}
                    >
                      No FAQs found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* --- Right Column: FAQ Editor --- */}
        <div
          id="faq-editor"
          style={{
            ...cardStyle,
            height: "fit-content",
            position: "sticky",
            top: "1rem",
          }}
        >
          <div style={{ padding: "1rem", borderBottom: "1px solid #334155" }}>
            <h3 style={{ margin: 0, color: "#f8fafc" }}>
              {editingFaq ? "Edit FAQ" : "Add New FAQ"}
            </h3>
          </div>
          <form
            onSubmit={handleSave}
            style={{
              padding: "1.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
            }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: "600",
                  color: "#cbd5f5",
                }}
              >
                Question <span style={{ color: "#ef4444" }}>*</span>
              </label>
              <input
                type="text"
                name="question"
                value={formData.question}
                onChange={handleFormChange}
                style={inputStyle}
                placeholder="e.g., What are your hours?"
                required
              />
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: "600",
                  color: "#cbd5f5",
                }}
              >
                Answer <span style={{ color: "#ef4444" }}>*</span>
              </label>
              <textarea
                name="answer"
                value={formData.answer}
                onChange={handleFormChange}
                style={{
                  ...inputStyle,
                  minHeight: "120px",
                  resize: "vertical",
                }}
                placeholder="Enter the AI's response..."
                required
              />
              <div
                style={{
                  textAlign: "right",
                  fontSize: "0.75rem",
                  color: "#94a3b8",
                  marginTop: "0.25rem",
                }}
              >
                {formData.answer.length} chars
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                gap: "1rem",
              }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    fontWeight: "600",
                    color: "#cbd5f5",
                  }}
                >
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleFormChange}
                  style={inputStyle}
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    fontWeight: "60",
                    color: "#cbd5f5",
                  }}
                >
                  Intent Tag
                </label>
                <select
                  name="intent"
                  value={formData.intent}
                  onChange={handleFormChange}
                  style={inputStyle}
                >
                  {INTENTS.map((intent) => (
                    <option key={intent} value={intent}>
                      {intent}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.75rem",
                backgroundColor: "#0f172a",
                borderRadius: "8px",
              }}
            >
              <input
                type="checkbox"
                name="active"
                checked={formData.active}
                onChange={handleFormChange}
                style={{ width: "18px", height: "18px", cursor: "pointer" }}
              />
              <div>
                <span
                  style={{
                    display: "block",
                    fontWeight: "600",
                    color: "#e2e8f0",
                  }}
                >
                  Active
                </span>
                <span style={{ fontSize: "0.8rem", color: "#94a3b8" }}>
                  Inactive FAQs won't be used by AI
                </span>
              </div>
            </div>

            <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem" }}>
              <button
                type="submit"
                style={{
                  ...buttonStyle("primary"),
                  flex: 1,
                  justifyContent: "center",
                }}
              >
                <FaCheck /> {editingFaq ? "Update FAQ" : "Save FAQ"}
              </button>
              {editingFaq && (
                <button
                  type="button"
                  style={{
                    ...buttonStyle("secondary"),
                    flex: 1,
                    justifyContent: "center",
                  }}
                  onClick={handleAddNewClick}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
