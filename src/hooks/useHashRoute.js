import { useEffect, useState } from 'react';

export default function useHashRoute(initial = 'landing') {
  const read = () => window.location.hash.slice(1) || initial;
  const [route, setRoute] = useState(read);
  useEffect(() => {
    const onChange = () => { setRoute(read()); window.scrollTo(0, 0); };
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);
  const go = (r) => { window.location.hash = r; };
  return [route, go];
}
