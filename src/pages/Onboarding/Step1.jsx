import { useState } from "react";

export default function Step1() {
  const [selected, setSelected] = useState("");
  const systems = [
    "Magento",
    "Shopify",
    "Shopware",
    "Shopware 6",
    "WooCommerce",
    "Other",
  ];
  return (
    <div className="space-y-10">
      <div className="flex items-center flex-col gap-3">
        <h3 className="text-2xl font-bold text-center">
          What is your shop System
        </h3>
        <p className="text-gray-500">
          Choose the system which you either currently using or you plan to use
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {systems.map((label) => (
          <label
            key={label}
            className="flex flex-col items-center gap-5 p-4 border rounded-lg hover:border-blue-500 cursor-pointer"
          >
            <input
              type="radio"
              name="shopSystem"
              value={label}
              checked={selected === label}
              onChange={() => setSelected(label)}
              className="mb-2 self-start"
            />
            <img
              src="/src/EchoAIAssets/shopify-seeklogo.png"
              className="w-48 h-auto"
            />
            <h3 className="text-lg text-gray-500">{label}</h3>
          </label>
        ))}
      </div>
    </div>
  );
}
