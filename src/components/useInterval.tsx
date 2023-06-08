import { useEffect, useRef } from "react";
import { AnyFunction } from "~/types";

const useInterval = (callback: AnyFunction, delay: number | null) => {
  const savedCallback = useRef<AnyFunction | null>(null);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    // eslint-disable-next-line
    const handler = (...args: any[]) => savedCallback?.current?.(...args);

    if (delay !== null) {
      const id = setInterval(handler, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

export default useInterval;
