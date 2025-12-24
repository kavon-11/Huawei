export default function Step1({ data, updateSectionField }) {
  const selected = data?.businessProfile?.shopSystem ?? "";
  const systems = [
    "Magento",
    "Shopify",
    "Shopware",
    "Shopware 6",
    "WooCommerce",
    "Other",
  ];

  const industryOptions = [
    "E-commerce",
    "Retail",
    "Services",
    "Healthcare",
    "Education",
    "Real Estate",
    "Other",
  ];

  const bp = data?.businessProfile ?? {};

  return (
    <div className="space-y-10">
      <div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {systems.map((label) => (
            <label
              key={label}
              className="flex flex-col items-center gap-5 p-4 border border-white/10 rounded-lg hover:border-white/30 cursor-pointer bg-white/5 backdrop-blur-xl transition"
            >
              <input
                type="radio"
                name="shopSystem"
                value={label}
                checked={selected === label}
                onChange={() =>
                  updateSectionField("businessProfile", "shopSystem", label)
                }
                className="mb-2 self-start"
              />
              <img
                src="/src/EchoAIAssets/shopify-seeklogo.png"
                alt="Shop system"
                className="w-40 h-auto opacity-90"
              />
              <h3 className="text-base text-gray-300">{label}</h3>
            </label>
          ))}
        </div>
        <p className="text-sm text-gray-400 mt-4">
          Choose the platform that powers your store. You can change this later.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Business name
          </label>
          <input
            value={bp.name ?? ""}
            onChange={(e) =>
              updateSectionField("businessProfile", "name", e.target.value)
            }
            placeholder="Acme Store"
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Primary domain
          </label>
          <input
            value={bp.domain ?? ""}
            onChange={(e) =>
              updateSectionField("businessProfile", "domain", e.target.value)
            }
            placeholder="example.com"
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition"
          />
          <p className="text-xs text-gray-400 mt-2">
            Use the domain customers visit (no http/https needed).
          </p>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-white mb-2">
            Industry
          </label>
          <select
            value={bp.industry ?? ""}
            onChange={(e) =>
              updateSectionField("businessProfile", "industry", e.target.value)
            }
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 pe-10 py-3 text-sm text-white focus:outline-none focus:border-white/30 transition appearance-none [&>option]:bg-[#060606] [&>option]:text-white"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 0.75rem center",
              backgroundSize: "1.25rem 1.25rem",
            }}
          >
            <option value="" disabled>
              Select an industry
            </option>
            {industryOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
