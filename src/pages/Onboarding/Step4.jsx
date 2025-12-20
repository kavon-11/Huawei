export default function Step4({ data, updateSectionField }) {
  const persona = data?.receptionistPersona ?? {};

  const voiceModels = [
    { value: "", label: "Select a voice model" },
    { value: "echo-neutral", label: "Echo Neutral" },
    { value: "echo-warm", label: "Echo Warm" },
    { value: "echo-professional", label: "Echo Professional" },
  ];

  const tones = [
    { value: "", label: "Select tone" },
    { value: "friendly", label: "Friendly" },
    { value: "professional", label: "Professional" },
    { value: "concise", label: "Concise" },
  ];

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Receptionist name
          </label>
          <input
            value={persona.name ?? ""}
            onChange={(e) =>
              updateSectionField("receptionistPersona", "name", e.target.value)
            }
            placeholder="Echo"
            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:border-black transition"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Voice model
          </label>
          <select
            value={persona.voiceModel ?? ""}
            onChange={(e) =>
              updateSectionField(
                "receptionistPersona",
                "voiceModel",
                e.target.value
              )
            }
            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:border-black transition"
          >
            {voiceModels.map((m) => (
              <option key={m.value || "__empty"} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tone (optional)
          </label>
          <select
            value={persona.tone ?? ""}
            onChange={(e) =>
              updateSectionField("receptionistPersona", "tone", e.target.value)
            }
            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:border-black transition"
          >
            {tones.map((t) => (
              <option key={t.value || "__empty"} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Greeting script
          </label>
          <textarea
            value={persona.greetingScript ?? ""}
            onChange={(e) =>
              updateSectionField(
                "receptionistPersona",
                "greetingScript",
                e.target.value
              )
            }
            placeholder="Hi! Thanks for calling Acme Store. How can I help you today?"
            rows={4}
            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:border-black transition"
          />
          <p className="text-xs text-gray-500 mt-2">
            Keep it short. The assistant will adapt by intent.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hold message (optional)
          </label>
          <textarea
            value={persona.holdMessage ?? ""}
            onChange={(e) =>
              updateSectionField(
                "receptionistPersona",
                "holdMessage",
                e.target.value
              )
            }
            placeholder="Thanks — one moment while I check that for you."
            rows={3}
            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:border-black transition"
          />
        </div>
      </div>
    </div>
  );
}
