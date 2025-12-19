import Header from "@/components/home/Header";
import TimelineStepper from "./TimelineStepper";
import StepsContainer from "./StepsContainer";

export default function MainOnboarding() {
  return (
    <>
      <Header mode="light" />
      <section className="bg-white min-h-screen grid grid-cols-[2fr_1fr] gap-8">
        <StepsContainer />
        <TimelineStepper />
      </section>
    </>
  );
}
