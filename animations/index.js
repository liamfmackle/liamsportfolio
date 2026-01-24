import gsap, { Power3, Power2 } from "gsap";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

// Register plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);
}

// Stagger animation for multiple elements
export const stagger = (target, fromVars, toVars) => {
  return gsap.fromTo(
    target,
    { opacity: 0, ...fromVars },
    { opacity: 1, ...toVars, stagger: 0.2, ease: Power3.easeOut }
  );
};

// Page enter animation — scale up with fade (for header/card clicks)
export const pageEnter = (target, onComplete) => {
  return gsap.fromTo(
    target,
    { opacity: 0, y: 30, scale: 0.97 },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.5,
      ease: "power3.out",
      onComplete,
    }
  );
};

// Page exit animation — shrink and fade (for header/card clicks)
export const pageExit = (target, onComplete) => {
  return gsap.to(target, {
    opacity: 0,
    y: -20,
    scale: 0.98,
    duration: 0.25,
    ease: "power2.in",
    onComplete,
  });
};

// Directional page exit — slide left with scale (going to next page)
export const pageExitLeft = (target, onComplete) => {
  return gsap.to(target, {
    opacity: 0,
    x: -150,
    scale: 0.92,
    duration: 0.35,
    ease: "power3.in",
    onComplete,
  });
};

// Directional page exit — slide right with scale (going to previous page)
export const pageExitRight = (target, onComplete) => {
  return gsap.to(target, {
    opacity: 0,
    x: 150,
    scale: 0.92,
    duration: 0.35,
    ease: "power3.in",
    onComplete,
  });
};

// Directional page enter — slide in from right with scale (arriving at next page)
export const pageEnterFromRight = (target, onComplete) => {
  return gsap.fromTo(
    target,
    { opacity: 0, x: 80, scale: 0.95 },
    {
      opacity: 1,
      x: 0,
      scale: 1,
      duration: 0.5,
      ease: "back.out(1.2)",
      onComplete,
    }
  );
};

// Directional page enter — slide in from left with scale (arriving at previous page)
export const pageEnterFromLeft = (target, onComplete) => {
  return gsap.fromTo(
    target,
    { opacity: 0, x: -80, scale: 0.95 },
    {
      opacity: 1,
      x: 0,
      scale: 1,
      duration: 0.5,
      ease: "back.out(1.2)",
      onComplete,
    }
  );
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

// Scroll-triggered reveal for elements entering the viewport
export const scrollReveal = (target, options = {}) => {
  const defaults = {
    y: 30,
    duration: 0.6,
    stagger: 0.15,
  };
  const merged = { ...defaults, ...options };

  return gsap.fromTo(
    target,
    { opacity: 0, y: merged.y },
    {
      opacity: 1,
      y: 0,
      duration: merged.duration,
      stagger: merged.stagger,
      ease: Power3.easeOut,
      scrollTrigger: {
        trigger: target,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    }
  );
};

// GSAP hover effect for navigation cards
export const navCardHover = (cardElement) => {
  const border = cardElement.querySelector(".nav-card-border");

  const onEnter = () => {
    gsap.to(cardElement, {
      scale: 1.02,
      duration: 0.3,
      ease: Power2.easeOut,
    });
    if (border) {
      gsap.to(border, {
        scaleX: 1,
        opacity: 1,
        duration: 0.3,
        ease: Power2.easeOut,
      });
    }
  };

  const onLeave = () => {
    gsap.to(cardElement, {
      scale: 1,
      duration: 0.3,
      ease: Power2.easeOut,
    });
    if (border) {
      gsap.to(border, {
        scaleX: 0,
        opacity: 0,
        duration: 0.3,
        ease: Power2.easeIn,
      });
    }
  };

  cardElement.addEventListener("mouseenter", onEnter);
  cardElement.addEventListener("mouseleave", onLeave);

  // Return cleanup function
  return () => {
    cardElement.removeEventListener("mouseenter", onEnter);
    cardElement.removeEventListener("mouseleave", onLeave);
  };
};

// Smooth scroll to element
export const smoothScrollTo = (target, duration = 1) => {
  return gsap.to(window, {
    duration,
    scrollTo: { y: target, offsetY: 50 },
    ease: Power3.easeInOut,
  });
};
