import ProgressBar from "../../components/ui/ProgressBar";
import React from "react";
export default function MainOnboarding() {
  const [barValue, setBarValue] = React.useState(0);
  return (
    <>
      <ProgressBar value={barValue} />
    </>
  );
}
