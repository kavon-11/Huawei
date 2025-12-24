export default function Step2({ data, updateSectionField }) {
  const bp = data?.businessProfile ?? {};
  const c = data?.contactInfo ?? {};

  const contactMethods = [
    { value: "email", label: "Email" },
    { value: "phone", label: "Phone" },
    { value: "whatsapp", label: "WhatsApp" },
  ];

  const currencyOptions = [
    "USD",
    "EUR",
    "GBP",
    "SAR",
    "AED",
    "EGP",
    "TRY",
    "Other",
  ];

  const inputClass =
    "w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition";
  const labelClass = "block text-sm font-medium text-white mb-2";

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={labelClass}>Primary contact name</label>
          <input
            value={c.primaryContactName ?? ""}
            onChange={(e) =>
              updateSectionField(
                "contactInfo",
                "primaryContactName",
                e.target.value
              )
            }
            placeholder="Dr. Ahmed Samir"
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Email
          </label>
          <input
            type="email"
            value={c.email ?? ""}
            onChange={(e) =>
              updateSectionField("contactInfo", "email", e.target.value)
            }
            placeholder="info@skyalexdental.com"
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Phone (optional)
          </label>
          <input
            value={c.phone ?? ""}
            onChange={(e) =>
              updateSectionField("contactInfo", "phone", e.target.value)
            }
            placeholder="+20 10 1234 5678"
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Preferred contact method
          </label>
          <select
            value={c.preferredContactMethod ?? "email"}
            onChange={(e) =>
              updateSectionField(
                "contactInfo",
                "preferredContactMethod",
                e.target.value
              )
            }
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 pe-10 py-3 text-sm text-white focus:outline-none focus:border-white/30 transition appearance-none [&>option]:bg-[#060606] [&>option]:text-white"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 0.75rem center",
              backgroundSize: "1.25rem 1.25rem",
            }}
          >
            {contactMethods.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Timezone
          </label>
          <input
            value={bp.timezone ?? ""}
            onChange={(e) =>
              updateSectionField("businessProfile", "timezone", e.target.value)
            }
            placeholder="Africa/Cairo"
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition"
          />
          <p className="text-xs text-gray-400 mt-2">
            Tip: use IANA format (e.g. Africa/Cairo).
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Currency
          </label>
          <select
            value={bp.currency ?? ""}
            onChange={(e) =>
              updateSectionField("businessProfile", "currency", e.target.value)
            }
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 pe-10 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition appearance-none [&>option]:bg-[#060606] [&>option]:text-white"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 0.75rem center",
              backgroundSize: "1.25rem 1.25rem",
            }}
          >
            <option value="" disabled>
              Select a currency
            </option>
            {currencyOptions.map((cur) => (
              <option key={cur} value={cur}>
                {cur}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
