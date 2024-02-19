import React, { useContext, useState } from "react";
import HtmlProps from "../props/html.props";
import { useScopedTranslation } from "./i18n.provider";

export enum QuestionnaireStep {
  None = -1,
  BMR = 0,
  PhysicalActivity = 1,
  CaloricDeficit = 2,
  NutrientDistribution = 3,
  Resume = 4,
}

interface IStepProvider {
  currentStep: Step;
  steps: Step[];
  nextStep: () => void;
  previousStep: () => void;
  goTo: (step: QuestionnaireStep) => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  setCurrentStepValidity: (isValid: boolean) => void;
}

export interface Step {
  key: QuestionnaireStep;
  label: string;
  isStepValid?: boolean;
}
export const StepContext = React.createContext<IStepProvider>({
  currentStep: { key: QuestionnaireStep.None, label: "" },
  steps: [],
  nextStep: () => {},
  previousStep: () => {},
  goTo: (step) => {},
  isFirstStep: true,
  isLastStep: false,
  setCurrentStepValidity: (isValid: boolean) => {},
});

export default function StepProvider({ children }: HtmlProps) {
  const { t } = useScopedTranslation("QuestionnaireStep");
  const steps = [
    {
      key: QuestionnaireStep.BMR,
      label: t(QuestionnaireStep[QuestionnaireStep.BMR]),
    },
    {
      key: QuestionnaireStep.PhysicalActivity,
      label: t(QuestionnaireStep[QuestionnaireStep.PhysicalActivity]),
      isStepValid: true,
    },
    {
      key: QuestionnaireStep.CaloricDeficit,
      label: t(QuestionnaireStep[QuestionnaireStep.CaloricDeficit]),
      isStepValid: true,
    },
    {
      key: QuestionnaireStep.NutrientDistribution,
      label: t(QuestionnaireStep[QuestionnaireStep.NutrientDistribution]),
      isStepValid: true,
    },
    {
      key: QuestionnaireStep.Resume,
      label: t(QuestionnaireStep[QuestionnaireStep.Resume]),
    },
  ];

  const [currentStep, setCurrentStep] = useState<Step>(steps[0]);

  const findStep = (step: QuestionnaireStep) => {
    return steps.filter((s) => s.key == step)[0];
  };

  const nextStep = () => {
    goTo(currentStep.key + 1);
  };

  const previousStep = () => {
    goTo(currentStep.key - 1);
  };

  const goTo = (step: QuestionnaireStep) => {
    setCurrentStep((prev) => {
      if (prev.key <= QuestionnaireStep.Resume && prev.key >= 0) {
        const goToStep: Step = findStep(step);
        return goToStep;
      }
      return currentStep;
    });
  };

  const setCurrentStepValidity = (isValid: boolean) => {
    setCurrentStep((prev) => {
      const newStep = { ...prev };
      newStep.isStepValid = isValid;
      return newStep;
    });
  };

  return (
    <StepContext.Provider
      value={{
        currentStep,
        steps,
        nextStep,
        previousStep,
        goTo,
        isFirstStep: currentStep.key == steps[0].key,
        isLastStep: currentStep.key == steps[steps.length - 1].key,
        setCurrentStepValidity,
      }}
    >
      {children}
    </StepContext.Provider>
  );
}

export function useStepper() {
  const context = useContext(StepContext);
  if (context == undefined) {
    throw Error(`le hook ${useStepper.name} doit être utilisé dans le scope d'un ${StepProvider.name}`);
  }
  return context;
}
