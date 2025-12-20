import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import { ONBOARDING_STEPS } from "./onboardingSteps";

export default function StepsContainer({
  currentStep,
  onNextStep,
  onBackStep,
  onFinish,
  canProceed,
  data,
  setData,
}) {
  const steps = {
    1: Step1,
    2: Step2,
    3: Step3,
    4: Step4,
    5: Step5,
  };

  const ActiveStep = steps[currentStep] ?? Step1;
  const stepMeta = ONBOARDING_STEPS[currentStep - 1] ?? ONBOARDING_STEPS[0];

  const updateSectionField = (section, field, value) => {
    setData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const addKnowledgeFiles = (files) => {
    const nextFiles = Array.from(files || []).map((f) => ({
      name: f.name,
      size: f.size,
      type: f.type,
      lastModified: f.lastModified,
    }));

    setData((prev) => ({
      ...prev,
      knowledge: {
        ...prev.knowledge,
        files: [...(prev.knowledge.files || []), ...nextFiles],
      },
    }));
  };

  const removeKnowledgeFile = (index) => {
    setData((prev) => ({
      ...prev,
      knowledge: {
        ...prev.knowledge,
        files: (prev.knowledge.files || []).filter((_, i) => i !== index),
      },
    }));
  };

  const handlePrimaryCta = () => {
    if (currentStep >= 5) {
      onFinish?.();
      return;
    }
    onNextStep?.();
  };

  return (
    <div className="bg-gray-50 relative min-h-screen flex items-center justify-center">
      <div className="w-full max-w-3xl px-6 py-12">
        <div className="flex items-center flex-col gap-3 mb-10">
          <h3 className="text-2xl font-bold text-center">{stepMeta.title}</h3>
          <p className="text-gray-500 text-center">{stepMeta.description}</p>
        </div>
        <ActiveStep
          data={data}
          updateSectionField={updateSectionField}
          addKnowledgeFiles={addKnowledgeFiles}
          removeKnowledgeFile={removeKnowledgeFile}
        />
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
        onClick={handlePrimaryCta}
        disabled={!canProceed}
        className="absolute bottom-10 right-10 bg-black text-white px-6 py-3 rounded disabled:opacity-50"
      >
        {currentStep >= 5 ? "Finish" : "Next Step"}
      </button>
    </div>
  );
}
