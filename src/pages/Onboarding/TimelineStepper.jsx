import { FaQuestionCircle } from "react-icons/fa";

export default function TimelineStepper({
  currentStep = 1,
  completedSteps = [],
}) {
  const steps = [
    {
      title: "Choose a shop system",
      description: "What is the system of your store",
    },
    {
      title: "Provide Industry",
      description: "What is your industry of store",
    },
    {
      title: "Provide domain",
      description: "Provide your primary domain",
    },
    {
      title: "Connect google accounts",
      description: "Google ads, google analytics, google tag manager, etc...",
    },
    {
      title: "Add product url",
      description: "Dummy text of the printing",
    },
  ];

  return (
    <div className="flex flex-col justify-between ">
      <ol className="relative border-s border-gray-200 mt-32 h-fit mx-16">
        {steps.map((step, idx) => {
          const stepNumber = idx + 1;
          const isCurrent = currentStep === stepNumber;
          const isCompleted = completedSteps.includes(stepNumber);

          const itemOpacity =
            isCurrent || isCompleted ? "opacity-100" : "opacity-50";

          const circleClass = isCompleted
            ? "bg-green-500 text-white"
            : isCurrent
            ? "bg-black text-white"
            : "bg-gray-300 text-gray-900";

          return (
            <li
              key={step.title}
              className={`${
                idx === steps.length - 1 ? "" : "mb-10"
              } ms-7 ${itemOpacity}`}
            >
              <span
                className={`absolute flex items-center justify-center w-8 h-8 ${circleClass} rounded-full -start-4 ring-4 ring-white`}
              >
                {isCompleted ? (
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 11.917 9.724 16.5 19 7.5"
                    />
                  </svg>
                ) : (
                  <span className="text-sm font-medium">{stepNumber}</span>
                )}
              </span>

              <h3
                className={`${
                  isCurrent ? "font-semibold" : "font-medium"
                } leading-tight`}
              >
                {step.title}
              </h3>
              <p className="text-sm">{step.description}</p>
            </li>
          );
        })}
      </ol>

      {/* Contact Us */}
      <div className="flex flex-col items-center m-10 mx-16">
        <FaQuestionCircle className="w-12 h-12 text-neutral-tertiary mb-4" />
        <h3 className="font-medium leading-tight mb-2">Need Help?</h3>
        <p className="text-sm text-center mb-4">
          If you're having any issues, feel free to contact us. We're here to
          assist you every step of the way.
        </p>
        <button className="bg-black text-white px-4 py-2 rounded">
          Contact Us
        </button>
      </div>
    </div>
  );
}
