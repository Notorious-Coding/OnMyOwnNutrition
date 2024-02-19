import React, { useContext, useState } from "react";
import HtmlProps from "../props/html.props";

interface ICultureProvider {
  currentCulture: SupportedCulture;
  setCulture: (culture: SupportedCulture) => void;
}

export enum SupportedCulture {
  FRENCH = "fr",
}

export const CultureContext = React.createContext<ICultureProvider>({
  currentCulture: SupportedCulture.FRENCH,
  setCulture: () => {},
});

export default function CultureProvider({ children }: HtmlProps) {
  const [culture, setCulture] = useState<SupportedCulture>(getCulture());

  return (
    <CultureContext.Provider
      value={{
        currentCulture: culture,
        setCulture: setCulture,
      }}
    >
      {children}
    </CultureContext.Provider>
  );
}

export function useCulture() {
  const context = useContext(CultureContext);
  if (context == undefined) {
    throw Error("le hook useCulture doit être utilisé dans le scope d'un CultureProvider");
  }
  return context;
}

function getCulture() {
  let defaultCulture = SupportedCulture.FRENCH;
  return defaultCulture;
}
