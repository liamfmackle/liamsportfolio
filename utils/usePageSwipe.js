import { useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/router";
import { useSwipeDirection } from "./SwipeContext";

const PAGE_ORDER = ["/", "/projects", "/about", "/research"];

const usePageSwipe = () => {
  const router = useRouter();
  const { setDirection } = useSwipeDirection();

  const isLocked = useRef(false);
  const pageReadyRef = useRef(false);
  const wheelAccumulator = useRef(0);
  const wheelTimeout = useRef(null);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  const currentIndex = PAGE_ORDER.indexOf(router.pathname);
  const isSwipePage = currentIndex !== -1;
  const nextPage = currentIndex < PAGE_ORDER.length - 1 ? PAGE_ORDER[currentIndex + 1] : null;
  const prevPage = currentIndex > 0 ? PAGE_ORDER[currentIndex - 1] : null;

  const navigate = useCallback(
    (direction) => {
      if (isLocked.current) return;

      const target = direction === "left" ? nextPage : prevPage;
      if (!target) return;

      isLocked.current = true;
      setDirection(direction);
      router.push(target);
    },
    [nextPage, prevPage, router, setDirection]
  );

  // Reset lock and readiness on route change
  useEffect(() => {
    pageReadyRef.current = false;
    isLocked.current = false;
    wheelAccumulator.current = 0;

    const timer = setTimeout(() => {
      pageReadyRef.current = true;
    }, 600);

    return () => clearTimeout(timer);
  }, [router.pathname]);

  useEffect(() => {
    if (!isSwipePage) return;

    const WHEEL_THRESHOLD = 150;
    const TOUCH_THRESHOLD = 80;

    const handleWheel = (e) => {
      if (!pageReadyRef.current || isLocked.current) return;

      // Only trigger when horizontal intent is clear
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY) * 2) return;
      if (Math.abs(e.deltaX) < 5) return;

      // Don't trigger during vertical scroll unless intent is very strong
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      if (scrollY >= 50 && Math.abs(e.deltaX) < Math.abs(e.deltaY) * 4) return;

      wheelAccumulator.current += e.deltaX;

      if (wheelTimeout.current) clearTimeout(wheelTimeout.current);
      wheelTimeout.current = setTimeout(() => {
        wheelAccumulator.current = 0;
      }, 300);

      if (wheelAccumulator.current >= WHEEL_THRESHOLD) {
        wheelAccumulator.current = 0;
        navigate("left"); // scrolling right → go to next page
      } else if (wheelAccumulator.current <= -WHEEL_THRESHOLD) {
        wheelAccumulator.current = 0;
        navigate("right"); // scrolling left → go to previous page
      }
    };

    const handleTouchStart = (e) => {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      if (!pageReadyRef.current || isLocked.current) return;

      const deltaX = touchStartX.current - e.changedTouches[0].clientX;
      const deltaY = touchStartY.current - e.changedTouches[0].clientY;

      if (Math.abs(deltaX) < TOUCH_THRESHOLD) return;
      if (Math.abs(deltaX) <= Math.abs(deltaY)) return;

      // Don't trigger during vertical scroll unless intent is strong
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      if (scrollY >= 50 && Math.abs(deltaX) < Math.abs(deltaY) * 2) return;

      if (deltaX > 0) {
        navigate("left"); // swiped left → go to next page
      } else {
        navigate("right"); // swiped right → go to previous page
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      if (wheelTimeout.current) clearTimeout(wheelTimeout.current);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isSwipePage, navigate]);

  return { nextPage, prevPage, currentIndex, pageCount: PAGE_ORDER.length };
};

export default usePageSwipe;
