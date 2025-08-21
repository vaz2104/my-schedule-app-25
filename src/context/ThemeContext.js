import FullScreenError from "@/components/ui/FullScreenError";
import WarningModal from "@/components/ui/WarningModal";
import { createContext, useState } from "react";

export const ThemeContext = createContext({});

export function ThemeProvider({ children }) {
  const [warningError, setWarningError] = useState(null);
  //   const [callback, setCallback] = useState(null);
  const [criticallError, setCriticallError] = useState(false);

  function confirmFn() {
    setWarningError(null);
  }

  const actions = {
    setWarningError,
    // setCallback,
    setCriticallError,
  };

  return (
    <ThemeContext.Provider value={actions}>
      {criticallError ? (
        <FullScreenError errorMessage={criticallError} />
      ) : (
        <>
          {children}
          <WarningModal
            triger={warningError}
            title={warningError}
            confirmFn={confirmFn}
          />
        </>
      )}
    </ThemeContext.Provider>
  );
}
