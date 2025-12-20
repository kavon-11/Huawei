export default function Step5({
  data,
  updateSectionField,
  addKnowledgeFiles,
  removeKnowledgeFile,
}) {
  const knowledge = data?.knowledge ?? {};
  const scheduling = data?.schedulingAndCrm ?? {};
  const compliance = data?.complianceAndPolicies ?? {};

  const calendarOptions = [
    { value: "none", label: "Not now" },
    { value: "google", label: "Google Calendar" },
    { value: "office", label: "Office 365" },
    { value: "other", label: "Other" },
  ];

  const crmOptions = [
    { value: "none", label: "Not now" },
    { value: "hubspot", label: "HubSpot" },
    { value: "salesforce", label: "Salesforce" },
    { value: "zoho", label: "Zoho" },
    { value: "other", label: "Other" },
  ];

  const ingestionOptions = [
    { value: "web_scrape", label: "Website URL" },
    { value: "csv_upload", label: "CSV upload" },
    { value: "pdf_upload", label: "PDF upload" },
    { value: "manual_entry", label: "Manual entry" },
  ];

  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-gray-700">Knowledge sources</h4>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ingestion method
          </label>
          <select
            value={knowledge.ingestionMethod ?? "web_scrape"}
            onChange={(e) =>
              updateSectionField("knowledge", "ingestionMethod", e.target.value)
            }
            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:border-black transition"
          >
            {ingestionOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Website URL (recommended)
          </label>
          <input
            value={knowledge.websiteUrl ?? ""}
            onChange={(e) =>
              updateSectionField("knowledge", "websiteUrl", e.target.value)
            }
            placeholder="https://example.com"
            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:border-black transition"
          />
          <p className="text-xs text-gray-500 mt-2">
            We’ll use this to extract services, FAQs, and product context.
          </p>
        </div>

        <div className="border border-gray-200 rounded-lg p-4 bg-white">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium">Upload files (optional)</p>
              <p className="text-xs text-gray-500">
                CSV, PDF, or DOCX — pricing sheets, catalogs, policies, FAQs.
              </p>
            </div>
            <label className="inline-flex items-center justify-center px-4 py-2 rounded border border-gray-200 hover:border-black cursor-pointer text-sm">
              <input
                type="file"
                multiple
                accept=".csv,.pdf,.doc,.docx,.txt"
                onChange={(e) => {
                  addKnowledgeFiles?.(e.target.files);
                  e.target.value = "";
                }}
                className="hidden"
              />
              Add files
            </label>
          </div>

          {(knowledge.files || []).length > 0 && (
            <div className="mt-4 space-y-2">
              {(knowledge.files || []).map((f, idx) => (
                <div
                  key={`${f.name}-${f.lastModified}-${idx}`}
                  className="flex items-center justify-between gap-4 rounded border border-gray-200 px-3 py-2"
                >
                  <div className="min-w-0">
                    <p className="text-sm truncate">{f.name}</p>
                    <p className="text-xs text-gray-500 truncate">
                      {f.type || "file"} • {Math.round((f.size || 0) / 1024)} KB
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeKnowledgeFile?.(idx)}
                    className="text-sm px-3 py-1 rounded border border-gray-200 hover:border-black"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Scheduling</h4>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Calendar integration
          </label>
          <select
            value={scheduling.calendarIntegration ?? "none"}
            onChange={(e) =>
              updateSectionField(
                "schedulingAndCrm",
                "calendarIntegration",
                e.target.value
              )
            }
            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:border-black transition"
          >
            {calendarOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Appointment types (optional)
            </label>
            <input
              value={scheduling.appointmentTypes ?? ""}
              onChange={(e) =>
                updateSectionField(
                  "schedulingAndCrm",
                  "appointmentTypes",
                  e.target.value
                )
              }
              placeholder="Demo, Consultation"
              className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:border-black transition"
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Buffer times (optional)
            </label>
            <input
              value={scheduling.bufferTimes ?? ""}
              onChange={(e) =>
                updateSectionField(
                  "schedulingAndCrm",
                  "bufferTimes",
                  e.target.value
                )
              }
              placeholder="10 min before / 10 min after"
              className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:border-black transition"
            />
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">CRM</h4>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            CRM system
          </label>
          <select
            value={scheduling.crmSystem ?? "none"}
            onChange={(e) =>
              updateSectionField(
                "schedulingAndCrm",
                "crmSystem",
                e.target.value
              )
            }
            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:border-black transition"
          >
            {crmOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-500 mt-2">
            You can connect OAuth/API keys later.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <h4 className="text-sm font-medium text-gray-700">Compliance</h4>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Data privacy notes (optional)
          </label>
          <textarea
            value={compliance.dataPrivacy ?? ""}
            onChange={(e) =>
              updateSectionField(
                "complianceAndPolicies",
                "dataPrivacy",
                e.target.value
              )
            }
            placeholder="Any sensitive data or restrictions we should know about"
            rows={3}
            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:border-black transition"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Retention policy (optional)
          </label>
          <input
            value={compliance.retentionPolicy ?? ""}
            onChange={(e) =>
              updateSectionField(
                "complianceAndPolicies",
                "retentionPolicy",
                e.target.value
              )
            }
            placeholder="Keep call logs for 90 days"
            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:border-black transition"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Consent text (optional)
          </label>
          <textarea
            value={compliance.consentText ?? ""}
            onChange={(e) =>
              updateSectionField(
                "complianceAndPolicies",
                "consentText",
                e.target.value
              )
            }
            placeholder="This call may be recorded for quality and training purposes."
            rows={3}
            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:border-black transition"
          />
        </div>
      </div>

      <div className="border border-gray-200 rounded-lg p-4 bg-white">
        <p className="text-sm font-medium mb-2">Summary</p>
        <p className="text-sm text-gray-600">
          {data?.businessProfile?.name || "Your business"} •{" "}
          {data?.businessProfile?.domain || "Domain not set"}
        </p>
        <p className="text-xs text-gray-500 mt-2">
          Click Finish to complete onboarding. You can edit everything later.
        </p>
      </div>
    </div>
  );
}
