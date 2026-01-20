import { CheckCircleIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/cn";

export default function Steps({ activeStep }) {
  return (
    <div className="flex items-center mt-10">
      <div
        className={`step ${
          activeStep === 1 ? "stepActive" : activeStep > 1 ? "stepFinished" : ""
        }`}
      >
        <span>1</span>
      </div>
      <div
        className={`stepSeparator ${
          activeStep > 1 ? "stepSeparatorFinished" : ""
        }`}
      >
        <div></div>
      </div>
      <div
        className={`step ${
          activeStep === 2 ? "stepActive" : activeStep > 2 ? "stepFinished" : ""
        }`}
      >
        <span>2</span>
      </div>
      <div
        className={`stepSeparator ${
          activeStep > 2 ? "stepSeparatorFinished" : ""
        }`}
      >
        <div></div>
      </div>
      <div
        className={`step ${
          activeStep === 3 ? "stepActive" : activeStep > 3 ? "stepFinished" : ""
        }`}
      >
        <span>3</span>
      </div>
      <div
        className={`stepSeparator ${
          activeStep > 3 ? "stepSeparatorFinished" : ""
        }`}
      >
        <div></div>
      </div>
      <div
        className={`step ${
          activeStep === 4 ? "stepActive" : activeStep > 4 ? "stepFinished" : ""
        }`}
      >
        <span>4</span>
      </div>
      <div
        className={`stepSeparator ${
          activeStep > 4 ? "stepSeparatorFinished" : ""
        }`}
      >
        <div></div>
      </div>
      <div
        className={`step ${
          activeStep === 5 ? "stepActive" : activeStep > 5 ? "stepFinished" : ""
        }`}
      >
        <span>5</span>
      </div>
      <div
        className={`stepSeparator ${
          activeStep > 5 ? "stepSeparatorFinished" : ""
        }`}
      >
        <div></div>
      </div>
      <div
        className={`step ${
          activeStep === 6 ? "stepActive" : activeStep > 6 ? "stepFinished" : ""
        }`}
      >
        <span>6</span>
      </div>
      <div
        className={`stepSeparator ${
          activeStep > 6 ? "stepSeparatorFinished" : ""
        }`}
      >
        <div></div>
      </div>
      <div className={`step ${activeStep === 7 ? "stepActive" : ""}`}>
        <span className="">
          <CheckCircleIcon
            className={cn(
              "w-6 h-6 text-gray-400",
              activeStep === 7 &&
                "text-white animate__animated animate__bounceIn"
            )}
          />
        </span>
      </div>
    </div>
  );
}
