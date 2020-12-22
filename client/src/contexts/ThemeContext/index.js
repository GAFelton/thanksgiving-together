/* eslint-disable no-unused-vars */
import React, { useState, useLayoutEffect } from "react";

const ThemeContext = React.createContext({
  holiday: "",
});

function ThemeProvider({ children }) {
  // keeps state of the current theme
  const [holiday, setHoliday] = useState("basic");

  // paints the app before it renders elements
  useLayoutEffect(() => { // eslint-disable-next-line no-underscore-dangle
    const holidayTheme = ThemeContext._currentValue.holiday;

    if (!!styles[`${holidayTheme}Theme`]) { // eslint-disable-line
      setHoliday(holidayTheme);
      applyTheme(styles[`${holidayTheme}Theme`]); // eslint-disable-line no-use-before-define
    } else {
      // setHoliday("basic");
      applyTheme(styles.basicTheme); // eslint-disable-line no-use-before-define
    }
    // if state changes, repaints the app
  }, [holiday]);

  // rewrites set of css variables/colors
  const applyTheme = (theme) => {
    const root = document.getElementsByTagName("html")[0];
    root.style.cssText = theme.join(";");
  };

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
const styles = {
  basicTheme: [
    "--titleFont: 'Kaushan Script', cursive",
    "--bodyFont: 'Merriweather', serif",
    "--primaryColor: #F5E625",
    "--secondaryColor: #fd7e14",
    "--textColor: #1a1919",
    "--backgroundColor: #f3f3f3",
    "--pageBackground: linear-gradient(to top, #ffffff 0%, #f3f3f3 50%)",
    "--modalBackground: #f3f3f3",
  ],
  thanksgivingTheme: [
    "--border: rgba(255,255,255,.1)",
    "--shadow: #000",
    "--heading: rgba(255,255,5,.9)",
    "--main: #79248f",
    "--text: rgb(255, 255, 255)",
    "--textAlt: #fff",
    "--inactive: rgba(255,255,255,.3)",
    "--background: #2D2D2D",
  ],
  winterTheme: [
    "--border: rgba(255,255,255,.1)",
    "--shadow: #000",
    "--heading: rgba(255,255,5,.9)",
    "--main: #79248f",
    "--text: rgb(255, 255, 255)",
    "--textAlt: #fff",
    "--inactive: rgba(255,255,255,.3)",
    "--background: #2D2D2D",
  ],
};
