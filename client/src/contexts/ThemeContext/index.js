/* eslint-disable no-unused-vars */
import React, { useState, useLayoutEffect } from "react";

const ThemeContext = React.createContext({
  holiday: "winter",
});

function ThemeProvider({ children }) {
  // keeps state of the current theme
  const [holiday, setHoliday] = useState("basic");

  // rewrites set of css variables/colors
  const applyTheme = (theme) => {
    const root = document.getElementsByTagName("html")[0];
    root.style.cssText = theme.join(";");
  };

  // paints the app before it renders elements
  useLayoutEffect(() => {
    const holidayTheme = ThemeContext.holiday;

    if (holidayTheme) {
      setHoliday(holidayTheme);
      applyTheme(`${holidayTheme}Theme`);
    } else {
      setHoliday("basic");
      applyTheme(basicTheme); // eslint-disable-line no-use-before-define
    }
    // if state changes, repaints the app
  }, [holiday]);

  // const toggle = () => {
  //   const body = document.getElementsByTagName("body")[0];
  //   body.style.cssText = "transition: background .5s ease";

  //   setDark(!dark);
  //   window.localStorage.setItem("darkTheme", !dark);
  // };

  return (
    <ThemeContext.Provider value={{
      holiday,
    }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (context === null) {
    throw new Error("useTheme hook can only be used in ThemeProvider");
  }
  return context;
};

export { ThemeProvider, useTheme };

// styles
const basicTheme = [
  "--border: rgba(0,0,0,.2)",
  "--shadow: #000",
  "--heading: rgba(255,100,0,1)",
  "--main: #1d8f13",
  "--text: #000",
  "--textAlt: #fff",
  "--inactive: rgba(0,0,0,.3)",
  "--background: white",
];

const thanksgivingTheme = [
  "--border: rgba(255,255,255,.1)",
  "--shadow: #000",
  "--heading: rgba(255,255,5,.9)",
  "--main: #79248f",
  "--text: rgb(255, 255, 255)",
  "--textAlt: #fff",
  "--inactive: rgba(255,255,255,.3)",
  "--background: #2D2D2D",
];

const winterTheme = [
  "--border: rgba(255,255,255,.1)",
  "--shadow: #000",
  "--heading: rgba(255,255,5,.9)",
  "--main: #79248f",
  "--text: rgb(255, 255, 255)",
  "--textAlt: #fff",
  "--inactive: rgba(255,255,255,.3)",
  "--background: #2D2D2D",
];
