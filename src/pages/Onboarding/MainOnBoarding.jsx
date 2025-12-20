import Header from "@/components/home/Header";
import { useState } from "react";
import TimelineStepper from "./TimelineStepper";
import StepsContainer from "./StepsContainer";

export default function MainOnboarding() {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]);

  const handleNextStep = () => {
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

  return (
    <>
      <Header mode="light" />
      <section className="bg-white min-h-screen grid grid-cols-[2fr_1fr] gap-8">
        <StepsContainer
          currentStep={currentStep}
          onNextStep={handleNextStep}
          onBackStep={handleBackStep}
        />
        <TimelineStepper
          currentStep={currentStep}
          completedSteps={completedSteps}
        />
      </section>
    </>
  );
}
