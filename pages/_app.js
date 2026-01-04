import "../styles/globals.css";
import { ThemeProvider } from "next-themes";
import PageTransition from "../components/PageTransition";

const App = ({ Component, pageProps }) => {
  return (
    <ThemeProvider>
      <PageTransition>
        <Component {...pageProps} />
      </PageTransition>
    </ThemeProvider>
  );
};

export default App;
