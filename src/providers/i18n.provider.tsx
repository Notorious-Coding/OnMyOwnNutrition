import React, { useContext, useState } from "react";
import HtmlProps from "../props/html.props";
import french from "../assets/translations/French.json";
import DOMPurify from "dompurify";

interface ITranslationContext {
  t: (area: string, key: string, datas?: any, sanitize?: boolean) => string;
  exist: (area: string, key: string) => boolean;
}
export const TranslationContext = React.createContext<ITranslationContext>({
  t: getMissingTrad,
  exist: () => false,
});

export default function TranslationProvider({ children }: HtmlProps) {
  const [translations] = useState<any>(getTranslationFile());
  const getTrad = (area: string, key: string, datas?: any, sanitize: boolean = false): string => {
    if (translations[area] === undefined || translations[area][key] === undefined) return getMissingTrad(area, key);

    let trad = translations[area][key];

    for (const dataKey in datas) {
      trad = replaceDataInTrad(trad, dataKey, datas[dataKey]);
    }

    if (sanitize) trad = DOMPurify.sanitize(trad);
    return trad;
  };

  const exist = (area: string, key: string): boolean => {
    return translations[area] !== undefined && translations[area][key] !== undefined;
  };

  return (
    <TranslationContext.Provider
      value={{
        t: getTrad,
        exist,
      }}
    >
      {children}
    </TranslationContext.Provider>
  );
}

function replaceDataInTrad(trad: string, dataKey: string, dataValue: string) {
  return trad.replace(getDataKey(dataKey), dataValue);
}

function getDataKey(value: string) {
  const leftKey = "{";
  const rightKey = "}";
  return leftKey + value + rightKey;
}

function getMissingTrad(area: string, key: string) {
  return `[MISSING][Area:${area}][Key:${key}]`;
}

function getTranslationFile() {
  return french;
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (context == undefined) {
    throw Error("le hook useTranslation doit être utilisé dans le scope d'un TranslationProvider");
  }
  return context;
}

export function useScopedTranslation(area: string) {
  const { t, exist } = useTranslation();

  return {
    t: (key: string, datas?: any, sanitize?: boolean) => t(area, key, datas, sanitize),
    exist: (key: string) => exist(area, key),
  };
}

export function useComponentScopedTranslation(func: (props: any) => JSX.Element) {
  return useScopedTranslation(func.name);
}
