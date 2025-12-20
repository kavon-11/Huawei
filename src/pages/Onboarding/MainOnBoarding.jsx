import Header from "@/components/home/Header";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TimelineStepper from "./TimelineStepper";
import StepsContainer from "./StepsContainer";

function getInitialOnboardingData() {
  return {
    businessProfile: {
      name: "",
      domain: "",
      timezone: "",
      currency: "",
      industry: "",
      notes: "",
      shopSystem: "",
    },
    contactInfo: {
      primaryContactName: "",
      email: "",
      phone: "",
      preferredContactMethod: "email",
    },
    onboardingCapabilities: {
      voiceEnabled: true,
      chatEnabled: false,
      crmIntegration: false,
      analyticsEnabled: true,
    },
    // NEW: Telephony & numbers configuration
    telephony: {
      provider: "twilio", // "twilio" | "telnyx" | "other-sip"
      mainNumber: "", // E.164 format: +20XXXXXXXXXX
      additionalNumbers: [], // array of E.164 numbers
      allowSmsFollowUp: false,
    },
    callRoutingPolicy: {
      hours: "",
      timeZone: "",
      languages: "",
      fallbackRoute: "",
      escalationGroup: "",
    },
    receptionistPersona: {
      name: "",
      voiceModel: "",
      tone: "",
      greetingScript: "",
      holdMessage: "",
    },
    callGoalsAndCaptureRules: {
      mainOutcomes: {
        leadCapture: true,
        appointmentBooking: false,
        supportTriage: false,
        faqsOnly: false,
      },
      requiredFields: {
        name: true,
        phone: true,
        email: false,
        reasonForCall: true,
        budget: false,
      },
      neverDoRules: "",
      escalationConditions: {
        angryCaller: true,
        legalIssue: true,
        emergency: true,
        vipNumbers: false,
      },
      vipNumbers: "",
    },
    knowledge: {
      websiteUrl: "",
      files: [],
      ingestionMethod: "web_scrape",
    },
    schedulingAndCrm: {
      calendarIntegration: "none",
      crmSystem: "none",
      appointmentTypes: "",
      bufferTimes: "",
    },
    complianceAndPolicies: {
      dataPrivacy: "",
      retentionPolicy: "",
      consentText: "",
    },
    // NEW: Notification preferences & webhooks
    notificationsAndIntegrations: {
      notifyOnNewLead: true,
      notifyOnNewBooking: true,
      notificationChannels: ["email"], // "email" | "sms" | "whatsapp" | "slack"
      outboundWebhookUrl: "", // n8n or custom webhook URL
      sendEventNewLead: true,
      sendEventNewAppointment: true,
      sendEventMissedCall: true,
    },
  };
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || "").trim());
}

function validateStep(stepNumber, data) {
  if (!data) return false;

  if (stepNumber === 1) {
    const bp = data.businessProfile;
    return Boolean(
      String(bp.shopSystem || "").trim() &&
        String(bp.name || "").trim() &&
        String(bp.domain || "").trim() &&
        String(bp.industry || "").trim()
    );
  }

  if (stepNumber === 2) {
    const bp = data.businessProfile;
    const c = data.contactInfo;
    return Boolean(
      String(c.primaryContactName || "").trim() &&
        isValidEmail(c.email) &&
        String(bp.timezone || "").trim() &&
        String(bp.currency || "").trim()
    );
  }

  if (stepNumber === 3) {
    const r = data.callRoutingPolicy;
    return Boolean(
      String(r.hours || "").trim() && String(r.languages || "").trim()
    );
  }

  if (stepNumber === 4) {
    const p = data.receptionistPersona;
    return Boolean(
      String(p.name || "").trim() &&
        String(p.voiceModel || "").trim() &&
        String(p.greetingScript || "").trim()
    );
  }

  if (stepNumber === 5) {
    const k = data.knowledge;
    const hasUrl = Boolean(String(k.websiteUrl || "").trim());
    const hasFiles = Array.isArray(k.files) && k.files.length > 0;
    return hasUrl || hasFiles;
  }

  return false;
}

export default function MainOnboarding() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [onboardingData, setOnboardingData] = useState(
    getInitialOnboardingData()
  );

  const canProceed = validateStep(currentStep, onboardingData);

  const handleNextStep = () => {
    if (!canProceed) return;
    setCompletedSteps((prev) =>
      prev.includes(currentStep) ? prev : [...prev, currentStep]
    );
    setCurrentStep((prev) => Math.min(prev + 1, 5));
  };

  const handleBackStep = () => {
    setCurrentStep((prev) => {
      const newStep = Math.max(prev - 1, 1);
      setCompletedSteps((completed) => completed.filter((s) => s < newStep));
      return newStep;
    });
  };

  const handleFinish = () => {
    if (!validateStep(5, onboardingData)) return;
    setCompletedSteps((prev) => (prev.includes(5) ? prev : [...prev, 5]));
    // TODO: Replace with API call when backend is ready
    console.log("Onboarding completed", onboardingData);
    navigate("/dashboard");
  };

  return (
    <>
      <Header mode="light" />
      <section className="bg-white min-h-screen grid grid-cols-[2fr_1fr] gap-8">
        <StepsContainer
          currentStep={currentStep}
          onNextStep={handleNextStep}
          onBackStep={handleBackStep}
          onFinish={handleFinish}
          canProceed={canProceed}
          data={onboardingData}
          setData={setOnboardingData}
        />
        <TimelineStepper
          currentStep={currentStep}
          completedSteps={completedSteps}
        />
      </section>
    </>
  );
}
