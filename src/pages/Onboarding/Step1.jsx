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
              className="flex flex-col items-center gap-5 p-4 border border-gray-200 rounded-lg hover:border-black cursor-pointer"
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
              <h3 className="text-base text-gray-600">{label}</h3>
            </label>
          ))}
        </div>
        <p className="text-sm text-gray-500 mt-4">
          Choose the platform that powers your store. You can change this later.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Business name
          </label>
          <input
            value={bp.name ?? ""}
            onChange={(e) =>
              updateSectionField("businessProfile", "name", e.target.value)
            }
            placeholder="Acme Store"
            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:border-black transition"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Primary domain
          </label>
          <input
            value={bp.domain ?? ""}
            onChange={(e) =>
              updateSectionField("businessProfile", "domain", e.target.value)
            }
            placeholder="example.com"
            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:border-black transition"
          />
          <p className="text-xs text-gray-500 mt-2">
            Use the domain customers visit (no http/https needed).
          </p>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Industry
          </label>
          <select
            value={bp.industry ?? ""}
            onChange={(e) =>
              updateSectionField("businessProfile", "industry", e.target.value)
            }
            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:border-black transition"
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
