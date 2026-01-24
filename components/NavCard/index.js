import React, { useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { navCardHover, slideInUp } from "../../animations";
import { useIsomorphicLayoutEffect } from "../../utils";

const NavCard = ({ title, description, href, delay = 0, secondary = false }) => {
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
      className={`nav-card relative rounded-lg cursor-pointer opacity-0 ${
        secondary
          ? "p-4 laptop:p-5 border border-navy-100 dark:border-navy-700/50"
          : "p-6 laptop:p-8 border border-navy-200 dark:border-navy-700"
      }`}
      style={{ willChange: "transform" }}
    >
      <div className="nav-card-border absolute bottom-0 left-0 w-full h-0.5 bg-teal-400 origin-left transform scale-x-0 opacity-0" />

      <h2 className={secondary ? "text-base font-medium tracking-tight text-navy-600 dark:text-navy-300" : "text-lg font-semibold tracking-tight"}>
        {title}
      </h2>
      <p className={`mt-1.5 leading-relaxed ${secondary ? "text-xs text-navy-400 dark:text-navy-400" : "text-sm text-navy-500 dark:text-navy-300"}`}>
        {description}
      </p>

      <span className={`inline-block text-teal-500 dark:text-teal-400 font-medium ${secondary ? "mt-2 text-xs" : "mt-4 text-sm"}`}>
        View &rarr;
      </span>
    </div>
  );
};

export default NavCard;
