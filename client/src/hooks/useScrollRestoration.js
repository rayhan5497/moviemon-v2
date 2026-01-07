import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';
import { scrollMemory } from '../components/ui/LinkWithScrollSave';

export default function useScrollRestoration(mainRef) {
  const location = useLocation();
  const navType = useNavigationType();

  // Restore scroll on POP
  useEffect(() => {
    const container = mainRef.current;
    if (!container) return;
    if (navType !== 'POP') return;
    if (location.pathname.startsWith('/player')) {
      container.scrollTop = 0;
      return;
    }

    const scrollKey = location.pathname + location.search;
    const saved = scrollMemory[scrollKey];
    if (saved != null) {
      let attempts = 0;
      const tryRestore = () => {
        if (container.scrollHeight >= saved || attempts > 25) {
          container.scrollTop = saved;
        } else {
          attempts++;
          requestAnimationFrame(tryRestore);
        }
      };
      requestAnimationFrame(tryRestore);
    } else {
      container.scrollTop = 0;
    }
  }, [location, navType, mainRef]);
}
