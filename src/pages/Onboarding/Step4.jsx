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
          <label className="block text-sm font-medium text-white mb-2">
            Receptionist name
          </label>
          <input
            value={persona.name ?? ""}
            onChange={(e) =>
              updateSectionField("receptionistPersona", "name", e.target.value)
            }
            placeholder="Echo"
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">
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
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 pe-10 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition appearance-none [&>option]:bg-[#060606] [&>option]:text-white"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 0.75rem center",
              backgroundSize: "1.25rem 1.25rem",
            }}
          >
            {voiceModels.map((m) => (
              <option key={m.value || "__empty"} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-white mb-2">
            Tone (optional)
          </label>
          <select
            value={persona.tone ?? ""}
            onChange={(e) =>
              updateSectionField("receptionistPersona", "tone", e.target.value)
            }
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 pe-10 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition appearance-none [&>option]:bg-[#060606] [&>option]:text-white"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 0.75rem center",
              backgroundSize: "1.25rem 1.25rem",
            }}
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
          <label className="block text-sm font-medium text-white mb-2">
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
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition"
          />
          <p className="text-xs text-gray-400 mt-2">
            Keep it short. The assistant will adapt by intent.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">
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
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition"
          />
        </div>
      </div>
    </div>
  );
}
