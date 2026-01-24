import { useRef, useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";
import {
  pageEnter,
  pageExit,
  pageExitLeft,
  pageExitRight,
  pageEnterFromLeft,
  pageEnterFromRight,
} from "../../animations";
import { useSwipeDirection } from "../../utils/SwipeContext";

const PageTransition = ({ children }) => {
  const router = useRouter();
  const { direction, setDirection } = useSwipeDirection();
  const containerRef = useRef(null);
  const [displayChildren, setDisplayChildren] = useState(children);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const directionRef = useRef(null);

  // Keep directionRef in sync with context
  useEffect(() => {
    directionRef.current = direction;
  }, [direction]);

  useEffect(() => {
    if (containerRef.current) {
      pageEnter(containerRef.current);
    }
  }, []);

  const handleRouteChangeStart = useCallback((url) => {
    if (url.split("#")[0] === router.asPath.split("#")[0]) return;

    setIsTransitioning(true);
    if (containerRef.current) {
      const dir = directionRef.current;
      if (dir === "left") {
        pageExitLeft(containerRef.current);
      } else if (dir === "right") {
        pageExitRight(containerRef.current);
      } else {
        pageExit(containerRef.current);
      }
    }
  }, [router.asPath]);

  const handleRouteChangeComplete = useCallback(() => {
    setDisplayChildren(children);
    setIsTransitioning(false);
    if (containerRef.current) {
      window.scrollTo(0, 0);
      const dir = directionRef.current;
      if (dir === "left") {
        pageEnterFromRight(containerRef.current);
      } else if (dir === "right") {
        pageEnterFromLeft(containerRef.current);
      } else {
        pageEnter(containerRef.current);
      }
    }
    setDirection(null);
    directionRef.current = null;
  }, [children, setDirection]);

  const handleRouteChangeError = useCallback(() => {
    setIsTransitioning(false);
    if (containerRef.current) {
      pageEnter(containerRef.current);
    }
    setDirection(null);
    directionRef.current = null;
  }, [setDirection]);

  useEffect(() => {
    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);
    router.events.on("routeChangeError", handleRouteChangeError);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
      router.events.off("routeChangeError", handleRouteChangeError);
    };
  }, [router, handleRouteChangeStart, handleRouteChangeComplete, handleRouteChangeError]);

  useEffect(() => {
    if (!isTransitioning) {
      setDisplayChildren(children);
    }
  }, [children, isTransitioning]);

  return (
    <div ref={containerRef} className="page-transition-container">
      {displayChildren}
    </div>
  );
};

export default PageTransition;
