import ProgressBar from "../../components/ui/ProgressBar";
import React from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";

export default function MainOnboarding() {
  const [currentStep, setCurrentStep] = React.useState(1);
  const [isStepValid, setIsStepValid] = React.useState(false);
  const [stepValidity, setStepValidity] = React.useState({
    1: false,
    2: false,
    3: false,
    4: true,
  });
  // Calculate progress based on current step (1=25%, 2=50%, 3=75%, 4=100%)
  const barValue = currentStep * 25;

  const updateStepValidity = React.useCallback(
    (step, value) => {
      setStepValidity((prev) => {
        if (prev[step] === value) return prev;
        return { ...prev, [step]: value };
      });
      if (step === currentStep) {
        setIsStepValid(value);
      }
    },
    [currentStep]
  );

  React.useEffect(() => {
    setIsStepValid(stepValidity[currentStep] ?? false);
  }, [currentStep, stepValidity]);

  const handleNext = () => {
    if (!isStepValid) {
      return;
    }
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
        return <Step1 setStepValid={(value) => updateStepValidity(1, value)} />;
      case 2:
        return <Step2 setStepValid={(value) => updateStepValidity(2, value)} />;
      case 3:
        return <Step3 setStepValid={(value) => updateStepValidity(3, value)} />;
      case 4:
        return <Step4 />;
      default:
        return <Step1 setStepValid={(value) => updateStepValidity(1, value)} />;
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
             backgroundColor: "#007bff",
            color: "#fff",
            cursor: currentStep === 1 ? "default" : "pointer",
            opacity: currentStep === 1 ? 0 : 1,
            visibility: currentStep === 1 ? "hidden" : "visible",
            transition: "all 0.2s ease",
          }}
        >
          Back
        </button>
        <button
          onClick={handleNext}
          disabled={!isStepValid}
          style={{
            padding: "0.5rem 1.5rem",
            borderRadius: "4px",
            border: "none",
            backgroundColor: "#007bff",
            color: "#fff",
            cursor: !isStepValid ? "not-allowed" : "pointer",
            opacity: !isStepValid ? 0.5 : 1,
            transition: "all 0.2s ease",
          }}
        >
          {currentStep === 4 ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
}
