// src/ScrollToTop.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    // if navigation carried a scrollY in state -> restore it
    const scrollY = location.state?.scrollY;
    if (typeof scrollY === "number") {
      // restore and then remove the state (so next nav doesn't reuse it)
      window.scrollTo(0, scrollY);
      // NOTE: can't mutate location.state from here; just fine to leave it.
      return;
    }

    // otherwise normal behaviour: scroll to top
    window.scrollTo(0, 0);
  }, [location.pathname, location.key, location.state]);

  return null;
}
