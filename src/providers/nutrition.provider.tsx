import React, { useContext, useEffect, useState } from "react";
import HtmlProps from "../props/html.props";
import { computeAetq as computeTdee, computeBmr, computeTdeeWithDeficit, computeWeightLoss } from "../helpers/nutrition.helper";
import { PhysicalInformation } from "../entities/physical-information";
import { PhysicalActivity } from "../entities/physical-activity";

interface INutritionProvider {
  physicalInformation: PhysicalInformation | null;
  setPhysicalInformation: (pi: PhysicalInformation | null) => void;
  bmr: number | null;

  physicalActivity: PhysicalActivity;
  setPhysicalActivity: (activity: PhysicalActivity) => void;
  tdee: number | null;

  caloricDeficit: number;
  setCaloricDeficit: (percentage: number) => void;
  tdeeWithDeficit: number | null;
  weightLoss: number | null;

  carbohydratesInPercent: number;
  setCarbohydratesInPercent: (carbs: number) => void;
  proteinsInPercent: number;
  setProteinsInPercent: (prot: number) => void;
  fatInPercent: number;
  setFatInPercent: (fat: number) => void;
  carbohydrates: number;
  proteins: number;
  fat: number;
}

export const NutritionContext = React.createContext<INutritionProvider>({
  physicalInformation: null,
  setPhysicalInformation: () => {},
  bmr: null,

  physicalActivity: PhysicalActivity.Sedentary,
  setPhysicalActivity: () => {},
  tdee: null,

  caloricDeficit: 0,
  setCaloricDeficit: () => {},
  tdeeWithDeficit: null,
  weightLoss: null,

  carbohydratesInPercent: 0,
  setCarbohydratesInPercent: () => {},
  proteinsInPercent: 0,
  setProteinsInPercent: () => {},
  fatInPercent: 0,
  setFatInPercent: () => {},

  carbohydrates: 0,
  proteins: 0,
  fat: 0,
});

export default function NutritionProvider({ children }: HtmlProps) {
  const [physicalInformation, setPhysicalInformation] = useState<PhysicalInformation | null>(null);
  const [bmr, setBmr] = useState<number | null>(null);
  // Total Daily Energy Expenditure
  const [tdee, setTdee] = useState<number | null>(null);
  const [physicalActivity, setPhysicalActivity] = useState<PhysicalActivity>(PhysicalActivity.Sedentary);

  const [caloricDeficit, setCaloricDeficit] = useState<number>(1);
  const [tdeeWithDeficit, setTdeewithDeficit] = useState<number | null>(null);
  const [weightLoss, setWeightLoss] = useState<number | null>(null);

  const [carbohydratesInPercent, setCarbohydratesInPercent] = useState<number>(0);
  const [proteinsInPercent, setProteinsInPercent] = useState<number>(0);
  const [fatInPercent, setFatInPercent] = useState<number>(0);

  const [carbohydrates, setCarbohydrates] = useState<number>(0);
  const [proteins, setProteins] = useState<number>(0);
  const [fat, setFat] = useState<number>(0);

  useEffect(() => {
    if (physicalInformation) setBmr(computeBmr(physicalInformation));
  }, [physicalInformation]);

  useEffect(() => {
    if (bmr != null) {
      setTdee(computeTdee(bmr, physicalActivity));
    }
  }, [bmr, physicalActivity]);

  useEffect(() => {
    if (tdee != null) {
      const computedTdeeWithDeficit = computeTdeeWithDeficit(tdee, caloricDeficit);
      setTdeewithDeficit(computedTdeeWithDeficit);
      setWeightLoss(computeWeightLoss(computedTdeeWithDeficit, tdee));
    }
  }, [tdee, caloricDeficit]);

  useEffect(() => {
    if (tdeeWithDeficit != null) {
      const carbPartOfTdee = tdeeWithDeficit * (carbohydratesInPercent / 100);
      setCarbohydrates(Math.round((carbPartOfTdee / 4) * 100) / 100);
    }
  }, [carbohydratesInPercent]);

  useEffect(() => {
    if (tdeeWithDeficit != null) {
      const proteinsPartOfTdee = tdeeWithDeficit * (proteinsInPercent / 100);
      setProteins(Math.round((proteinsPartOfTdee / 4) * 100) / 100);
    }
  }, [proteinsInPercent]);

  useEffect(() => {
    if (tdeeWithDeficit != null) {
      const fatPartOfTdee = tdeeWithDeficit * (fatInPercent / 100);
      setFat(Math.round((fatPartOfTdee / 9) * 100) / 100);
    }
  }, [fatInPercent]);

  return (
    <NutritionContext.Provider
      value={{
        physicalInformation: physicalInformation,
        setPhysicalInformation: setPhysicalInformation,
        bmr: bmr,

        physicalActivity,
        setPhysicalActivity: (pa: PhysicalActivity) => {
          setPhysicalActivity(pa);
        },
        tdee: tdee,

        caloricDeficit,
        setCaloricDeficit,
        tdeeWithDeficit,
        weightLoss: weightLoss,

        carbohydratesInPercent,
        setCarbohydratesInPercent,
        proteinsInPercent,
        setProteinsInPercent,
        fatInPercent,
        setFatInPercent,
        carbohydrates,
        proteins,
        fat,
      }}
    >
      {children}
    </NutritionContext.Provider>
  );
}

export function useNutrition() {
  const context = useContext(NutritionContext);
  if (context == undefined) {
    throw Error(`le hook ${useNutrition.name} doit être utilisé dans le scope d'un ${NutritionProvider.name}`);
  }
  return context;
}
