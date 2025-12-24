import {
  FaShoppingCart,
  FaHospital,
  FaHotel,
  FaUtensils,
  FaBriefcase,
  FaBuilding,
  FaGraduationCap,
  FaEllipsisH,
} from "react-icons/fa";

export default function Step1({ data, updateSectionField }) {
  const selected = data?.businessProfile?.shopSystem ?? "";
  const industries = [
    {
      name: "E-commerce",
      icon: FaShoppingCart,
      gradient: "from-blue-500 to-purple-500",
    },
    {
      name: "Healthcare",
      icon: FaHospital,
      gradient: "from-red-500 to-pink-500",
    },
    {
      name: "Hospitality",
      icon: FaHotel,
      gradient: "from-orange-500 to-yellow-500",
    },
    {
      name: "Restaurant",
      icon: FaUtensils,
      gradient: "from-green-500 to-teal-500",
    },
    {
      name: "Professional Services",
      icon: FaBriefcase,
      gradient: "from-indigo-500 to-blue-500",
    },
    {
      name: "Real Estate",
      icon: FaBuilding,
      gradient: "from-purple-500 to-pink-500",
    },
    {
      name: "Education",
      icon: FaGraduationCap,
      gradient: "from-cyan-500 to-blue-500",
    },
    {
      name: "Other",
      icon: FaEllipsisH,
      gradient: "from-gray-500 to-slate-500",
    },
  ];

  const bp = data?.businessProfile ?? {};
  const showOtherInput = selected === "Other";

  return (
    <div className="space-y-10">
      <div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {industries.map((industry) => {
            const IconComponent = industry.icon;
            const isSelected = selected === industry.name;

            return (
              <label
                key={industry.name}
                className={`flex flex-col items-center gap-4 p-6 border rounded-xl cursor-pointer backdrop-blur-xl transition-all duration-300 ${
                  isSelected
                    ? "border-white/40 bg-white/10 scale-105"
                    : "border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/8"
                }`}
              >
                <input
                  type="radio"
                  name="shopSystem"
                  value={industry.name}
                  checked={isSelected}
                  onChange={() =>
                    updateSectionField(
                      "businessProfile",
                      "shopSystem",
                      industry.name
                    )
                  }
                  className="sr-only"
                />
                <div
                  className={`p-6 rounded-full bg-gradient-to-br ${industry.gradient} bg-opacity-20`}
                >
                  <IconComponent className="text-white text-4xl" />
                </div>
                <h3 className="text-sm font-medium text-gray-200 text-center">
                  {industry.name}
                </h3>
              </label>
            );
          })}
        </div>
        <p className="text-sm text-gray-400 mt-4">
          Select your industry to customize your AI receptionist experience.
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

        {showOtherInput && (
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-white mb-2">
              Specify your industry
            </label>
            <input
              value={bp.industry ?? ""}
              onChange={(e) =>
                updateSectionField(
                  "businessProfile",
                  "industry",
                  e.target.value
                )
              }
              placeholder="e.g., Manufacturing, Logistics, Legal Services"
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition"
            />
            <p className="text-xs text-gray-400 mt-2">
              Tell us about your specific industry or business type.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
