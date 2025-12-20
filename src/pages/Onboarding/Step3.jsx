export default function Step3({ data, updateSectionField }) {
  const caps = data?.onboardingCapabilities ?? {};
  const routing = data?.callRoutingPolicy ?? {};
  const goals = data?.callGoalsAndCaptureRules ?? {};
  const telephony = data?.telephony ?? {}; // NEW: Telephony state

  const mainOutcomes = goals.mainOutcomes ?? {};
  const requiredFields = goals.requiredFields ?? {};
  const escalation = goals.escalationConditions ?? {};

  const toggleClass =
    "flex items-center justify-between gap-4 border border-gray-200 rounded-lg px-4 py-3";

  const setNested = (section, parentKey, key, value) => {
    updateSectionField(section, parentKey, {
      ...(data?.[section]?.[parentKey] ?? {}),
      [key]: value,
    });
  };

  return (
    <div className="space-y-10">
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">Capabilities</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className={toggleClass}>
            <div>
              <p className="text-sm font-medium">Voice calls</p>
              <p className="text-xs text-gray-500">
                Enable phone-based assistant
              </p>
            </div>
            <input
              type="checkbox"
              checked={Boolean(caps.voiceEnabled)}
              onChange={(e) =>
                updateSectionField(
                  "onboardingCapabilities",
                  "voiceEnabled",
                  e.target.checked
                )
              }
              className="h-4 w-4"
            />
          </label>

          <label className={toggleClass}>
            <div>
              <p className="text-sm font-medium">Chat</p>
              <p className="text-xs text-gray-500">
                Enable website chat assistant
              </p>
            </div>
            <input
              type="checkbox"
              checked={Boolean(caps.chatEnabled)}
              onChange={(e) =>
                updateSectionField(
                  "onboardingCapabilities",
                  "chatEnabled",
                  e.target.checked
                )
              }
              className="h-4 w-4"
            />
          </label>

          <label className={toggleClass}>
            <div>
              <p className="text-sm font-medium">CRM integration</p>
              <p className="text-xs text-gray-500">Sync leads and contacts</p>
            </div>
            <input
              type="checkbox"
              checked={Boolean(caps.crmIntegration)}
              onChange={(e) =>
                updateSectionField(
                  "onboardingCapabilities",
                  "crmIntegration",
                  e.target.checked
                )
              }
              className="h-4 w-4"
            />
          </label>

          <label className={toggleClass}>
            <div>
              <p className="text-sm font-medium">Analytics</p>
              <p className="text-xs text-gray-500">
                Track performance and KPIs
              </p>
            </div>
            <input
              type="checkbox"
              checked={Boolean(caps.analyticsEnabled)}
              onChange={(e) =>
                updateSectionField(
                  "onboardingCapabilities",
                  "analyticsEnabled",
                  e.target.checked
                )
              }
              className="h-4 w-4"
            />
          </label>
        </div>
      </div>

      {/* NEW: Telephony Section */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">
          Telephony setup (brief)
        </h4>
        <p className="text-xs text-gray-500 mb-4">
          You'll complete this in Settings → Telephony after onboarding. For
          now, select your preferred provider.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preferred provider
            </label>
            <select
              value={telephony.provider ?? "twilio"}
              onChange={(e) =>
                updateSectionField("telephony", "provider", e.target.value)
              }
              className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:border-black transition"
            >
              <option value="twilio">Twilio</option>
              <option value="telnyx">Telnyx</option>
              <option value="other-sip">Other (SIP)</option>
            </select>
            <p className="text-xs text-gray-500 mt-2">
              We'll guide you through connecting your numbers after this step.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Allow SMS follow-up?
            </label>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="smsFollowUp"
                  checked={Boolean(telephony.allowSmsFollowUp)}
                  onChange={() =>
                    updateSectionField("telephony", "allowSmsFollowUp", true)
                  }
                  className="h-4 w-4"
                />
                <span className="text-sm">Yes</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="smsFollowUp"
                  checked={!Boolean(telephony.allowSmsFollowUp)}
                  onChange={() =>
                    updateSectionField("telephony", "allowSmsFollowUp", false)
                  }
                  className="h-4 w-4"
                />
                <span className="text-sm">No</span>
              </label>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Enable SMS follow-ups to callers after voicemail or missed calls.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">
          Call routing (baseline)
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Business hours
            </label>
            <input
              value={routing.hours ?? ""}
              onChange={(e) =>
                updateSectionField("callRoutingPolicy", "hours", e.target.value)
              }
              placeholder="Mon–Fri 09:00–18:00"
              className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:border-black transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Languages
            </label>
            <input
              value={routing.languages ?? ""}
              onChange={(e) =>
                updateSectionField(
                  "callRoutingPolicy",
                  "languages",
                  e.target.value
                )
              }
              placeholder="Arabic, English"
              className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:border-black transition"
            />
            <p className="text-xs text-gray-500 mt-2">
              Separate multiple languages with commas.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fallback route (optional)
            </label>
            <input
              value={routing.fallbackRoute ?? ""}
              onChange={(e) =>
                updateSectionField(
                  "callRoutingPolicy",
                  "fallbackRoute",
                  e.target.value
                )
              }
              placeholder="Forward to +20..., voicemail, or queue"
              className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:border-black transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Escalation group (optional)
            </label>
            <input
              value={routing.escalationGroup ?? ""}
              onChange={(e) =>
                updateSectionField(
                  "callRoutingPolicy",
                  "escalationGroup",
                  e.target.value
                )
              }
              placeholder="Sales, Support, or a team email"
              className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:border-black transition"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Routing timezone (optional)
            </label>
            <input
              value={routing.timeZone ?? ""}
              onChange={(e) =>
                updateSectionField(
                  "callRoutingPolicy",
                  "timeZone",
                  e.target.value
                )
              }
              placeholder="If different from business timezone"
              className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:border-black transition"
            />
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">
          Call goals & capture rules
        </h4>

        <div className="space-y-6">
          <div>
            <p className="text-sm font-medium text-gray-700 mb-3">
              Main call outcomes
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className={toggleClass}>
                <span className="text-sm">Lead capture</span>
                <input
                  type="checkbox"
                  checked={Boolean(mainOutcomes.leadCapture)}
                  onChange={(e) =>
                    setNested(
                      "callGoalsAndCaptureRules",
                      "mainOutcomes",
                      "leadCapture",
                      e.target.checked
                    )
                  }
                  className="h-4 w-4"
                />
              </label>
              <label className={toggleClass}>
                <span className="text-sm">Appointment booking</span>
                <input
                  type="checkbox"
                  checked={Boolean(mainOutcomes.appointmentBooking)}
                  onChange={(e) =>
                    setNested(
                      "callGoalsAndCaptureRules",
                      "mainOutcomes",
                      "appointmentBooking",
                      e.target.checked
                    )
                  }
                  className="h-4 w-4"
                />
              </label>
              <label className={toggleClass}>
                <span className="text-sm">Support triage</span>
                <input
                  type="checkbox"
                  checked={Boolean(mainOutcomes.supportTriage)}
                  onChange={(e) =>
                    setNested(
                      "callGoalsAndCaptureRules",
                      "mainOutcomes",
                      "supportTriage",
                      e.target.checked
                    )
                  }
                  className="h-4 w-4"
                />
              </label>
              <label className={toggleClass}>
                <span className="text-sm">FAQs only</span>
                <input
                  type="checkbox"
                  checked={Boolean(mainOutcomes.faqsOnly)}
                  onChange={(e) =>
                    setNested(
                      "callGoalsAndCaptureRules",
                      "mainOutcomes",
                      "faqsOnly",
                      e.target.checked
                    )
                  }
                  className="h-4 w-4"
                />
              </label>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-700 mb-3">
              Required fields to collect
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className={toggleClass}>
                <span className="text-sm">Name</span>
                <input
                  type="checkbox"
                  checked={Boolean(requiredFields.name)}
                  onChange={(e) =>
                    setNested(
                      "callGoalsAndCaptureRules",
                      "requiredFields",
                      "name",
                      e.target.checked
                    )
                  }
                  className="h-4 w-4"
                />
              </label>
              <label className={toggleClass}>
                <span className="text-sm">Phone</span>
                <input
                  type="checkbox"
                  checked={Boolean(requiredFields.phone)}
                  onChange={(e) =>
                    setNested(
                      "callGoalsAndCaptureRules",
                      "requiredFields",
                      "phone",
                      e.target.checked
                    )
                  }
                  className="h-4 w-4"
                />
              </label>
              <label className={toggleClass}>
                <span className="text-sm">Email</span>
                <input
                  type="checkbox"
                  checked={Boolean(requiredFields.email)}
                  onChange={(e) =>
                    setNested(
                      "callGoalsAndCaptureRules",
                      "requiredFields",
                      "email",
                      e.target.checked
                    )
                  }
                  className="h-4 w-4"
                />
              </label>
              <label className={toggleClass}>
                <span className="text-sm">Reason for call</span>
                <input
                  type="checkbox"
                  checked={Boolean(requiredFields.reasonForCall)}
                  onChange={(e) =>
                    setNested(
                      "callGoalsAndCaptureRules",
                      "requiredFields",
                      "reasonForCall",
                      e.target.checked
                    )
                  }
                  className="h-4 w-4"
                />
              </label>
              <label className={toggleClass}>
                <span className="text-sm">Budget</span>
                <input
                  type="checkbox"
                  checked={Boolean(requiredFields.budget)}
                  onChange={(e) =>
                    setNested(
                      "callGoalsAndCaptureRules",
                      "requiredFields",
                      "budget",
                      e.target.checked
                    )
                  }
                  className="h-4 w-4"
                />
              </label>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              These drive what the assistant asks for during calls.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-medium text-gray-700 mb-3">
                Escalation conditions
              </p>
              <div className="space-y-3">
                <label className={toggleClass}>
                  <span className="text-sm">Angry caller</span>
                  <input
                    type="checkbox"
                    checked={Boolean(escalation.angryCaller)}
                    onChange={(e) =>
                      setNested(
                        "callGoalsAndCaptureRules",
                        "escalationConditions",
                        "angryCaller",
                        e.target.checked
                      )
                    }
                    className="h-4 w-4"
                  />
                </label>
                <label className={toggleClass}>
                  <span className="text-sm">Legal issue</span>
                  <input
                    type="checkbox"
                    checked={Boolean(escalation.legalIssue)}
                    onChange={(e) =>
                      setNested(
                        "callGoalsAndCaptureRules",
                        "escalationConditions",
                        "legalIssue",
                        e.target.checked
                      )
                    }
                    className="h-4 w-4"
                  />
                </label>
                <label className={toggleClass}>
                  <span className="text-sm">Emergency</span>
                  <input
                    type="checkbox"
                    checked={Boolean(escalation.emergency)}
                    onChange={(e) =>
                      setNested(
                        "callGoalsAndCaptureRules",
                        "escalationConditions",
                        "emergency",
                        e.target.checked
                      )
                    }
                    className="h-4 w-4"
                  />
                </label>
                <label className={toggleClass}>
                  <span className="text-sm">VIP numbers</span>
                  <input
                    type="checkbox"
                    checked={Boolean(escalation.vipNumbers)}
                    onChange={(e) =>
                      setNested(
                        "callGoalsAndCaptureRules",
                        "escalationConditions",
                        "vipNumbers",
                        e.target.checked
                      )
                    }
                    className="h-4 w-4"
                  />
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                “Never do” rules (optional)
              </label>
              <textarea
                value={goals.neverDoRules ?? ""}
                onChange={(e) =>
                  updateSectionField(
                    "callGoalsAndCaptureRules",
                    "neverDoRules",
                    e.target.value
                  )
                }
                placeholder="Topics the assistant must not answer, or cases that must always escalate"
                rows={6}
                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:border-black transition"
              />
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  VIP numbers (optional)
                </label>
                <textarea
                  value={goals.vipNumbers ?? ""}
                  onChange={(e) =>
                    updateSectionField(
                      "callGoalsAndCaptureRules",
                      "vipNumbers",
                      e.target.value
                    )
                  }
                  placeholder="One per line: +2010..., +9715..."
                  rows={3}
                  className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:border-black transition"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
