import { BiologicSex } from "../entities/biologic-sex";
import { PhysicalActivity } from "../entities/physical-activity";
import { PhysicalInformation } from "../entities/physical-information";

export function computeBmr({ weight, height, age, sex }: PhysicalInformation) {
  const withoutSex = 10 * weight + 6.25 * height - 5 * age;
  if (sex == BiologicSex.Female) {
    return withoutSex - 116;
  } else {
    return withoutSex + 5;
  }
}

const activityFactors = {
  [PhysicalActivity.Sedentary]: 1.2,
  [PhysicalActivity.SlightlyActive]: 1.375,
  [PhysicalActivity.ModeratelyActive]: 1.55,
  [PhysicalActivity.VeryActive]: 1.725,
  [PhysicalActivity.ExtremelyActive]: 1.9,
};

export function computeAetq(bmr: number, pa: PhysicalActivity) {
  return Math.round(bmr * activityFactors[pa] * 100) / 100;
}

export function computeTdeeWithDeficit(tdee: number, deficitInPercent: number) {
  return Math.round(tdee - tdee * (deficitInPercent / 100));
}

export function computeWeightLoss(tdeeWithDeficit: number, tdee: number) {
  const deficit: number = tdeeWithDeficit - tdee;
  return Math.abs(Math.round((deficit / 7700) * 1000));
}
