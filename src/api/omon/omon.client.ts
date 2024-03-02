import { BiologicSex } from "../../entities/biologic-sex";
import { PhysicalActivity } from "../../entities/physical-activity";
import { getHeader, requestBody } from "../client";

const USER_DATA_ENDPOINT = "onboarding/user/data";

export class EnsureUserDataParameters {
  email: string;
  weight: number | null;
  height: number | null;
  age: number | null;
  sex: BiologicSex | null;
  physicalActivityLevel: PhysicalActivity | null;
  caloricDeficitInPercent: number | null;
  carbohydratesInPercent: number | null;
  proteinsInPercent: number | null;
  fatsInPercent: number | null;

  constructor(email: string) {
    this.email = email;
    this.weight = null;
    this.height = null;
    this.age = null;
    this.sex = null;
    this.physicalActivityLevel = null;
    this.caloricDeficitInPercent = null;
    this.carbohydratesInPercent = null;
    this.proteinsInPercent = null;
    this.fatsInPercent = null;
  }
}

export interface UserData {
  email: string | null;
  weight: number | null;
  height: number | null;
  age: number | null;
  sex: BiologicSex | null;
  basalMetabolicRate: number | null;
  physicalActivityLevel: PhysicalActivity;
  totalDailyEnergyExpenditure: number | null;
  caloricDeficitInPercent: number;
  tdeeWithDeficit: number | null;
  weightLoss: number | null;
  carbohydratesInPercent: number | null;
  proteinsInPercent: number | null;
  fatsInPercent: number | null;
  carbohydrates: number | null;
  proteins: number | null;
  fats: number | null;
}

export async function ensureUserData(data: EnsureUserDataParameters) {
  console.log("ensure");
  return await requestBody<UserData>(USER_DATA_ENDPOINT, {
    method: "POST",
    body: JSON.stringify(data),
    headers: getHeader(),
  });
}
