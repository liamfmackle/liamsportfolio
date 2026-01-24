import usePageSwipe from "../../utils/usePageSwipe";

const SwipeNavigator = ({ children }) => {
  usePageSwipe();
  return children;
};

export default SwipeNavigator;
