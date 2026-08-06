import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {

    const [theme, setTheme] = useState(() => {

        return localStorage.getItem("theme") || "dark";

    });

    useEffect(() => {

        document.documentElement.setAttribute(
            "data-theme",
            theme
        );

        localStorage.setItem("theme", theme);

    }, [theme]);

    function toggleTheme() {

        setTheme((previousTheme) =>

            previousTheme === "dark"
                ? "light"
                : "dark"

        );

    }

    return (

        <ThemeContext.Provider
            value={{
                theme,
                toggleTheme,
            }}
        >

            {children}

        </ThemeContext.Provider>

    );

}