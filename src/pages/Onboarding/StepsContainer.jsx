import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";

export default function StepsContainer({
  currentStep,
  onNextStep,
  onBackStep,
}) {
  const steps = {
    1: Step1,
    2: Step2,
    3: Step3,
    4: Step4,
    5: Step5,
  };

  const ActiveStep = steps[currentStep] ?? Step1;

  return (
    <div className="bg-gray-50 relative min-h-screen flex items-center justify-center">
      <div className="w-full max-w-3xl px-6 py-12">
        <ActiveStep />
      </div>

      <button
        type="button"
        onClick={onBackStep}
        disabled={currentStep <= 1}
        className="absolute bottom-10 left-10 bg-black text-white px-6 py-3 rounded disabled:opacity-50"
      >
        Back
      </button>

      <button
        type="button"
        onClick={onNextStep}
        disabled={currentStep >= 5}
        className="absolute bottom-10 right-10 bg-black text-white px-6 py-3 rounded disabled:opacity-50"
      >
        Next Step
      </button>
    </div>
  );
}
