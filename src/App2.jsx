// App.js
import { useState, useCallback } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ReactLenis } from "lenis/react";
import AppContent from "./AppContent";

const App = () => {
  const [lenisScrollProgress, setLenisScrollProgress] = useState(0);
  const [hidden, setHidden] = useState(false);

  const lenisOptions = { duration: 0.6 };

  const onLenisScroll = useCallback(({ scroll, limit }) => {
    const progress = scroll / limit;
    setLenisScrollProgress(progress);
    setHidden(progress > 0.1);
  }, []);

  return (
    <Router>
      <ReactLenis root options={lenisOptions} onScroll={onLenisScroll}>
        <AppContent lenisScrollProgress={lenisScrollProgress} hidden={hidden} />
      </ReactLenis>
    </Router>
  );
};

export default App;
