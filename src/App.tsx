import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "./components/tree/home";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { ThemeProvider, createTheme } from "@mui/material";
import TranslationProvider from "./providers/i18n.provider";
import StepProvider from "./providers/step.provider";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#5e35b1",
    },
    secondary: {
      main: "#7e57c2",
    },
    background: {
      default: "#101010",
      paper: "#2b2b2b",
    },
    text: {
      primary: "#fafafa",
      secondary: "rgba(214,214,214,0.54)",
      disabled: "rgba(74,73,73,0.38)",
    },
    error: {
      main: "#f44336",
    },
    action: {
      disabled: "rgba(74,73,73,0.38)",
    },
  },
});

function App() {
  return (
    <TranslationProvider>
      <ThemeProvider theme={theme}>
        <StepProvider>
          <HashRouter>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </HashRouter>
        </StepProvider>
      </ThemeProvider>
    </TranslationProvider>
  );
}

export default App;
