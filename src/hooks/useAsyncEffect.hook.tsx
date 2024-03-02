import { useEffect } from "react";

export default function useAsyncEffect(callback: () => Promise<void>, deps?: React.DependencyList | undefined) {
  useEffect(() => {
    async function asyncFunction() {
      await callback();
    }

    asyncFunction();
  }, deps);
}
