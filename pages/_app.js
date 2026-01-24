import "../styles/globals.css";
import { ThemeProvider } from "next-themes";
import PageTransition from "../components/PageTransition";
import { SwipeProvider } from "../utils/SwipeContext";
import SwipeNavigator from "../components/SwipeNavigator";

const App = ({ Component, pageProps }) => {
  return (
    <ThemeProvider>
      <SwipeProvider>
        <SwipeNavigator>
          <PageTransition>
            <Component {...pageProps} />
          </PageTransition>
        </SwipeNavigator>
      </SwipeProvider>
    </ThemeProvider>
  );
};

export default App;
