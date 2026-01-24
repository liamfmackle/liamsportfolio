import { createContext, useContext, useState, useCallback } from "react";

const SwipeContext = createContext({
  direction: null,
  setDirection: () => {},
});

export const SwipeProvider = ({ children }) => {
  const [direction, setDirectionState] = useState(null);

  const setDirection = useCallback((dir) => {
    setDirectionState(dir);
  }, []);

  return (
    <SwipeContext.Provider value={{ direction, setDirection }}>
      {children}
    </SwipeContext.Provider>
  );
};

export const useSwipeDirection = () => useContext(SwipeContext);

export default SwipeContext;
