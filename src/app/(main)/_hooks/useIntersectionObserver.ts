import { useEffect, useMemo, useRef } from "react";

type UseIntersectionObserverParams = {
  onInView?: (observer?: IntersectionObserver) => void;
} & IntersectionObserverInit;

export const useIntersectionObserver = <T extends HTMLElement>({
  onInView,
  ...options
}: UseIntersectionObserverParams) => {
  const ref = useRef<T>(null);
  const _options: IntersectionObserverInit = useMemo(
    () => ({
      root: options.root,
      rootMargin: options.rootMargin,
      threshold: options.threshold
    }),
    [options.root, options.rootMargin, options.threshold]
  );
  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }
    const handleIntersect: IntersectionObserverCallback = (
      entries,
      observer
    ) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        onInView?.(observer);
      }
    };
    const observer = new IntersectionObserver(handleIntersect, _options);
    observer.observe(element);
    return () => {
      observer.unobserve(element);
    };
  }, [_options, onInView]);
  return ref;
};
