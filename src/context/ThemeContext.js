import FullScreenError from "@/components/ui/FullScreenError";
import SuccessModal from "@/components/ui/SuccessModal";
import WarningModal from "@/components/ui/WarningModal";
import { createContext, useState } from "react";

export const ThemeContext = createContext({});

export function ThemeProvider({ children }) {
  const [warningError, setWarningError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [criticallError, setCriticallError] = useState(false);

  function confirmFn() {
    setWarningError(null);
    setSuccessMessage(null);
  }

  const actions = {
    setWarningError,
    setCriticallError,
    setSuccessMessage,
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
          <SuccessModal
            triger={successMessage}
            title={successMessage}
            confirmFn={confirmFn}
          />
        </>
      )}
    </ThemeContext.Provider>
  );
}
