import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { pageEnter, pageExit } from "../../animations";

const PageTransition = ({ children }) => {
  const router = useRouter();
  const containerRef = useRef(null);
  const [displayChildren, setDisplayChildren] = useState(children);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Run enter animation on initial mount
    if (containerRef.current) {
      pageEnter(containerRef.current);
    }
  }, []);

  useEffect(() => {
    const handleRouteChangeStart = (url) => {
      // Don't animate for same-page hash changes
      if (url.split("#")[0] === router.asPath.split("#")[0]) return;

      setIsTransitioning(true);
      if (containerRef.current) {
        pageExit(containerRef.current);
      }
    };

    const handleRouteChangeComplete = () => {
      setDisplayChildren(children);
      setIsTransitioning(false);
      if (containerRef.current) {
        // Scroll to top on page change
        window.scrollTo(0, 0);
        pageEnter(containerRef.current);
      }
    };

    const handleRouteChangeError = () => {
      setIsTransitioning(false);
      if (containerRef.current) {
        pageEnter(containerRef.current);
      }
    };

    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);
    router.events.on("routeChangeError", handleRouteChangeError);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
      router.events.off("routeChangeError", handleRouteChangeError);
    };
  }, [router, children]);

  // Update children when not transitioning
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
