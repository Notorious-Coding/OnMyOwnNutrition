import React, { useContext, useState } from "react";
import HtmlProps from "../props/html.props";
import { EnsureUserDataParameters, UserData, ensureUserData } from "../api/omon/omon.client";
import { diets } from "../entities/diets";

interface IUserDataProvider {
  userData: UserData;
  save: () => void;
  set: (data: UserData) => void;
}

export const UserDataContact = React.createContext<IUserDataProvider>({
  userData: { caloricDeficitInPercent: 1 } as UserData,
  save: () => {},
  set: (data: UserData) => {},
});

export default function UserDataProvider({ children }: HtmlProps) {
  const [userData, setUserData] = useState<UserData>({
    carbohydratesInPercent: diets[0].carbohydrates,
    proteinsInPercent: diets[0].proteins,
    fatsInPercent: diets[0].fats,
    caloricDeficitInPercent: 1,
  } as UserData);

  const save = async () => {
    if (userData.email != null) {
      const userDataParams = new EnsureUserDataParameters(userData.email);

      if (userData != null) {
        userDataParams.age = userData.age;
        userDataParams.height = userData.height;
        userDataParams.weight = userData.weight;
        userDataParams.sex = userData.sex;
        userDataParams.physicalActivityLevel = userData.physicalActivityLevel;
        userDataParams.caloricDeficitInPercent = userData.caloricDeficitInPercent;
        userDataParams.carbohydratesInPercent = userData.carbohydratesInPercent;
        userDataParams.proteinsInPercent = userData.proteinsInPercent;
        userDataParams.fatsInPercent = userData.fatsInPercent;
        const result: UserData = await ensureUserData(userDataParams);
        setUserData(result);
      }
    }
  };

  const set = setUserData;
  return (
    <UserDataContact.Provider
      value={{
        userData,
        save,
        set,
      }}
    >
      {children}
    </UserDataContact.Provider>
  );
}

export function useUserData() {
  const context = useContext(UserDataContact);
  if (context == undefined) {
    throw Error(`le hook ${useUserData.name} doit être utilisé dans le scope d'un ${UserDataProvider.name}`);
  }
  return context;
}
