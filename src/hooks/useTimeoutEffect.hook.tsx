import { useEffect } from "react";

export const useTimedOutEffect = (ms: number, callback: () => void, deps?: React.DependencyList | undefined) => {
  useEffect(() => {
    const timeOut = setTimeout(callback, ms);

    return () => clearTimeout(timeOut);
  }, deps);
};
