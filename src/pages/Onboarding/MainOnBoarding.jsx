import ProgressBar from "../../components/ui/ProgressBar";
import React from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";

export default function MainOnboarding() {
  const [currentStep, setCurrentStep] = React.useState(1);
  // Calculate progress based on current step (1=25%, 2=50%, 3=75%, 4=100%)
  const barValue = currentStep * 25;

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1 />;
      case 2:
        return <Step2 />;
      case 3:
        return <Step3 />;
      case 4:
        return <Step4 />;
      default:
        return <Step1 />;
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "2rem auto", padding: "0 1rem" }}>
      <ProgressBar value={barValue} />
      <div
        className="onboarding-content"
        style={{ padding: "2rem 0", minHeight: "150px" }}
      >
        {renderStep()}
      </div>
      <div
        className="onboarding-controls"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <button
          onClick={handleBack}
          disabled={currentStep === 1}
          style={{
            padding: "0.5rem 1.5rem",
            borderRadius: "4px",
            border: "1px solid #ccc",
            backgroundColor: "transparent",
            cursor: currentStep === 1 ? "default" : "pointer",
            opacity: currentStep === 1 ? 0 : 1,
            visibility: currentStep === 1 ? "hidden" : "visible",
             backgroundColor: "#007bff",
            color: "#fff",
          }}
        >
          Back
        </button>
        <button
          onClick={handleNext}
          style={{
            padding: "0.5rem 1.5rem",
            borderRadius: "4px",
            border: "none",
            backgroundColor: "#007bff",
            color: "#fff",
            cursor: "pointer",
            opacity: 1,
          }}
        >
          {currentStep === 4 ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
}
