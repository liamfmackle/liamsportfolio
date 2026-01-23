import React, { useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { navCardHover, slideInUp } from "../../animations";
import { useIsomorphicLayoutEffect } from "../../utils";

const NavCard = ({ title, description, href, delay = 0 }) => {
  const router = useRouter();
  const cardRef = useRef();

  useIsomorphicLayoutEffect(() => {
    if (cardRef.current) {
      slideInUp(cardRef.current, 0.5, 0.3 + delay);
    }
  }, []);

  useEffect(() => {
    let cleanup;
    if (cardRef.current) {
      cleanup = navCardHover(cardRef.current);
    }
    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  return (
    <div
      ref={cardRef}
      onClick={() => router.push(href)}
      className="nav-card relative p-6 laptop:p-8 rounded-lg border border-navy-200 dark:border-navy-700 cursor-pointer opacity-0"
      style={{ willChange: "transform" }}
    >
      <div className="nav-card-border absolute bottom-0 left-0 w-full h-0.5 bg-accent origin-left transform scale-x-0 opacity-0" />

      <h2 className="text-lg font-semibold tracking-tight">
        {title}
      </h2>
      <p className="mt-2 text-sm text-navy-500 dark:text-navy-300 leading-relaxed">
        {description}
      </p>

      <span className="mt-4 inline-block text-accent text-sm font-medium">
        View &rarr;
      </span>
    </div>
  );
};

export default NavCard;
