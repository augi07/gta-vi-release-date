import { useEffect, useState } from 'react';
import FlipClockCountdown from '@leenguyen/react-flip-clock-countdown';
import '@leenguyen/react-flip-clock-countdown/dist/index.css';
import { RELEASE_DATE } from '../utils/countdown';

export default function FlipClockTimer() {
  const [target, setTarget] = useState(RELEASE_DATE.getTime());

  useEffect(() => {
    const updateTarget = (event: Event) => {
      setTarget((event as CustomEvent<number>).detail);
    };
    window.addEventListener('countdown:target', updateTarget);
    return () => window.removeEventListener('countdown:target', updateTarget);
  }, []);

  return (
    <div className="flip-clock-shell" aria-hidden="true">
      <FlipClockCountdown
        key={target}
        className="airport-flip-clock"
        to={target}
        labels={['DAYS', 'HOURS', 'MINUTES', 'SECONDS']}
        duration={0.6}
        hideOnComplete
        renderOnServer
      />
    </div>
  );
}
