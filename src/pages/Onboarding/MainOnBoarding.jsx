import Header from "@/components/home/Header";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TimelineStepper from "./TimelineStepper";
import StepsContainer from "./StepsContainer";

function getInitialOnboardingData() {
  return {
    businessProfile: {
      name: "TechVista Solutions",
      domain: "techvista.com",
      timezone: "America/New_York (UTC-5)",
      currency: "USD",
      industry: "E-commerce",
      notes: "Leading provider of innovative tech solutions",
      shopSystem: "Shopify",
    },
    contactInfo: {
      primaryContactName: "Sarah Johnson",
      email: "sarah.johnson@techvista.com",
      phone: "+1 (555) 123-4567",
      preferredContactMethod: "email",
    },
    onboardingCapabilities: {
      voiceEnabled: true,
      chatEnabled: true,
      crmIntegration: true,
      analyticsEnabled: true,
    },
    // NEW: Telephony & numbers configuration
    telephony: {
      provider: "twilio", // "twilio" | "telnyx" | "other-sip"
      mainNumber: "+1 (555) 987-6543", // E.164 format: +20XXXXXXXXXX
      additionalNumbers: ["+1 (555) 987-6544", "+1 (555) 987-6545"], // array of E.164 numbers
      allowSmsFollowUp: true,
    },
    callRoutingPolicy: {
      hours: "Monday - Friday: 9AM - 6PM, Saturday: 10AM - 4PM",
      timeZone: "America/New_York (UTC-5)",
      languages: "English, Spanish",
      fallbackRoute: "Transfer to voicemail after hours",
      escalationGroup: "support@techvista.com",
    },
    receptionistPersona: {
      name: "Alex",
      voiceModel: "Female (American)",
      tone: "Professional and Friendly",
      greetingScript:
        "Thank you for calling TechVista Solutions! I'm Alex, your AI assistant. How can I help you today?",
      holdMessage:
        "Thank you for your patience. Your call is important to us. Someone will be with you shortly.",
    },
    callGoalsAndCaptureRules: {
      mainOutcomes: {
        leadCapture: true,
        appointmentBooking: true,
        supportTriage: true,
        faqsOnly: false,
      },
      requiredFields: {
        name: true,
        phone: true,
        email: true,
        reasonForCall: true,
        budget: false,
      },
      neverDoRules:
        "Do not provide pricing without manager approval. Do not guarantee delivery dates. Do not discuss competitor products.",
      escalationConditions: {
        angryCaller: true,
        legalIssue: true,
        emergency: true,
        vipNumbers: true,
      },
      vipNumbers: "+1 (555) 111-2222, +1 (555) 333-4444",
    },
    knowledge: {
      websiteUrl: "https://www.techvista.com",
      files: [],
      ingestionMethod: "web_scrape",
    },
    schedulingAndCrm: {
      calendarIntegration: "google_calendar",
      crmSystem: "salesforce",
      appointmentTypes: "Product Demo, Technical Support, Sales Consultation",
      bufferTimes: "15 minutes between appointments",
    },
    complianceAndPolicies: {
      dataPrivacy: "We comply with GDPR and CCPA regulations",
      retentionPolicy: "Call recordings retained for 90 days",
      consentText:
        "This call may be recorded for quality and training purposes",
    },
    // NEW: Notification preferences & webhooks
    notificationsAndIntegrations: {
      notifyOnNewLead: true,
      notifyOnNewBooking: true,
      notificationChannels: ["email", "slack"], // "email" | "sms" | "whatsapp" | "slack"
      outboundWebhookUrl: "https://webhook.site/your-webhook-url", // n8n or custom webhook URL
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
      <Header mode="dark" />
      <section
        style={{ backgroundColor: "#060606" }}
        className="min-h-screen grid grid-cols-[2fr_1fr] gap-8"
      >
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
