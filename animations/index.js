import gsap, { Power3, Power2 } from "gsap";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";

// Register ScrollToPlugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollToPlugin);
}

// Stagger animation for multiple elements
export const stagger = (target, fromVars, toVars) => {
  return gsap.fromTo(
    target,
    { opacity: 0, ...fromVars },
    { opacity: 1, ...toVars, stagger: 0.2, ease: Power3.easeOut }
  );
};

// Page enter animation - fade and slide up
export const pageEnter = (target, onComplete) => {
  return gsap.fromTo(
    target,
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration: 0.4,
      ease: Power2.easeOut,
      onComplete,
    }
  );
};

// Page exit animation - fade and slide up
export const pageExit = (target, onComplete) => {
  return gsap.to(target, {
    opacity: 0,
    y: -10,
    duration: 0.2,
    ease: Power2.easeIn,
    onComplete,
  });
};

// Fade in animation
export const fadeIn = (target, duration = 0.4, delay = 0) => {
  return gsap.fromTo(
    target,
    { opacity: 0 },
    { opacity: 1, duration, delay, ease: Power2.easeOut }
  );
};

// Slide in from bottom with fade
export const slideInUp = (target, duration = 0.5, delay = 0) => {
  return gsap.fromTo(
    target,
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration, delay, ease: Power3.easeOut }
  );
};

// Stagger children elements with slide up effect
export const staggerChildren = (parent, delay = 0) => {
  const children = parent?.children;
  if (!children || children.length === 0) return;

  return gsap.fromTo(
    children,
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration: 0.4,
      stagger: 0.1,
      delay,
      ease: Power3.easeOut,
    }
  );
};

// Smooth scroll to element
export const smoothScrollTo = (target, duration = 1) => {
  return gsap.to(window, {
    duration,
    scrollTo: { y: target, offsetY: 50 },
    ease: Power3.easeInOut,
  });
};
